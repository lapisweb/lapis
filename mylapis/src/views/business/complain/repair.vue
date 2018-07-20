<template>
  <div>
    <div class="h-content">
      <div class="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem to="/index">
            <Icon type="ios-home-outline"></Icon> Home
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Icon type="social-buffer-outline"></Icon> Complaints & Maintenance
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div style="margin:10px 100px;">
        <div style="margin:10px 0;">
          <Input clearable v-model="name" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
          <Select clearable v-model="operator" style="width:200px" :placeholder="$t('m.deal.operator')">
            <Option v-for="item in alloperators" :value="item.id" :key="item.id">{{ item.loginName }}</Option>
          </Select>
          <Select clearable v-model="complaintTypeId" style="width:200px" :placeholder="$t('m.maintain.faultcode')">
            <Option v-for="item in allcomplaintTypeId" :value="item.complaintTypeId" :key="item.complaintTypeId">{{ item.description }}</Option>
          </Select>
          <div style="margin-top: 10px;">
            <Button type="primary" icon="ios-search" @click="query">{{$t('m.maintain.button1')}}</Button>
            <Button type="success" icon="ios-search" @click="waiting">{{$t('m.maintain.case3')}}</Button>
          </div>
        </div>
        <div class="retablebox">
          <header class="filter">
            <Button class="addbutton" icon="plus-round" type="info" @click="addrepair">{{$t('m.maintain.button2')}}</Button>
          </header>
          <Table :loading="loading" ref="selection" :columns="repaircolumns" :data="data1"></Table>
          <div style="margin: 10px;overflow: hidden" v-if="all">
            <div style="float: right;">
              <Page :total="repairtotal" :current="1" @on-change="changePages" :show-total="true" :show-elevator="true"></Page>
            </div>
          </div>
          <div style="margin: 10px;overflow: hidden" v-if="wait">
            <div style="float: right;">
              <Page :total="shtotal" :current="1" @on-change="shchangePages" :show-total="true" :show-elevator="true"></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      :title="$t('m.maintain.check')"
      v-model="shenhebox"
      width="700"
      @on-ok="shenheok"
      :mask-closable="false">
      <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
          <p slot="title">{{$t('m.maintain.checkinfo')}}</p>
          <p>
            <span>{{$t('m.customerinfo.label1')}}: {{baseinfo.customerName}}</span>
            <span>{{$t('m.customerinfo.label2')}}: {{baseinfo.identityCode}}</span>
            <span>{{$t('m.customerinfo.label3')}}: {{baseinfo.telephone}}</span>
          </p>
          <p>
            <span>{{$t('m.customerinfo.label5')}}: {{baseinfo.physicalAddress}}</span>
            <span>{{$t('m.maintain.time1')}}: {{details.complainDate}}</span>
          </p>
          <p>{{$t('m.maintain.faultcode')}}: {{details.complaintType}}</p>
          <p>{{$t('m.maintain.faultinfo')}}: {{details.complainContent}}</p>
        </Card>
      </div>
      <div style="padding:5px 20px">
        <p style="line-height: 30px">{{$t('m.maintain.man')}}: {{details.maintainerId}}</p>
        <p style="line-height: 30px">{{$t('m.maintain.time2')}}: {{details.complainDate}}</p>
        <p style="line-height: 30px">{{$t('m.maintain.record')}}: {{details.handingMethod}}</p>
        <p>{{$t('m.maintain.check')}}</p>
        <RadioGroup v-model="result">
          <Radio :label="$t('m.maintain.pass')"></Radio>
          <Radio :label="$t('m.maintain.again')"></Radio>
        </RadioGroup>
      </div>
    </Modal>
    <my-footer1></my-footer1>
  </div>
</template>
<style>
  .retablebox{
    margin:10px 0;
    border-radius: 4px;
    border-top:4px solid #2d8cf0;
    background: #fff;
    padding: 5px 0;
  }
  .filter{
    height:40px;
  }
  .breadcrumb{
    height:40px;
    box-shadow: 0 2px 3px 0px rgba(100, 100, 100, 0.1);
    margin-bottom: 4px;
    line-height: 40px;
    box-sizing: border-box;
    padding:0 27px;
  }
</style>
<script>
  export default {
    nane:'repair',
    data() {
      return {
        name:'',
        alloperators:[],
        operator:'',
        repairid:'',
        index:'',
        loading:false,
        repairtotal:0,
        shtotal:0,
        baseinfo:{},
        details:{},
        value:0,
        shenhebox:false,
        result:this.$t('m.maintain.pass'),
        complaintId:'',
        all:true,
        wait:false,
        repaircolumns: [
          {
            title: this.$t('m.customerinfo.label1'),
            key:'customerName'
          },
          {
            title: this.$t('m.deal.operator'),
            key: 'operatorName',
          },
          {
            title:this.$t('m.maintain.time1'),
            key: 'complainDate',
          },
          {
            title: this.$t('m.maintain.faultcode'),
            key: 'complaintType',
          },
          {
            title: this.$t('m.maintain.faultinfo'),
            key: 'complainContent',
          },
          {
            title: this.$t('m.customerinfo.label9'),
            key: 'state',
            width:200,
            filters: [
              {
                label: this.$t('m.maintain.case1'),
                value: 0
              },
              {
                label: this.$t('m.maintain.case2'),
                value: 1
              },
              {
                label: this.$t('m.maintain.case3'),
                value: 2
              },
              {
                label: this.$t('m.maintain.case4'),
                value: 3
              },
            ],
            filterMultiple: false,
            filterRemote(val,key,row){
              this.filter(val[0])
            },
            render: (h, params) => {
              const row = params.row;
              let color = row.state;
              let text = row.state;
              if(row.state === 1 ){
                color= 'orange';
                text=this.$t('m.maintain.case2');
              }else if(row.state === 0){
                color='red';
                text=this.$t('m.maintain.case1')
              }else if(row.state === 3){
                color='green';
                text=this.$t('m.maintain.case4')
              }else if(row.state === 2){
                color='blue';
                text=this.$t('m.maintain.case3')
              }
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
          {
            title:this.$t('m.meter.operate'),
            render: (h, params) => {
              if(params.row.state==2&&JSON.parse(localStorage.getItem('user'))==params.row.operatorName){
                return h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.check(params.row)
                    }
                  }
                }, this.$t('m.maintain.check'));
              }

            }
          },

        ],
        data1: [],
        allcomplaintTypeId:[],
        complaintTypeId:'',
      }
    },
    methods: {
      query(){
        this.loading=true;
        this.all=true;
        this.wait=false;
        this.$http({
          url:'biz/complaint/findByPage.do',
          body:{
            "conditions": {
              name:this.name,
              operatorId:this.operator,
              complaintType:this.complaintTypeId,
              orderByClause :"complain_date desc",
            },
            "limit": 10,
            "page": 1
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.repairtotal=parseInt(response.body.pageInfo.total);
          response.body.pageInfo.list.forEach(function (val,index) {
            val.customerName=val.customer.customerName;
            val.operatorName=val.operator.loginName;
            val.complaintType=val.type.description;
          });
          this.data1=response.body.pageInfo.list;
          this.loading=false;
        });
      },
      changePages(page){
        this.loading=true;
        this.$http({
          url:'biz/complaint/findByPage.do',
          body:{
            "conditions": {
              name:this.name,
              operatorId:this.operator,
              complaintType:this.complaintTypeId,
              orderByClause :"complain_date desc",
            },
            "limit": 10,
            "page": page
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          response.body.pageInfo.list.forEach(function (val,index) {
            val.customerName=val.customer.customerName;
            val.operatorName=val.operator.loginName;
            val.complaintType=val.type.description;

          });
          this.data1=response.body.pageInfo.list;
          this.loading=false;
        });
      },
      addrepair(){
        this.$router.push('/index/repair/addrepair');
      },
      remove(index){
        this.index=index;
        this.$Modal.confirm({
          title: 'Meter import',
          content:'<p>'+this.$t('m.common.tips')+'</p><p>'+this.$t('m.common.sure')+'</p>',
          onOk: () => {
            this.removeconfirm();
          },
        });
      },
      waiting(){
        this.loading=true;
        this.all=false;
        this.wait=true;
        this.$http({
          url:'biz/complaint/findUAC.do',
          body:{
            "conditions": {
              name:this.name,
              operatorId:this.operator,
              complaintType:this.complaintTypeId,
              orderByClause :"complain_date desc",
            },
            "limit": 10,
            "page": 1
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.shtotal=parseInt(response.body.pageInfo.total);
          response.body.pageInfo.list.forEach(function (val,index) {
            val.customerName=val.customer.customerName;
            val.operatorName=val.operator.loginName;
            val.complaintType=val.type.description;
          });
          this.data1=response.body.pageInfo.list;
          this.loading=false;
        });
      },
      shchangePages(page){
        this.loading=true;
        this.$http({
          url:'biz/complaint/findUAC.do',
          body:{
            "conditions": {
              name:this.name,
              operatorId:this.operator,
              complaintType:this.complaintTypeId,
              orderByClause :"complain_date desc",
            },
            "limit": 10,
            "page": page
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          response.body.pageInfo.list.forEach(function (val,index) {
            val.customerName=val.customer.customerName;
            val.operatorName=val.operator.loginName;
            val.complaintType=val.type.description;

          });
          this.data1=response.body.pageInfo.list;
          this.loading=false;
        });
      },
      check(row){
        this.baseinfo=row.customer;
        this.complaintId=row.complaintId;
        this.details=row;
        this.shenhebox=true;
      },
      shenheok(){
        let state;
        if(this.result==this.$t('m.maintain.pass')){
          state=3;
        }else{
          state=0;
        }
        this.$http({
          url:'biz/complaint/auditComplaint.do',
          body:{
            complaintId:this.complaintId,
            state:state
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
            if(response.body.code==0){
              this.$Message.success(this.$t('m.maintain.pass'));
              this.waiting()
            }else{
              this.$Message.error(response.body.errors);
            }
        });
      },
      filter(state){
        this.loading=true;
        this.$http({
          url:'biz/complaint/findByPage.do',
          body:{
            "conditions": {
              name:this.name,
              operatorId:this.operator,
              complaintType:this.complaintTypeId,
              state:state,
              orderByClause :"complain_date desc",
            },
            "limit": 10,
            "page": 1
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.repairtotal=parseInt(response.body.pageInfo.total);
          response.body.pageInfo.list.forEach(function (val,index) {
            val.customerName=val.customer.customerName;
            val.operatorName=val.operator.loginName;
            val.complaintType=val.type.description;
          });
          this.data1=response.body.pageInfo.list;
          this.loading=false;
        });
      }
    },
    created(){
      this.query();
      this.$http({
        url:'biz/complaint/getTypes.do',
        body:{

        },
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        this.allcomplaintTypeId=response.body.types;
      });
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
        if(response.body.errors){

        }else{
          this.alloperators=response.body.operators
        }

      })
    }
  }
</script>

