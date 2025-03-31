/*************************************

项目名称：apphud合集
下载地址：https://t.cn/A6m7WeMH
下载地址：https://t.cn/A6WlGNDi
更新日期：2025-03-31
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.apphud\.com\/v\d\/(subscriptions|customers)$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/apphud.js

[mitm]
hostname = *.apphud.com

*************************************/


const ddm = JSON.parse(typeof $response != "undefined" && $response.body || "{}");

const list = [
  "SnipProYearly", //Snip:Removebg - 抠图换背景
  "com.newlearning.english.premium.forever",  //Excellent
  "1year7days80",  //Bright
  "com.movavi.clips.lifetime",  //Movavi
  "ok.annual.sub",  //BodyOK
  "AFMS",  //WatchFace表盘商店
  "com.tm.replica.lifetime",  //Replica
  "Plant_1w_7.99_3d",  //PlantMe
  "one.time.premium"
];

const createSubscription = (productId = "one.time.premium", groupid = "1a2b3c4d") => {
  return {
    "status": "trial",
    "group_id": groupid,
    "autorenew_enabled": false,
    "introductory_activated": true,
    "cancelled_at": null,
    "kind": "autorenewable",
    "id": "a1234567-b123-c123-d123-e12345678910",
    "next_check_at": "2099-09-09T09:09:09.000Z",
    "product_id": productId,
    "platform": "ios",
    "environment": "production",
    "local": false,
    "retries_count": 0,
    "units_count": 7,
    "unit": "day",
    "in_retry_billing": false,
    "started_at": "2024-11-11T11:11:11.000Z",
    "original_transaction_id": "490001314520000",
    "expires_at": "2099-09-09T09:09:09.000Z",
    "is_consumable": null
  };
};

const processPaywalls = (paywalls) => {
  const subscriptions = [];
  if (!Array.isArray(paywalls)) return subscriptions;
  for (const paywall of paywalls) {
    if (paywall.items) {
      for (const item of paywall.items) {
        const productId = item.product_id || "one.time.premium";
        const groupid = item.id || "1a2b3c4d";
        subscriptions.push(createSubscription(productId, groupid));
      }
    }
  }
  return subscriptions;
};

if (!ddm.data) ddm.data = {};
if (!ddm.data.results) ddm.data.results = {};

ddm.data.results.subscriptions = [];

if (ddm.data.results.paywalls) {
  const subscriptions = processPaywalls(ddm.data.results.paywalls);
  for (const sub of subscriptions) {
    ddm.data.results.subscriptions.push(sub);
  }
}

for (const productId of list) {
  ddm.data.results.subscriptions.push(createSubscription(productId));
}

$done({ body: JSON.stringify(ddm) });
