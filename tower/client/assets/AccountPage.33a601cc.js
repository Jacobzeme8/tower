import{_ as g,b as k,w as y,d as a,c as o,a as e,F as u,r as d,t as A,l as _,P as v,o as s,e as f,A as n,f as p,g as E}from"./index.69aa895a.js";const w={setup(){async function r(){try{await A.getTicketsForAccount()}catch(t){_.error(t),v.error(t)}}async function i(){try{await E.getMyEvents()}catch(t){_.error(t),v.error(t)}}return k(()=>{r()}),y(()=>{n.account&&i()}),{account:a(()=>n.account),tickets:a(()=>n.tickets),events:a(()=>n.events)}}},x={class:"container-fluid"},C={class:"row"},M={class:"col-12 d-flex flex-column m-auto pt-3"},P=e("h2",null,"My Events",-1),T={class:"row"},F={class:"col-3"},b=e("div",{class:"col-8 justify-content-center d-flex m-auto pt-3"},[e("h2",null,"My Tickets")],-1),B={class:"col-8 m-auto p-2"};function S(r,i,t,l,N,V){const h=p("EventCardAboutPage"),m=p("TicketCard");return s(),o("div",x,[e("div",C,[e("div",M,[P,e("div",T,[(s(!0),o(u,null,d(l.events,c=>(s(),o("div",F,[f(h,{event:c},null,8,["event"])]))),256))])]),b,(s(!0),o(u,null,d(l.tickets,c=>(s(),o("div",B,[f(m,{ticket:c,event:c.event,account:c.profile},null,8,["ticket","event","account"])]))),256))])])}const j=g(w,[["render",S]]);export{j as default};
