/*************************************

应用名称：专注清单-番茄钟&任务清单
下载地址：http://c.u6v.cn/5A0vsq
更新日期：2026-09-19
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.focustodo\.net\/v\d+\/user\/(config|expired-d) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/PomodoroToDo.js

[mitm]
hostname = www.focustodo.net

*************************************/


var ddm = JSON.parse($response.body);

ddm.status = 0;
ddm.expiredDate = 0;

$done({body : JSON.stringify(ddm)});