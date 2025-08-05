/*************************************

AppName: FujiLifeStyle
AppID: com.fujistyle.app
Author: chxm1023

**************************************

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/sitien173/Rewrite/main/fuji_style.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/sitien173/Rewrite/main/fuji_style.js

[mitm]
hostname = api.revenuecat.com, api.rc-backup.com

*************************************/

let obj = {};
let ddm = JSON.parse(
    (typeof $response != "undefined" && $response.body) || "{}"
);
const headers = $request.headers;
const ua = headers["User-Agent"] || headers["user-agent"];
const bundle_id =
    headers["X-Client-Bundle-ID"] || headers["x-client-bundle-id"];

// 只保留FujiLifeStyle配置
const bundle = {
    FujiLifeStyle: {
        name: "FUJIStyle Pro(Year)",
        id: "FujiStyle2024003",
        cm: "sja",
    },
    //FUJISTYLE-富士色彩配方
};

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

// 主要处理逻辑
let name;
let nameb;
let ids;
let idb;
let data;
let anchor = false;
let localMatched = false;

// 只检查bundle配置
for (const i in bundle) {
    const test = bundle_id;
    if (new RegExp("^" + i, "i").test(test)) {
        if (bundle[i].cm.includes("sja")) {
            data = timea;
            anchor = true;
        } else if (bundle[i].cm.includes("sjb")) {
            data = {
                purchase_date: "2024-01-01T00:00:00Z",
            };
            anchor = true;
        } else if (bundle[i].cm.includes("sjc")) {
            data = timea;
            anchor = false;
        }
        ids = bundle[i].id;
        name = bundle[i].name || "";
        idb = bundle[i].idb;
        nameb = bundle[i].nameb;
        localMatched = true;
        break;
    }
}

// 更新订阅信息的函数
const updateEntitlements = function (
    _0x42cce6 = "",
    _0x277cbd = "",
    _0x46c666 = false
) {
    const _0x86351b = name || _0x42cce6;
    const _0x4d60c8 = ids || _0x277cbd;
    const _0x5e311a = data || timea;
    const _0x25bde3 = Object.assign({}, _0x5e311a, timeb);
    
    if (!anchor) {
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
        ddm.subscriber.entitlements = Object.assign(
            ddm.subscriber.entitlements || {},
            {
                [_0x86351b]: Object.assign({}, _0x5e311a, {
                    product_identifier: _0x4d60c8,
                }),
            }
        );
    }
    
    ddm.subscriber.original_app_user_id = Object.assign(
        ddm.subscriber.original_app_user_id || {},
        {
            [_0x4d60c8]: _0x25bde3,
        }
    );
    
    if (idb && nameb && !_0x46c666) {
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
};

// 最终处理函数
const finalize = function (_0x72eedd = null) {
    if (_0x72eedd) {
        obj.body = JSON.stringify(_0x72eedd);
        console.log("✅ 处理完成");
    }
    $done(obj);
};

// 主要执行逻辑
if (typeof $response === "undefined") {
    delete headers["X-Client-Bundle-ID"];
    delete headers["x-client-bundle-id"];
    obj.headers = headers;
    finalize();
} else {
    if (
        /(offerings|attributes|adservices_attribution)/.test(
            $request.url
        )
    ) {
        console.log("⏭️ 跳过非订阅相关请求");
        $done({});
    }
    
    if (localMatched) {
        console.log("🎯 匹配到FujiLifeStyle，开始处理...");
        updateEntitlements();
        finalize(ddm);
    } else {
        console.log("❌ 未匹配到FujiLifeStyle");
        $done({});
    }
} 