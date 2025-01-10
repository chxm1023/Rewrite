/*************************************

项目名称：问真排盘
下载地址：https://too.st/5tQ
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/bzpp2\.iwzbz\.com\/api\/.+\/(user\/getvipinfo|User\/getWXPW) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/wenzhenpaipan.js

[mitm]
hostname = bzpp2.iwzbz.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.isSuccess = true;
chxm1023.validateKey = "chxm1023";
chxm1023.data = {
    "expires" : "2099-09-09 09:09:09",
    "vipLevel" : 3
  };

$done({body : JSON.stringify(chxm1023)});
