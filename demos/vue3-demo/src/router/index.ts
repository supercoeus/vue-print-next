import {createRouter, createWebHashHistory} from 'vue-router'

import PrintBasic from '../views/PrintBasic.vue'
import PrintBasic2 from '../views/PrintBasicTwo.vue'
import PrintCanvas from '../views/PrintCanvas.vue'
import PrintAsyncUrl from '../views/PrintAsyncUrl.vue'
import PrintUrl from '../views/PrintUrl.vue'
import PrintForm from '../views/PrintForm.vue'
import PrintIframe from '../views/PrintIframe.vue'
import PrintTable from '../views/PrintTable.vue'
import PrintPdf from "../views/PrintPdf.vue";
import PrintBaiduMap from "../views/PrintBaiduMap.vue";
export const routes = [
	{path: '/', component: PrintBasic, meta: {title:'基本打印用例'}},
	{path: '/print-basic2', component: PrintBasic2, meta: {title:'基本打印用例2'}},
	{path: '/print-table', component: PrintTable, meta: {title:'打印表格示例'}},
	{path: '/print-canvas', component: PrintCanvas, meta: {title:'Canvas 打印示例'}},
	{path: '/print-pdf', component: PrintPdf, meta: {title:'PDF 打印示例'}},
	{path: '/print-url', component: PrintUrl, meta: {title:'Url 打印示例'}},
	{path: '/print-async-url', component: PrintAsyncUrl, meta: {title:'异步 URL 打印示例'}},
	{path: '/print-form', component: PrintForm, meta: {title:'Form 表单打印示例'}},
	{path: '/print-iframe', component: PrintIframe, meta: {title:'Iframe 嵌套打印示例'}},
	{path: '/print-baidu-map', component: PrintBaiduMap, meta: {title:'百度地图打印示例'}},

]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
