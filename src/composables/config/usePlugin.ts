import { ref, computed, Ref, ComputedRef } from 'vue'
import { NORTH_DRIVER_NODE_TYPE } from '@/utils/constants'
import { DriverDirection, PluginKind } from '@/types/enums'
import { addPlugin, queryPluginList } from '@/api/config'
import { CreatedPlugin, PluginForm } from '@/types/config'
import { createCommonErrorMessage, createOptionListFromEnum } from '@/utils/utils'
import { useI18n } from 'vue-i18n'
import { EmqxMessage } from '@emqx/emqx-ui'

export default () => {
  const totalPluginList: Ref<Array<CreatedPlugin>> = ref([])

  const northPluginList: ComputedRef<Array<CreatedPlugin>> = computed(() =>
    totalPluginList.value.filter(({ node_type }) => NORTH_DRIVER_NODE_TYPE.some((typeItem) => typeItem === node_type)),
  )
  const southPluginList: ComputedRef<Array<CreatedPlugin>> = computed(() =>
    totalPluginList.value.filter(({ node_type }) => node_type === DriverDirection.South),
  )

  const getPluginList = async () => {
    const { data } = await queryPluginList()
    totalPluginList.value = data.plugin_libs || []
  }

  getPluginList()

  return {
    northPluginList,
    southPluginList,
    getPluginList,
  }
}

const usePluginKindSelect = () => {
  const pluginKindList = createOptionListFromEnum(PluginKind)
  return {
    pluginKindList,
  }
}

export const useAddPlugin = () => {
  const createRawPluginForm = (type: DriverDirection): PluginForm => ({
    node_type: type,
    name: '',
    kind: null,
    lib_name: '',
  })
  const { t } = useI18n()
  const pluginForm = ref(createRawPluginForm(DriverDirection.North))
  const pluginFormCom = ref()
  const pluginFormRules = {
    name: [
      {
        required: true,
        message: createCommonErrorMessage('input', t('common.name')),
      },
    ],
    node_type: [
      {
        required: true,
        message: createCommonErrorMessage('select', t('config.useFor')),
      },
    ],
    kind: [
      {
        required: true,
        message: createCommonErrorMessage('select', t('common.type')),
      },
    ],
    lib_name: [
      {
        required: true,
        message: createCommonErrorMessage('input', t('config.libName')),
      },
    ],
  }
  const isSubmitting = ref(false)

  const { pluginKindList } = usePluginKindSelect()
  const useForOptionList = [
    { label: t('config.northApp'), value: DriverDirection.North },
    { label: t('config.southDriver'), value: DriverDirection.South },
  ]

  const submitData = async () => {
    try {
      await pluginFormCom.value.validate()
      isSubmitting.value = true
      await addPlugin(pluginForm.value)
      EmqxMessage.success(t('common.createSuccess'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    pluginForm,
    pluginFormCom,
    pluginFormRules,
    useForOptionList,
    pluginKindList,
    isSubmitting,
    createRawPluginForm,
    submitData,
  }
}