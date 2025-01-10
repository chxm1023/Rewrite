/*************************************

项目名称：安心记加班
下载地址：https://t.cn/A6HqR0Wf
更新日期：2025-01-09
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.julanling\.com\/(member|splash_screen\/jjb_splash_screen|switch_my\/vip_banner_info) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/axjjb.js

[mitm]
hostname = *.julanling.com

*************************************/


var ddm = JSON.parse($response.body);
const ad = /splash_screen\/jjb_splash_screen/;
const vipa = /vip\/(vipIndex|advertVipIndex)/;
const vipb = /vip\/getFunctionVipStatus/;
const vipc = /switch_my\/vip_banner_info/;
const vipdata = {  "vipStatus" : "VIP",  "willExpireDays" : 99999,  "axUid" : 187654321,  "expireTimestamp" : 4092599349,  "hasExpiredDays" : 0,  "expireTime" : "2099-09-09 09:09:09"  };

if(ad.test($request.url)){
  ddm = {};
}

if(vipa.test($request.url)){
  ddm.results = {
    ...ddm.results,
    "marketingText": "已开通会员",
    "vipStatus": "VIP",
    "vipInfo": "2099-09-09 09:09:09",
    "isLifeMember": true,
    "expiredDays": 99999,
    "expireDate": 99999,
    "willExpireDays": 99999
  };
}

if(vipb.test($request.url)){
  ddm.results.functionVipStatusMap = {
    "VIP" : {...vipdata},
    "ADVERT_VIP" : {...vipdata}
  };
}

if(vipc.test($request.url)){
  ddm.results = {
    "vipStatus" : "VIP",
    "title" : "已开通会员,尊享所有功能",
    "vipType" : "VIP",
    "btnText" : "续费"
  };
}

$done({body : JSON.stringify(ddm)});