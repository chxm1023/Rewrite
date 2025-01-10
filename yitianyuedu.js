/*************************************

项目名称：一天阅读 解锁VIP
下载地址：https://t.cn/A6C6jqJt
脚本作者：chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]

^https:\/\/novel\.test\.onedayapp\.cn\/login\/sync.+ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/yitianyuedu.js

[mitm]

hostname = novel.test.onedayapp.cn

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data.vip = 3;
chxm1023.data.sex =1;

$done({body : JSON.stringify(chxm1023)});
