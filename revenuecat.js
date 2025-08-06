/*************************************

项目名称：FujiLifeStyle App 解锁脚本
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

let obj = {}, response = JSON.parse(typeof $response != "undefined" && $response.body || "{}");

const headers = $request.headers;
const ua = headers['User-Agent'] || headers['user-agent'];
const bundleId = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];

// FujiLifeStyle App Configuration
const bundle = {
    'com.FujiLifeStyle.dg': { 
        name: 'FUJIStyle Pro(Year)', 
        id: 'FujiStyle2024003', 
        cm: 'sja' 
    }
};

// Check for user agent match
const listua = {
    'FujiLifeStyle': { 
        name: 'FUJIStyle Pro(Year)', 
        id: 'FujiStyle2024003', 
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

// Skip non-subscription related requests
if (/(offerings|attributes|adservices_attribution)/.test($request.url)) {
    console.log("🚫 Skipping non-subscription related requests");
    $done({});
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

// Check if this is a FujiLifeStyle request
let isMatched = false;
let subscriptionData = null;

// Check bundle ID first
if (bundleId && bundleId.includes('FujiLifeStyle')) {
    isMatched = true;
    subscriptionData = Object.assign({}, yearlyTime, baseTime);
    console.log("✅ Detected FujiLifeStyle Bundle ID");
}

// Check user agent as fallback
if (!isMatched && ua && ua.includes('FujiLifeStyle')) {
    isMatched = true;
    subscriptionData = Object.assign({}, yearlyTime, baseTime);
    console.log("✅ Detected FujiLifeStyle User Agent");
}

const updateEntitlements = function () {
    const subscriptionId = 'FujiStyle2024003';
    const entitlementName = 'FUJIStyle Pro(Year)';
    
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
    
    console.log("✅ Updated FujiLifeStyle subscription entitlements");
};

const fallbackSolution = function () {
    console.log("🔄 Using fallback solution");
    updateEntitlements();
    finalize(response);
};

// Main logic
if (isMatched) {
    console.log("✅ Matched FujiLifeStyle, unlocking directly");
    updateEntitlements();
    finalize(response);
} else {
    console.log("❌ No FujiLifeStyle match found, using fallback solution");
    fallbackSolution();
}