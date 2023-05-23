import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { EmqxMessage } from '@emqx/emqx-ui'
import { queryPluginConfigInfo } from '@/api/config'
import { addGroup } from '@/api/template'
import useTemplateList from '@/composables/config/useTemplateList'
import { useGetPluginMsgIdMap } from './usePlugin'
import type { TemplateGroupForm } from '@/types/config'

export default () => {
  const createRawForm = (): TemplateGroupForm => ({
    group: '',
    template: null,
    interval: null,
  })

  const { t } = useI18n()
  const route = useRoute()

  const { templateList } = useTemplateList()

  const groupDialogVisible = ref(false)
  const groupForm = ref(createRawForm())
  const isEditGroup = ref(false)
  const isSubmitting = ref(false)

  // get template& its plugin
  const template = computed(() => route.params.template.toString())
  const templatePlugin = computed(() => {
    const tem = templateList.value.find(({ name }) => name === template.value)
    return tem?.plugin || ''
  })

  const showDialog = () => {
    groupDialogVisible.value = true
    groupForm.value.template = template.value
  }

  // Get group default interval
  const { pluginMsgIdMap, initMsgIdMap } = useGetPluginMsgIdMap()
  const getPluginConfigInfo = async () => {
    await initMsgIdMap()
    const pluginName = templatePlugin.value
    const nodePluginToLower = pluginName.toLocaleLowerCase()
    const schemaName = pluginMsgIdMap[pluginName]?.schema || nodePluginToLower

    const { data } = await queryPluginConfigInfo(schemaName)
    const { group_interval } = data

    if (group_interval !== undefined || group_interval !== null) {
      groupForm.value.interval = group_interval || null
    }
  }

  // Add group
  const handleAddGroup = () => {
    showDialog()
    isEditGroup.value = false
    // set plugin default inteval
    getPluginConfigInfo()
  }

  const submitForm = async () => {
    try {
      isSubmitting.value = true

      const data = { ...groupForm.value }
      if (!isEditGroup.value) {
        await addGroup(data)
      } else {
        // TODO: edit
      }

      groupDialogVisible.value = false
      EmqxMessage.success(t('common.submitSuccess'))
      return Promise.resolve()
    } catch (error) {
      return Promise.reject()
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    getPluginConfigInfo,
    handleAddGroup,

    groupDialogVisible,
    groupForm,

    isEditGroup,

    isSubmitting,
    submitForm,
  }
}
