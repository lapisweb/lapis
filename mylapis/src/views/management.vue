<template>
  <div>
      <div class="h-content">
        <div style="margin:10px 100px;">
          <div class="h-title">
            <p>{{$t('m.edit.editinfo')}}</p>
          </div>
          <div style="margin-top: 10px;">
            <Input v-model.trim="customername" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
            <Input v-model.trim="idcard" :placeholder="$t('m.customerinfo.label2')" style="width: 180px"></Input>
            <Input v-model.trim="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 180px"></Input>
            <Button type="primary" icon="ios-search" @click="querymanage">{{$t('m.common.query')}}</Button>
          </div>
          <div style="margin-top: 10px;" v-if="showmanagement">
            <Table highlight-row stripe :loading="loading" border :columns="custominfo" :data="customerdata" @on-row-click="manageselected"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="customertotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
              </div>
            </div>
          </div>
          <Tabs style="margin-top: 10px;">
            <div v-show="disable" style="border-radius:10px;background: rgba(255,255,255,0.8);position:absolute;left:0;right:0;top:-52px;bottom:0;z-index:2">
              <Alert style="width:300px; text-align: center;margin: 50px auto;" type="warning" show-icon>{{$t('m.common.select')}}</Alert>
            </div>
            <TabPane :label="$t('m.open.title2')" icon="android-contact">
              <div>
                <h3 class="h-viewtitle">{{$t('m.open.title2')}}</h3>
                <Form label-position="left" :label-width="80" :rules="ruleValidate" ref="presoninfo" :model="presoninfo">
                  <FormItem :label="$t('m.customerinfo.label1')" prop="name">
                    <Input v-model="presoninfo.name" size="large" ></Input>
                  </FormItem>
                  <FormItem :label="$t('m.customerinfo.label2')" prop="idcard">
                    <Input v-model="presoninfo.idcard" size="large"></Input>
                  </FormItem>
                  <FormItem :label="$t('m.customerinfo.label3')" prop="tel">
                    <Input v-model="presoninfo.tel" size="large"></Input>
                  </FormItem>
                  <FormItem  :label="$t('m.open.label4')" prop="districtvalue">
                    <Cascader  :data="presoninfo.district" size="large" v-model="presoninfo.districtvalue"></Cascader>
                  </FormItem>
                  <FormItem :label="$t('m.customerinfo.label5')" prop="address">
                    <Input  v-model="presoninfo.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}" ></Input>
                  </FormItem>
                  <div class="h-submit">
                    <Button type="primary" @click="changeok('presoninfo')">{{$t('m.common.submit')}}</Button>
                    <Button type="ghost" style="margin-left: 8px" @click="changecancel('presoninfo')">{{$t('m.common.cancel')}}</Button>
                  </div>
                </Form>
              </div>
            </TabPane>
            <!--<TabPane label="债务信息" icon="cash">-->
              <!--<div>-->
                <!--<h3 class="h-viewtitle">债务信息</h3>-->
                <!--<InputNumber :min="0" v-model="presoninfo.debt" style="width:160px;"></InputNumber>-->
                <!--<div class="h-submit">-->
                  <!--<Button type="primary" @click="debtok">提交</Button>-->
                  <!--<Button type="ghost" style="margin-left: 8px" @click="debtcancel">取消</Button>-->
                <!--</div>-->
              <!--</div>-->
            <!--</TabPane>-->
            <TabPane :label="$t('m.open.title3')" icon="speedometer">
              <div>
                <h3 class="h-viewtitle">{{$t('m.open.title3')}}</h3>
                <Button type="warning" icon="ios-search"  @click="querymeter()">{{$t('m.common.query')}}</Button>
                <Modal
                  width="60%"
                  v-model="modal1"
                  :title="$t('m.open.selectmeter')"
                  @on-ok="ok"
                  @on-cancel="cancel">
                  <div style="margin-bottom: 10px;">
                    <Input v-model="querycondition" placeholder="Enter meterNo..." style="width: 200px"></Input>
                    <Button type="warning" @click="requerymeter">{{$t('m.common.query')}}</Button>
                  </div>
                  <Table border :columns="metercolumns" :data="meterdata" :highlight-row="true" @on-row-click="meternoview"></Table>
                  <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                      <Page :total="metertotal" :current="1" @on-change="changemeterpage" :show-total="true" :page-size=8></Page>
                    </div>
                  </div>
                </Modal>
                <p style="line-height: 40px;">{{ $t("m.open.meterno") }}</p>
                <Input style="width:200px;" v-model="presoninfo.meterno"></Input>
                <div class="h-submit">
                  <Button type="primary" @click="meterok">{{$t('m.common.submit')}}</Button>
                  <Button type="ghost" style="margin-left: 8px" @click="metercancel">{{$t('m.common.cancel')}}</Button>
                </div>
              </div>
            </TabPane>
            <TabPane :label="$t('m.open.additionfeescheme')" icon="android-add-circle">
              <div>
                <h3 class="h-viewtitle">{{$t('m.open.additionfeescheme')}}</h3>
                <div class="additionalfee">
                  <Transfer
                    :titles="[$t('m.edit.unselected'),$t('m.edit.selected')]"
                    :data="addifeedata"
                    :target-keys="systemaddi"
                    :list-style="listStyle"
                    :render-format="render3"
                    :operations="[$t('m.edit.out'),$t('m.edit.in')]"
                    @on-change="handleChange3">
                    <div :style="{float: 'right', margin: '5px'}">
                      <Button type="ghost" size="small" @click="reloadMockData">Refresh</Button>
                    </div>
                  </Transfer>
                  <div style="height: 40px;margin-top:10px;">
                    <Button type="warning" icon="plus-round" @click="addfee()">{{$t('m.open.addaddi')}}</Button>
                  </div>
                  <Modal
                    title="Title"
                    v-model="addfujiafei"
                    :closable="false"
                    @on-ok="addifeeok"
                    @on-cancel="addifeecancel"
                    :mask-closable="false">
                    <div style="height: 240px;width:100%">
                      <div style="float: left;margin-right: 20px;">
                        <p class="hyyword">{{$t('m.open.additionfeename')}}</p>
                        <Input v-model="additionname"  style="width: 200px"></Input>
                        <p class="hyyword">{{$t('m.open.additionfeetype')}}</p>
                        <Select clearable v-model="additiontype" style="width:200px" @on-change="addifeetype">
                          <Option v-for="item in additiontypedata" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <p class="hyyword">{{$t('m.open.additionfeemethod')}}</p>
                        <Select clearable v-model="additionmethod" style="width:200px" @on-change="addifeemethod">
                          <Option v-for="item in additionmethoddata" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <p class="hyyword">{{$t('m.open.starttime')}}</p>
                        <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px" @on-change="opendatechange"></DatePicker>
                      </div>
                      <div style="float: left">
                        <p class="hyyword">{{$t('m.open.feetime')}}</p>
                        <InputNumber :disabled="right1"  v-model="additionalFeeDeductionTimes" style="width: 200px"></InputNumber>
                        <p class="hyyword">{{$t('m.open.percent')}}</p>
                        <InputNumber :disabled="right2"  v-model="additionalFeeDeductionRate" style="width: 200px"></InputNumber>
                        <p class="hyyword">{{$t('m.open.money')}}</p>
                        <InputNumber :disabled="right3"  v-model="additionalFeeDeductionAmount" style="width: 200px"></InputNumber>
                        <p class="hyyword">{{$t('m.open.vat')}}</p>
                        <InputNumber :disabled="right4"  v-model="additionalFeeVat" style="width: 200px"></InputNumber>
                      </div>
                    </div>
                  </Modal>
                  <div v-for="(item,key) in customFees" class="hyyDetail">
                    <Card style="margin-top: 10px;">
                      <Row>
                        <Col span="7">
                          <span class="expand-key">{{$t('m.open.additionfeename')}}: </span>
                          <span class="expand-value">{{item.itemName}}</span>
                        </Col>
                        <Col span="7">
                          <span class="expand-key">{{$t('m.open.additionfeetype')}}: </span>
                          <span class="expand-value">{{item.additionalFeeType==0?$t('m.open.additiontypelabel1'):$t('m.open.additiontypelabel2')}}</span>
                        </Col>
                        <Col span="7">
                          <span class="expand-key">{{$t('m.open.additionfeemethod')}}: </span>
                          <span class="expand-value" v-if="item.additionalFeeDeductionMode==0">{{$t('m.open.additionmethodlabel1')}}</span>
                          <span class="expand-value" v-if="item.additionalFeeDeductionMode==1">{{$t('m.open.additionmethodlabel2')}}</span>
                          <span class="expand-value" v-if="item.additionalFeeDeductionMode==2">{{$t('m.open.additionmethodlabel3')}}</span>
                          <span class="expand-value" v-if="item.additionalFeeDeductionMode==3">{{$t('m.open.additionmethodlabel4')}}</span>
                          <span class="expand-value" v-if="item.additionalFeeDeductionMode==4">{{$t('m.open.additionmethodlabel5')}}</span>
                          <span class="expand-value" v-if="item.additionalFeeDeductionMode==5">{{$t('m.open.additionmethodlabel6')}}</span>
                          <span class="expand-value" v-if="item.additionalFeeDeductionMode==6">{{$t('m.open.additionmethodlabel7')}}</span>
                        </Col>
                        <Col span="7">
                          <span class="expand-key">{{$t('m.open.feetime')}}: </span>
                          <span class="expand-value">{{item.additionalFeeDeductionTimes}}</span>
                        </Col>
                        <Col span="7">
                          <span class="expand-key">{{$t('m.open.percent')}}: </span>
                          <span class="expand-value">{{item.additionalFeeDeductionRate}}</span>
                        </Col>
                        <Col span="7">
                          <span class="expand-key">{{$t('m.open.money')}}: </span>
                          <span class="expand-value">{{item.additionalFeeDeductionAmount}}</span>
                        </Col>
                        <Col span="7">
                          <span class="expand-key">{{$t('m.open.vat')}}: </span>
                          <span class="expand-value">{{item.additionalFeeVat}}</span>
                        </Col>
                        <Col span="7">
                          <span class="expand-key">{{$t('m.open.starttime')}}: </span>
                          <span class="expand-value">{{item.additionalFeeStartDate}}</span>
                        </Col>
                        <div class="positionedit">
                          <Button type="error" @click="deletezi(key)"><i class="iconfont icon-105"></i></Button>
                        </div>
                      </Row>
                    </Card>
                  </div>
                </div>
                <div class="h-submit">
                  <Button type="primary" @click="changeaddiok">{{$t('m.common.submit')}}</Button>
                  <Button type="ghost" style="margin-left: 8px" @click="changeaddicancel">{{$t('m.common.cancel')}}</Button>
                </div>
              </div>
            </TabPane>
          </Tabs>
              <!--<div v-show="hid==4">-->
              <!--<h3 class="h-viewtitle">用户类型 <span>预览</span> </h3>-->
              <!--<p>修改用户类型：</p>-->
              <!--<Select clearable v-model="presoninfo.customertype" style="width:200px">-->
              <!--<Option v-for="item in customerList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
              <!--</Select>-->
              <!--<div class="h-submit">-->
              <!--<Button type="primary">提交</Button>-->
              <!--<Button type="ghost" style="margin-left: 8px">取消</Button>-->
              <!--</div>-->
              <!--</div>-->
      </div>
    </div>
    <my-footer1></my-footer1>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        //数据定义
        presoninfo:{
          name:'',
          idcard:'',
          tel:'',
          address:'',
          customertype:'',
          debt:0,
          meterno:"",
          districtvalue:[],
          customerid:'',
          //省市联动
          district: [],
        },
        additionalfee:[],
        loading:false,
        customertotal:0,
        stsdata:"",
        customerno:'',
        customername:'',
        idcard:'',
        tel:'',
        modal1: false,
        importtime:'',
        zhongjian:"",
        diss:false,
        activeman: this.$t('m.open.title2'),
        hid:1,
        showmanagement:false,
        querycondition:'',
        metertotal:0,
        indexs:0,
        cusaddifee1:'',
        cusaddifee2:0,
        cusaddifee3:0,
        cusaddifee4:'',
        cusaddifee5:0,
        cusaddifee6:0,
        cusaddifee7:0,
        cusaddifee8:0,

        addfujiafei:false,
        editfujiafei:false,
        additiontype: '',
        additionmethod: '',
        xitongaddifee:[],
        additionalFeeDeductionAmount:0,
        additionalFeeDeductionRate:0.00,
        additionalFeeVat:0.00,
        additionalFeeDeductionTimes:0,
        customFees:[],
        additionname:'',
        additionalFeeStartDate:'',
        aa:'',
        systemaddi:[],
        disable:true,
        listStyle: {
          width: '350px',
          height: '300px'
        },
        //表头定义
        custominfo: [
          {
            title: this.$t('m.customerinfo.label1'),
            key: 'name'
          },
          {
            title: this.$t('m.customerinfo.label2'),
            key: 'idcard',
          },
          {
            title: this.$t('m.customerinfo.label3'),
            key: 'tel',
          },
          {
            title: this.$t('m.customerinfo.label4'),
            key: 'opendate'
          },
          {
            title: this.$t('m.customerinfo.label6'),
            key: 'customertype'
          },
          {
            title: this.$t('m.customerinfo.label8'),
            key: 'debt',
          },
          {
            title: this.$t('m.customerinfo.label7'),
            key: 'meterno',
          },
          {
            title: this.$t('m.customerinfo.label5'),
            key: 'address',
          },
          {
            title: this.$t('m.customerinfo.label9'),
            key: 'status',
            width:160,
            render: (h, params) => {
              const row = params.row;
              let color = row.status;
              let text = row.status;
              if(row.status === '1' ){
                color= 'green';
                text=this.$t('m.cancel.text1');
              }else if(row.status === '0'){
                color='red';
                text=this.$t('m.cancel.text2')
              }else if(row.status === '2'){
                color='red';
                text=this.$t('m.cancel.text3')
              }else if(row.status === '3'){
                color='red';
                text=this.$t('m.cancel.text4')
              }else if(row.status === '4'){
                color='blue';
                text=this.$t('m.cancel.text5')
              }
              return h('Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }, text);
            }
          },
        ],
        //表中信息
        customerdata: [

        ],
        //表单验证规则
        ruleValidate: {
          name: [
            { required: true, message: this.$t('m.validation.name'), trigger: 'blur,change' }
          ],
          idcard: [
            { required: true, message: this.$t('m.validation.idcard'),trigger: 'blur,change'},
          ],
          tel: [
            {
              type:'string',trigger: 'blur,change', pattern:/^[0-9]+$/,message:this.$t('m.validation.tel'),
            }
          ],
          districtvalue: [
            { required: true, message:this.$t('m.validation.district'),}
          ],
          address: [
            { }
          ],
        },
        //修改用户类型
//        customerList: [
//          {
//            value: 'yufufei',
//            label: '预付费'
//          },
//          {
//            value: 'houfufei',
//            label: '后付费'
//          },
//        ],
        //查询表号的表格
        //列名
        metercolumns: [
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
            key: 'customerTypeName'
          },
        ],
        //查询表的数据
        meterdata: [],

        //附加费数据
        addifeedata: [],
        targetKeys: [],

        //添加附加费
        //1.选择附加费类型
        additiontypedata: [
          {
            label: this.$t('m.open.additiontypelabel1'),
            value: 0
          },
          {
            label: this.$t('m.open.additiontypelabel2'),
            value: 1
          },
        ],
        right1:true,
        right2:true,
        right3:true,
        right4:true,
        //2.扣费方式
        additionmethoddata: [
          {
            label: this.$t('m.open.additionmethodlabel1'),
            value: 0
          },
          {
            label: this.$t('m.open.additionmethodlabel2'),
            value: 1
          },
          {
            label: this.$t('m.open.additionmethodlabel3'),
            value: 2
          },
          {
            label: this.$t('m.open.additionmethodlabel4'),
            value: 3
          },
          {
            label: this.$t('m.open.additionmethodlabel5'),
            value:4
          },
          {
            label: this.$t('m.open.additionmethodlabel6'),
            value: 5
          },
          {
            label: this.$t('m.open.additionmethodlabel7'),
            value :6
          },
        ],
        //STS参数设置
//        stsparame:[
//          {
//            value: '2014',
//            label: '2014',
//          },
//          {
//            value: '1993',
//            label: '1993',
//          },
//        ],
      }
    },
    methods:{
      //查找客户
      querymanage:function () {
        this.loading=true;
        this.customerdata=[];
        this.showmanagement=true;
        this.$http({
          url:'biz/customer/findByPage.do',
          body:{
            "conditions": {
              customerNum:this.customerno,
              name:this.customername,
              identityCode:this.idcard,
              telephone:this.tel,
              orderByClause :"open_date desc",
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
          this.customertotal=parseInt(response.body.pageInfo.total);
          this.loading=false;
          response.body.pageInfo.list.forEach((val,index)=>{
            if(val.debt&&val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerType.customerTypeName,
                  debt:val.debt.currentDebt,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                  additionalFees:val.additionalFees,
                },
              )
            }else if(!val.debt&&val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerType.customerTypeName,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                  additionalFees:val.additionalFees,
                },
              )
            }else if(val.debt&&!val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerType.customerTypeName,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                  debt:val.debt.currentDebt,
                },
              )
            }else if(!val.debt&&!val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerType.customerTypeName,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                },
              )
            }
          });
        })
      },
      //分页查找
      changePage(page){
        this.customerdata=[];
        this.showmanagement=true;
        this.$http({
          url:'biz/customer/findByPage.do',
          body:{
            "conditions": {
              name:this.customername,
              identityCode:this.idcard,
              telephone:this.tel,
              orderByClause :"open_date desc",
            },
            "limit": 10,
            "page": page,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          this.customertotal=parseInt(response.body.pageInfo.total);
          response.body.pageInfo.list.forEach((val,index)=>{
            if(val.debt&&val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerType.customerTypeName,
                  debt:val.debt.currentDebt,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                  additionalFees:val.additionalFees,
                },
              )
            }else if(!val.debt&&val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerType.customerTypeName,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                  additionalFees:val.additionalFees,
                },
              )
            }else if(val.debt&&!val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerType.customerTypeName,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                  debt:val.debt.currentDebt,
                },
              )
            }else if(!val.debt&&!val.additionalFees){
              this.customerdata.push(
                {
                  customerid:val.customerId,
                  customerno:val.customerNumber,
                  name:val.customerName,
                  idcard:val.identityCode,
                  tel:val.telephone,
                  opendate:val.openDate,
                  customertype:val.customerType.customerTypeName,
                  meterno:val.meter.meterNumber,
                  address:val.physicalAddress,
                  status:val.state,
                  cuncode:val.villageCode,
                  zhencode:val.townCode,
                  shicode:val.cityCode,
                  shengcode:val.provinceCode,
                },
              )
            }
          });
          this.loading=false;
        })
      },

      handleChange3 (newTargetKeys) {
        this.systemaddi = newTargetKeys;
      },
      render3 (item) {
        return item.label;
      },
      reloadMockData () {

      },
      //修改基本信息
      changeok (personinfo) {
        this.$refs[personinfo].validate((valid) => {
          if (valid) {
            this.$http({
              url:'biz/customer/updateBasicInfo.do',
              body:{
                'customerId':this.presoninfo.customerid,
                'customerName': this.presoninfo.name,
                'identityCode': this.presoninfo.idcard,
                'villageCode': this.presoninfo.districtvalue[3],
                'telephone': this.presoninfo.tel,
                'physicalAddress': this.presoninfo.address,
              },
              credentials:true,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },

            }).then((response) => {
              if(response.body.msg){
                this.$Modal.success({
                  title: 'Meter import',
                  content:'<p>'+this.$t("m.common.tips")+'</p><p>'+response.body.msg+'</p>',
                });
              }else{
                this.$Modal.error({
                  title: 'Meter import',
                  content:'<p>'+this.$t("m.common.tips")+'</p><p>'+response.body.errors+'</p>',
                });
              }
            })
          }

        })
      },
      changecancel () {

      },
      //修改表号
      meterok () {
        this.$http({
          url:'biz/customer/updateMeter.do',
          body:{
            'customerId':this.presoninfo.customerid,
            'meter': {
              'meterNumber': this.presoninfo.meterno,
            },
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.msg){
            this.$Modal.success({
              title: 'Meter import',
              content:'<p>'+this.$t("m.common.tips")+'</p><p>'+response.body.msg+'</p>',
            });
          }else{
            this.$Modal.error({
              title: 'Meter import',
              content:'<p>'+this.$t("m.common.tips")+'</p><p>'+response.body.errors+'</p>',
            });
          }

        })
      },
      metercancel () {

      },
      //修改债务
      debtok () {
//        this.$http({
//          url:'biz/customer/updateBasicInfo.do',
//          body:{
//            'customerId':this.presoninfo.customerid,
//            'debt': {
//              'currentDebt': this.presoninfo.debt
//            },
//          },
//          credentials:true,
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json'
//          },
//
//        }).then((response) => {
//          console.log(response.body);
//
//        })
      },
      debtcancel () {

      },
      //修改附加费
      changeaddiok () {
        this.$http({
          url:'biz/customer/editCustomerAddtion.do',
          body:{
            'customerId':this.presoninfo.customerid,
            'additionalFeeSchemeCodes': this.systemaddi,
            'additionalFees': this.customFees,
          },
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          if(response.body.errors){
            this.$Modal.error({
              title: this.$t("m.edit.editinfo"),
              content:'<p>'+this.$t("m.common.tips")+'</p><p>'+response.body.errors+'</p>',
            });
          }else{
            this.$Modal.success({
              title: this.$t("m.edit.editinfo"),
              content:'<p>'+this.$t("m.common.tips")+'</p><p>'+response.body.msg+'</p>',
            });
          }

        })
      },
      changeaddicancel () {

      },
      deletezi(index){
        this.customFees.splice(index,1)
      },
      editfeeok(){
        this.customFees[this.indexs].itemName=this.cusaddifee1;
        this.customFees[this.indexs].additionalFeeStartDate=this.additionalFeeStartDate;
        this.customFees[this.indexs].additionalFeeType=this.cusaddifee2;
        this.customFees[this.indexs].additionalFeeDeductionMode=this.cusaddifee3;
        this.customFees[this.indexs].additionalFeeDeductionTimes=this.cusaddifee5;
        this.customFees[this.indexs].additionalFeeDeductionRate=this.cusaddifee6;
        this.customFees[this.indexs].additionalFeeDeductionAmount=this.cusaddifee7;
        this.customFees[this.indexs].additionalFeeVat=this.cusaddifee8;
      },
      addifeetype(value){
        if(value==0){
          this.right1=false;
          this.right2=false;
          this.right3=false;
          this.right4=true;
        }
        if(value==1){
          this.right1=false;
          this.right2=false;
          this.right3=false;
          this.right4=false;
        }
      },
      addifeemethod(value){
        if(value==0){
          this.right1=true;
          this.right2=false;
          this.right3=true;
          this.right4=true;
        }
        if(value==1){
          this.right1=false;
          this.right2=true;
          this.right3=false;
          this.right4=false;
        }
        if(value==2){
          this.right1=true;
          this.right2=true;
          this.right3=false;
          this.right4=false;
        }
        if(value==3){
          this.right1=true;
          this.right2=true;
          this.right3=false;
          this.right4=false;
        }
        if(value==4){
          this.right1=true;
          this.right2=true;
          this.right3=false;
          this.right4=false;
        }
        if(value==5){
          this.right1=true;
          this.right2=true;
          this.right3=false;
          this.right4=false;
        }
        if(value==6){
          this.right1=true;
          this.right2=true;
          this.right3=false;
          this.right4=false;
        }
      },
      //表列表选中后确认
      ok () {
        this.presoninfo.meterno=this.zhongjian;
      },
      cancel () {

      },
      //选中的那一行数据
      meternoview (data){
        this.zhongjian=data.meterNumber;
      },
      //查询表号
      querymeter(){
        this.loading=true;
        this.modal1=true;
        this.query1 = true;
        this.$http({
          url:'biz/meterStock/findByPage.do',
          body: {conditions:{},"limit": 8,
            "page": 1},
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
      changemeterpage(page){
        this.loading=true;
        this.$http({
          url:'biz/meterStock/findByPage.do',
          body: {conditions:{meterNum:this.querycondition},"limit": 8,
            "page": page},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.meterdata=response.body.pageInfo.list;
          this.loading=false;
        });
        this.query1 = true;
      },
      requerymeter(){
        this.$http({
          url:'biz/meterStock/findByPage.do',
          body: {conditions: {meterNum:this.querycondition},"limit": 8,
            "page": 1},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.metertotal=parseInt(response.body.pageInfo.total);
          this.meterdata=response.body.pageInfo.list;
        })
      },
      confirm(){
        this.token=true;
      },
      manageselected(e){
//        this.customername=e.name;
//        this.idcard=e.idcard;
//        this.tel=e.tel;
        this.customFees=[];
        this.showmanagement=false;
        this.disable=false;
        if(e.debt&&e.additionalFees){
          this.additionalfee=e.additionalFees;
          this.presoninfo.customerid=e.customerid;
          this.presoninfo.name=e.name;
          this.presoninfo.idcard=e.idcard;
          this.presoninfo.tel=e.tel;
          this.presoninfo.address=e.address;
          this.presoninfo.debt=e.debt;
          this.presoninfo.meterno=e.meterno;
          this.presoninfo.districtvalue=[e.shengcode,e.shicode,e.zhencode,e.cuncode];
        }else if(!e.debt&&e.additionalFees){
          this.additionalfee=e.additionalFees;
          this.presoninfo.customerid=e.customerid;
          this.presoninfo.name=e.name;
          this.presoninfo.idcard=e.idcard;
          this.presoninfo.tel=e.tel;
          this.presoninfo.address=e.address;
          this.presoninfo.meterno=e.meterno;
          this.presoninfo.districtvalue=[e.shengcode,e.shicode,e.zhencode,e.cuncode];
        }else if(e.debt&&!e.additionalFees){
          this.presoninfo.debt=e.debt;
          this.presoninfo.customerid=e.customerid;
          this.presoninfo.name=e.name;
          this.presoninfo.idcard=e.idcard;
          this.presoninfo.tel=e.tel;
          this.presoninfo.address=e.address;
          this.presoninfo.meterno=e.meterno;
          this.presoninfo.districtvalue=[e.shengcode,e.shicode,e.zhencode,e.cuncode];
        }else if(!e.debt&&!e.additionalFees){
          this.presoninfo.customerid=e.customerid;
          this.presoninfo.name=e.name;
          this.presoninfo.idcard=e.idcard;
          this.presoninfo.tel=e.tel;
          this.presoninfo.address=e.address;
          this.presoninfo.meterno=e.meterno;
          this.presoninfo.districtvalue=[e.shengcode,e.shicode,e.zhencode,e.cuncode];
        }
        this.targetKeys=[];
        this.additionalfee.forEach((val,index)=> {
          if(val.extraFeeSchemeId==0){
            this.customFees.push(val)
          }else{
            this.targetKeys.push(val.extraFeeSchemeId);
          }
        });
        this.systemaddi=[];
        this.targetKeys.forEach((val,index)=> {
          if(this.systemaddi.indexOf(val)===-1){
            this.systemaddi.push(val)
          }
        })
      },
      addfee(){
        this.additionname='';
        this.additiontype='';
        this.additionmethod='';
        this.additionalFeeDeductionTimes=0;
        this.additionalFeeDeductionRate=0;
        this.additionalFeeDeductionAmount=0;
        this.additionalFeeVat=0;
        this.addfujiafei=true;
        this.addfujiafei=true;
      },
      addifeeok () {
        this.customFees.push(
          {
            additionalFeeDeductionAmount:this.additionalFeeDeductionAmount,
            itemName:this.additionname,
            additionalFeeDeductionTimes:this.additionalFeeDeductionTimes,
            additionalFeeStartDate:this.additionalFeeStartDate,
            additionalFeeVat:this.additionalFeeVat,
            additionalFeeDeductionRate:this.additionalFeeDeductionRate,
            additionalFeeDeductionMode:this.additionmethod,
            additionalFeeType:this.additionmethod
          });
      },
      addifeecancel () {

      },
      opendatechange(date){
        this.additionalFeeStartDate=date;
      },
      opendateedit(date){
        this.additionalFeeStartDate=date;
      },
      datechange(time){
        this.importtime=time;
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      selectedmans: function(navName,navId) {
        this.activeman = navName;
        this.hid = navId;
      },
      updatesubmit(){

      },
      updatecancel(){

      },
    },
    created(){
      //获取行政区域
      this.$http({
        url:'sys/region/findRegion.do',
        body:{
          id:0,
        },
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type':'application/json; charset=UTF-8'
        },
      }).then((response) => {
        let diqu=response.body.Region.childRegions;
        for(let i=0;i<diqu.length;i++){
          let shiqu=diqu[i].childRegions;
          this.presoninfo.district.push(
            {
              value:diqu[i].regionCode,
              label:diqu[i].regionName,
              children: []
            },
          );
          for(let j=0;j<shiqu.length;j++){
            let xianqu=shiqu[j].childRegions;
            this.presoninfo.district[i].children.push({
              value:shiqu[j].regionCode,
              label:shiqu[j].regionName,
              children: []
            });
            for(let k=0;k<xianqu.length;k++){
              let cun=xianqu[k].childRegions;
              this.presoninfo.district[i].children[j].children.push({
                value:xianqu[k].regionCode,
                label:xianqu[k].regionName,
                children: []
              });
              for(let m=0;m<cun.length;m++){
                this.presoninfo.district[i].children[j].children[k].children.push({
                  value:cun[m].regionCode,
                  label:cun[m].regionName,
                  children: []
                })
              }
            }
          }
        }
      });
      //获取附加费
      this.$http({
        url:'sys/additionalFeeScheme/findAll.do',
        body:{conditions: {
            nostate:0,
          }},
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
      }).then((response) => {
        response.body.list.forEach((val,index)=> {
          this.addifeedata.push({
            key:val.additionalFeeSchemeCode,
            label:val.additionalFeeSchemeName,
            description:val.additionalFeeSchemeCode,
          })
        })
      })
    }
  }
</script>
<style>
    .h-change{
      position: relative;
      top:81px;
      width:80%;
      margin:0 auto;
    }
    .h-title{
      height:35px;
      width:100%;
      background:#5cadff;
      margin-top:10px;
      border-radius: 4px 4px 0 0;
    }
    .h-title p{
      color:#fff;
      line-height: 35px;
      padding:0 10px;
    }
    .h-manageleft{
      padding:10px 30px 20px;
      min-width:200px;
      /*float:left;*/
    }
    .h-manageleft > ul{
      height:94%;
      margin:0 auto;
    }
    .h-manageleft >ul >li{
      height:35px;
      width:100%;
      line-height: 35px;
      padding-left:20px;
    }
    .h-manageleft >ul >li:first-child{
      height:auto;
      line-height: 35px;
      padding-left:0;
    }
    .h-manageright{
      height:auto;
      padding:15px 25px 80px;
    }
    .actives{
      background:#5CADFF;
      color:#fff;
    }
    .h-viewtitle{
      line-height: 50px;
      border-bottom:1px solid #5CADFF;
      margin-bottom: 8px;
    }
    .h-viewtitle > span{
      font-size: 12px;
      color:#5CADFF;
      font-weight:normal
    }
    .additionalfee{
      width:100%;
      height:auto;
    }
    .additionalfee section{
      height:30px;
      width:100%;
      background: #2D8CF0;
    }
    .additionalfee section p{
      color:#fff;
      line-height: 30px;
      padding:0 20px;
    }
    .h-submit{
      margin-top:20px;
    }
    .hyyDetail{
      line-height: 20px;
      margin-bottom: 15px;
    }
    .hyyDetail span{
      font-size: 12px;
    }
    .hyyDetail:last-child{
      margin-bottom: 0;
    }
    p.hyyword{
      line-height: 26px;
      padding-left: 2px;
    }
    .positionedit{
      position: absolute;
      right:45px;
      top:50%;
      margin-top: -20px;
    }
</style>
