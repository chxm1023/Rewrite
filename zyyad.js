/*************************************

应用名称：赵云与阿斗-小游戏
脚本功能：辅助小工具
boxjs订阅: https://raw.githubusercontent.com/chxm1023/Script_X/main/ddm1023.boxjs.json
下载地址：https://shm.to/zyyad
更新日期：2026-07-11
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

// 函数工具
function getBox(key, def) {
  let value = null;
  try {
    if (
      typeof $prefs !== "undefined" &&
      typeof $prefs.valueForKey === "function"
    ) {
      value = $prefs.valueForKey(key);
    }
    if (
      value == null &&
      typeof $persistentStore !== "undefined" &&
      typeof $persistentStore.read === "function"
    ) {
      value = $persistentStore.read(key);
    }
  } catch(e){
    console.log(
      "读取失败:",
      key,
      e.message
    );
  }
  if(value === null || value === undefined || value === ""){
    return def;
  }
  if(typeof value === "string"){
    try{
      return JSON.parse(value);
    }catch(e){
      return value;
    }
  }
  return value;
}

function getBool(key,def=false){
    const value=getBox(key,def);
    return value===true||value==="true";
}

// 强制覆盖（false=只补不降，true=全部按配置覆盖）
const ForceValue = getBool("ddm.zyyad.forcevalue", "false");
// 各个功能开关
const EnableGold = getBool("ddm.zyyad.enablegold", "true");
const EnableLevel = getBool("ddm.zyyad.enablelevel", "true");
const EnableWeapon = getBool("ddm.zyyad.enableweapon", "true");
const EnableSkill = getBool("ddm.zyyad.enableskill", "true");
const EnableAvatar = getBool("ddm.zyyad.enableavatar", "true");
const EnableRegister = getBool("ddm.zyyad.enableregister", "true");

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

// getBox保护
function getNumber(key, def){
    const n=Number(getBox(key,def));
    return isNaN(n)?def:n;
}

// 设置金币
const Gold = getNumber("ddm.zyyad.gold", 9999999);

// 修改注册天数(默认7天前)
const RegisterDay = getNumber("ddm.zyyad.registerday", 7);

// 设置等级级数
const Level = getNumber("ddm.zyyad.level", 999);

// 0 = 关闭
// 1 = 自动补充已有武器碎片
// 2 = 导入武器碎片（保留已有，重复覆盖）
const WeaponMode = getNumber("ddm.zyyad.weaponmode", 2);
// 自动补充武器碎片数量
const WeaponCount = getNumber("ddm.zyyad.weaponcount", 50);

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
const current = Date.now();
const headers = $request ? ($request.headers || {}) : {};

// 导入武器碎片列表(基本全部了)
const WeaponList=[[1,50],[2,50],[3,50],[4,50],[5,50],[6,50],[7,50],[8,50],[9,50],[11,50],[12,50],[13,50],[14,50],[15,50],[16,50],[17,50],[18,50],[19,50],[20,50],[22,50],[23,50],[24,50],[25,50],[26,50],[27,50],[28,50],[29,50],[30,50],[32,50],[33,50],[34,50],[35,50],[36,50],[37,50],[38,50],[39,50],[40,50],[41,50],[42,50],[43,50]];

// 技能配置模块
// 主动技能：最多2个
// 被动技能：最多6个
// 自动去重
// 自动过滤非法技能
// ==============================
const SkillName = {
  2:"毛笔",
  3:"练兵符",
  4:"神兵符",
  5:"包子",
  6:"御敌千里",
  7:"砚台",
  8:"陷阱",
  9:"地雷",
  10:"速攻符",
  11:"降妖符",
  12:"农民",
  13:"招贤榜",
  14:"攻速符(全体)",
  15:"齐头并进",
  16:"续命丹",
  17:"大补丸",
  18:"泥潭",
  19:"洛阳铲",
  20:"召唤陨石",
  21:"垃圾桶",
  22:"升职令",
  24:"摸金校尉"
};

// checkbox函数工具
function getCheckbox(key, def=[]){
    let value=null;
    try{
        if(typeof $prefs!=="undefined" &&
           typeof $prefs.valueForKey==="function"){
            value=$prefs.valueForKey(key);
        }else if(typeof $persistentStore!=="undefined" &&
                 typeof $persistentStore.read==="function"){
            value=$persistentStore.read(key);
        }
    }catch(e){
        console.log(
            "读取失败:",
            key,
            e.message
        );
    }
    console.log(
        "BOX原始:",
        key,
        JSON.stringify(value)
    );
    if(!value){
        return def;
    }
    // 已经是数组
    if(Array.isArray(value)){
        return value;
    }
    // JSON数组
    try{
        let arr=JSON.parse(value);
        if(Array.isArray(arr)){
            return arr;
        }
    }catch(e){}
    // 逗号分隔
    if(typeof value==="string"){
        return value
        .split(",")
        .map(i=>i.trim())
        .filter(Boolean);
    }
    return def;
}

//主动技能
const ActiveSkill = getCheckbox("ddm.zyyad.active", ["4", "10"]).map(Number);
// 被动技能
const PassiveSkill = getCheckbox("ddm.zyyad.passive", ["11", "12", "13", "15", "19", "24"]).map(Number);

// ==============================
// 禁止技能
// 1  推土车
// 23 行军丹
// ==============================
const BanSkill = [1, 23];

// ==============================
// 生成最终技能
// ==============================
const SkillList = [];
const SkillUsed = Object.create(null);
function AddSkill(id){
  id = Number(id);
  // 空值关闭
  if(!id){
    return;
  }

  // 最大8个保护
  if(SkillList.length >= 8){
    return;
  }

  // 屏蔽特殊技能
  if(BanSkill.includes(id)){
    console.log(
      "过滤特殊技能:",
      SkillName[id] || id
    );
    return;
  }

  // 去重
  if(SkillUsed[id]){
    console.log(
      "忽略重复技能:",
      SkillName[id] || id
    );
    return;
  }
  SkillUsed[id] = true;
  SkillList.push([
    id
  ]);
}

// 添加主动
ActiveSkill.slice(0,2).forEach(function(id){
  AddSkill(id);
});

// 添加被动
PassiveSkill.slice(0,6).forEach(function(id){
  AddSkill(id);
});

// 默认配置
const UserTemplate = {
  pv: "",
  nk: "",
  lld: 0,
  rt: current,
  ss: 0,
  lst: 0,
  wn: 0,
  st: current,
  lp: [],
  sg: {
    iosBetterMode: true,
    soundVolume: 0,
    showDamageNum: false,
    musicVolume: 0
  },
  afu: false,
  apsc: 0,
  wdg: true,
  ld: 0,
  cld: 1,
  ls: 0,
  wd: 0,
  sac: 0,
  au: "resources/img/mainUI/avatar/avatar15.png",
  op: true,
  ws: 0,
  cs: 1,
  lrt: 0,
  wf: [],
  eq : [19,13,18,29,6,26,29,18,43,43,43,8],
  lts: 0,
  ga: 0,
  mg: [],
  sm: 30,
  hfb: true,
  ot: current,
  aul: Array(16).fill(1),
  ps: [],
  ssc: 0,
  gd: 0,
  wfr: true,
  hfs: true,
  nwi: [],
  fds: 0,
  rr: 1,
  pap: true,
  rc: 1
};

function InitUserData(data) {
  if (!data || typeof data !== "object") {
    data = {};
  }
  Object.keys(UserTemplate).forEach(function(key){
    if (
      typeof data[key] === "undefined" ||
      data[key] === null
    ){
      let value = UserTemplate[key];
      if(Array.isArray(value)){
        data[key] = JSON.parse(JSON.stringify(value));
      }
      else if(typeof value === "object"){
        data[key] = JSON.parse(JSON.stringify(value));
      }
      else{
        data[key] = value;
      }
    }
  });
  return data;
}

function Module(data, attach) {
  if (!data) return;
  Object.assign(data, {
    "hfb": true, // 新手引导
    "pap": true, // 隐私协议
    "wfr": true, // 武器功能
    "sm": 30 // 体力值
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
  setValue(data, "ws", Level); // 连胜次数
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
  data.ps=SkillList.map(function(v,index){
    return [
        v[0],
        1,
        current-(index+1)*300000
    ];
  });
}

//头像模块
function ModuleAvatar(data) {
  if(!Array.isArray(data.aul)){
    data.aul=Array(16).fill(1);
  }else{
    data.aul=data.aul.map(()=>1);
  }
}

// 主逻辑
if (typeof $response === "undefined") {
  ddm = safeJson($request.body);
  data = ddm;
  Module(data, null);
  obj.body = JSON.stringify(ddm);
} else {
  ddm = safeJson($response.body);

  if (/user\/login/.test($request.url)) {
    ddm.data = ddm.data || {};
    if (!ddm.data.userData || typeof ddm.data.userData !== "object") {
        ddm.data.userData = {};
    }
    ddm.data.userData = InitUserData(ddm.data.userData);
    if (!ddm.data.attach || typeof ddm.data.attach !== "object") {
        ddm.data.attach = {};
    }
    if (!ddm.data.info || typeof ddm.data.info !== "object") {
        ddm.data.info = {};
    }
    data = ddm.data.userData;
    attach = ddm.data.attach;
    Module(data, attach);
    ddm.data.userType = 1;
    ddm.code = 0;
    ddm.msg = "Success";
  }

  // 用户数据接口
  if (/user\/data/.test($request.url)) {
    if ( ddm.data && ddm.data.userData && typeof ddm.data.userData === "object" ) {
      data = ddm.data.userData;
      Module(data, null);
    }
  }

  //分享接口
  if (/toutiaoGame\/ZhaoYunAndADou/.test($request.url)) {
    ddm.shareLimitPerDay = Math.max(ddm.shareLimitPerDay || 0, 99);
  }

  obj.status = ENV.isQX ? "HTTP/1.1 200 OK" : 200;
  obj.body = JSON.stringify(ddm);
}

$done(obj);
