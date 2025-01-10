/*************************************

项目功能：推糖-壁纸头像美图社区
下载地址：https://t.cn/Ai3pMcdl
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^http[s]?:\/\/.*\.duitang\.com\/napi url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/duitang.js

[mitm] 
hostname = *.duitang.com

*************************************/


var body = $response.body;

body = body.replace(/\"vip":\w+/g, '\"vip":true');
body = body.replace(/\"svip_mechanism":\d+/g, '\"svip_mechanism":1');
body = body.replace(/\"is_life_artist":\w+/g, '\"is_life_artist":true');
body = body.replace(/\"isnew":\w+/g, '\"isnew":true');
body = body.replace(/\"vip_end_at":\d+/g, '\"vip_end_at":4092599350');
body = body.replace(/\"vip_end_at_mills":\d+/g, '\"vip_end_at_mills":4092599350000');
body = body.replace(/\"vip_level":\d+/g, '\"vip_level":11');
body = body.replace(/\"latest_vip_level":\d+/g, '\"latest_vip_level":11');
body = body.replace(/\"is_certify_user":\w+/g, '\"is_certify_user":true');
body = body.replace(/\"be_follow_count":\d+/g, '\"be_follow_count":1000000');
body = body.replace(/\"follow_count":\d+/g, '\"follow_count":1000000');
body = body.replace(/\"score":\d+/g, '\"score":1000000');

$done({body});