<!--<template>-->
  <!--<div>-->
    <!--<Row>-->
      <!--<Col offset="2" span="20" >-->
      <!--<p class="invoicetitle not-print">购买发票</p>-->
      <!--<div class="h-buttonbox not-print">-->
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
<!--//       window.print();-->
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


<!--//        var strFormHtml=document.getElementById("print").innerHTML;-->
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




<template>
  <div>
    <Row>
      <Col offset="2" span="20" >
      <p class="invoicetitle not-print">购买发票</p>
      <div class="h-buttonbox not-print">
        <Button type="success" icon="printer" @click="printme()" class="h-button">打印</Button>
      </div>
      <section class="purinvoice" id="purprint">
        <div class="incontents">
          <h3>购买发票</h3>
          <p>发票编号: <span>2017111501</span></p>
          <p>创建日期: <span>2017/11/15</span> </p>
          <ul class="left-invoice">
            <li class="titles">
              <p>客户信息</p>
            </li>
            <li>
              <span>Name:</span> <span>Alisa</span>
            </li>
            <li>
              <span>Telephone</span><span>18536984235</span>
            </li>
            <li>
              <span>Address</span><span>zhejianghangzhou</span>
            </li>
          </ul>
          <p>购买明细</p>
          <Table :columns="columns1" :data="data1" style="width:240px;border:1px solid #ccc;"></Table>
          <ul class="left-invoice">
            <li><span>税前总额</span> <span>371.9</span></li>
            <li><span>增值税</span> <span>47</span></li>
            <li><span>加税总额</span> <span>418.9</span></li>
            <li><span>债务</span> <span>47</span>100</li>
            <li><span>应交总额</span><span>518.9</span></li>
          </ul>
          <div class="token">
            <p>token:</p>
            <p>1548 8887 7454 7862 7631</p>
          </div>
          <div class="total">
            <p>操作员: <span>Admin</span></p>
          </div>
        </div>
      </section>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default{
    data () {
      return {
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
        ]
      }
    },
    methods: {
      printme() {
//       window.print();
        this.myprint()
      },
      myprint() {
        var strBodyStyle=`
        <style>
            *{
            font-family: "Arial, Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑",sans-serif;
            }
            th{
              text-align: left;
            }
            .titles p{
              border-bottom:1px dotted #ccc;
            }

            .purinvoice h3{
              text-align: center;
              line-height: 40px;
              height:40px;;
              border-bottom:1px solid #ccc;
            }
            .purinvoice p{
              height:24px;
              line-height: 20px;
            }
            .left-invoice{
              margin-top: 10px;
              list-style: none;
              margin-left: -40px;
            }
            .left-invoice li{
              height:24px;
              list-style: none;
            }
            .left-invoice li span{
              line-height: 24px;
            }
            .left-invoice li span:first-child{
              display: block;
              color:#888;
              width:90px;
              float: left;
            }
        </style>
        `;
        var strFormHtml=strBodyStyle+document.getElementById("purprint").innerHTML;


//        var strFormHtml=document.getElementById("print").innerHTML;
        var height=document.querySelector("#purprint").offsetHeight;
        var width=document.querySelector("#purprint").offsetWidth;
        console.log(height,width,"高");
        LODOP.PRINT_INIT("aaaaaaaaa");
        LODOP.SET_PRINT_PAGESIZE(1,width,2200,"");

        LODOP.ADD_PRINT_HTM(20, 20, width,"100%",strFormHtml);
        var patt = /AiBao A-80USH/i;//先由用户设置

        for(let j = 0,len=LODOP.Printers.list.length; j < len; j++) {
          if(patt.test(LODOP.Printers.list[j].name)){
            console.log('预览');
            LODOP.SET_PRINTER_INDEXA(j);
            LODOP.PREVIEW();//预览
          }
        }
      },
    }
  }
</script>
<style>
  .detail{
    border:1px solid #ccc;
    min-width: 200px;
  }
  .titles p{
    border-bottom:1px dotted #ccc;
  }
  .invoicetitle{
    height:70px;
    line-height: 80px;
    font-weight: 300;
    font-size: 18px;
    color:#18A2E6;
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
  .purinvoice{
    background: #fff;
  }
  .incontents{
    width:96%;
    margin:0 auto;
  }
  .topinvoicehead{
    border-bottom:1px solid #ccc;
  }
  .purinvoice h3{
    text-align: center;
    line-height: 40px;
    height:40px;;
    border-bottom:1px solid #ccc;
  }
  .purinvoice p{
    height:24px;
    line-height: 20px;
  }
  .left-invoice{
    margin-top: 10px;
    list-style: none;
  }
  .left-invoice li{
    height:24px;
    list-style: none;
  }
  .left-invoice li span{
    line-height: 24px;
  }
  .left-invoice li span:first-child{
    display: block;
    color:#888;
    width:70px;
    float: left;
  }
</style>
