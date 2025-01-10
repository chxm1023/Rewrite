/*************************************

项目名称：杂志天下
下载地址：https://t.cn/A6ObfXUi
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.fuyoutech\.club\/magworld\/member\/status url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zztx.js

[mitm]
hostname = www.fuyoutech.club

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.memberStatus = 2;
chxm1023.startTime = "2022-09-09 09:09:09";
chxm1023.finishTime = "2099-09-09 09:09:09";

$done({body : JSON.stringify(chxm1023)});
