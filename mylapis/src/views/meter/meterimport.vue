<template>
  <div>
    <div class="MetImport">
      <ul>
        <li>
            <p style="line-height: 25px;">{{$t('m.open.content1')}}：</p>
            <Select style="width:200px" v-model="customertypecode">
              <Option v-for="item in customerType" :value="item.customerTypeCode" :key="item.customerTypeCode">{{item.customerTypeName}}</Option>
            </Select>
        </li>
        <li>
          <p style="line-height: 25px;">{{$t('m.meter.single')}}</p>
          <div>
            <Input :disabled="qiehuan1" style="width:200px;" v-model.trim="meterno" ></Input>
          </div>
        </li>
        <li class="changeiview">
          <p style="line-height: 35px;">{{$t('m.meter.batch')}}</p>
          <i-Switch @on-change="batch" v-model="batchswitch" class="swichsmeter">
            <Icon type="android-done" slot="open"></Icon>
            <Icon type="android-close" slot="close"></Icon>
          </i-Switch>
          <div>
            <Input :disabled="qiehuan2" style="width:200px;" :placeholder="$t('m.meter.smeter')" v-model.trim="startmeterno"></Input>
            <Icon type="android-remove"></Icon>
            <Input :disabled="qiehuan2" style="width:200px;" :placeholder="$t('m.meter.emeter')" v-model.trim="endmeterno"></Input>
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
  .MetImport > ul >li{
    margin-bottom:10px;
  }
  .changeiview .swichsmeter{
    position: absolute;
    left:80px;
    /*top:204px;*/
    top:138px;
  }
</style>
