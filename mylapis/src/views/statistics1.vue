<template>
  <div>
    <div class="move-left-report">
      <div class="h-title-report">
        <h3>{{$t('m.form.formtype')}}</h3>
        <p>{{$t('m.deal.operator')}}：<span>{{user}}</span></p>
        <p>{{$t('m.form.time')}}：<span>{{timec}}</span></p>
      </div>
      <div class="statisticnav">
        <Menu accordion  @on-select="tubiao" active-name="1-1" :open-names="[1]">
          <Submenu :name=item.id v-for="item in navstas" :key="item.id">
            <template slot="title">
              <Icon :type=item.icon></Icon>
              {{item.name}}
            </template>
            <template  v-for="nav2 in item.second">
              <router-link :to="{path:'/index/statistic/chart/'+nav2.id}">
                <MenuItem :key="nav2.id" :name=nav2.id>{{nav2.name}}</MenuItem>
              </router-link>
            </template>

          </Submenu>
        </Menu>
      </div>
    </div>
    <div class="fiterRight">
      <!--<router-view></router-view>-->

      <my-footer1></my-footer1>
    </div>
  </div>
</template>
<script>
  import common from '../kits/common.js';
  export default {
    data() {
      return {
        user:'',
        timec:'',
        currentitem:'1-1',
        theme2: 'light',
        navstas:
          [
            {
              id:1,
              icon:'person',
              name:this.$t('m.form.operatormonthsale'),
              second:[
                {
                  id:'1-1',
                  name:this.$t('m.form.operatormonthsale'),
                },
              ]
            },
            {
              id:2,
              icon:'calendar',
              name:this.$t('m.form.servicehallsale'),
              second:[
                {
                  id:'2-1',
                  name:this.$t('m.form.deptdaysale'),
                },
                {
                  id:'2-2',
                  name:this.$t('m.form.depteverymonthsale'),
                },
                {
                  id:'2-3',
                  name:this.$t('m.form.deptmonthsale'),
                },
                {
                  id:'2-4',
                  name:this.$t('m.form.deptoperatorsale'),
                },
              ]
            },
//            {
//              id:3,
//              icon:'stats-bars',
//              name:'图形报表',
//              second:[
//                {
//                  id:'3-1',
//                  name:'各站点月销售金额',
//                },
//                {
//                  id:'3-2',
//                  name:'各公司年销售占比',
//                }
//              ]
//            },
          ],
      }
    },
    methods: {
      selectedmans(navName, navId) {
        this.activesta = navName;
        this.hid = navId;
        this.status = !this.status;
      },
      tubiao(aa) {
        this.currentitem = aa;
      },
    },
    created() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.timec = new Date().toLocaleString();
    },
  }
</script>
<style>
  .move-left-report{
    width: 241px;
    position: fixed;
    top:70px;
    left: 0;
    bottom: 0;
    z-index: 2;
    overflow-y: auto;
    background: #EEEEEE;
    padding-top: 8px;
    border-right: 1px solid #d7dde4;
  }
  .fiterRight{
    position: relative;
    top: 84px;
    margin-bottom: 85px;
    margin-left: 260px;
    margin-right: 30px;
  }
  .h-title-report{
    padding:0 24px;
    margin-bottom:15px;
  }
  .h-title-report h3{
    line-height: 50px;
    color:#888;
  }
  .h-title-report p{
    line-height: 30px;
    color:#888;
  }
  .fiterRight .footer{
    left:240px;
    right:0
  }
</style>
