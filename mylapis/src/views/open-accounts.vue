<template>
  <div>
    <Alert v-if="install" closable show-icon style="position:absolute;z-index:10000;width:50%;top:100px;left:50%;margin-left:-25%;text-align: center">
      {{ $t("m.common.install1")}} <a href="http://192.168.0.174/file/CLodop_Setup_for_Win32NT_3.029.exe">{{ $t("m.common.install2")}}</a> {{ $t("m.common.install3")}}
    </Alert>
    <div class="h-content">
      <div class="steps">
        <Steps :current="current">
          <Step :title="$t('m.open.title1')" :content="$t('m.open.content1')"></Step>
          <Step :title="$t('m.open.title2')" :content="$t('m.open.content2')"></Step>
          <Step :title="$t('m.open.title3')" :content="$t('m.open.content3')"></Step>
          <Step :title="$t('m.open.title4')" :content="$t('m.open.content4')" v-if="enableAdditionalFee"></Step>
          <Step :title="$t('m.open.title5')" :content="$t('m.open.content5')" v-if="enableDebt"></Step>
        </Steps>
      </div>
      <Form ref="formValidateopen" :model="formValidateopen" :rules="openruleValidate" label-position="top">
        <div class="center" v-if="current==0">
          <p>{{ $t("m.open.selectcustomertype") }}</p>
          <FormItem prop="customertypecode">
            <Select clearable v-model="formValidateopen.customertypecode" style="width:240px" size="large">
              <Option v-for="item in customerType" :value="item.customerTypeCode" :key="item.customerTypeCode">{{item.customerTypeName}}</Option>
            </Select>
          </FormItem>
        </div>
        <div class="center1" v-if="current==1">
          <FormItem :label="$t('m.customerinfo.label1')" prop="name">
            <Input v-model.trim="formValidateopen.name"></Input>
          </FormItem>
          <FormItem :label="$t('m.customerinfo.label2')" prop="idcard">
            <Input v-model.trim="formValidateopen.idcard"></Input>
          </FormItem>
          <FormItem :label="$t('m.customerinfo.label3')" prop="tel">
            <Input v-model.trim="formValidateopen.tel"></Input>
          </FormItem>
          <FormItem :label="$t('m.open.label4')" prop="districtvalue">
            <Cascader :data="district"  v-model="formValidateopen.districtvalue"></Cascader>
          </FormItem>
          <FormItem :label="$t('m.customerinfo.label5')" prop="address">
            <Input v-model.trim="formValidateopen.address"></Input>
          </FormItem>

        </div>
        <div class="center4" v-if="current==2">
          <Button type="info" icon="ios-search" @click="querymeter()">{{$t('m.common.query')}}</Button>
          <Modal
            v-model="query1"
            :title="$t('m.open.selectmeter')"
            @on-ok="ok"
            @on-cancel="cancel">
            <div style="margin-bottom: 10px;">
              <Input v-model.trim="querycondition" placeholder="Enter meterNo..." style="width: 200px"></Input>
              <Button type="warning" @click="requerymeter">{{$t('m.common.query')}}</Button>
            </div>
            <Table border :loading="loading" :columns="metercolumns" :data="meterdata" :highlight-row="true" @on-row-click="meternoview"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="float: right;">
                <Page :total="metertotal" :current="1" @on-change="changePage" :show-total="true" :page-size=8></Page>
              </div>
            </div>
          </Modal>
          <p>{{ $t("m.open.meterno") }}</p>
          <FormItem prop="meterno">
            <Input size="large" v-model.trim="formValidateopen.meterno"></Input>
          </FormItem>
        </div>
        <div v-if="enableAdditionalFee==1&&enableDebt==0">
          <div class="center2" v-if="current==3">
            <div style="display: none">
              <FormItem prop="addition">
                <Input v-model.trim="formValidateopen.addition"></Input>
              </FormItem>
            </div>
            <div class="h-switch1">
              <h3>{{ $t("m.open.enableaddi") }}</h3>
              <i-Switch v-model="addiswitch" @on-change="addichange" size="large">
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
              </i-Switch>
            </div>
            <div v-if="additionalfee" class="additionalfee">
              <div style="height: 40px;">
                <Button icon="plus-round" style="float: right" @click="addfee()">{{ $t("m.open.addaddi") }}</Button>
              </div>
              <section>
                <p>{{ $t("m.open.systemaddi") }}</p>
              </section>
              <Table  :disabled-hover=true border ref="selection" :columns="addifeetable" :data="addifeedata" @on-selection-change="xitongaddi"></Table>
              <Modal
                title="Title"
                v-model="addfujiafei"
                :closable="false"
                @on-ok="addifeeok"
                @on-cancel="addifeecancel"
                :mask-closable="false">
                <div style="height: 240px;width:100%">
                  <div style="float: left;margin-right: 20px;">
                    <p class="hyyword">{{ $t("m.open.additionfeename") }}</p>
                    <Input v-model.trim="additionname"  style="width: 200px"></Input>
                    <p class="hyyword">{{ $t("m.open.additionfeetype") }}</p>
                    <Select clearable v-model="additiontype" style="width:200px" @on-change="addifeetype">
                      <Option v-for="item in additiontypedata" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <p class="hyyword">{{ $t("m.open.additionfeemethod") }}</p>
                    <Select clearable v-model="additionmethod" style="width:200px" @on-change="addifeemethod">
                      <Option v-for="item in additionmethoddata" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <p class="hyyword">{{ $t("m.open.starttime") }}</p>
                    <DatePicker type="datetime" placeholder="Select date and time" style="width:200px;" @on-change="opendatechange"></DatePicker>
                  </div>
                  <div style="float: left">
                    <p class="hyyword">{{ $t("m.open.feetime") }}</p>
                    <InputNumber :disabled="right1" placeholder="" v-model="additionalFeeDeductionTimes" style="width: 200px"></InputNumber>
                    <p class="hyyword">{{ $t("m.open.percent") }}</p>
                    <InputNumber :disabled="right2" placeholder="" v-model="additionalFeeDeductionRate" style="width: 185px"></InputNumber> %
                    <p class="hyyword">{{ $t("m.open.money") }}</p>
                    <InputNumber :disabled="right3" placeholder="" v-model="additionalFeeDeductionAmount" style="width: 185px"></InputNumber> $
                    <p class="hyyword">{{ $t("m.open.vat") }}</p>
                    <InputNumber :disabled="right4" placeholder="" v-model="additionalFeeVat" style="width: 185px"></InputNumber> %
                  </div>
                </div>
              </Modal>
              <div style="margin-top: 20px;">
                <section>
                  <p>{{ $t("m.open.customadditionfee") }}</p>
                </section>
                <div class="zidingyiaddi">
                  <div v-for="item in additionalFees" class="hyyDetail">
                    <Row>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.additionfeetype") }}</span>
                      <span class="expand-value">{{item.itemName}}</span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.additionfeetype") }} </span>
                      <span class="expand-value">{{item.additionalFeeType}} </span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.additionfeemethod") }} </span>
                      <span class="expand-value">{{item.additionalFeeDeductionMode}} </span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.feetime") }} </span>
                      <span class="expand-value">{{item.additionalFeeDeductionTimes}}</span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.percent") }} </span>
                      <span class="expand-value">{{item.additionalFeeDeductionRate}}</span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.money") }} </span>
                      <span class="expand-value">{{item.additionalFeeDeductionAmount}}</span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.vat") }} </span>
                      <span class="expand-value">{{item.additionalFeeVat}}</span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.starttime") }} </span>
                      <span class="expand-value">{{item.additionalFeeStartDate}}</span>
                      </Col>
                      <div class="positionedit">
                        <Button type="success" @click="editzi"><i class="iconfont icon-75bianji"></i></Button>
                        <Button type="error" @click="deletezi"><i class="iconfont icon-105"></i></Button>
                      </div>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="enableAdditionalFee==1&&enableDebt==1">
          <div class="center2" v-if="current==3">
            <div style="display: none">
              <FormItem prop="addition">
                <Input v-model.trim="formValidateopen.addition"></Input>
              </FormItem>
            </div>
            <div class="h-switch1">
              <h3>{{ $t("m.open.enableaddi") }}</h3>
              <i-Switch v-model="addiswitch" @on-change="addichange" size="large">
                <span slot="open">ON</span>
                <span slot="close">OFF</span>
              </i-Switch>
            </div>
            <div v-if="additionalfee" class="additionalfee">
              <div style="height: 40px;">
                <Button icon="plus-round" style="float: right" @click="addfee()">{{ $t("m.open.addaddi") }}</Button>
              </div>
              <section>
                <p>{{ $t("m.open.systemaddi") }}</p>
              </section>
              <Table  :disabled-hover=true border ref="selection" :columns="addifeetable" :data="addifeedata" @on-selection-change="xitongaddi"></Table>
              <Modal
                title="Title"
                v-model="addfujiafei"
                :closable="false"
                @on-ok="addifeeok"
                @on-cancel="addifeecancel"
                :mask-closable="false">
                <div style="height: 240px;width:100%">
                  <div style="float: left;margin-right: 20px;">
                    <p class="hyyword">{{ $t("m.open.additionfeename") }}</p>
                    <Input v-model="additionname" placeholder="" style="width: 200px"></Input>
                    <p class="hyyword">{{ $t("m.open.additionfeetype") }}</p>
                    <Select clearable v-model="additiontype" style="width:200px" @on-change="addifeetype">
                      <Option v-for="item in additiontypedata" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <p class="hyyword">{{ $t("m.open.additionfeemethod") }}</p>
                    <Select clearable v-model="additionmethod" style="width:200px" @on-change="addifeemethod">
                      <Option v-for="item in additionmethoddata" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <p class="hyyword">{{ $t("m.open.starttime") }}</p>
                    <DatePicker type="datetime" placeholder="Select date and time" style="width:200px;" @on-change="opendatechange"></DatePicker>
                  </div>
                  <div style="float: left">
                    <p class="hyyword">{{ $t("m.open.feetime") }}</p>
                    <InputNumber :disabled="right1"  v-model="additionalFeeDeductionTimes" style="width: 200px"></InputNumber>
                    <p class="hyyword">{{ $t("m.open.percent") }}</p>
                    <InputNumber :disabled="right2" :max="100" v-model="additionalFeeDeductionRate" style="width: 185px"></InputNumber> %
                    <p class="hyyword">{{ $t("m.open.money") }}</p>
                    <InputNumber :disabled="right3"  v-model="additionalFeeDeductionAmount" style="width: 185px"></InputNumber> $
                    <div v-show="nofipag">
                      <p class="hyyword">{{ $t("m.open.vat") }}</p>
                      <InputNumber :disabled="right4" :max="100" v-model="additionalFeeVat" style="width: 185px"></InputNumber> %
                    </div>
                  </div>
                </div>
              </Modal>
              <div style="margin-top: 20px;">
                <section>
                  <p>{{ $t("m.open.customadditionfee") }}</p>
                </section>
                <div class="zidingyiaddi">
                  <div v-for="(item,key) in additionalFees" class="hyyDetail">
                    <Row>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.additionfeename") }}</span>
                      <span class="expand-value">{{item.itemName}}</span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.additionfeetype") }} </span>
                      <span class="expand-value">{{item.additionalFeeType==0?$t('m.open.additiontypelabel1'):$t('m.open.additiontypelabel2')}} </span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.additionfeemethod") }} </span>
                      <span class="expand-value" v-if="item.additionalFeeDeductionMode==0">{{$t('m.open.additionmethodlabel1')}}</span>
                      <span class="expand-value" v-if="item.additionalFeeDeductionMode==1">{{$t('m.open.additionmethodlabel2')}}</span>
                      <span class="expand-value" v-if="item.additionalFeeDeductionMode==2">{{$t('m.open.additionmethodlabel3')}}</span>
                      <span class="expand-value" v-if="item.additionalFeeDeductionMode==3">{{$t('m.open.additionmethodlabel4')}}</span>
                      <span class="expand-value" v-if="item.additionalFeeDeductionMode==4">{{$t('m.open.additionmethodlabel5')}}</span>
                      <span class="expand-value" v-if="item.additionalFeeDeductionMode==5">{{$t('m.open.additionmethodlabel6')}}</span>
                      <span class="expand-value" v-if="item.additionalFeeDeductionMode==6">{{$t('m.open.additionmethodlabel7')}}</span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.feetime") }} </span>
                      <span class="expand-value">{{item.additionalFeeDeductionTimes}}</span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.percent") }} </span>
                      <span class="expand-value">{{item.additionalFeeDeductionRate}}</span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.money") }} </span>
                      <span class="expand-value">{{item.additionalFeeDeductionAmount}}</span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.vat") }} </span>
                      <span class="expand-value">{{item.additionalFeeVat}}</span>
                      </Col>
                      <Col span="7">
                      <span class="expand-key">{{ $t("m.open.starttime") }} </span>
                      <span class="expand-value">{{item.additionalFeeStartDate}}</span>
                      </Col>
                      <div class="positionedit">
                        <Button type="error" @click="deletezi(key)"><i class="iconfont icon-105"></i></Button>
                      </div>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="center3" v-if="current==4">
            <p>{{ $t("m.open.debt") }}</p>
            <FormItem prop="debt">
              <Input size="large" v-model.trim="formValidateopen.debt"></Input>
            </FormItem>
          </div>
        </div>
        <div v-if="enableDebt==1&&enableAdditionalFee==0">
          <div class="center3" v-if="current==3">
            <p>{{ $t("m.open.debt") }}</p>
            <FormItem prop="debt">
              <Input size="large" v-model.trim="formValidateopen.debt"></Input>
            </FormItem>
          </div>
        </div>
        <div style="margin:20px auto 120px;width: 300px;">
          <Button type="primary" :disabled="prevable" @click="prev('formValidateopen')">{{ $t("m.open.prev") }}</Button>
          <Button type="primary" :loading="nextloading" @click="next('formValidateopen')">{{xiayibu}}</Button>
        </div>
      </Form>
      <div v-if="opensuccess">
        <Modal v-model="opensuccess" width="360" :closable="false">
          <p slot="header" style="color:#19BE6B;text-align:center">
            <Icon type="checkmark-circled"></Icon>
            <span>{{ $t("m.open.open") }}</span>
          </p>
          <div style="text-align:center">
            <p>{{ $t("m.open.opensuccess") }}</p>
            <p>{{ $t("m.open.waiting") }}</p>
          </div>
          <div slot="footer">
            <Button type="success" size="large" long @click="openqueding">{{ $t("m.open.confirm") }}</Button>
          </div>
        </Modal>
      </div>
    </div>
    <my-footer1></my-footer1>
    <div class="openmain" id="smallopenfipag" v-show="false" v-if="kaihufapiao">
      <div class="header">
        <p class="dotted"></p>
        <img src="../assets/img/fipag.jpg" alt="">
        <p class="dotted2"></p>
      </div>
      <div class="f-title">
        <p style="font-size: 18px;text-align: center;line-height: 28px;">Open Account</p>
        <p style="text-align: center;margin-bottom: 10px;">{{invoicedata.name}}</p>
        <p style="text-align: center;line-height: 18px;">Invoice No. <span>{{invoicedata.invoiceNumber}}</span></p>
        <p style="text-align: center;line-height: 18px;margin-bottom: 8px;">{{invoicedata.tradeDate}}</p>
      </div>
      <div class="customer fbox">
        <h3>CUSTOMER INFORMATION</h3>
        <ul>
          <li><span>name :</span> <span>{{invoicedata.customerName}}</span></li>
          <li><span>Meter No. :</span> <span>{{incusdata.meter.meterNumber}}</span></li>
          <li><span>Customer type:</span> <span>{{incusdata.customerType.customerTypeName}}</span></li>
          <li><span>Id No. :</span> <span>{{invoicedata.identityCode}}</span></li>
          <li><span>Telephone :</span> <span>{{invoicedata.telephone}}</span></li>
          <li><span>Address :</span> <span>{{incusdata.physicalAddress}}</span></li>
        </ul>
      </div>
      <div class="fbox">
        <p style="text-align: center;line-height: 24px">Payment : <span>{{invoicedata.paymentAmount}}</span></p>
      </div>
      <div class="fbox">
        <p style="text-align: center;line-height: 24px">Vendor : <span>{{invoicedata.loginName}}</span></p>
      </div>
      <p class="dotted"></p>
    </div>
    <div class="incontent" id="print" v-if="kaihufapiao">
      <div style="height:65px;position: absolute;left:0;top:30px;">
        <img style="height: 100%;" src="../assets/img/fipag.jpg" alt="">
      </div>
      <div class="topinvoicehead">
        <div class="invoicehead">
          <h3>Open Account</h3>
          <p>RECEIPT NO.: <span>{{invoicedata.invoiceNumber}}</span></p>
          <p>Date: <span>{{invoicedata.tradeDate}}</span> </p>
        </div>
      </div>
      <div class="list">
        <ul class="left-invoice">
          <li>
            <span>name :</span> <span>{{invoicedata.customerName}}</span>
          </li>
          <li>
            <span>CustomerType:</span><span>{{incusdata.customerType.customerTypeName}}</span>
          </li>
          <li>
            <span>Id No. :</span><span>{{invoicedata.identityCode}}</span>
          </li>
        </ul>
        <ul class="left-invoice">
          <li>
            <span>Meter No.:</span> <span>{{invoicedata.tradeDate}}</span>
          </li>
          <li>
            <span>Vending station:</span> <span>{{invoicedata.name}}</span>
          </li>
          <li>
            <span>Address</span><span>{{invoicedata.physicalAddress}}</span>
          </li>
        </ul>
      </div>
      <table class="invoicetable" cellspacing="0" cellpadding="0">
        <tr>
          <th v-for="item in invoicelist">{{item.title}}</th>
        </tr>
        <tr>
          <td>开户</td>
          <td>${{invoicedata.paymentAmount}}</td>
        </tr>
      </table>
      <div class="total">
        <p>操作员: <span>{{invoicedata.loginName}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
  let myexpand={
    props: {
      row: Array
    },
    template: `
      <div>
        <div class="hyyDetail" v-for="item in row">
          <Row class="expand-row">
              <Col span="8">
                  <span class="expand-key">{{ $t("m.open.additionfeename") }}</span>
                  <span class="expand-value">{{item.additionalFeeName}}</span>
              </Col>
              <Col span="8">
                  <span class="expand-key">{{ $t("m.open.additionfeetype") }}</span>
                  <span class="expand-value">{{item.additionalFeeType}}</span>
              </Col>
              <Col span="8">
                  <span class="expand-key">{{ $t("m.open.additionfeemethod") }} </span>
                  <span class="expand-value">{{item.additionalFeeDeductionMode}}</span>
              </Col>
              <Col span="8">
                  <span class="expand-key">{{ $t("m.open.feetime") }} </span>
                  <span class="expand-value">{{item.additionalFeeDeductionTimes}}</span>
              </Col>
              <Col span="8">
                  <span class="expand-key">{{ $t("m.open.percent") }} </span>
                  <span class="expand-value">{{item.additionalFeeDeductionRate}} %</span>
              </Col>
              <Col span="8">
                  <span class="expand-key">{{ $t("m.open.money") }} </span>
                  <span class="expand-value">$ {{item.additionalFeeDeductionAmount}}</span>
              </Col>
              <Col span="8">
                  <span class="expand-key">{{ $t("m.open.vat") }} </span>
                  <span class="expand-value">{{item.additionalFeeVat}}</span>
              </Col>
              <Col span="8">
                  <span class="expand-key">{{ $t("m.open.starttime") }}  </span>
                  <span class="expand-value">{{item.additionalFeeStartDate}}</span>
              </Col>
          </Row>
        </div>
    </div> `
  };
  export default {
    name: 'open',
    data () {
      return {
        //数据定义
        install:false,
        xiayibu:this.$t("m.open.next"),
        formValidateopen:{
          customertypecode:'',
          name:'',
          idcard:'',
          tel:'',
          districtvalue:[],
          address:'',
          debt:0,
          meterno:"",
          addition:'aaa',
        },
        addiswitch:false,
        opensuccess:false,
        zhongjian:"",
        additionalfee:false,
        selmeter:false,
        query1:false,
        current: 0,
        loading:false,
        prevable:false,
        nextloading:false,
        querycondition:'',

        addfujiafei:false,
        additiontype: '',
        additionmethod: '',
        stationcode:[],
        xitongaddifee:[],
        additionalFeeDeductionAmount:0,
        additionalFeeDeductionRate:0.00,
        additionalFeeVat:0.00,
        additionalFeeDeductionTimes:0,
        additionalFees:[],
        additionname:'',
        currdate:'',
        additionalFeeStartDate:'',

        metertotal:0,
        enableAdditionalFee:1,
        enableDebt:1,
        tipmsg:'',
        tiperr:'',

        cusaddifee1:'',
        cusaddifee2:'',
        cusaddifee3:'',
        cusaddifee4:'',
        cusaddifee5:0,
        cusaddifee6:0,
        cusaddifee7:0,
        cusaddifee8:0,
        index:0,
        kaihufapiao:false,
        nofipag:true,
        incusdata:{},
        //客户类型
        customerType: [],
        //站点信息
        stationdata:[],
        //附加费方案表格表头定义
        addifeetable: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              params.row.additionalFeeDetails.forEach((val,index)=> {
                if(val.additionalFeeType==0){
                   val.additionalFeeType=this.$t('m.open.additiontypelabel1')
                }else if(val.additionalFeeType==1){
                  val.additionalFeeType=this.$t('m.open.additiontypelabel2')
                };
                if(val.additionalFeeDeductionMode==0){
                  val.additionalFeeDeductionMode=this.$t('m.open.additionmethodlabel1');
                }else if(val.additionalFeeDeductionMode==1){
                  val.additionalFeeDeductionMode=this.$t('m.open.additionmethodlabel2');
                }else if(val.additionalFeeDeductionMode==2){
                  val.additionalFeeDeductionMode=this.$t('m.open.additionmethodlabel3');
                }else if(val.additionalFeeDeductionMode==3){
                  val.additionalFeeDeductionMode=this.$t('m.open.additionmethodlabel4');
                }else if(val.additionalFeeDeductionMode==4){
                  val.additionalFeeDeductionMode=this.$t('m.open.additionmethodlabel5');
                }else if(val.additionalFeeDeductionMode==5){
                  val.additionalFeeDeductionMode=this.$t('m.open.additionmethodlabel6');
                }else if(val.additionalFeeDeductionMode==6){
                  val.additionalFeeDeductionMode=this.$t('m.open.additionmethodlabel7');
                }
              });
              return h(myexpand, {
                props: {
                  row: params.row.additionalFeeDetails
                }
              })
            }
          },
          {
            title: this.$t('m.open.addifeetabletitle1'),
            key: 'additionalFeeSchemeCode'
          },
          {
            title: this.$t('m.open.addifeetabletitle2'),
            key: 'additionalFeeSchemeName'
          },
          {
            title: this.$t('m.open.addifeetabletitle3'),
            key: 'createDate'
          },
        ],
        //附加费数据
        addifeedata: [],
        //附加费详情
        right1:true,
        right2:true,
        right3:true,
        right4:true,
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
        //省市联动
        district: [],
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
        openruleValidate:{
          customertypecode:[ { required: true, message: this.$t('m.validation.custype'), trigger: 'change' }],
          name:[{ required: true, message:this.$t('m.validation.name'), trigger: 'blur' }],
          idcard:[{ required: true, message: this.$t('m.validation.idcard'), trigger: 'blur' }],

          tel:[{
             type:'string',trigger: 'blur,change', pattern:/^[0-9]+$/,message:this.$t('m.validation.tel'),
          }],
          districtvalue:[{ required: true, message: this.$t('m.validation.district')}],
          meterno:[{ required: true, message: this.$t('m.validation.meter'), trigger: 'blur' }],
          // addition:[{ required: true, message: '不能为空', trigger: 'blur' }]
        },
        invoicelist: [
          {
            title: 'Description',
            key: 'description'
          },
          {
            title: 'Payment',
            key: 'payment'
          },
        ],
        invoicedata:{}
      }
    },
    methods: {
      //下一步
      next (customertypecode) {
        this.$refs[customertypecode].validate((valid) => {
          if(valid){
            this.prevable = false;
            if(this.enableAdditionalFee==0&&this.enableDebt==0){
              if(this.current ==1){
                this.xiayibu=this.$t("m.open.finish");
              }
              if (this.current ==2) {
                this.current = 2;
                this.nextloading=true;
                this.$http({
                  url:'biz/customer/openAccount.do',
                  body: {
                    'customerTypeCode':this.formValidateopen.customertypecode,
                    'customerName':this.formValidateopen.name,
                    'identityCode':this.formValidateopen.idcard,
                    'villageCode':this.formValidateopen.districtvalue[3],
                    'telephone':this.formValidateopen.tel,
                    'physicalAddress':this.formValidateopen.address,
                    'meter':{
                      'meterNumber':this.formValidateopen.meterno,
                    },
                  },
                  credentials:true,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                }).then((response) => {
                  this.invoicedata=response.body.tradeRecord;
                  if(response.body.msg){
                    this.opensuccess=true;
                    this.nextloading=false;
                    this.kaihufapiao=true;
                  }else{
                    this.$Message.error(response.body.errors);
                  }
                })
              } else {
                this.current += 1;
              }
            }else if(this.enableAdditionalFee==1&&this.enableDebt==0){
              if(this.current ==2){
                this.xiayibu=this.$t("m.open.finish");
              }
              if (this.current ==3) {
                this.current = 3;
                this.nextloading=true;
                this.$http({
                  url:'biz/customer/openAccount.do',
                  body: {
                    'customerTypeCode':this.formValidateopen.customertypecode,
                    'customerName':this.formValidateopen.name,
                    'identityCode':this.formValidateopen.idcard,
                    'villageCode':this.formValidateopen.districtvalue[3],
                    'telephone':this.formValidateopen.tel,
                    'physicalAddress':this.formValidateopen.address,
                    'meter':{
                      'meterNumber':this.formValidateopen.meterno,
                    },
                    'additionalFeeSchemeCodes':this.xitongaddifee,
                    'additionalFees':this.additionalFees,
                  },
                  credentials:true,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                }).then((response) => {
                  this.invoicedata=response.body.tradeRecord;
                  if(response.body.msg){
                    this.opensuccess=true;
                    this.nextloading=false;
                    this.kaihufapiao=true;
                  }else{
                    this.$Message.error(response.body.errors);
                  }
                })
              } else {
                this.current += 1;
              }
            }else if(this.enableAdditionalFee==0&&this.enableDebt==1){
              if(this.current ==2){
                this.xiayibu=this.$t("m.open.finish");
              }
              if (this.current ==3) {
                this.current = 3;
                this.nextloading=true;
                this.$http({
                  url:'biz/customer/openAccount.do',
                  body: {
                    'customerTypeCode':this.formValidateopen.customertypecode,
                    'customerName':this.formValidateopen.name,
                    'identityCode':this.formValidateopen.idcard,
                    'villageCode':this.formValidateopen.districtvalue[3],
                    'telephone':this.formValidateopen.tel,
                    'physicalAddress':this.formValidateopen.address,
                    'meter':{
                      'meterNumber':this.formValidateopen.meterno,
                    },
                    'debt':{
                      'originalDebt':this.formValidateopen.debt,
                    }
                  },
                  credentials:true,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                }).then((response) => {
                  this.invoicedata=response.body.tradeRecord;
                  if(response.body.msg){
                    this.opensuccess=true;
                    this.nextloading=false;
                    this.kaihufapiao=true;
                  }else{
                    this.$Message.error(response.body.errors);
                  }
                })
              } else {
                this.current += 1;
              }
            }else{
              if(this.current ==3){
                this.xiayibu=this.$t("m.open.finish");
              }
              if (this.current ==4) {
                this.current = 4;
                this.nextloading=true;
                this.$http({
                  url:'biz/customer/openAccount.do',
                  body: {
                    'customerTypeCode':this.formValidateopen.customertypecode,
                    'customerName':this.formValidateopen.name,
                    'identityCode':this.formValidateopen.idcard,
                    'villageCode':this.formValidateopen.districtvalue[3],
                    'telephone':this.formValidateopen.tel,
                    'physicalAddress':this.formValidateopen.address,
                    'meter':{
                      'meterNumber':this.formValidateopen.meterno,
                    },
                    'additionalFeeSchemeCodes':this.xitongaddifee,
                    'additionalFees':this.additionalFees,
                    'debt':{
                      'originalDebt':this.formValidateopen.debt,
                    }
                  },
                  credentials:true,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                }).then((response) => {
                  console.log(response.body);
                  this.invoicedata=response.body.tradeRecord;
                  this.incusdata=response.body.customerInfo;
                  if(response.body.msg){
                    this.opensuccess=true;
                    this.nextloading=false;
                    this.kaihufapiao=true;
                  }else{
                    this.$Message.error(response.body.errors);
                  }
                })
              } else {
                this.current += 1;
              }
            }
          }
        });
      },
      //上一步
      prev(customertypecode){
        if (this.current == 0) {
          this.current = 0;
          this.prevable = true;
          this.xiayibu=this.$t("m.open.next")
        } else {
          this.current -= 1;
          this.prevable = false;
          this.xiayibu=this.$t("m.open.next")
        }
      },
      //启用附加费开关
      addichange (status) {
        this.additionalfee=status;
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
      },
      ok () {
        this.formValidateopen.meterno=this.zhongjian;
      },
      cancel () {
        this.formValidateopen.meterno="";
      },
      deletezi(index){
        this.additionalFees.splice(index,1)
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
      openqueding(){
        this.opensuccess=false;
        this.current=0;
        this.formValidateopen.customertypecode='';
        this.formValidateopen.name='';
        this.formValidateopen.idcard='';
        this.formValidateopen.tel='';
        this.formValidateopen.districtvalue=[];
        this.formValidateopen.address='';
        this.formValidateopen.debt=0;
        this.formValidateopen.meterno="";
        this.xiayibu=this.$t("m.open.next");
        this.nextloading=false;
        this.myprint()
      },
      addifeeok () {
        this.additionalFees.push(
          {
            additionalFeeDeductionAmount:this.additionalFeeDeductionAmount,
            itemName:this.additionname,
            additionalFeeDeductionTimes:this.additionalFeeDeductionTimes,
            additionalFeeStartDate:this.additionalFeeStartDate,
            additionalFeeVat:this.additionalFeeVat,
            additionalFeeDeductionRate:this.additionalFeeDeductionRate,
            additionalFeeDeductionMode:this.additionmethod,
            additionalFeeType:this.additiontype
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
      meternoview (data){
        this.zhongjian=data.meterNumber;
      },
      //查询表号
      querymeter(){
        this.querycondition='';
        this.loading=true;
        this.selmeter=true;
        this.query1 = true;
        this.$http({
          url:'biz/meterStock/findByPage.do',
          body: {conditions:{
            customerTypeCode:this.formValidateopen.customertypecode,
          },"limit": 8,
            "page": 1},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if(response.body.errors){

          }else{
            this.metertotal=parseInt(response.body.pageInfo.total);
            this.meterdata=response.body.pageInfo.list;
            this.loading=false;
          }
        });
      },
      changePage(page){
        this.loading=true;
        this.selmeter=true;
        this.$http({
          url:'biz/meterStock/findByPage.do',
          body: {
            conditions:{
              meterNum:this.querycondition,
              customerTypeCode:this.formValidateopen.customertypecode,
            },
            "limit": 8,
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
          body: {
            conditions: {
              meterNum:this.querycondition,
              customerTypeCode:this.formValidateopen.customertypecode,
            },
            "limit": 8,
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
      xitongaddi(data){
        let www=[];
        data.forEach((val,index)=> {
          www.push(val.additionalFeeSchemeCode)
        });
        this.xitongaddifee=www;
      },
      myprint(){
        this.$http({
          url: 'sysConfig/findAll.do',
          body: {conditions: {}},
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          if (response.body.list[16].state == 4) {
            if (response.body.list[21]) {
              if (response.body.list[21].state == 1) {
                try
                {
                  this.opensmallprint()
                }
                catch(err)
                {
                  this.install=true;
                }
              } else if (response.body.list[21].state == 0) {
                try
                {
                  this.openprint()
                }
                catch(err)
                {
                  this.install=true;
                }
              }
            }
          } else {
            console.log('普通打印')
          }
        });
      },
      opensmallprint(){
        var strBodyStyle=`
        <style>
        *{
           font-family:Arial, sans-serif;
           list-style: none;
           font-size:12px;
           color:#333;
           margin:0;
           padding:0
          }
          .openmain{
            width:100%;
            margin-top: 10px;
          }
          .header{
            width:96%;
          }
          .dotted{
            border-top:1px solid #333;
            margin-left:8px;
            height:10px;
          }
          .dotted2{
            margin-left:8px;
            height:14px;
            border-bottom:1px solid #333;
          }
          .header img{
            width:100%;
            margin-left:5px;
          }
          h3{
            text-align: center;
            line-height: 20px;
          }
          .fbox{
            width:96%;
            margin:0 auto;
            border-top:1px solid #333;
            padding:6px 0;
          }
          .fbox ul li{
            line-height: 20px;
          }
          .fbox ul li span:nth-child(1){
            display: inline-block;
            color:#666;
            word-break:break-word;
          }
          .customer ul li span:nth-child(1){
            width: 70px;
          }
          .payment ul li span:nth-child(1){
            width: 120px;
          }
          table tr{
            line-height: 20px;
          }
          table tr td{
            width:30%
          }
          table tr td:nth-child(1){
            width:40%
          }
        </style>
        `;
        var strFormHtml=strBodyStyle+document.getElementById("smallopenfipag").innerHTML;
        // let height=(document.getElementById("smallopenfipag").scrollHeight)+200+'px';
        if (LODOP.webskt && LODOP.webskt.readyState == 1) {
          console.log("开始打印！！");
          LODOP.SET_LICENSES("杭州莱宸科技有限公司","EFED48C79DE17EC067709F911F9D586B","杭州萊宸科技有限公司","7DD751CF10DF2807E53FB9377847906F");
          LODOP.SET_LICENSES("THIRD LICENSE","","Hangzhou Laison Technology Co. Ltd. ,","B7CA5D05E72C78847BE2534C5D93A1CE");
          LODOP.PRINT_INIT('aaa');
          let index=localStorage.getItem('receipt');
          let size=localStorage.getItem('size');
          if(size=='80mm'){
            size=1000;
          }else if(size=='58mm'){
            size=480
          }
          LODOP.SET_PRINT_PAGESIZE(1, size, 1400,"");
          LODOP.ADD_PRINT_HTM(20, 0, '100%', '100%', strFormHtml);
          LODOP.SET_PRINTER_INDEXA(index);
          LODOP.PREVIEW();//预览
          // LODOP.PRINT();//打印
        }
      },
      openprint() {
        var strBodyStyle=`
        <style>
        *{
            font-family: Arial, sans-serif;
        }
         .incontent{
            width:96%;
            margin:0 auto;
          }
          .incontent .list{
            width:100%;
          }
          .topinvoicehead{
            overflow: hidden;
            border-bottom:1px solid #ccc;
          }
          .invoicehead{
            float: right;
          }
          .incontent h3{
            text-align: center;
            line-height: 50px;
            /*border-bottom:1px solid #ccc;*/
          }
          .invoicecontent p{
            height:24px;
            line-height: 24px;
          }
          .left-invoice{
            list-style: none;
            margin-top: 10px;
            width:40%;
            float:left;
          }
          .left-invoice li{
            list-style: none;
            height:50px;
          }
          .left-invoice li span:first-child{
            display: block;
            color:#888;
          }
          .invoicetable{
            margin:15px 0;
            padding:0 30px;
            width:100%;
            line-height: 30px;
            border-top:1px solid #ccc;
            border-bottom:1px solid #ccc;
          }
          .invoicetable th{
             text-align: left;
          }
          .total{
            float: right;
          }
        </style>
        `;
        var strFormHtml=strBodyStyle+"<body>"+document.getElementById("print.vue").innerHTML+"</body>";
          console.log("开始打印！！");
          LODOP.SET_LICENSES("杭州莱宸科技有限公司","EFED48C79DE17EC067709F911F9D586B","杭州萊宸科技有限公司","7DD751CF10DF2807E53FB9377847906F");
          LODOP.SET_LICENSES("THIRD LICENSE","","Hangzhou Laison Technology Co. Ltd. ,","B7CA5D05E72C78847BE2534C5D93A1CE");
          LODOP.PRINT_INIT("");
          LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4");
          LODOP.ADD_PRINT_HTM(20, 20, 720,'100%',strFormHtml);
          let index=localStorage.getItem('invoice');
          LODOP.SET_PRINTER_INDEXA(index);
          LODOP.PREVIEW();//预览
              // LODOP.PRINT();// 直接打印
      },
    },
    mounted(){
      if (this.current == 0) {
        this.prevable = true;
      }
    },
    created(){
      //获取系统配置
      this.$http({
        url:'sysConfig/findAll.do',
        body: {conditions: {}},
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        response.body.list.forEach((val,index)=> {
          if(val.name=='calculateFeeMode'){
            if(val.state===4){
              this.nofipag=false;
            }
          }
          if(val.name=='enableDebt'){
            if(val.state===0){
              this.enableDebt=0;
            }
          }else if(val.name=='enableAdditionalFee'){
            if(val.state===0){
              this.enableAdditionalFee=0;
            }
          };
        })
      });
      //查客户类型
      this.$http({
        url:'sys/customerType/findAll.do',
        body: {conditions: {}},
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        this.customerType=response.body.list;
      });
      //查站点
      this.$http({
        url:'sys/company/findCompany.do',
        body: {},
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        let gongsi=response.body.companys;
        for(let i=0;i<gongsi.length;i++){
          let zhandian=gongsi[i].stations;
          this.stationdata.push(
            {
              value:gongsi[i].companyCode,
              label:gongsi[i].companyName,
              children: []
            },
          );
          for(let j=0;j<zhandian.length;j++){
            this.stationdata[i].children.push({
              value:zhandian[j].stationCode,
              label:zhandian[j].stationName,
              children: []
            });
          }
        }
      })
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
          this.district.push(
            {
              value:diqu[i].regionCode,
              label:diqu[i].regionName,
              children: []
            },
          );
          for(let j=0;j<shiqu.length;j++){
            let xianqu=shiqu[j].childRegions;
            this.district[i].children.push({
              value:shiqu[j].regionCode,
              label:shiqu[j].regionName,
              children: []
            });
            for(let k=0;k<xianqu.length;k++){
              let cun=xianqu[k].childRegions;
              this.district[i].children[j].children.push({
                value:xianqu[k].regionCode,
                label:xianqu[k].regionName,
                children: []
              });
              for(let m=0;m<cun.length;m++){
                this.district[i].children[j].children[k].children.push({
                  value:cun[m].regionCode,
                  label:cun[m].regionName,
                  children: []
                })
              }
            }
          }
        }
      })
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
        this.addifeedata=response.body.list;
      })
    }
  }
</script>
<style>
  .incontent{
    display: none;
  }
  .h-content .layout-breadcrumb{
    padding: 10px 15px 0;
    margin: -15px 0 10px;
  }
  .steps{
    height:80px;
    width:100%;
    background: #fff;
  }
  .h-content .ivu-steps{
    padding-top: 20px;
    padding-left:90px;
    padding-right:10px;
  }
  .center,.center3,.center4{
    width:300px;
    margin:0 auto;
    margin-top:30px;
  }
  .center p,.center3 p,.center4 p{
    height:40px;
    font-size: 14px;
    line-height: 40px;
  }
  .ivu-select{
    text-align: left;
  }
  .center1{
    width:30%;
    margin:0 auto;
    margin-top:30px;
  }
  .center2{
    width:80%;
    margin:0 auto;
    margin-top:30px;
  }
  .h-switch1 h3{
    line-height: 30px;
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
  .hyyDetail{
    line-height: 25px;
    margin-bottom: 15px;
  }
  .hyyDetail:last-child{
    margin-bottom: 0;
  }
  p.hyyword{
    line-height: 26px;
    padding-left: 2px;
  }
  .zidingyiaddi{
    border:1px solid #ccc;
    padding:20px 50px;
    position: relative;
  }
  .zidingyiaddi .positionedit{
    position: absolute;
    right:45px;
    top:50%;
    margin-top: -17px;
  }
</style>
