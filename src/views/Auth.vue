<template>
  <section :class="['auth', {login_block:$route.path.includes('login')}, {agreement_box: agree}]">
    <div class="bg_box">
      <div class="bg"></div>
    </div>
    <div class="mobile_logo">
      <router-link to="/"></router-link>
    </div>
    <div class="box">
      <router-view></router-view>
    </div>
    <div class="regist_mobile" v-if="$route.path.includes('passwordRetrieval')||$route.path.includes('regist')">已有账号？<router-link to="/auth/login">立即登录</router-link></div>
    <p class="copyright">算力网 版权所有 Copyright © 2013-2017<br>Zhejiang Shuqin Technology Co., Ltd. All Rights Reserved. </p>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        banner: require('@/assets/images/auth_bg.jpg'),
        bg: require('@/assets/images/login_bg.jpg'),
        agree: false
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../assets/css/style.scss';
  .auth{
    position: relative;
    .bg_box{
      @include bg(1920,calc(100vh - 80px))
      @include position
      z-index: -1;
      color:$light_text;
      .bg{
        background:url(../assets/images/auth_bg.jpg) no-repeat;
      }
      @include mobile_hide
    }
    .mobile_logo{
      @include mobile_show
      text-align: center;
      padding-top:30px;
      a{
        display: inline-block;
        width:140px;
        height:29px;
        background:url(../assets/images/css_sprites.png) -170px -364px;
      }
    }
    &:not(.login_block){
      min-height:calc(100vh - 80px);
      .bg_box{
        .bg{
          height:100%
        }
      }
      @media screen and (max-width: $mobile) {
        min-height:100vh;
      }
    }
    .box{
      @include main
    }
    .regist_mobile{
      text-align: center;
      @include mobile_show
      a{
        color:$blue
      }
    }
    .copyright{
      text-align: center;
      padding: 15px 0
    }
    &.login_block{
      height:100vh;
      .bg_box{
        top:0;
        background: #181a1c;
        padding-top:calc(100vh - 1px);
        .bg{
          background:url(../assets/images/login_bg.jpg) no-repeat;
          height:calc(100vh - 1px)
        }
      }
      .box{
        padding-top:180px;
        background:transparent;
        .text a{
          color:$white
        }
      }
      .copyright{
        margin-top:50px;
        color:$light_text
      }
    }
    &.agreement_box{
      background: #f7f8fa;
      padding:40px 0;
      .bg_box,.copyright{
        display: none;
      }
    }
    @media screen and (max-width: $mobile) {
      background: #f4f4f4;
      .box{
        padding:15px;
        .form button{
          line-height: 2;
          margin-top:30px;
        }
      }
      &.login_block .box{
        padding:15px;
        .form{
          padding:30px 15px;
        }
      }
      .copyright{
        font-size: 12px;
        color:$light_text
      }
    }
  }
</style>
