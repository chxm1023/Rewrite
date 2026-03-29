/*************************************

应用名称：PhotoGrid
脚本功能：解锁Pro，AI不可用
下载地址：https://is.gd/16B8xy
更新日期：2026-03-29
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/pgapi\.photogrid\.app\/(v\d\/(ios\/auth|ai\/func)|user) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/PhotoGrid.js

[mitm]
hostname = pgapi.photogrid.app

*************************************/


var ddm = JSON.parse($response.body);
const expiresSec = 4094717349;
const expiresMs = 4094717349000;

if(/ios\/auth/.test($request.url)){
  Object.assign(ddm.data.extra, {
    "plan_type": 0,
    "plan": "photogrid_pro_annual_2999",
    "user_status": 6,
    "expires_date": expiresSec,
    "original_purchase_date": expiresSec,
    "is_trial_period": true,
    "auto_renew_status": 0
  });
  Object.assign(ddm.data.iap_info, {
    "is_in_intro_offer_period": false,
    "user_payment_status": 2,
    "product_id": "photogrid_pro_annual_2999",
    "original_transaction_id": ["490001549529018"],
    "expires_date_ms": expiresMs,
    "from_db": false
  });
  
  Object.assign(ddm.data.premium, {
    "source": "iap",
    "expires_date_ms": expiresMs,
    "type": 0,
    "is_new": false,
    "IsSuper": false,
    "is_super_ios": false,
    "single_func": 0
  });
  Object.assign(ddm.data.login_info, {
    "is_premium": 1,
    "premiumExpiredAt": expiresSec
  });
}

if(/user\/signup/.test($request.url)){
  ddm.data.isPremium = 1;
  ddm.data.premiumExpiredAt = expiresSec;
  Object.assign(ddm.data.info, {
    "isPremium": 1,
    "premium_type": "pro",
    "premiumExpiredAt": expiresSec
  });
}

if(/user\/profile/.test($request.url)){
  Object.assign(ddm.data, {
    "isPremium": 1,
    "premium_type": "pro",
    "premiumExpiredAt": expiresSec
  });
}

if(/ai\/func\/limit\/check/.test($request.url)){
  ddm = {
    "errmsg" : "",
    "data" : {
      "required_points" : 0,
      "times" : 10,
      "points_description" : "用户当前可用总积分：99",
      "can_make" : true,
      "free_times" : 10,
      "user_total_points" : 99
    },
    "code" : 0
  }
}

if(/ai\/func\/groups/.test($request.url)){
  ddm.data.points_description = "用户当前可用总积分：999";
  ddm.data.user_total_points = 999;
  ddm.data.user_times_info.times = 0;
  ddm.data.user_times_info.total_times = 99;
  ddm.data.user_times_info.used_times = 0;
  ddm.data.user_times_info.expired_time = expiresSec;
  ddm.data.user_times_info.expire_type = 1;
}

$done({ body: JSON.stringify(ddm) });
