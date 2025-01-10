/*************************************

项目名称：Wallcraft-动态壁纸
下载地址：http://t.cn/A6iO7Eht
更新日期：2024-03-01
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/billing-ios\.wallpaperscraft\.com\/(verify_receipt|products)\/remove_ads$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Wall.js

[mitm]
hostname = billing-ios.wallpaperscraft.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const vipa = '/verify_receipt/remove_ads';
const vipb = '/products/remove_ads';

if ($request.url.indexOf(vipa) != -1){
  chxm1023.items["all_time"] = {
    "type" : "nonconsumable",
    "is_active" : true
  };
  chxm1023.items["com.wallpaperscraft.wallpapers.year.1.5baks"] = {
    "type" : "subscription",
    "already_used_introductory_price" : false,
    "is_active" : true
  };
}

if ($request.url.indexOf(vipb) != -1){
  chxm1023 = {  "items" : {   "nonconsumables" : [  "all_time" ],   "subscriptions" : [  "com.wallpaperscraft.wallpapers.year.1.5baks" ]}};
}

$done({body : JSON.stringify(chxm1023)});