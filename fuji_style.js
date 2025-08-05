/*************************************

项目名称：Revenuecat系列解锁合集
更新日期：2025-07-27
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/sitien173/Rewrite/main/fuji_style.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/sitien173/Rewrite/main/fuji_style.js

[mitm]
hostname = api.revenuecat.com, api.rc-backup.com

*************************************/

console.log("🔍 FujiLifeStyle脚本开始执行...");

let obj = {};
let ddm = JSON.parse(
    (typeof $response != "undefined" && $response.body) || "{}"
);
const headers = $request.headers;
const ua = headers["User-Agent"] || headers["user-agent"];
const bundle_id =
    headers["X-Client-Bundle-ID"] || headers["x-client-bundle-id"];

console.log("📱 请求信息:");
console.log("URL:", $request.url);
console.log("User-Agent:", ua);
console.log("Bundle ID:", bundle_id);
console.log("Request Body:", $request.body);

// 只保留FujiLifeStyle配置
const bundle = {
    "com.FujiLifeStyle.dg": {
        name: "FUJIStyle Pro(Year)",
        id: "FujiStyle2024003",
        cm: "sja",
    },
    //FUJISTYLE-富士色彩配方
};

console.log("📦 Bundle配置:", JSON.stringify(bundle, null, 2));

// 空listua，因为我们只处理bundle_id匹配
const listua = {};

// 检查禁止的APP
const forbiddenApps = ["Rond", "Filebar", "Fileball", "APTV"];
if (
    forbiddenApps.some(
        (app) =>
            (ua && ua.includes(app)) || ($request.body && $request.body.includes(app))
    )
) {
    console.log("⛔️检测到禁止 MITM 的 APP，脚本停止运行！");
    $done({});
}

// 时间配置
const timea = {
    purchase_date: new Date().toISOString(),
    expires_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
};

const timeb = {
    original_purchase_date: new Date().toISOString(),
    is_sandbox: false,
    store_transaction_id: "FujiStyle2024003",
    store: "app_store",
    ownership_type: "PURCHASED",
};

console.log("⏰ 时间配置:");
console.log("timea:", JSON.stringify(timea, null, 2));
console.log("timeb:", JSON.stringify(timeb, null, 2));

// 主要处理逻辑
let name;
let nameb;
let ids;
let idb;
let data;
let anchor = false;
let localMatched = false;

console.log("🔍 开始匹配检查...");

// 只检查bundle配置
if (!bundle_id || bundle_id === "undefined" || bundle_id === "") {
    console.log('⚠️ 未检测到 Bundle ID，跳过本次匹配。');
    console.log('Bundle ID 值:', bundle_id);
} else {
    for (const i in bundle) {
        const test = bundle_id;
        console.log(`🔍 检查配置项: ${i}`);
        console.log(`🔍 测试值: ${test}`);
        console.log(`🔍 正则表达式: ^${i}`);
        
        if (new RegExp("^" + i, "i").test(test)) {
            console.log(`✅ 匹配成功: ${i}`);
            
            if (bundle[i].cm.includes("sja")) {
                console.log("📅 使用sja配置");
                data = timea;
                anchor = true;
            } else if (bundle[i].cm.includes("sjb")) {
                console.log("📅 使用sjb配置");
                data = {
                    purchase_date: "2024-01-01T00:00:00Z",
                };
                anchor = true;
            } else if (bundle[i].cm.includes("sjc")) {
                console.log("📅 使用sjc配置");
                data = timea;
                anchor = false;
            }
            
            ids = bundle[i].id;
            name = bundle[i].name || "";
            idb = bundle[i].idb;
            nameb = bundle[i].nameb;
            localMatched = true;
            
            console.log("📋 提取的配置:");
            console.log("ids:", ids);
            console.log("name:", name);
            console.log("idb:", idb);
            console.log("nameb:", nameb);
            console.log("anchor:", anchor);
            console.log("data:", JSON.stringify(data, null, 2));
            
            break;
        } else {
            console.log(`❌ 匹配失败: ${i}`);
        }
    }
}

console.log("🎯 匹配结果:", localMatched);

// 更新订阅信息的函数
const updateEntitlements = function (
    _0x42cce6 = "",
    _0x277cbd = "",
    _0x46c666 = false
) {
    console.log("🔄 开始更新订阅信息...");
    console.log("参数:", { _0x42cce6, _0x277cbd, _0x46c666 });
    
    const _0x86351b = name || _0x42cce6;
    const _0x4d60c8 = ids || _0x277cbd;
    const _0x5e311a = data || timea;
    const _0x25bde3 = Object.assign({}, _0x5e311a, timeb);
    
    console.log("📊 处理后的数据:");
    console.log("_0x86351b:", _0x86351b);
    console.log("_0x4d60c8:", _0x4d60c8);
    console.log("_0x5e311a:", JSON.stringify(_0x5e311a, null, 2));
    console.log("_0x25bde3:", JSON.stringify(_0x25bde3, null, 2));
    
    if (!anchor) {
        console.log("🔧 更新subscriptions...");
        ddm.subscriber.subscriptions = Object.assign(
            ddm.subscriber.subscriptions || {},
            {
                [_0x4d60c8]: [
                    Object.assign(
                        {},
                        {
                            id: ids,
                        },
                        _0x25bde3
                    ),
                ],
            }
        );
        ddm.subscriber.entitlements = Object.assign(
            ddm.subscriber.entitlements || {},
            {
                [_0x4d60c8]: _0x5e311a,
            }
        );
    }
    
    if (!_0x46c666 && _0x86351b) {
        console.log("🔧 更新entitlements...");
        ddm.subscriber.entitlements = Object.assign(
            ddm.subscriber.entitlements || {},
            {
                [_0x86351b]: Object.assign({}, _0x5e311a, {
                    product_identifier: _0x4d60c8,
                }),
            }
        );
    }
    
    console.log("🔧 更新original_app_user_id...");
    ddm.subscriber.original_app_user_id = Object.assign(
        ddm.subscriber.original_app_user_id || {},
        {
            [_0x4d60c8]: _0x25bde3,
        }
    );
    
    if (idb && nameb && !_0x46c666) {
        console.log("🔧 更新额外的entitlements...");
        ddm.subscriber.entitlements = Object.assign(
            ddm.subscriber.entitlements,
            {
                [nameb]: Object.assign({}, _0x5e311a, {
                    product_identifier: idb,
                }),
            }
        );
        ddm.subscriber.original_app_user_id = Object.assign(
            ddm.subscriber.original_app_user_id,
            {
                [idb]: _0x25bde3,
            }
        );
    }
    
    console.log("📊 最终的ddm对象:", JSON.stringify(ddm, null, 2));
};

// 最终处理函数
const finalize = function (_0x72eedd = null) {
    console.log("🏁 开始最终处理...");
    if (_0x72eedd) {
        obj.body = JSON.stringify(_0x72eedd);
        console.log("✅ 处理完成，响应体:", obj.body);
    } else {
        console.log("⚠️ 没有响应体数据");
    }
    $done(obj);
};

// 主要执行逻辑
console.log("🚀 开始主要执行逻辑...");
console.log("$response类型:", typeof $response);

if (typeof $response === "undefined") {
    console.log("📤 处理请求头...");
    delete headers["X-Client-Bundle-ID"];
    delete headers["x-client-bundle-id"];
    obj.headers = headers;
    finalize();
} else {
    console.log("📥 处理响应体...");
    console.log("原始响应:", $response.body);
    
    // 移除URL过滤，处理所有RevenueCat请求
    console.log("🔍 处理所有RevenueCat请求，不跳过任何请求");
    
    if (localMatched) {
        console.log("🎯 匹配到FujiLifeStyle，开始处理...");
        updateEntitlements();
        finalize(ddm);
    } else {
        console.log("❌ 未匹配到FujiLifeStyle");
        console.log("可能的原因:");
        console.log("1. Bundle ID不匹配 - 实际Bundle ID:", bundle_id);
        console.log("2. 正则表达式问题");
        console.log("3. 请求URL不在匹配范围内");
        console.log("💡 建议: 检查实际的Bundle ID并更新配置");
        $done({});
    }
} 