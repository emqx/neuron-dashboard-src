import { queryNodeState, queryNorthDriverList, querySouthDriverList } from '@/api/config'
import type { DriverItemInList, RawDriverData, DriverStateData, DriverAllStatusData } from '@/types/config'
import { DriverDirection } from '@/types/enums'
import { createMapFromArray } from '@/utils/utils'
import type { Ref } from 'vue'
import { ref } from 'vue'

export const useNodeMsgMap = (direction: DriverDirection, autoInit = true) => {
  const nodeMsgMap: Ref<Record<string, RawDriverData>> = ref({})

  const initMap = async () => {
    try {
      const request = direction === DriverDirection.North ? queryNorthDriverList : querySouthDriverList
      nodeMsgMap.value = createMapFromArray(await request(), 'name')

      return Promise.resolve(nodeMsgMap.value)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  const getNodeMsgById = (node: string) => {
    return nodeMsgMap.value[node] || {}
  }

  if (autoInit) {
    initMap()
  }

  return {
    initMap,
    getNodeMsgById,
  }
}

export const useFillNodeListStatusData = () => {
  const mapStatusList = (list: Array<DriverAllStatusData>) => {
    let newList = new Map()
    if (list?.length) {
      newList = new Map(list.map((value: any) => [value.node, value]))
    }
    return newList
  }

  const fillNodeListStatusData = async (nodeList: Array<RawDriverData>): Promise<Array<DriverItemInList>> => {
    if (!nodeList?.length) return []
    const { data } = await queryNodeState()
    const allStatus = mapStatusList(data?.states)

    return Promise.all(
      nodeList.map(async (item) => {
        const itemStatus = allStatus.get(item.name)
        const itemStatusData: DriverStateData = {
          running: !itemStatus ? 1 : itemStatus.running,
          link: !itemStatus ? 0 : itemStatus.link,
          rtt: Number(itemStatus?.rtt) || 0,
          log_level: itemStatus.log_level,
        }
        const node = Object.assign(item, itemStatusData)
        return Promise.resolve(node)
      }),
    )
  }
  return {
    fillNodeListStatusData,
  }
}

export default () => {
  /**
   * total north driver list & south driver list
   */
  const nodeList: Ref<Array<RawDriverData>> = ref([])

  const getNodeList = async () => {
    const ret = await Promise.all([queryNorthDriverList(), querySouthDriverList()])
    nodeList.value = ret.reduce((pre, curr) => pre.concat(curr), [])
  }

  const getNodeNameById = (node: string) => {
    return nodeList.value.find(({ name }) => name === node)?.name || ''
  }

  getNodeList()

  return {
    nodeList,
    getNodeNameById,
  }
}
