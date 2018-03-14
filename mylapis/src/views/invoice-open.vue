<template>
  <div>
    <Row>
      <Col offset="2" span="20" >
        <section class="invoicecontent">
          <div class="h-buttonbox not-print">
            <Button type="success" icon="printer" @click="printme()" class="h-button">打印</Button>
          </div>
          <div class="incontent" id="openprint">
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
                  <span>姓名:</span> <span>Alisa</span>
                </li>
                <li>
                  <span>电话号:</span><span>18536984235</span>
                </li>
                <li>
                  <span>身份证号:</span><span>102366455987423669</span>
                </li>
              </ul>
              <ul class="left-invoice">
                <li>
                  <span>表号:</span> <span>2135413153456</span>
                </li>
                <li>
                  <span>表类型</span><span>sts</span>
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
              <p>操作员: <span>Admin</span></p>
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
    height:800px;
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
  .invoicecontent h3{
    text-align: center;
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
    height:50px;
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
    margin:15px 0;
    text-align: left;
    width:100%;
    line-height: 24px;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
  }
  .invoicetable tr:nth-last-child(even){
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
          {
            description: 'Open Account',
            payment: '$100',
            taxrate: 0,
            taxamount:1
          },
          {
            description: 'Open Account',
            payment: '$100',
            taxrate: 0,
            taxamount:2
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
//       this.SelectAsDefaultPrinter();
        var strBodyStyle=`
        <style>
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
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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
        var strFormHtml=strBodyStyle+document.getElementById("openprint").innerHTML;
        var height=document.querySelector("#openprint").offsetHeight;
        var width=document.querySelector("#openprint").offsetWidth;
        if (LODOP.webskt && LODOP.webskt.readyState == 1) {
          console.log("开始打印！！");
          LODOP.PRINT_INIT(20, 20, 720, height,"");

//          if (LODOP.CVERSION) CLODOP.On_Return=function(TaskID,Value){alert(Value);};
//          var strResult=LODOP.SET_PRINT_MODE("WINDOW_DEFPRINTER",'\\\\192.168.0.5\\Samsung M262x 282x Series');

          LODOP.SET_PRINT_PAGESIZE(1,'100%','100%',"A4");
          LODOP.ADD_PRINT_HTM(20, 20, 720, height,strFormHtml);
          LODOP.PREVIEW();//预览
//       LODOP.PRINT();// 直接打印
        }
      },
      getSelectedPrintIndex(){
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
    }
  }
</script>

