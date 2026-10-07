/*************************************

应用名称：读手表-insight AI健康伙伴
脚本功能：ProMax会员
下载地址：http://c.u6v.cn/5WuZlv
更新日期：2026-10-07
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/watch\.taotiangou\.cn\/prod-api\/watch\/insight\/userInfo url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/insight.js

[mitm]
hostname = watch.taotiangou.cn

*************************************/


var ddm = JSON.parse($response.body);

if(/getUserMemberInfo/.test($request.url)){
  Object.assign(ddm.data, {
      "proStartTime" : "2026-09-09 09:09:09",
      "isProMaxPermanent" : 1,
      "memberType" : 2,
      "isProPermanent" : 1,
      "proEndTime" : "2099-09-09 09:09:09",
      "isPermanent" : 1,
      "proMaxEndTime" : "2099-09-09 09:09:09",
      "proMaxStartTime" : "2026-09-09 09:09:09"
  });
}

if(/memberStatus/.test($request.url)){
  ddm.data.isProMax = 1;
  ddm.data.registerTimestamp = 1788916149000;
}

if(/memberSubscribeRecord/.test($request.url)){
  ddm.data = [
    {
      "purchaseDuration" : "永久",
      "purchaseTime" : "2026-09-09 09:09:09",
      "memberType" : 2,
      "memberDesc" : "开通proMax会员",
      "endTime" : "永久",
      "purchaseMethod" : "苹果订阅"
    },
    {
      "purchaseDuration" : "永久",
      "purchaseTime" : "2026-09-09 09:09:09",
      "memberType" : 1,
      "memberDesc" : "开通pro会员",
      "endTime" : "永久",
      "purchaseMethod" : "苹果订阅"
    }
  ];
}

$done({ body: JSON.stringify(ddm) });