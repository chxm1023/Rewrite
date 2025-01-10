/*************************************

项目名称：倒数纪念日 解锁终身会员
下载地址：https://t.cn/A6t6nFst
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️

**************************************

[rewrite_local]

^https:\/\/day-api\.xixitime\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/dsjnr.js

[mitm]

hostname = day-api.xixitime.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const user = '/user/info';
const vip = '/vip/state';

if ($request.url.indexOf(user) != -1){
chxm1023.data["foreverVip"] = true;
chxm1023.data["vipInfo"] = {
      "vipExpireTime" : 4092599349000,
      "trialPeriod" : true,
      "canUseTrialPeriod" : false,
      "validVip" : true,
      "foreverVip" : true,
      "vipCount" : 999999
    };
}


if ($request.url.indexOf(vip) != -1){
chxm1023["data"] = {
    "vipExpireTime" : 4092599349000,
    "trialPeriod" : true,
    "canUseTrialPeriod" : false,
    "validVip" : true,
    "foreverVip" : true,
    "vipCount" : 999999
  };
}

$done({body : JSON.stringify(chxm1023)});
