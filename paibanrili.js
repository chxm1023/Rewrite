/*************************************

应用名称：排班日历
脚本功能：VIP会员
下载地址：https://t.cn/A6Nz3Zuo
更新日期：2026-09-02
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/schedule-api\.julanling\.com\/.+\/(get_member_info|vip_detail|get_splash) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/paibanrili.js

[mitm]
hostname = schedule-api.julanling.com

*************************************/


var ddm = JSON.parse($response.body);
var url = $request.url;
var expireTime = "2099-09-09 09:09:09";
var startTime = "2026-06-06 06:06:06";

var benefits = {
  "data_backup": {
    "expire_time": expireTime,
    "start_time": startTime,
    "business_type": "data_backup",
    "attribute": []
  },
  "more_shift": {
    "expire_time": expireTime,
    "start_time": startTime,
    "business_type": "more_shift",
    "attribute": [
      {
        "LIMIT": "100"
      }
    ]
  },
  "vip_identity": {
    "expire_time": expireTime,
    "start_time": startTime,
    "business_type": "vip_identity",
    "attribute": []
  },
  "android_widget_month": {
    "expire_time": expireTime,
    "start_time": startTime,
    "business_type": "android_widget_month",
    "attribute": []
  }
};

if (!ddm.results || typeof ddm.results !== "object") {
  ddm.results = {};
}

if (url.includes("get_member_info")) {
  Object.assign(ddm.results, {
    "grade": 3,
    "upgrade_grade_img": "",
    "benefits": benefits
  });

}

else if (url.includes("vip_detail")) {
  Object.assign(ddm.results, {
    "card_number": "ddm1023",
    "grade": 3
  });
}

else if (url.includes("get_splash")) {
  ddm.results = [];
}

$done({ body: JSON.stringify(ddm)});