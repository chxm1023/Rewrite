/*************************************

项目名称：周易起名大师
下载地址：https://t.cn/A6EhpFZM
更新日期：2024-09-19
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.zhouyilive\.com\/qm-api\/nm_user\.php url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zyqmds.js

[mitm]
hostname = www.zhouyilive.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data.vip = "1";
chxm1023.data.hpc_amount = "999";

$done({body : JSON.stringify(chxm1023)});