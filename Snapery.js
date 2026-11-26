/*************************************

应用名称：Snapery-长截图&拼图
下载地址：https://a.u9c.cn/6xpMZq
更新日期：2026-11-26
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.ofwimg\.com\/api\/user\/entitlement url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Snapery.js

[mitm]
hostname = api.ofwimg.com

*************************************/


var ddm = {
  "is_vip" : true,
  "daily_claimed_today" : false,
  "vip_kind" : "lifetime",
  "next_daily_claim_at" : "2099-09-09T09:09:09Z",
  "vip_expires_at" : null,
  "daily_free_credits" : 4,
  "credits" : 999,
  "vip_daily_credits" : 12
};

$done({ body: JSON.stringify(ddm) });