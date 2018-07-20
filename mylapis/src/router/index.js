import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'

import Open from '@/views/business/open-accounts'
import Cancel from '@/views/business/cancel'
import CheckList from '@/views/business/check'
import Purchase from '@/views/business/purchase'
import Repair from '@/views/business/complain/repair'
import addRepair from '@/views/business/complain/addrepair'
import Maintain from '@/views/business/complain/maintain'

import Meter from '@/views/meter_management/meter/meter'
import Meterimport from '@/views/meter_management/meter/meterimport'
import Meterquery from '@/views/meter_management/meter/meterquery'
import Realtime from '@/views/meter_management/realtime'
import Walkby from '@/views/meter_management/walkby/walkby'
import Addtask from '@/views/meter_management/walkby/addtask'
import Distributetask from '@/views/meter_management/walkby/distributetask'
import Edittask from '@/views/meter_management/walkby/edittask'
import Showinfo from '@/views/meter_management/walkby/showinfo'

import Login from '@/views/main/login'
import Index from '@/views/main/index'
import Password from '@/views/main/password'
import Print from '@/views/main/print'
import Layout from '@/views/main/layout'

import Manage from '@/views/customer/management'
import Debt from '@/views/customer/debt'

import Trade from '@/views/statistic/trading'
import Alarm from '@/views/statistic/alarm'
import Statistic from '@/views/statistic/report/statistics'
import Opemonth from '@/views/statistic/report/historicalsale/opemonth'
import Departday from '@/views/statistic/report/stationsales/departday'
import Departmonth from '@/views/statistic/report/stationsales/departmonth'
import Departhistory from '@/views/statistic/report/stationsales/Departhistory'
import Departoper from '@/views/statistic/report/stationsales/Departoper'
import Monthdata from '@/views/statistic/monthdata'


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
        { path: 'purchase', component:Purchase, name: 'purchase' ,
          meta: {
            title: '购买'
          }
        },
        { path: 'open', component: Open, name: 'open' ,
          meta: {
            title: '开户'
          }
        },
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
        { path: 'trade', component:Trade, name: 'trade' ,meta: {
            title: '交易记录'
          }},
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
        { path: 'statistic', component:Statistic, meta: {
            title: '统计报表'
          },
          children:[
            {
              path: 'opemonth',
              component:Opemonth,
              name: 'opemonth' ,
            },
            {
              path: 'departday',
              component: Departday,
              name: 'departday' ,
            },
            {
              path: 'departmonth',
              component:Departmonth,
              name: 'departmonth' ,
            },
            {
              path: 'departhistory',
              component: Departhistory,
              name: 'departhistory' ,
            },
            {
              path: 'departoper',
              component:Departoper,
              name: 'departoper' ,
            },
          ],
        },
        { path: 'print', component:Print, name: 'print' ,
          meta: {
            title: '设置打印机'
          }},
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
        { path: 'walkby/edittask', component:Edittask, name: 'edittask' ,
          meta: {
            title: '修改任务'
          }},
        { path: 'walkby/showinfo', component:Showinfo, name: 'showinfo' ,
          meta: {
            title: '查看任务详情'
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
      ]
    },
    {
      path: '/',
      redirect:'/index',
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
  //登录之后不能再去到登录页
  if(window.localStorage.getItem('user')){
    if(to.path=="/login"){
      next({
        path:'/index'
      });
    }
  }
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }

  iView.LoadingBar.start();
  next()
});
router.afterEach(route => {
  iView.LoadingBar.finish();
});
export default router;

