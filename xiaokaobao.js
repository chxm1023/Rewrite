/*************************************

项目名称：消考宝-不完整版
下载地址：https://too.st/bw9
更新日期：2024-10-21
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.119xkb\.com\/api\/(theory|user|index|type|Practical) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xiaokaobao.js

[mitm]
hostname = www.119xkb.com

*************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);

if(/theory|index|type|Practical/.test($request.url)){
  body = body.replace(/\"isfree":"\d+"/g, '\"isfree":"0"');
  body = body.replace(/\"type":\w+/g, '\"type":true');
  body = body.replace(/\"isBuy":\d+/g, '\"isBuy":1');
  body = body.replace(/\"free":"\d+"/g, '\"free":"0"');
  body = body.replace(/\"catid":"\d+"/g, '\"catid":"1"');
}

if(/user\/user/.test($request.url)){
  chxm1023.user.period = "2099-09-09 09:09:09";
  chxm1023.user.type = 1;
  chxm1023.user.golds = 1;
  chxm1023.user.order_date = "2099-09-09 09:09:09"
  chxm1023.user.recruitment = true;
  chxm1023.user.catid = "1";
  body = JSON.stringify(chxm1023);
}

if(/exercise/.test($request.url)){
  chxm1023.status = "success";
  chxm1023.message = "获取结果成功";
  chxm1023.code = 200;
  body = JSON.stringify(chxm1023);
}

$done({body});
