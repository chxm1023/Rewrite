/*************************************

项目功能：小打卡 解锁VIP
下载地址：https://t.cn/A6K7nCJi
更新日期：2025-01-08
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]

^https:\/\/.*\.sharedaka\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xcx/xiaodaka.js

[mitm]

hostname = *.sharedaka.com

*************************************/


var body = $response.body;

body = body.replace(/\"hasOpenedMember":\w+/g, '\"hasOpenedMember":true');

body = body.replace(/\"endTime":\w+/g, '\"endTime":4092599349000');

body = body.replace(/\"totalLogDays":\d+/g, '\"totalLogDays":9999');

body = body.replace(/\"totalNote":\d+/g, '\"totalNote":9999');

body = body.replace(/\"showMemberStatus":\d+/g, '\"showMemberStatus":1');

body = body.replace(/\"enable":\w+/g, '\"enable":true');

body = body.replace(/\"expireTimeStr":".*?"/g, '\"expireTimeStr":"2099-09-09 09:09:09"');

body = body.replace(/\"packageLevel":\w+/g, '\"packageLevel":2');

body = body.replace(/\"showProduct":\d+/g, '\"showProduct":1');

body = body.replace(/\"memberMark":\w+/g, '\"memberMark":true');

$done({body});
