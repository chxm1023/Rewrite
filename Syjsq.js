/*************************************

项目名称：Symbolab (需要登录)
下载地址：https://t.cn/A6cE1x9u
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

**************************************

[rewrite_local]

^https?:\/\/scibug\.com\/appleSubscriptionValidate$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Syjsq.js

[mitm]

hostname = scibug.com

*************************************/

let chxm1023 = JSON.parse($response.body);

chxm1023= {"valid":true,"hasUserConsumedAppleFreeTrial":false,"isCurrentlyInFreeTrial":false,"newlyAssociated":false,"membership":{"isCurrentlyInFreeTrial":false,"valid":true,"hasUserConsumedAppleFreeTrial":false,"newlyAssociated":false}}

$done({body: JSON.stringify(chxm1023)});
