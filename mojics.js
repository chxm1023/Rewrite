/*************************************

项目名称：Moji辞书-日语学习词典
下载地址：https://t.cn/A6fK4RkD
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.mojidict\.com\/parse\/functions\/getNPrivileges url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/mojics.js

[mitm]
hostname = api.mojidict.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const url = $request.url;
const vip1 = '/getNPrivileges';
const vip = '/getNPrivileges-v2';

if(url.indexOf(vip)!=-1){chxm1023.result={"result":"091a0d45e4c8acc99ed9fd4db5bb315ed814854f0257340c94a8f5f517d1db0bf1e888390204957b6fd374fdb4c4d31353aa1cc6d0e69a3e64d031fdb5948a7d694effcbe437718f5aac8cfe793ff3fe6fda5bc846c920dfa2482e4dc2217e2de5e5fd46fc4fc796ced957550309bbe44edd7b8678bc95ed204a5c6afd7b4de0121fdde4ef20014d575f368320d97e2ecda156473a6982be17b644e5124e929ad4fe246a295e813b0374669e17ec6141b6b7890020980107d3ec75399f4890b750798a346dd7b3053c567af95a09fd0693fce168befe76fac98301a30058f69af1d5d60ae13892d7f4fd5e5c4144897d","code":200}}else if(vip1){chxm1023.result={"result":[{"identity":"000-002-00001","privilegeStatus":"activated","privilege":{"status":"cancel","payType":"4","expiresDate":4092599349000,"purchaseDate":1666666666666},"canPay":true}],"code":200}}

$done({body : JSON.stringify(chxm1023)});