/*************************************

应用名称：每一迹
脚本功能：终生会员
下载地址：https://shm.to/myj
更新日期：2026-06-06
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/ink\.timerecord\.cn\/apis\/app\/trace\/get.*UserInfo url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/myj.js

[mitm]
hostname = ink.timerecord.cn

*************************************/


var ddm = JSON.parse($response.body);

if(/getVisitorUserInfo/.test($request.url)){
  ddm.data = {
    "longVipCreateTime" : "2026-06-06 06:06:06",
    "longMemberType" : 1
  };
}

if(/getUserInfo/.test($request.url)){
  ddm.data = {
    ...ddm.data,
    "starMemberType" : 1,
    "longVipCreateTime" : "2026-06-06 06:06:06",
    "starVipCreateTime" : "2026-06-06 06:06:06",
    "memberType" : 3,
    "longMemberType" : 1,
    "createTime" : "2026-06-06 06:06:06",
    "vipExpirationTime" : "2099-09-09 09:09:09"
  };
}

$done({body : JSON.stringify(ddm)});