<template>
  <div>
    <div class="MetImport">
      <ul>
        <li>
            <p style="line-height: 25px;">{{$t('m.open.content1')}}：</p>
            <Select style="width:240px" v-model="customertypecode">
              <Option v-for="item in customerType" :value="item.customerTypeCode" :key="item.customerTypeCode">{{item.customerTypeName}}</Option>
            </Select>
        </li>
        <li>
          <p style="line-height: 25px;">{{$t('m.open.content6')}}：</p>
          <Select style="width:240px" v-model="stskeyval">
            <Option v-for="item in stskey" :value="item.stsKeyId" :key="item.stsKeyId">{{item.description | fenge}}</Option>
          </Select>
        </li>
        <li>
          <p style="line-height: 25px;">{{$t('m.meter.single')}}</p>
          <div>
            <Input :disabled="qiehuan1" style="width:240px;" v-model.trim="meterno" ></Input>
          </div>
        </li>
        <li class="changeiview">
          <p style="line-height: 35px;">{{$t('m.meter.batch')}}</p>
          <i-Switch @on-change="batch" v-model="batchswitch" class="swichsmeter">
            <Icon type="android-done" slot="open"></Icon>
            <Icon type="android-close" slot="close"></Icon>
          </i-Switch>
          <div>
            <Input :disabled="qiehuan2" style="width:240px;" :placeholder="$t('m.meter.smeter')" v-model.trim="startmeterno"></Input>
            <Icon type="android-remove"></Icon>
            <Input :disabled="qiehuan2" style="width:240px;" :placeholder="$t('m.meter.emeter')" v-model.trim="endmeterno"></Input>
          </div>
        </li>
        <li>
          <Button type="primary" icon="ios-upload-outline" @click="importmeter">{{$t('m.meter.lead')}}</Button>
        </li>
      </ul>
    </div>
    <my-footer1></my-footer1>
  </div>
</template>

<script>
  export default {
    name: 'meterimport',
    data () {
      return {
        //数据定义
        meterno:'',
        customertypecode:'',
        startmeterno:'',
        endmeterno:'',
        batchswitch:false,
        qiehuan2:true,
        qiehuan1:false,
        stskey:[],
        stskeyval:'',

        //用户类型
        customerType:[],

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
    filters:{fenge:function (val) {
      if(val.indexOf("Company=")!=-1){
        let start=(val.indexOf("Company=")+8);
        function find(str,cha,num){
          var x=str.indexOf(cha);
          for(var i=0;i<num;i++){
            x=str.indexOf(cha,x+1);
          }
          return x;
        };
        let end=(find(val,";",2));
        return val.substring(start,end);
      }else{
        return val;
      }
      }},
    methods: {

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
            body: {customerTypeCode:this.customertypecode,startMeterNumber:this.meterno,stsKeyId:this.stskeyval,tidBaseTime:'2014'},
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
                  this.stskeyval='';
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
            body: {customerTypeCode:this.customertypecode,startMeterNumber:this.startmeterno,stsKeyId:this.stskeyval,endMeterNumber:this.endmeterno,tidBaseTime:'2014'},
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
      findcustomertype(){
        this.$http({
          url:'sys/customerType/findAll.do',
          body:{'conditions':{
            nostate:0
          }},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.customerType=response.body.list;
        })
      },
      findstskey(){
        this.$http({
          url:'StsKey/findAll.do',
          body:{'conditions':{}},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.stskey=response.body.list;

        })
      },
    },

    created() {
        this.findcustomertype();
        this.findstskey()
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
  .MetImport > ul >li{
    margin-bottom:10px;
  }
  .changeiview .swichsmeter{
    position: absolute;
    left:80px;
    top:204px;
    /*top:138px;*/
  }
</style>
