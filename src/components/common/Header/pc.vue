<template>
  <header :class="headerClass" :disabled="$route.name==='notFound'">
    <section class="box">
      <div class="nav_left1">
        <router-link class="logo" to="/"></router-link>
        <nav>
          <span v-if="$route.path.includes('regist')">用户注册</span>
          <span v-else-if="$route.path.includes('passwordRetrieval')">找回密码</span>
          <div :class="['item',{active:$route.path.includes(i.name)}]" v-for="(i,k) in nav" v-else>
            <router-link :to="i.link">{{ i.text }}</router-link>
          </div>
        </nav>
      </div>
      <div class="side_nav">
        <template v-if="$route.path.includes('auth')">
          <router-link to="/" v-if="$route.path.includes('login')">返回首页</router-link>
          <div class="text" v-else>
            <span>已经拥有账号,</span>
            <router-link to="/auth/login">直接登录</router-link>
          </div>
        </template>
        <template v-else>
          <router-link to="/webInfo/issues">帮助</router-link>
          <router-link to="/webInfo/aboutUs">关于</router-link>
          <template v-if="token===0">
            <router-link to="/auth/login">登录</router-link>
            <router-link class="btn" to="/auth/regist">注册</router-link>
          </template>
          <template v-else>
            <router-link class="tel" to="/user/computeProperty"><span class="iconfont">&#xe63f; </span>{{mobile|format}}</router-link>
            <a href="javascript:;" @click="logout">退出</a>
          </template>
        </template>
      </div>
    </section>
  </header>
</template>

<script>
  import api from '@/util/function'
  import { mapState } from 'vuex'
  import MobileHeader from './mobile'
  import PcHeader from './pc'

  export default {
    name: 'header',
    data () {
      return {
        // nav: [{name: 'minerShop', text: '矿机商城', link: '/minerShop/list/1/all'}, {name: 'compute', text: '算力转让', link: '/compute/list/1/all'}, {name: 'bdc', text: 'BDC托管', link: '/bdc'}, {name: 'news', text: '产业资讯', link: '/webInfo/list/news'}, {name: 'dataTrade', text: '数据交易', link: ''}, {name: 'computeTrade', text: '算法交易', link: ''}],'/industryInformation'
        nav: [{name: 'minerShop', text: '矿机商城', link: '/minerShop/list'}, {name: 'bdc', text: 'BDC托管', link: '/bdc'}, {name: 'industryInformation', text: '产业资讯', link: '/industryInformation'}],
        path: {frame_header: ['regist', 'passwordRetrieval', 'user', 'account', '/minerShop/list', '/detail', '/currency', 'webInfo', 'article/agreement', 'minerShop/miner', '/industryInformation', 'computeNews', 'transaction', 'quickNews', 'digitalCurrency', 'equipments', 'equipmentEvaluate', 'manufacturer', 'computeChart'], border: ['login', 'bdc'], shadow: ['regist', 'passwordRetrieval'], web_box: ['webInfo', 'minerShop/miner']},
        headerClass: ''
      }
    },
    mounted () {
      this.updateClass()
    },
    computed: {
      ...mapState({
        token: state => state.info.token,
        user_id: state => state.info.user_id,
        mobile: state => state.info.mobile,
        true_name: state => state.info.true_name,
        isMobile: state => state.isMobile
      })
    },
    methods: {
      logout () {
        this.$router.push({name: 'home'})
        this.$store.commit('LOGOUT')
      },
      test (e) {
        var ele = document.querySelector('.fixed_header')
        if (!ele) return false
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (scrollTop > 0 || this.showNav) {
          ele.className = 'fixed_header bg_opacity'
          this.scroll = true
        } else {
          ele.className = 'fixed_header'
          this.scroll = false
        }
      },
      updateClass () {
        var path = this.$route.path
        this.headerClass = ''
        for (var i in this.path) {
          for (var j = 0; j < this.path[i].length; j++) {
            if (path.includes(this.path[i][j])) {
              this.headerClass += i + ' '
              break
            }
          }
        }
        if (!this.headerClass.includes('frame_header')) {
          this.headerClass += 'fixed_header' + ' '
        }
      }
    },
    filters: {
      format: api.telReadable
    },
    watch: {
      '$route': 'updateClass'
    },
    components: {
      MobileHeader,
      PcHeader
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../../assets/css/style.scss';
  @import '../../../assets/fonts/iconfont.css';
  header{
    .box{
      @include main
      @include flex(space-between)
      height:80px;
      line-height: 80px;
      .nav_left1{
        width:74%;
        @include flex
        .logo{
          display: inline-block;
          width: 140px;
          height: 29px;
          margin-right:60px;
        }
        nav{
          @include flex
          .item{
            height:80px;
            line-height: 80px;
            text-align:center;
            width:100px;
            a{
              position: relative;
              font-size: 16px;
            }
            &.active a,&:hover a{
              color: #327fff;
            }
            .router-link-active{
              color: #327fff;
            }
            &.active a::after,&:hover a::after{
              position: absolute;
              top:10px;
              left:-12px;
              content: "";
              width: 4.5px;
              height: 4.5px;
              background: #327fff;
              font-size: 12px;
            }
          }
          span{
            color:$light_text;
            margin-left:-45px;
            padding-left:15px;
            border-left:1px solid $border
          }
        }
      }
      .side_nav{
        a{
          @include gap(10,h)
          &.btn{
            line-height: 1.8;
            @include gap(0,h)
            display: inline-block;
            width:70px;
            text-align: center;
            margin-left:10px;
            border-radius:3px;
            background:$blue;
            color:$white
          }
        }
      }
    }
    &[disabled]{
      display: none;
    }
    &.fixed_header{
      @include position(0,0,auto,0)
      position: fixed;
      z-index: 5;
      &.bg_opacity{
        background: rgba(0,0,0,.8);
      }
      .box .logo{
        background: url('../../../assets/images/css_sprites.png') -10px -364px;
      }
      a{
        color:$white
      }
      .tel{
        color:$white
      }
    }
    &.frame_header{
      .box{
        .logo{
          background: url('../../../assets/images/css_sprites.png') -170px -364px;
        }
        nav .item{
          a{
            color:$text;
          }
          &.active a::after,&:hover a::after{
            color: balck;
          }
        }
        .side_nav{
          a{
            color:$text;
          }
          .text{
            color:$light_text;
            a{
              color:$blue
            }
          }
          .tel{
            color: $blue;
            font-weight: bold;
          }
          .btn{
            color:$white
          }
        }
      }
    }
    &.web_box{
      background: #242528;
      .box .logo{
        background: url('../../../assets/images/css_sprites.png') -10px -364px;
      }
      .box nav .item a,.box .side_nav a,.box .side_nav a.tel{
        color:#fff
      }
      nav .item{
        &.active a::after,&:hover a::after{
          color:#fff
        }
      }
    }
    &.border{
      border-bottom:1px solid $light_text;
    }
    &.shadow{
      position: relative;
      z-index: 2;
      box-shadow:0px 4px 7px 0px rgba(138, 126, 126, 0.21);
      &.bg_opacity{
        background: transparent
      }
      nav span{
        line-height: 1.5;
      }
    }
  }
</style>
