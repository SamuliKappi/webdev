(this.webpackJsonpthephonebook=this.webpackJsonpthephonebook||[]).push([[0],{40:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var r=n(16),c=n.n(r),s=n(3),u=n(2),a=n(0),o=function(e){return Object(a.jsx)("form",{children:Object(a.jsxs)("div",{children:["filter shown with: ",Object(a.jsx)("input",{value:e.newFilter,onChange:e.handleFilter})]})})},i=function(e){return Object(a.jsxs)("form",{onSubmit:e.addPerson,children:[Object(a.jsxs)("div",{children:["name: ",Object(a.jsx)("input",{value:e.newName,onChange:e.handleInput})]}),Object(a.jsxs)("div",{children:["number: ",Object(a.jsx)("input",{value:e.newNumber,onChange:e.handleInputNumber})]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",children:"add"})})]})},d=n(4),l=n.n(d),j="/api/persons",b={postPerson:function(e){return l.a.post(j,e).then((function(e){return e.data}))},getAll:function(){return l.a.get(j).then((function(e){return e.data}))},deletePerson:function(e){return l.a.delete("".concat(j,"/").concat(e)).then((function(e){return e.data}))},updatePerson:function(e,t){return l.a.put("".concat(j,"/").concat(e),t).then((function(e){return e.data}))}},h=function(e){return Object(a.jsxs)("p",{children:[e.name," ",e.number," ",Object(a.jsx)("button",{onClick:function(){window.confirm("Delete ".concat(e.name))&&b.deletePerson(e.index).catch((function(t){e.setErrorMessage("Information of ".concat(e.name," has already been removed from server")),e.setStatus("error"),setTimeout((function(){e.setErrorMessage(null),e.setStatus(null)}),5e3)})).then((function(e){return b.getAll()})).then((function(t){e.setPersons(t)}))},children:"delete"})]})},f=function(e){var t=e.newState?e.persons:e.persons.filter((function(t){return!0===t.name.includes(e.newFilter)}));return Object(a.jsx)("div",{children:t.map((function(t){return Object(a.jsx)(h,{name:t.name,number:t.number,index:t.id,setPersons:e.setPersons,setErrorMessage:e.setErrorMessage,setStatus:e.setStatus},t.id)}))})},m=(n(40),function(e){return null===e.message?null:Object(a.jsx)("div",{className:e.status,children:e.message})}),O=function(){var e=Object(u.useState)([]),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(u.useState)(""),d=Object(s.a)(c,2),l=d[0],j=d[1],h=Object(u.useState)(""),O=Object(s.a)(h,2),p=O[0],x=O[1],v=Object(u.useState)(""),w=Object(s.a)(v,2),g=w[0],S=w[1],P=Object(u.useState)(!0),N=Object(s.a)(P,2),k=N[0],E=N[1],F=Object(u.useState)(null),I=Object(s.a)(F,2),A=I[0],M=I[1],y=Object(u.useState)(null),C=Object(s.a)(y,2),T=C[0],D=C[1];return Object(u.useEffect)((function(){b.getAll().then((function(e){r(e)}))}),[]),Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Phonebook"}),Object(a.jsx)(m,{message:A,status:T}),Object(a.jsx)(o,{newFilter:g,handleFilter:function(e){""===e.target.value?E(!0):E(!1),S(e.target.value)}}),Object(a.jsx)("h2",{children:"add a new"}),Object(a.jsx)(i,{addPerson:function(e){if(e.preventDefault(),n.map((function(e){return e.name})).includes(l)){window.confirm("".concat(l," is already added to phonebook, replace the old number with a new one?"));var t=n.find((function(e){return e.name===l})),c={name:l,number:p};b.updatePerson(t.id,c).then((function(e){r(n.map((function(n){return n.id!==t.id?n:e}))),M("Added ".concat(l)),D("succ"),setTimeout((function(){M(null)}),5e3)})),j(""),x("")}else{var s={name:l,number:p};b.postPerson(s).then((function(e){r(n.concat(e)),M("Added ".concat(l)),D("succ"),setTimeout((function(){M(null)}),5e3)})),j(""),x("")}},newName:l,handleInput:function(e){j(e.target.value)},newNumber:p,handleInputNumber:function(e){x(e.target.value)}}),Object(a.jsx)("h2",{children:"Numbers"}),Object(a.jsx)(f,{persons:n,newState:k,newFilter:g,setPersons:r,setErrorMessage:M,setStatus:D})]})};c.a.render(Object(a.jsx)(O,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.35648212.chunk.js.map