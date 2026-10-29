/*************************************

项目名称：畅玩空间
下载地址：https://play.wo1wan.com
更新日期: 2026-10-29
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/play\.wo1wan\.com\/nextgame\/igwuser\/userinfo url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/changwan.js

[mitm]
hostname = play.wo1wan.com

*************************************/


var ddm = JSON.parse($response.body);

Object.assign(ddm.info.LevelInfo, {
  "AllVipXP" : 999,
  "SVipExpires" : "2099-09-09T09:09:09Z",
  "VipLevel" : 5,
  "Svip" : 1,
  "VipExpires" : "2099-09-09T09:09:09Z",
  "Level" : 99,
  "NowXP" : 999,
  "NowVipXP" : 999,
  "AllXP" : 999,
  "NextLevel" : 999
});

$done({ body: JSON.stringify(ddm) });