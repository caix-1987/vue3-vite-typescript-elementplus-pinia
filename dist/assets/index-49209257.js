import{M as a}from"./mock-357df37a.js";const i=async(t,e)=>await a.mock({data:[{id:"@id",username:t,createTime:"@date(yyyy-MM-dd)",email:"@email()",phone:e,roles:"admin",status:"男"}]}),m=async()=>await a.mock({"data|10":[{id:"@id",name:"项目名称",planStartDate:/2023-0[1]-[1-2][0-9]/,planEndDate:/2023-0[2]-[1-2][0-8]/,"statue|1":["1","2","3"]}]}),r=async()=>await a.mock({"list|10":[{id:"@id",username:"@cname",createTime:"@date(yyyy-MM-dd)",email:"@email()",phone:/13\d{9}/,"roles|1":["admin","guest"],"status|1":["男","女"]}]});export{r as a,m as b,i as m};
