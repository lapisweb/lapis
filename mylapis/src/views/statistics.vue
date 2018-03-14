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
            <MenuItem v-for="nav2 in item.second" :key="nav2.id" :name=nav2.id>{{nav2.name}}</MenuItem>
          </Submenu>
        </Menu>
      </div>
    </div>
    <div class="fiterRight">
      <Row>
        <Col span="24">
          <div   v-show="currentitem=='1-1'">
            <div style="margin:5px 0;">
              <span>{{$t('m.deal.operator')}}</span>
              <Select v-model="operator" style="width:200px">
                <Option v-for="item in operatorlist" :value="item.id" :key="item.id">{{ item.loginName }}</Option>
              </Select>
              <span>{{$t('m.deal.daterange')}}</span>
              <DatePicker  v-model="time1"  type="month" placement="bottom-start"  style="width: 140px" @on-change="startmonth1"></DatePicker>
              <span>to</span>
              <DatePicker v-model="time2"  type="month" placement="bottom-start"  style="width: 140px" @on-change="endmonth1"></DatePicker>
              <Button type="primary" @click="queryoperator1">{{$t('m.common.query')}}</Button>
            </div>
            <div id="myChartsss"></div>
          </div>
        </Col>
        <Col span="24">
        <div  v-show="currentitem=='2-3'">
          <div style="margin:5px 0;">
            <span>{{$t('m.form.department')}}</span>
            <Select v-model="dept" style="width:200px">
              <Option v-for="item in deptdata" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>{{$t('m.deal.daterange')}}</span>
            <DatePicker v-model="time3"  type="month" placement="bottom-start"  style="width: 140px" @on-change="startmonth23"></DatePicker>
            <span>to</span>
            <DatePicker v-model="time4"  type="month" placement="bottom-start"  style="width: 140px" @on-change="endmonth23"></DatePicker>
            <Button type="primary" @click="queryoperator23">{{$t('m.common.query')}}</Button>
          </div>
          <div id="myChartsss21"></div>
        </div>
        </Col>
        <Col span="24">
        <div  v-show="currentitem=='2-1'">
          <div style="margin:5px 0;">
            <span>{{$t('m.form.department')}}</span>
            <Select v-model="dept21" style="width:200px">
              <Option v-for="item in deptdata" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>{{$t('m.form.selectdate')}}</span>
            <DatePicker type="date"  placeholder="Select date" style="width: 200px" @on-change="datechange21"></DatePicker>
            <Button type="primary" @click="queryoperator21">{{$t('m.common.query')}}</Button>
          </div>
          <Table stripe  :columns="columns21" :data="data21"></Table>
        </div>
        </Col>
        <Col span="24">
        <div  v-show="currentitem=='2-2'">
          <div style="margin:5px 0;">
            <span>{{$t('m.form.department')}}</span>
            <Select v-model="dept22" style="width:200px">
              <Option v-for="item in deptdata" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>{{$t('m.form.selectmonth')}}</span>
            <DatePicker type="month"  placeholder="Select month" style="width: 200px" @on-change="datechange22"></DatePicker>
            <Button type="primary" @click="queryoperator22">{{$t('m.common.query')}}</Button>
          </div>
          <Table stripe  :columns="columns22" :data="data22"></Table>
        </div>
        </Col>
        <Col span="24">
        <div  v-show="currentitem=='2-4'">
          <div style="margin:5px 0;">
            <span>{{$t('m.form.department')}}</span>
            <Select v-model="dept24" style="width:200px">
              <Option v-for="item in deptdata" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span>{{$t('m.form.selectdate')}}</span>
            <DatePicker type="date"  placeholder="Select date" style="width: 200px" @on-change="datechange24"></DatePicker>
            <Button type="primary" @click="queryoperator24">{{$t('m.common.query')}}</Button>
          </div>
          <div id="myChartsss24"></div>
        </div>
        </Col>
      </Row>
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
        value1: [],
        status: false,
        activesta:'',
        operatorId:'',
        operatorlist:[],
        operator:'',
        time1:'',
        time2:'',
        time3:'',
        time4:'',
        starttime1:'',
        endtime1:'',
        querydate21:'',
        querydate22:'',
        starttime23:'',
        endtime23:'',
        querydate24:'',
        dept:'',
        dept22:'',
        dept21:'',
        dept24:'',
        depthasdata:[],
        deptdata:[],

        columns21:[
          {
            title: this.$t('m.form.department'),
            key: 'deptName'
          },
          {
            title: this.$t('m.customerinfo.lastmoney'),
            key: 'paymentAmount'
          },
          {
            title: this.$t('m.customerinfo.lastrealmoney'),
            key: 'purchaseAmount'
          },
          {
            title: this.$t('m.customerinfo.lastrealvolum'),
            key: 'volume'
          },
          {
            title: this.$t('m.form.selectdate'),
            key: 'tradeDate'
          },
        ],
        columns22:[
          {
            title: this.$t('m.form.department'),
            key: 'deptName'
          },
          {
            title: this.$t('m.customerinfo.lastmoney'),
            key: 'paymentAmount'
          },
          {
            title: this.$t('m.customerinfo.lastrealmoney'),
            key: 'purchaseAmount'
          },
          {
            title: this.$t('m.customerinfo.lastrealvolum'),
            key: 'volume'
          },
          {
            title: this.$t('m.form.selectmonth'),
            key: 'tradeDate'
          },
        ],
        data21:[],
        data22:[],
        dataList:{
           list1:{
             legend:[],
             xAxis:[],
             series:[],
           }
        },
        myCharts21:{
          xAxis:[],
          series:[
            {data:[]},
            {data:[]},
            {data:[]},
          ],
        },
        myCharts24:{
          xAxis:[],
          series:[
            {data:[]},
            {data:[]},
            {data:[]},
          ],
        },
        deptlist:[],
        navtitle1:'safsaf',
        navtitle2:'',
        nav11:'',
        nav21:'',
        nav22:'',
        nav23:'',
        nav24:'',
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
      datechange21(date){
        this.querydate=date;
      },
      startmonth1(date){
        this.starttime1=date;
      },
      endmonth1(date){
        this.endtime1=date;
      },
      datechange22(date){
        this.querydate22=date;
      },
      startmonth23(date){
        this.starttime23=date;
      },
      endmonth23(date){
        this.endtime23=date;
      },
      datechange24(date){
        this.querydate24=date;
      },
      queryoperator1(){
        this.$http({
          url:common.apiLink+'/biz/tradeView/OMStats.do',
          body: {
            operatorId:this.operator,
            endTime:this.endtime1,
            startTime:this.starttime1,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.errors){
            this.$Message.error(response.body.errors);
          }else{
            this.dataList.list1.legend=response.body.option.legend.data;
            this.dataList.list1.xAxis=response.body.option.xAxis;
            response.body.option.series.forEach(function (val,index) {
                val.smooth=true;
            });
            this.dataList.list1.series=response.body.option.series;
            this.drawLine();
          }
        });
      },
      queryoperator21(){
        this.$http({
          url:common.apiLink+'/biz/tradeView/DDTStats.do',
          body: {
            deptId:this.dept21,
            time:this.querydate21,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.errors){
            this.$Message.error(response.body.errors);
          }else{
//            Vue.set(this.data21,response.body.data);
            this.data21=response.body.data;
          }
        });
      },
      queryoperator22(){
        this.$http({
          url:common.apiLink+'/biz/tradeView/DMTStats.do',
          body: {
            deptId:this.dept22,
            time:this.querydate22,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.errors){
            this.$Message.error(response.body.errors);
          }else {
//            Vue.set(this.data22,response.body.data);
            this.data22 = response.body.data;
          }
        });
      },
      queryoperator23(){
        this.myCharts21={
            xAxis:[],
            series:[
            {data:[]},
            {data:[]},
            {data:[]},
          ],
        };
        this.$http({
          url:common.apiLink+'/biz/tradeView/DMStats.do',
          body: {
            deptId:this.dept,
            endTime:this.endtime23,
            startTime:this.starttime23,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.errors){
            this.$Message.error(response.body.errors);
          }else {

            if(response.body.data.length<1){
              this.myCharts21.series[0]={data:[]};
              this.myCharts21.series[1]={data:[]};
              this.myCharts21.series[2]={data:[]};
              this.myCharts21.xAxis=[];
              this.drawLine1();
            }else{
              response.body.data.forEach((val, index) => {
                this.myCharts21.series[0].data.push(val.paymentAmount);
                this.myCharts21.series[1].data.push(val.purchaseAmount);
                this.myCharts21.series[2].data.push(val.volume);
                this.myCharts21.xAxis.push(val.tradeDate);
                this.drawLine1();
              })
            }
          }
        });
      },
      queryoperator24(){
        this.myCharts24={
          xAxis:[],
          series:[
            {data:[]},
            {data:[]},
            {data:[]},
          ],
        };
        this.$http({
          url:common.apiLink+'/biz/tradeView/EODStats.do',
          body: {
            deptId:this.dept24,
            time:this.querydate24,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.errors){
            this.$Message.error(response.body.errors);
          }else {
            if(response.body.data.length<1){
              this.myCharts24.series[0]={data:[]};
              this.myCharts24.series[1]={data:[]};
              this.myCharts24.series[2]={data:[]};
              this.myCharts24.xAxis=[];
              this.drawLine4();
            }else{
              response.body.data.forEach((val, index) => {
                this.myCharts24.series[0].data.push(val.paymentAmount);
                this.myCharts24.series[1].data.push(val.purchaseAmount);
                this.myCharts24.series[2].data.push(val.volume);
                this.myCharts24.xAxis.push(val.operatorName);
                this.drawLine4();
              })
            }
          }
        });
      },
      selectedmans(navName, navId) {
        this.activesta = navName;
        this.hid = navId;
        this.status = !this.status;
      },
      tubiao(aa) {
        this.currentitem = aa;
      },
      drawLine() {
        var vm=this;
        // 基于准备好的dom，初始化echarts实例
        var myChart;
        myChart = this.$echarts.init(document.querySelector(".fiterRight #myChartsss"));
//        myChart.clear();
        var colors = ['#5793f3', '#d14a61', '#6be6c1'];
        myChart.setOption({
          color:colors,
          title : {
            text: '操作员历史月销售记录',
            subtext: 'station one year curve graph'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend:{
            data:vm.dataList.list1.legend
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis : vm.dataList.list1.xAxis,
          yAxis: [
            {
              type: 'value'
            }
          ],
          series :vm.dataList.list1.series,
        });
        window.onresize = myChart.resize;
//        myChart2.setOption({
//          color: colorss,
//
//          title: {
//            text: '各站点销售统计',
//            subtext: '虚构数据',
//            left: 'center'
//          },
//          tooltip : {
//            trigger: 'item',
//            formatter: "{a} <br/>{b} : {c} ({d}%)"
//          },
//          legend: {
//            bottom: 10,
//            left: 'center',
//            data: ['西凉', '益州','兖州','荆州','幽州']
//          },
//          series : [
//            {
//              type: 'pie',
//              radius : '65%',
//              center: ['50%', '50%'],
//              selectedMode: 'single',
//              data:[
//                {
//                  value:1548,
//                  name: '幽州',
//
//                },
//                {value:535, name: '荆州'},
//                {value:510, name: '兖州'},
//                {value:634, name: '益州'},
//                {value:735, name: '西凉'}
//              ],
//              itemStyle: {
//                emphasis: {
//                  shadowBlur: 10,
//                  shadowOffsetX: 0,
//                  shadowColor: 'rgba(0, 0, 0, 0.5)'
//                }
//              }
//            }
//          ]
//        });
      },
      drawLine1() {
        var vm=this;
        // 基于准备好的dom，初始化echarts实例
        var miaoshu;
        vm.deptdata.forEach((val)=> {
            if(vm.dept==val.value){
              miaoshu=val.label
            }
        })
        var myChart1;
        myChart1 = this.$echarts.init(document.querySelector(".fiterRight #myChartsss21"));
        myChart1.clear();
        var colors = ['#5793f3', '#d14a61', '#6be6c1'];

        myChart1.setOption({
          color:colors,
          title : {
            text: miaoshu +'历史月销售记录',
            subtext: 'station one year curve graph'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend:{
            data:['月售总金额','月充值金额','月充值量']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis :{
            data:vm.myCharts21.xAxis,
          } ,
          yAxis: [
            {
              type: 'value'
            }
          ],
          series :[
            {
              data: vm.myCharts21.series[0].data,
              name: "月售总金额",
              smooth: true,
              type: "line",
            },
            {
              data: vm.myCharts21.series[1].data,
              name: "月充值金额",
              smooth: true,
              type: "line",
            },
            {
              data: vm.myCharts21.series[2].data,
              name: "月充值量",
              smooth: true,
              type: "line",
            },
          ],
        });
        window.onresize = myChart1.resize;
      },
      drawLine4() {
        var vm=this;
        // 基于准备好的dom，初始化echarts实例
        var myChart4;
        myChart4 = this.$echarts.init(document.querySelector(".fiterRight #myChartsss24"));
        var colors = ['#5793f3', '#d14a61', '#6be6c1'];
        myChart4.clear();
        myChart4.setOption({
          color:colors,
          title : {
            text: '各操作员销售记录',
            subtext: 'station one year curve graph'
          },
          tooltip : {
            trigger: 'axis'
          },
          legend:{
            data:['月售总金额','月充值金额','月充值量']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable : true,
          xAxis :{
            type:'category',
            data:vm.myCharts24.xAxis,
          } ,
          yAxis: [
            {
              type: 'value'
            }
          ],
          series :[
            {
              data: vm.myCharts24.series[0].data,
              name: "月售总金额",
              smooth: true,
              type: "bar",
            },
            {
              data: vm.myCharts24.series[1].data,
              name: "月充值金额",
              smooth: true,
              type: "bar",
            },
            {
              data: vm.myCharts24.series[2].data,
              name: "月充值量",
              smooth: true,
              type: "bar",
            },
          ],
        });
        window.onresize = myChart4.resize;
      },
      gaindept(array){
        this.deptlist.push({
          value:array.id,
          label:array.name,
        });
        array.childDepts.forEach((val,index)=>{
          this.deptlist.push({
            value:val.id,
            label:val.name,
          });
          if(val.childDepts&&val.childDepts.length!=0){
            this.gaindept(val)
          }else{
            return
          }
        })
      }
    },
    created(){
      this.user=JSON.parse(localStorage.getItem('user'));
      this.timec=new Date().toLocaleString();
      //获取操作员
      this.$http({
        url:common.apiLink+'/sys/user/listAllOperator.do',
        body:{

        },
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        this.operatorlist=response.body.operators;
      });
      this.$http({
        url:common.apiLink+'/sys/dept/findDeptIdHasTrade.do',
        body: {},
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        this.depthasdata=response.body.list;
        this.gaindept(JSON.parse(localStorage.getItem('userdata')));
        if(this.deptlist.length ==2){
          for (var i = 0;i<this.deptlist.length;i++) {
            for (var j =1;j<this.deptlist.length;j++) {
              if(this.deptlist[i].value == this.deptlist[j].value){
                this.deptlist.splice(j,1)
              }
            }
          }
        }else{
          for (var i = 0;i<this.deptlist.length;i++) {
            for (var j = 1; j < this.deptlist.length-1; j++) {
              if (this.deptlist[i].value === this.deptlist[j].value) {
                this.deptlist.splice(j, 1);
              }
            }
          }
        }
        this.depthasdata.forEach((val)=> {
          this.deptlist.forEach((vals)=> {
          if(val==vals.value){
            this.deptdata.push({
              value:vals.value,
              label:vals.label
            })
          }
        })
      })
      });
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
  #myChartsss{
    /*width:800px;*/
    height:650px;
    border-radius:8px;
    box-sizing: border-box;
    padding:15px;
  }
  #myChartsss1{
    height:650px;
    border-radius:8px;
    box-sizing: border-box;
    padding:15px;
  }
  #myChartsss21{
    height:650px;
    border-radius:8px;
    box-sizing: border-box;
    padding:15px;
  }
  #myChartsss24{
    height:650px;
    border-radius:8px;
    box-sizing: border-box;
    padding:15px;
  }
  .box1{
    height:380px;
  }
  .fiterRight .footer{
    left:240px;
    right:0
  }
</style>
