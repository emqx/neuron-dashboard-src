(window["webpackJsonp_eKuiper"]=window["webpackJsonp_eKuiper"]||[]).push([["chunk-4890826e"],{"3b07":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"rule-details"},[r("div",{staticClass:"page-header"},[r("Breadcrumb",[r("BreadcrumbItem",{attrs:{to:e.rulesRoute}},[e._v(e._s(this.$t("rules.rules")))]),r("BreadcrumbItem",[e._v(e._s(e.accessTitle))])],1),"create"===e.accessType?r("div",{staticClass:"mode-swtich"},[r("label",{attrs:{for:""}},[e._v(e._s(e.isTextMode?e.$t("rules.textMode"):e.$t("rules.visualizationMode")))]),r("i-switch",{on:{change:e.handleModeChange},model:{value:e.isTextMode,callback:function(t){e.isTextMode=t},expression:"isTextMode"}})],1):e._e()],1),r("Card",{staticClass:"detail",attrs:{border:"",shadow:""}},[r("Form",{ref:"record",attrs:{model:e.record,rules:e.isView?{}:e.rules,"label-position":"top"}},[r("Row",[r("i-col",{attrs:{span:"16"}},[r("FormItem",{attrs:{label:"Rule ID",prop:"id"}},[r("i-input",{attrs:{size:"large",disabled:e.idDisabled},model:{value:e.record.id,callback:function(t){e.$set(e.record,"id",t)},expression:"record.id"}})],1)],1),r("i-col",{attrs:{span:"16"}},[r("FormItem",{attrs:{label:e.$t("common.name")}},[r("i-input",{attrs:{size:"large"},model:{value:e.record.name,callback:function(t){e.$set(e.record,"name",t)},expression:"record.name"}})],1)],1),r("i-col",{attrs:{span:"16"}},[r("FormItem",{attrs:{label:e.$t("rules.runImmediately")}},[r("div",{staticClass:"switch-wraper"},[r("i-switch",{model:{value:e.record.triggered,callback:function(t){e.$set(e.record,"triggered",t)},expression:"record.triggered"}})],1)])],1),e.isTextMode?r("i-col",{attrs:{span:"16"}},[r("FormItem",{staticClass:"code-editor--item",attrs:{prop:"text"},scopedSlots:e._u([{key:"label",fn:function(){return[r("span",[e._v(e._s(e.$t("rules.text")))]),r("Tooltip",{staticClass:"fields-table--tip",attrs:{"max-width":350,transfer:"",content:e.$t("rules.textTip"),placement:"right"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1)]},proxy:!0}],null,!1,1935425132)},[r("div",{staticClass:"monaco-container"},[r("Monaco",{attrs:{id:"record-text",lang:"json",disabled:e.isView,backgroud:"#282a36"},model:{value:e.record.text,callback:function(t){e.$set(e.record,"text",t)},expression:"record.text"}})],1)])],1):e._e(),e.isTextMode?e._e():[r("i-col",{attrs:{span:"16"}},[r("FormItem",{staticClass:"code-editor--item",attrs:{label:"SQL",prop:"sql"}},[r("div",{staticClass:"monaco-container"},[e.sqlProvider.length?r("Monaco",{attrs:{id:"record-sql",lang:"sql",disabled:e.isView,backgroud:"#282a36",provider:e.sqlProvider},model:{value:e.record.sql,callback:function(t){e.$set(e.record,"sql",t)},expression:"record.sql"}}):e._e()],1)])],1),r("i-col",{attrs:{span:"16"}},[r("FormItem",{staticClass:"action-table",attrs:{label:e.$t("rules.actions"),prop:"actions"}},[r("Actions",{ref:"actions",attrs:{nodeID:e.nodeID,actions:e.record.actions,isDetail:e.isView}})],1)],1),e.showOptions?r("i-col",{attrs:{span:"16"}},[r("Divider",[r("a",{attrs:{href:"javascript:;"},on:{click:function(t){e.showOptionContent=!e.showOptionContent}}},[e.showOptionContent?r("Icon",{attrs:{type:"ios-arrow-up"}}):r("Icon",{attrs:{type:"ios-arrow-down"}}),e._v(" "+e._s(e.$t("rules.options"))+" ")],1)])],1):e._e(),e.showOptionContent?r("i-col",{attrs:{span:"16"}},[r("Row",{attrs:{gutter:20}},[r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.isEventTime"),prop:"options.isEventTime"}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.isEventTimeDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("div",{staticClass:"radio-control"},[r("span",{staticClass:"radio-item"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.record.options.isEventTime,expression:"record.options.isEventTime"}],attrs:{disabled:e.isView,id:"true-event-time-radio",type:"radio"},domProps:{value:!0,checked:e._q(e.record.options.isEventTime,!0)},on:{change:function(t){return e.$set(e.record.options,"isEventTime",!0)}}}),r("label",{attrs:{for:"true-event-time-radio"}},[e._v("True")])]),r("span",{staticClass:"radio-item"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.record.options.isEventTime,expression:"record.options.isEventTime"}],attrs:{disabled:e.isView,id:"false-event-time-radio",type:"radio"},domProps:{value:!1,checked:e._q(e.record.options.isEventTime,!1)},on:{change:function(t){return e.$set(e.record.options,"isEventTime",!1)}}}),r("label",{attrs:{for:"false-event-time-radio"}},[e._v("False")])])])],1)],1),r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.sendMetaToSink"),prop:"options.sendMetaToSink"}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.sendMetaToSinkDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("div",{staticClass:"radio-control"},[r("span",{staticClass:"radio-item"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.record.options.sendMetaToSink,expression:"record.options.sendMetaToSink"}],attrs:{disabled:e.isView,id:"true-send-meta-radio",type:"radio"},domProps:{value:!0,checked:e._q(e.record.options.sendMetaToSink,!0)},on:{change:function(t){return e.$set(e.record.options,"sendMetaToSink",!0)}}}),r("label",{attrs:{for:"true-send-meta-radio"}},[e._v("True")])]),r("span",{staticClass:"radio-item"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.record.options.sendMetaToSink,expression:"record.options.sendMetaToSink"}],attrs:{disabled:e.isView,id:"false-send-meta-radio",type:"radio"},domProps:{value:!1,checked:e._q(e.record.options.sendMetaToSink,!1)},on:{change:function(t){return e.$set(e.record.options,"sendMetaToSink",!1)}}}),r("label",{attrs:{for:"false-send-meta-radio"}},[e._v("False")])])])],1)],1),r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.lateTolerance"),prop:"options.lateTolerance"}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.lateToleranceDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("i-input",{attrs:{size:"large",type:"number",placeholder:"0",disabled:e.isView},model:{value:e.record.options.lateTolerance,callback:function(t){e.$set(e.record.options,"lateTolerance",e._n(t))},expression:"record.options.lateTolerance"}})],1)],1),r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.concurrency"),prop:"options.concurrency"}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.concurrencyDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("i-input",{attrs:{size:"large",type:"number",placeholder:"1",disabled:e.isView},model:{value:e.record.options.concurrency,callback:function(t){e.$set(e.record.options,"concurrency",e._n(t))},expression:"record.options.concurrency"}})],1)],1),r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.bufferLength"),prop:"options.bufferLength"}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.bufferLengthDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("i-input",{attrs:{size:"large",type:"number",placeholder:"1024",disabled:e.isView},model:{value:e.record.options.bufferLength,callback:function(t){e.$set(e.record.options,"bufferLength",e._n(t))},expression:"record.options.bufferLength"}})],1)],1),r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.qos"),prop:"options.qos"}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.qosDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("Select",{attrs:{size:"large",placeholder:"0",clearable:"",disabled:e.isView},model:{value:e.record.options.qos,callback:function(t){e.$set(e.record.options,"qos",t)},expression:"record.options.qos"}},[r("Option",{attrs:{value:0,label:"0"}}),r("Option",{attrs:{value:1,label:"1"}}),r("Option",{attrs:{value:2,label:"2"}})],1)],1)],1),r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.checkpointInterval"),prop:"options.checkpointInterval"}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.checkpointIntervalDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("i-input",{attrs:{size:"large",type:"number",placeholder:"300000",disabled:e.isView},model:{value:e.record.options.checkpointInterval,callback:function(t){e.$set(e.record.options,"checkpointInterval",e._n(t))},expression:"record.options.checkpointInterval"}})],1)],1),r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.attempts")}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.attemptsDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("i-input",{attrs:{size:"large",type:"number",placeholder:"0",disabled:e.isView},model:{value:e.record.options.restartStrategy.attempts,callback:function(t){e.$set(e.record.options.restartStrategy,"attempts",e._n(t))},expression:"record.options.restartStrategy.attempts"}})],1)],1),r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.delay")}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.delayDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("i-input",{attrs:{size:"large",type:"number",placeholder:"1000",disabled:e.isView},model:{value:e.record.options.restartStrategy.delay,callback:function(t){e.$set(e.record.options.restartStrategy,"delay",e._n(t))},expression:"record.options.restartStrategy.delay"}})],1)],1),r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.maxDelay")}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.maxDelayDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("i-input",{attrs:{size:"large",type:"number",placeholder:"30000",disabled:e.isView},model:{value:e.record.options.restartStrategy.maxDelay,callback:function(t){e.$set(e.record.options.restartStrategy,"maxDelay",e._n(t))},expression:"record.options.restartStrategy.maxDelay"}})],1)],1),r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.multiplier")}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.delayDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("i-input",{attrs:{size:"large",type:"number",placeholder:"2",disabled:e.isView},model:{value:e.record.options.restartStrategy.multiplier,callback:function(t){e.$set(e.record.options.restartStrategy,"multiplier",e._n(t))},expression:"record.options.restartStrategy.multiplier"}})],1)],1),r("i-col",{attrs:{span:"12"}},[r("FormItem",{attrs:{label:e.$t("rules.jitterFactor")}},[r("Tooltip",{attrs:{"max-width":"250px",transfer:"",content:e.$t("rules.jitterFactorDesc"),placement:"top"}},[r("Icon",{attrs:{type:"md-help-circle"}})],1),r("i-input",{attrs:{size:"large",type:"number",placeholder:"0.1",disabled:e.isView},model:{value:e.record.options.restartStrategy.jitterFactor,callback:function(t){e.$set(e.record.options.restartStrategy,"jitterFactor",e._n(t))},expression:"record.options.restartStrategy.jitterFactor"}})],1)],1)],1)],1):e._e()],r("i-col",{staticClass:"oper-col",attrs:{span:"16"}},[r("FormItem",[e.isView?e._e():r("Button",{attrs:{type:"primary"},on:{click:e.save}},[e._v(e._s(e.$t("common.submit")))]),r("Button",{style:e.isView?"":"margin-left: 8px",attrs:{type:"text",to:e.rulesRoute}},[e._v(" "+e._s(e.$t("common.cancel"))+" ")])],1)],1)],2)],1),e.loading?r("Spin",{attrs:{size:"large",fix:""}}):e._e()],1)],1)},o=[],i=r("724c"),a=r("4041"),s=r("bd43"),c=r("809e"),l=r("9146"),u=r("94dc"),d=r("ceb0"),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"actions-view"},[e.isDetail?e._e():r("Button",{staticClass:"top-create--btn action-add-btn",attrs:{icon:"md-add",type:"primary",ghost:""},on:{click:e.showModal}},[e._v(" "+e._s(e.$t("common.add"))+" ")]),r("Table",{attrs:{columns:e.actionsCol,data:e.actions},scopedSlots:e._u([{key:"action",fn:function(t){var n=t.row,o=t.index;return[r("Button",{staticStyle:{"margin-right":"8px"},attrs:{shape:"circle",type:"primary",size:"small",ghost:""},on:{click:function(t){return e.viewAction(n,o)}}},[e._v(" "+e._s(e.isDetail?e.$t("common.view"):e.$t("common.edit"))+" ")]),e.isDetail?e._e():r("Button",{attrs:{shape:"circle",type:"error",size:"small",ghost:""},on:{click:function(t){return e.removeAction(o)}}},[e._v(" "+e._s(e.$t("common.delete"))+" ")])]}}])}),r("Modal",{attrs:{"class-name":"action-modal--view view-form modal-view-for-neuronEx",title:e.isDetail?e.$t("rules.viewAction"):e.actionTitle,width:650,"mask-closable":!1},on:{"on-visible-change":e.handleChangeActionModel},model:{value:e.viewModalVisible,callback:function(t){e.viewModalVisible=t},expression:"viewModalVisible"}},[e.viewLoading?r("Spin",{attrs:{fix:""}}):e._e(),r("Form",{ref:"actionForm",attrs:{model:e.actionForm,rules:e.actionRules}},[r("Row",[r("i-col",{attrs:{span:"24"}},[r("FormItem",{attrs:{label:"Sink",prop:"sink"}},[e.actionForm.sink&&e.sinkInfo?[r("a",{staticClass:"sink-docs right-item",attrs:{href:e.i18nLabel(e.sinkInfo.helpUrl),target:"_blank",rel:"noopener"}},[r("Icon",{attrs:{type:"md-document"}}),e._v(" "+e._s(e.$t("common.documentation"))+" ")],1),e.sinkInfo.trial?r("Tooltip",{attrs:{content:e.$t("plugins.betaTip"),placement:"top"}},[r("Alert",{staticClass:"beta-alert",attrs:{type:"error"}},[e._v("Beta")])],1):e._e()]:e._e(),r("ConfKeyTypesSeletor",{attrs:{category:e.category,disabled:e.isDetail},on:{onChange:e.changeSink},model:{value:e.actionForm.sink,callback:function(t){e.$set(e.actionForm,"sink",t)},expression:"actionForm.sink"}})],2),e.viewModalVisible?r("FormItem",{attrs:{label:"Resource ID",prop:"resourceId"}},[e.actionForm.sink?r("Button",{staticClass:"top-create--btn action-add-btn",attrs:{icon:"ios-add",type:"primary",ghost:""},on:{click:function(t){return e.showConfKeyModel()}}},[e._v(" "+e._s(e.$t("configuration.addSinkTemplate"))+" ")]):e._e(),r("ConfKeysSelector",{ref:"confKeysSelectorRef",attrs:{category:e.category,type:e.actionForm.sink},on:{onChange:e.changeResourceID},model:{value:e.actionForm.resourceId,callback:function(t){e.$set(e.actionForm,"resourceId",t)},expression:"actionForm.resourceId"}})],1):e._e()],1)],1)],1),r("PropertyForm",{ref:"propertyFormRef",attrs:{isDetail:e.isDetail,properties:e.properties,form:e.actionPropertiesForm,type:e.actionForm.sink,rule:!0,sameLevelFormValid:e.sameLevelFormValid}}),r("SinkBaseForm",{ref:"advancedFormRef",attrs:{isDetail:e.isDetail,form:e.actionAdvancedForm,type:e.actionForm.sink},on:{changeConnectionSelector:e.changeConnectionSelector}}),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("Button",{attrs:{type:"text"},on:{click:function(t){e.viewModalVisible=!1}}},[e._v(e._s(e.$t("common.cancel")))]),e.isDetail?e._e():r("Button",{attrs:{type:"primary"},on:{click:e.save}},[e._v(e._s(e.$t("common.submit")))]),r("Button",{staticClass:"btn-test-connection",attrs:{type:"primary",ghost:"",loading:e.isLoadingTestConnection},on:{click:function(t){return e.save("testConnection")}}},[e._v(" "+e._s(e.$t("common.testConnection"))+" ")])],1)],1),r("ConfKeyPeopertiesModal",{ref:"confKeyPropertiesRef",attrs:{modalVisible:e.confKeyPropertiesVisible,title:e.modalTitle,category:e.category,type:e.actionForm.sink,confKeyName:e.actionForm.resourceId,isEdit:e.isEditResourceID,isCanAdvanced:!0},on:{"update:modalVisible":function(t){e.confKeyPropertiesVisible=t},"update:modal-visible":function(t){e.confKeyPropertiesVisible=t},submit:e.submitedResourceID}})],1)},m=[],f=r("a34a"),h=r.n(f),v=r("2ef0"),b=r("7d99"),y=r("e2635"),g=r("75f3"),w=r("14e2"),I=r("d870"),k=r("40ee"),F=r("92ad"),x=r("c9d9"),S=["resourceId","connectionSelector","omitIfEmpty","sendSingle","format","schemaName","schemaMessage","delimiter","dataTemplate","concurrency","bufferLength","enableCache","memoryCacheThreshold","maxDiskCache","cleanCacheAtStop","bufferPageSize","resendInterval","runAsync"];function T(e,t,r,n,o,i,a){try{var s=e[i](a),c=s.value}catch(l){return void r(l)}s.done?t(c):Promise.resolve(c).then(n,o)}function O(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){T(i,n,o,a,s,"next",e)}function s(e){T(i,n,o,a,s,"throw",e)}a(void 0)}))}}function $(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function D(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?$(Object(r),!0).forEach((function(t){C(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):$(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function C(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function j(e,t){if(null==e)return{};var r,n,o=_(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function _(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}var P={name:"Actions",mixins:[a["a"]],components:{PropertyForm:g["a"],SinkBaseForm:y["a"],ConfKeyPeopertiesModal:w["a"],ConfKeysSelector:I["a"],ConfKeyTypesSeletor:k["a"]},props:{actions:{type:Array,required:!0},nodeID:{type:String,required:!0},isDetail:{type:Boolean,default:!1}},data:function(){return{category:x["d"].sinks,editIndex:null,isEditAction:!1,viewModalVisible:!1,viewLoading:!1,actionForm:{sink:"",resourceId:""},propertiesFormTransition:{},properties:[],actionPropertiesForm:{},actionAdvancedForm:{},actionTitle:"",allResourceData:{},sinkInfo:{helpUrl:{}},actionRules:{sink:[{required:!0,message:this.$t("rules.sinkRequired")}],resourceId:[{required:!1,message:this.$t("rules.resourceIdRequired")}]},isLoadingTestConnection:!1,isEditResourceID:!1,confKeyPropertiesVisible:!1,sameLevelFormValid:!1}},computed:{actionsCol:function(){return[{title:"Sink",key:"sink"},{title:this.$t("common.operations"),slot:"action",width:250}]},modalTitle:function(){return this.isEditResourceID?this.$t("configuration.editSinkTemplate"):this.$t("configuration.addSinkTemplate")},connectionSeletorValue:function(){return function(e,t){if(!e)return e;var r=e.includes("".concat(t,"."))?e.split(".")[1]:e;return r}}},methods:{showModal:function(){this.viewModalVisible=!0,this.actionTitle=this.$t("rules.addAction"),this.actionPropertiesForm={}},handleChangeActionModel:function(e){e||(this.$refs.actionForm.resetFields(),this.$refs.propertyFormRef.resetFields(),this.$refs.advancedFormRef.resetFields(),this.isEditAction=!1,this.actionTitle="",this.editIndex=null,this.properties=[],this.propertiesFormTransition={},this.actionForm={sink:"",resourceId:""})},viewAction:function(e,t){this.viewModalVisible=!0,this.isEditAction=!0,this.editIndex=t,this.actionTitle=this.$t("rules.editAction");var r=e.data[e.sink],n=r.resourceId;this.actionForm={sink:e.sink,resourceId:n},this.loadSinkProperties(this.actionForm);var o=Object.keys(r);o.length&&1===o.length&&"resourceId"===o[0]?this.changeResourceID(n):this.getFormData(r,e.sink)},getFormData:function(e,t){var r=this,n=t||this.actionForm.sink,o=(e.resourceId,e.connectionSelector),i=e.omitIfEmpty,a=e.sendSingle,s=e.format,c=e.schemaName,l=e.schemaMessage,u=e.delimiter,d=e.dataTemplate,p=e.concurrency,m=e.bufferLength,f=e.enableCache,h=e.memoryCacheThreshold,b=e.maxDiskCache,y=e.cleanCacheAtStop,g=e.bufferPageSize,w=e.resendInterval,I=e.runAsync,k=j(e,S),F=o?this.connectionSeletorValue(o,n):"";this.actionAdvancedForm={connectionSelector:F,omitIfEmpty:i,sendSingle:a,format:s,schemaName:c,schemaMessage:l,delimited:u,dataTemplate:d,concurrency:p,bufferLength:m,enableCache:f,memoryCacheThreshold:h,maxDiskCache:b,cleanCacheAtStop:y,bufferPageSize:g,resendInterval:w,runAsync:I},this.propertiesFormTransition=Object(v["cloneDeep"])(k),F?this.getConnectionSeletorData(this.actionForm.sink).then((function(e){r.actionPropertiesForm=D(D({},r.propertiesFormTransition),e)})):this.actionPropertiesForm=D({},this.propertiesFormTransition)},loadSinkProperties:function(e){var t=this,r=e.sink,n={nodeID:this.nodeID,name:r};return new Promise((function(e,r){Object(b["f"])(t.category,n).then((function(r){var n=r.data,o=n||{},i=o.properties;i=(i||[]).filter((function(e){return"connectionSelector"!==e.name})),t.properties=i||[],t.sinkInfo=n.about,e(t.properties)})).catch((function(e){r(e)}))}))},getConnectionSeletorData:function(e){var t=this;return new Promise((function(r,n){var o={nodeID:t.nodeID,name:e};Object(b["g"])("connections",o).then((function(e){var n=e.data,o=t.actionAdvancedForm.connectionSelector,i=n[o];i.clientId=i.clientid;var a=t.properties.find((function(e){return"server"===e.name}));a&&"string"===a.type&&(i.server=i.servers?i.servers[0]:""),t.properties.forEach((function(e){var r=i[e.name];r&&(t.propertiesFormTransition[e.name]=r)})),r(t.propertiesFormTransition)})).catch((function(e){n(e)}))}))},changeSink:function(){var e=this;return O(h.a.mark((function t(){return h.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.actionForm.resourceId="",e.properties=[],e.actionPropertiesForm={},e.actionAdvancedForm={},e.loadSinkProperties(e.actionForm);case 5:case"end":return t.stop()}}),t)})))()},changeResourceID:function(e){var t=this;if(this.actionPropertiesForm={},this.actionForm.sink&&e){var r={nodeID:this.nodeID,name:this.actionForm.sink};Object(b["g"])(this.category,r).then((function(r){var n=r.data;if(Object.keys(n).length){var o=n[e];t.getFormData(o,t.actionForm.sink)}}))}},changeConnectionSelector:function(e){var t=this;if(this.actionForm.sink){var r={nodeID:this.nodeID,name:this.actionForm.sink};Object(b["g"])("connections",r).then((function(r){var n=r.data,o=n[e];t.actionPropertiesForm=D(D({},t.actionPropertiesForm),o)}))}},showConfKeyModel:function(e){this.isEditResourceID="edit"===e,this.confKeyPropertiesVisible=!0},submitedResourceID:function(e){var t=this;return O(h.a.mark((function r(){var n;return h.a.wrap((function(r){while(1)switch(r.prev=r.next){case 0:n=e.name,t.actionForm.resourceId=n,t.$refs.confKeysSelectorRef.init(),t.changeResourceID(n);case 4:case"end":return r.stop()}}),r)})))()},testConnection:function(e,t){var r=this;return O(h.a.mark((function n(){var o;return h.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:r.isLoadingTestConnection=!0,o={nodeID:r.nodeID,type:e},Object(b["i"])(r.category,o,t).then((function(){r.$Message.success(r.$t("common.TestConnectionSuccess"))})).finally((function(){r.isLoadingTestConnection=!1}));case 3:case"end":return n.stop()}}),n)})))()},getSubmitData:function(){var e=this;return O(h.a.mark((function t(){var r,n,o,i,a,s,c,l;return h.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r={},n=e.actionForm.sink,t.next=5,e.$refs.actionForm.validate();case 5:return o=t.sent,e.sameLevelFormValid=o,i=e.$refs.propertyFormRef.validatePropertiesForm,t.next=10,i();case 10:if(o){t.next=14;break}return a=e.$t("common.fillContent"),e.$Message.error(a),t.abrupt("return",Promise.reject(new Error(a)));case 14:return t.next=16,e.$refs.propertyFormRef.getFormData();case 16:return s=t.sent,t.next=19,e.$refs.advancedFormRef.getFormData();case 19:return c=t.sent,c.connectionSelector&&(c=D(D({},c),{},{connectionSelector:"".concat(n,".").concat(c.connectionSelector)})),null!==s&&void 0!==s&&s.fields&&1===s.fields.length&&!s.fields[0]&&delete s.fields,null!==s&&void 0!==s&&s.tagFields&&1===s.tagFields.length&&!s.tagFields[0]&&delete s.tagFields,r[n]=D(D(D(D({resourceId:e.actionForm.resourceId},s),c),c.schemaName&&c.schemaMessage&&{schemaId:"".concat(c.schemaName,".").concat(c.schemaMessage)}),"delimited"===c.format&&{delimiter:c.delimited}),r[n].delimited&&delete r[n].delimited,r[n]=Object(F["e"])(r[n]),l={sink:n,data:r},t.abrupt("return",Promise.resolve(l));case 30:return t.prev=30,t.t0=t["catch"](0),t.abrupt("return",Promise.reject(t.t0));case 33:case"end":return t.stop()}}),t,null,[[0,30]])})))()},save:function(e){var t=this;return O(h.a.mark((function r(){var n,o,i;return h.a.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,t.getSubmitData();case 3:n=r.sent,o=n.sink,i=n.data,"testConnection"===e?t.testConnection(t.actionForm.sink,D(D({},i[o]),{},{type:o})):(t.isEditAction?t.actions.splice(t.editIndex,1,n):t.actions.push(n),t.viewModalVisible=!1,t.isEditAction=!1,t.editIndex=null),r.next=11;break;case 8:r.prev=8,r.t0=r["catch"](0),console.log(r.t0);case 11:case"end":return r.stop()}}),r,null,[[0,8]])})))()},submit:function(e,t){var r=t.sink,n=t.data;"testConnection"===e?this.testConnection(this.actionForm.sink,D(D({},n[r]),{},{type:r})):(this.isEditAction?this.actions.splice(this.editIndex,1,t):this.actions.push(t),this.viewModalVisible=!1,this.isEditAction=!1,this.editIndex=null)},removeAction:function(e){this.actions.splice(e,1)}}},E=P,M=(r("7e20"),r("2877")),A=Object(M["a"])(E,p,m,!1,null,null,null),R=A.exports,q=["id","name","actions","triggered","options","sql"],V=["restartStrategy"];function L(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function K(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?L(Object(r),!0).forEach((function(t){N(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):L(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function N(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function B(e,t){if(null==e)return{};var r,n,o=z(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function z(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}function W(e){return G(e)||Y(e)||U(e)||H()}function H(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function U(e,t){if(e){if("string"===typeof e)return J(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?J(e,t):void 0}}function Y(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function G(e){if(Array.isArray(e))return J(e)}function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var Q={name:"RuleDetail",components:{Monaco:l["a"],Actions:R},mixins:[i["a"],a["a"]],data:function(){return{id:this.$route.params.ruleID,accessType:this.$route.query.oper,loading:!1,showOptions:!0,showOptionContent:!1,isTextMode:!1,record:{id:"",name:"",triggered:!1,text:"",actions:[],options:{restartStrategy:{}},sql:""},rules:{id:[{required:!0,message:this.$t("rules.idRequired")}],sql:[{required:!0,message:this.$t("streams.sqlRequired")}],actions:[{required:!0,message:this.$t("rules.actionsRequired")}],text:[{required:!0,message:this.$t("common.fillContent")}]},sqlProvider:[]}},computed:{isView:function(){var e=this.$route.query.oper;return"view"===e},accessTitle:function(){var e=this.$route.query.oper,t={view:this.$t("common.view"),create:this.$t("common.create"),edit:this.$t("common.edit")};return t[e]},rulesRoute:function(){return{name:"rules",params:{id:this.nodeID}}},idDisabled:function(){return this.isView||"edit"===this.accessType}},created:function(){"create"!==this.accessType&&this.loadDetail(),this.loadRuleFunctions()},methods:{loadRuleFunctions:function(){var e=this;Object(s["e"])(this.nodeID).then((function(t){var r=[];t.data.forEach((function(e){r.push.apply(r,W(e.functions))}));var n=[];r.forEach((function(t){var r={name:t.name,type:"Method",detail:"eKuiper ".concat(e.$t("sql.example")).concat(t.example),documentation:e.i18nLabel(t.hint)};n.push(r)})),Object(c["d"])(e.nodeID).then((function(t){t.data.forEach((function(e){var t={name:e,type:"Method",detail:"eKuiper services function",documentation:""};n.push(t)})),e.sqlProvider=[].concat(W(u["a"]),n,W(d["a"].ruleSqlKeyWords))}))}))},handleModeChange:function(){var e=this;setTimeout((function(){e.$refs.record.resetFields()}),1e3)},resetActions:function(e){var t=e?e.map((function(e){var t=Object.keys(e)[0];return{data:e,sink:t}})):[];return t},loadDetail:function(){var e=this;this.loading=!0,Object(s["l"])(this.nodeID,this.id).then((function(t){var r=t.data,n=r.id,o=r.name,i=r.actions,a=r.triggered,s=r.options,c=r.sql,l=B(r,q),u=s||{},d=u.restartStrategy,p=void 0===d?{}:d,m=B(u,V),f=K(K({},m),{},{restartStrategy:p});e.record=K({id:n,name:o,triggered:a||!1,sql:c||"",actions:e.resetActions(i),options:f},l),e.showOptions=!0})).finally((function(){e.loading=!1}))},parseRuleData:function(e){var t=e.id,r=e.name,n=e.triggered,o=e.sql,i=e.actions,a=e.options,s={id:t,name:r,triggered:n,sql:o,actions:[],options:K({},a)};return s.actions=i.map((function(e){var t={},r=e.sink;return t[r]=K({},e.data[r]),t})),s},save:function(){var e=this;this.$refs.record.validate((function(t){if(t){var r={};if(e.isTextMode){var n=e.record,o=n.id,i=n.name,a=n.triggered;r=K({id:o,name:i,triggered:a},JSON.parse(e.record.text))}else r=e.parseRuleData(K({},e.record));"create"===e.accessType?Object(s["c"])(e.nodeID,r).then((function(t){201===t.status&&"Created"===t.statusText?e.$Message.success(t.data):e.$Message.success(e.$t("common.addSuccess")),e.$router.push({name:"rules",params:{id:e.nodeID}})})):Object(s["k"])(e.nodeID,e.record.id,r).then((function(t){200===t.status&&"OK"===t.statusText?e.$Message.success(t.data):e.$Message.success(e.$t("common.editSuccess")),e.$router.push({name:"rules",params:{id:e.nodeID}})}))}}))}}},X=Q,Z=(r("dc7f"),Object(M["a"])(X,n,o,!1,null,"8a58331a",null));t["default"]=Z.exports},"4e3f":function(e,t,r){},"5ff5":function(e,t,r){},"7e20":function(e,t,r){"use strict";r("4e3f")},"809e":function(e,t,r){"use strict";r.d(t,"c",(function(){return i})),r.d(t,"b",(function(){return a})),r.d(t,"e",(function(){return s})),r.d(t,"f",(function(){return c})),r.d(t,"a",(function(){return l})),r.d(t,"d",(function(){return u}));var n=r("751a"),o=r("510b"),i=function(e){return n["a"].get(Object(o["c"])(e,"/services"))},a=function(e,t){return n["a"].get(Object(o["c"])(e,"/services/".concat(t)))},s=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n["a"].post(Object(o["c"])(e,"/services"),t)},c=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n["a"].put(Object(o["c"])(e,"/services/".concat(t)),r)},l=function(e,t){return n["a"].delete(Object(o["c"])(e,"/services/".concat(t)))},u=function(e){return n["a"].get(Object(o["c"])(e,"/services/functions"))}},"94dc":function(e,t,r){"use strict";var n=r("12cb"),o=r("4360"),i=o["a"].state.lang,a=n["default"][i],s=[],c=["bigint","float","string","datetime","boolean","array","struct"];c.forEach((function(e){var t={name:e,detail:"Kuiper ".concat(a.sql.dataType),type:"Field",documentation:a.sql[e],valueType:""};s.push(t)})),t["a"]=s},bd43:function(e,t,r){"use strict";r.d(t,"g",(function(){return i})),r.d(t,"c",(function(){return a})),r.d(t,"l",(function(){return s})),r.d(t,"d",(function(){return c})),r.d(t,"k",(function(){return l})),r.d(t,"m",(function(){return u})),r.d(t,"h",(function(){return d})),r.d(t,"i",(function(){return p})),r.d(t,"j",(function(){return m})),r.d(t,"f",(function(){return f})),r.d(t,"e",(function(){return h})),r.d(t,"a",(function(){return v})),r.d(t,"b",(function(){return b}));var n=r("751a"),o=r("510b"),i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n["a"].get(Object(o["c"])(e,"/rules"),{params:t})},a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n["a"].post(Object(o["c"])(e,"/rules"),t)},s=function(e,t){return n["a"].get(Object(o["c"])(e,"/rules/".concat(t)))},c=function(e,t){return n["a"].delete(Object(o["c"])(e,"/rules/".concat(t)))},l=function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return n["a"].put(Object(o["c"])(e,"/rules/".concat(t)),r)},u=function(e,t){return n["a"].get(Object(o["c"])(e,"/rules/".concat(t,"/status")))},d=function(e,t){return n["a"].post(Object(o["c"])(e,"/rules/".concat(t,"/restart")))},p=function(e,t){return n["a"].post(Object(o["c"])(e,"/rules/".concat(t,"/start")))},m=function(e,t){return n["a"].post(Object(o["c"])(e,"/rules/".concat(t,"/stop")))},f=function(e,t){return n["a"].get(Object(o["c"])(e,"/rules/".concat(t,"/topo")))},h=function(e){return n["a"].get(Object(o["c"])(e,"/metadata/functions"))},v=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return n["a"].post("/kuiper/".concat(e,"/data/export"),t)},b=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n["a"].post("/kuiper/".concat(e,"/data/import?partial=1"),t)}},ceb0:function(e,t,r){"use strict";var n=r("12cb"),o=r("4360"),i=o["a"].state.lang,a=n["default"][i],s=[],c=[],l=["CREATE","WITH","DATASOURCE","KEY","FORMAT","CONF_KEY","TYPE","STRICT_VALIDATION","STREAM","STREAMS","TABLE","TABLES"],u=["SELECT","FROM","JOIN","LEFT","INNER","ON","WHERE","GROUP","ORDER","HAVING","BY","ASC","DESC","AND","OR","AS","RROP","EXPLAIN","DESCRIBE","SHOW","WITH","BIGINT","FLOAT","STRING","DATETIME","BOOLEAN","ARRAY","STRUCT","TRUE","FALSE","DD","HH","MI","SS","MS"],d=function(e,t){e.forEach((function(e){var r={name:e,type:"Keyword",detail:"SQL ".concat(a.sql.keyWord),documentation:""};t.push(r)}))};d(l,s),d(u,c),t["a"]={sqlKeyWords:s,ruleSqlKeyWords:c}},d870:function(e,t,r){"use strict";var n=r("a34a"),o=r.n(n),i=r("f065"),a=r("724c"),s=r("7d99"),c=r("c9d9");function l(e,t,r,n,o,i,a){try{var s=e[i](a),c=s.value}catch(l){return void r(l)}s.done?t(c):Promise.resolve(c).then(n,o)}function u(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var i=e.apply(t,r);function a(e){l(i,n,o,a,s,"next",e)}function s(e){l(i,n,o,a,s,"throw",e)}a(void 0)}))}}var d,p,m={name:"ConfKeySelector",extends:i["a"],props:{category:{type:String,default:c["a"]},type:{type:String,default:""}},mixins:[a["a"]],watch:{type:{immediate:!0,handler:function(e){e?this.init():(this.myValue="",this.list=[])}}},created:function(){},methods:{init:function(){var e=this;return u(o.a.mark((function t(){return o.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getList();case 2:e.list=t.sent;case 3:case"end":return t.stop()}}),t)})))()},getList:function(){var e=this;return new Promise((function(t,r){if(e.type){var n={nodeID:e.nodeID,name:e.type};Object(s["g"])(e.category,n).then((function(e){var r=e.data,n=Object.keys(r);t(n)})).catch((function(e){r(e)}))}else t([])}))}}},f=m,h=r("2877"),v=Object(h["a"])(f,d,p,!1,null,null,null);t["a"]=v.exports},dc7f:function(e,t,r){"use strict";r("5ff5")}}]);