<template>
  <div>
    <Row>
      <Col span="24">
        <div style="margin:5px 0;">
          <span>{{$t('m.form.department')}}</span>
          <Select clearable v-model="dept21" style="width:200px">
            <Option v-for="item in deptdata" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span>{{$t('m.form.selectdate')}}</span>
          <DatePicker type="date"  placeholder="Select date" style="width: 200px" @on-change="datechange21"></DatePicker>
          <Button type="primary" @click="queryoperator21">{{$t('m.common.query')}}</Button>
        </div>
        <Table stripe  :columns="columns21" :data="data21"></Table>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dept21:'',

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
        data21:[],
        myCharts21:{
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
      datechange21(date){
        this.querydate21=date;
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
      queryoperator21(){
        this.$http({
          url:'biz/tradeView/DDTStats.do',
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
