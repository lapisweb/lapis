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
import Print from '@/views/print'
import Layout from '@/views/layout'
import CheckList from '@/views/check'
import Realtime from '@/views/realtime'
import Walkby from '@/views/walkby/walkby'
import Addtask from '@/views/walkby/addtask'
import Edittask from '@/views/walkby/Edittask'
import Repair from '@/views/complain/repair'
import Monthdata from '@/views/monthdata'
import addRepair from '@/views/complain/addrepair'
import Maintain from '@/views/complain/maintain'
import OpenInvoice from '@/views/invoice-open'
import AA from '@/views/aa'


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
        { path: 'statistic', component:Statistic, name: 'statistic',},
        { path: 'upload', component:Upload, name: 'upload' },
        { path: 'print', component:Print, name: 'print' },
        { path: 'password', component:Password, name: 'password' },
        { path: 'check', component:CheckList, name: 'check' },
        { path: 'realtime', component:Realtime, name: 'realtime' },
        { path: 'walkby', component:Walkby, name: 'walkby' ,},
        { path: 'walkby/addtask', component:Addtask, name: 'addtask' ,},
        { path: 'walkby/edittask', component:Edittask, name: 'edittask' ,},
        { path: 'repair', component:Repair, name: 'repair' ,},
        { path: 'repair/addrepair', component:addRepair, name: 'addrepair' ,},
        { path: 'maintain', component:Maintain, name: 'maintain' ,},
        { path: 'monthdata', component:Monthdata, name: 'monthdata' ,},
        {
          path: 'invoiceopen',
          component:OpenInvoice,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    {
      path: '/aa',
      name: '',
      component:AA
    },
    {
      path: '/',
      component:Layout,
      children: [
        { path: '', component:Index, name: 'index' },
      ]
    },
  ]
});
export default router;

