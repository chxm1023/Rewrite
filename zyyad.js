/*************************************

应用名称：赵云与阿斗-小游戏
脚本功能：免广告领奖励
下载地址：https://shm.to/zyyad
更新日期：2026-06-29
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.mihuangame\.com\/api\/v\d\/sys\/user\/data url script-request-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zyyad.js
^https?:\/\/.*\.mihuangame\.com\/(api\/v\d\/sys\/user\/login|toutiaoGame\/ZhaoYunAndADou) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zyyad.js

[mitm]
hostname = *.mihuangame.com

*************************************/


let ddm = {}, ojb = {};
let data, info, attach;

const current = Date.now();
const date = new Date(current);
const hour = date.getHours();
const passedMinute = hour * 60 + date.getMinutes();

if (typeof $response === "undefined") {
  try {
    ddm = JSON.parse($request.body || "{}");
  } catch (e) {
    $done({});
  }
  data = ddm;
  Module(data);
  ojb.body = JSON.stringify(ddm);
} else {
  try {
    ddm = JSON.parse($response.body || "{}");
  } catch (e) {
    $done({});
  }

  if (/user\/login/.test($request.url)) {
    if (!ddm.data) ddm.data = {};
    if (!ddm.data.userData) ddm.data.userData = {};
    if (!ddm.data.info) ddm.data.info = {};
    if (!ddm.data.attach) ddm.data.attach = {};
    data = ddm.data.userData;
    info = ddm.data.info;
    attach = ddm.data.attach;
    ddm.code = 0;
    ddm.msg = "Success";
    ddm.data.userType = 1;
    Module(data, attach);
  }
  if (/toutiaoGame\/ZhaoYunAndADou/.test($request.url)) {
    ddm.shareLimitPerDay = Math.max(ddm.shareLimitPerDay || 0, 99);
  }
  ojb.body = JSON.stringify(ddm);
}

$done(ojb);

function Module(data, attach) {
  // 基础数据
  Object.assign(data, {
    "sm": 30, //体力值
    "hfb": true,
    "hfs": true,
    "pap": true,
    "wdg": true,
    "wfr": true,
    "op": true,
    //"cs": 1200, //当前等级皇帝950星
    "ga":9999,          // 昨日等级
    "wn":9999,         // 胜利次数
    "lld":999,        // 连续登录
    "lts":999,        // 登录次数
    "ls":9999,         // 历史最高关
    "cld":9999          // 章节
});

  // 金币不足时补充
  if ((Number(data.gd) || 0) < 9999999) {
    data.gd = 9999999;
  }

  // 时间
  if (attach) {
    Object.assign(attach, {
      "llt": current,
      "dlst": current
    });
  }

  // 技能模块
  ModuleSkill(data);
  // 武器模块
  ModuleWeapon(data);
  // 头像模块
  ModuleAvatar(data);
}

// 技能
function ModuleSkill(data) {
  if (!Array.isArray(data.ps)) data.ps = [];
  const interval = 5 * 60 * 1000;
  const offset = Math.min(
    7 * interval,
    Math.max((passedMinute - 1) * 60 * 1000, 0)
  );
  let psTime = current - offset;
  [
    [10], //速攻符
    [11], //降妖符
    [12], //农民
    [24], //摸金校尉
    [13], //招贤榜
    [4], //神兵符
    [15], //齐头并进
    //[18], //泥潭
    [19] //洛阳铲
  ].forEach(function (item) {
    const old = data.ps.find(function (v) {
      return v[0] === item[0];
    });
    if (old) {
      old[1] = 1;
      old[2] = psTime;
    } else {
      data.ps.push([
        item[0],
        1,
        psTime
      ]);
    }
    psTime += interval;
  });
}


// 武器碎片
function ModuleWeapon(data) {
  if (!Array.isArray(data.wf)) return;
  data.wf.forEach(function (item) {
    if (Array.isArray(item) && item.length > 1) {
      item[1] = Math.min(item[1], 50);
    }
  });
}

// 解锁全部头像
function ModuleAvatar(data) {
  if (!Array.isArray(data.aul)) return;
  data.aul = data.aul.map(function () {
    return 1;
  });
}
