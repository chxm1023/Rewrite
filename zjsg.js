/*************************************

项目名称：指尖时光
下载地址：https://too.st/5Dh
更新日期：2024-01-28
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/integral2\.(dasyibalang|zhijiantime)\.com\/.+\/User url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zjsg.js

[mitm]
hostname = integral2.*.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data.VIP = 3;  //永久会员
//chxm1023.data.MembersBeginDateMs = 1666666666666;  //会员开始时间
//chxm1023.data.MembersEndDateMs = 4092599349000;  //会员到期时间

$done({body : JSON.stringify(chxm1023)});
