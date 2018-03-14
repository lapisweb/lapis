import Vue from 'vue'
import Router from 'vue-router'
import Open from '@/views/open-accounts'
import Meter from '@/views/meter'
import Purchase from '@/views/purchase'
import Login from '@/views/login'
import Cancel from '@/views/cancel'
import Subtotal from '@/views/subtotal'
import Trade from '@/views/trading'
import OperatLog from '@/views/operationlog'
import Alarm from '@/views/alarm'
import Manage from '@/views/management'
import Index from '@/views/index'
import Debt from '@/views/debt'
import Statistic from '@/views/statistics'
import Password from '@/views/password'
import Upload from '@/views/upload'
import Layout from '@/views/layout'
import InvoiceOpen from '@/views/invoice-open'
import InvoicePurchase from '@/views/invoice-purchase'
import CheckList from '@/views/check'
import Chart from '@/views/chart'
import Realtime from '@/views/realtime'


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/index',
      name: '',
      component:Layout,
      children: [
        { path: 'purchase', component:Purchase, name: 'purchase' },
        { path: 'open', component: Open, name: 'open' },
        { path: 'meter', component: Meter, name: 'meter' },
        { path: 'cancel', component:Cancel, name: 'cancel' },
        { path: 'subtotal', component:Subtotal, name: 'subtotal' },
        { path: 'trade', component:Trade, name: 'trade' },
        { path:'operationlog', component:OperatLog, name: 'operation'},
        { path: 'alarm', component:Alarm, name: 'alarm' },
        { path: 'management', component:Manage, name: 'management' },
        { path: 'debt', component:Debt, name: 'debt' },
        { path: 'statistic', component:Statistic, name: 'statistic'},
        { path: 'upload', component:Upload, name: 'upload' },
        { path: 'password', component:Password, name: 'password' },
        { path: 'check', component:CheckList, name: 'check' },
        { path: 'realtime', component:Realtime, name: 'realtime' },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    {
      path: '/',
      component:Layout,
      children: [
        { path: '', component:Index, name: 'index' },
      ]
    },
    { path: '/chart', component:Chart, name: 'chart',},
    {
      path: '/index/invoiceopen',
      name:'',
      component:InvoiceOpen,
    },
    {
      path: '/index/invoicepurchase',
      name:'',
      component:InvoicePurchase,
    },
  ]
});
export default router;
