/*************************************

项目名称：FT中文网/RainViewer天气预报
下载地址：https://t.cn/A6OudTtN
下载地址：https://t.cn/A6WqTbgz
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.cloudfront\.net\/(index\.php\/jsapi\/(paywall|get_story_more_info)|mobile\/verify) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/cloudfront.js
^https?:\/\/ftmailbox\.cn\/ad_impression\/.+ url reject-200

[mitm]
hostname = *.cloudfront.net, ftmailbox.cn

*************************************/


function modifyBody(modifier) {
    const chxm1023 = JSON.parse($response.body);
    modifier(chxm1023);
    $response.body = JSON.stringify(chxm1023);
}

const url = $request.url;
const vip = /paywall/;
const ad = /get_story_more_info/;
const tianqi = /https:\/\/d1hzbu30hrhkoe\.cloudfront\.net\/mobile\/verify\/ios/;

switch (true) {
    case vip.test(url):
        modifyBody(chxm1023 => {
            Object.assign(chxm1023, {
                "paywall": 0,
                "premium": 1,
                "expire": "4092599349",
                "standard": 1,
                "v": 2099,
                "campaign_code": "",
                "latest_duration": "yearly",
                "addon": 1
            });
        });
    case ad.test(url):
        modifyBody(chxm1023 => {
            chxm1023.paywall = 0;
            chxm1023.accessright = "1";
        });
    case tianqi.test(url):
        modifyBody(chxm1023 => {
            chxm1023.data = {
                ...chxm1023.data,
                "is_grace": true,
                "purchased": true,
                "is_trial": true,
                "is_cancelled": true,
                "type": 2,
                "has_orders": true,
                "expiration": 4092599349,
                "is_expired": false
            };
        });
        break;
}

$done({body: $response.body});
