import { AxiosResponse } from 'axios'
import { DriverDirection } from '@/types/enums'
import http, { handleError } from '@/utils/http'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import {
  CreatedPlugin,
  DriverItem,
  GroupData,
  GroupForm,
  NodeForm,
  AllPluginConfigInfo,
  PluginForm,
  ResponseDriverListData,
  SubscriptionData,
  TagData,
  TagForm,
} from '@/types/config'
import router from '@/router/index'

/* NODE(DRIVER & APP) */

const queryDriverList = (nodeType: number): Promise<AxiosResponse<ResponseDriverListData>> => {
  return http.get('/node', { params: { type: nodeType } })
}

const getDataFromResponse = (res: AxiosResponse<ResponseDriverListData>): Array<DriverItem> => res?.data?.nodes || []

export const queryNorthDriverList = async (): Promise<Array<DriverItem>> => {
  try {
    const request = await queryDriverList(DriverDirection.North)
    return Promise.resolve(getDataFromResponse(request))
  } catch (error) {
    return Promise.reject(error)
  }
}

export const querySouthDriverList = async (): Promise<Array<DriverItem>> => {
  const ret = await queryDriverList(DriverDirection.South as number)
  return getDataFromResponse(ret)
}

export const addDriver = (driverData: NodeForm, direction: DriverDirection) => {
  return http.post('/node', {
    ...driverData,
    node_type: direction,
  })
}

export const deleteDriver = (id: number) => {
  return http.delete('/node', { data: { id } })
}

export const updateDriver = (data: NodeForm) => {
  return http.put('/node', data)
}

/* NORTH APP */
export const addSubscription = (data: SubscriptionData) => {
  return http.post('/subscribe', data)
}

export const deleteSubscription = (data: SubscriptionData) => {
  return http.delete('/subscribe', { data })
}

export const querySubscription = (node_id: number) => {
  return http.get('/subscribe', { params: { node_id } })
}

/**
 * Obtain which fields need to be configured for each plugin
 * And specific information about these fields
 */
export const queryPluginConfigInfo = (): Promise<AxiosResponse<AllPluginConfigInfo>> => {
  return http.get('/schema/plugin')
}

export const submitNodeConfig = (nodeID: number, form: Record<string, any>) => {
  return http.post('/node/setting', {
    node_id: nodeID,
    params: form,
  })
}

export const queryNodeConfig = (nodeID: number) => {
  const request = http.create()
  request.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        router.push({ name: 'Login' })
      } else if (error.response.status === 404) {
        return Promise.resolve({ data: null })
      } else {
        handleError(error)
      }
      return Promise.reject(error)
    },
  )
  return request.get('/node/setting', { params: { node_id: nodeID } })
}

/* GROUP */

export const queryGroupList = async (nodeID: number): Promise<Array<GroupData>> => {
  const { data }: AxiosResponse<{ error: number; group_configs: Array<GroupData> }> = await http.get('/gconfig', {
    params: { node_id: nodeID },
  })
  return Promise.resolve(data?.group_configs || [])
}

export const deleteGroup = async (nodeID: number, groupName: string): Promise<AxiosResponse> => {
  return http.delete('/gconfig', {
    data: { node_id: nodeID, name: groupName },
  })
}

export const addGroup = async (data: GroupForm): Promise<AxiosResponse> => {
  const { name, interval, node_id } = data
  return http.post('/gconfig', {
    name,
    node_id,
    interval: Number(interval),
    dst_node_id: 1,
  })
}

export const updateGroup = async (data: GroupForm): Promise<AxiosResponse> => {
  const { name, interval, node_id } = data
  return http.put('/gconfig', {
    name,
    node_id,
    interval: Number(interval),
    dst_node_id: 1,
  })
}

/* TAG */

export const queryTagList = async (nodeID: number, groupName: string): Promise<Array<TagData>> => {
  const { data } = await http.get('/tags', { params: { node_id: nodeID, group_config_name: groupName } })
  return Promise.resolve(data.tags || [])
}

export const addTag = (data: { node_id: number; group_config_name: string; tags: Array<TagForm> }) => {
  return http.post('/tags', data)
}

export const deleteTag = (data: {
  node_id: number
  group_config_name: string
  ids: Array<number>
}): Promise<AxiosResponse> => {
  return http.delete('/tags', { data })
}

export const updateTag = (nodeID: number, tag: TagForm) => {
  return http.put('/tags', {
    node_id: nodeID,
    tags: [tag],
  })
}

/* PLUGIN */

export const queryPluginList = (): Promise<AxiosResponse<{ plugin_libs: Array<CreatedPlugin> }>> => {
  return http.get('/plugin')
}

export const addPlugin = (data: PluginForm) => {
  return http.post('/plugin', data)
}

export const updatePlugin = (data: PluginForm) => {
  return http.put('/plugin', data)
}

export const deletePlugin = (id: number) => {
  return http.delete('/plugin', { data: { id } })
}
