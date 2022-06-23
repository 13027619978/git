import Vue from 'vue'
import Router from 'vue-router'
/**
 * 圆明园部分
 */
// 圆明园交通船
import YmyjtcView from '@/components/YmyjtcView'
// 圆明园自驾车
import YmyzjcView from '@/components/YmyzjcView'
// 圆明园藻园门自驾车
import YmyzymzjcView from '@/components/YmyzymzjcView'
// 圆明园自驾车竖屏
import YmyzjcspView from '@/components/YmyzjcspView'
// 圆明园自驾船竖屏
import YmydpcspView from '@/components/YmydpcspView'
// 圆明园自驾船
import YmydpcView from '@/components/YmydpcView'
// 圆明园运营大数据
import YmyyydsjView from '@/components/YmyyydsjView'

/**
 * 邢台园博园部分
 */
import XtybyzjcView from '@/components/XtybyzjcView'

/**
 * 玄武湖部分
 */
import XwhtestView from '@/components/XwhtestView'
// 玄武湖和平门码头
import XwhhpmView from '@/components/XwhhpmView'
// 玄武湖玄武门南码头
import XwhxwmnView from '@/components/XwhxwmnView'
// 玄武湖环洲码头
import XwhhzView from '@/components/XwhhzView'
// 玄武湖阳光码头
import XwhygView from '@/components/XwhygView'
// 玄武湖翠洲门码头
import XwhczmView from '@/components/XwhczmView'
// 玄武湖后湖印月码头
import XwhhhyyView from '@/components/XwhhhyyView'
// 玄武湖郭璞敦码头
import XwhgpdView from '@/components/XwhgpdView'
// 玄武湖玄武门北码头
import XwhxwmbView from '@/components/XwhxwmbView'
// 玄武湖芳桥码头
import XwhfqView from '@/components/XwhfqView'
// 玄武湖苔菱堤码头
import XwhtldView from '@/components/XwhtldView'
// 玄武湖解放门码头
import XwhjfmView from '@/components/XwhjfmView'
// 玄武湖菱洲码头
import XwhlzView from '@/components/XwhlzView'
// 玄武湖电瓶车指挥中心
import XwhdpczhzxView from '@/components/XwhdpczhzxView'
// 玄武湖新电瓶车指挥中心
import NewXwhdpczhzxView from '@/components/NewXwhdpczhzxView'
// 玄武湖电瓶船指挥中心
import XwhzhzxView from '@/components/XwhzhzxView'

// 南湖部分
// 南湖自行车
import NhzxcView from '@/components/NhzxcView'
import NhzxcVerticalView from '@/components/NhzxcVerticalView'

// 地灾项目
import DzView from '@/components/DzView'

// 野鸭湖
// 野鸭湖电瓶船
import YyhdpcView from '@/components/YyhdpcView.vue'
import YyhzxcView from '@/components/YyhzxcView.vue'

// 园博园
// 游客中心
import YbyykzxView from '@/components/YbyykzxView.vue'
// 电瓶车指挥中心
import YbydpczhzxView from '@/components/YbydpczhzxView.vue'
// 园博园运营指挥
import YbyyyzhView from '@/components/YbyyyzhView.vue'

// 种子大会
import ZzdhView from '@/components/zzdhView.vue'

// 雁栖湖
import YqhdpczhzxView from '@/components/yqhdpczhzxView.vue'
import YqhdpcView from '@/components/YqhdpcView.vue'

// 云龙湖
import YlhRefundView from '@/components/YlhRefundView.vue'
import YlhzhzxView from '@/components/YlhzhzxView.vue'
import YlhszgView from '@/components/YlhszgView.vue'
import YlhsdView from '@/components/YlhsdView.vue'
import YlhdpczhzxView from '@/components/YlhdpczhzxView.vue'

// 南北湖
import NbhRefundView from '@/components/NbhRefundView.vue'
import NbhPhtView from '@/components/NbhPhtView.vue'
import NbhzhzxView from '@/components/NbhzhzxView.vue'
import NbhdpczhzxView from '@/components/NbhdpczhzxView.vue'

// 大兴停车场
import DxtcczhzxView from '@/components/DxtcczhzxView.vue'

// 防诈骗App下载统计
import FzpView from '@/components/FzpView.vue'

// 什刹海
import SchykzxView from '@/components/SchykzxView.vue'
import SchykView from '@/components/SchykView.vue'

// 北海
import BhdpcView from '@/components/BhdpcView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ymyjtcView',
      name: 'YmyjtcView',
      component: YmyjtcView
    },
    {
      path: '/ymyyydsjView',
      name: 'YmyyydsjView',
      component: YmyyydsjView
    },
    {
      path: '/ymyzjcView',
      name: 'YmyzjcView',
      component: YmyzjcView
    },
    {
      path: '/ymyzymzjcView',
      name: 'YmyzymzjcView',
      component: YmyzymzjcView
    },
    {
      path: '/ymyzjcspView',
      name: 'YmyzjcspView',
      component: YmyzjcspView
    },
    {
      path: '/ymydpcspView',
      name: 'YmydpcspView',
      component: YmydpcspView
    },
    {
      path: '/ymydpcView',
      name: 'YmydpcView',
      component: YmydpcView
    },
    {
      path: '/XwhzhzxView',
      name: 'XwhzhzxView',
      component: XwhzhzxView
    },
    {
      path: '/xwhhzView',
      name: 'XwhhzView',
      component: XwhhzView
    },
    {
      path: '/xwhxwmbView',
      name: 'XwhxwmbView',
      component: XwhxwmbView
    },
    {
      path: '/xwhhpmView',
      name: 'XwhhpmView',
      component: XwhhpmView
    },
    {
      path: '/xwhxwmnView',
      name: 'XwhxwmnView',
      component: XwhxwmnView
    },
    {
      path: '/xwhygView',
      name: 'XwhygView',
      component: XwhygView
    },
    {
      path: '/xwhczmView',
      name: 'XwhczmView',
      component: XwhczmView
    },
    {
      path: '/xwhhhyyView',
      name: 'XwhhhyyView',
      component: XwhhhyyView
    },
    {
      path: '/xwhgpdView',
      name: 'XwhgpdView',
      component: XwhgpdView
    },
    {
      path: '/xwhfqView',
      name: 'XwhfqView',
      component: XwhfqView
    },
    {
      path: '/xwhtldView',
      name: 'XwhtldView',
      component: XwhtldView
    },
    {
      path: '/xwhjfmView',
      name: 'XwhjfmView',
      component: XwhjfmView
    },
    {
      path: '/xwhlzView',
      name: 'XwhlzView',
      component: XwhlzView
    },
    {
      path: '/xwhtestView',
      name: 'XwhtestView',
      component: XwhtestView
    },
    {
      path: '/xwhdpczhzxView',
      name: 'XwhdpczhzxView',
      component: XwhdpczhzxView
    },
    {
      path: '/newxwhdpczhzxView',
      name: 'NewXwhdpczhzxView',
      component: NewXwhdpczhzxView
    },
    {
      path: '/nhzxcView',
      name: 'NhzxcView',
      component: NhzxcView
    },
    {
      path: '/nhzxcVerticalView',
      name: 'NhzxcVerticalView',
      component: NhzxcVerticalView
    },
    {
      path: '/dzView',
      name: 'DzView',
      component: DzView
    },
    {
      path: '/yyhdpcView',
      name: 'YyhdpcView',
      component: YyhdpcView
    },
    {
      path: '/yyhzxcView',
      name: 'YyhzxcView',
      component: YyhzxcView
    },
    {
      path: '/ybyykzxView',
      name: 'YbyykzxView',
      component: YbyykzxView
    },
    {
      path: '/ybyyyzhView',
      name: 'YbyyyzhView',
      component: YbyyyzhView
    },
    {
      path: '/ybydpczhzxView',
      name: 'YbydpczhzxView',
      component: YbydpczhzxView
    },
    {
      path: '/zzdhView',
      name: 'ZzdhView',
      component: ZzdhView
    },
    {
      path: '/yqhdpczhzxView',
      name: 'YqhdpczhzxView',
      component: YqhdpczhzxView
    },
    {
      path: '/yqhdpcView',
      name: 'YqhdpcView',
      component: YqhdpcView
    },
    {
      path: '/ylhrefundView',
      name: 'YlhRefundView',
      component: YlhRefundView
    },
    {
      path: '/ylhzhzxView',
      name: 'YlhzhzxView',
      component: YlhzhzxView
    },
    {
      path: '/ylhszgView',
      name: 'YlhszgView',
      component: YlhszgView
    },
    {
      path: '/ylhsdView',
      name: 'YlhsdView',
      component: YlhsdView
    },
    {
      path: '/ylhdpczhzxView',
      name: 'YlhdpczhzxView',
      component: YlhdpczhzxView
    },
    {
      path: '/nbhrefundView',
      name: 'NbhRefundView',
      component: NbhRefundView
    },
    {
      path: '/nbhzhzxView',
      name: 'NbhzhzxView',
      component: NbhzhzxView
    },
    {
      path: '/nbhdpczhzxView',
      name: 'NbhdpczhzxView',
      component: NbhdpczhzxView
    },
    {
      path: '/nbhPhtView',
      name: 'NbhPhtView',
      component: NbhPhtView
    },
    {
      path: '/dxtcczhzxView',
      name: 'DxtcczhzxView',
      component: DxtcczhzxView
    },
    {
      path: '/fzpView',
      name: 'FzpView',
      component: FzpView
    },
    {
      path: '/schykzxView',
      name: 'SchykzxView',
      component: SchykzxView
    },
    {
      path: '/schykView',
      name: 'SchykView',
      component: SchykView
    },
    {
      path: '/xtybyzjcView',
      name: 'XtybyzjcView',
      component: XtybyzjcView
    },
    {
      path: '/bhdpcView',
      name: 'BhdpcView',
      component: BhdpcView
    }
  ]
})
