/*************************************

项目名称：Pixelup AI照片增强器
下载地址：https://t.cn/A60PK5CX
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
特别提示：如果无效，先试用会员，再使用！

**************************************

[rewrite_local]
^https?:\/\/receipt-verifier\.cdwapi\.com\/receipt url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Pixelup.js

[mitm]
hostname = receipt-verifier.cdwapi.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "status": {
    "message": "Success",
    "code": 200
  },
  "payload": {
    "is_intro_offer": true,
    "latest_transaction_id": "300001314520000",
    "active": true,
    "is_renewal": false,
    "expires_at": 4092599349000,
    "auto_renew_status": "1",
    "grace_expires_at": 4092599349000,
    "product_id": "pixelup.pro.freetrial.1year.t1",
    "is_in_grace": true,
    "started_at": 1666666666666,
    "purchased_product_identifiers": [
      "pixelup.pro.freetrial.1year.t1"
    ],
    "latest_transaction_time": 1666666666666,
    "subscription_id": "300001314520000",
    "is_trial": true,
    "is_family_share": true
  }
};

$done({body : JSON.stringify(chxm1023)});