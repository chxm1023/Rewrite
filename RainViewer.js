/*************************************

项目名称：RainViewer天气预报
下载地址：https://t.cn/A6WqTbgz
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/d1hzbu30hrhkoe\.cloudfront\.net\/mobile\/verify\/ios url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/RainViewer.js

[mitm]
hostname = d1hzbu30hrhkoe.cloudfront.net

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = {...chxm1023.data,
    "is_grace" : true,
    "purchased" : true,
    "is_trial" : true,
    "is_cancelled" : true,
    "type" : 2,
    "has_orders" : true,
    "expiration" : 4092599349,
    "is_expired" : false
  };

$done({body : JSON.stringify(chxm1023)});
