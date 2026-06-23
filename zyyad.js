/*************************************

应用名称：赵云与阿斗-小游戏
脚本功能：免广告领奖励
下载地址：https://shm.to/zyyad
更新日期：2026-06-20
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.mihuangame\.com\/api\/v\d\/sys\/user\/login url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zyyad.js

[mitm]
hostname = *.mihuangame.com

*************************************/


var ddm = JSON.parse($response.body);ddm.data.userType = 1;$done({ body: JSON.stringify(ddm) });