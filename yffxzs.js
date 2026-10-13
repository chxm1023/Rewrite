/*************************************

应用名称：语法分析助手
下载地址：http://c.u6v.cn/5sun1t
更新日期：2026-10-13
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.api-hz\.cloudbasefunction\.cn\/functions\/invokeFunction url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/yffxzs.js

[mitm]
hostname = *.api-hz.cloudbasefunction.cn

*************************************/


var body = $response.body;

body = body.replace(/\"vip":\d+/g, '\"vip":4092599349000');

body = body.replace(/\"letter_bean":\d+/g, '\"letter_bean":999999');

$done({body});