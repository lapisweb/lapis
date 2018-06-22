// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'
import echarts from 'echarts'
// import 'babel-polyfill'

import iView from 'iview';
import VueResource from 'vue-resource';
import 'iview/dist/styles/iview.css';
import zh from 'iview/dist/locale/zh-CN';
import en from 'iview/dist/locale/en-US';
import ggheader from './components/index.vue';
import ggheader1 from './components/index1.vue';
import footer from './components/footer.vue';
import footer1 from './components/footer1.vue';
import customer from './components/customer.vue';
import ien from './common/lang/en';
import izh from './common/lang/zh';

Vue.prototype.$echarts = echarts;

Vue.use(VueI18n);
Vue.use(VueResource);
Vue.use(iView);
Vue.use(Vuex);

Vue.http.options.root="http://www.laison.com:8080/";
// Vue.http.options.root="/api/";

//语言设置
if(window.localStorage.language){
  Vue.config.lang = window.localStorage.language;
}else{
  Vue.config.lang = 'en_US';
}
const messages = {
  en: Object.assign(ien, en),
  zh: Object.assign(izh, zh),
};
Vue.locale('en_US', messages.en);
Vue.locale('zh_CN', messages.zh);

//全局组件
Vue.component('my-header',ggheader);
Vue.component('my-header1',ggheader1);
Vue.component('my-footer',footer);
Vue.component('my-footer1',footer1);
Vue.component('my-customer',customer);

//阻止启动生产消息
Vue.config.productionTip = false;

//vuex
const store = new Vuex.Store({
  state: {
    print:{}
  },
  mutations: {
    getPrint(data){
      console.log(data)
    }
  }
});

//阻止向后台发送为空的信息
function deleteEmptyProp(json){
  for (var item in json) {
    if( typeof json[item] === "object"){
      if(json[item]===null){
        delete json[item];
      }else{
        deleteEmptyProp(json[item])
      }
    }else{
      if(typeof json[item] === 'string'){
        if(json[item].trim() ===''){
          delete json[item];
        }
      }
    }
  }
}

//拦截器
Vue.http.interceptors.push((request, next) => {
  // modify request
  request.method = 'POST';//在请求之前可以进行一些预处理和配置
  // store.commit('deleteEmptyProp',request.body);
  deleteEmptyProp(request.body);
  // deleteEmptyProp(request.body);
  next((response) => {
    let Token=response.body.code;
    // //在响应之后传给then之前对response进行修改和逻辑判断。
    // // 对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    if(Token==501){
      router.push({ name: 'login'})
    }
    return response;
  });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app');

