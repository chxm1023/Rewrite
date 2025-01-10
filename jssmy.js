/*************************************

项目名称：极速扫描仪
下载地址：目前下架了
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/scanner\.jianse\.tv\/api\/users url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/jssmy.js

[mitm]
hostname = scanner.jianse.tv

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.lastDeviceId =  "00000000-0000-0000-0000-000000000000";
chxm1023.vipExpireDate = "2099-09-09 09:09:09";
chxm1023._instanceName = "666,666 (+86)";
chxm1023.countryCode = "86";
chxm1023.id = 666666;
chxm1023.lastLoginTime = "2022-11-27T09:12:28.529";
chxm1023.vip = true;
chxm1023.createTime = "2021-02-24T21:06:36";

$done({body: JSON.stringify(chxm1023)});
