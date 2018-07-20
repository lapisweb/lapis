<template>
  <div>
    <Row>
      <Col :sm={span:24} :md="{span:9}" :lg="{span:6}" style="margin-bottom: 15px">
        <span>{{$t('m.customerinfo.label7')}}</span>
        <Input v-model.trim="querymeterno"  icon="pricetag" style="width: 200px"></Input>
      </Col>
      <Col :sm={span:24} :md="{span:12}" :lg="{span:9}" style="margin-bottom: 15px">
        <span>{{$t('m.deal.daterange')}}</span>
        <DatePicker type="daterange" placement="bottom-start" split-panels placeholder="Select date" style="width: 200px" @on-change="startenddate"></DatePicker>
      </Col>
        <Button type="primary" icon="ios-search" style="margin-bottom: 15px" @click="searchmeter">{{$t('m.common.query')}}</Button>
    </Row>
    <Table :loading="loading" stripe  ref="selection" :columns="querymetertable" :data="meterdata"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="metertotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
      </div>
    </div>
    <my-footer1></my-footer1>
  </div>
</template>

<script>
  export default {
    name: 'meterquery',
    data () {
      return {
        //数据定义
        importtime:[],
        querymeterno:'',
        metertotal:0,
        loading:false,
        meterid:'',
        datearray:[],
        //查询表号table
        //表头
        querymetertable: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: this.$t('m.open.metercolumnstitle1'),
            key: 'meterNumber'
          },
          {
            title: this.$t('m.open.metercolumnstitle2'),
            key: 'importDate'
          },
          {
            title: this.$t('m.open.metercolumnstitle3'),
            key: 'customerTypeCode'
          },
          {
            title: this.$t('m.meter.operate'),
            key: 'action',
            width:160,
            render: (h, params) => {
              return h('div', [
                h('Poptip',{
                  props: {
                    confirm:true,
                    title:'确定删除吗?',
                  },
                  on: {
                    'on-ok': () => {
                      this.remove(params.index)
                    },
                  }
                },[h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                  },[h('Icon',{
                    props:{
                      color:'#fff',
                      type: 'android-delete',
                    }
                  }),
                  ]
                ),
                ]),
              ]);
            }
          }
        ],
        //数据
        meterdata: [],
      }
    },
    methods: {
      //日期选项
      startenddate(date){
        this.datearray=date;
      },
      //查询页面搜索按钮
      searchmeter(){
        let starttime=this.datearray[0];
        let endtime=this.datearray[1];
        this.loading=true;
        this.$http({
          url:'biz/meterStock/findByPage.do',
          body: {conditions: {meterNum:this.querymeterno,startTime:starttime,endTime:endtime},"limit": 10, "page": 1},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.metertotal=parseInt(response.body.pageInfo.total);
          this.meterdata=response.body.pageInfo.list;
          this.loading=false;
        })
      },
      //分页
      changePage:function (page) {
        let starttime=this.datearray[0];
        let endtime=this.datearray[1];
        this.loading=true;
        this.$http({
          url:'biz/meterStock/findByPage.do',
          body: {conditions: {meterNum:this.querymeterno,startTime:starttime,endTime:endtime},"limit": 10,
            "page": page},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.meterdata=response.body.pageInfo.list;
          this.loading=false;
        })
      },
      //删除表
      remove (index) {
        this.meterid=this.meterdata[index].meterId;
        this.$http({
          url:'biz/meterStock/del.do',
          body:{
            meterId:this.meterid
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;'
          },
        }).then((response) => {
          if(response.body.msg){
            this.meterdata.splice(index, 1);
            this.metertotal=this.metertotal-1;
            this.$Message.success(response.body.msg);
          }else{
            this.$Message.error(response.body.errors);
          }
        });
      },
    },
  }
</script>

