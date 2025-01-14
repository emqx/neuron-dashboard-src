<template>
  <div
    class="node-card setup-item-card"
    :class="{ 'row-disabled': isMonitorNode(data.name) }"
    @click="goGroupPage(data)"
  >
    <div class="node-item-hd common-flex">
      <p class="setup-item-name ellipsis">{{ data.name }}</p>
      <div v-if="isAdminUser" class="setup-item-handlers">
        <AComWithDesc :content="$t('config.appConfig')">
          <i class="iconfont iconsetting" @click.stop="goNodeConfig(data)"></i>
        </AComWithDesc>
        <AComWithDesc :content="$t('config.dataStatistics')">
          <i class="iconfont iconstatus" @click.stop="isShowDataStatistics(data)"></i>
        </AComWithDesc>

        <!-- `monitor` driver and user role not `admin` does not support deletion and editing -->
        <AComWithDesc v-if="isMonitorNode(data.name)" :content="$t('config.updateDebugLogLevel')">
          <img
            class="img-debug-log-large"
            src="~@/assets/images/debug-log-icon.png"
            alt="debug-log"
            @click.stop="handleClickOperator('debugLogLevel')"
          />
        </AComWithDesc>

        <emqx-dropdown v-else trigger="click" @command="handleClickOperator">
          <AComWithDesc :content="$t('common.more')">
            <span class="el-dropdown-link" @click.stop>
              <i class="el-icon-more" />
            </span>
          </AComWithDesc>
          <template #dropdown>
            <emqx-dropdown-menu>
              <emqx-dropdown-item class="operation-item-wrap" command="edit">
                <i class="el-icon-edit-outline operation-icon" />
                <span>{{ $t(`common.edit`) }}</span>
              </emqx-dropdown-item>
              <emqx-dropdown-item class="operation-item-wrap" command="debugLogLevel">
                <img
                  v-if="data.log_level === 'debug'"
                  class="operation-image"
                  src="~@/assets/images/debug-log-off.png"
                  alt="debug-log"
                />
                <img v-else class="operation-image" src="~@/assets/images/debug-log-on.png" alt="debug-log" />
                <span>{{ $t(`config.updateDebugLogLevel`) }}</span>
              </emqx-dropdown-item>
              <emqx-dropdown-item
                v-if="!isNotSupportRemoveNode(data.name)"
                class="operation-item-wrap"
                command="delete"
                :disabled="data.pluginKind === PluginKind.Static"
              >
                <i class="iconfont icondelete operation-icon" />
                <span>{{ $t(`common.delete`) }}</span>
              </emqx-dropdown-item>
            </emqx-dropdown-menu>
          </template>
        </emqx-dropdown>
      </div>
      <div v-else class="setup-item-handlers">
        <AComWithDesc :content="$t('config.dataStatistics')">
          <i class="iconfont iconstatus" @click.stop="isShowDataStatistics(data)"></i>
        </AComWithDesc>
      </div>
    </div>

    <div class="node-item-info-row common-flex">
      <div class="common-flex">
        <label>{{ $t('config.workStatus') }}</label>
        <div>
          <svg class="iconfont icon-svg" aria-hidden="true">
            <use :xlink:href="`#${statusIcon}`" />
          </svg>
          <span>{{ statusText }}</span>
        </div>
      </div>
      <div v-if="isAdminUser" class="common-flex">
        <emqx-switch v-model="nodeStartStopStatus" @click.stop />
      </div>
    </div>
    <div class="node-item-info-row">
      <label>{{ $t('config.connectionStatus') }}</label>
      <span>{{ connectionStatusText }}</span>
    </div>
    <div class="node-item-info-row">
      <label>{{ $t('config.plugin') }}: </label>
      <span>{{ data.plugin }}</span>
    </div>
  </div>

  <!-- Data Statistics -->
  <DataStatisticsDrawer
    v-if="dataStatisticsVisiable"
    v-model="dataStatisticsVisiable"
    :type="NodeCatogery.North"
    :node-name="data.name"
  ></DataStatisticsDrawer>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue'
import type { PropType } from 'vue'
import { useDriverStatus, useNodeStartStopStatus, dataStatistics, useDriverName } from '@/composables/config/useDriver'
import useNorthDriver from '@/composables/config/useNorthDriver'
import { PluginKind, NodeCatogery } from '@/types/enums'
import type { DriverItemInList } from '@/types/config'
import AComWithDesc from '@/components/AComWithDesc.vue'
import DataStatisticsDrawer from '../../components/dataStatisticsDrawer.vue'
import useUser from '@/composables/useUser'

const emit = defineEmits(['toggleStatus', 'clickOperation'])

const props = defineProps({
  data: { type: Object as PropType<DriverItemInList>, required: true },
})

const { isAdminUser } = useUser()

const { goNodeConfig, goGroupPage } = useNorthDriver(false)
const { statusIcon, statusText, connectionStatusText } = useDriverStatus(props)

const { countNodeStartStopStatus } = useNodeStartStopStatus()

const nodeStartStopStatus = computed({
  get() {
    return countNodeStartStopStatus(props.data)
  },
  set(val) {
    emit('toggleStatus', val)
  },
})

// dataStatistics
const { isShowDataStatistics, dataStatisticsVisiable } = dataStatistics()

// more operators
const handleClickOperator = async (command: string) => {
  emit('clickOperation', command)
}

const { isNotSupportRemoveNode, isMonitorNode } = useDriverName()
</script>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';

.setup-item-card {
  background-color: #eef8ff;
}
.setup-item-handlers {
  @include display-flex();
}
.img-debug-log-large {
  cursor: pointer;
  width: 18px;
}

.operation-item-wrap {
  display: flex;
  align-items: center;
}
.operation-icon {
  font-size: 20px;
  color: #20466c;
}
.operation-image {
  margin-right: 8px;
  position: relative;
  left: 2px;
  width: 18px;
  cursor: pointer;
}
</style>
