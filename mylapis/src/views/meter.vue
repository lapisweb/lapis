<template>
  <div>
      <div class="meter-left">
        <ul class="importandquery">
          <li v-for="navName in navNames"
              :class="{active: activeName == navName.name}"
              @click="selected(navName.name)">
            <Icon :type=navName.icon size=16></Icon>
            {{navName.name}}
          </li>
        </ul>
      </div>
      <div class="fiterRight">
        <div  v-if="yes">
          <Row>
            <Col :sm={span:24} :md="{span:9}" :lg="{span:6}" style="margin-bottom: 15px">
              <span>{{$t('m.customerinfo.label7')}}</span>
              <Input v-model="querymeterno"  icon="pricetag" style="width: 200px"></Input>
            </Col>
            <Col :sm={span:24} :md="{span:12}" :lg="{span:9}" style="margin-bottom: 15px">
              <span>{{$t('m.deal.daterange')}}</span>
              <DatePicker type="daterange" placement="bottom-start" split-panels placeholder="Select date" style="width: 200px" @on-change="startenddate"></DatePicker>
            </Col>
              <Button type="primary" icon="ios-search" style="margin-bottom: 15px" @click="searchmeter">{{$t('m.common.query')}}</Button>
          </Row>
          <Table :loading="loading" stripe  border ref="selection" :columns="querymetertable" :data="meterdata"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="metertotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
            </div>
          </div>
        </div>
        <div  v-if="ok" class="MetImport">
          <ul>
            <li>
                <p style="line-height: 25px;">{{$t('m.open.content1')}}：</p>
                <Select style="width:200px" v-model="customertypecode">
                  <Option v-for="item in customerType" :value="item.customerTypeCode" :key="item.customerTypeCode">{{item.customerTypeName}}</Option>
                </Select>
            </li>
            <!--<li>-->
                <!--<p style="line-height: 25px;">STS Key：</p>-->
                <!--<Select style="width:200px" v-model="stskey">-->
                  <!--<Option v-for="item in stskeydata" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
            <!--</li>-->
            <li>
              <p style="line-height: 25px;">{{$t('m.meter.single')}}</p>
              <div>
                <Input :disabled="qiehuan1" style="width:200px;" v-model="meterno" ></Input>
              </div>
            </li>
            <li class="changeiview">
              <p style="line-height: 35px;">{{$t('m.meter.batch')}}</p>
              <i-Switch @on-change="batch" v-model="batchswitch" class="swichsmeter">
                <Icon type="android-done" slot="open"></Icon>
                <Icon type="android-close" slot="close"></Icon>
              </i-Switch>
              <div>
                <Input :disabled="qiehuan2" style="width:200px;" :placeholder="$t('m.meter.smeter')" v-model="startmeterno"></Input>
                <Icon type="android-remove"></Icon>
                <Input :disabled="qiehuan2" style="width:200px;" :placeholder="$t('m.meter.emeter')" v-model="endmeterno"></Input>
              </div>
            </li>
            <li>
              <Button type="primary" icon="ios-upload-outline" @click="importmeter">{{$t('m.meter.lead')}}</Button>
            </li>
          </ul>
        </div>
        <my-footer1></my-footer1>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'meter',
    data () {
      return {
        //数据定义
        meterno:'',
        importtime:[],
        customertypecode:'',
        querymeterno:'',
        startmeterno:'',
        endmeterno:'',
        batchswitch:false,
        qiehuan2:true,
        qiehuan1:false,
        stskey:'',
        metertotal:0,
        datearray:[],
        loading:false,
        meterid:'',
        index:'',
        //左侧导航
        ok:true,
        yes:false,
        navNames: [
          {
            icon:'ios-speedometer-outline',
            name:this.$t('m.meter.meterimport')
          },
          {
            icon:'android-search',
            name:this.$t('m.meter.meterequery')
          }
        ],
        activeName:this.$t('m.meter.meterimport'),

        //用户类型
        customerType:[

        ],
        //stskey数据
        stskeydata:[
          {
            label:'DITK',
            value:'0',
          },
          {
            label:'软加密DDTK',
            value:'1',
          },
          {
            label:'软加密DUTK',
            value:'2',
          },
          {
            label:'硬加密DUTK,DDTK',
            value:'3',
          },
        ],
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
            align: 'center',

            width:160,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.remove(params.index)
                      }
                    }
                  },[h('Icon',{
                    props:{
                      color:'#fff',
                      type: 'android-delete',
                    }
                  })]
                )
              ]);
            }
          }
        ],
        //数据
        meterdata: [

        ],
      }
    },
    methods: {
      //左侧选项卡
      selected: function(gameName) {
//        console.log(this.$t('m.meter.meterimport'))
        this.activeName = gameName;
        if(gameName==this.$t('m.meter.meterimport')){
          this.ok=true;
          this.yes=false;
        }else{
          this.ok=false;
          this.yes=true;
        }
      },
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
      //开启批量导入
      batch(status){
        if(status==true){
          this.qiehuan2=false;
          this.qiehuan1=true;
        }else{
          this.qiehuan2=true;
          this.qiehuan1=false;
        }
      },
      //导入按钮
      importmeter(){
        if(this.qiehuan1==false){
          this.$http({
            url:'biz/meterStock/addBatch.do',
            body: {customerTypeCode:this.customertypecode,startMeterNumber:this.meterno,stsKeyId:1,tidBaseTime:'2014'},
            credentials:true,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          }).then((response) => {
            if(response.body.msg){
              this.$Modal.success({
                title: 'Meter import',
                content:'<p>'+this.$t('m.common.tips')+'</p><p>'+response.body.msg+'</p>',
                onOk: () => {
                  this.meterno='';
                  this.customertypecode='';
                },
              });
            }else{
              this.$Modal.error({
                title: 'Meter import',
                content:'<p>'+this.$t('m.common.tips')+'</p><p>'+response.body.errors+'</p>',
              });
            }
          })
        }else{
          this.$http({
            url:'biz/meterStock/addBatch.do',
            body: {customerTypeCode:this.customertypecode,startMeterNumber:this.startmeterno,stsKeyId:1,endMeterNumber:this.endmeterno,tidBaseTime:'2014'},
            credentials:true,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          }).then((response) => {
            if(response.body.msg){
              this.$Modal.success({
                title: 'Meter import',
                content:'<p>'+this.$t('m.common.tips')+'</p><p>'+response.body.msg+'</p>',
                onOk: () => {
                  this.startmeterno='';
                  this.endmeterno='';
                  this.customertypecode='';
                },
              });
            }else{
              this.$Modal.error({
                title: 'Meter import',
                content:'<p>'+this.$t('m.common.tips')+'</p><p>'+response.body.errors+'</p>',
              });
            }

          })
        }
      },
      remove (index) {
        this.meterid=this.meterdata[index].meterId;
        this.index=index;
        this.$Modal.confirm({
          title: 'Meter import',
          content:'<p>'+this.$t('m.common.tips')+'</p><p>Are you sure to delete it？</p>',
          onOk: () => {
            this.removeconfirm();
          },
          onCancel: () => {
//            this.$Message.info('Clicked cancel');
          }
        });
      },
      removeconfirm () {
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
            this.meterdata.splice(this.index, 1);
            this.metertotal=this.metertotal-1;
            this.$Message.success(response.body.msg);
          }else{
            this.$Message.error(response.body.errors);
          }
        });
      }
    },

    created() {
      this.$http({
        url:'sys/customerType/findAll.do',
        body:{'conditions':{}},
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        this.customerType=response.body.list;
      })
    }
  }
</script>

<style>
  .changeiview .ivu-switch{
    position: static;
  }
  .meter-left{
    width: 240px;
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    z-index: 2;
    overflow-y: auto;
    background: #EEEEEE;
    padding-top: 8px;
  }
  .importandquery{
    height:auto;
    width:100%;
    padding-left:20px;
    padding-top: 10px;
  }
  .importandquery> li{
    height:40px;
    width:100%;
    font-size: 14px;
    line-height: 40px;
    cursor: pointer;
  }
  .importandquery> li >span{
    padding-left: 10px;
  }
  .active{
    color: #2D8CF0;
    border-right:2px solid #2D8CF0;
  }
  .MetImport > ul >li{
    margin-bottom:10px;
  }
  .fiterRight{
    position: relative;
    top: 84px;
    margin-left: 260px;
    margin-right: 30px;
    margin-bottom:85px;
  }
  .changeiview .swichsmeter{
    position: absolute;
    left:80px;
    /*top:204px;*/
    top:138px;
  }
  .fiterRight .footer{
    left:240px;
    right:0
  }
</style>
