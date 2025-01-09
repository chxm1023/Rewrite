/*************************************

项目名称：搜罗好货
下载地址：#小程序://搜罗好货/Rt7Kuvpe4GLPjaD
更新日期：2025-01-08
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.i3zh\.com\/wp-json\/watch-life-net\/.+\/(options|posts) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xcx/slhh.js

[mitm]
hostname = www.i3zh.com

*************************************/


var body = $response.body;
var ddm = JSON.parse(body);

ddm.listAdId = "";
ddm.videoAdId = "";
ddm.interstitialAdId = "";
ddm.excitationAd = "0";
ddm.detailAd = "0";

$done({body : JSON.stringify(ddm)});
