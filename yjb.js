/*************************************

项目名称：养基宝
下载地址：https://t.cn/A6OIswyz
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.yangjibao\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/yjb.js

[mitm]
hostname = *.yangjibao.com

*************************************/


body = $response.body.replace(/\"vip_label":\w+/g, '\"vip_label":true').replace(/\"open_free_vip_sign":\w+/g, '\"open_free_vip_sign":true').replace(/\"subscribe_status":\d+/g, '\"subscribe_status":1').replace(/\"is_pay":\w+/g, '\"is_pay":true').replace(/\"vip_expiry_date":\w+/g, '\"vip_expiry_date":"2099-09-09"').replace(/\"message":"会员已过期"/g, '\"message":"SUCCESS"').replace(/\"code":400/g, '\"code":200').replace(/\"open_account":\d+/g, '\"open_account":true').replace(/\"vip_kefu_qrcode":\w+/g, '\"vip_kefu_qrcode":true').replace(/\"show_bkxh":\w+/g, '\"show_bkxh":true').replace(/\"open_account":\d+/g, '\"open_account":true');
$done({body});
