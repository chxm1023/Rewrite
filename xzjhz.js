/*************************************

项目功能：小组件盒子 解锁永久VIP
下载地址：https://t.cn/A6oDCwJ6
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

**************************************

[rewrite_local]
^https:\/\/widget-box-api\.codefuture\.top\/v1\/users\/me url script-response-body https://raw.githubusercontent.com/chxm1023/script/main/Rewrite/xzjhz.js

[mitm]

hostname = widget-box-api.codefuture.top

*************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);

chxm1023.inviteCodeAmountLeft = 5;
chxm1023.isVip = true;
chxm1023.vipExpiredAt = "0";

body = JSON.stringify(chxm1023);

$done({body});
