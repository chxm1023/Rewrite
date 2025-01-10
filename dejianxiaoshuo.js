/*************************************

项目名称：得间小说 解锁会员
下载地址：https://t.cn/A6i8BXBm
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️

**************************************

[rewrite_local]

^https:\/\/dj\.palmestore\.com\/zyuc\/api\/user\/accountInfo url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/dejianxiaoshuo.js

[mitm]

hostname = dj.palmestore.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.body.userInfo.unlockVipInfo = {
        "vipType" : 1,
        "vipExpire" : 4092599349,
        "expireDate" : "2099-09-09"
      };
chxm1023.body.userInfo.vipInfo = {
        "content" : "点击进入购买会员",
        "vipType" : 1,
        "expireDate" : "2099-09-09",
        "halfScreen" : "https://dj.palmestore.com/zytc/public/index.php?ca=FreeVip.Index&source=book",
        "expireDateNew" : "2099-09-09",
        "description" : "开通会员",
        "fullScreen" : "https://dj.palmestore.com/zytc/public/index.php?ca=FreeVip.Index&showContentInStatusBar=1&source=mine",
        "vipExpire" : 4092599349};


$done({body : JSON.stringify(chxm1023)});
