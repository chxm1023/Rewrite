/*************************************

项目名称：挖财记账
下载地址：https://t.cn/A6SkblaQ
更新日期：2024-07-08
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/jz\.wacaijizhang\.com\/(api\/(my\/v\d|vipmember\/v\d\/index|usercenter\/userInfo)|jz-activity\/bkk-frontier\/api\/vipmember\/v\d\/index) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/wacaijizhang.js

[mitm]
hostname = jz.wacaijizhang.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const my = /api\/my\/v\d/;
const vip = /(vipmember\/v\d\/index|jz-activity\/bkk-frontier\/api\/vipmember\/v\d\/index)/;
const user = /usercenter\/userInfo/;

if(my.test($request.url)){
  chxm1023.data.vipInfo = {
    "vipMemberType" : "挖财记账超级年会员",
    "isVipMember" : true,
    "expirationDate" : 4092599349000,
    "continuous" : true,
    "remainingDays" : 99999,
    "consecutiveDays" : 99999
  };
}

if(vip.test($request.url)){
  chxm1023.data.vipInfo = {
    ...chxm1023.data.vipInfo,
    "adFreeVipEnable" : 1,
    "adFreePermanentVip" : true,
    "vipMemberEnable" : 1,
    "continuousEnable" : 1,
    "continuousType" : 1,
    "expirationDate" : 4092599349000,
    "superExpireDate" : 4092599349000,
    "adFreeExpireDate" : 4092599349000,
    "isPermanentVip" : true,
    "freeSendAdFreeVipEnable" : 0,
    "vipType" : 2,
    "expireDaysDays" : 99999,
    "freeSendVipEnable" : 0
  };
}

if(user.test($request.url)){
  chxm1023.data.isVip = 1;
}

$done({body : JSON.stringify(chxm1023)});