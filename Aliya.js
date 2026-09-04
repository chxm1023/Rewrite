/*************************************

应用名称：Aliya记梦器
脚本功能：年会员
下载地址：https://too.st/gWf
更新日期：2026-09-04
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/(dream\.intl|api\.helix)\.apitonx\.com\/v\d\/(dream\/users\/me\/entitlement|apple\/users\/fun) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Aliya.js

[mitm]
hostname = dream.intl.apitonx.com, api.helix.apitonx.com

*************************************/


var ddm = JSON.parse($response.body);

if(/users\/me\/entitlement/.test($request.url)){
  ddm = {
    "created_at" : Date.now(),
    "data" : {
      "member_daily_card_remaining" : 99,
      "membership_expires_at" : "2099-09-09T09:09:09Z",
      "purchased_video_credit_balance" : 99,
      "membership_type" : "yearly",
      "free_image_text_remaining" : 3,
      "membership_video_credit_balance" : 99,
      "available_video_credit" : 99,
      "is_membership_valid" : true
    },
    "code" : 200
  };
}

if(/apple\/users\/fun/.test($request.url)){
  ddm = {
    "created_at" : Date.now(),
    "data" : {
      "status" : "ACTIVE",
      "subscription" : {
        "product_id" : "dream_01_1year",
        "period" : "Yearly",
        "product_name" : {
          "default" : "Yearly VIP",
          "es" : "VIP anual",
          "key" : "yearly",
          "en_CA" : "Yearly VIP",
          "fr" : "VIP annuel",
          "zh-Hans_HK" : "年会员",
          "zh-Hans_US" : "年会员",
          "zh-Hans_TW" : "年会员",
          "zh-Hans_BM" : "年会员",
          "zh-Hans_CA" : "年会员",
          "en" : "Yearly VIP",
          "zh_CN" : "年会员",
          "ja" : "年次VIP",
          "ar" : "VIP سنوي",
          "ko" : "연간 VIP",
          "en_SG" : "Yearly VIP",
          "ru" : "Ежегодный VIP",
          "zh-Hant" : "年會員",
          "hi" : "वार्षिक वीआईपी",
          "zh" : "年会员",
          "pt" : "VIP anual",
          "de" : "Jährlicher VIP"
        },
        "lifetime_free" : false
      },
      "expires_date" : "2099-09-09T09:09:09Z",
      "auto_renewal_status" : "OFF",
      "environment" : "Production",
      "user_id" : "67038E99-E3EC-4060-B64F-88AA99BB00CC",
      "user_id_display" : "88AA99BB00CC"
    },
    "code" : 200
  };
}

$done({ body: JSON.stringify(ddm) });
