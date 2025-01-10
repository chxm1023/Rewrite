/*************************************

项目名称：Craft-文件笔记编辑器
下载地址：https://t.cn/A6HEVDeP
更新日期：2024-10-15
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/(api|docs)\.craft\.do\/(api\/)?(auth\/v\d\/profile|subscription\/(receipt|teams\/get-subscriptions)) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Craft.js

[mitm]
hostname = api.craft.do

*************************************/


var chxm1023 = JSON.parse($response.body);

if (/auth\/v\d\/profile/.test($request.url)) {
  chxm1023.teams = chxm1023.teams || [{}];
  chxm1023.spaces = chxm1023.spaces || [{}];
  chxm1023.teams.forEach(team => {
    team.tier = "V2_Team";
    team.subscriptionInfo = {
      "autoRenewStatus": true,
      "provider": "AppStore",
      "rawType": "AppStore",
      "subscriptionId": "55555555-8888-1023-8888-999999999999",
      "expirationTime": 4092599349000,
      "renewPeriod": "Yearly"
    };
  });
  chxm1023.spaces.forEach(space => {
    space.tier = "V2_Team";
  });
}


if (/subscription\/receipt/.test($request.url)) {
  chxm1023.subscription = {
    "expirationDate": 4092599349000,
    "subscriptionActive": true,
    "subscriptionId": "55555555-8888-1023-8888-999999999999",
    "productId": "com.lukilabs.lukiapp.v2_team_2.sub.yearly_test",
    "tier": "Pro",
    "subscriptionType": "appStoreV2TeamYearly",
    "rawSubscriptionType": "AppStore",
    "autoRenewStatus": true
  };
}

if (/subscription\/teams\/get-subscriptions/.test($request.url)) {
  chxm1023.subscriptions = chxm1023.subscriptions || [{}];
  chxm1023.tier = "V2_Team";
  chxm1023.subscriptions.push({
    "isPrimary": true,
    "provider": "AppStore",
    "subscriptionId": "55555555-8888-1023-8888-999999999999",
    "renewPeriod": "Yearly",
    "rawType": "AppStore",
    "tier": "V2_Team",
    "expirationTime": 4092599349000,
    "isActive": true
  });
}

$done({ body: JSON.stringify(chxm1023) });