<!--<template>-->
  <!--<div>-->
    <!--<Row>-->
      <!--<Col offset="2" span="20" >-->
        <!--<section class="invoicecontent">-->
          <!--<div class="h-buttonbox not-print.vue">-->
            <!--<Button type="success" icon="printer" @click="printme()" class="h-button">打印</Button>-->
          <!--</div>-->
          <!--<div class="incontent" id="openprint">-->
            <!--<h3>开户发票</h3>-->
            <!--<div style="height:65px;position: absolute;right:12px;top:-8px;">-->
              <!--<img style="height: 100%;" src="../assets/img/logoc.png" alt="">-->
            <!--</div>-->
            <!--<div class="topinvoicehead">-->
              <!--<div class="invoicehead">-->
                <!--<p>发票编号: <span>2017111501</span></p>-->
                <!--<p>创建日期: <span>2017/11/15</span> </p>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="list">-->
              <!--<ul class="left-invoice">-->
                <!--<li>-->
                  <!--<span>姓名:</span> <span>Alisa</span>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<span>电话号:</span><span>18536984235</span>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<span>身份证号:</span><span>102366455987423669</span>-->
                <!--</li>-->
              <!--</ul>-->
              <!--<ul class="left-invoice">-->
                <!--<li>-->
                  <!--<span>表号:</span> <span>2135413153456</span>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<span>表类型</span><span>sts</span>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<table class="invoicetable" cellspacing="0" cellpadding="0">-->
              <!--<tr>-->
                <!--<th v-for="item in invoicelist">{{item.title}}</th>-->
              <!--</tr>-->
              <!--<tr v-for="item in openinvoicedata">-->
                <!--<td>{{item.description}}</td>-->
                <!--<td>{{item.payment}}</td>-->
                <!--<td>{{item.taxrate}}</td>-->
                <!--<td>{{item.taxamount}}</td>-->
              <!--</tr>-->
            <!--</table>-->
            <!--<div class="total">-->
              <!--<p>total <span>$100</span></p>-->
              <!--<p>操作员: <span>Admin</span></p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</section>-->
      <!--</Col>-->
    <!--</Row>-->
  <!--</div>-->
<!--</template>-->
<!--<style id="style1">-->
  <!--.invoicetitle{-->
    <!--height:70px;-->
    <!--line-height: 80px;-->
    <!--font-weight: 300;-->
    <!--font-size: 18px;-->
    <!--color:#18A2E6;-->
  <!--}-->
  <!--.invoicecontent{-->
    <!--background: #fff;-->
    <!--height:800px;-->
  <!--}-->
  <!--.incontent{-->
    <!--width:96%;-->
    <!--margin:0 auto;-->
  <!--}-->
  <!--.incontent .list{-->
    <!--width:100%;-->
  <!--}-->
  <!--.topinvoicehead{-->
    <!--overflow: hidden;-->
    <!--border-bottom:1px solid #ccc;-->
  <!--}-->
  <!--.invoicehead{-->
    <!--float: right;-->
  <!--}-->
  <!--.invoicecontent h3{-->
    <!--/*text-align: center;*/-->
    <!--line-height: 50px;-->
    <!--/*border-bottom:1px solid #ccc;*/-->
  <!--}-->
  <!--.invoicecontent p{-->
    <!--height:24px;-->
    <!--line-height: 24px;-->
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
  <!--@media print.vue {-->
    <!--.not-print.vue {-->
      <!--display: none;-->
    <!--}-->
  <!--}-->
  <!--.left-invoice{-->
    <!--margin-top: 10px;-->
    <!--width:48%;-->
    <!--float:left;-->
  <!--}-->
  <!--.left-invoice li{-->
    <!--height:50px;-->
  <!--}-->
  <!--.left-invoice li span:first-child{-->
    <!--display: block;-->
    <!--width: 120px;-->
    <!--color:#888;-->
  <!--}-->
  <!--.right-invoice{-->
    <!--margin-top: 10px;-->
    <!--margin-left: 5px;-->
  <!--}-->
  <!--.invoicetable{-->
    <!--margin:15px 0;-->
    <!--text-align: left;-->
    <!--width:100%;-->
    <!--line-height: 24px;-->
    <!--border-top:1px solid #ccc;-->
    <!--border-bottom:1px solid #ccc;-->
  <!--}-->
  <!--.invoicetable tr:nth-last-child(even){-->
    <!--border-bottom:1px solid #ccc;-->
    <!--background: #efefef;-->
  <!--}-->
  <!--.invoicetable th{-->
    <!--width:25%;-->
    <!--line-height: 35px;-->
  <!--}-->
  <!--.invoicetable td{-->
    <!--width:25%;-->
    <!--line-height: 35px;-->
  <!--}-->
  <!--.total{-->
    <!--float: right;-->
  <!--}-->
<!--</style>-->
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
<!--//       this.SelectAsDefaultPrinter();-->
        <!--var strBodyStyle=`-->
        <!--<style>-->
         <!--.incontent{-->
            <!--width:96%;-->
            <!--margin:0 auto;-->
          <!--}-->
          <!--.incontent .list{-->
            <!--width:100%;-->
          <!--}-->
          <!--.topinvoicehead{-->
            <!--overflow: hidden;-->
            <!--border-bottom:1px solid #ccc;-->
          <!--}-->
          <!--.invoicehead{-->
            <!--float: right;-->
          <!--}-->
          <!--.incontent h3{-->
            <!--line-height: 50px;-->
          <!--}-->
          <!--.invoicecontent p{-->
            <!--height:24px;-->
            <!--line-height: 24px;-->
          <!--}-->
          <!--.left-invoice{-->
            <!--list-style: none;-->
            <!--margin-top: 10px;-->
            <!--width:40%;-->
            <!--float:left;-->
            <!--font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;-->
          <!--}-->
          <!--.left-invoice li{-->
            <!--list-style: none;-->
            <!--height:50px;-->
          <!--}-->
          <!--.left-invoice li span:first-child{-->
            <!--display: block;-->
            <!--color:#888;-->
          <!--}-->
          <!--.invoicetable{-->
            <!--margin:15px 0;-->
            <!--text-align:center;-->
            <!--width:100%;-->
            <!--line-height: 24px;-->
            <!--border-top:1px solid #ccc;-->
            <!--border-bottom:1px solid #ccc;-->
          <!--}-->
          <!--.invoicetable tr:nth-child(even){-->
            <!--border-bottom:1px solid #ccc;-->
            <!--background: #efefef;-->
          <!--}-->
          <!--.invoicetable th{-->
            <!--width:25%;-->
            <!--line-height: 35px;-->
          <!--}-->
          <!--.invoicetable td{-->
            <!--width:25%;-->
            <!--line-height: 35px;-->
          <!--}-->
          <!--.total{-->
            <!--float: right;-->
          <!--}-->
        <!--</style>-->
        <!--`;-->
        <!--var strFormHtml=strBodyStyle+document.getElementById("openprint").innerHTML;-->
        <!--var height=document.querySelector("#openprint").offsetHeight;-->
        <!--var width=document.querySelector("#openprint").offsetWidth;-->
        <!--if (LODOP.webskt && LODOP.webskt.readyState == 1) {-->
          <!--console.log("开始打印！！");-->
          <!--LODOP.PRINT_INIT(20, 20, 720, height,"");-->

<!--//          if (LODOP.CVERSION) CLODOP.On_Return=function(TaskID,Value){alert(Value);};-->
<!--//          var strResult=LODOP.SET_PRINT_MODE("WINDOW_DEFPRINTER",'\\\\192.168.0.5\\Samsung M262x 282x Series');-->

          <!--LODOP.SET_PRINT_PAGESIZE(1,0,0,"A4");-->
          <!--LODOP.ADD_PRINT_HTM(20, 20, 740, height,strFormHtml);-->
          <!--LODOP.PREVIEW();//预览-->
<!--//       LODOP.PRINT();// 直接打印-->
        <!--}-->
      <!--},-->
      <!--getSelectedPrintIndex(){-->
        <!--if (document.getElementById("Radio2").checked)-->
          <!--return document.getElementById("PrinterList").value;-->
        <!--else return -1;-->
      <!--},-->
      <!--SelectAsDefaultPrinter() {-->
        <!--if (LODOP.CVERSION) {-->
          <!--LODOP.On_Return = function (TaskID, Value) {-->
            <!--if (Value >= 0) alert("选择成功!"); else alert("选择失败！");-->
          <!--};-->
          <!--LODOP.SELECT_PRINTER();-->
          <!--return;-->
        <!--}-->
        <!--;-->
        <!--if (LODOP.SELECT_PRINTER() >= 0) {-->
          <!--alert("选择成功!");-->
        <!--} else {-->
          <!--alert("选择失败！");-->
        <!--}-->
      <!--},-->
    <!--}-->
  <!--}-->
<!--</script>-->

<template>
  <div>
    <pre>





    </pre>
    <p v-if="install">检测到你未安装C-Lodop打印程序，请 <a href="http://192.168.0.174/file/CLodop_Setup_for_Win32NT_3.029.exe
">点击此处</a> 安装</p>
    <Alert v-if="install" closable show-icon style="position:absolute;z-index:10000;width:50%;top:100px;left:50%;margin-left:-25%;text-align: center">
      检测到你未安装C-Lodop打印程序，请<a href="http://192.168.0.174/file/CLodop_Setup_for_Win32NT_3.029.exe">点击此处</a> 安装
    </Alert>
    <div class="h-buttonfbox not-print">
      <Button type="success" icon="printer" @click="printme()" class="h-button">打印</Button>
    </div>
    <div class="openmain" id="smallopenfipag">
      <div class="header">
        <p class="dotted"></p>
        <img src="../assets/img/fipag.jpg" alt="">
        <p class="dotted2"></p>
      </div>
      <div class="f-title">
        <p style="font-size: 18px;text-align: center;line-height: 28px;">Open Account</p>
        <p style="text-align: center;margin-bottom: 10px;">OPENRATIONAL AREA OF BEIRA</p>
        <p style="text-align: center;line-height: 18px;">Invoice No. <span>00181200000138</span></p>
        <p style="text-align: center;line-height: 18px;margin-bottom: 8px;">19-04-2018 15:30</p>
      </div>
      <div class="customer fbox">
        <h3>CUSTOMER INFORMATION</h3>
        <ul>
          <li><span>name :</span> <span>Assucena Onika</span></li>
          <li><span>Meter No. :</span> <span>0123589654789</span></li>
          <li><span>Id No. :</span> <span>1432698569856325489</span></li>
          <li><span>Telephone :</span> <span>0010-8695654</span></li>
          <li><span>Address :</span> <span>#525 xixi xixi hangzhou zhejiang</span></li>
        </ul>
      </div>
      <div class="fbox">
        <p style="text-align: center;line-height: 24px">Payment : <span>0.00</span></p>
      </div>
      <div class="fbox">
        <p style="text-align: center;line-height: 24px">Vendor : <span>admin</span></p>
      </div>
      <p class="dotted"></p>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        install:false,
      }
    },

    methods: {
      printme() {
        try
        {
          this.myprint()
        }
        catch(err)
        {
          this.install=true;
        }

      },
      myprint() {
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
        let height=(document.getElementById("smallfipag").scrollHeight)+200+'px';
        console.log(height)
        if (LODOP.webskt && LODOP.webskt.readyState == 1) {
          console.log("开始打印！！");
          LODOP.PRINT_INIT('aaa');
          LODOP.SET_PRINT_PAGESIZE(1, 480, height,"");
          LODOP.ADD_PRINT_HTM(20, 0, '100%', height, strFormHtml);
          // var patt = /POS104 Printer/i;//先由用户设置
          // var patt = /AiBao A-80USH/i;//先由用户设置
          // var patt = /Samsung M262x 282x Series/i;//先由用户设置
          // console.log(LODOP.Printers.list,8888888)
          // for (let j = 0, len = LODOP.Printers.list.length; j < len; j++) {
            // if (patt.test(LODOP.Printers.list[j].name)) {

              LODOP.SET_PRINTER_INDEXA(j);
              LODOP.PREVIEW();//预览
              // LODOP.PRINT();//打印
            // }
          // }
        }
      },
    },
    created(){
    }
  }
</script>
