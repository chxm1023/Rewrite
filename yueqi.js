/*************************************

项目名称：17个App合集
下载地址：https://t.cn/A6OKWoM9
下载地址：https://t.cn/A6OKWO3Y
下载地址：https://t.cn/A6OKWjW4
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
特别说明：三个地址，全家桶，总共17个APP左右。

**************************************

[rewrite_local]
^https:\/\/.*api\.quthing\.com\/(.+\/vip|vip|student|user|appearance|background|rest) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/yueqi.js

[mitm]
hostname = *api.quthing.com

*************************************/


var body = $response.body;

body = body.replace(/\"trialPeriod":\w+/g, '\"trialPeriod":true');

body = body.replace(/\"buttonTip":"(.*?)"/g, '\"buttonTip":"已解锁"');

body = body.replace(/\"newButtonTitle":"(.*?)"/g, '\"newButtonTitle":"已解锁会员"');

body = body.replace(/\"buttonTitle":"(.*?)"/g, '\"buttonTitle":"已解锁会员"');

body = body.replace(/\"vipMessage":"(.*?)"/g, '\"vipMessage":"终身会员"');

body = body.replace(/\"cnButtonTip":"(.*?)"/g, '\"cnButtonTip":"已解锁会员"');

body = body.replace(/\"vipHighlight":"(.*?)"/g, '\"vipHighlight":""');

body = body.replace(/\"trialDays":"(.*?)"/g, '\"trialDays":"99999"');

body = body.replace(/\"vipType":\d+/g, '\"vipType":3');

body = body.replace(/\"seniorVipType":\d+/g, '\"seniorVipType":3');

body = body.replace(/\"courseVipType":\d+/g, '\"courseVipType":3');

body = body.replace(/\"validVip":\w+/g, '\"validVip":true');

body = body.replace(/\"validSeniorVip":\w+/g, '\"validSeniorVip":true');

body = body.replace(/\"validCourseVip":\w+/g, '\"validCourseVip":true');

body = body.replace(/\"canEnterCourseIfOldVip":\w+/g, '\"canEnterCourseIfOldVip":true');

body = body.replace(/\"unlocked":false/g, '\"unlocked":true');

body = body.replace(/\"vipFree":\w+/g, '\"vipFree":false');

body = body.replace(/\"cost":\d+/g, '\"cost":0');

body = body.replace(/\"expireTime":\d+/g, '\"expireTime":4092599349000');

body = body.replace(/\"seniorExpireTime":\d+/g, '\"seniorExpireTime":4092599349000');

body = body.replace(/\"courseVipExpireTime":\d+/g, '\"courseVipExpireTime":4092599349000');

body = body.replace(/\"expiredDays":\d+/g, '\"expiredDays":999999');

body = body.replace(/\"status":\d+/g, '\"status":1');

body = body.replace(/\"vipCount":\d+/g, '\"vipCount":999999');

body = body.replace(/\"showText":".*?"/g, '\"showText":"2099.9.9到期"');

body = body.replace(/\"lastBuySkuName":".*?"/g, '\"lastBuySkuName":"partnertrainingai_year_vip"');

$done({body});
