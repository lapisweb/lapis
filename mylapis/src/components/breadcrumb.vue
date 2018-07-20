<template>
  <div class="breadcrumb">
    <Breadcrumb>
      <BreadcrumbItem to="/index">Home</BreadcrumbItem>
      <BreadcrumbItem v-for="(item,index) in BreadcrumbItem" :key="index" :to="item.to">{{item.name}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
    export default {
        name: "breadcrumb",
      data(){
          return {
            BreadcrumbItem:[
              {
                to:'/index/purchase',
                name:'purchase'
              }
            ],
          }
      },
    }
</script>

<style scoped>
  /*.breadcrumb{*/
    /*height:40px;*/
    /*box-shadow: 0 2px 3px 0px rgba(100, 100, 100, 0.1);*/
    /*margin-bottom: 4px;*/
    /*line-height: 40px;*/
    /*box-sizing: border-box;*/
    /*padding:0 25px;*/
  /*}*/
</style>
