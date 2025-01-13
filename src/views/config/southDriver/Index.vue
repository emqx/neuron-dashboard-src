<template>
  <article class="page-noraml-card" v-emqx-loading="isListLoading">
    <PageTitle :title="$t('config.southDeviceManagement')" />
    <ViewHeaderBar>
      <template v-slot:right>
        <emqx-button
          v-if="isAdminUser"
          type="primary"
          size="small"
          icon="iconfont iconcreate"
          class="header-item btn"
          @click="addConfig"
        >
          {{ $t('config.addDevice') }}
        </emqx-button>
      </template>
      <template v-slot:left>
        <PluginListSelector
          v-model="queryKeyword.plugin"
          :type="DriverDirection.South"
          :size="'medium'"
          class="header-item"
          @change="dbGetSouthDriverList"
        />
        <KeywordSerachInput
          v-model="queryKeyword.node"
          class="header-item"
          @input="dbGetSouthDriverList"
          @clear="dbGetSouthDriverList"
          @enter="dbGetSouthDriverList"
        />
        <ListCardSwitch v-model="showType" @change="changeListShowMode" />
      </template>
    </ViewHeaderBar>

    <emqx-empty v-if="!isListLoading && southDriverList.length === 0 && !isSwitchListLoading" class="empty" />
    <div v-else>
      <!-- card show -->
      <ul v-if="showType === 'card'" class="setup-list">
        <emqx-row :gutter="20">
          <emqx-col :span="8" v-for="(item, index) in southDriverList" :key="item.name" tag="li" class="setup-item">
            <SouthDriveItemCard
              :data="item"
              @toggle-status="setNodeStartStopStatus(item, $event, index)"
              @clickOperation="handleClickOperator($event, item)"
            />
          </emqx-col>
        </emqx-row>
      </ul>

      <!-- table show -->
      <emqx-table
        v-if="showType === 'list'"
        :data="southDriverList"
        :empty-text="$t('common.emptyData')"
        :row-class-name="'table-row-click'"
        :default-sort="{ prop: sortBy.prop, order: `${sortBy.order}ending` }"
        @sort-change="sortDataByKey"
        @row-click="goGroupPage"
      >
        <emqx-table-column :label="$t('common.name')" prop="name" sortable="custom" show-overflow-tooltip>
          <template #default="{ row }">
            <el-link type="primary" :underline="false" href="javascript:;" @click="goGroupPage(row)">
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
        <emqx-table-column :label="$t('config.delayTime')">
          <template #default="{ row }"> {{ row.rtt }} {{ $t('common.ms') }} </template>
        </emqx-table-column>
        <emqx-table-column :label="$t('config.plugin')" prop="plugin" sortable="custom" />
        <emqx-table-column align="left" :label="$t('common.oper')" width="180px">
          <template #default="{ row, index }">
            <div v-if="isAdminUser" class="operator-wrap">
              <AComWithDesc :content="countNodeStartStopStatus(row) ? $t('common.stop') : $t('common.start')">
                <i
                  :class="countNodeStartStopStatus(row) ? 'el-icon-video-pause' : 'el-icon-video-play'"
                  @click.stop="setNodeStartStopStatus(row, !countNodeStartStopStatus(row), index)"
                />
              </AComWithDesc>
              <AComWithDesc :content="$t('config.deviceConfig')">
                <i class="iconfont iconsetting" @click.stop="goNodeConfig(row)" />
              </AComWithDesc>

              <emqx-dropdown trigger="click" @command="handleClickOperator($event, row)">
                <AComWithDesc :content="$t('common.more')">
                  <span class="el-dropdown-link" @click.stop>
                    <i class="el-icon-more" />
                  </span>
                </AComWithDesc>
                <template #dropdown>
                  <emqx-dropdown-menu>
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
                    <emqx-dropdown-item class="operation-item-wrap" command="delete">
                      <i class="iconfont icondelete operation-icon" />
                      <span>{{ $t(`common.delete`) }}</span>
                    </emqx-dropdown-item>
                  </emqx-dropdown-menu>
                </template>
              </emqx-dropdown>
            </div>
            <div v-else class="operator-wrap">
              <AComWithDesc :content="$t('config.dataStatistics')">
                <i
                  class="iconfont iconstatus operation-icon"
                  @click.stop="handleClickOperator('dataStatistics', row)"
                />
              </AComWithDesc>
            </div>
          </template>
        </emqx-table-column>
      </emqx-table>
      <emqx-pagination
        v-if="pageController.total > 30"
        layout="total, sizes, prev, pager, next, jumper"
        v-model:current-page="pageController.pageNum"
        :page-sizes="[30, 60, 90]"
        :total="pageController.total"
        :page-size="pageController.pageSize"
        class="pagination"
        @current-change="getAPageTagData"
        @size-change="handleSizeChange"
      />
    </div>
  </article>
  <!-- Data Statistics -->
  <DataStatisticsDrawer
    v-if="dataStatisticsVisiable"
    v-model="dataStatisticsVisiable"
    :type="NodeCatogery.South"
    :node-name="nodeItemData.name"
  />

  <DriverDialog
    v-model="showDialog"
    :type="DriverDirection.South"
    :is-dual-mode="true"
    @submitted="getSouthDriverList"
  />

  <EditNodeNameDialog
    v-model="showEditDialog"
    :type="DriverDirection.South"
    :node-name="editDriverData.name"
    :node="editDriverData"
    @updated="reloadDriverList"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
import { ElLink } from 'element-plus'
import {
  useToggleNodeStartStopStatus,
  useDriverStatus,
  useNodeStartStopStatus,
  dataStatistics,
  useListShowType,
  useDriverName,
} from '@/composables/config/useDriver'
import useSouthDriver from '@/composables/config/useSouthDriver'
import type { DriverItemInList } from '@/types/config'
import { DriverDirection, NodeCatogery } from '@/types/enums'
import DriverDialog from '@/views/config/components/DriverDialog.vue'
import EditNodeNameDialog from '@/views/config/components/EditNodeNameDialog.vue'
import SouthDriveItemCard from './components/SouthDriveItemCard.vue'
import ViewHeaderBar from '@/components/ViewHeaderBar.vue'
import KeywordSerachInput from '@/components/KeywordSearchInput.vue'
import PluginListSelector from '../components/PluginListSelector.vue'
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
      const paginationData = { pageNum: 1, pageSize: 30, total: 0 }
      store.commit('SET_PAGINATION', paginationData)
      store.commit('SET_LIST_SHOW_TYPE', 'card')
    }
    next()
  },
})
</script>

<script lang="ts" setup>
const { isAdminUser } = useUser()

const {
  queryKeyword,
  pageController,
  getAPageTagData,
  handleSizeChange,
  southDriverList,
  isListLoading,
  getSouthDriverList,
  dbGetSouthDriverList,
  reloadDriverList,

  goGroupPage,
  goNodeConfig,
  deleteDriver,
  modifyNodeLogLevel,

  sortBy,
  sortDataByKey,
  isSwitchListLoading,
  changeListShowMode,

  addConfig,
  showDialog,
  editDialog,
  showEditDialog,
  editDriverData,
} = useSouthDriver(true, true)

const { isShowDataStatistics, dataStatisticsVisiable, nodeItemData } = dataStatistics()

const { showType } = useListShowType()

const { toggleNodeStartStopStatus } = useToggleNodeStartStopStatus()
const { countNodeStartStopStatus } = useNodeStartStopStatus()

const setNodeStartStopStatus = async (node: DriverItemInList, status: boolean, nodeIndex: number) => {
  try {
    const ret = await toggleNodeStartStopStatus(node, status)
    if (typeof ret === 'object') {
      southDriverList.value.splice(nodeIndex, 1, ret)
    } else {
      getSouthDriverList()
    }
  } catch (error) {
    console.error(error)
  }
}

const getNodeValue = (node: DriverItemInList) => {
  const useDriverStatusSet = useDriverStatus({ data: node })
  return useDriverStatusSet
}

const { isMonitorNode } = useDriverName()

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
</style>
