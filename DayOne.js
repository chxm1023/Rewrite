/*************************************

应用名称：DayOne:每日日记和日记
脚本功能：解锁Gold
下载地址：https://is.gd/V1nRKk
更新日期：2026-05-14
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/dayone\.app\/api\/v\d\/users url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/DayOne.js
^https?:\/\/enrichment-api\.superwall\.com\/api\/v\d\/enrich url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/DayOne.js

[mitm]
hostname = dayone.app, enrichment-api.superwall.com

*************************************/


var ddm = JSON.parse($response.body);
var url = $request.url;
const expireDate = "2099-09-09T09:09:09.000Z";

function modifyDayOne() {
  if (/\/api\/v\d\/users/.test(url)) {
    ddm.subscription = {
      "is_in_billing_retry_period": null,
      "expires": expireDate,
      "plus_on_ios": true,
      "source": {
        "type": "receipt"
      },
      "is_eligible_for_trial": false,
      "limited_time": false,
      "product_id": "com.bloombuilt.dayoneios.subscription.gold.yearly",
      "gold": true,
      "plus_on_mac": true,
      "auto_renew": true,
      "source_text": "receipt",
      "is_trial": true,
      "silver": true
    };
    ddm.feature_bundle = ddm.feature_bundle || {};
    ddm.bundle = ddm.bundle || {};
    Object.assign(ddm.feature_bundle, {
      "reason": "purchase",
      "bundle_name": "gold"
    });
    Object.assign(ddm.bundle, {
      "reason": "purchase",
      "bundle_name": "gold"
    });
  }
  if (/users\/account-status/.test(url)) {
    ddm = {
      "source": "receipt",
      "subscription_name": "gold",
      "subscriptions_detail": [
        {
          "source": "IOS",
          "is_trial": false,
          "price": null,
          "current_period_end_date": expireDate,
          "auto_renew": true,
          "subscription_period": "yearly",
          "currency": null
        }
      ],
      "expiration_date": expireDate,
      "gifted_by_name": null,
      "has_plus": true,
      "bundle_reason": "purchase",
      "limited_time": false
    };
  }
}

function modifySuperwall() {
  if (/enrichment-api\.superwall\.com\/api\/v\d\/enrich/.test(url)) {
    ddm.device = ddm.device || {};
    ddm.device.customerInfo = ddm.device.customerInfo || {};
    const now = Math.floor(Date.now() / 1000);
    const farFuture = 4092599349;
    ddm.device.activeEntitlements = ["gold"];
    ddm.device.activeEntitlementObjects = [
      {
        "productIds": ["com.bloombuilt.dayoneios.subscription.gold.yearly"],
        "isActive": true,
        "store": "APP_STORE",
        "identifier": "gold",
        "type": "SERVICE_LEVEL"
      }
    ];
    ddm.device.customerInfo.entitlements = [
      {
        "productIds": ["com.bloombuilt.dayoneios.subscription.gold.yearly"],
        "isActive": true,
        "store": "APP_STORE",
        "type": "SERVICE_LEVEL",
        "identifier": "gold"
      }
    ];
    ddm.device.customerInfo.subscriptions = [
      {
        "isRevoked": false,
        "productId": "com.bloombuilt.dayoneios.subscription.gold.yearly",
        "isActive": true,
        "isInBillingRetryPeriod": false,
        "expirationDate": farFuture,
        "purchaseDate": now,
        "willRenew": true,
        "transactionId": "490002833513299",
        "offerType": "trial",
        "subscriptionGroupId": "20389748",
        "store": "APP_STORE",
        "isInGracePeriod": false
      }
    ];
    ddm.device.subscriptionStatus = "ACTIVE";
    ddm.device.activeProducts = ["com.bloombuilt.dayoneios.subscription.gold.yearly"];
  }
}

modifyDayOne();
modifySuperwall();

$done({ body: JSON.stringify(ddm) });