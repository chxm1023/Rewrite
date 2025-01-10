/*************************************

项目名称：PhotoDance
下载地址：https://t.cn/A6HK65UJ
更新日期：2024-05-24
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/viart-api\.afunapp\.com\/photodance\/(user_api\/(get_user_info|visitor_login)|order_api\/apple_query) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/photodance.js

[mitm]
hostname = viart-api.afunapp.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = {
  ...chxm1023.data,
  "vip_remain_time" : 4092599349,
  "vip_type" : 1,
  "vip_year" : 1
},

$done({body : JSON.stringify(chxm1023)});
