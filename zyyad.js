/*************************************

应用名称：赵云与阿斗-小游戏
脚本功能：免广告领奖励
下载地址：https://shm.to/zyyad
更新日期：2026-07-01
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
let data;

// 设置金币
const Gold = 9999999;

// 修改注册天数
const RegisterDay = 5;

// 设置等级开关 true开启/false关闭
const CustomLevel = true;
// 设置等级数
const Level = 999;

// 0 = 关闭
// 1 = 自动补充已有武器碎片
// 2 = 导入武器碎片（保留已有，重复覆盖）
const WeaponMode = 2;
// 自动补充武器碎片数量
const WeaponCount = 50;

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
  Module(data, null);
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
    const attach = ddm.data.attach || (ddm.data.attach = {});
    data = ddm.data.userData;
    ddm.code = 0;
    ddm.msg = "Success";
    ddm.data.userType = 1;
    Module(data, attach);
  }
  if (/toutiaoGame\/ZhaoYunAndADou/.test($request.url)) {
    ddm.shareLimitPerDay = Math.max(ddm.shareLimitPerDay || 0, 99);
  }
  const isQX = typeof $task !== "undefined";
  ojb.status = isQX ? "HTTP/1.1 200 OK" : 200;
  ojb.body = JSON.stringify(ddm);
}

$done(ojb);

function Module(data, attach) {
  // 基础数据
  Object.assign(data, {
    //"hfb": true,
    //"hfs": true,
    //"pap": true,
    //"wdg": true,
    //"wfr": true,
    //"op": true,
    "sm": 30 //体力值
});

  // 金币不足时补充
  if ((Number(data.gd) || 0) < Gold) {
    data.gd = Gold;
  }

  // 连续登录/等级
  if ((Number(data.lld) || 0) < RegisterDay) {
    data.lld = RegisterDay;  //连续登录
    data.ga =999; // 昨日等级
    data.wn = 999, // 胜利次数
    data.ls = 999; // 历史最高关
    data.cld = 99; // 章节
  }

  // 注册时间
  ModuleRegister(data, attach);
  // 等级模块
  ModuleLevel(data);
  // 武器模块
  ModuleWeapon(data);
  // 技能模块
  ModuleSkill(data);
  // 头像模块
  ModuleAvatar(data);
}

// 注册时间模块
function ModuleRegister(data, attach) {
    const targetTime =
        current - RegisterDay * 24 * 60 * 60 * 1000 - 5 * 60 * 1000;
    const rt = Number(data.rt);
    if (!rt || rt > targetTime) {
        data.rt = targetTime;
    }
    if (attach) {
        const ct = Number(attach.ct);
        if (!ct || ct > targetTime) {
            attach.ct = targetTime;
        }
    }
}


// 等级模块
function ModuleLevel(data) {
  // 关闭等级修改
  if (!CustomLevel) return;
  // 当前等级低于设定值时补充
  if ((Number(data.cs) || 0) < Level) {
    data.cs = Level;
  }
}

// 技能模块
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

// 武器模块
function ModuleWeapon(data) {
  // 关闭
  if (WeaponMode === 0) return;
  // 没有武器碎片时自动创建
  if (!Array.isArray(data.wf)) {
    data.wf = [];
  }
  // 模式1：自动补充已有武器碎片
  if (WeaponMode === 1) {
    data.wf.forEach(function (item) {
      if (Array.isArray(item) && item.length > 1) {
        item[1] = Math.max(item[1], WeaponCount);
      }
    });
    return;
  }
  // 模式2：导入武器碎片
  const weapon = [
    [20, 50],
    [32, 50],
    [12, 50],
    [22, 50],
    [11, 50],
    [1, 50],
    [25, 50],
    [33, 50],
    [37, 50],
    [2, 50],
    [3, 51],
    [6, 50],
    [34, 50],
    [13, 52],
    [14, 51],
    [35, 50],
    [23, 51],
    [28, 50],
    [24, 51],
    [39, 50],
    [41, 50],
    [40, 50],
    [18, 50],
    [43, 50],
    [16, 50],
    [4, 50],
    [15, 50],
    [38, 50],
    [27, 50],
    [26, 50],
    [5, 50],
    [17, 50],
    [36, 50],
    [7, 50],
    [9, 50],
    [8, 50],
    [19, 50],
    [42, 50],
    [29, 50],
    [30, 51]
  ];
  weapon.forEach(function (item) {
    const old = data.wf.find(function (v) {
      return Array.isArray(v) && v[0] === item[0];
    });
    if (old) {
      // 已有武器，覆盖碎片数量
      old[1] = item[1];
    } else {
      // 没有武器，新增
      data.wf.push([
        item[0],
        item[1]
      ]);
    }
  });
}

// 头像模块
function ModuleAvatar(data) {
  if (!Array.isArray(data.aul)) return;
  data.aul = data.aul.map(function () {
    return 1;
  });
}
