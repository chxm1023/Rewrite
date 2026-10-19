/*************************************

项目名称：一木记账
下载地址：https://t.cn/A6YRLuSR
更新日期：2026-10-19
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/yimuapp\.com:8082\/bookkeeping\/user\/getUserInfoById url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/yimujizhang.js

[mitm]
hostname = yimuapp.com

*************************************/


var ddm = JSON.parse($response.body);

ddm.result.vipTime = 4092599349000;  //会员到期时间，可删除
ddm.result.vipType = 2;  //永久会员

$done({body : JSON.stringify(ddm)});
