/*************************************

项目名称：flowkey流琴-自学钢琴
下载地址：http://a.u9c.cn/5HwOuj
更新日期：2026-10-20
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/graphql\.flowkey\.com\.cn\/graphql url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/flowkey.js

[mitm]
hostname = graphql.flowkey.com.cn

*************************************/


var ddm = JSON.parse($response.body);

const Params = {
  "hasAccess" : true,
  "hasLifetime" : true,
  "isInArpeggio" : true,
  "hasSubscription" : true,
  "premiumExpiresAt" : 4092599349,
  "subscriptionStatus" : 1,
  "planName" : "flowkey高级会员-永久",
  "subscriptionManagedBy" : "Apple",
  "hasAccess" : true,
  "accessLevel" : "full",
  "requiredAccessLevel" : "full",
  "free" : true
};

searchAndModify(ddm, Params);

$done({body : JSON.stringify(ddm)});

function searchAndModify(obj, Params) {for (const prop in obj) {if (typeof obj[prop] === 'object' && obj[prop] !== null) {searchAndModify(obj[prop], Params);} else if (prop in Params) {obj[prop] = Params[prop];}}}