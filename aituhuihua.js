/*************************************

项目名称：爱涂绘画
下载地址：https://t.cn/A6OlvCzI
更新日期：2025-01-08
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/kkr-user\.tapque\.com\/kkruserapi\/userOrderInfo\/isVip url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/aituhuihua.js

[mitm]
hostname = kkr-user.tapque.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "msg" : "处理完成",
  "records" : {
    "isVipValue" : true,
    "vipExpireDate" : "2099-09-09 09:09:09"
  },
  "code" : 6000
};

$done({body : JSON.stringify(chxm1023)});
