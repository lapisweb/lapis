<template>
  <div class="footer">
    <div>
      <div class="footer_about">
        <p class="about_link">
          <a href="http://www.laisongroup.com/" target="_blank">{{$t('m.footer.aboutlaison')}}</a> |
          <a href="http://www.laisongroup.com/products/" target="_blank">{{$t('m.footer.product')}}</a> |
          <a href="http://www.laisongroup.com/partners/" target="_blank">{{$t('m.footer.partner')}}</a> |
          <a href="http://www.laisongroup.com/news/">{{$t('m.footer.recruit')}}</a> |
          <a href="http://www.laisongroup.com/contact/" target="_blank">{{$t('m.footer.service')}}</a>
        </p>
        <p class="about_copyright">
          <span>Copyright © 2013 - <span id="current_year">2018</span> Laison. All Rights Reserved</span>
          <span>{{$t('m.footer.copyright')}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style>
  .footer {
    padding:20px 0;
    position:fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    background: #f7f8f8;
  }
  .footer>div .footer_about .about_link {
    text-align:center;
    color: #d9d9d9;
    margin-bottom: 7px;
  }
  .footer>div .footer_about .about_copyright {
    font-size: 12px;
    text-align: center;
    color: #666;
  }
</style>
