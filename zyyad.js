/*************************************

应用名称：赵云与阿斗-小游戏
脚本功能：辅助小工具
boxjs订阅: https://raw.githubusercontent.com/chxm1023/Script_X/main/ddm1023.boxjs.json
下载地址：https://shm.to/zyyad
更新日期：2026-07-02
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


const ENV = {
  isQX: typeof $task !== "undefined",
  isSurge: typeof $persistentStore !== "undefined" && typeof $prefs === "undefined",
  isLoon: typeof $loon !== "undefined",
  isStash: typeof $stash !== "undefined",
  isShadowrocket: typeof $rocket !== "undefined",
  isPrefs: typeof $prefs !== "undefined"
};

function getBox(key, def) {
  try {
    if (ENV.isPrefs && $prefs.valueForKey) {
      const v = $prefs.valueForKey(key);
      return v == null || v === "" ? def : v;
    }

    if ($persistentStore && $persistentStore.read) {
      const v = $persistentStore.read(key);
      return v == null || v === "" ? def : v;
    }
  } catch (e) {}
  return def;
}

function setBox(key, val) {
  try {
    if (ENV.isPrefs && $prefs.setValueForKey) {
      return $prefs.setValueForKey(val, key);
    }
    if ($persistentStore && $persistentStore.write) {
      return $persistentStore.write(val, key);
    }
  } catch (e) {}
}

// 设置金币
const Gold = Number(getBox("ddm.zyyad.gold", 9999999));

// 修改注册天数(默认7天前)
const RegisterDay = Number(getBox("ddm.zyyad.registerday", 7));

// 设置等级开关 true开启/false关闭
const CustomLevel = getBox("ddm.zyyad.customlevel", "true") === "true";
// 设置等级级数
const Level = Number(getBox("ddm.zyyad.level", 999));

// 0 = 关闭
// 1 = 自动补充已有武器碎片
// 2 = 导入武器碎片（保留已有，重复覆盖）
const WeaponMode = Number(getBox("ddm.zyyad.weaponmode", 2));
// 自动补充武器碎片数量
const WeaponCount = Number(getBox("ddm.zyyad.weaponcount", 50));

function safeJson(body) {
  try {
    return JSON.parse(body || "{}");
  } catch (e) {
    return {};
  }
}

let ojb = {};
let ddm = {};
let data = {};
let attach = {};

// 导入武器碎片列表(基本全部了)
const WeaponList = [
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

// 技能列表
const SkillList = [
  [4], //神兵符
  [10], //速攻符
  [11], //降妖符
  [12], //农民
  [13], //招贤榜
  [15], //齐头并进
  //[18], //泥潭
  [19], //洛阳铲
  [24] //摸金校尉
]

const current = Date.now();

if (typeof $response === "undefined") {
  ddm = safeJson($request.body);
  data = ddm;
  Module(data, null, "req");
  ojb.body = JSON.stringify(ddm);
} else {
  ddm = safeJson($response.body);
  if (/user\/login/.test($request.url)) {
    ddm.data = ddm.data || {};
    ddm.data.userData = ddm.data.userData || {};
    ddm.data.attach = ddm.data.attach || {};
    data = ddm.data.userData;
    attach = ddm.data.attach;
    ddm.code = 0;
    ddm.msg = "Success";
    ddm.data.userType = 1;
    Module(data, attach, "login");
  }
  if (/toutiaoGame\/ZhaoYunAndADou/.test($request.url)) {
    ddm.shareLimitPerDay = Math.max(ddm.shareLimitPerDay || 0, 99);
  }
  const isQX = typeof $task !== "undefined";
  ojb.status = isQX ? "HTTP/1.1 200 OK" : 200;
  ojb.body = JSON.stringify(ddm);
}

$done(ojb);

function Module(data, attach, mode) {
  if (!data) return;
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

  // 金币（只补不覆盖）
  if ((Number(data.gd) || 0) < Gold) {
    data.gd = Gold;
  }

  // 连续登录天数
  if ((Number(data.lld) || 0) < RegisterDay) {
    data.lld = RegisterDay;
  }

  // 注册时间（安全模式）
  if (mode === "login" || mode === "req") {
    ModuleRegister(data, attach);
  }

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
  const target = current - RegisterDay * 86400000 - 300000;

  if (!data.rt || data.rt > target) {
    data.rt = target;
  }

  if (attach && typeof attach === "object") {
    if (!attach.ct || attach.ct > target) {
      attach.ct = target;
    }
  }
}

// 等级模块
function ModuleLevel(data) {
  if (!CustomLevel) return;
  if (Level > 0) {
    data.cs = Math.max(Number(data.cs) || 0, Level);
  } //等级
  data.ga = Math.max(Number(data.ga) || 0, Level); //昨日等级
  data.wn = Math.max(Number(data.wn) || 0, Level); //胜利次数
  data.ls = Math.max(Number(data.ls) || 0, Level); //历史最高
  data.cld = Math.max(Number(data.cld) || 0, Math.max(99, Math.ceil(Level / 10)));
}

// 武器模块
function ModuleWeapon(data) {
  if (WeaponMode === 0) return;
  if (!Array.isArray(data.wf)) data.wf = [];
  // 模式1：补数量
  if (WeaponMode === 1) {
    data.wf.forEach(v => {
      if (Array.isArray(v)) {
        v[1] = Math.max(Number(v[1]) || 0, WeaponCount);
      }
    });
    return;
  }
  // 模式2：去重覆盖
  const map = {};
  data.wf.forEach(v => {
    if (Array.isArray(v)) map[v[0]] = v;
  });
  WeaponList.forEach(v => {
    if (map[v[0]]) {
      map[v[0]][1] = v[1];
    } else {
      data.wf.push([v[0], v[1]]);
    }
  });
}

// 技能模块
function ModuleSkill(data) {
  if (!Array.isArray(data.ps)) data.ps = [];
  const map = {};
  data.ps.forEach(v => {
    if (Array.isArray(v)) map[v[0]] = v;
  });
  data.ps = [];
  let t = current;
  for (let i = 0; i < SkillList.length; i++) {
    const id = SkillList[i][0];
    data.ps.push([id, 1, t]);
    t -= 300000;
  }
}

//头像模块
function ModuleAvatar(data) {
  if (!Array.isArray(data.aul)) return;
  data.aul = data.aul.map(() => 1);
}
