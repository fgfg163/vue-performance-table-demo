(function(t){function e(e){for(var o,c,i=e[0],l=e[1],s=e[2],d=0,f=[];d<i.length;d++)c=i[d],a[c]&&f.push(a[c][0]),a[c]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);u&&u(e);while(f.length)f.shift()();return r.push.apply(r,s||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,i=1;i<n.length;i++){var l=n[i];0!==a[l]&&(o=!1)}o&&(r.splice(e--,1),t=c(c.s=n[0]))}return t}var o={},a={index:0},r=[];function c(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=o,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)c.d(n,o,function(e){return t[e]}.bind(null,o));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var s=0;s<i.length;s++)e(i[s]);var u=l;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("df31")},"26e6":function(t,e,n){},"3de3":function(t,e,n){"use strict";var o=n("e794"),a=n.n(o);a.a},df31:function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var o=n("2b0e"),a=n("76a0"),r=n.n(a),c=(n("aa35"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("mt-field",{attrs:{label:"行"},model:{value:t.rowNum,callback:function(e){t.rowNum=e},expression:"rowNum"}}),n("mt-field",{attrs:{label:"列"},model:{value:t.colNum,callback:function(e){t.colNum=e},expression:"colNum"}}),n("div",[n("mt-button",{attrs:{type:"default"},on:{click:t.handleOnLoadSyncClick}},[t._v("同步生成")]),n("mt-button",{attrs:{type:"default"},on:{click:t.handleOnLoadAsyncClick}},[t._v("异步生成")]),n("mt-button",{attrs:{type:"default"},on:{click:t.handleOnReloadClick}},[t._v("刷新页面")])],1),n("div",{staticClass:"cmd"},t._l(t.cmdList,function(e,o){return n("div",{key:o},[t._v(t._s(e))])})),n("v-table",{attrs:{"data-source":t.tableData}})],1)}),i=[],l=(n("1c4c"),n("96cf"),n("3040")),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"v-table-wrapper"},[n("mt-button",{ref:"thead",attrs:{type:"default"}},[t._v("测试")]),n("div",{staticClass:"v-table"},[n("table",[n("thead",{staticClass:"v-table-thead"},[n("tr",t._l(t.dataSource[0]||[],function(e,o){return n("th",{key:o},[t._v("title"+t._s(e))])}))]),n("tbody",{staticClass:"v-table-tbody"},t._l(t.dataSource,function(e,o){return n("tr",{key:o},t._l(e,function(e,o){return n("td",{key:o},[t._v(t._s(e))])}))}))])])],1)},u=[],d={name:"v-table",data:function(){return{}},props:{dataSource:{type:Array,default:function(){}}},methods:{handleOnScroll:function(){var t=this.$refs.thead;t=t.$el||t;var e=this.getElementTopLeft(t),n=e.top,o=e.left;n+t.clientHeight>window.pageYOffset&&window.pageYOffset+window.innerHeight>n&&o+t.clientWidth>window.pageXOffset&&window.pageXOffset+window.innerWidth>o?console.log("可见"):console.log("不可见")},getElementTopLeft:function(t){var e=0,n=0;while(t)e+=t.offsetTop,n+=t.offsetLeft,t=t.offsetParent;return{top:e,left:n}}},mounted:function(){window.addEventListener("scroll",this.handleOnScroll,!1)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleOnScroll)}},f=d,m=(n("3de3"),n("2877")),p=Object(m["a"])(f,s,u,!1,null,null,null);p.options.__file="v-table.vue";var h=p.exports,v=function(t){return new Promise(function(e){return setTimeout(e,t)})},b={name:"app",data:function(){return{cmdList:[],tableData:[],rowNum:100,colNum:100}},methods:{cmdListPush:function(t){this.cmdList.push(t),this.cmdList=this.cmdList},handleOnLoadSyncClick:function(){var t=this;Object(l["a"])(regeneratorRuntime.mark(function e(){var n,o,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=Date.now(),t.cmdList=[],t.cmdListPush("clear data"),t.tableData=[],e.next=6,v(100);case 6:return console.log("start loading"),t.cmdListPush("loading"),t.cmdList=t.cmdList,o=[],e.next=12,v(0);case 12:for(a=0;a<t.rowNum;a++)o.push(Array.from({length:t.colNum}).map(function(t,e){return e}));setTimeout(function(){var e=Date.now()-n;console.log("".concat(e,"ms")),console.log("loaded"),t.cmdListPush("".concat(e,"ms")),t.cmdList=t.cmdList,t.cmdListPush("loaded"),t.cmdList=t.cmdList},0),t.tableData=o;case 15:case"end":return e.stop()}},e,this)}))()},handleOnLoadAsyncClick:function(){var t=this;Object(l["a"])(regeneratorRuntime.mark(function e(){var n,o,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=Date.now(),t.cmdList=[],t.cmdListPush("clear data"),t.tableData=[],e.next=6,v(100);case 6:console.log("start loading"),t.cmdListPush("start loading"),o=[],a=0;case 10:if(!(a<t.rowNum)){e.next=18;break}return o.push(Array.from({length:t.colNum}).map(function(t,e){return e})),e.next=14,v(0);case 14:t.tableData=o;case 15:a++,e.next=10;break;case 18:setTimeout(function(){var e=Date.now()-n;console.log("".concat(e,"ms")),console.log("loaded"),t.cmdListPush("".concat(e,"ms")),t.cmdListPush("loaded")},0);case 19:case"end":return e.stop()}},e,this)}))()},handleOnReloadClick:function(){window.location.reload()}},components:{"v-table":h}},w=b,g=(n("e14f"),Object(m["a"])(w,c,i,!1,null,null,null));g.options.__file="app.vue";var y=g.exports;o["default"].use(r.a),o["default"].config.productionTip=!1,new o["default"]({render:function(t){return t(y)}}).$mount("#app")},e14f:function(t,e,n){"use strict";var o=n("26e6"),a=n.n(o);a.a},e794:function(t,e,n){}});
//# sourceMappingURL=index.bec20243.js.map