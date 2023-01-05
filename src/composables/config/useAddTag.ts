import { addTag, queryPluginConfigInfo } from '@/api/config'
import type { PluginInfo, TagForm } from '@/types/config'
import { DriverDirection, TagAttributeType, TagType } from '@/types/enums'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EmqxMessage } from '@emqx/emqx-ui'
import { useI18n } from 'vue-i18n'
import type TagFormCom from '@/views/config/southDriver/components/TagForm.vue'
import { createRandomString, getErrorMsg, jumpToFirstErrorFormItem, popUpErrorMessage } from '@/utils/utils'
import { useNodeMsgMap } from './useNodeList'
import { useGetPluginMsgIdMap } from './usePlugin'

export const useTagTypeSelect = () => {
  const tagTypeOptList = Object.keys(TagType)
    .filter((key) => typeof TagType[key as keyof typeof TagType] === 'string')
    .map((key) => ({
      value: Number(key),
      label: TagType[key as keyof typeof TagType],
    }))

  const findLabelByValue = (val: number) => tagTypeOptList.find(({ value }) => val === value)?.label || ''

  const findValueByLabel = (lab: TagType) => tagTypeOptList.find(({ label }) => label === lab)?.value || undefined

  return {
    tagTypeOptList,
    findLabelByValue,
    findValueByLabel,
  }
}

export const useTagAttributeTypeSelect = () => {
  const tagAttributeTypeOptList = Object.keys(TagAttributeType)
    .filter((key) => typeof TagAttributeType[key as keyof typeof TagAttributeType] === 'string')
    .map((key) => ({
      value: Number(key),
      label: TagAttributeType[key as keyof typeof TagAttributeType],
    }))

  // 1, 2, 4
  // Possible values are 1, 2, 3, 4, 5, 6, 7
  const tagAttrValueMap = {
    1: [1],
    2: [2],
    3: [1, 2],
    4: [4],
    5: [1, 4],
    6: [2, 4],
    7: [1, 2, 4],
  }

  const findLabelByValue = (val: number) => tagAttributeTypeOptList.find(({ value }) => val === value)?.label || ''
  const findValueByLabel = (lab: any) => tagAttributeTypeOptList.find(({ label }) => label === lab)?.value || undefined

  const getAttrStrByValue = (val: number, filler = ', ') => {
    const key = Number(Object.keys(tagAttrValueMap).find((total) => Number(total) === val))
    const valueArr = tagAttrValueMap[key as keyof typeof tagAttrValueMap]
    return valueArr.map((value) => findLabelByValue(value)).join(filler)
  }

  // "Write Subscribe" to 5
  const getTotalValueByStr = (str: string, separator: string): number | undefined => {
    try {
      if (!str) {
        return undefined
      }
      const labelArr = str.split(separator)
      let ret = 0
      let currentValue: number | undefined = 0
      for (const label of labelArr) {
        currentValue = findValueByLabel(label)
        if (!currentValue) {
          return undefined
        }
        ret += currentValue
      }
      return ret
    } catch (error) {
      return undefined
    }
  }

  return {
    tagAttributeTypeOptList,
    tagAttrValueMap,
    getAttrStrByValue,
    findLabelByValue,
    getTotalValueByStr,
  }
}

export const useTagPrecision = () => {
  const isShowPrecisionField = computed(() => (type: number | null) => {
    if (type === null || type === undefined) return false

    const whiteList = [9, 10] // FLOAT | DOUBLE
    const res: boolean = whiteList.includes(type)
    return res
  })

  const tagPrecisionValue = computed(() => (type: number, value: number) => {
    if (!isShowPrecisionField.value(type)) {
      return '-'
    }
    return !value ? '-' : value
  })

  return {
    isShowPrecisionField,
    tagPrecisionValue,
  }
}
export const useTagDecimal = () => {
  const tagDecimalValue = computed(() => (value: number) => {
    if (!value) {
      return '-'
    }
    return value
  })

  return {
    tagDecimalValue,
  }
}

interface TagFormItem extends TagForm {
  id: string
}

export default () => {
  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const createRawTagForm = (): TagFormItem => ({
    name: '',
    address: '',
    attribute: undefined,
    type: null,
    // for the key when use v-for
    id: createRandomString(6),
    description: '',
  })

  const tagFormComList: Ref<Array<typeof TagFormCom>> = ref([])
  const tagList: Ref<Array<TagFormItem>> = ref([createRawTagForm()])
  const isSubmitting = ref(false)

  const node = computed(() => route.params.node.toString())
  const { getNodeMsgById, initMap } = useNodeMsgMap(DriverDirection.South, false)
  // Limit the type of tag
  const nodePluginInfo: Ref<PluginInfo> = ref({} as PluginInfo)

  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()

  const getNodePluginInfo = async () => {
    await initMap()
    await initMsgIdMap()
    const pluginName = getNodeMsgById(node.value).plugin
    const schemaName = pluginMsgIdMap[pluginName]?.schema

    if (schemaName) {
      const { data } = await queryPluginConfigInfo(schemaName)
      const plugin: PluginInfo = data
      if (plugin) {
        nodePluginInfo.value = plugin
      }
    }
  }

  const setFormRef = (com: typeof TagFormCom) => {
    if (com) {
      tagFormComList.value.push(com)
    }
  }

  const addTagItem = () => {
    tagList.value.push(createRawTagForm())
  }

  const deleteTagItem = (index: number) => {
    tagList.value.splice(index, 1)
  }

  const handlePartialSuc = (errIndex: number, errorNum: number) => {
    if (errIndex === 0) {
      popUpErrorMessage(errorNum)
      return
    }
    EmqxMessage.error(t('config.tagPartAddedFailedPopup', [getErrorMsg(errorNum)]))
    tagList.value = tagList.value.slice(errIndex)
  }

  const submit = async () => {
    let pass = true
    try {
      await Promise.all(tagFormComList.value.map((com: typeof TagFormCom) => com.validate()))
    } catch (error) {
      pass = false
      jumpToFirstErrorFormItem()
    }
    if (!pass) {
      return
    }
    try {
      isSubmitting.value = true
      const nodeName = route.params.node.toString()
      const groupName: string = route.params.group as string
      const tags = tagList.value.map(({ id, ...tagData }) => tagData)
      await addTag({ tags, node: nodeName, group: groupName })
      EmqxMessage.success(t('common.createSuccess'))
      router.push({
        name: 'SouthDriverGroupTag',
      })
    } catch (error: any) {
      const { data = {} } = error
      if (data.error !== 0 && data.index !== undefined) {
        handlePartialSuc(data.index, data.error)
      }
    } finally {
      isSubmitting.value = false
    }
  }

  const cancel = () => {
    router.back()
  }

  getNodePluginInfo()
  return {
    nodePluginInfo,
    tagList,
    isSubmitting,

    createRawTagForm,
    addTagItem,
    deleteTagItem,
    setFormRef,
    cancel,
    submit,
  }
}
