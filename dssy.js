/*************************************

项目名称：大神水印
下载地址：https://t.cn/A6Kfbf71
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/dashen.*\.shuiyinyu\.com\/m\/user\/get_user_info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/dssy.js

[mitm]
hostname = dashen*.shuiyinyu.com

*************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);

chxm1023.data.gift_tip = "礼券999999999";
chxm1023.data.vip_expire_time = 4092599350000;
chxm1023.data.auto_subscribe_or_permanent_vip = true;

$done({body : JSON.stringify(chxm1023)});

