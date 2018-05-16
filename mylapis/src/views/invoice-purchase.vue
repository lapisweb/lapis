<template>
  <div>
    <Row>
      <Col offset="2" span="20" >
      <section class="invoicecontent">
        <div class="h-buttonbox not-print">
          <Button type="success" icon="printer" @click="printme()" class="h-button">打印</Button>
        </div>
        <div class="incontent" id="openprint">
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
                <span>Nome:</span> <span>Alisa</span>
              </li>
              <li>
                <span>Numero de cliente:</span> <span>18040000006</span>
              </li>
              <li>
                <span>Endereco:</span> <span>#525 xixilu xihuqu hangzhou zhejiang </span>
              </li>
              <li>
                <span>Telefone:</span> <span>18698652365</span>
              </li>
              <li>
                <span>Nuit:</span> <span></span>
              </li>
              <li>
                <span>Codigo de Barra:</span> <span></span>
              </li>
            </ul>
            <ul class="left-invoice">
              <li>
                <span>Tipo de Cliente:</span> <span>SoftwareSTS AMI Volume</span>
              </li>
              <li>
                <span>Tipo de contador:</span> <span>SoftwareSTS AMI Volume</span>
              </li>
              <li>
                <span>Numero de contador:</span> <span>0120180300085</span>
              </li>
              <li>
                <span>Numero de factura:</span> <span>000180300085</span>
              </li>
              <li>
                <span>Data de Emissao:</span> <span>2018/04/17 14:57:45</span>
              </li>
            </ul>
          </div>
          <div class="list">
            <table class="invoicetable" cellspacing="0" cellpadding="0">
              <tr>
                <th v-for="item in invoicelist">{{item.title}}</th>
              </tr>
              <tr v-for="item in openinvoicedata">
                <td>{{item.date}}</td>
                <td>{{item.volume}}</td>
                <td>{{item.money}}</td>
                <td>{{item.debt}}</td>
                <td>{{item.additionalfee}}</td>
              </tr>
            </table>
          </div>
          <div class="list">
            <ul class="summary">
              <li>
                <span>Total sem Iva</span> <span>18.04</span>
              </li>
              <li>
                <span>Iva</span> <span>30.53</span>
              </li>
              <li>
                <span>Total da factura</span> <span>48.57</span>
              </li>
              <li>
                <span>Pagamento da divida</span> <span>30.00</span>
              </li>
              <li>
                <span>Total pago</span> <span>300.00</span>
              </li>
            </ul>
          </div>
          <div class="list">
            <p style="text-align: center">Codigo da Recarga</p>
            <div style="width:100%;height:1px;background: #ccc;margin-top: 6px;"></div>
            <div v-for="item in aa" style="text-align: center">
              <p style="line-height: 35px;font-size: 18px;">{{ item | tokenjiange}}</p>
            </div>
          </div>
          <div class="list">
            <p>Contactos: <span>admin</span></p>
          </div>
        </div>
      </section>
      </Col>
    </Row>
  </div>
</template>
<style id="style1">
  .invoicetitle{
    height:70px;
    line-height: 80px;
    font-weight: 300;
    font-size: 18px;
    color:#18A2E6;
  }
  .invoicecontent{
    background: #fff;
    height:900px;
  }
  .incontent{
    width:96%;
    margin:0 auto;
    overflow: hidden;
  }
  .incontent .list{
    width:100%;
    border:1px solid #ccc;
    /*overflow: hidden;*/
    padding: 10px;
    margin-top: 5px;
  }
  .incontent .list:after{display:block;clear:both;content:"";visibility:hidden;height:0}
  .incontent .list{zoom:1}
  .topinvoicehead{
    overflow: hidden;
  }
  .invoicehead{
    float: right;
  }
  .invoicecontent h3{
    /*text-align: center;*/
    line-height: 50px;
    /*border-bottom:1px solid #ccc;*/
  }
  .invoicecontent p{
    height:24px;
    line-height: 24px;
  }
  .h-buttonbox{
    height:50px;
    padding:0 2%;
    overflow: hidden;
  }
  .h-button{
    float: left;
    margin-top: 10px;
  }
  @media print {
    .not-print {
      display: none;
    }
  }
  .left-invoice{
    margin-top: 10px;
    width:48%;
    float:left;
  }
  .left-invoice li{
    height:40px;
  }
  .left-invoice li span:first-child{
    display: block;
    width: 120px;
    color:#888;
  }
  .right-invoice{
    margin-top: 10px;
    margin-left: 5px;
  }
  .invoicetable{
    margin:5px 0;
    text-align: left;
    width:100%;
    line-height: 24px;
    border:1px solid #ccc;
  }
  .invoicetable tr:nth-last-child(even){
    border-bottom:1px solid #ccc;
    background: #efefef;
  }
  .invoicetable th{
    line-height: 35px;
  }
  .invoicetable td{
    line-height: 35px;
  }
  .summary li span:nth-child(2){
    display: inline-block;
    width: 300px;
    float: right;
  }
  .total{
    float: right;
  }
</style>
<script>
  export default{
    data () {
      return {
        aa:'56987415698653214589,15648524986541265896,45896325874125693658',
        invoicelist: [
          {
            title: 'Descricao',
            key: 'date'
          },
          {
            title: 'Quantidade',
            key: 'volume'
          },
          {
            title: 'Preco(mt/m³)',
            key: 'money'
          },
          {
            title: 'Preco Total(mt)',
            key: 'debt'
          },
        ],
        openinvoicedata: [
          {
            date: 'Escalao 1',
            volume: '5.00',
            money: '11.68',
            debt:'76.44',
          },
          {
            date: 'Escalao 2',
            volume: '5.00',
            money: '28.03',
            debt:'140.15',
          },
          {
            date: 'Escalao 3',
            volume: '0.6',
            money: '36.93',
            debt:'22.88',
          },
          {
            date: 'Debt fee',
            volume: '',
            money: '',
            debt:'30.00',
          },
        ]
      }
    },
    filters:{"tokenjiange":function(data){
        return data.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
      }},
    methods: {
      printme() {
//       window.print.vue();
        this.myprint()
      },
      myprint() {
//       this.SelectAsDefaultPrinter();
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
          LODOP.PRINT_INIT("开户");

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
    },
    created(){
      this.aa=this.aa.split(",");
    }
  }
</script>


<!--<template>-->
  <!--<div>-->
    <!--<Row>-->
      <!--<Col offset="2" span="20" >-->
      <!--<p class="invoicetitle not-print.vue">购买发票</p>-->
      <!--<div class="h-buttonbox not-print.vue">-->
        <!--<Button type="success" icon="printer" @click="printme()" class="h-button">打印</Button>-->
      <!--</div>-->
      <!--<section class="purinvoice" id="purprint">-->
        <!--<div class="incontents">-->
          <!--<h3>购买发票</h3>-->
          <!--<p>发票编号: <span>2017111501</span></p>-->
          <!--<p>创建日期: <span>2017/11/15</span> </p>-->
          <!--<ul class="left-invoice">-->
            <!--<li class="titles">-->
              <!--<p>客户信息</p>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Name:</span> <span>Alisa</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Telephone</span><span>18536984235</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Address</span><span>zhejianghangzhou</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Description</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Charge volume:</span><span>000</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Original debt:</span><span>000</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Debt payment:</span><span>000</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Remaining debt:</span><span>000</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Additional fee:</span> <span>000</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Current purchase date:</span><span>000</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Last purchase date:</span><span>000</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Days from last purchase date:</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>All buy:</span><span>000</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>All consumption:</span>-->
            <!--</li>-->
          <!--</ul>-->
          <!--<div class="total">-->
            <!--<p>操作员: <span>Admin</span></p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</section>-->
      <!--</Col>-->
    <!--</Row>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--export default{-->
    <!--data () {-->
      <!--return {-->
        <!--invoicelist: [-->
          <!--{-->
            <!--title: 'Description',-->
            <!--key: 'description'-->
          <!--},-->
          <!--{-->
            <!--title: 'Payment',-->
            <!--key: 'payment'-->
          <!--},-->
          <!--{-->
            <!--title: 'Tax Rate',-->
            <!--key: 'taxrate'-->
          <!--},-->
          <!--{-->
            <!--title: 'Tax Amount',-->
            <!--key: 'taxamount'-->
          <!--}-->
        <!--],-->
        <!--openinvoicedata: [-->
          <!--{-->
            <!--description: 'Open Account',-->
            <!--payment: '$100',-->
            <!--taxrate: 0,-->
            <!--taxamount:0-->
          <!--},-->
        <!--]-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--printme() {-->
<!--//       window.print.vue();-->
        <!--this.myprint()-->
      <!--},-->
      <!--myprint() {-->
        <!--var strBodyStyle=`-->
        <!--<style>-->
         <!--.titles{-->
         <!--border-bottom:1px dotted #ccc;-->
         <!--height:26px;-->
         <!--}-->
         <!--.purinvoice{-->
            <!--background: #fff;-->
            <!--font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;-->
          <!--}-->
          <!--.purinvoice h3{-->
            <!--text-align: center;-->
            <!--line-height: 30px;-->
            <!--font-size: 14px;-->
          <!--}-->
          <!--.purinvoice h4{-->
            <!--text-align: center;-->
            <!--line-height: 30px;-->
            <!--border-bottom:1px solid #ccc;-->
            <!--font-size: 14px;-->
          <!--}-->
          <!--.purinvoice p{-->
            <!--height:20px;-->
            <!--line-height: 20px;-->
            <!--font-size: 12px;-->
            <!--font-size: 12px;-->
          <!--}-->
          <!--h4{-->
            <!--line-height: 20px;-->
          <!--}-->
          <!--.left-invoice{-->
            <!--margin-left: -36px;-->
            <!--margin-top: 5px;-->
            <!--list-style: none;-->
          <!--}-->
          <!--.left-invoice li{-->
            <!--line-height: 22px;-->
            <!--list-style: none;-->
            <!--font-size: 12px;-->
            <!--font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;-->
          <!--}-->
          <!--.left-invoice li span:first-child{-->
            <!--display: block;-->
            <!--color:#888;-->
          <!--}-->
          <!--.left-invoice li span:nth-child(2){-->
            <!--margin-left: 6px;-->
          <!--}-->
        <!--</style>-->
        <!--`;-->
        <!--var strFormHtml=strBodyStyle+document.getElementById("purprint").innerHTML;-->


<!--//        var strFormHtml=document.getElementById("print.vue").innerHTML;-->
        <!--var height=document.querySelector("#purprint").offsetHeight;-->
        <!--var width=document.querySelector("#purprint").offsetWidth;-->
        <!--console.log(height);-->
        <!--LODOP.PRINT_INIT("aaaaaaaaa");-->
        <!--LODOP.SET_PRINT_PAGESIZE(1,width,2200,"");-->

        <!--LODOP.ADD_PRINT_HTM(20, 20, width,"100%",strFormHtml);-->
        <!--var patt = /AiBao A-80USH/i;//先由用户设置-->

        <!--for(let j = 0,len=LODOP.Printers.list.length; j < len; j++) {-->
          <!--if(patt.test(LODOP.Printers.list[j].name)){-->
            <!--console.log('预览');-->
            <!--LODOP.SET_PRINTER_INDEXA(j);-->
            <!--LODOP.PREVIEW();//预览-->
          <!--}-->
        <!--}-->
<!--//        LODOP.PREVIEW();//预览-->
<!--//        LODOP.PRINT();// 直接打印-->
      <!--},-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style>-->
  <!--.invoicetitle{-->
    <!--height:70px;-->
    <!--line-height: 80px;-->
    <!--font-weight: 300;-->
    <!--font-size: 18px;-->
    <!--color:#18A2E6;-->
  <!--}-->
  <!--.h-buttonbox{-->
    <!--height:50px;-->
    <!--padding:0 2%;-->
    <!--overflow: hidden;-->
  <!--}-->
  <!--.h-button{-->
    <!--float: left;-->
    <!--margin-top: 10px;-->
  <!--}-->
  <!--.purinvoice{-->
    <!--background: #fff;-->
  <!--}-->
  <!--.incontents{-->
    <!--width:96%;-->
    <!--margin:0 auto;-->
  <!--}-->
  <!--.topinvoicehead{-->
    <!--/*overflow: hidden;*/-->
    <!--border-bottom:1px solid #ccc;-->
  <!--}-->
  <!--.purinvoice h3{-->
    <!--text-align: center;-->
    <!--line-height: 40px;-->
    <!--height:40px;;-->
    <!--border-bottom:1px solid #ccc;-->
  <!--}-->
  <!--.purinvoice p{-->
    <!--height:24px;-->
    <!--line-height: 24px;-->
  <!--}-->
  <!--.left-invoice{-->
    <!--margin-top: 10px;-->
    <!--list-style: none;-->
  <!--}-->
  <!--.left-invoice li{-->
    <!--height:40px;-->
    <!--list-style: none;-->
  <!--}-->
  <!--.left-invoice li span:first-child{-->
    <!--display: block;-->
    <!--color:#888;-->
  <!--}-->
<!--</style>-->




<!--<template>-->
  <!--<div>-->
    <!--<Row>-->
      <!--<Col offset="2" span="20" >-->
      <!--<p class="invoicetitle not-print.vue">购买发票</p>-->
      <!--<div class="h-buttonbox not-print.vue">-->
        <!--<Button type="success" icon="printer" @click="printme()" class="h-button">打印</Button>-->
      <!--</div>-->
      <!--<section class="purinvoice" id="purprint">-->
        <!--<div class="incontents">-->
          <!--<h3>购买发票</h3>-->
          <!--<p>发票编号: <span>2017111501</span></p>-->
          <!--<p>创建日期: <span>2017/11/15</span> </p>-->
          <!--<ul class="left-invoice">-->
            <!--<li class="titles">-->
              <!--<p>客户信息</p>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Name:</span> <span>Alisa</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Telephone</span><span>18536984235</span>-->
            <!--</li>-->
            <!--<li>-->
              <!--<span>Address</span><span>zhejianghangzhou</span>-->
            <!--</li>-->
          <!--</ul>-->
          <!--<p>购买明细</p>-->
          <!--<Table :columns="columns1" :data="data1" style="width:240px;border:1px solid #ccc;"></Table>-->
          <!--<ul class="left-invoice">-->
            <!--<li><span>税前总额</span> <span>371.9</span></li>-->
            <!--<li><span>增值税</span> <span>47</span></li>-->
            <!--<li><span>加税总额</span> <span>418.9</span></li>-->
            <!--<li><span>债务</span> <span>47</span>100</li>-->
            <!--<li><span>应交总额</span><span>518.9</span></li>-->
          <!--</ul>-->
          <!--<div class="token">-->
            <!--<p>token:</p>-->
            <!--<p>1548 8887 7454 7862 7631</p>-->
          <!--</div>-->
          <!--<div class="total">-->
            <!--<p>操作员: <span>Admin</span></p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</section>-->
      <!--</Col>-->
    <!--</Row>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--export default{-->
    <!--data () {-->
      <!--return {-->
        <!--invoicelist: [-->
          <!--{-->
            <!--title: 'Description',-->
            <!--key: 'description'-->
          <!--},-->
          <!--{-->
            <!--title: 'Payment',-->
            <!--key: 'payment'-->
          <!--},-->
          <!--{-->
            <!--title: 'Tax Rate',-->
            <!--key: 'taxrate'-->
          <!--},-->
          <!--{-->
            <!--title: 'Tax Amount',-->
            <!--key: 'taxamount'-->
          <!--}-->
        <!--],-->
        <!--openinvoicedata: [-->
          <!--{-->
            <!--description: 'Open Account',-->
            <!--payment: '$100',-->
            <!--taxrate: 0,-->
            <!--taxamount:0-->
          <!--},-->
        <!--],-->
        <!--columns1: [-->
          <!--{-->
            <!--title: '名称',-->
            <!--key: 'name',-->
            <!--width:70,-->
            <!--textAlign:'left'-->
          <!--},-->
          <!--{-->
            <!--title: '数量',-->
            <!--key: 'count'-->
          <!--},-->
          <!--{-->
            <!--title: '单价',-->
            <!--key: 'price'-->
          <!--},-->
          <!--{-->
            <!--title: '总额',-->
            <!--key: 'total'-->
          <!--}-->
        <!--],-->
        <!--data1: [-->
          <!--{-->
            <!--name: '最低消费',-->
            <!--count: 1,-->
            <!--price: '15.88',-->
            <!--total: '100'-->
          <!--},-->
          <!--{-->
            <!--name: '最低消费',-->
            <!--count: 1,-->
            <!--price: '15.88',-->
            <!--total: '100'-->
          <!--},-->
          <!--{-->
            <!--name: '最低消费',-->
            <!--count: 1,-->
            <!--price: '15.88',-->
            <!--total: '100'-->
          <!--},-->
          <!--{-->
            <!--name: '最低消费',-->
            <!--count: 1,-->
            <!--price: '15.88',-->
            <!--total: '100'-->
          <!--},-->
        <!--]-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--printme() {-->
<!--//       window.print.vue();-->
        <!--this.myprint()-->
      <!--},-->
      <!--myprint() {-->
        <!--var strBodyStyle=`-->
        <!--<style>-->
            <!--*{-->
            <!--font-family: "Arial, Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑",sans-serif;-->
            <!--}-->
            <!--th{-->
              <!--text-align: left;-->
            <!--}-->
            <!--.titles p{-->
              <!--border-bottom:1px dotted #ccc;-->
            <!--}-->

            <!--.purinvoice h3{-->
              <!--text-align: center;-->
              <!--line-height: 40px;-->
              <!--height:40px;;-->
              <!--border-bottom:1px solid #ccc;-->
            <!--}-->
            <!--.purinvoice p{-->
              <!--height:24px;-->
              <!--line-height: 20px;-->
            <!--}-->
            <!--.left-invoice{-->
              <!--margin-top: 10px;-->
              <!--list-style: none;-->
              <!--margin-left: -40px;-->
            <!--}-->
            <!--.left-invoice li{-->
              <!--height:24px;-->
              <!--list-style: none;-->
            <!--}-->
            <!--.left-invoice li span{-->
              <!--line-height: 24px;-->
            <!--}-->
            <!--.left-invoice li span:first-child{-->
              <!--display: block;-->
              <!--color:#888;-->
              <!--width:90px;-->
              <!--float: left;-->
            <!--}-->
        <!--</style>-->
        <!--`;-->
        <!--var strFormHtml=strBodyStyle+document.getElementById("purprint").innerHTML;-->


<!--//        var strFormHtml=document.getElementById("print.vue").innerHTML;-->
        <!--var height=document.querySelector("#purprint").offsetHeight;-->
        <!--var width=document.querySelector("#purprint").offsetWidth;-->
        <!--console.log(height,width,"高");-->
        <!--LODOP.PRINT_INIT("aaaaaaaaa");-->
        <!--LODOP.SET_PRINT_PAGESIZE(1,width,2200,"");-->

        <!--LODOP.ADD_PRINT_HTM(20, 20, width,"100%",strFormHtml);-->
        <!--var patt = /AiBao A-80USH/i;//先由用户设置-->

        <!--for(let j = 0,len=LODOP.Printers.list.length; j < len; j++) {-->
          <!--if(patt.test(LODOP.Printers.list[j].name)){-->
            <!--console.log('预览');-->
            <!--LODOP.SET_PRINTER_INDEXA(j);-->
            <!--LODOP.PREVIEW();//预览-->
          <!--}-->
        <!--}-->
      <!--},-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style>-->
  <!--.detail{-->
    <!--border:1px solid #ccc;-->
    <!--min-width: 200px;-->
  <!--}-->
  <!--.titles p{-->
    <!--border-bottom:1px dotted #ccc;-->
  <!--}-->
  <!--.invoicetitle{-->
    <!--height:70px;-->
    <!--line-height: 80px;-->
    <!--font-weight: 300;-->
    <!--font-size: 18px;-->
    <!--color:#18A2E6;-->
  <!--}-->
  <!--.h-buttonbox{-->
    <!--height:50px;-->
    <!--padding:0 2%;-->
    <!--overflow: hidden;-->
  <!--}-->
  <!--.h-button{-->
    <!--float: left;-->
    <!--margin-top: 10px;-->
  <!--}-->
  <!--.purinvoice{-->
    <!--background: #fff;-->
  <!--}-->
  <!--.incontents{-->
    <!--width:96%;-->
    <!--margin:0 auto;-->
  <!--}-->
  <!--.topinvoicehead{-->
    <!--border-bottom:1px solid #ccc;-->
  <!--}-->
  <!--.purinvoice h3{-->
    <!--text-align: center;-->
    <!--line-height: 40px;-->
    <!--height:40px;;-->
    <!--border-bottom:1px solid #ccc;-->
  <!--}-->
  <!--.purinvoice p{-->
    <!--height:24px;-->
    <!--line-height: 20px;-->
  <!--}-->
  <!--.left-invoice{-->
    <!--margin-top: 10px;-->
    <!--list-style: none;-->
  <!--}-->
  <!--.left-invoice li{-->
    <!--height:24px;-->
    <!--list-style: none;-->
  <!--}-->
  <!--.left-invoice li span{-->
    <!--line-height: 24px;-->
  <!--}-->
  <!--.left-invoice li span:first-child{-->
    <!--display: block;-->
    <!--color:#888;-->
    <!--width:70px;-->
    <!--float: left;-->
  <!--}-->
<!--</style>-->
