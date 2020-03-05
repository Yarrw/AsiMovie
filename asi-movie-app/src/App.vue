<template>
  <div id="app" class="app">
    <div class="system-nav">

    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
  
  .system-nav{
    width: 100%;
    height: 24px;
  }
  .img-auto{
    display:block;
    width: 100%
  }
  .clearfix::after{
    display: block;
    content: '';
    clear: both;
}
  .fl{
    float: left;
  }
  .fr{
    float:right;
  }
  .one-text{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
