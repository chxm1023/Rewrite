/*************************************

项目名称：iTunes In-App Purchase 验证拦截脚本
更新日期：2025-08-06
脚本作者：Custom Script
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/inappcheck\.itunes\.apple\.com\/inappcheck\/v\d+\/verify url script-response-body https://raw.githubusercontent.com/sitien173/Rewrite/main/itunes_inapp.js

[mitm]
hostname = inappcheck.itunes.apple.com

*************************************/

let obj = {}, response = JSON.parse(typeof $response != "undefined" && $response.body || "{}");

const headers = $request.headers;
const ua = headers['User-Agent'] || headers['user-agent'];
const bundleId = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];

// Debug logging
console.log("🔍 iTunes In-App Check Debug Info:");
console.log("Bundle ID: " + bundleId);
console.log("User Agent: " + ua);
console.log("Request URL: " + $request.url);
console.log("Original Response: " + JSON.stringify(response));

const finalize = function (data = null) {
    if (data) {
        obj.body = JSON.stringify(data);
        console.log("✅ Successfully modified iTunes response");
    }
    $done(obj);
};

// Handle request headers if needed
if (typeof $response === "undefined") {
    obj.headers = headers;
    finalize();
    return;
}

// App Configuration - Add your target apps here
const supportedApps = {
    'com.ultrafinelabs.LightMeterUltra': {
        name: 'Light Meter Ultra',
        productIds: [
            'com.ultrafinelabs.LightMeterUltra.pro',
            'lightmeter_pro',
            'premium'
        ]
    },
    // Add more apps as needed
    'com.example.otherapp': {
        name: 'Other App',
        productIds: ['pro_subscription', 'premium_features']
    }
};

// Check if this request is for a supported app
let targetApp = null;
let isSupported = false;

// Try to identify the app from bundle ID or User Agent
if (bundleId) {
    for (let appId in supportedApps) {
        if (bundleId.includes(appId) || bundleId.includes(appId.split('.').pop())) {
            targetApp = supportedApps[appId];
            isSupported = true;
            console.log("✅ Detected supported app via Bundle ID: " + supportedApps[appId].name);
            break;
        }
    }
}

// Fallback to User Agent detection
if (!isSupported && ua) {
    for (let appId in supportedApps) {
        const appName = supportedApps[appId].name.replace(/\s+/g, '');
        if (ua.includes(appName) || ua.includes(appId.split('.').pop())) {
            targetApp = supportedApps[appId];
            isSupported = true;
            console.log("✅ Detected supported app via User Agent: " + supportedApps[appId].name);
            break;
        }
    }
}

// Create fake successful iTunes response
const createFakeResponse = function(app) {
    const now = new Date();
    const futureDate = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year from now
    
    const receipts = app.productIds.map(productId => ({
        "quantity": "1",
        "product_id": productId,
        "transaction_id": "1000000" + Math.floor(Math.random() * 900000000),
        "original_transaction_id": "1000000" + Math.floor(Math.random() * 900000000),
        "purchase_date": "2024-01-01 00:00:00 Etc/GMT",
        "purchase_date_ms": "1704067200000",
        "purchase_date_pst": "2024-01-01 00:00:00 America/Los_Angeles",
        "original_purchase_date": "2024-01-01 00:00:00 Etc/GMT",
        "original_purchase_date_ms": "1704067200000",
        "original_purchase_date_pst": "2024-01-01 00:00:00 America/Los_Angeles",
        "expires_date": "2099-12-31 23:59:59 Etc/GMT",
        "expires_date_ms": "4102444799000",
        "expires_date_pst": "2099-12-31 23:59:59 America/Los_Angeles",
        "web_order_line_item_id": "1000000" + Math.floor(Math.random() * 900000000),
        "is_trial_period": "false",
        "is_in_intro_offer_period": "false"
    }));
    
    return {
        "status": 0,
        "environment": "Production",
        "receipt": {
            "receipt_type": "Production",
            "adam_id": Math.floor(Math.random() * 1000000000),
            "app_item_id": Math.floor(Math.random() * 1000000000),
            "bundle_id": bundleId || "com.example.app",
            "application_version": "1.0",
            "download_id": Math.floor(Math.random() * 1000000000),
            "version_external_identifier": Math.floor(Math.random() * 1000000000),
            "receipt_creation_date": "2024-01-01 00:00:00 Etc/GMT",
            "receipt_creation_date_ms": "1704067200000",
            "receipt_creation_date_pst": "2024-01-01 00:00:00 America/Los_Angeles",
            "request_date": now.toISOString().replace('T', ' ').replace(/\.\d{3}Z/, ' Etc/GMT'),
            "request_date_ms": now.getTime().toString(),
            "request_date_pst": now.toISOString().replace('T', ' ').replace(/\.\d{3}Z/, ' America/Los_Angeles'),
            "original_purchase_date": "2024-01-01 00:00:00 Etc/GMT",
            "original_purchase_date_ms": "1704067200000",
            "original_purchase_date_pst": "2024-01-01 00:00:00 America/Los_Angeles",
            "original_application_version": "1.0",
            "in_app": receipts
        },
        "latest_receipt_info": receipts,
        "pending_renewal_info": receipts.map(receipt => ({
            "original_transaction_id": receipt.original_transaction_id,
            "product_id": receipt.product_id,
            "auto_renew_status": "1",
            "auto_renew_product_id": receipt.product_id,
            "is_in_billing_retry_period": "0"
        }))
    };
};

// Generic fake response for unsupported apps
const createGenericFakeResponse = function() {
    const now = new Date();
    
    const genericReceipt = {
        "quantity": "1",
        "product_id": "premium_subscription",
        "transaction_id": "1000000" + Math.floor(Math.random() * 900000000),
        "original_transaction_id": "1000000" + Math.floor(Math.random() * 900000000),
        "purchase_date": "2024-01-01 00:00:00 Etc/GMT",
        "purchase_date_ms": "1704067200000",
        "purchase_date_pst": "2024-01-01 00:00:00 America/Los_Angeles",
        "original_purchase_date": "2024-01-01 00:00:00 Etc/GMT",
        "original_purchase_date_ms": "1704067200000",
        "original_purchase_date_pst": "2024-01-01 00:00:00 America/Los_Angeles",
        "expires_date": "2099-12-31 23:59:59 Etc/GMT",
        "expires_date_ms": "4102444799000",
        "expires_date_pst": "2099-12-31 23:59:59 America/Los_Angeles",
        "web_order_line_item_id": "1000000" + Math.floor(Math.random() * 900000000),
        "is_trial_period": "false",
        "is_in_intro_offer_period": "false"
    };
    
    return {
        "status": 0,
        "environment": "Production",
        "receipt": {
            "receipt_type": "Production",
            "adam_id": Math.floor(Math.random() * 1000000000),
            "app_item_id": Math.floor(Math.random() * 1000000000),
            "bundle_id": bundleId || "com.example.app",
            "application_version": "1.0",
            "download_id": Math.floor(Math.random() * 1000000000),
            "version_external_identifier": Math.floor(Math.random() * 1000000000),
            "receipt_creation_date": "2024-01-01 00:00:00 Etc/GMT",
            "receipt_creation_date_ms": "1704067200000",
            "receipt_creation_date_pst": "2024-01-01 00:00:00 America/Los_Angeles",
            "request_date": now.toISOString().replace('T', ' ').replace(/\.\d{3}Z/, ' Etc/GMT'),
            "request_date_ms": now.getTime().toString(),
            "request_date_pst": now.toISOString().replace('T', ' ').replace(/\.\d{3}Z/, ' America/Los_Angeles'),
            "original_purchase_date": "2024-01-01 00:00:00 Etc/GMT",
            "original_purchase_date_ms": "1704067200000",
            "original_purchase_date_pst": "2024-01-01 00:00:00 America/Los_Angeles",
            "original_application_version": "1.0",
            "in_app": [genericReceipt]
        },
        "latest_receipt_info": [genericReceipt],
        "pending_renewal_info": [{
            "original_transaction_id": genericReceipt.original_transaction_id,
            "product_id": genericReceipt.product_id,
            "auto_renew_status": "1",
            "auto_renew_product_id": genericReceipt.product_id,
            "is_in_billing_retry_period": "0"
        }]
    };
};

// Main logic
if (isSupported && targetApp) {
    console.log("✅ Creating fake iTunes response for: " + targetApp.name);
    const fakeResponse = createFakeResponse(targetApp);
    finalize(fakeResponse);
} else {
    console.log("🔄 Creating generic fake iTunes response");
    const genericResponse = createGenericFakeResponse();
    finalize(genericResponse);
}