<template>
  <div>
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
            <Input v-model="formValidateopen.name"></Input>
          </FormItem>
          <FormItem :label="$t('m.customerinfo.label2')" prop="idcard">
            <Input v-model="formValidateopen.idcard"></Input>
          </FormItem>
          <FormItem :label="$t('m.customerinfo.label3')" prop="tel">
            <Input v-model="formValidateopen.tel"></Input>
          </FormItem>
          <FormItem :label="$t('m.open.label4')" prop="districtvalue">
            <Cascader :data="district"  v-model="formValidateopen.districtvalue"></Cascader>
          </FormItem>
          <FormItem :label="$t('m.customerinfo.label5')" prop="address">
            <Input v-model="formValidateopen.address"></Input>
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
              <Input v-model="querycondition" placeholder="Enter meterNo..." style="width: 200px"></Input>
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
            <Input size="large" v-model="formValidateopen.meterno"></Input>
          </FormItem>
        </div>
        <div v-if="enableAdditionalFee==1&&enableDebt==0">
          <div class="center2" v-if="current==3">
            <div style="display: none">
              <FormItem prop="addition">
                <Input v-model="formValidateopen.addition"></Input>
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
                    <Input v-model="additionname"  style="width: 200px"></Input>
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
                <Input v-model="formValidateopen.addition"></Input>
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
                    <p class="hyyword">{{ $t("m.open.vat") }}</p>
                    <InputNumber :disabled="right4" :max="100" v-model="additionalFeeVat" style="width: 185px"></InputNumber> %
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
                        <Button type="success" @click="editzi(key)"><i class="iconfont icon-75bianji"></i></Button>
                        <Button type="error" @click="deletezi(key)"><i class="iconfont icon-105"></i></Button>
                      </div>
                    </Row>
                  </div>
                </div>
              </div>
              <Modal
                title="Title"
                v-model="editfujiafei"
                :closable="false"
                @on-ok="editfeeok"
                @on-cancel="editfeecancel"
                :mask-closable="false">
                <div style="height: 240px;width:100%">
                  <div style="float: left;margin-right: 20px;">
                    <p class="hyyword">{{ $t("m.open.additionfeename") }}</p>
                    <Input v-model="cusaddifee1" placeholder="" style="width: 200px"></Input>
                    <p class="hyyword">{{ $t("m.open.additionfeetype") }}</p>
                    <Select clearable v-model="cusaddifee2" style="width:200px" @on-change="addifeetype">
                      <Option v-for="item in additiontypedata" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <p class="hyyword">{{ $t("m.open.additionfeemethod") }}</p>
                    <Select clearable v-model="cusaddifee3" style="width:200px" @on-change="addifeemethod">
                      <Option v-for="item in additionmethoddata" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <p class="hyyword">{{ $t("m.open.starttime") }}</p>
                    <DatePicker v-model="cusaddifee4" type="datetime" placeholder="Select date and time" style="width:200px;" @on-change="opendateedit"></DatePicker>
                  </div>
                  <div style="float: left">
                    <p class="hyyword">{{ $t("m.open.feetime") }}</p>
                    <InputNumber :disabled="right1"  v-model="cusaddifee5" style="width: 200px"></InputNumber>
                    <p class="hyyword">{{ $t("m.open.percent") }}</p>
                    <InputNumber :disabled="right2" :max="100" v-model="cusaddifee6" style="width: 185px"></InputNumber> %
                    <p class="hyyword">{{ $t("m.open.money") }}</p>
                    <InputNumber :disabled="right3"  v-model="cusaddifee7" style="width: 185px"></InputNumber> $
                    <p class="hyyword">{{ $t("m.open.vat") }}</p>
                    <InputNumber :disabled="right4" :max="100" v-model="cusaddifee8" style="width: 185px"></InputNumber> %
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          <div class="center3" v-if="current==4">
            <p>{{ $t("m.open.debt") }}</p>
            <FormItem prop="debt">
              <Input size="large" v-model="formValidateopen.debt"></Input>
            </FormItem>
          </div>
        </div>
        <div v-if="enableDebt==1&&enableAdditionalFee==0">
          <div class="center3" v-if="current==3">
            <p>{{ $t("m.open.debt") }}</p>
            <FormItem prop="debt">
              <Input size="large" v-model="formValidateopen.debt"></Input>
            </FormItem>
          </div>
        </div>
        <div style="margin:20px auto 120px;width: 300px;">
          <Button type="primary" :disabled="prevable" @click="prev('formValidateopen')">{{ $t("m.open.prev") }}</Button>
          <Button type="primary" @click="next('formValidateopen')">{{xiayibu}}</Button>
        </div>
      </Form>
      <div v-if="opensuccess">
        <Modal v-model="opensuccess" width="360">
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
    <div class="incontent" id="print">
      <h3>开户发票</h3>
      <div class="topinvoicehead">
        <div class="invoicehead">
          <p>发票编号: <span>2017111501</span></p>
          <p>创建日期: <span>2017/11/15</span> </p>
        </div>
      </div>
      <div class="list">
        <ul class="left-invoice">
          <li>
            <span>姓名:</span> <span>{{invoicedata.customerName}}</span>
          </li>
          <li>
            <span>电话号:</span><span>{{invoicedata.telephone}}</span>
          </li>
          <li>
            <span>身份证号:</span><span>{{invoicedata.identityCode}}</span>
          </li>
        </ul>
        <ul class="left-invoice">
          <li>
            <span>表号:</span> <span>{{formValidateopen.meterno}}</span>
          </li>
          <li>
            <span>客户类型</span><span>{{formValidateopen.customertypecode}}</span>
          </li>
        </ul>
      </div>
      <table class="invoicetable" cellspacing="0" cellpadding="0">
        <tr>
          <th v-for="item in invoicelist">{{item.title}}</th>
        </tr>
        <tr v-for="item in openinvoicedata">
          <td>{{item.description}}</td>
          <td>{{item.payment}}</td>
          <td>{{item.taxrate}}</td>
          <td>{{item.taxamount}}</td>
        </tr>
      </table>
      <div class="total">
        <p>total <span>$100</span></p>
        <p>操作员: <span>{{invoicedata.loginName}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../kits/common.js';
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
                  <span class="expand-value">{{item.additionalFeeDeductionRate}}</span>
              </Col>
              <Col span="8">
                  <span class="expand-key">{{ $t("m.open.money") }} </span>
                  <span class="expand-value">{{item.additionalFeeDeductionAmount}}</span>
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
        querycondition:'',

        addfujiafei:false,
        editfujiafei:false,
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
          {
            title: this.$t('m.open.addifeetabletitle4'),
            key: 'state'
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
            value: 1
          },
          {
            label: this.$t('m.open.additiontypelabel2'),
            value: 0
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
            key: 'customerTypeCode'
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
          addition:[{ required: true, message: '不能为空', trigger: 'blur' }]
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
          {
            title: 'Tax Rate',
            key: 'taxrate'
          },
          {
            title: 'Tax Amount',
            key: 'taxamount'
          }
        ],
        openinvoicedata: [
          {
            description: 'Open Account',
            payment: '$100',
            taxrate: 0,
            taxamount:0
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
              if (this.current ==2) {
                this.current = 2;
                this.xiayibu=this.$t("m.open.finish");
                this.$http({
                  url:common.apiLink+'/biz/customer/openAccount.do',
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
                  console.log(this.invoicedata)
                  console.log(response.body);
                  if(response.body.msg){
                    this.opensuccess=true;
    //              location.href="/#/index/invoice"
                  }else{
                    this.$Message.error(response.body.errors);
                  }
                })
              } else {
                this.xiayibu=this.$t("m.open.next");
                this.current += 1;
              }
            }else if(this.enableAdditionalFee==1&&this.enableDebt==0){
              if (this.current ==3) {
                this.current = 3;
                this.xiayibu=this.$t("m.open.finish");
                this.$http({
                  url:common.apiLink+'/biz/customer/openAccount.do',
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
                  console.log(response.body);
                  if(response.body.msg){
                    this.opensuccess=true;
    //              location.href="/#/index/invoice"
                  }else{
                    this.$Message.error(response.body.errors);
                  }
                })
              } else {
                this.xiayibu=this.$t("m.open.next");
                this.current += 1;
              }
            }else if(this.enableAdditionalFee==0&&this.enableDebt==1){
              if (this.current ==3) {
                this.current = 3;
                this.xiayibu=this.$t("m.open.finish");
                this.$http({
                  url:common.apiLink+'/biz/customer/openAccount.do',
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
                  console.log(response.body);
                  if(response.body.msg){
                    this.opensuccess=true;
    //              location.href="/#/index/invoice"
                  }else{
                    this.$Message.error(response.body.errors);
                  }
                })
              } else {
                this.xiayibu=this.$t("m.open.next");
                this.current += 1;
              }
            }else{
              if (this.current ==4) {
                this.current = 4;
                this.xiayibu=this.$t("m.open.finish");
                this.$http({
                  url:common.apiLink+'/biz/customer/openAccount.do',
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
                  this.invoicedata=response.body.tradeRecord;
                  console.log(response.body);
                  if(response.body.msg){
                    this.opensuccess=true;
    //              location.href="/#/index/invoice"
                  }else{
                    this.$Message.error(response.body.errors);
                  }
                })
              } else {
                this.xiayibu=this.$t("m.open.next");
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
      editzi(index){
        console.log(this.additionalFees,111);
        this.index=index;
        this.cusaddifee1=this.additionalFees[index].itemName;
        this.cusaddifee4=this.additionalFees[index].additionalFeeStartDate;
        this.cusaddifee2=parseInt(this.additionalFees[index].additionalFeeType);
        this.cusaddifee3=parseInt(this.additionalFees[index].additionalFeeDeductionMode);
        this.cusaddifee5=this.additionalFees[index].additionalFeeDeductionTimes;
        this.cusaddifee6=this.additionalFees[index].additionalFeeDeductionRate;
        this.cusaddifee7=this.additionalFees[index].additionalFeeDeductionAmount;
        this.cusaddifee8=this.additionalFees[index].additionalFeeVat;
        this.editfujiafei=true;
        console.log(this.additionalFees);
      },
      deletezi(index){
        this.additionalFees.splice(index,1)
      },
      editfeeok(){
        this.additionalFees[this.index].itemName=this.cusaddifee1;
        this.additionalFees[this.index].additionalFeeStartDate=this.additionalFeeStartDate;
        this.additionalFees[this.index].additionalFeeType=this.cusaddifee2;
        this.additionalFees[this.index].additionalFeeDeductionMode=this.cusaddifee3;
        this.additionalFees[this.index].additionalFeeDeductionTimes=this.cusaddifee5;
        this.additionalFees[this.index].additionalFeeDeductionRate=this.cusaddifee6;
        this.additionalFees[this.index].additionalFeeDeductionAmount=this.cusaddifee7;
        this.additionalFees[this.index].additionalFeeVat=this.cusaddifee8;
        console.log(this.additionalFees);
      },
      editfeecancel(){},
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
          url:common.apiLink+'/biz/meterStock/findByPage.do',
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
          url:common.apiLink+'/biz/meterStock/findByPage.do',
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
          url:common.apiLink+'/biz/meterStock/findByPage.do',
          body: {conditions: {meterNum:this.querycondition},"limit": 8,
            "page": 1},
          credentials:true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.metertotal=parseInt(response.body.pageInfo.total)
          this.meterdata=response.body.pageInfo.list;
        })
      },
      xitongaddi(data){
        let www=[];
        data.forEach((val,index)=> {
          www.push(val.additionalFeeSchemeCode)
        });
        console.log(www);
        this.xitongaddifee=www;
      },
      myprint() {
        var strBodyStyle=`
        <style>
        *{
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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
            text-align:center;
            width:100%;
            line-height: 24px;
            border-top:1px solid #ccc;
            border-bottom:1px solid #ccc;
          }
          .invoicetable tr:nth-child(even){
            border-bottom:1px solid #ccc;
            background: #efefef;
          }
          .invoicetable th{
            width:25%;
            line-height: 35px;
          }
          .invoicetable td{
            width:25%;
            line-height: 35px;
          }
          .total{
            float: right;
          }
        </style>
        `;
        var strFormHtml=strBodyStyle+"<body>"+document.getElementById("print").innerHTML+"</body>";
          console.log("开始打印！！");
          LODOP.PRINT_INIT("");
          LODOP.ADD_PRINT_HTM(20, 20, 720,'100%',strFormHtml);
          var patt = /Samsung M262x 282x Series/i;//先由用户设置
          for(var j = 0,len=LODOP.Printers.list.length; j < len; j++) {
            console.log(patt.test(LODOP.Printers.list[j].name));
            console.log(LODOP.Printers.list[j].name);
            if(patt.test(LODOP.Printers.list[j].name)){
              LODOP.SET_PRINTER_INDEXA(LODOP.Printers.list[j].name);
              console.log('预览');
              LODOP.PREVIEW();//预览
            }
          }
//          LODOP.PREVIEW();//预览
//        LODOP.PRINT();// 直接打印
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
        url:common.apiLink+'/sysConfig/findAll.do',
        body: {conditions: {}},
        credentials:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        response.body.list.forEach((val,index)=> {
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
        url:common.apiLink+'/sys/customerType/findAll.do',
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
        url:common.apiLink+'/sys/company/findCompany.do',
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
        url:common.apiLink+'/sys/region/findRegion.do',
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
        url:common.apiLink+'/sys/additionalFeeScheme/findAll.do',
        body:{conditions: {}},
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
