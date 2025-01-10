/*************************************

项目名称：小熊壁纸大全
下载地址：https://t.cn/A6Yka1VF
更新日期：2024-03-14
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
http:\/\/wallpaper\.jingqueyun\.com\/\/index\.php\/\/(user\/getUserInfo|download) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xxbzdq.js

[mitm]
hostname = wallpaper.jingqueyun.com

*************************************/


var body = $response.body;

body = body.replace(/\"isVip":\w+/g, '\"isVip":true');
body = body.replace(/\"data":"\d+"/g, '\"data":"99"');
body = body.replace(/\"is_vip":\d+/g, '\"is_vip":1');
body = body.replace(/\"expired_date":"(.*?)"/g, '\"expired_date":"2099-09-09 09:09:09"');

$done({ body });
