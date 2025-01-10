
/*************************************

项目名称：水印宝/闪电水印/熊猫水印/水印全能王
下载地址：https://t.cn/A6OkPhjr
下载地址：https://t.cn/A6OkP7Fd
下载地址：https://t.cn/A6OkPZhJ
下载地址：https://t.cn/A6OkPZ3x
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
https?:\/\/water.*\.yunxiaoguo\.cn\/user\/info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/shuiyin.js

[mitm]
hostname = water*.yunxiaoguo.cn

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.content.waterVipInfo = {      "beginTime": "2023-09-09 09:09:09",      "createTime": "2023-09-09 09:09:09",      "expireTime": "2099-09-09 09:09:09",      "firstOpenTime": "2023-09-09 09:09:09",      "remainDays": 9999,      "sign": "Goiwv0Gt03s",      "typeName": "终身会员",      "userSign": "chxm1023"    };

$done({body : JSON.stringify(chxm1023)});
