<template>
  <article class="home">
    <Swiper :pagination-visible="true" :loop="true" :autoPlay="5000"></Swiper>
    <MyData></MyData>
    <div class="wq">
      <img :src="wqImg" alt="" class="pre">
      <div class="text">
        <img src="../../assets/images/server.png" style="width:800px;display:block;margin:0 auto;"/>
        <router-link to="/minerShop/list">即刻体验</router-link>
      </div>
    </div>
    <div class="home_text">
      <div class="main">
        <div class="list">
          <div class="item" v-for="a,k in ad.items">
            <span :class="['iconfont', 'icon'+k]"></span>
            <h3>{{a.title}}</h3>
            <div class="line"></div>
            <p v-html="a.desc"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="home_title">
      <div class="main">
        <h1>{{ad.title}}</h1>
        <p>{{ad.desc}}</p>
        <div class="list">
          <div class="item" v-for="s,k in suanLi">
            <div class="iconfont"></div>
            <div class="item_title">{{s.title}}</div>
            <div class="item_desc">{{s.desc}}</div>
          </div><div class="item"></div>
        </div>
      </div>
    </div>
    <div :class="['my_map', {active: dataSrc===1||dataSrc===2||dataSrc===3}]">
      <div class="main">
        <h3>遍布全球，持续扩张的数据中心让跨域体验更流畅</h3>
        <div class="data_title">
          <div :class="['item', {active: k===dataSrc}]" v-for="dt,k in dataTitle" @click="setData(k)">{{dt}}</div>
        </div>
        <DataChart class="data_chart" v-if="dataSrc===1||dataSrc===2" :mapType="mapType"></DataChart>
        <DataChart2 class="data_chart2" v-else-if="dataSrc===3"></DataChart2>
        <DataMap class="data_chart" v-else></DataMap>
      </div>
    </div>
    <WebInfo></WebInfo>
    <div class="partner">
      <div class="box">
        <h3>战略合作伙伴</h3>
        <div class="list">
          <div class="item" v-for="i in 7" v-if="i!==2">
            <div :class="'img img'+i"></div>
            <div :class="'img_hover img_hover'+i"></div>
          </div>
        </div>
      </div>
    </div>
    <SideBar></SideBar>
  </article>
</template>

<script>
  import Swiper from '@/components/common/Swipe'
  import MyData from '@/components/home/dataList'
  import WebInfo from '@/components/home/WebInfo'
  import SideBar from '@/components/home/SideBar'
  import DataChart from '@/components/home/DataChart'
  import DataChart2 from '@/components/home/DataChart2'
  import DataMap from '@/components/home/DataMap'
  export default {
    components: {
      Swiper, MyData, WebInfo, SideBar, DataChart, DataMap, DataChart2
    },
    data () {
      return {
        ad: {title: '算力驱动未来，信任链接天下', desc: '全球算力产业链资源整合，基于区块链的分布式算力输出平台', items: [{title: '项目合规', desc: '所有项目出具法律意见书<br>并公开法律意见书'}, {title: '用电合规', desc: '项目为政府招商引资项目<br>全部国网供电，电力稳定持久'}, {title: '透明收益', desc: '全流程产业链对接，信息透明<br>避免踩坑'}, {title: '全程存证', desc: '对接保全网区块链电子凭证技术<br>实现全部在线协议的合规有效'}, {title: '算力管家', desc: '为用户投资的每一份算力<br>提供贴心的远程管家服务'}]},
        wqImg: require('@/assets/images/img.jpg'),
        suanLi: [{title: 'SHA256比特币算力', desc: 'Bitcoin数字货币算力', icon: 'ELbobeicesuan'}, {title: '卷积神经算法算力', desc: '为CNN卷积神经网络提供分布式加速服务', icon: 'guanlianxitongwenbenqueren'}, {title: 'EquiHash零币算力', desc: 'ZeroCASH提供隐私保护及零知识证明的基础算力', icon: 'wodegongzuo-liebiao'}, {title: '智能合约算力', desc: '全球贸易智能合约服务的分布式基础算力', icon: 'dianzihetongshenqing'}, {title: 'Curecoin算力', desc: '蛋白质折叠计算，生化反应模型，用于发现新药', icon: 'hebaoshenpi'}, {title: 'Scrypt莱特币算力', desc: 'Litecoin数字货币算力', icon: 'xinxichaxun'}, {title: '游戏币兑换算力', desc: '全球游戏产业虚拟货币通用兑换算力', icon: 'jiedongzhiquzhihang'}, {title: 'Ethash以太算力', desc: '以太坊网络，ETCETH算力', icon: 'yewuchaxun'}, {title: '公证算力', desc: '提供区块链公证服务，存证保全的基础算力', icon: 'shouqushenqingchaxun'}],
        dataTitle: ['算力网BDC中心分布', '比特币全球节点数', '算力网注册用户数', '交易总算力'],
        dataSrc: 0,
        mapType: 1
      }
    },
    methods: {
      setData (n) {
        this.dataSrc = n
        if (n === 1) {
          this.mapType = 1
        } else {
          this.mapType = 0
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  @import '../../assets/css/style.scss';
  @import '../../assets/fonts/iconfont.css';
  .home{
    .home_title{
      .main{
        @include main
        @include gap(30,v,margin)
        h1,p{
          text-align: center
        }
        h1{
          font-size: 30px;
          line-height: 1.8;
        }
        p{
          font-size: 18px
        }
        .list{
          @include row(5,0)
          margin-top:20px;
          border-bottom: 1px solid $border;
          border-right: 1px solid $border;
          .item{
            text-align: center;
            border-top: 1px solid $border;
            border-left: 1px solid $border;
            padding:15px;
            height:146px;
            .item_title{
              font-size: 18px;
              margin-bottom:10px
            }
            .item_desc{
              text-align: left;
              color:$light_black;
            }
            &:nth-child(1),&:nth-child(6),&:nth-child(8){
              .item_desc{
                text-align: center
              }
            }
            & .iconfont{
              font-size: 36px;
              color:#538fee;
              line-height: 1;
            }
            &:nth-child(1) .iconfont:before{
              content:'\e6ca'
            }
            &:nth-child(2) .iconfont:before{
              content:'\e6cd'
            }
            &:nth-child(3) .iconfont:before{
              content:'\e6d8'
            }
            &:nth-child(4) .iconfont:before{
              content:'\e6cb'
            }
            &:nth-child(5) .iconfont:before{
              content:'\e6ce'
            }
            &:nth-child(6) .iconfont:before{
              content:'\e6dd'
            }
            &:nth-child(7) .iconfont:before{
              content:'\e6d0'
            }
            &:nth-child(8) .iconfont:before{
              content:'\e6dc'
            }
            &:nth-child(9) .iconfont:before{
              content:'\e6da'
            }
            &:not(:last-child):hover{
              background: $blue;
              &,.iconfont,.item_desc{
                color:$white
              }
            }
            &:nth-child(10){
              position: relative;
              display: inline-block;
              vertical-align:middle;
              &:before,&:after{
                position: absolute;
                content: "";
                background: #999;
              }
              &:before{
                left: calc(50% - 15px);
                top: calc(50% - .5px);
                width: 30px;
                height: 1px;
              }
              &:after{
                top: calc(50% - 15px);
                left: calc(50% - .5px);
                height: 30px;
                width: 1px;
              }
            }
          }
        }
      }
    }
    .home_text{
      background:#f7f8fa;
      border-bottom:1px solid $border;
      .main{
        @include main
        line-height: 2;
        .list{
          @include flex
          border:1px solid $border;
          border-top:0;
          border-bottom:0;
          .item{
            position: relative;
            height: 170px;
            width:20%;
            padding:20px;
            padding-right:18px;
            &:not(:last-child){
              border-right:1px solid $border;
            }
            h3{
              font-size: 20px;
            }
            .line{
              width:45px;
              border-bottom:2px solid $blue;
              margin-top:5px;
              margin-bottom:7px;
            }
            p{
              position: relative;
              text-align: left;
              line-height: 1.5;
              font-size: 14px;
              color:$light_text;
              z-index: 2;
            }
            span{
              position: absolute;
              top:calc(50% - 35px);
              right:20px;
              @include block(70)
              &:before{
                font-size: 70px;
                color:#e6e6e6
              }
            }
            .icon0:before{
              content: "\e60a"
            }
            .icon1:before{
              content: "\e60b"
            }
            .icon2:before{
              content: "\e606"
            }
            .icon3:before{
              content: "\e604"
            }
            .icon4:before{
              content: "\e608"
            }
            &:hover{
              background: $white;
              h3{
                color:$blue
              }
            }
          }
        }
      }
    }
    .wq{
      position: relative;
      height:315px;
      overflow: hidden;
      .pre{
        @include position
        height:100%;
        object-fit:cover;
        z-index: -1;
        transition:2s;
      }
      &:hover .pre{
        transform:scale(1.1); 
      }
      .text{
        margin-top:85px;
        @include main
        text-align: center;
        h2{
          font-size: 30px;
          margin-bottom:20px;
          color:$white
        }
        p{
          font-size: 16px;
          color:#d7d8d9
        }
        a{
          display: inline-block;
          padding:10px 50px;
          border-radius:5px;
          @include button($blue)
          margin-top:30px;
          &:hover{
            background:#166cfb;
            border:1px solid #166cfb;
          }
        }
      }
    }
    .my_map{
      &:not(.active){
        background: #333333;
        color:#fff;
      }
      .main{
        @include main
        h3{
          font-size: 24px;
          padding-top:30px;
          margin-bottom:20px;
          text-align: center;
        }
        .data_title{
          @include flex(center);
          .item{
            margin:0 20px;
            padding-bottom:10px;
            cursor: pointer;
            color:#999;
            border-bottom: 2px solid transparent;
            &.active,&:hover{
              color:#32b4ff;
              border-color:#32b4ff;
            }
          }
        }
        .data_chart{
          padding:30px 0
        }
      }
    }
    .partner{
      .box{
        @include main
        text-align: center;
        margin-bottom:60px;
        h3{
          font-size: 24px;
          margin-bottom:30px
        }
        .list{
          @include row(6,0)
          border-left:1px solid $border;
          border-top:1px solid $border;
          .item{
            height:80px;
            line-height: 80px;
            text-align: center;
            border-right:1px solid $border;
            border-bottom:1px solid $border;
            @include flex(center)
            &:hover .date{
             color:#ff721f;
            }
            .img,&:hover .img_hover{
              display: none;
            }
            .img_hover,&:hover .img{
              display: inline-block;
            }
            .img1,.img_hover1{
              height: 49px;
              width: 150px;
            }
            .img1{
              background: url('../../assets/images/partner.png') -10px -216px;
            }
            .img_hover1{
              background: url('../../assets/images/partner.png') -180px -216px;
            }
            // .img2,.img_hover2{
            //   height: 50px;
            //   width: 180px;
            // }
            // .img2{
            //   background: url('../assets/images/partner.png') -360px -117px;
            // }
            // .img_hover2{
            //   background: url('../assets/images/partner.png') -0px -171px;
            // }
            .img3,.img_hover3{
              height: 49px;
              width: 150px;
            }
            .img3{
              background: url('../../assets/images/partner.png') -180px -10px;
            }
            .img_hover3{
              background: url('../../assets/images/partner.png') -180px -79px;
            }
            .img4,.img_hover4{
              height: 46px;
              width: 150px;
            }
            .img4{
              background: url('../../assets/images/partner.png') -10px -150px;
            }
            .img_hover4{
              background: url('../../assets/images/partner.png') -180px -150px;
            }
            .img5,.img_hover5{
              height: 32px;
              width: 150px;
            }
            .img5{
              background: url('../../assets/images/partner.png') -10px -281px;
            }
            .img_hover5{
              background: url('../../assets/images/partner.png') -180px -281px;
            }
            .img6,.img_hover6{
              height: 50px;
              width: 150px;
            }
            .img6{
              background: url('../../assets/images/partner.png') -10px -10px;
            }
            .img_hover6{
              background: url('../../assets/images/partner.png') -10px -80px;
            }
            .img7,.img_hover7{
              height: 20px;
              width: 150px;
            }
            .img7{
              background: url('../../assets/images/partner.png') -350px -10px;
            }
            .img_hover7{
              background: url('../../assets/images/partner.png') -350px -50px;
            }
          }
        }
      }
    }
  }
</style>
