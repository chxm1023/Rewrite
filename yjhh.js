/****************************************

项目功能：意间Ai绘画
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*****************************************

[rewrite_local]

^https:\/\/app\.yjai\.art:30108\/painting\/site\/getUserInfo url script-response-body https://raw.githubusercontent.com/chxm1023/script/main/Rewrite/yjhh.js

[mitm]

hostname = app.yjai.art

****************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);
chxm1023.data.Score = 999999;
chxm1023.data.VipLevel = 1;

body = JSON.stringify(chxm1023);

$done({body});
