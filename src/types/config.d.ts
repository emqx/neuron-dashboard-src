import type { Merge } from 'type-fest'
import type {
  DriverDirection,
  NodeLinkState,
  NodeState,
  ParamRequired,
  PluginKind,
  TypeOfPluginParam,
  SchameBase,
} from './enums'

/**
 * Params get from API
 */
type Parm = Array<{ vars: string; pars: string }>

export interface PluginForm {
  library: string
}

export interface CreatedPlugin extends PluginForm {
  kind: PluginKind | null
  node_type: DriverDirection | null
  name: string
  description: string
  description_zh?: string
  schema?: string
  // doc_link?: string
}

export interface NodeForm {
  name: string
  plugin: string
  template: string
}
export type NodeFormWithTemplate = Pick<NodeForm, 'name' | 'template'>
export type NodeFormWithPlugin = Pick<NodeForm, 'name' | 'plugin'>

export interface SubscriptionDataForm {
  app: string | null
  driver: string
  group: string
  topic?: string
}

export interface SubscriptionData extends SubscriptionDataForm {
  app: string
  driver: string
  group: string
  params?: {
    topic: string
  }
}

export interface RawDriverData {
  name: string
  plugin: string
}

export interface DriverStateData {
  running: NodeState
  link: NodeLinkState
  rtt?: number
  log_level: string
}

export interface DriverAllStatusData {
  node: string
  running: NodeState
  link: NodeLinkState
}

export type DriverItemInList = Merge<
  Merge<RawDriverData, DriverStateData>,
  {
    pluginKind?: PluginKind
    plugin: string
    statusText?: string
    connectionStatusText?: string
  }
>

export interface ResponseDriverListData {
  function: number
  nodes: Array<RawDriverData>
}

interface ParamBaseInfo {
  description: string
  description_zh?: string
  name: string
  name_zh: string
  attribute: ParamRequired
  base?: SchameBase
  condition?: {
    field: string
    value: boolean | number | string
    values?: Array<any>
    regex: string
  }
}

export interface NumberParamInfo extends ParamBaseInfo {
  type: TypeOfPluginParam.Int
  default?: number
  valid: {
    min: number
    max: number
  }
}

export interface StringParamInfo extends ParamBaseInfo {
  type: TypeOfPluginParam.String
  default?: string
  valid: {
    regex: string
    length: number
  }
}

interface BoolParamInfo extends ParamBaseInfo {
  type: TypeOfPluginParam.Boolean
  default?: boolean
  valid: Record<string, never>
}

interface FileParamInfo extends ParamBaseInfo {
  type: TypeOfPluginParam.File
  default?: string
  valid: Record<string, never>
}

interface MapItem {
  key: string
  value: number
}
interface MapParamInfo extends ParamBaseInfo {
  type: TypeOfPluginParam.Map
  default?: number
  valid: {
    map: Array<MapItem>
  }
}
interface ArrayParamInfo extends ParamBaseInfo {
  type: TypeOfPluginParam.Array
  default?: Array<any>
  fields: Array<NumberParamInfo | StringParamInfo | BoolParamInfo | MapParamInfo>
  valid: {
    min_length: number
    max_length: number
  }
}

export type ParamInfo =
  | NumberParamInfo
  | StringParamInfo
  | BoolParamInfo
  | MapParamInfo
  | FileParamInfo
  | ArrayParamInfo

interface TagRegex {
  type: number
  regex: string
}
export interface PluginInfo {
  tag_type: Array<TagType>
  tag_regex: Array<TagRegex>
  group_interval: number | null
  // TODO: delete params after api changed
  params: Array<string>
  /**
   * params items
   */
  [propName: string]: ParamInfo
}

export interface GroupFormDefault {
  /**
   * Name
   */
  group: string
  interval: number | null
}
export interface GroupForm {
  /**
   * Name
   */
  group: string
  interval: number | null
  node: string | null
}

export interface GroupData extends Omit<GroupForm, 'node'> {
  pipe_count: number
  tag_count: number
  name: string
}

export interface TagForm {
  name: string
  address?: string
  attribute: number | undefined
  type: number | null
  description: string
  precision?: number | undefined
  decimal?: number | null
  value?: string | number | undefined
}
export interface TagFormItem extends TagForm {
  id: string
}
export interface AddTagListForm {
  tagList: Array<TagFormItem>
}

export interface TagData extends TagForm {
  group: string
}

// Template
export interface RawTemplateData {
  name: string
  plugin: string
}
export interface TemplateGroup {
  name: string
  interval: number | null
  tags?: Array<TagForm>
}
export interface TemplateFormData extends RawTemplateData {
  groups?: Array<TemplateGroup>
}

export interface TemplateGroupForm extends GroupFormDefault {
  template: string | null
}
