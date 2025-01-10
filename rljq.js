/*************************************

项目名称：日历假期
下载地址：https://t.cn/A60MIBOY
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/calendar\.aiyohoo\.com\/api\/.+\/(user\/device|calendar\/dev_auth) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/rljq.js

[mitm]
hostname = calendar.aiyohoo.com

*************************************/


var body = $response.body

body = body.replace(/\"vip_expired_time":\d+/g, '\"vip_expired_time":4092599349000');
body = body.replace(/\"vip":\d+/g,'\"vip":1');
body = body.replace(/\"required_vip":\d+/g, '\"required_vip":10');

$done({body});
