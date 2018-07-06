<template>
  <div class="breadcrumb">
    <Breadcrumb>
      <BreadcrumbItem to="/index">Home</BreadcrumbItem>
      <BreadcrumbItem to="/index/purchase">purchase</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
    export default {
        name: "breadcrumb"
    }
</script>

<style scoped>
  .breadcrumb{
    height:40px;
    box-shadow: 0 2px 3px 0px rgba(100, 100, 100, 0.1);
    margin-bottom: 4px;
    line-height: 40px;
    box-sizing: border-box;
    padding:0 25px;
  }
</style>
