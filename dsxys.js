/*************************************

应用名称：大师兄/橘子影视
脚本功能：解锁VIP
下载地址：https://dsx777.app
更新日期：2026-07-02
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/43\.248\.103\.10:\d+\/(auth\/(register|me)|bpi_w) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/dsxys.js

[mitm]
hostname = 43.248.103.10

*************************************/


var ddm = JSON.parse($response.body);
const url = $request.url;

if (/auth\/(register|me)/.test(url)) {
  ddm.data.hasPaidSuccess = true;
}

if (/bpi_w/.test(url)) {
  ddm.data = [];
}

$done({ body: JSON.stringify(ddm) });