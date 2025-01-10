/*************************************

项目名称：心脏+
下载地址：https://too.st/5DK
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.995120\.cn\/mini\/api\/appleplus\/ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xinzang.js

[mitm]
hostname = api.995120.cn

*************************************/


var body = $response.body;
var newYearCard = '\"yearCard\":{\"goodNo\" : "dc3c24a224cc41fe804108c856ebfd9c",\"status\" : 1,\"content\" : \"叮当猫の分享频道\" ,\"endTime\" : \"2099-09-09到期\",\"type\" : 3,\"serviceBalanceId\" : 2501498,\"goodName\" : "心脏+包年"}';
var newexperienceCard = '\"experienceCard\":{\"status\" : 1,\"content\" : \"体验卡剩余3次\",\"balanceNum\" : 99999999,\"endTime\" : \"2099-09-09到期\",\"balanceName\" : \"极速心电图（ECG）分析服务\",\"type\" : 1,\"serviceBalanceId\" : 9999999}';

body = body.replace(/\"endTime":".*?"/g, '\"endTime":"2099-09-09到期"');

body = body.replace(/\"hwMembershipDate":".*?"/g, '\"hwMembershipDate":"2099-09-09到期"');

body = body.replace(/\"terminalType":"\d+"/g, '\"terminalType":"0"');

body = body.replace(/\"result":\w+/g, '\"result":true');

body = body.replace(/\"yearCard\":\{.*?\}/g, newYearCard);
body = body.replace(/\"experienceCard\":\{.*?\}/g, newexperienceCard);

body = body.replace(/\"sex":\d+/g, '\"sex":1');

$done({body});