/*************************************

应用名称：赵云与阿斗-小游戏
脚本功能：辅助小工具
boxjs订阅: https://raw.githubusercontent.com/chxm1023/Script_X/main/ddm1023.boxjs.json
下载地址：https://shm.to/zyyad
更新日期：2026-07-03
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.mihuangame\.com\/api\/v\d\/sys\/user\/data url script-request-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zyyad.js
^https?:\/\/.*\.mihuangame\.com\/(api\/v\d\/sys\/user|toutiaoGame\/ZhaoYunAndADou) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zyyad.js

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

// 强制覆盖（false=只补不降，true=全部按配置覆盖）
const ForceValue = getBox("ddm.zyyad.forcevalue", "false") === "true";

// 各模块开关
const EnableGold = getBox("ddm.zyyad.enablegold", "true") === "true";
const EnableLevel = getBox("ddm.zyyad.enablelevel", "true") === "true";
const EnableWeapon = getBox("ddm.zyyad.enableweapon", "true") === "true";
const EnableSkill = getBox("ddm.zyyad.enableskill", "true") === "true";
const EnableAvatar = getBox("ddm.zyyad.enableavatar", "true") === "true";
const EnableRegister = getBox("ddm.zyyad.enableregister", "true") === "true";

// 数值修改
function setValue(data, key, value) {
  if (ForceValue) {
    // 强制覆盖
    data[key] = value;
    return;
  }
  // 安全模式（只补不降）
  const old = Number(data[key]) || 0;
  if (old < value) {
    data[key] = value;
  }
}

// 设置金币
const Gold = Number(getBox("ddm.zyyad.gold", 9999999));

// 修改注册天数(默认7天前)
const RegisterDay = Number(getBox("ddm.zyyad.registerday", 7));

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

let obj = {};
let ddm = {};
let data = {};
let attach = {};
const headers = $request ? ($request.headers || {}) : {};

// 导入武器碎片列表(基本全部了)
const WeaponList=[[1,50],[2,50],[3,50],[4,50],[5,50],[6,50],[7,50],[8,50],[9,50],[11,50],[12,50],[13,50],[14,50],[15,50],[16,50],[17,50],[18,50],[19,50],[20,50],[22,50],[23,50],[24,50],[25,50],[26,50],[27,50],[28,50],[29,50],[30,50],[32,50],[33,50],[34,50],[35,50],[36,50],[37,50],[38,50],[39,50],[40,50],[41,50],[42,50],[43,50]];

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
  if(/user\/data/.test($request.url)){
    ddm = safeJson($request.body);
    data = ddm;
    Module(data, null);
    obj.body = JSON.stringify(ddm);
  }
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
    Module(data, attach);
  }
  if (/toutiaoGame\/ZhaoYunAndADou/.test($request.url)) {
    ddm.shareLimitPerDay = Math.max(ddm.shareLimitPerDay || 0, 99);
  }
  obj.status = ENV.isQX ? "HTTP/1.1 200 OK" : 200;
  obj.body = JSON.stringify(ddm);
}

$done(obj);

function Module(data, attach) {
  if (!data) return;
  Object.assign(data, {
    "sm": 30
  });
  // 金币
  if (EnableGold) {
    setValue(data, "gd", Gold);
  }
  // 连续登录
  if (EnableRegister) {
    setValue(data, "lld", RegisterDay);
    ModuleRegister(data, attach);
  }
  // 等级
  if (EnableLevel) {
    ModuleLevel(data);
  }
  // 武器
  if (EnableWeapon) {
    ModuleWeapon(data);
  }
  // 技能
  if (EnableSkill) {
    ModuleSkill(data);
  }
  // 头像
  if (EnableAvatar) {
    ModuleAvatar(data);
  }
}

// 注册时间模块
function ModuleRegister(data, attach) {
  const target = current - RegisterDay * 86400000 - 300000;
  if (ForceValue || !data.rt || data.rt > target) {
    data.rt = target;
  }
  if (attach && typeof attach === "object") {
    if (ForceValue || !attach.ct || attach.ct > target) {
        attach.ct = target;
    }
  }
}

// 等级模块
function ModuleLevel(data) {
  setValue(data, "cs", Level); // 等级
  setValue(data, "ga", Level); // 昨日等级
  setValue(data, "wn", Level); // 胜利次数
  setValue(data, "ls", Level); // 历史最高
  setValue(data, "cld", Math.max(99, Math.ceil(Level / 10))); // 章节
}

// 武器模块
function ModuleWeapon(data) {
  // 关闭
  if (WeaponMode === 0) return;
  // 修正数据
  if (!Array.isArray(data.wf)) {
    data.wf = [];
  }
  // 模式1：自动补充已有武器碎片
  if (WeaponMode === 1) {
    data.wf.forEach(function (item) {
      if (Array.isArray(item) && item.length > 1) {
        item[1] = Math.max(Number(item[1]) || 0, WeaponCount);
      }
    });
    return;
  }
  // 模式2：导入武器（保留已有，重复覆盖）
  const WeaponMap = {};
  // 建立已有武器索引
  data.wf.forEach(function (item) {
    if (Array.isArray(item) && item.length > 1) {
      WeaponMap[item[0]] = item;
    }
  });
  // 导入武器
  WeaponList.forEach(function (item) {
    if (WeaponMap[item[0]]) {
      // 已存在
      WeaponMap[item[0]][1] = ForceValue ? item[1] : Math.max(Number(WeaponMap[item[0]][1]) || 0, item[1]);
    } else {
      // 不存在
      data.wf.push([item[0], item[1]]);
    }
  });
}

// 技能模块
function ModuleSkill(data) {
  if (!Array.isArray(data.ps)) {
    data.ps = [];
  }
  data.ps = [];
  const interval = 5 * 60 * 1000;
  let t = current - interval;
  SkillList.forEach(function(v){
    data.ps.push([
      v[0],
      1,
      t
    ]);
    t -= interval;
  });
}

//头像模块
function ModuleAvatar(data) {
  if (!Array.isArray(data.aul)) return;
  data.aul = data.aul.map(function () {
    return 1;
  });
}
