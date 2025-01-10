/*************************************

项目名称：诗词集韵
下载地址：https://too.st/8JN
更新日期：2024-03-11
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/ouyangxunshufa\.azurewebsites\.net\/JiyunAPI url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/scjy.js

[mitm]
hostname = ouyangxunshufa.azurewebsites.net

*************************************/


var body = $response.body.replace(/\"Vip":\w+/g, '\"Vip":true');$done({body});
