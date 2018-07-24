<template>
  <div>
    <Row>
      <Col span="24">
        <div style="margin:5px 0;">
          <span>{{$t('m.form.department')}}</span>
          <Select clearable v-model="dept24" style="width:200px">
            <Option v-for="item in deptdata" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span>{{$t('m.form.selectdate')}}</span>
          <DatePicker type="month"  placeholder="Select month" style="width: 200px" @on-change="datechange24"></DatePicker>
          <Button type="primary" @click="queryoperator24">{{$t('m.common.query')}}</Button>
        </div>
        <div id="myChartsss24"></div>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dept24:'',
        depthasdata:[],
        deptdata:[],

        myCharts24:{
          xAxis:[],
          series:[
            {data:[]},
            {data:[]},
            {data:[]},
          ],
        },
        deptlist:[],
      }
    },
    methods: {
      datechange24(date){
        this.querydate24=date;
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
          url:'biz/tradeView/EODStats.do',
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
      drawLine4() {
        var vm=this;
        // 基于准备好的dom，初始化echarts实例
        var myChart4;
        myChart4 = this.$echarts.init(document.querySelector("#myChartsss24"));
        var colors = ['#5793f3', '#d14a61', '#6be6c1'];
        myChart4.setOption({
          color:colors,
          title : {
            text: this.$t('m.form.deptoperatorsale'),
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
              magicType : {show: true, type: ['bar']},
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
              name: this.$t('m.form.total'),
              smooth: true,
              type: "bar",
            },
            {
              data: vm.myCharts24.series[1].data,
              name: this.$t('m.form.recharge'),
              smooth: true,
              type: "bar",
            },
            {
              data: vm.myCharts24.series[2].data,
              name: this.$t('m.form.amount'),
              smooth: true,
              type: "bar",
            },
          ],
        });
        window.onresize = myChart4.resize;
      },
    },
    created(){
      this.user=JSON.parse(localStorage.getItem('user'));
      this.timec=new Date().toLocaleString();
      this.$http({
        url:'sys/dept/findDeptHasTrade.do',
        body: {},
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        this.depthasdata=response.body.list;

        this.depthasdata.forEach((val)=> {
            this.deptdata.push({
              value:val.id,
              label:val.name
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
