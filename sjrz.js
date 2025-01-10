/*************************************

项目名称：时间日志
下载地址：https://t.cn/A6QSJY0L
更新日期：2024-06-27
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^http:\/\/liujia95\.xyz\/v\d\/user\/(get_user|register) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/sjrz.js

[mitm]
hostname = liujia95.xyz

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.body.vipType = 4;

$done({body : JSON.stringify(chxm1023)});
