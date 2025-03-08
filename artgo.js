/*************************************

项目名称：ARTGO 个性水印
下载地址：https://t.cn/A6Bzayhw
更新日期：2025-03-08
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
http:\/\/api\.artgo\.ltd\/artgo-service\/api\/v\d\/user url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/artgo.js

*************************************/


var ddm = JSON.parse($response.body);ddm.vipExpiredAt = 4092599349000;$done({body : JSON.stringify(ddm)});