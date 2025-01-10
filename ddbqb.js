/*************************************

项目名称：逗逗表情包
下载地址：https://t.cn/A6T3e0nG
更新日期：2024-04-25
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.dbbqb\.com\/api\/(refresh\/token|login|sms\/register|user\/expire|orderForm) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/ddbqb.js

[mitm]
hostname = www.dbbqb.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const user = /(refresh\/token|login|sms\/register)/;
const vip = /user\/expire/;
const vipjl = /orderForm/;

if(user.test($request.url)){
  chxm1023.score = "999";
  chxm1023.vip = "true";
  chxm1023.vipExpireDate = "2099-09-09";
}

if(vip.test($request.url)){
  chxm1023 = {
    "score" : "999",
    "expire" : "2099-09-09 09:09:09"
  };
}

if(vipjl.test($request.url)){
  chxm1023= [{
    "amount" : 1,
    "status" : "已完成",
    "score" : 999,
    "createDate" : "2099-09-09 09:09:09",
    "name" : "终身体验"
  }];
}

$done({body : JSON.stringify(chxm1023)});
