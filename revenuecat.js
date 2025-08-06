/*************************************

项目名称：Multi-App 解锁脚本 (FujiLifeStyle & TruthOrDare)
更新日期：2025-01-12
脚本作者：@ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/sitien173/Rewrite/main/revenuecat.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/sitien173/Rewrite/main/revenuecat.js

[mitm]
hostname = api.revenuecat.com, api.rc-backup.com

*************************************/

let obj = {}, response = {};
if (typeof $response !== "undefined" && $response.body) {
    try {
        response = JSON.parse($response.body);
    } catch (e) {
        console.log("❌ Error parsing response body:", e);
        response = {};
    }
}

const headers = $request.headers;
const ua = headers['User-Agent'] || headers['user-agent'];
const bundleId = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];

console.log('ua', ua);
console.log('bundleId', bundleId);

// App Configuration
const bundle = {
    'com.FujiLifeStyle.dg': { 
        name: 'FUJIStyle Pro(Year)', 
        id: 'FujiStyle2024003', 
        cm: 'sja' 
    },
    'com.tiggel.truthordare': {
        name: 'premium',
        id: 'truth_or_dare_premium_monthly',
        cm: 'sja'
    },
    'com.ultrafinelabs.LightMeterUltra': {
        name: 'LightMeter Ultra',
        id: 'com.ultrafinelabs.LightMeterUltra',
        cm: 'sja'
    }
};

// Check for user agent match
const listua = {
    'FujiLifeStyle': { 
        name: 'FUJIStyle Pro(Year)', 
        id: 'FujiStyle2024003', 
        cm: 'sja' 
    },
    'Truth Or Dare': {
        name: 'premium',
        id: 'truth_or_dare_premium_monthly',
        cm: 'sja'
    },
    'LightMeter': {
        name: 'LightMeter Pro (Year)',
        id: 'LightMeterPro2024001',
        cm: 'sja'
    }
};

const finalize = function (data = null) {
    if (data) {
        obj.body = JSON.stringify(data);
        console.log("✅ Successfully modified response body");
    }
    $done(obj);
};

// Handle request headers - remove problematic headers
if (typeof $response === "undefined") {
    delete headers['X-RevenueCat-ETag'];
    delete headers['x-revenuecat-etag'];
    obj.headers = headers;
    finalize();
    return;
}


// Time configurations
const yearlyTime = {
    'purchase_date': '2024-01-01T00:00:00Z',
    'expires_date': '2099-12-31T23:59:59Z'
};

const baseTime = {
    'original_purchase_date': '2024-01-01T00:00:00Z',
    'is_sandbox': false,
    'store_transaction_id': '999999999999999',
    'store': 'app_store',
    'ownership_type': 'PURCHASED'
};

// Check for app match
let isMatched = false;
let subscriptionData = null;
let appConfig = null;

// Check user agent first
for (const i in listua) {
    if (new RegExp("^" + i, "i").test(ua)) {
        isMatched = true;
        appConfig = listua[i];
        
        if (appConfig.cm.includes('sja')) {
            subscriptionData = yearlyTime;
        } else if (appConfig.cm.includes('sjb')) {
            subscriptionData = { 'purchase_date': '2024-01-01T00:00:00Z' };
        } else if (appConfig.cm.includes('sjc')) {
            subscriptionData = yearlyTime;
        }
        
        subscriptionData = Object.assign({}, subscriptionData, baseTime);
        console.log(`✅ Detected ${i} via User Agent`);
        break;
    }
}

// Check bundle ID as fallback
if (!isMatched) {
    for (const i in bundle) {
        if (new RegExp("^" + i, "i").test(bundleId)) {
            isMatched = true;
            appConfig = bundle[i];
            
            if (appConfig.cm.includes('sja')) {
                subscriptionData = yearlyTime;
            } else if (appConfig.cm.includes('sjb')) {
                subscriptionData = { 'purchase_date': '2024-01-01T00:00:00Z' };
            } else if (appConfig.cm.includes('sjc')) {
                subscriptionData = yearlyTime;
            }
            
            subscriptionData = Object.assign({}, subscriptionData, baseTime);
            console.log(`✅ Detected ${i} via Bundle ID`);
            break;
        }
    }
}

const updateEntitlements = function () {
    if (!appConfig) {
        console.log("❌ No app configuration found");
        return;
    }
    
    // Ensure response.subscriber exists
    if (!response.subscriber) {
        response.subscriber = {};
    }
    
    const subscriptionId = appConfig.id;
    const entitlementName = appConfig.name;
    
    // Update subscriptions
    response.subscriber.subscriptions = Object.assign(response.subscriber.subscriptions || {}, {
        [subscriptionId]: [Object.assign({}, {
            'id': subscriptionId
        }, subscriptionData)]
    });
    
    // Update non consumables
    response.subscriber.non_consumables = Object.assign(response.subscriber.non_consumables || {}, {
        [subscriptionId]: subscriptionData
    });
    
    // Update entitlements
    response.subscriber.entitlements = Object.assign(response.subscriber.entitlements || {}, {
        [entitlementName]: Object.assign({}, subscriptionData, {
            'product_identifier': subscriptionId
        })
    });
    
    console.log(`✅ Updated ${entitlementName} subscription entitlements`);
};

const fallbackSolution = function () {
    console.log("🔄 Using fallback solution");
    updateEntitlements();
    finalize(response);
};

// Main logic
if (isMatched) {
    console.log("✅ App matched, unlocking subscription");
    updateEntitlements();
    finalize(response);
} else {
    console.log("❌ No app match found, using fallback solution");
    fallbackSolution();
}