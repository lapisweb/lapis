<template>
  <div>
    <div class="h-content">
      <div style="margin:10px 100px;">
        <div style="margin:10px 0;">
          <Input clearable v-model="name" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
          <Select clearable v-model="operator" style="width:200px" placeholder="操作员">
            <Option v-for="item in alloperators" :value="item.id" :key="item.id">{{ item.loginName }}</Option>
          </Select>
          <!--<Input v-model="repairid" placeholder="故障代码" style="width: 180px"></Input>-->
          <Select clearable v-model="complaintTypeId" style="width:200px" placeholder="故障代码">
            <Option v-for="item in allcomplaintTypeId" :value="item.complaintTypeId" :key="item.complaintTypeId">{{ item.description }}</Option>
          </Select>
          <div style="margin-top: 10px;">
            <Button type="primary" icon="ios-search" @click="query">全部</Button>
            <Button type="success" icon="ios-search" @click="waiting">待审核列表</Button>
          </div>
        </div>
        <div class="retablebox">
          <header class="filter">
            <Button class="addbutton" icon="plus-round" type="info" @click="addrepair">添加维修记录</Button>
          </header>
          <Table ref="selection" :columns="columns4" :data="data1"></Table>
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
      title="审核"
      v-model="shenhebox"
      width="700"
      @on-ok="shenheok"
      :mask-closable="false">
      <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
          <p slot="title">审核信息</p>
          <p>
            <span>{{$t('m.customerinfo.label1')}}:{{baseinfo.customerName}}</span>
            <span>{{$t('m.customerinfo.label2')}}:{{baseinfo.identityCode}}</span>
            <span>{{$t('m.customerinfo.label3')}}:{{baseinfo.telephone}}</span>
          </p>
          <p>
            <span>{{$t('m.customerinfo.label5')}}:{{baseinfo.physicalAddress}}</span>
            <span>提交时间:{{details.complainDate}}</span>
          </p>
          <p>故障代码: {{details.complaintType}}</p>
          <p>故障描述: {{details.complainContent}}</p>
        </Card>
      </div>
      <div style="padding:5px 20px">
        <p style="line-height: 30px">维修人员{{details.maintainerId}}</p>
        <p style="line-height: 30px">处理时间{{details.complainDate}}</p>
        <p style="line-height: 30px">维修记录{{details.handingMethod}}</p>
        <p>审核</p>
        <RadioGroup v-model="result">
          <Radio label="审核通过"></Radio>
          <Radio label="重新维修"></Radio>
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
        repairtotal:0,
        shtotal:0,
        baseinfo:{},
        details:{},
        value:0,
        shenhebox:false,
        result:'审核通过',
        complaintId:'',
        all:true,
        wait:false,
        columns4: [
          {
            title: '客户姓名',
            key:'customerName'
          },
          {
            title: '操作员',
            key: 'operatorName',
          },
          {
            title: '提交日期',
            key: 'complainDate',
          },
          {
            title: '故障代码',
            key: 'complaintType',
          },
          {
            title: '故障描述',
            key: 'complainContent',
          },
          {
            title: '状态',
            key: 'state',
            width: 180,
            filters: [
              {
                label: '未分配',
                value: 0
              },
              {
                label: '维修员处理中',
                value: 1
              },
              {
                label: '待审核',
                value: 2
              },
              {
                label: '完成',
                value: 3
              },
            ],
            filterMultiple: false,
            // filterMethod (value, row) {
            //   if (value === 0) {
            //     return this.filter(0);
            //   } else if (value === 1) {
            //     return row.state == 1;
            //   }else if (value === 2) {
            //     return row.state == 2;
            //   }else if (value === 3) {
            //     return row.state == 3;
            //   }
            // },
            filterRemote(val,key,row){
              this.filter(val[0])
            },
            render: (h, params) => {
              const row = params.row;
              let color = row.state;
              let text = row.state;
              if(row.state === 1 ){
                color= 'orange';
                text='维修员处理中';
              }else if(row.state === 0){
                color='red';
                text='未分配'
              }else if(row.state === 3){
                color='green';
                text='完成'
              }else if(row.state === 2){
                color='blue';
                text='待审核'
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
            title: '操作',
            align:'center',
            render: (h, params) => {
              if(params.row.state==2&&JSON.parse(localStorage.getItem('user'))==params.row.operatorName){
                return h('Button', {
                  props: {
                    type: 'primary',
                  },
                  on: {
                    click: () => {
                      this.check(params.row)
                    }
                  }
                }, '审核');
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
        });
      },
      changePages(page){
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
        });
      },
      addrepair(){
        this.$router.push('/index/repair/addrepair');
      },
      remove(index){
        // this.meterid=this.meterdata[index].meterId;
        this.index=index;
        this.$Modal.confirm({
          title: 'Meter import',
          content:'<p>'+this.$t('m.common.tips')+'</p><p>'+this.$t('m.common.sure')+'</p>',
          onOk: () => {
            this.removeconfirm();
          },
          onCancel: () => {
//            this.$Message.info('Clicked cancel');
          }
        });
      },
      waiting(){
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
        });
      },
      shchangePages(page){
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
        if(this.result=='审核通过'){
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
              this.$Message.success('审核通过');
              this.waiting()
            }else{
              this.$Message.error(response.body.errors);
            }
        });
      },
      filter(state){
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

