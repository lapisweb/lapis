<template>
  <div>
    <div class="h-content">
      <div class="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem to="/index">
            <Icon type="ios-home-outline"></Icon> Home
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Icon type="social-buffer-outline"></Icon> Maintenance
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
            <Button type="success" icon="ios-search" @click="query(0)">{{$t('m.maintain.case1')}}</Button>
            <Button type="warning" icon="ios-search" @click="query(1)">{{$t('m.maintain.case2')}}</Button>
          </div>
        </div>
        <div class="retablebox">
          <Table ref="selection" :columns="columns4" :data="data1"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="repairtotal" :current="1" @on-change="changePages" :show-total="true" :show-elevator="true"></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
      :title="$t('m.maintain.deal')"
      v-model="modal8"
      width="700"
      @on-ok="submitok"
      :mask-closable="false">
      <div style="background:#eee;padding: 20px">
        <Card :bordered="false">
          <p slot="title">{{$t('m.maintain.complaintinfo')}}</p>
          <p>
            <span>{{$t('m.customerinfo.label1')}}:{{customerinfo.customerName}}</span>
            <span>{{$t('m.customerinfo.label2')}}:{{customerinfo.identityCode}}</span>
            <span>{{$t('m.customerinfo.label3')}}:{{customerinfo.telephone}}</span>
          </p>
          <p>
            <span>{{$t('m.customerinfo.label5')}}:{{customerinfo.physicalAddress}}</span>
            <span>{{$t('m.maintain.time1')}}:{{complainDate}}</span>
          </p>
          <p>{{$t('m.maintain.faultcode')}}: {{maintainerId}}</p>
          <p>{{$t('m.maintain.faultinfo')}}: {{complainContent}}</p>
        </Card>
      </div>
      <div style="padding:5px 20px">
        <p style="line-height: 30px">{{$t('m.maintain.ask')}}</p>
        <RadioGroup v-model="isvisit">
          <Radio :label="$t('m.maintain.yes')"></Radio>
          <Radio :label="$t('m.maintain.no')"></Radio>
        </RadioGroup>
        <div style="margin:8px 0;">
          <Select v-model="maintainer" style="width:200px" >
            <Option v-for="item in allmaintainer" :value="item.id" :key="item.id">{{ item.loginName }}</Option>
          </Select>
        </div>
        <p style="line-height: 30px">{{$t('m.maintain.method')}}</p>
        <Input v-model="handingMethod" type="textarea" :rows="3" placeholder="Enter something..."></Input>
      </div>
    </Modal>
    <Modal
      v-model="subshenhe"
      :title="$t('m.maintain.subcheck')"
      @on-ok="submitsh"
      >
      <div>
        <p>{{$t('m.maintain.result')}}</p>
        <Input type="textarea" clearable v-model="handingMethod1" :rows="2"></Input>
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
    /*background: #fff;*/
    /*padding: 5px 0;*/
  }
  .filter{
    height:40px;
    padding: 0 10px;
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
    nane:'maintain',
    data() {
      return {
        name:'',
        index:'',
        repairtotal:0,
        repairid:'',
        modal8: false,
        subshenhe:false,
        value6:'',
        alloperators:[],
        operator:'',
        allcomplaintTypeId:[],
        complaintTypeId:'',
        allmaintainer:[],
        maintainer:'',
        isvisit:this.$t('m.maintain.yes'),
        customerinfo:{},
        maintainerId:'',
        complainDate:'',
        complainContent:'',
        complaintId:'',
        handingMethod:'',
        handingMethod1:'',
        resultend:'',
        complaintId1:'',
        state:'',
        columns4: [
          {
            title: this.$t('m.customerinfo.label1'),
            key:'customerName'
          },
          {
            title: this.$t('m.deal.operator'),
            key: 'operatorName',
          },
          {
            title: this.$t('m.maintain.time1'),
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
            title: this.$t('m.maintain.man'),
            key: 'maintainer',
          },
          {
            title: this.$t('m.customerinfo.label9'),
            key: 'state',
            render: (h, params) => {
              const row = params.row;
              let colors = row.state;
              let texts = row.state;
              if(row.state === 1 ){
                colors= 'orange';
                texts=this.$t('m.maintain.case2');
              }else if(row.state === 0){
                colors='red';
                texts=this.$t('m.maintain.case1')
              }else if(row.state === 3){
                colors='green';
                texts=this.$t('m.maintain.case4')
              }else if(row.state === 2){
                colors='blue';
                texts=this.$t('m.maintain.case3')
              }
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: colors
                }
              }, texts);
            }
          },
          {
            title: this.$t('m.meter.operate'),
            key: 'action',
            align: 'center',
            render: (h, params) => {
              if(params.row.state==0){
                return h('div', [
                  h('Poptip',{
                    props: {
                      trigger:"hover",
                      content:this.$t('m.maintain.allot')
                    },
                  },[
                    h('Button', {
                        props: {
                          type: 'success',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.dealwith(params.row)
                          }
                        }
                      },[h('Icon',{
                        props:{
                          color:'#fff',
                          type: 'wrench',
                        }
                      })]
                    )
                  ]),
                ]);
              }
              if(params.row.state==1){
                return h('div', [
                  h('Poptip',{
                    props: {
                      trigger:"hover",
                      content:this.$t('m.maintain.subcheck')
                    },
                  },[
                    h('Button', {
                        props: {
                          type: 'warning',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.handing(params.row)
                          }
                        }
                      },[h('Icon',{
                        props:{
                          color:'#fff',
                          type: "document-text",
                          size:14,
                        }
                      })]
                    )
                  ]),
                ]);
              }
            }
          }
        ],
        data1: [

        ]
      }
    },
    methods: {
      query(state){
        this.state=state;
        this.$http({
          url:'biz/complaint/findByPage.do',
          body:{
            "conditions": {
              name:this.name,
              operatorId:this.operator,
              complaintType:this.complaintTypeId,
              orderByClause :"complain_date desc",
              state:state,
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
            if(val.maintainer){
              val.maintainer=val.maintainer.loginName;
            }
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
              state:this.state,
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

      dealwith(info){
        this.customerinfo=info.customer;
        this.modal8=true;
        this.complainDate=info.complainDate;
        this.complainContent=info.complainContent;
        this.complaintId=info.complaintId;
        this.maintainerId=info.maintainerId;
      },
      submitok(){
        if(this.isvisit==this.$t('m.maintain.yes')){
          this.$http({
            url:'biz/complaint/allotComplaint.do',
            body:{
              complaintId:this.complaintId,
              maintainerId:this.maintainer
            },
            credentials:true,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          }).then((response) => {
            if(response.body.code==0){
              this.$Message.success(this.$t('m.maintain.success'));
              this.query(0)
            }else{
              this.$Message.error(response.body.errors);
            }
          });
        }else if(this.isvisit==this.$t('m.maintain.no')){
          this.$http({
            url:'biz/complaint/handComplaint.do',
            body:{
              complaintId:this.complaintId,
              handingMethod:this.handingMethod,
            },
            credentials:true,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          }).then((response) => {
            if(response.body.code==0){
              this.$Message.success(this.$t('m.maintain.alsubcheck'));
            }else{
              this.$Message.error(response.body.errors);
            }
          });
        }
      },
      handing(row){
        this.subshenhe=true;
        this.complaintId1=row.complaintId;
      },
      submitsh(){
        this.$http({
          url:'biz/complaint/handComplaint.do',
          body:{
            complaintId:this.complaintId1,
            handingMethod:this.handingMethod1,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.code==0){
            this.$Message.success(this.$t('m.maintain.alsubcheck'));
            this.query(1)
          }else{
            this.$Message.error(response.body.errors);
          }
        })
      },
    },
    created(){
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

      });
      //获取维修员
      this.$http({
        url:'sys/user/listMaintainer.do',
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
          this.allmaintainer=response.body.maintainers
        }
      });
      //获取故障类型
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
    }
  }
</script>

