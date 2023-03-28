import"./index.vue_vue_type_style_index_0_scoped_6aeaa35a_lang-de748cf6.js";import{d as E,a as u,c as x,h as k,A as N,H as z,_ as V,r as d,I as L,e as v,w as c,b as i,i as w,D as T,g as S,F as G,f,G as U,x as j,u as q}from"./index-baf6e919.js";import"./userInfo-1dbefe97.js";import{r as H}from"./service-cb4d3f4b.js";function O(){return H({url:"gantt",method:"get"})}class Y{async getMinAndMaxDate(a){let t,n;const e={minDate:"",maxDate:""};return a.forEach(r=>{t=a.reduce((l,s)=>this.dateFormatDay(l.planStartDate)<this.dateFormatDay(s.planStartDate)?l:s),n=a.reduce((l,s)=>this.dateFormatDay(l.planEndDate)>this.dateFormatDay(s.planEndDate)?l:s),r.children&&r.children.length&&this.getMinAndMaxDate(r.children)}),e.maxDate=n.planEndDate,e.minDate=t.planStartDate,e}tableDataFormat(a,t){const n=this.dateSubtract(t.minDate,t.maxDate);return a.forEach(e=>{e.left=(this.dateSubtract(t.minDate,e.planStartDate)-1)/n*100+"%",e.right=(this.dateSubtract(e.planEndDate,t.maxDate)-1)/n*100+"%",e.children&&e.children.length&&this.tableDataFormat(e.children,t)}),n}async initGanttData(a,t){const n=this.dateFormatDay(a),e=this.dateFormatDay(t),r=[];let l=[];const s=[];let p,m;for(p=n,m=0;p<=e;p++,m++)r[m]=this.dayFormatDate(p),l[m]=this.dayFormatDate(p).slice(0,7);return l=[...new Set(l)],l.forEach(o=>{const _=[];r.forEach(y=>{y.indexOf(o)>-1&&_.push(y.slice(8,10))});const g={year_mounth:o,children:_};s.push(g)}),s}dateFormatDay(a){return new Date(a).getTime()/1e3/60/60/24}dateSubtract(a,t){return this.dateFormatDay(t)-this.dateFormatDay(a)+1}dayFormatDate(a){const t=new Date(a*24*60*60*1e3);let n="yyyy-MM-dd";const e={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),S:t.getMilliseconds()};/(y+)/.test(n)&&(n=n.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));for(const r in e)new RegExp("("+r+")").test(n)&&(n=n.replace(RegExp.$1,RegExp.$1.length===1?e[r]:("00"+e[r]).substr((""+e[r]).length)));return n}}const F=new Y,J=E({__name:"GanttBar",props:{progressItem:{type:Object,default:()=>({})}},setup(h){return(a,t)=>(u(),x("div",null,[k("div",{class:N(["caix-1987-progress-bar","caix-1987-gantt-color-"+h.progressItem.statue]),style:z({marginLeft:h.progressItem.left,marginRight:h.progressItem.right})},null,6)]))}}),K=V(J,[["__scopeId","data-v-21650716"]]),P={class:"selectGantt"},Q=E({__name:"index",setup(h){const a=d([]),t=d(),n=d([]),e=d(0),r=d(!1),l=d("1");d("2"),d("3");const s=async()=>{try{r.value=!0;const o=await O();a.value=o.data,t.value=await F.getMinAndMaxDate(a.value),n.value=await F.initGanttData(t.value.minDate,t.value.maxDate),e.value=F.tableDataFormat(a.value,t.value)}catch(o){console.log("e",o)}finally{r.value=!1}},p=({columnIndex:o})=>o===3?[1,e.value]:[1,1],m=o=>{console.log("val",o)};return L(()=>{s()}),(o,_)=>{const g=f("el-radio-button"),y=f("el-radio-group"),D=f("el-table-column"),$=f("el-table"),C=f("el-card"),B=U("loading");return u(),v(C,{class:"app-ganttView"},{default:c(()=>[k("div",P,[i(y,{modelValue:l.value,"onUpdate:modelValue":_[0]||(_[0]=b=>l.value=b),size:"small",onChange:m},{default:c(()=>[i(g,{label:"1"},{default:c(()=>[w("日视图")]),_:1}),i(g,{label:"2",disabled:""},{default:c(()=>[w("周视图")]),_:1}),i(g,{label:"3",disabled:""},{default:c(()=>[w("月视图")]),_:1})]),_:1},8,["modelValue"])]),T((u(),v($,{data:a.value,border:!0,"span-method":p,"row-key":"id","tree-props":{children:"children",hasChildren:"hasChildren"},"default-expand-all":"",style:{width:"100%","margin-bottom":"20px"}},{default:c(()=>[i(D,{fixed:"",align:"center",width:"160",prop:"name",label:"项目名称"}),i(D,{fixed:"",align:"center",width:"120",prop:"planStartDate",label:"计划开始时间"}),i(D,{fixed:"",align:"center",width:"120",prop:"planEndDate",label:"计划结束时间"}),(u(!0),x(G,null,S(n.value,(b,R)=>(u(),v(D,{label:b.year_mounth,key:R,align:"center"},{default:c(()=>[(u(!0),x(G,null,S(b.children,(I,M)=>(u(),v(D,{key:M,prop:I,label:I,width:"60",align:"center"},j({_:2},[M===0?{name:"default",fn:c(A=>[i(K,{progressItem:A.row},null,8,["progressItem"])]),key:"0"}:void 0]),1032,["prop","label"]))),128))]),_:2},1032,["label"]))),128))]),_:1},8,["data"])),[[B,r.value]])]),_:1})}}}),W=V(Q,[["__scopeId","data-v-6da9d28e"]]),X={class:"app-content"},nt=E({__name:"table-two-page",setup(h){return(a,t)=>(u(),x("div",X,[i(q(W))]))}});export{nt as default};