/*************************************

项目名称：婚礼纪
下载地址：https://too.st/7OO
更新日期：2024-01-27
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
https?:\/\/(api|www)\.hunliji\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/hlj.js

[mitm]
hostname = *.hunliji.com

*************************************/


var body = $response.body;
const AD = '/appApi/startAD/info';

if ($request.url.indexOf(AD) != -1){  body = body.replace(/\"data"/g, delete '\"data"');}
body = body.replace(/\"memberStatus":\d+/g, '\"memberStatus":1');
body = body.replace(/\"isSuccess":\w+/g, '\"isSuccess":true');
body = body.replace(/\"isLocked":\w+/g, '\"isLocked":false');
body = body.replace(/\"canChangeTitle":\w+/g, '\"canChangeTitle":true');
body = body.replace(/\"success":\w+/g, '\"success":true');
body = body.replace(/\"retCode":\d+/g, '\"retCode":0');
body = body.replace(/\"msg":"\w+"/g, '\"msg":"成功"');
body = body.replace(/\"clickBtnText":"(.*?)"/g, '\"clickBtnText":"永久会员"');

$done({body});