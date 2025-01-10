/*************************************

项目名称：DailyArt(每日艺术)
下载地址：https://t.cn/A6pv6XfN
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.getdailyart\.com\/api\/(subscription\/verified|auth\/login|check-logged) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/DailyArt.js

[mitm]
hostname = api.getdailyart.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const vipa = '/api/subscription/verified';
const vipb = '/api/auth/login';
const vipc = '/api/check-logged';
const vip = {
    "auto_resume_date" : null,
    "status" : "active",
    "account_type" : "patron-annual",
    "cancel_date" : null,
    "start_date" : "2023-05-22T11:37:17.000000Z",
    "expire_date" : "2099-09-09T09:09:09.000000Z"
  };

if ($request.url.indexOf(vipa) != -1){
  chxm1023.data = (vip);
}

if ($request.url.indexOf(vipb) != -1){
  chxm1023.user.subscription = (vip)
  chxm1023.user.account_type = "patron-annual";
}

if ($request.url.indexOf(vipc) != -1){
  chxm1023.subscription = (vip)
  chxm1023.account_type = "patron-annual";
}

$done({body : JSON.stringify(chxm1023)});
