import { useRouter } from 'vue-router'
import { queryNorthDriverList } from '@/api/config'
import type { DriverItemInList } from '@/types/config'
import { NodeCatogery } from '@/types/enums'
import type { PluginKind } from '@/types/enums'
import type { Ref } from 'vue'
import { ref, onUnmounted } from 'vue'
import { useFillNodeListStatusData } from './useNodeList'
import { useGetPluginMsgIdMap } from './usePlugin'
import { debounce, cloneDeep } from 'lodash'
import useDeleteDriver from '@/composables/config/useDeleteDriver'
import { useNodeDebugLogLevel, useDriverName } from '@/composables/config/useDriver'
import { listOrderByKey } from '@/utils/utils'
import { statusTextMap, connectionStatusTextMap } from '@/utils/driver'

export default (autoLoad = true, needRefreshStatus = false) => {
  const router = useRouter()

  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()
  const { fillNodeListStatusData } = useFillNodeListStatusData()
  const { deleteDriverByNode } = useDeleteDriver()
  const { modifyNodeLogLevelToDebug } = useNodeDebugLogLevel()
  const { isMonitorNode } = useDriverName()

  const northDriverList: Ref<Array<DriverItemInList>> = ref([])
  const northDriverListBackup: Ref<Array<DriverItemInList>> = ref([])
  const isListLoading: Ref<boolean> = ref(false)

  const sortBy = ref({
    prop: '',
    order: '',
  })

  let refreshStatusTimer: undefined | number

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

  const getNorthDriverList = async () => {
    try {
      isListLoading.value = true
      const [northDriverListData] = await Promise.all([await queryNorthDriverList(), initMsgIdMap()])
      northDriverList.value = await fillNodeListStatusData(
        northDriverListData.map((item) =>
          Object.assign(item, {
            pluginKind: pluginMsgIdMap[item.plugin]?.kind as PluginKind,
          }),
        ),
      )
      northDriverListBackup.value = cloneDeep(northDriverList.value)

      // fixed: get sort after remove or start or stop node
      const { prop, order } = sortBy.value
      await sortDataByKey({ prop, order })

      isListLoading.value = false
      return Promise.resolve(northDriverList.value)
    } catch (error) {
      return Promise.reject()
    }
  }
  // debounce
  const dbGetNorthDriverList = debounce(() => {
    getNorthDriverList()
  }, 500)

  const reloadDriverList = () => {
    getNorthDriverList()
    editDriverData.value = { name: '' }
  }

  const startTimer = () => {
    refreshStatusTimer = window.setInterval(async () => {
      northDriverList.value = await fillNodeListStatusData(northDriverList.value)
    }, 15 * 1000)
  }

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
    northDriverList.value = cloneDeep(northDriverListBackup.value)
  }
  const sortDataByKey = async (data: { prop: string | null; order: string | null }) => {
    const { prop, order } = data

    if (order && prop) {
      const sortByOrder = order.includes('asc') ? 'asc' : 'desc'
      sortBy.value.order = sortByOrder
      sortBy.value.prop = prop

      const totalList: Array<DriverItemInList> = i18nNodeStatus(northDriverList.value)
      northDriverList.value = listOrderByKey(totalList, prop, sortByOrder)
    } else {
      sortBy.value = {
        order: '',
        prop: '',
      }
      await setDefaultSort()
    }
  }

  const changeListShowMode = async () => {
    sortBy.value = {
      order: '',
      prop: '',
    }
    await sortDataByKey(sortBy.value)
  }

  const goGroupPage = (node: DriverItemInList) => {
    if (!isMonitorNode(node.name)) {
      router.push({
        name: 'NorthDriverGroup',
        params: {
          node: node.name,
          plugin: node.plugin,
        },
      })
    }
  }

  // Compatible with jumping from created a node
  const goNodeConfig = (node: DriverItemInList | { name: string }) =>
    router.push({ name: 'NorthDriverConfig', params: { node: node.name } })

  const deleteDriver = async (node: DriverItemInList) => {
    await deleteDriverByNode(NodeCatogery.North, node)
    dbGetNorthDriverList()
  }

  const modifyNodeLogLevel = async (node: DriverItemInList) => {
    await modifyNodeLogLevelToDebug(node.name, node.log_level)
  }

  if (autoLoad) {
    getNorthDriverList()
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
    northDriverList,
    isListLoading,
    getNorthDriverList,
    dbGetNorthDriverList,
    reloadDriverList,
    goGroupPage,
    goNodeConfig,
    modifyNodeLogLevel,
    deleteDriver,

    sortBy,
    sortDataByKey,
    changeListShowMode,

    addConfig,
    showDialog,
    editDialog,
    showEditDialog,
    editDriverData,
  }
}
