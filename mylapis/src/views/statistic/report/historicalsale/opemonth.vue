<template>
  <div>
    <Row>
      <Col span="24">
        <div style="margin:5px 0;">
          <span>{{$t('m.deal.operator')}}</span>
          <Select clearable v-model="operator" style="width:200px">
            <Option v-for="item in operatorlist" :value="item.id" :key="item.id">{{ item.loginName }}</Option>
          </Select>
          <span>{{$t('m.deal.daterange')}}</span>
          <DatePicker  v-model="time1"  type="month" placement="bottom-start"  style="width: 140px" @on-change="startmonth1"></DatePicker>
          <span>to</span>
          <DatePicker v-model="time2"  type="month" placement="bottom-start"  style="width: 140px" @on-change="endmonth1"></DatePicker>
          <Button type="primary" @click="queryoperator1">{{$t('m.common.query')}}</Button>
        </div>
        <div id="myChartsss"></div>
      </Col>
    </Row>
    <my-footer1></my-footer1>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value1: [],
        status: false,
        activesta:'',
        operatorId:'',
        operatorlist:[],
        operator:'',
        time1:'',
        time2:'',
        starttime1:'',
        endtime1:'',

        myCharts1:{
          xAxis:[],
          series:[
            {data:[]},
            {data:[]},
            {data:[]},
          ],
        },
      }
    },
    methods: {
      startmonth1(date){
        this.starttime1=date;
      },
      endmonth1(date){
        this.endtime1=date;
      },
      queryoperator1(){
        this.myCharts1={
          xAxis:[],
          series:[
            {data:[]},
            {data:[]},
            {data:[]},
          ],
        };
        this.$http({
          url:'biz/tradeView/OMStats.do',
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
          }else {

            if(response.body.data.length<1){
              this.myCharts1.series[0]={data:[]};
              this.myCharts1.series[1]={data:[]};
              this.myCharts1.series[2]={data:[]};
              this.myCharts1.xAxis=[];
              this.drawLine();
            }else{
              response.body.data.forEach((val, index) => {
                this.myCharts1.series[0].data.push(val.paymentAmount);
                this.myCharts1.series[1].data.push(val.purchaseAmount);
                this.myCharts1.series[2].data.push(val.volume);
                this.myCharts1.xAxis.push(val.tradeDate);
                this.drawLine();
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
        myChart = this.$echarts.init(document.querySelector("#myChartsss"));
//        myChart.clear();
        var colors = ['#5793f3', '#d14a61', '#6be6c1'];
        myChart.setOption({
          color:colors,
          title : {
            text: this.$t('m.form.operatormonthsale'),
          },
          tooltip : {
            trigger: 'axis'
          },
          legend:{
            data:[this.$t('m.form.total'),this.$t('m.form.recharge'),this.$t('m.form.amount')]
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
            data:vm.myCharts1.xAxis,
          } ,
          yAxis: [
            {
              type: 'value'
            }
          ],
          series :[
            {
              data: vm.myCharts1.series[0].data,
              name: this.$t('m.form.total'),
              smooth: true,
              type: "line",
            },
            {
              data: vm.myCharts1.series[1].data,
              name: this.$t('m.form.recharge'),
              smooth: true,
              type: "line",
            },
            {
              data: vm.myCharts1.series[2].data,
              name: this.$t('m.form.amount'),
              smooth: true,
              type: "line",
            },
          ],
        });
        window.onresize = myChart.resize;
      },
    },
    created(){
      this.user=JSON.parse(localStorage.getItem('user'));
      this.timec=new Date().toLocaleString();
      //获取操作员
      this.$http({
        url:'sys/user/listAllOperator.do',
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
    z-index: 3;
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
    left:120px;
    right:0
  }
</style>
