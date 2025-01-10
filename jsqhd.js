/*************************************

项目名称：计算器HD解锁会员
下载地址：http://t.cn/A6xF7wam
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.40sishi\.com\/(list|currency|calculator)\/user\/profile$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/jsqhd.js

[mitm] 
hostname = www.40sishi.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data["vipState"] = {
    "state" : 1,
    "forever" : true,
    "startTime" : 1566600000000,
    "expireTime" : 4092599349000
};

$done({body : JSON.stringify(chxm1023)});
