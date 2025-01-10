/*************************************

项目名称：钱迹-存钱记账小能手
下载地址：https://t.cn/A69ztdZy
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/qianji\.xxoojoke\.com\/vip\/configios url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/qianji.js

[mitm]
hostname = qianji.xxoojoke.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data.config.userinfo.vipend = 4092599349;
chxm1023.data.config.userinfo.vipstart = 1666666666;
chxm1023.data.config.userinfo.viptype = 100;

$done({body : JSON.stringify(chxm1023)});
