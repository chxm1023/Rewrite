/*************************************

应用名称：Cardify-AI错题本
脚本功能：终身会员
下载地址：https://shm.to/PdYiedK
更新日期：2026-07-31
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api-growing\.blynkaiapp\.cn\/v\d\/user url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Cardify.js

[mitm]
hostname = api-growing.blynkaiapp.cn

*************************************/

var ddm = JSON.parse($response.body);

Object.assign(ddm.data, {
    "status" : "ACTIVE",
    "subscription" : {
      "product_name" : "终身会员",
      "product_id" : "cardify_260621_lifetime",
      "period" : "Lifetime"
    },
    "expires_date" : "2099-09-09T09:09:09.000Z",
    "auto_renewal_status" : "OFF",
    "environment" : "Production"
});

$done({ body: JSON.stringify(ddm) });