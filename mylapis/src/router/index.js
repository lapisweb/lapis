import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import Open from '@/views/open-accounts'
import Meter from '@/views/meter/meter'
import Meterimport from '@/views/meter/meterimport'
import Meterquery from '@/views/meter/meterquery'
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
import Distributetask from '@/views/walkby/distributetask'
import Edittask from '@/views/walkby/Edittask'
import Repair from '@/views/complain/repair'
import Monthdata from '@/views/monthdata'
import addRepair from '@/views/complain/addrepair'
import Maintain from '@/views/complain/maintain'
import OpenInvoice from '@/views/invoice-open'
import AA from '@/views/purchase2'


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/index',
      name: '',
      title:'首页',
      component:Layout,
      children: [
        { path: '', component:Index, name: 'index' },
        { path: 'purchase', component:Purchase, name: 'purchase' ,meta: {
            title: '购买'
          }},
        { path: 'open', component: Open, name: 'open' ,meta: {
            title: '开户'
          }},
        { path: 'meter', component: Meter, name: '' ,
          children:[
            {
              path: '',
              component: Meterimport,
              name: 'meterimport' ,
            },
            {
              path: 'meterquery',
              component: Meterquery,
              name: 'meterquery' ,
            },
          ],
          meta: {
            title: '表入库'
          }},
        { path: 'cancel', component:Cancel, name: 'cancel' ,meta: {
            title: '退购'
          }},
        // { path: 'subtotal', component:Subtotal, name: 'subtotal' ,
        //   meta: {
        //     title: '首页入口'
        //   }},
        { path: 'trade', component:Trade, name: 'trade' ,meta: {
            title: '交易记录'
          }},
        // { path:'operationlog', component:OperatLog, name: 'operation',meta: {
        //     title: '首页入口'
        //   }},
        { path: 'alarm', component:Alarm, name: 'alarm',
          meta: {
            title: '告警记录'
          }},
        { path: 'management', component:Manage, name: 'management' ,
          meta: {
            title: '修改客户信息'
          }},
        { path: 'debt', component:Debt, name: 'debt' ,
          meta: {
            title: '债务管理'
          }},
        { path: 'statistic', component:Statistic, name: 'statistic',meta: {
            title: '统计报表'
          }},
        // { path: 'upload', component:Upload, name: 'upload',
        //   meta: {
        //     title: '首页入口'
        //   }},
        // { path: 'print', component:Print, name: 'print' ,
        //   meta: {
        //     title: '设置打印机'
        //   }},
        { path: 'password', component:Password, name: 'password' ,
          meta: {
            title: '修改密码'
          }},
        { path: 'check', component:CheckList, name: 'check' ,
          meta: {
            title: '审核退购任务'
          }},
        { path: 'realtime', component:Realtime, name: 'realtime' },
        { path: 'walkby', component:Walkby, name: 'walkby' ,
          meta: {
            title: 'walkby任务管理'
          }},
        { path: 'walkby/addtask', component:Addtask, name: 'addtask' ,
          meta: {
            title: '添加任务'
          }},
        { path: 'walkby/distributetask', component:Distributetask, name: 'distributetask' ,
          meta: {
            title: '分配任务'
          }},
        // { path: 'walkby/addtask1', component:Addtask1, name: 'addtask1' ,
        //   meta: {
        //     title: '添加任务'
        //   }},
        { path: 'walkby/edittask', component:Edittask, name: 'edittask' ,
          meta: {
            title: '修改任务'
          }},
        { path: 'repair', component:Repair, name: 'repair' ,
          meta: {
            title: '投诉与维修'
          }},
        { path: 'repair/addrepair', component:addRepair, name: 'addrepair' ,
          meta: {
            title: '添加维修记录'
          }},
        { path: 'maintain', component:Maintain, name: 'maintain' ,
          meta: {
            title: '维修任务'
          }},
        { path: 'monthdata', component:Monthdata, name: 'monthdata' ,
          meta: {
            title: '月冻结数据'
          }},
        {
          path: 'aa',
          component:AA,
        },
        {
          path: 'invoiceopen',
          component:OpenInvoice,
        },
      ]
    },
    {
      path: '/',
      redirect:'/login',
    },

    {
      path: '/login',
      name: 'login',
      component:Login,
      meta: {
        title: '登录'
      }
    },
  ]
});
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  iView.LoadingBar.start();
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
});
router.afterEach(route => {
  iView.LoadingBar.finish();
});
export default router;

