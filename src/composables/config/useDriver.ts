import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { sendCommandToNode, updateNodeLogLevelToDebug } from '@/api/config'
import { getStatisticByType } from '@/api/statistics'
import type { DriverItemInList } from '@/types/config'
import type { NodeCatogery } from '@/types/enums'
import { DriverDirection, NodeOperationCommand, NodeState } from '@/types/enums'
import { NORTH_DRIVER_NODE_TYPE, SOUTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import { computed, ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { EmqxMessage } from '@emqx/emqx-ui'
import { statusIconClassMap, statusTextMap, connectionStatusTextMap } from '@/utils/driver'

export const useDriverStatus = (props: { data: DriverItemInList }) => {
  const { t } = useI18n()

  const statusIcon = computed(() => statusIconClassMap[props.data.running])
  const statusText = computed(() => t(`${statusTextMap[props.data.running]}`) || '-')
  const connectionStatusText = computed(() => t(`${connectionStatusTextMap[props.data.link]}`))

  return {
    statusIconClassMap,
    statusIcon,
    statusText,
    connectionStatusText,
  }
}

export const useNodeStartStopStatus = () => {
  const countNodeStartStopStatus = (data: DriverItemInList) => data.running === NodeState.Running
  return {
    countNodeStartStopStatus,
  }
}

export const useToggleNodeStartStopStatus = () => {
  const toggleNodeStartStopStatus = async (node: DriverItemInList, status: boolean) => {
    try {
      await sendCommandToNode(node.name, status ? NodeOperationCommand.Start : NodeOperationCommand.Stop)
      return Promise.resolve(true)
    } catch (error: any) {
      /*
        Demand from the backend
        If an error is reported in 2011, Node is running, set the button to green;
        If error 2013 is reported, Node is stop, turn the button to gray.
      */
      const errorCode = error?.response?.data?.error
      if (errorCode === 2011) {
        return Promise.resolve({ ...node, running: NodeState.Running })
      }
      if (errorCode === 2013) {
        return Promise.resolve({ ...node, running: NodeState.Stopped })
      }
      return Promise.reject(error)
    }
  }
  return {
    toggleNodeStartStopStatus,
  }
}

export const useNodeTypeSelect = () => {
  const { t } = useI18n()
  const nodeTypeList = [
    { label: t('config.northApp'), value: DriverDirection.North },
    { label: t('config.southDevice'), value: DriverDirection.South },
  ]
  return {
    nodeTypeList,
  }
}

export const useNodeType = () => {
  const { t } = useI18n()
  const getNodeTypeLabelByValue = (value: 1 | 2 | null) => {
    if (SOUTH_DRIVER_NODE_TYPE.some((val) => val === value)) {
      return t('config.southDevice')
    }
    if (NORTH_DRIVER_NODE_TYPE.some((val) => val === value)) {
      return t('config.northApp')
    }
    return '-'
  }
  return {
    getNodeTypeLabelByValue,
  }
}

export const dataStatistics = () => {
  const drawerRef = ref()
  const dataStatisticsVisiable = ref(false)
  const loadingStatistic = ref(false)
  const nodeStatisticData = ref('')
  let timer: undefined | number
  const nodeItemData = ref({ name: '' })

  const isShowDataStatistics = (node: DriverItemInList, value?: boolean) => {
    nodeItemData.value = node

    if (value === undefined || value === null) {
      dataStatisticsVisiable.value = !dataStatisticsVisiable.value
      return
    }
    dataStatisticsVisiable.value = value
  }

  /**
   * Get north app node or south device node statistic data
   * @param params { node name }
   */
  const getNodeStatisticData = (type: NodeCatogery[keyof NodeCatogery], params: any) => {
    loadingStatistic.value = true
    getStatisticByType(type, params)
      .then((res: any) => {
        const statistics: string = res?.data || ''
        nodeStatisticData.value = statistics.replace(/(#)(.*)(\n)/g, '')
        setTimer(type, params)
      })
      .finally(() => {
        loadingStatistic.value = false
      })
  }

  const setTimer = (type: NodeCatogery[keyof NodeCatogery], params: any) => {
    if (timer) {
      window.clearInterval(timer)
    }

    timer = window.setInterval(() => {
      getNodeStatisticData(type, params)
    }, 3000)
  }

  onUnmounted(() => {
    if (timer) {
      window.clearInterval(timer)
    }
  })

  return {
    drawerRef,
    isShowDataStatistics,
    dataStatisticsVisiable,
    nodeStatisticData,
    loadingStatistic,
    getNodeStatisticData,
    nodeItemData,
  }
}

export const useNodeDebugLogLevel = () => {
  const { t } = useI18n()

  const modifyNodeLogLevelToDebug = async (nodeName: string, logLevel: string) => {
    try {
      const currentLogLevel = logLevel === 'debug' ? 'notice' : 'debug'
      await updateNodeLogLevelToDebug(nodeName, currentLogLevel)
      EmqxMessage.success(t('config.modifyNodeLogLevelSuc'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    }
  }

  return {
    modifyNodeLogLevelToDebug,
  }
}

export const useDriverName = () => {
  const isNotSupportRemoveNode = computed(() => (nodeName: string) => {
    const nodeNameLowerCase = nodeName?.toLocaleLowerCase()
    const whiteList = ['data-stream-processing', 'monitor']
    return whiteList.includes(nodeNameLowerCase)
  })

  const isMonitorNode = (nodeName: string) => nodeName?.toLowerCase() === 'monitor'

  return {
    isNotSupportRemoveNode,
    isMonitorNode,
  }
}

export const useDriverInfo = (node?: Record<string, any>) => {
  const route = useRoute()

  const nodePlugin = computed(() => {
    return node?.plugin || route.params?.plugin?.toString() || ''
  })

  const isMQTTPugin = computed(() => nodePlugin.value && nodePlugin.value.toLocaleLowerCase() === 'mqtt')

  return {
    nodePlugin,
    isMQTTPugin,
  }
}

export const useListShowType = () => {
  const store = useStore()

  const showType = computed({
    get: () => store.state.listShowType,
    set: (val) => {
      store.commit('SET_LIST_SHOW_TYPE', val)
    },
  })
  return {
    showType,
  }
}
