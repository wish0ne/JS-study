(()=>{var e={757:(e,r,n)=>{e.exports=n(671)},671:e=>{"use strict";e.exports=require("regenerator-runtime")}},r={};function n(t){var s=r[t];if(void 0!==s)return s.exports;var o=r[t]={exports:{}};return e[t](o,o.exports,n),o.exports}n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{"use strict";function e(e,r,n,t,s,o,i){try{var u=e[o](i),c=u.value}catch(e){return void n(e)}u.done?r(c):Promise.resolve(c).then(t,s)}function r(r){return function(){var n=this,t=arguments;return new Promise((function(s,o){var i=r.apply(n,t);function u(r){e(i,s,o,u,c,"next",r)}function c(r){e(i,s,o,u,c,"throw",r)}u(void 0)}))}}var t=n(757),s=n.n(t);const o=require("react"),i=require("react-dom/server");var u=n.n(i);const c=require("express");var a=n.n(c);const l=require("react-router-dom/server"),d=require("react-router-dom"),p=require("react/jsx-runtime"),f=function(){return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("ul",{children:[(0,p.jsx)("li",{children:(0,p.jsx)(d.Link,{to:"red",children:"Red"})}),(0,p.jsx)("li",{children:(0,p.jsx)(d.Link,{to:"blue",children:"Blue"})}),(0,p.jsx)("li",{children:(0,p.jsx)(d.Link,{to:"users",children:"Users"})})]}),(0,p.jsx)("hr",{}),(0,p.jsx)(d.Outlet,{})]})},h=function(){return(0,p.jsx)("div",{className:"Red",children:"Red"})},v=function(){return(0,p.jsx)(h,{})},x=function(){return(0,p.jsx)("div",{className:"Blue",children:"Blue"})},j=function(){return(0,p.jsx)(x,{})},m=function(e){var r=e.users;return r?(0,p.jsx)("div",{children:(0,p.jsx)("ul",{children:r.map((function(e){return(0,p.jsx)("li",{children:(0,p.jsx)(d.Link,{to:"/users/".concat(e.id),children:e.username})},e.id)}))})}):null},y=require("react-redux");function b(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function g(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function O(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?g(Object(n),!0).forEach((function(r){b(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}const S=require("axios");var w=n.n(S),P="users/GET_USERS_PENDING",R="users/GET_USERS/SUCCESS",k="users/GET_USERS/FAILURE",E={users:null,user:null,loading:{users:!1,user:!1},error:{users:null,user:null}};var q=(0,o.createContext)(null);const _=q;var D=function(e){var r=e.resolve,n=(0,o.useContext)(q);return n?(n.done||n.promises.push(Promise.resolve(r())),null):null};const T=(0,y.connect)((function(e){return{users:e.users.users}}),{getUsers:function(){return function(){var e=r(s().mark((function e(r){var n;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r({type:P}),e.next=4,w().get("https://jsonplaceholder.typicode.com/users");case 4:n=e.sent,r({type:R,payload:n}),e.next=12;break;case 8:throw e.prev=8,e.t0=e.catch(0),r((t=e.t0,{type:k,error:!0,payload:t})),e.t0;case 12:case"end":return e.stop()}var t}),e,null,[[0,8]])})));return function(r){return e.apply(this,arguments)}}()}})((function(e){var r=e.users,n=e.getUsers;return(0,o.useEffect)((function(){r||n()}),[n,r]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(m,{users:r}),(0,p.jsx)(D,{resolve:n})]})})),U=function(){return(0,p.jsx)(T,{})},L=function(){return(0,p.jsx)(d.Routes,{children:(0,p.jsxs)(d.Route,{path:"/",element:(0,p.jsx)(f,{}),children:[(0,p.jsx)(d.Route,{path:"/red",element:(0,p.jsx)(v,{})}),(0,p.jsx)(d.Route,{path:"/blue",element:(0,p.jsx)(j,{})}),(0,p.jsx)(d.Route,{path:"/users",element:(0,p.jsx)(U,{})})]})})},N=require("path");var C=n.n(N);const A=require("fs");var F=n.n(A);const G=require("redux"),B=require("redux-thunk");var J=n.n(B);const M=(0,G.combineReducers)({users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case P:return O(O({},e),{},{loading:O(O({},e.loading),{},{users:!0})});case R:return O(O({},e),{},{loading:O(O({},e.loading),{},{users:!1}),users:r.payload.data});case k:return O(O({},e),{},{loading:O(O({},e.loading),{},{users:!1}),error:O(O({},e.error),{},{users:r.payload})});default:return e}}});var I=JSON.parse(F().readFileSync(C().resolve("./build/asset-manifest.json"),"utf8")),Y=Object.keys(I.files).filter((function(e){return/chunk\.js$/.exec(e)})).map((function(e){return'<script src="'.concat(I.files[e],'"><\/script>')})).join("");function $(e,r){return'<!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="shortcut icon" href="/favicon.ico" />\n    <meta\n      name="viewport"\n      content="width=device-width,initial-scale=1,shrink-to-fit=no"\n    />\n    <meta name="theme-color" content="#000000" />\n    <title>React App</title>\n    <link href="'.concat(I.files["main.css"],'" rel="stylesheet" />\n  </head>\n  <body>\n    <noscript>You need to enable JavaScript to run this app.</noscript>\n    <div id="root">\n      ').concat(e,"\n    </div>\n    ").concat(r,"\n    ").concat(Y,'\n    <script src="').concat(I.files["main.js"],'"><\/script>\n  </body>\n  </html>\n    ')}var z=a()(),H=function(){var e=r(s().mark((function e(r,n,t){var o,i,c,a,d,f,h;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o={},i=(0,G.createStore)(M,(0,G.applyMiddleware)(J())),c={done:!1,promises:[]},a=(0,p.jsx)(_.Provider,{value:c,children:(0,p.jsx)(y.Provider,{store:i,children:(0,p.jsx)(l.StaticRouter,{location:r.url,context:o,children:(0,p.jsx)(L,{})})})}),u().renderToStaticMarkup(a),e.prev=5,e.next=8,Promise.all(c.promises);case 8:e.next=13;break;case 10:return e.prev=10,e.t0=e.catch(5),e.abrupt("return",n.staus(500));case 13:c.done=!0,d=u().renderToString(a),f=JSON.stringify(i.getState()).replace(/</g,"\\u003c"),h="<script>__PRELOADED_STATE__ = ".concat(f,"<\/script>"),n.send($(d,h));case 18:case"end":return e.stop()}}),e,null,[[5,10]])})));return function(r,n,t){return e.apply(this,arguments)}}(),K=a().static(C().resolve("./build"),{index:!1});z.use(K),z.use(H),z.listen(5e3,(function(){console.log("Running on http://localhost:5000")}))})()})();