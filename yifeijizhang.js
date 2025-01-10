/*************************************

项目名称：一飞记账
下载地址：https://t.cn/A6Oth7tC
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/jz\.jarstones\.com\/api url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/yifeijizhang.js

[mitm]
hostname = jz.jarstones.com

*************************************/


var body = $response.body;

body = body.replace(/\"vipValid":\w+/g, '\"vipValid":true');

body = body.replace(/\"vipExpired":\w+/g, '\"vipExpired":false');

body = body.replace(/\"vipType":\d+/g, '\"vipType":3');

$done({body});
