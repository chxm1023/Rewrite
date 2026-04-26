/*************************************

应用名称：每日开嗓
脚本功能：解锁练习单元
下载地址：https://is.gd/nemzKD
更新日期：2026-04-26
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
http:\/\/www\.edragongame\.com\/api\/resang_api_debug url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/meirikaisang.js

*************************************/


body = $response.body.replace(/\"needpay":"\d+"/g, '\"needpay":"0"');

$done({body});