/*************************************

项目名称：云上写作
下载地址：https://t.cn/A6EbmQL2
更新日期：2024-09-25
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.yunshangxiezuo\.com\/api\/getAuthenticate url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/ysxz.js

[mitm]
hostname = www.yunshangxiezuo.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data.user = {
  ...chxm1023.data.user,
  "vip" : 1,
  "vip_forever" : 1,
  "vip_last" : "2099-09-09 09:09:09"
};

$done({body : JSON.stringify(chxm1023)});