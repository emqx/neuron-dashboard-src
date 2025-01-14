<template>
  <div class="node-card south-drive-item-card" @click.stop.prevent="goGroupPage(data)">
    <div class="node-item-hd common-flex">
      <p class="south-drive-item-name ellipsis">{{ data.name }}</p>
      <div v-if="isAdminUser" class="setup-item-handlers">
        <AComWithDesc :content="$t('config.deviceConfig')">
          <i class="iconfont iconsetting" @click.stop="goNodeConfig(props.data)"></i>
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
              <emqx-dropdown-item class="operation-item-wrap" command="delete">
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
    <div>
      <div class="node-item-info-row common-flex">
        <div class="common-flex">
          <label>{{ $t('config.workStatus') }}:</label>
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
        <label>{{ $t('config.connectionStatus') }}:</label>
        <span>{{ connectionStatusText }}</span>
      </div>
      <div class="node-item-info-row">
        <label>{{ $t('config.delayTime') }}: </label>
        <span>{{ data.rtt }} {{ $t('common.ms') }}</span>
      </div>
      <div class="node-item-info-row">
        <label>{{ $t('config.plugin') }}: </label>
        <span>{{ data.plugin }}</span>
      </div>
    </div>
  </div>

  <!-- Data Statistics -->
  <DataStatisticsDrawer
    v-if="dataStatisticsVisiable"
    v-model="dataStatisticsVisiable"
    :type="NodeCatogery.South"
    :node-name="data.name"
  ></DataStatisticsDrawer>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, defineEmits, defineProps } from 'vue'
import { useDriverStatus, useNodeStartStopStatus, dataStatistics, useDriverName } from '@/composables/config/useDriver'
import useSouthDriver from '@/composables/config/useSouthDriver'
import type { DriverItemInList } from '@/types/config'
import { NodeCatogery } from '@/types/enums'
import AComWithDesc from '@/components/AComWithDesc.vue'
import DataStatisticsDrawer from '../../components/dataStatisticsDrawer.vue'
import useUser from '@/composables/useUser'

const props = defineProps({
  data: {
    type: Object as PropType<DriverItemInList>,
    required: true,
  },
})

const emit = defineEmits(['toggleStatus', 'clickOperation'])

const { isAdminUser } = useUser()

const { goGroupPage, goNodeConfig } = useSouthDriver(false)
const { statusIcon, statusText, connectionStatusText } = useDriverStatus(props)

const { countNodeStartStopStatus } = useNodeStartStopStatus()
const { isMonitorNode } = useDriverName()

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
</script>

<style lang="scss" scoped>
.south-drive-item-card {
  background-color: #f0eeff;
  label {
    display: inline-block;
  }
}
.operation-item-wrap {
  display: flex;
  align-items: center;
}
.operation-image {
  margin-right: 8px;
  position: relative;
  left: 2px;
  width: 18px;
  cursor: pointer;
}
.operation-icon {
  font-size: 20px;
  color: #20466c;
}

.img-debug-log-large {
  cursor: pointer;
  width: 18px;
}
</style>
