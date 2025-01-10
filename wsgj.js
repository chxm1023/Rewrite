/*************************************

项目功能：网速管家 解锁VIP（美区下载）
下载地址：https://t.cn/A6ou0r5U
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

**************************************

[rewrite_local]

^https:\/\/api-v3\.speedtest\.cn\/user\/info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/wsgj.js

[mitm]

hostname = api-v3.speedtest.cn

*************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);

chxm1023.data.integral = "999999999";
chxm1023.data.vipExpire = "2099-09-09 09:09:09";
chxm1023.data.isVip = 1;

body = JSON.stringify(chxm1023);

$done({body});
