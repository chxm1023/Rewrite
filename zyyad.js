/*************************************

应用名称：赵云与阿斗-小游戏
脚本功能：免广告领奖励
下载地址：https://shm.to/zyyad
更新日期：2026-06-27
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.mihuangame\.com\/(api\/v\d\/sys\/user|toutiaoGame\/ZhaoYunAndADou) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zyyad.js

[mitm]
hostname = *.mihuangame.com

*************************************/


let ddm = {};

try {
  ddm = JSON.parse($response.body || "{}");
} catch (e) {
  $done({ body: $response.body });
}

const date = new Date();
const hour = date.getHours();
const now = Date.now() - (hour < 2 ? 30 : 60) * 60 * 1000;

if (/user/.test($request.url)) {

  if (!ddm.data) ddm.data = {}; // 创建data
  if (!ddm.data.userData) ddm.data.userData = {}; // 创建userData
  if (!ddm.data.info) ddm.data.info = {}; // 创建info
  if (!ddm.data.attach) ddm.data.attach = {}; // 创建attach

  Object.assign(ddm.data, {
    "userType": 1 //用户权限
  });

  Object.assign(ddm.data.userData, {
    "sm": 30, // 体力值
    "gd": 9999999, //金币
    "hfb": true, //功能开关
    "hfs": true, //功能开关
    "pap": true, //功能开关
    "wdg": true, //功能开关
    "wfr": true, //功能开关
    "op": true //功能开关
  });

  if (!Array.isArray(ddm.data.userData.ps)) ddm.data.userData.ps = []; //技能领取记录

  const interval = 5 * 60 * 1000; //间隔5分钟

  const date = new Date();
  const passedMinute = date.getHours() * 60 + date.getMinutes();

  //最多往前推35分钟，但不会跨到昨天
  const offset = Math.min(7 * interval, Math.max((passedMinute - 1) * 60 * 1000, 0));

  //技能领取时间
  let psTime = Date.now() - offset;
  [
    [10, "速攻符"],
    [11, "降妖符"],
    [12, "农民"],
    [24, "摸金校尉"],
    [13, "招贤榜"],
    [4, "神兵符"],
    [15, "齐头并进"],
    //[18, "泥潭"],
    [19, "洛阳铲"]
  ].forEach(function (item) {
    const skill = [
      item[0], //技能ID
      1, //已领取
      psTime //领取时间
    ];
    const old = ddm.data.userData.ps.find(function (v) {
      return v[0] === item[0];
    });
    if (old) {
      old[1] = 1; // 已领取
      old[2] = psTime; // 更新时间
    } else {
      ddm.data.userData.ps.push(skill); //新增技能领取记录
    }
    psTime += interval; //每个技能获取间隔5分钟
  });
  if (Array.isArray(ddm.data.userData.aul)) {
    ddm.data.userData.aul = ddm.data.userData.aul.map(function () {
      return 1;
    });
  }
  // 装备碎片
  if (Array.isArray(ddm.data.userData.wf)) {
    ddm.data.userData.wf.forEach(function (item) {
      if (Array.isArray(item) && item.length > 1) {
        item[1] = Math.max(item[1], 5); //最低强化5级，不降低已有等级
      }
    });
  }
}

if (/toutiaoGame\/ZhaoYunAndADou/.test($request.url)) {
  ddm.shareLimitPerDay = Math.max(ddm.shareLimitPerDay || 0, 99); //可分享次数
}

$done({ body: JSON.stringify(ddm) });