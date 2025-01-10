/*************************************

项目名称：青柠设计-P图抠图海报
下载地址：https://t.cn/A69gPvA3
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/.*\.qingning6\.com\/api\/(user\/getUserInfo|team\/teamInfo) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/qnsj.js

[mitm]
hostname = *.qingning6.com

*************************************/


var chxm1023 = JSON.parse($response.body);

const user = '/user/getUserInfo';
const tdxx = '/api/team/teamInfo';

if ($request.url.indexOf(user) != -1){
  chxm1023.result.isTeamUserVip = 1;
  chxm1023.result.isForeverVip = 1;
  chxm1023.result.vipDays = 1;
  chxm1023.result.vipExpireTime = 4092599349000;
  chxm1023.result.isVip = 1;
  chxm1023.result.teamVipExpireTime = 4092599349000;
  chxm1023.result.totalVolume = 1411055000000;
  chxm1023.result.h5DesignQuota = 99;
  chxm1023.result.teamVipQuota = 99;
}

if ($request.url.indexOf(tdxx) != -1){
  chxm1023.result.memberCount = 1;
  chxm1023.result.vipMemberCount = 99;
  chxm1023.result.currUserTeamVipQuota = 99;
  chxm1023.result.isForever = 1;
  chxm1023.result.vipExpireTime = 4092599349000;
  chxm1023.result.isMember = 1;
  chxm1023.result.vipUserQuota = 99;
}

$done({body : JSON.stringify(chxm1023)});
