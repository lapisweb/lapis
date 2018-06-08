<template>
  <div>
    <Alert v-if="install" closable show-icon style="position:absolute;z-index:10000;width:50%;top:100px;left:50%;margin-left:-25%;text-align: center">
      {{ $t("m.common.install1")}} <a href="http://192.168.0.174/file/CLodop_Setup_for_Win32NT_3.029.exe">{{ $t("m.common.install2")}}</a> {{ $t("m.common.install3")}}
    </Alert>
    <div class="h-content">
      <div style="margin:10px 100px;">
        <Input clearable v-model="name" :placeholder="$t('m.customerinfo.label1')" style="width: 180px"></Input>
        <Input clearable v-model="idcard" :placeholder="$t('m.customerinfo.label2')" style="width: 180px"></Input>
        <Input clearable  v-model="tel" :placeholder="$t('m.customerinfo.label3')" style="width: 180px"></Input>
        <Button type="primary" icon="ios-search" @click="query">{{$t('m.common.query')}}</Button>
        <ul v-show="message" class="purmessage">
          <li>
            <Card :bordered="false">
              <h4 slot="title" style="line-height: 20px"><Icon type="person" color="#2D8CF0"></Icon> {{$t('m.main.customerinfo')}}</h4>
              <p>
                <span>{{$t('m.customerinfo.label1')}}:{{currentcustomer.name}}</span>
                <span>{{$t('m.customerinfo.label2')}}:{{currentcustomer.idcard}}</span>
                <span>{{$t('m.customerinfo.label3')}}:{{currentcustomer.tel}}</span>
              </p>
              <p>
                <span>{{$t('m.customerinfo.label6')}}:{{currentcustomer.customertype}}</span>
                <span>{{$t('m.customerinfo.label7')}}:{{currentcustomer.meterno}}</span>
                <span>{{$t('m.customerinfo.label5')}}:{{currentcustomer.address}}</span>
              </p>
            </Card>
          </li>
          <li>
            <Card :bordered="false">
            <h4 slot="title" style="line-height: 20px"><Icon type="bag" color="#2D8CF0"></Icon> {{$t('m.customerinfo.lastpurchase')}}</h4>
            <p v-if="traderecord!='{}'">
              <span>{{$t('m.customerinfo.lastdate')}}:{{traderecord.tradeDate}}</span>
              <span>{{$t('m.customerinfo.lastmoney')}}:{{traderecord.paymentAmount}}</span>
              <!--<span>{{$t('m.customerinfo.lastaddifee')}}:{{traderecord.standaloneVatAmount+traderecord.totalFee | random}}</span>-->
              <span>{{$t('m.purchase.other')}}:{{traderecord.standaloneVatAmount+traderecord.totalFee | random}}</span>
              <br>
              <span>{{$t('m.customerinfo.lastrealmoney')}}:{{traderecord.purchaseAmount}}</span>
              <span>{{$t('m.customerinfo.lastrealvolum')}}:{{traderecord.purchaseVolume}}</span>
              <span>{{$t('m.customerinfo.state')}}:{{traderecord.billState}}</span>
            </p>
            <p v-if="traderecord=='{}'">
              <span>{{$t('m.customerinfo.lastnone')}}</span>
            </p>
            </Card>
          </li>
        </ul>
        <div style="margin:10px 0" v-if="show">
          <Table highlight-row stripe :loading="loading" :columns="custominfo" :data="customerdata" @on-row-click="selected"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="customertotal" :current="1" @on-change="changePage" :show-total="true" :show-elevator="true"></Page>
            </div>
          </div>
        </div>
        <div style="margin:10px 0">
          <p style="line-height:30px;color:#888;">{{$t('m.purchase.purchase')}}($)/(m³)</p>
          <InputNumber v-model="pregoumai" style="width:220px" :max="100000" :min="0.1"></InputNumber>
          <RadioGroup v-model="paytype" style="margin-left: 15px;">
            <Radio :label="$t('m.purchase.amount')" ></Radio>
            <Radio :label="$t('m.purchase.volume')"></Radio>
          </RadioGroup>
        </div>
        <Button :disabled="noclick" type="success" @click="goumai">&nbsp; {{$t('m.purchase.purchase')}} &nbsp;</Button>
        <section v-if="token" style="margin:10px 0">
          <Card :bordered="false">
            <h4 slot="title" style="line-height: 20px;"><Icon type="flag" color="#2D8CF0"></Icon> Token</h4>
            <div v-for="item in tokendata">
              <p style="line-height: 30px;font-size: 16px">{{item}}</p>
            </div>
          </Card>
        </section>
        <Modal
          :title="$t('m.purchase.purchase')"
          v-model="purchase"
          :styles="{top:'200px'}"
          @on-ok="confirm">
          <p>{{$t('m.customerinfo.lastmoney')}}: <span> {{prvepurchase.paymentAmount}} </span></p>
          <ul v-for="item in fujiadetail">
            <li>{{item.itemName}} : {{item.deductionAmount}}</li>
          </ul>
          <p>{{$t('m.customerinfo.lastrealmoney')}}: <span> {{prvepurchase.purchaseAmount}} </span></p>
          <p>{{$t('m.customerinfo.lastrealvolum')}}: <span> {{prvepurchase.purchaseVolume}}m³ </span></p>
        </Modal>
      </div>
    </div>
    <my-footer1></my-footer1>
    <section class="purinvoice" id="purprint" v-show="print">
      <div class="incontents">
        <h3>购买发票</h3>
        <p>发票编号: <span>2017111501</span></p>
        <p>创建日期: <span>2017/11/15</span> </p>
        <ul class="left-invoice">
          <li class="titles">
            <p>客户信息</p>
          </li>
          <li>
            <span>Name:</span> <span>姓名</span>
          </li>
          <li>
            <span>电话:</span><span>电话</span>
          </li>
          <li>
            <span>身份证:</span><span>身份证</span>
          </li>
          <li>
            <span>Description</span> <span> </span>
          </li>
          <li>
            <span>Charge volume:</span><span>ssss</span>
          </li>
          <li>
            <span>Original debt:</span><span>sss</span>
          </li>
          <li>
            <span>Debt payment:</span><span>sss</span>
          </li>
          <li>
            <span>Remaining debt:</span><span>sss</span>
          </li>
          <li>
            <span>Additional fee:</span> <span>sss</span>
          </li>
          <li>
            <span>Current purchase date:</span><span>sss</span>
          </li>
          <li>
            <span>Last purchase date:</span><span>sss</span>
          </li>
          <li>
            <span>Days from last purchase date:</span> <span>sss</span>
          </li>
          <li>
            <span>All buy:</span><span>sss</span>
          </li>
          <li>
            <span>All consumption:</span> <span>sss</span>
          </li>
        </ul>
        <div class="total">
          <p>操作员: <span>11</span></p>
        </div>
      </div>
    </section>
    <section>
      <div class="incontent" id="openprint" v-show="fiprint" v-if="smallmessage">
        <div style="overflow: hidden">
          <div style="height:100px;float: left">
            <img style="height: 65px;" src="../assets/img/fipag.jpg" alt="">
            <p style="text-align: center;margin-top: 5px">Nampula</p>
          </div>
          <div class="invoicehead">
            <p>Av. Eduardo Mondlane, N.46, R/C.</p>
            <p>Telf. +258 26215260</p>
            <p>Email: Fipag.nampula@co.mz</p>
          </div>
        </div>

        <div class="list">
          <ul class="left-invoice">
            <li>
              <span>Nome:</span> <span>{{invoicecusdata.customerName}}</span>
            </li>
            <li>
              <span>Numero de cliente:</span> <span>{{invoicecusdata.meter.meterNumber}}</span>
            </li>
            <li>
              <span>Endereco:</span> <span>{{invoicecusdata.physicalAddress}}</span>
            </li>
            <li>
              <span>Telefone:</span> <span>{{invoicecusdata.telephone}}</span>
            </li>
            <li>
              <span>Nuit</span> <span></span>
            </li>
            <li>
              <span>Codigo de Barra</span> <span></span>
            </li>
          </ul>
          <ul class="left-invoice">
            <li>
              <span>Tipo de Cliente:</span> <span>{{invoicecusdata.customerType.customerTypeName}}</span>
            </li>
            <li>
              <span>Tipo de contador:</span> <span>{{invoicecusdata.telephone}}</span>
            </li>
            <li>
              <span>Numero de contador:</span> <span>{{invoicecusdata.customerType.meterType.meterTypeName}}</span>
            </li>
            <li>
              <span>Numero de factura:</span> <span>{{invoicepurdata.invoiceNumber}}</span>
            </li>
            <li>
              <span>Data de Emissao:</span> <span>{{currentTime}}}</span>
            </li>
          </ul>
        </div>
        <div class="list">
          <table class="invoicetable" cellspacing="0" cellpadding="0">
            <tr>
              <th v-for="item in fipaginvoicelist">{{item.title}}</th>
            </tr>
            <tr v-for="item in fipaginvoicedata">
              <td>{{item.itemName}}</td>
              <td>{{item.additionalFeeDeductionRate}}</td>
              <td>{{item.additionalFeeDeductionAmount}}</td>
              <td>{{item.deductionAmount}}</td>
            </tr>
          </table>
        </div>
        <div class="list">
          <ul class="summary">
            <li>
              <span>Total sem Iva</span> <span>{{invoicepurdata.purchaseAmount+invoicepurdata.pureFeeAmount | random}}</span>
            </li>
            <li>
              <span>Iva</span> <span>{{invoicepurdata.standaloneVatAmount}}</span>
            </li>
            <li>
              <span>Total da factura</span> <span>{{invoicepurdata.purchaseAmount+invoicepurdata.pureFeeAmount+invoicepurdata.standaloneVatAmount | random}}</span>
            </li>
            <li>
              <span>Pagamento da divida</span> <span>{{invoicepurdata.repayment}}</span>
            </li>
            <li>
              <span>Total pago</span> <span>{{invoicepurdata.paymentAmount}}</span>
            </li>
          </ul>
        </div>
        <div class="list">
          <p style="text-align: center">Codigo da Recarga</p>
          <div style="width:100%;height:1px;background: #ccc;margin-top: 6px;"></div>
          <div v-for="item in tokendata" style="text-align: center">
            <p style="line-height: 35px;font-size: 18px;">{{ item | tokenjiange}}</p>
          </div>
        </div>
        <div class="list">
          <p>Contactos: <span>admin</span></p>
        </div>
      </div>
    </section>

    <div class="main" id="smallfipag" v-show="fiprint" v-if="smallmessage">
      <div class="header">
        <p class="dotted"></p>
        <img src="../assets/img/fipag.jpg" alt="">
        <p class="dotted2"></p>
      </div>
      <div class="f-title">
        <p style="font-size: 18px;text-align: center;line-height: 28px;">Purchase</p>
        <p style="text-align: center;margin-bottom: 10px;">{{invoicepurdata.name}}</p>
        <p style="text-align: center;line-height: 18px;">RECEIPT NO. <span>{{invoicepurdata.invoiceNumber}}</span></p>
        <p style="text-align: center;line-height: 18px;margin-bottom: 8px;">{{currentTime}}</p>
        <p style="text-align: center;line-height: 18px;">TOKEN CODE:</p>
        <div v-for="item in tokendata" style="text-align: center">
          <p style="line-height:20px;font-size: 12px;">{{ item | tokenjiange}}</p>
        </div>
      </div>
      <div class="customer fbox">
        <h3>CUSTOMER INFORMATION</h3>
        <ul>
          <li><span>name :</span> <span>{{invoicecusdata.customerName}}</span></li>
          <li><span>Meter No. :</span> <span>{{invoicecusdata.customerName}}</span></li>
          <li><span>Id No. :</span> <span>{{invoicecusdata.identityCode}}</span></li>
          <li><span>Telephone :</span> <span>{{invoicecusdata.telephone}}</span></li>
          <li><span>Address :</span> <span>{{invoicecusdata.physicalAddress}}</span></li>
        </ul>
      </div>
      <div class="payment fbox">
        <h3>PAYMENTS DETEIL</h3>
        <ul>
          <li><span>Amount paid :</span> <span>{{invoicepurdata.paymentAmount}}</span></li>
          <li><span>VAT :</span> <span>MT{{invoicepurdata.standaloneVatAmount}}</span></li>
          <li><p style="line-height: 26px;">Additional fee detail</p></li>
          <ul v-for="item in fipaginvoicedata1">
            <li><span>{{item.itemName}}</span> <span>MT{{item.deductionAmount}}</span></li>
          </ul>
          <li style="margin-top: 6px;"><span>Debt repayment :</span> <span>{{invoicepurdata.repayment}}</span></li>
          <li><span>Remaining debt :</span> <span>{{invoicecusdata.debt.currentDebt}}</span></li>
        </ul>
      </div>
      <div class="fbox">
        <h3>CONSUMPTION DETAILS</h3>
        <p style="line-height: 24px;">Payment detail</p>
        <table>
          <tr v-for="item in fipaginvoicedata2">
            <td>{{item.itemName}}</td>
            <td>{{item.additionalFeeDeductionRate}}m³</td>
            <td>MTN{{item.deductionAmount}}</td>
          </tr>
        </table>
        <ul>
          <li><span>Invoice volume :</span> <span>{{invoicepurdata.purchaseVolume}}m³</span></li>
          <li><span>Total water value :</span> <span>MT{{invoicepurdata.purchaseAmount}}</span></li>
        </ul>
      </div>
      <div class="fbox">
        <p style="text-align: center;line-height: 24px">Processed Buy : <span>{{invoicepurdata.loginName}}</span></p>
        <P style="text-align: center;line-height: 24px">OPERATIONAL AREA(AO) BEIRA SHOP #03</P>
      </div>
      <p class="dotted"></p>
    </div>
  </div>
</template>
<script>
  export default {
    name:'purchase',
    data() {
      return {
        //数据定义
        install:false,
        name: "",
        idcard: "",
        tel: "",
        purchase:false,
        pregoumai: 0,
        currentcustomer:{},
        show: false,
        message: false,
        token: "",
        tokendata:"",
        modal:false,
        customertotal:0,
        prvepurchase:{},
        fujiadetail:[],
        traderecord:{},
        loading:false,
        noclick:true,
        paytype:this.$t('m.purchase.amount'),
        print:false,
        fiprint:false,
        invoicecusdata:{},
        invoicepurdata:{},
        invmessage:false,
        smallmessage:false,
        currentTime:'',

        //用户信息列表
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
        customerdata: [],
        columns1: [
          {
            title: '名称',
            key: 'name',
            width:70,
            textAlign:'left'
          },
          {
            title: '数量',
            key: 'count'
          },
          {
            title: '单价',
            key: 'price'
          },
          {
            title: '总额',
            key: 'total'
          }
        ],
        data1: [
          {
            name: '最低消费',
            count: 1,
            price: '15.88',
            total: '100'
          },
          {
            name: '最低消费',
            count: 1,
            price: '15.88',
            total: '100'
          },
          {
            name: '最低消费',
            count: 1,
            price: '15.88',
            total: '100'
          },
          {
            name: '最低消费',
            count: 1,
            price: '15.88',
            total: '100'
          },
        ],
        invoicelist: [
          {
            title: 'Total payment',
            key: 'volume'
          },
          {
            title: 'Recharge volume',
            key: 'volume'
          },
          {
            title: 'Recharge credit',
            key: 'money'
          },
          {
            title: 'Debt payment',
            key: 'debt'
          },
        ],
        invoicelist1: [
          {
            title: 'Fee Name',
            key: 'addifeename'
          },
          {
            title: 'Fee Type',
            key: 'addifeetype'
          },
          {
            title: 'Deduction',
            key: 'addifeemoney'
          },
        ],
        invoicelist2: [
          {
            title: 'Step',
            key: 'step'
          },
          {
            title: 'Start Quantity',
            key: 'startvolume'
          },
          {
            title: 'Price',
            key: 'price'
          },
        ],
        purinvoicedata: [
          {
            date: '2018-03-15 16:11:46',
            volume: '100m³',
            money: '$60',
            debt:'$10',
          },
        ],
        purinvoicedata1: [
          {
            addifeename: 'Meter price',
            addifeetype: 'Additional fee',
            addifeemoney: '$300',
          },
          {
            addifeename: 'Debt',
            addifeetype: 'Debt payment',
            addifeemoney: '$36.64',
          },
        ],
        purinvoicedata2: [
          {
            step: 1,
            startvolume: 0,
            price: '$1.00',
          },
          {
            step: 2,
            startvolume: 10,
            price: '$3.00',
          },
          {
            step: 3,
            startvolume: 20,
            price: '$4.00',
          },
          {
            step: 4,
            startvolume: 30,
            price: '$5.00',
          },
        ],
        fipaginvoicelist:[
          {
            title: 'Descricao',
            key: 'itemName'
          },
          {
            title: 'Quantidade',
            key: 'additionalFeeDeductionRate'
          },
          {
            title: 'Preco(mt/m³)',
            key: 'additionalFeeDeductionAmount'
          },
          {
            title: 'Preco Total(mt)',
            key: 'deductionAmount'
          },
        ],
        fipaginvoicedata:[],
        fipaginvoicedata1:[],
        fipaginvoicedata2:[],
      }
    },
    filters:{"tokenjiange":function(data){
      return data.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
      },"random":function(data){
      return Math.round(data * 100) / 100;
      },
    },
    methods: {
      getLocalTime(nS) {
        return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17)
      },
      query: function () {
        this.tokendata = '';
        this.message = false;
        this.loading = true;
        this.show = true;
        this.customerdata = [];
        this.showmanagement = true;
        this.$http({
          url: 'biz/customer/findByPage.do',
          body: {
            "conditions": {
              name: this.name,
              identityCode: this.idcard,
              telephone: this.tel,
              orderByClause: "open_date desc",
            },
            "limit": 10,
            "page": 1
          },
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          this.customertotal = parseInt(response.body.pageInfo.total);
          response.body.pageInfo.list.forEach((val, index) => {
            if (val.debt && val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  debt: val.debt.currentDebt,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                  additionalFees: val.additionalFees,
                },
              )
            } else if (!val.debt && val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                },
              )
            } else if (val.debt && !val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                  debt: val.debt.currentDebt,
                },
              )
            } else if (!val.debt && !val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                },
              )
            }
          });
          this.loading = false;
        })
      },
      changePage(page) {
        this.customerdata = [];
        this.$http({
          url: 'biz/customer/findByPage.do',
          body: {
            "conditions": {
              name: this.customername,
              identityCode: this.idcard,
              telephone: this.tel,
              orderByClause: "open_date desc",
            },
            "limit": 10,
            "page": page
          },
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

        }).then((response) => {
          response.body.pageInfo.list.forEach((val, index) => {
            if (val.debt && val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  debt: val.debt.currentDebt,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                  additionalFees: val.additionalFees,
                },
              )
            } else if (!val.debt && val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                  additionalFees: val.additionalFees,
                },
              )
            } else if (val.debt && !val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                  debt: val.debt.currentDebt,
                },
              )
            } else if (!val.debt && !val.additionalFees) {
              this.customerdata.push(
                {
                  customerid: val.customerId,
                  customerno: val.customerNumber,
                  name: val.customerName,
                  idcard: val.identityCode,
                  tel: val.telephone,
                  opendate: val.openDate,
                  customertype: val.customerType.customerTypeName,
                  meterno: val.meter.meterNumber,
                  address: val.physicalAddress,
                  status: val.state,
                  cuncode: val.villageCode,
                  zhencode: val.townCode,
                  shicode: val.cityCode,
                  shengcode: val.provinceCode,
                },
              )
            }
          });
        })
      },
      confirm() {
        let purchaseType;
        if (this.paytype == this.$t('m.purchase.amount')) {
          purchaseType = '1';
        } else if (this.paytype == this.$t('m.purchase.volume')) {
          purchaseType = '0';
        }
        let prepurchase = this.pregoumai.toString();
        this.$http({
          url: 'biz/trade/purchase.do',
          body: {
            customerId: this.currentcustomer.customerid,
            purchaseType: purchaseType,
            purchaseNumber: prepurchase,
          },
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.fipaginvoicedata1=[];
          this.fipaginvoicedata2=[];
          this.invmessage=true;
          this.smallmessage=true;
          this.invoicecusdata = response.body.customer;
          this.invoicepurdata = response.body.tradeRecord;
          this.invoicepurdata.feeRecords.forEach((val,index)=> {
            if(val.additionalFeeType!=2&&val.additionalFeeType!=1){
              this.fipaginvoicedata1.push(val);
              val.additionalFeeDeductionRate='';
              val.additionalFeeDeductionAmount='';
            }else{
              this.fipaginvoicedata2.push(val);
            }
          });
          this.fipaginvoicedata=this.invoicepurdata.feeRecords;


          this.tokendata = response.body.tradeRecord.token.replace(/(\d{4})/g, '$1 ').replace(/\s*$/, '').split(",");
          if (response.body.code == 0) {
            this.token = true;
            this.$Modal.success({
              title: 'Purchase',
              content: '<p>'+this.$t('m.common.tips')+'</p><p>' + this.$t('m.purchase.tip5') + '</p>',
              onOk: () => {
                this.printpur();
              },
            });
            this.pregoumai = 0;
            this.traderecord = response.body.tradeRecord;
          }
        });
      },
      selected(e) {
        this.message = true;
        this.show = false,
          this.currentcustomer = e;
        this.$http({
          url: 'biz/trade/findCusLastPur.do',
          body: {
            uid: this.currentcustomer.customerid,
          },
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          this.traderecord = response.body.tradeRecord;
        });
        this.noclick = false;
      },
      goumai() {
        let purchaseType;
        if (this.paytype == this.$t('m.purchase.amount')) {
          purchaseType = '1';
        } else if (this.paytype == this.$t('m.purchase.volume')) {
          purchaseType = '0';
        }
        let prepurchase = this.pregoumai.toString();
        this.$http({
          url: 'biz/trade/preCalc.do',
          body: {
            customerId: this.currentcustomer.customerid,
            purchaseType: purchaseType,
            purchaseNumber: prepurchase,
          },
          credentials: true,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          console.log(response.body);
          if (response.body.code == 502) {
            const content = '<p>' + this.$t('m.purchase.tip1') + '</p><p>' + this.$t('m.purchase.tip2') + ' ' + response.body.minAmount + '</p><p>' + this.$t('m.purchase.tip4') + ' ' + response.body.minVolume + ' m³</p>';
            this.$Modal.error({
              title: 'Notice',
              content: content
            });
          } else if (response.body.code == 503) {
            const content = '<p>' + this.$t('m.purchase.tip3') + '</p><p>' + this.$t('m.purchase.tip4') + ' ' + response.body.minVolume + ' m³</p>';
            this.$Modal.error({
              title: 'Notice',
              content: content
            });
          } else if (response.body.data) {
            this.prvepurchase = response.body.data.tradeRecord;
            this.fujiadetail=response.body.data.feeRecords;
            this.purchase = true;
          } else {
            this.$Message.error(response.body.errors);
          }
        });
      },
      printpur() {
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
                  this.fipagprint()
                }
                catch(err)
                {
                  this.install=true;
                }
              } else if (response.body.list[21].state == 0) {
                try
                {
                  this.fipagprintinvoice()
                }
                catch(err)
                {
                  this.install=true;
                }
              }
            }
          } else {
            console.log('普通打印')
            // if (response.body.list[21]) {
            //   if (response.body.list[21].state == 1) {
            //     try
            //     {
            //       this.mypurprint()
            //     }
            //     catch(err)
            //     {
            //       this.install=true;
            //     }
            //   } else if (response.body.list[21].state == 0) {
            //     try
            //     {
            //       this.mypurprint()
            //     }
            //     catch(err)
            //     {
            //       this.install=true;
            //     }
            //   }
            // }
          }
        });
      },
      fipagprintinvoice() {
        var strBodyStyle=`
        <style>
          *{
           font-family:Arial, sans-serif;
           list-style: none;
           font-size:14px;
           margin:0;
           padding:0
          }
          .list{
            width:96%;
            border:1px solid #ccc;
            padding: 10px;
            margin-top: 5px;
            overflow: hidden;
          }
          .topinvoicehead{
            overflow: hidden;
          }
          .invoicehead{
            float: right;
            margin-top: 20px;
          }
          .incontent h3{
            line-height: 50px;
          }
          .invoicecontent p{
            height:24px;
            line-height: 24px;
          }
          .left-invoice{
            margin-top: 10px;
            width:45%;
            float:left;
          }
          .left-invoice li{
            list-style: none;
            height:40px;
          }
          .left-invoice li span{
            line-height: 18px;
          }
          .left-invoice li span:first-child{
            display: block;
            color:#999;
          }
          .invoicetable{
            margin:5px 0;
            text-align:left;
            width:100%;
            line-height: 24px;
          }
          .invoicetable tr:nth-child(even){
            border-bottom:1px solid #ccc;
            background: #efefef;
          }
          .invoicetable th{
            line-height: 24px;
            text-align:left;
          }
          .invoicetable td{
            line-height: 24px;
          }
          .summary li span{
            line-height: 24px;
          }
          .summary li span:nth-child(2){
            display: inline-block;
            width: 210px;
            float: right;
          }
           .total{
           margin-top: 10px;
            float: right;
          }
        </style>
        `;
        var strFormHtml=strBodyStyle+document.getElementById("openprint").innerHTML;
        var height=document.querySelector("#openprint").offsetHeight;
        var width=document.querySelector("#openprint").offsetWidth;
        if (LODOP.webskt && LODOP.webskt.readyState == 1) {
          console.log("开始打印！！");
          LODOP.PRINT_INIT("购买");

          LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4");
          LODOP.ADD_PRINT_HTM(20, 20, 740, '100%',strFormHtml);
          var patt = /Samsung M262x 282x Series/i;//先由用户设置

          for (let j = 0, len = LODOP.Printers.list.length; j < len; j++) {
            if (patt.test(LODOP.Printers.list[j].name)) {
              console.log('预览');
              LODOP.SET_PRINTER_INDEXA(j);
              LODOP.PREVIEW();//预览

            }
          }
        }
      },
      fipagprint() {
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
          .main{
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
            width: 110px;
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
        var strFormHtml=strBodyStyle+document.getElementById("smallfipag").innerHTML;
        let height=(document.getElementById("smallfipag").scrollHeight)+200+'px';
        LODOP.SET_LICENSES("杭州莱宸科技有限公司","EFED48C79DE17EC067709F911F9D586B","杭州莱宸科技有限公司","7DD751CF10DF2807E53FB9377847906F");
        LODOP.SET_LICENSES("THIRD LICENSE","","Hangzhou Laison Technology Co. Ltd. ,","B7CA5D05E72C78847BE2534C5D93A1CE");
        if (LODOP.webskt && LODOP.webskt.readyState == 1) {
          console.log("开始打印！！");
          LODOP.PRINT_INIT('aaa');
          LODOP.SET_PRINT_PAGESIZE(1, 480, 2700,"");
          LODOP.ADD_PRINT_HTM(20, 0, '100%', '100%', strFormHtml);
          var patt = /POS104 Printer/i;//先由用户设置
          // var patt = /AiBao A-80USH/i;//先由用户设置
          // var patt = /Samsung M262x 282x Series/i;//先由用户设置
          for (let j = 0, len = LODOP.Printers.list.length; j < len; j++) {
            if (patt.test(LODOP.Printers.list[j].name)) {
              LODOP.SET_PRINTER_INDEXA(j);
              LODOP.PREVIEW();//预览
              // LODOP.PRINT();//打印

            }
          }
        }
      },
      mypurprint() {
//       this.SelectAsDefaultPrinter();
        var strBodyStyle = `
        <style>
          *{
           font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
           list-style: none;
           margin:0;
           padding:0
          }
          .list{
            width:98%;
            border:1px solid #ccc;
            padding: 10px;
            margin-top: 5px;
            overflow: hidden;
          }
          .topinvoicehead{
            overflow: hidden;
          }
          .invoicehead{
            float: right;
            margin-top: 20px;
          }
          .incontent h3{
            line-height: 50px;
          }
          .invoicecontent p{
            height:24px;
            line-height: 24px;
          }
          .left-invoice{
            margin-top: 10px;
            width:40%;
            float:left;
          }
          .left-invoice li{
            list-style: none;
            height:40px;

          }
          .left-invoice li span:first-child{
            display: block;
            color:#888;
          }
          .invoicetable{
            margin:15px 0;
            text-align:left;
            width:100%;
            line-height: 24px;
            border:1px solid #ccc;
            padding:5px;
          }
          .invoicetable tr:nth-child(even){
            border-bottom:1px solid #ccc;
            background: #efefef;
          }
          .invoicetable th{
            line-height: 35px;
            text-align:left;
          }
          .invoicetable td{
            line-height: 35px;
          }
           .total{
           margin-top: 10px;
            float: right;
          }
        </style>
        `;
        var strFormHtml = strBodyStyle + document.getElementById("invoiceprint").innerHTML;
        var height = document.querySelector("#invoiceprint").offsetHeight;
        var width = document.querySelector("#invoiceprint").offsetWidth;
        LODOP.SET_LICENSES("杭州莱宸科技有限公司","EFED48C79DE17EC067709F911F9D586B","杭州莱宸科技有限公司","7DD751CF10DF2807E53FB9377847906F");
        LODOP.SET_LICENSES("THIRD LICENSE","","Hangzhou Laison Technology Co. Ltd. ,","B7CA5D05E72C78847BE2534C5D93A1CE");
        if (LODOP.webskt && LODOP.webskt.readyState == 1) {
          console.log("开始打印！！");
          LODOP.PRINT_INIT(20, 20, 720, '100%', "");

//          if (LODOP.CVERSION) CLODOP.On_Return=function(TaskID,Value){alert(Value);};
//          var strResult=LODOP.SET_PRINT_MODE("WINDOW_DEFPRINTER",'\\\\192.168.0.5\\Samsung M262x 282x Series');

          LODOP.SET_PRINT_PAGESIZE(1, '100%', '100%', "A4");
          LODOP.ADD_PRINT_HTM(20, 20, 720, '100%', strFormHtml);
          LODOP.PREVIEW();//预览
      // LODOP.PRINT();// 直接打印
        }
      },
      getSelectedPrintIndex() {
        if (document.getElementById("Radio2").checked)
          return document.getElementById("PrinterList").value;
        else return -1;
      },
      SelectAsDefaultPrinter() {
        if (LODOP.CVERSION) {
          LODOP.On_Return = function (TaskID, Value) {
            if (Value >= 0) alert("选择成功!"); else alert("选择失败！");
          };
          LODOP.SELECT_PRINTER();
          return;
        }
        ;
        if (LODOP.SELECT_PRINTER() >= 0) {
          alert("选择成功!");
        } else {
          alert("选择失败！");
        }
      },
    },
    created(){
      let myDate=new Date();
      this.currentTime=myDate.toLocaleString();
    }
  }
</script>
<style>
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .purmessage{
    margin:10px 0;
  }
  .purmessage > li{
    line-height: 30px;
  }
  .purmessage > li:last-child{
    margin-top: 10px;
  }
  .purmessage > li span{
    padding-right:25px;
    font-size: 13px;
  }
  .move-left{
    width: 260px;
    position: fixed;
    top: 70px;
    left: 0;
    bottom: 0;
    z-index: 2;
    overflow-y: hidden;
    background: #EEEEEE;
    padding-top: 8px;
    border-right: 1px solid #d7dde4;
  }
  .move-left-in{
    padding:0 20px;
  }
  .move-left-in h3{
    color:#888;
    line-height:35px;
    border-bottom: 1px solid #ccc;
  }
  .fiterRight{
    position: relative;
    top: 84px;
    margin-left: 280px;
    margin-right: 30px;
  }
  #openprint .main{
    width:100%;
    margin-top: 10px;
  }
  #openprint .header{
    width:96%;
  }
  #openprint .dotted{
    border-top:1px dotted #333;
    margin-left:8px;
    height:10px;
  }
  #openprint .dotted2{
    margin-left:8px;
    height:14px;
    border-bottom:1px dotted #333;
  }
  #openprint .header img{
    height:60px;
    margin-left:5px;
  }
  #openprint h3{
    text-align: center;
    line-height: 20px;
  }
  #openprint .fbox{
    width:96%;
    margin:0 auto;
    border-top:1px dotted #333;
    padding:6px 0;
  }
  #openprint .fbox ul li{
    line-height: 20px;
  }
  #openprint .fbox ul li span:nth-child(1){
    display: inline-block;
    color:#666;
    word-break:break-word;
  }
  #openprint .customer ul li span:nth-child(1){
    width: 70px;
  }
  #openprint .payment ul li span:nth-child(1){
    width: 120px;
  }
  #openprint table tr{
    line-height: 20px;
  }
  #openprint table tr td{
    width:30%
  }
  #openprint table tr td:nth-child(1){
    width:40%
  }
</style>
