/*************************************

项目名称：漫读-电子书阅读器
下载地址：https://t.cn/A6TeeJiV
更新日期：2024-04-30
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^http:\/\/enjoy_reading_pro\.particlethink\.com:8083\/app\/api\/v\d\/user\/is_vip url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/mandu.js

[mitm]
hostname = pro.particlethink.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = true;

$done({body : JSON.stringify(chxm1023)});