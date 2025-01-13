<template>
  <article class="page-noraml-card" v-emqx-loading="isListLoading">
    <PageTitle :title="$t('config.northAppSetup')"></PageTitle>
    <ViewHeaderBar>
      <template v-slot:right>
        <ListCardSwitch class="header-item" v-model="showType" />
        <emqx-button
          v-if="isAdminUser"
          type="primary"
          size="small"
          class="header-item btn"
          icon="iconfont iconcreate"
          @click="addConfig"
        >
          {{ $t('config.addApplication') }}
        </emqx-button>
      </template>
    </ViewHeaderBar>

    <ul v-if="showType === 'card'" class="setup-list">
      <emqx-row :gutter="20">
        <emqx-col :span="8" v-for="(item, index) in northDriverList" :key="item.name" tag="li" class="setup-item">
          <SetupItemCard
            :data="item"
            @toggle-status="setNodeStartStopStatus(item, $event, index)"
            @clickOperation="handleClickOperator($event, item)"
          />
        </emqx-col>
      </emqx-row>
    </ul>

    <emqx-table
      v-if="showType === 'list'"
      :data="northDriverList"
      :empty-text="$t('common.emptyData')"
      :row-class-name="rowClassName"
      :default-sort="{ prop: sortBy.prop, order: `${sortBy.order}ending` }"
      @sort-change="sortDataByKey"
      @row-click="goGroupPage"
    >
      <emqx-table-column :label="$t('common.name')" prop="name" sortable="custom" show-overflow-tooltip>
        <template #default="{ row }">
          <span v-if="isMonitorNode(row.name)">{{ row.name }}</span>
          <el-link v-else type="primary" :underline="false" href="javascript:;" @click.stop="goGroupPage(row, $event)">
            {{ row.name }}
          </el-link>
        </template>
      </emqx-table-column>
      <!--  workStatus-->
      <emqx-table-column :label="$t('config.workStatus')" prop="statusText" sortable="custom">
        <template #default="{ row }">
          <svg class="iconfont icon-svg" aria-hidden="true">
            <use :xlink:href="`#${getNodeValue(row).statusIcon.value}`" />
          </svg>
          {{ getNodeValue(row).statusText.value }}
        </template>
      </emqx-table-column>
      <!-- connectionStatus -->
      <emqx-table-column
        :label="$t('config.connectionStatus')"
        prop="connectionStatusText"
        sortable="custom"
        min-width="90"
      >
        <template #default="{ row }">
          {{ getNodeValue(row).connectionStatusText.value }}
        </template>
      </emqx-table-column>
      <emqx-table-column :label="$t('config.plugin')" prop="plugin" sortable="custom" />
      <emqx-table-column align="left" :label="$t('common.oper')" width="180px">
        <template #default="{ row, index }">
          <div v-if="isAdminUser" class="operator-wrap">
            <AComWithDesc :content="countNodeStartStopStatus(row) ? $t('common.stop') : $t('common.start')">
              <i
                :class="countNodeStartStopStatus(row) ? 'el-icon-video-pause' : 'el-icon-video-play'"
                class="operation-icon"
                @click.stop="setNodeStartStopStatus(row, !countNodeStartStopStatus(row), index)"
              />
            </AComWithDesc>
            <AComWithDesc :content="$t('config.appConfig')">
              <i class="iconfont iconsetting operation-icon" @click.stop="goNodeConfig(row)" />
            </AComWithDesc>

            <emqx-dropdown trigger="click" @command="handleClickOperator($event, row)">
              <AComWithDesc :content="$t('common.more')">
                <span class="el-dropdown-link" @click.stop>
                  <i class="el-icon-more operation-icon" />
                </span>
              </AComWithDesc>
              <template #dropdown>
                <emqx-dropdown-menu>
                  <!-- `monitor` driver and user role not `admin` does not support deletion and editing -->
                  <emqx-dropdown-item v-if="!isMonitorNode(row.name)" class="operation-item-wrap" command="edit">
                    <i class="el-icon-edit-outline operation-icon" />
                    <span>{{ $t(`common.edit`) }}</span>
                  </emqx-dropdown-item>
                  <emqx-dropdown-item class="operation-item-wrap" command="dataStatistics">
                    <i class="iconfont iconstatus operation-icon" />
                    <span>{{ $t(`config.dataStatistics`) }}</span>
                  </emqx-dropdown-item>
                  <emqx-dropdown-item class="operation-item-wrap" command="debugLogLevel">
                    <img
                      v-if="row.log_level === 'debug'"
                      class="operation-image img-debug-log"
                      src="~@/assets/images/debug-log-off.png"
                      alt="debug-log"
                    />
                    <img
                      v-else
                      class="operation-image img-debug-log"
                      src="~@/assets/images/debug-log-on.png"
                      alt="debug-log"
                    />
                    <span>{{ $t(`config.updateDebugLogLevel`) }}</span>
                  </emqx-dropdown-item>
                  <emqx-dropdown-item
                    v-if="!isNotSupportRemoveNode(row.name)"
                    command="delete"
                    class="operation-item-wrap"
                  >
                    <i class="iconfont icondelete operation-icon" />
                    <span>{{ $t(`common.delete`) }}</span>
                  </emqx-dropdown-item>
                </emqx-dropdown-menu>
              </template>
            </emqx-dropdown>
          </div>
          <div v-else class="operator-wrap">
            <AComWithDesc :content="$t('config.dataStatistics')">
              <i class="iconfont iconstatus operation-icon" @click.stop="handleClickOperator('dataStatistics', row)" />
            </AComWithDesc>
          </div>
        </template>
      </emqx-table-column>
    </emqx-table>

    <emqx-empty v-if="!isListLoading && northDriverList.length === 0" />
  </article>

  <DriverDialog v-model="showDialog" :type="DriverDirection.North" @submitted="getNorthDriverList" />

  <!-- Data Statistics -->
  <DataStatisticsDrawer
    v-if="dataStatisticsVisiable"
    v-model="dataStatisticsVisiable"
    :type="NodeCatogery.North"
    :node-name="nodeItemData.name"
  />

  <EditNodeNameDialog
    v-model="showEditDialog"
    :type="DriverDirection.North"
    :node-name="editDriverData.name"
    :node="editDriverData"
    @updated="reloadDriverList"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
import { useI18n } from 'vue-i18n'
import { ElLink } from 'element-plus'
import {
  useToggleNodeStartStopStatus,
  useDriverStatus,
  useNodeStartStopStatus,
  dataStatistics,
  useListShowType,
  useDriverName,
} from '@/composables/config/useDriver'
import useNorthDriver from '@/composables/config/useNorthDriver'
import type { DriverItemInList } from '@/types/config'
import { DriverDirection, NodeCatogery } from '@/types/enums'
import DriverDialog from '@/views/config/components/DriverDialog.vue'
import EditNodeNameDialog from '@/views/config/components/EditNodeNameDialog.vue'
import SetupItemCard from './components/SetupItemCard.vue'
import { EmqxMessage } from '@emqx/emqx-ui'
import ViewHeaderBar from '@/components/ViewHeaderBar.vue'
import ListCardSwitch from '@/components/ListCardSwitch.vue'
import AComWithDesc from '@/components/AComWithDesc.vue'
import PageTitle from '@/components/PageTitle.vue'
import DataStatisticsDrawer from '../components/dataStatisticsDrawer.vue'
import { isTheSameParentRoute } from '@/utils/utils'
import useUser from '@/composables/useUser'

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    const isSameParentRoute = isTheSameParentRoute(from, to)
    if (!isSameParentRoute) {
      store.commit('SET_LIST_SHOW_TYPE', 'card')
    }
    next()
  },
})
</script>

<script lang="ts" setup>
const { t } = useI18n()
const { isAdminUser } = useUser()

const {
  northDriverList,
  isListLoading,
  getNorthDriverList,
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
} = useNorthDriver(true, true)

const { isShowDataStatistics, dataStatisticsVisiable, nodeItemData } = dataStatistics()
const { isNotSupportRemoveNode, isMonitorNode } = useDriverName()

const { showType } = useListShowType()

const { toggleNodeStartStopStatus } = useToggleNodeStartStopStatus()
const { countNodeStartStopStatus } = useNodeStartStopStatus()

const setNodeStartStopStatus = async (node: DriverItemInList, status: boolean, nodeIndex: number) => {
  try {
    const ret = await toggleNodeStartStopStatus(node, status)
    const message = status ? t('config.runSuc') : t('config.stopSuc')
    EmqxMessage.success(message)
    if (typeof ret === 'object') {
      northDriverList.value.splice(nodeIndex, 1, ret)
    } else {
      getNorthDriverList()
    }
  } catch (error) {
    console.error(error)
  }
}

const getNodeValue = (node: DriverItemInList) => {
  const useDriverStatusSet = useDriverStatus({ data: node })
  return useDriverStatusSet
}

const rowClassName = (data: { row: DriverItemInList; rowIndex: number }) => {
  const { row: node } = data
  return isMonitorNode(node.name) ? 'row-disabled' : ''
}

const handleClickOperator = async (command: string, row: DriverItemInList) => {
  const apiMap = new Map([
    ['edit', editDialog],
    ['dataStatistics', isShowDataStatistics],
    ['debugLogLevel', modifyNodeLogLevel],
    ['delete', deleteDriver],
  ])
  const apiFunc = apiMap.get(command)
  if (apiFunc && typeof apiFunc === 'function') {
    apiFunc(row)
  }
}
</script>

<style lang="scss" scoped>
.setup-list {
  list-style: none;
  margin-top: 6px;

  .setup-item {
    margin-bottom: 24px;
  }
}

.operation-item-wrap {
  display: flex;
  align-items: center;
}
.operation-icon {
  font-size: 24px;
  color: #20466c;
}
.operation-image {
  margin-right: 8px;
  position: relative;
  left: 2px;
  width: 22px;
  cursor: pointer;
}
:deep(.row-disabled) {
  cursor: not-allowed;
}
</style>
