import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { querySouthDriverList } from '@/api/config'
import type { DriverItemInList, RawDriverData } from '@/types/config'
import { NodeLinkState, NodeState, NodeCatogery } from '@/types/enums'
import type { Ref } from 'vue'
import { onUnmounted, ref, computed } from 'vue'
import usePaging from '../usePaging'
import { useFillNodeListStatusData } from './useNodeList'
import { debounce, cloneDeep } from 'lodash'
import useDeleteDriver from '@/composables/config/useDeleteDriver'
import { useNodeDebugLogLevel } from '@/composables/config/useDriver'
import { listOrderByKey } from '@/utils/utils'
import { statusTextMap, connectionStatusTextMap } from '@/utils/driver'

export default (autoLoad = true, needRefreshStatus = false) => {
  const router = useRouter()
  const store = useStore()

  const { fillNodeListStatusData } = useFillNodeListStatusData()
  const { deleteDriverByNode } = useDeleteDriver()
  const { modifyNodeLogLevelToDebug } = useNodeDebugLogLevel()

  // before pagination and without status data, for select
  const totalSouthDriverList: Ref<Array<RawDriverData>> = ref([])
  const totalSouthDriverListBackup: Ref<Array<RawDriverData>> = ref([])
  // after pagination, for show in list page
  const southDriverList: Ref<Array<DriverItemInList>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)
  const isSwitchListLoading: Ref<boolean> = ref(false)

  // add | edit driver
  const showDialog = ref(false)
  const showEditDialog = ref(false)
  const editDriverData: Ref<{ name: string }> = ref({ name: '' })
  const addConfig = () => {
    showDialog.value = true
  }
  const editDialog = (node: DriverItemInList) => {
    showEditDialog.value = true
    editDriverData.value = { name: node.name }
  }

  const pageController = computed({
    get: () => store.state.paginationData,
    set: (val) => {
      store.commit('SET_PAGINATION', val)
    },
  })
  const { setTotalData, getAPageData } = usePaging()

  const queryKeyword = ref({
    node: '',
    plugin: '',
  })

  const sortBy = ref({
    prop: '',
    order: '',
  })

  let refreshStatusTimer: undefined | number

  const getAPageTagData = async () => {
    try {
      isListLoading.value = true
      const { data, meta } = getAPageData(pageController.value)

      southDriverList.value = await fillNodeListStatusData(data)
      pageController.value.total = meta.total
      store.commit('SET_PAGINATION', meta)
    } finally {
      isListLoading.value = false
    }
  }

  const getSouthDriverList = async () => {
    isListLoading.value = true
    try {
      const driverList = await querySouthDriverList(queryKeyword.value)
      const totalList = driverList.map((item) => {
        return {
          ...item,
          running: NodeState.Running,
          link: NodeLinkState.Connected,
        }
      })
      totalSouthDriverList.value = totalList
      totalSouthDriverListBackup.value = cloneDeep(totalSouthDriverList.value)

      // fixed: get sort after remove or start or stop node
      const { prop, order } = sortBy.value
      await sortDataByKey({ prop, order })
    } finally {
      isListLoading.value = false
    }
  }
  // debounce
  const dbGetSouthDriverList = debounce(() => {
    getSouthDriverList()
  }, 500)

  /** sort by name, status, connection status, plugin
   * To resolve node status(setInterval) sort in different lang
   */
  const i18nNodeStatus = (node: Array<DriverItemInList>) => {
    const list: Array<DriverItemInList> = node.map((item: DriverItemInList) => {
      return {
        ...item,
        statusText: statusTextMap[item.running],
        connectionStatusText: connectionStatusTextMap[item.link],
      }
    })
    return list
  }

  const setDefaultSort = async () => {
    totalSouthDriverList.value = cloneDeep(totalSouthDriverListBackup.value)
    setTotalData(totalSouthDriverList.value)
    await getAPageTagData()
  }
  const sortDataByKey = async (data: { prop: string | null; order: string | null }) => {
    const { prop, order } = data

    if (order && prop) {
      const sortByOrder = order.includes('asc') ? 'asc' : 'desc'
      sortBy.value.order = sortByOrder
      sortBy.value.prop = prop

      let totalList: Array<DriverItemInList> = await fillNodeListStatusData(totalSouthDriverList.value)
      totalList = i18nNodeStatus(totalList)
      totalList = listOrderByKey(totalList, prop, sortByOrder)

      totalSouthDriverList.value = totalList
      setTotalData(totalList)
      await getAPageTagData()
    } else {
      // When sorting manually, set default sort
      sortBy.value = {
        order: '',
        prop: '',
      }
      await setDefaultSort()
    }
  }

  const changeListShowMode = async () => {
    // avoid data legacy, resulting in instant interaction when switching list show type
    southDriverList.value = []
    pageController.value.pageNum = 1

    isSwitchListLoading.value = true
    sortBy.value = {
      order: '',
      prop: '',
    }
    await sortDataByKey(sortBy.value)

    isSwitchListLoading.value = false
  }

  const handleSizeChange = (size: number) => {
    pageController.value.pageSize = size
    pageController.value.pageNum = 1
    getAPageTagData()
  }

  const startTimer = () => {
    refreshStatusTimer = window.setInterval(async () => {
      southDriverList.value = await fillNodeListStatusData(southDriverList.value)
    }, 15 * 1000)
  }

  const goGroupPage = (node: DriverItemInList) => {
    router.push({
      name: 'SouthDriverGroup',
      params: {
        node: node.name,
        plugin: node.plugin,
      },
    })
  }

  // Compatible with jumping from created a node
  const goNodeConfig = (node: DriverItemInList | { name: string }) =>
    router.push({ name: 'SouthDriverConfig', params: { node: node.name } })

  const deleteDriver = async (node: DriverItemInList) => {
    await deleteDriverByNode(NodeCatogery.South, node)
    dbGetSouthDriverList()
  }

  const modifyNodeLogLevel = async (node: DriverItemInList) => {
    await modifyNodeLogLevelToDebug(node.name, node.log_level)
  }

  const reloadDriverList = () => {
    getSouthDriverList()
    editDriverData.value = { name: '' }
  }

  if (autoLoad) {
    getSouthDriverList()
  }

  if (needRefreshStatus) {
    startTimer()
  }

  onUnmounted(() => {
    if (refreshStatusTimer) {
      window.clearInterval(refreshStatusTimer)
    }
  })

  return {
    queryKeyword,
    pageController,
    getAPageTagData,
    handleSizeChange,
    totalSouthDriverList,
    southDriverList,
    isListLoading,
    getSouthDriverList,
    dbGetSouthDriverList,
    reloadDriverList,

    goGroupPage,
    goNodeConfig,
    modifyNodeLogLevel,
    deleteDriver,

    sortBy,
    sortDataByKey,
    isSwitchListLoading,
    changeListShowMode,

    addConfig,
    showDialog,
    editDialog,
    showEditDialog,
    editDriverData,
  }
}
