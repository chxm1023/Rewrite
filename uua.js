/*************************************

项目名称：uua涩涩视频
下载地址：https://m.uaa002.com
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/(api|m)\.uaa.*\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/uua.js

[mitm]
hostname = *.uaa*.com

*************************************/


var body = $response.body;

body = body.replace(/\"isVip":\w+/g, '\"isVip":true');

body = body.replace(/\"active":\d+/g, '\"active":1');

body = body.replace(/\"authTime":\w+/g, '\"authTime":"2099-09-09T09:09:09Z"');

body = body.replace(/\"authTime":".*?"/g, '\"authTime":"2099-09-09T09:09:09Z"');

body = body.replace(/\"roleDesc":".*?"/g, '\"roleDesc":"VIP会员"');

body = body.replace(/\"roleNames":".*?"/g, '\"roleNames":"VIP会员"');

body = body.replace(/\"roleName":".*?"/g, '\"roleName":"member"');

body = body.replace(/\"vip":\d+/g, '\"vip":0');

body = body.replace(/\"code":\d+/g, '\"code":0');

body = body.replace(/\"purchased":\w+/g, '\"purchased":true');

body = body.replace(/\"limit":".*?"/g, '\"limit":"免费"');

body = body.replace(/\"model":\w+/g, '\"model":true');

body = body.replace(/\"imageCount":\d+/g, '\"imageCount":9999');

body = body.replace(/\"payChapterCount":\d+/g, '\"payChapterCount":0');

body = body.replace(/("price":\s*)([-+]?\d*\.?\d+)/g, '$1 0');

body = body.replace(/\"member":\d+/g, '\"member":0');

$done({body});
