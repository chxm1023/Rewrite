/*************************************

项目名称：魔音工坊
下载地址：https://too.st/7Sh
更新日期：2024-01-30
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/moyin-gateway\.moyin\.com\/moyin-account\/v\d\/vip\/status url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/mygf.js

[mitm]
hostname = moyin-gateway.moyin.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = {
   ...chxm1023.data,
   "leftDays" : 99999,
   "isAnnualVip" : true,
   "vipTypeDesc" : "SVIP",
   "freeCount" : 99999,
   "vipRenewBannerIcon" : "https://mobvoi-growth-public.ticwear.com/image/moyingongfang/2022-10-17-8390460908237665083.png",
   "vipRenewBannerButton" : "https://mobvoi-growth-public.ticwear.com/image/moyingongfang/2022-10-25-4458810324266331367.png",
   "vipEndTime" : 4092599349000,
   "endTime" : 4092599349000,
   "vipRenewBannerBackgroundImg" : "https://mobvoi-growth-public.ticwear.com/image/moyingongfang/2022-10-17-3744562395261278965.png",
   "wordNum" : 99999,
   "totalFreeCount" : 99999,
   "type" : 1,
   "vipLeftDaysForDisplay" : 99999,
   "aiCapacity" : true,
   "superEndTime" : 4092599349000,
   "seatCount" : 99999,
   "curSeatCountLeftDays" : 99999,
   "leftDaysForDisplay" : 99999,
   "expireDays" : 4092599349000,
   "realVip" : true,
   "beginTime" : 1706494224000
};

$done({body : JSON.stringify(chxm1023)});