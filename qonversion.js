/*************************************

项目名称：Qonversion-合集
下载地址：https://t.cn/A68lP8qz
更新日期：2024-08-19
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.qonversion\.io\/v\d\/user\/(init|purchase) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/qonversion.js

[mitm]
hostname = api.qonversion.io

*************************************/


var chxm1023 = JSON.parse($response.body);
const headers = $request.headers;
const ua = headers['User-Agent'] || headers['user-agent'];
const times = Math.floor(Date.now() / 1000);  // 获取当前时间戳

const list = {
  'AnkiPro': { name: "Premium", id: "com.ankipro.app.lifetime", store_id: "com.ankipro.app.lifetime" },  //AnkiPro
  'SwiftCompiler': { name: "premium", id: "premium.forever", store_id: "com.hassantaleb.SwiftCompiler.premium.forever" }  //Swift Compiler
};

for (const key in list) {
  if (new RegExp(`^${key}`, 'i').test(ua)) {
    const { name, id, store_id } = list[key];
    const data = {
      "id": id,
      "type": 0,
      "store_id": store_id,
      "duration": 99999
    };
    chxm1023.data["products"].push(data);
    chxm1023.data["user_products"] = [data];
    chxm1023.data["permissions"] = [
      {
        "id" : name,
        "trial_start_timestamp" : times,
        "active" : 1,
        "started_timestamp" : times,
        "grant_type" : "purchase",
        "associated_product" : id,
        "source" : "appstore",
        "renews_count" : 0,
        "store_transactions" : [
          {
            "ownership_type" : "owner",
            "transaction_id" : "490001838737385",
            "environment" : "production",
            "transaction_timestamp" : times,
            "expiration_timestamp" : 4092599349,
            "original_transaction_id" : "490001314520000",
            "type" : "trial_started"
          }
        ],
        "current_period_type" : "trial",
        "expiration_timestamp" : 4092599349,
        "renew_state" : 1
      }
    ];
    break;
  }
}

$done({body: JSON.stringify(chxm1023)});