/*************************************

项目名称：Nicegram(兼容新老旧版)
下载地址：https://t.cn/A6ou0MCe
更新日期：2026-02-17
脚本作者：ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
版本1.4.6一次性解锁：打开APP → 设置 → 选择白色Nicegram → 往下拉找到【恢复购买】
版本1.4.7以上非一次性解锁：打开APP → 助手 → 点击【释放您的Nicegram特权】之后关闭APP，重新打开即可

**************************************

[rewrite_local]
^https?:\/\/(nicegram\.cloud\/api\/v\d\/(user\/info|unblock-feature\/get-settings)|restore-access\.indream\.app\/restoreAccess|api\.mbrx\.app\/v\d\/purchase\/ios\/transaction) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/nicegram.js

[mitm]
hostname = nicegram.cloud, restore-access.indream.app, api.mbrx.app

*************************************/


const url = $request.url;
const isQX = typeof $task !== "undefined";
var ddm = JSON.parse($response.body);

if (/user\/info/.test(url)) {
  ddm.data.user = {
    ...ddm.data.user,
    "subscription": true,
    "store_subscription": true,
    "subscriptionPlus": true,
    "lifetime_subscription": true
  };
}

if (/unblock-feature\/get-settings/.test(url)) {
  ddm.premium = true;
}

if (/restoreAccess/.test(url)) {
  ddm["data"] = {"premiumAccess": true};
}

if (/transaction/.test(url)) {
  ddm.subscriptions = [{"premiumAccess": true}];
}


function finalizeResponse(content) {
  return { status: isQX ? "HTTP/1.1 200 OK" : 200, headers: $response.headers, body: JSON.stringify(content) };
}

$done(isQX ? finalizeResponse(ddm) : ddm);
