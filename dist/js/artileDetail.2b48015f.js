(self["webpackChunkheima_toutiao_app"]=self["webpackChunkheima_toutiao_app"]||[]).push([[752],{3509:function(t,n,e){"use strict";e.r(n),e.d(n,{default:function(){return $}});var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("van-nav-bar",{attrs:{fixed:"",title:"文章详情","left-arrow":""},on:{"click-left":function(n){return t.$router.back()}}}),0===Object.keys(t.newDetailsList).length?e("van-loading",{attrs:{color:"#0094ff"}},[t._v("加载中...")]):e("div",[e("div",{staticClass:"article-container"},[e("h1",{staticClass:"art-title"},[t._v(t._s(t.newDetailsList.title))]),e("van-cell",{attrs:{center:"",title:t.newDetailsList.aut_name,label:t.dateReset(t.newDetailsList.pubdate)},scopedSlots:t._u([{key:"icon",fn:function(){return[e("img",{staticClass:"avatar",attrs:{src:t.newDetailsList.aut_photo,alt:""}})]},proxy:!0},{key:"default",fn:function(){return[e("div",[t.newDetailsList.is_followed?e("van-button",{attrs:{type:"info",size:"mini"},on:{click:function(n){return t.followedFn(!0)}}},[t._v("已关注")]):e("van-button",{attrs:{icon:"plus",type:"info",size:"mini",plain:""},on:{click:function(n){return t.followedFn(!1)}}},[t._v("关注")])],1)]},proxy:!0}])}),e("van-divider"),e("div",{staticClass:"art-content",domProps:{innerHTML:t._s(t.newDetailsList.content)}}),e("van-divider",[t._v("End")]),e("div",{staticClass:"like-box"},[1===t.newDetailsList.attitude?e("van-button",{attrs:{icon:"good-job",type:"danger",size:"small"},on:{click:function(n){return t.attitudeFn(!0)}}},[t._v("已点赞")]):e("van-button",{attrs:{icon:"good-job-o",type:"danger",plain:"",size:"small"},on:{click:function(n){return t.attitudeFn(!1)}}},[t._v("点赞")])],1)],1),e("comment-list")],1)],1)},s=[],a=e(8364),r=e(4023),o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{class:{"art-cmt-container-1":t.isShow,"art-cmt-container-2":!t.isShow}},[e("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多评论数据了,请发布哦","immediate-check":!1},on:{load:t.onLoad},model:{value:t.loading,callback:function(n){t.loading=n},expression:"loading"}},[e("div",{staticClass:"cmt-list"},t._l(t.list,(function(n,i){return e("div",{key:i,staticClass:"cmt-item"},[e("div",{staticClass:"cmt-header"},[e("div",{staticClass:"cmt-header-left"},[e("img",{staticClass:"avatar",attrs:{src:n.aut_photo,alt:""}}),e("span",{staticClass:"uname"},[t._v(t._s(n.aut_name))])]),e("div",{staticClass:"cmt-header-right"},[n.is_liking?e("van-icon",{attrs:{name:"like",size:"16",color:"red"},on:{click:function(e){return t.likingFn(!0,n)}}}):e("van-icon",{attrs:{name:"like-o",size:"16",color:"gray"},on:{click:function(e){return t.likingFn(!1,n)}}})],1)]),e("div",{staticClass:"cmt-body"},[t._v(t._s(n.content))]),e("div",{staticClass:"cmt-footer"},[t._v(t._s(t.dateReset(n.pubdate)))])])})),0)]),t.isShow?e("div",{staticClass:"add-cmt-box van-hairline--top"},[e("van-icon",{attrs:{name:"arrow-left",size:"0.48rem"},on:{click:function(n){return t.$router.back()}}}),e("div",{staticClass:"ipt-cmt-div",on:{click:t.showCmt}},[t._v("发表评论")]),e("div",{staticClass:"icon-box"},[e("van-badge",{attrs:{content:t.total_count?t.total_count:"",max:"99"}},[e("van-icon",{attrs:{name:"comment-o",size:"5.333333vw"},on:{click:t.moveFn}})],1),e("van-icon",{attrs:{name:"star-o",size:"5.333333vw"}}),e("van-icon",{attrs:{name:"share-o",size:"5.333333vw"}})],1)],1):e("div",{staticClass:"cmt-box van-hairline--top"},[e("textarea",{directives:[{name:"inputFocus",rawName:"v-inputFocus"},{name:"model",rawName:"v-model",value:t.content,expression:"content"}],attrs:{placeholder:"友善评论、理性发言、阳光心灵"},domProps:{value:t.content},on:{blur:t.textareaBlur,input:function(n){n.target.composing||(t.content=n.target.value)}}}),e("van-button",{attrs:{type:"default",disabled:0===t.content.length},on:{click:t.contentFn}},[t._v("发布")])],1)],1)},u=[],c={data(){return{offset:null,list:[],dateReset:r.S,isShow:!0,total_count:0,content:"",loading:!1,finished:!1}},methods:{async getCommentsFn(){const t=await(0,a.nr)({id:this.$route.query.art_id});this.list=t.data.data.results,this.total_count=t.data.data.total_count,this.offset=t.data.data.last_id,console.log(this.list),0===t.data.data.results.length&&(this.finished=!0)},async likingFn(t,n){t?(n.is_liking=!1,await(0,a.SZ)({commentId:n.com_id})):(n.is_liking=!0,await(0,a.uj)({commentId:n.com_id}))},showCmt(){this.isShow=!1},async moveFn(){document.querySelector(".like-box").scrollIntoView({behavior:"smooth"})},async contentFn(){try{const t=await(0,a.s7)({id:this.$route.query.art_id,content:this.content});this.list.unshift(t.data.data.new_obj),this.total_count++,this.content="",console.log(t.data.data)}catch(t){this.$toast.fail("发布评论失败")}},textareaBlur(){setTimeout((()=>{this.isShow=!0}),0)},async onLoad(){if(console.log("触底了"),this.list.length>0){const t=await(0,a.nr)({id:this.$route.query.art_id,offset:this.offset});this.list=[...this.list,...t.data.data.results],this.offset=t.data.data.last_id,this.total_count=t.data.data.total_count,null===t.data.data.last_id&&(this.finished=!0,console.log("没有内容了")),this.loading=!1}else this.loading=!1}},created(){this.getCommentsFn()}},l=c,d=e(1001),h=(0,d.Z)(l,o,u,!1,null,"6119412a",null),f=h.exports,m={name:"artileDetail",components:{commentList:f},data(){return{newDetailsList:{},dateReset:r.S}},methods:{async getNewDetailsFn(){const t=await(0,a.C$)({article_id:this.$route.query.art_id});this.newDetailsList=t.data.data},async followedFn(t){t?(console.log("取消关注"),this.newDetailsList.is_followed=!1,await(0,a.D5)({userId:this.newDetailsList.aut_id})):(console.log("关注"),this.newDetailsList.is_followed=!0,await(0,a.Xy)({userId:this.newDetailsList.aut_id}))},async attitudeFn(t){t?(console.log("取消点赞"),this.newDetailsList.attitude=0,await(0,a.ZR)({articleId:this.newDetailsList.art_id})):(console.log("点赞"),this.newDetailsList.attitude=1,await(0,a._T)({articleId:this.newDetailsList.art_id}))}},created(){this.getNewDetailsFn()}},_=m,v=(0,d.Z)(_,i,s,!1,null,"a80aaa00",null),$=v.exports},3189:function(t){!function(n,e){t.exports=e()}(0,(function(){"use strict";var t=1e3,n=6e4,e=36e5,i="millisecond",s="second",a="minute",r="hour",o="day",u="week",c="month",l="quarter",d="year",h="date",f="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,_=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,n,e){var i=String(t);return!i||i.length>=n?t:""+Array(n+1-i.length).join(e)+t},y={s:$,z:function(t){var n=-t.utcOffset(),e=Math.abs(n),i=Math.floor(e/60),s=e%60;return(n<=0?"+":"-")+$(i,2,"0")+":"+$(s,2,"0")},m:function t(n,e){if(n.date()<e.date())return-t(e,n);var i=12*(e.year()-n.year())+(e.month()-n.month()),s=n.clone().add(i,c),a=e-s<0,r=n.clone().add(i+(a?-1:1),c);return+(-(i+(e-s)/(a?s-r:r-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:d,w:u,d:o,D:h,h:r,m:a,s:s,ms:i,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},w="en",p={};p[w]=v;var g=function(t){return t instanceof Y},D=function t(n,e,i){var s;if(!n)return w;if("string"==typeof n){var a=n.toLowerCase();p[a]&&(s=a),e&&(p[a]=e,s=a);var r=n.split("-");if(!s&&r.length>1)return t(r[0])}else{var o=n.name;p[o]=n,s=o}return!i&&s&&(w=s),s||!i&&w},M=function(t,n){if(g(t))return t.clone();var e="object"==typeof n?n:{};return e.date=t,e.args=arguments,new Y(e)},S=y;S.l=D,S.i=g,S.w=function(t,n){return M(t,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var Y=function(){function v(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=v.prototype;return $.parse=function(t){this.$d=function(t){var n=t.date,e=t.utc;if(null===n)return new Date(NaN);if(S.u(n))return new Date;if(n instanceof Date)return new Date(n);if("string"==typeof n&&!/Z$/i.test(n)){var i=n.match(m);if(i){var s=i[2]-1||0,a=(i[7]||"0").substring(0,3);return e?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)}}return new Date(n)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return S},$.isValid=function(){return!(this.$d.toString()===f)},$.isSame=function(t,n){var e=M(t);return this.startOf(n)<=e&&e<=this.endOf(n)},$.isAfter=function(t,n){return M(t)<this.startOf(n)},$.isBefore=function(t,n){return this.endOf(n)<M(t)},$.$g=function(t,n,e){return S.u(t)?this[n]:this.set(e,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,n){var e=this,i=!!S.u(n)||n,l=S.p(t),f=function(t,n){var s=S.w(e.$u?Date.UTC(e.$y,n,t):new Date(e.$y,n,t),e);return i?s:s.endOf(o)},m=function(t,n){return S.w(e.toDate()[t].apply(e.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(n)),e)},_=this.$W,v=this.$M,$=this.$D,y="set"+(this.$u?"UTC":"");switch(l){case d:return i?f(1,0):f(31,11);case c:return i?f(1,v):f(0,v+1);case u:var w=this.$locale().weekStart||0,p=(_<w?_+7:_)-w;return f(i?$-p:$+(6-p),v);case o:case h:return m(y+"Hours",0);case r:return m(y+"Minutes",1);case a:return m(y+"Seconds",2);case s:return m(y+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(t,n){var e,u=S.p(t),l="set"+(this.$u?"UTC":""),f=(e={},e[o]=l+"Date",e[h]=l+"Date",e[c]=l+"Month",e[d]=l+"FullYear",e[r]=l+"Hours",e[a]=l+"Minutes",e[s]=l+"Seconds",e[i]=l+"Milliseconds",e)[u],m=u===o?this.$D+(n-this.$W):n;if(u===c||u===d){var _=this.clone().set(h,1);_.$d[f](m),_.init(),this.$d=_.set(h,Math.min(this.$D,_.daysInMonth())).$d}else f&&this.$d[f](m);return this.init(),this},$.set=function(t,n){return this.clone().$set(t,n)},$.get=function(t){return this[S.p(t)]()},$.add=function(i,l){var h,f=this;i=Number(i);var m=S.p(l),_=function(t){var n=M(f);return S.w(n.date(n.date()+Math.round(t*i)),f)};if(m===c)return this.set(c,this.$M+i);if(m===d)return this.set(d,this.$y+i);if(m===o)return _(1);if(m===u)return _(7);var v=(h={},h[a]=n,h[r]=e,h[s]=t,h)[m]||1,$=this.$d.getTime()+i*v;return S.w($,this)},$.subtract=function(t,n){return this.add(-1*t,n)},$.format=function(t){var n=this,e=this.$locale();if(!this.isValid())return e.invalidDate||f;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=S.z(this),a=this.$H,r=this.$m,o=this.$M,u=e.weekdays,c=e.months,l=function(t,e,s,a){return t&&(t[e]||t(n,i))||s[e].slice(0,a)},d=function(t){return S.s(a%12||12,t,"0")},h=e.meridiem||function(t,n,e){var i=t<12?"AM":"PM";return e?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:S.s(o+1,2,"0"),MMM:l(e.monthsShort,o,c,3),MMMM:l(c,o),D:this.$D,DD:S.s(this.$D,2,"0"),d:String(this.$W),dd:l(e.weekdaysMin,this.$W,u,2),ddd:l(e.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(a),HH:S.s(a,2,"0"),h:d(1),hh:d(2),a:h(a,r,!0),A:h(a,r,!1),m:String(r),mm:S.s(r,2,"0"),s:String(this.$s),ss:S.s(this.$s,2,"0"),SSS:S.s(this.$ms,3,"0"),Z:s};return i.replace(_,(function(t,n){return n||m[t]||s.replace(":","")}))},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(i,h,f){var m,_=S.p(h),v=M(i),$=(v.utcOffset()-this.utcOffset())*n,y=this-v,w=S.m(this,v);return w=(m={},m[d]=w/12,m[c]=w,m[l]=w/3,m[u]=(y-$)/6048e5,m[o]=(y-$)/864e5,m[r]=y/e,m[a]=y/n,m[s]=y/t,m)[_]||y,f?w:S.a(w)},$.daysInMonth=function(){return this.endOf(c).$D},$.$locale=function(){return p[this.$L]},$.locale=function(t,n){if(!t)return this.$L;var e=this.clone(),i=D(t,n,!0);return i&&(e.$L=i),e},$.clone=function(){return S.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},v}(),k=Y.prototype;return M.prototype=k,[["$ms",i],["$s",s],["$m",a],["$H",r],["$W",o],["$M",c],["$y",d],["$D",h]].forEach((function(t){k[t[1]]=function(n){return this.$g(n,t[0],t[1])}})),M.extend=function(t,n){return t.$i||(t(n,Y,M),t.$i=!0),M},M.locale=D,M.isDayjs=g,M.unix=function(t){return M(1e3*t)},M.en=p[w],M.Ls=p,M.p={},M}))},9319:function(t,n,e){!function(n,i){t.exports=i(e(3189))}(0,(function(t){"use strict";function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var e=n(t),i={name:"zh-cn",weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(t,n){return"W"===n?t+"周":t+"日"},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah点mm分",LLLL:"YYYY年M月D日ddddAh点mm分",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},meridiem:function(t,n){var e=100*t+n;return e<600?"凌晨":e<900?"早上":e<1100?"上午":e<1300?"中午":e<1800?"下午":"晚上"}};return e.default.locale(i,null,!0),i}))},190:function(t){!function(n,e){t.exports=e()}(0,(function(){"use strict";return function(t,n,e){t=t||{};var i=n.prototype,s={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function a(t,n,e,s){return i.fromToBase(t,n,e,s)}e.en.relativeTime=s,i.fromToBase=function(n,i,a,r,o){for(var u,c,l,d=a.$locale().relativeTime||s,h=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],f=h.length,m=0;m<f;m+=1){var _=h[m];_.d&&(u=r?e(n).diff(a,_.d,!0):a.diff(n,_.d,!0));var v=(t.rounding||Math.round)(Math.abs(u));if(l=u>0,v<=_.r||!_.r){v<=1&&m>0&&(_=h[m-1]);var $=d[_.l];o&&(v=o(""+v)),c="string"==typeof $?$.replace("%d",v):$(v,i,_.l,l);break}}if(i)return c;var y=l?d.future:d.past;return"function"==typeof y?y(c):y.replace("%s",c)},i.to=function(t,n){return a(t,n,this,!0)},i.from=function(t,n){return a(t,n,this)};var r=function(t){return t.$u?e.utc():e()};i.toNow=function(t){return this.to(r(this),t)},i.fromNow=function(t){return this.from(r(this),t)}}}))},4023:function(t,n,e){"use strict";e.d(n,{S:function(){return r},m:function(){return o}});var i=e(3189),s=e.n(i);e(9319);const a=e(190),r=t=>{s().extend(a),s().locale("zh-cn");const n=s()(),e=s()(t).from(n);return e},o=t=>s()(t).format("YYYY-MM-DD")}}]);
//# sourceMappingURL=artileDetail.2b48015f.js.map