/*************************************

项目名称：Trancy
下载地址：https://t.cn/A6H8h54O
更新日期：2024-06-02
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.trancy\.org\/1\/user\/profile url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/trancy.js

[mitm]
hostname = api.trancy.org

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = {
   ...chxm1023.data,
   "expireAt" : 4092599349000,
   "createdAt" : 1717291137217,
   "premium" : true,
   "subscription" : 1
}

$done({body : JSON.stringify(chxm1023)});
