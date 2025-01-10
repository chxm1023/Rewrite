/*************************************

项目功能：搜图神器 (先登录账号)
下载地址：https://t.cn/A6o9s1WB
版本支持：1.7.3
更新日期：2023-11-30
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用方法：请先登录账号，再开脚本。

**************************************

[rewrite_local]
^https?:\/\/.*\.soutushenqi\.com\/(api\/.+\/account\/(token|info)|cykj_community|v\d\/home\/dialog) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/soutu.js

[mitm]
hostname = *.soutushenqi.com

*************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);
const user = /account\/(token|info)/;
const aicl = /cykj_community\/(config\/tools\/.+|ai_draw\/self.+)/;
const tcad = /home\/dialog/;

if(user.test($request.url)){
   chxm1023.data = {...chxm1023.data, 
       "vipPastDueTime" : 4092599349,
       "vipLabelLevel" : 4,
       "vipLabel" : "Lv10元老捐赠会员",
       "pcVipPastDueTime" : 4092599349,
       "vipType" : 1024,
       "isVirtual" : 1,
       "vitalityPcVipPastDueTime" : 4092599349,
       "pcVipType" : 1024,
       "vitalityVipPastDueTime" : 4092599349
     };
}

if(aicl.test($request.url)){
   body = body.replace(/\"surplus":\d+/g, '\"surplus":99');
   body = body.replace(/\"total":\d+/g, '\"total":99');
   body = body.replace(/\"size":\d+/g, '\"size":0');
}

if(tcad.test($request.url)){
   chxm1023 = {};
}

body = JSON.stringify(chxm1023)
$done({body});