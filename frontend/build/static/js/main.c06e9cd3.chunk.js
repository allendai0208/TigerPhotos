(this["webpackJsonpreact-flask-app"]=this["webpackJsonpreact-flask-app"]||[]).push([[0],{196:function(e,t,a){e.exports=a.p+"static/media/TigerLogo.1db0a342.jpg"},213:function(e,t,a){e.exports=a(345)},218:function(e,t,a){},219:function(e,t,a){},341:function(e,t,a){e.exports=a.p+"static/media/Allen2.fad026b5.JPG"},343:function(e,t,a){},345:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(25),o=a.n(c),l=(a(218),a(47)),i=a(48),u=a(49),s=a(50),m=(a(219),a(198)),p=a(44),f=a(126),h=a.n(f),d=a(177),E=a(381),b=a(375),g=a(347),v=function(e){var t=e.onNewProfile,a=Object(n.useState)(""),c=Object(p.a)(a,2),o=c[0],l=c[1],i=Object(n.useState)(""),u=Object(p.a)(i,2),s=u[0],m=u[1],f=Object(n.useState)(""),v=Object(p.a)(f,2),j=v[0],O=v[1],w=Object(n.useState)(""),C=Object(p.a)(w,2),y=C[0],k=C[1];return r.a.createElement(E.a,null,r.a.createElement(E.a.Field,null,r.a.createElement(b.a,{placeholder:"First Name:",value:o,onChange:function(e){return l(e.target.value)}})),r.a.createElement(E.a.Field,null,r.a.createElement(b.a,{placeholder:"Last Name:",value:s,onChange:function(e){return m(e.target.value)}})),r.a.createElement(E.a.Field,null,r.a.createElement(b.a,{placeholder:"Email",value:j,onChange:function(e){return O(e.target.value)}})),r.a.createElement(E.a.Field,null,r.a.createElement(b.a,{placeholder:"Description",value:y,onChange:function(e){return k(e.target.value)}})),r.a.createElement(E.a.Field,null,r.a.createElement(g.a,{onClick:Object(d.a)(h.a.mark((function e(){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={first_name:o,last_name:s,email:j,description:y},e.next=3,fetch("/api/createProfile",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 3:e.sent.ok&&(console.log("response worked"),t(a),l(""),m(""),O(""),k(""));case 5:case"end":return e.stop()}}),e)})))},"submit")))},j=a(383),O=a(385),w=function(e){var t=e.photographers;return r.a.createElement(j.a,null,t.map((function(e){return r.a.createElement(j.a.Item,{key:e.photographer_netid},r.a.createElement(O.a,null,"netid: ",e.photographer_netid),r.a.createElement(O.a,null,"first_name: ",e.first_name),r.a.createElement(O.a,null,"last_name: ",e.last_name),r.a.createElement(O.a,null,"email: ",e.email),r.a.createElement(O.a,null,"description: ",e.description))})))},C=a(379),y=a(376),k=a(386),P=a(377),S=a(378),N=a(384),_=a(106),x=function(e){var t=e.photographers;return r.a.createElement("div",null,r.a.createElement(_.a,{variant:"h5",gutterBottom:!0},"Photographers"),r.a.createElement(y.a,{height:"100%",width:300},t.map((function(e){return r.a.createElement(k.a,{divider:!0,alignItems:"flex-start",button:!0},r.a.createElement(P.a,null,r.a.createElement(N.a,{alt:"Profile Picture",src:a(341)})),r.a.createElement(S.a,{primary:e.first_name+" "+e.last_name,secondary:e.description}))}))))};var T=function(){var e=Object(n.useState)([]),t=Object(p.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){fetch("/api/browse").then((function(e){return e.json().then((function(e){c(e.photographers)}))}))}),[]),r.a.createElement("div",{className:"ProfilePage"},r.a.createElement(C.a,{style:{marginTop:40}},r.a.createElement(v,{onNewProfile:function(e){return c((function(t){return[].concat(Object(m.a)(t),[e])}))}}),r.a.createElement(w,{photographers:a}),r.a.createElement(x,{photographers:a})))},F=a(60),A=a(53),B=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("p",null,"The page you're looking for does not exist"))}}]),a}(r.a.Component),J=(r.a.Component,a(343),a(380)),I=a(196),L=a.n(I),D=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).routeChange=function(e){window.location.href=e},e}return Object(i.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"bigContainer"},r.a.createElement("h1",{className:"titleHeader"},"Welcome to TigerPhotos!"),r.a.createElement("div",{className:"buttons"},r.a.createElement(J.a,{variant:"contained",onClick:function(){return e.routeChange("browse")}},"Browse Photographers"),r.a.createElement(J.a,{variant:"contained",onClick:function(){return e.routeChange("create")}},"Create Your Profile"),r.a.createElement(J.a,{variant:"contained",onClick:function(){return e.routeChange("create")}},"About Us")),r.a.createElement("img",{src:L.a}))}}]),a}(r.a.Component);var G=function(){var e=Object(n.useState)([]),t=Object(p.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){fetch("/api/browse").then((function(e){return e.json().then((function(e){c(e.photographers)}))}))}),[]),r.a.createElement("div",{className:"ProfilePage"},r.a.createElement(C.a,{style:{marginTop:40}},r.a.createElement(x,{photographers:a})))},H=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={fields:{}},e.onSubmit=function(t){e.setState({fields:t})},e}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{style:{backgroundColor:"purple"}},r.a.createElement(F.a,null,r.a.createElement(A.c,null,r.a.createElement(A.a,{path:"/",component:D,exact:!0}),r.a.createElement(A.a,{path:"/create",component:T}),r.a.createElement(A.a,{path:"/browse",component:G}),r.a.createElement(A.a,{component:B}))))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(344);o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(H,null)),document.getElementById("root"))}},[[213,1,2]]]);
//# sourceMappingURL=main.c06e9cd3.chunk.js.map