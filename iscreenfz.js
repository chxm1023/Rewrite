/*************************************

项目名称：iScreen-小组件-辅助解锁
下载地址：https://t.cn/A6MsPY5O
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/cs\.kuso\.xyz\/configs.+ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/iscreenfz.js
^https?:\/\/pay\.kuso\.xyz\/pay\/pay-check url reject-200

[mitm]
hostname = cs.kuso.xyz

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "status" : 0,
  "data" : {
    "FeedBanner" : "3333",
    "IsandBannerAd" : 0,
    "noAds" : 1,
    "lang" : "zh",
    "review_pop_interval" : 300,
    "country" : "cn",
    "lockscreen_noVip" : "0,1",
    "SplashInter" : 300,
    "pic_lock_count" : 50,
    "showOurApp" : 1,
    "main_pop_ad_interval" : 0,
    "launchAd" : 0,
    "FeedAd" : 0,
    "BannerAd" : 0,
    "vipPopupType" : 3,
    "ai_painting" : 1,
    "ai_painting_wp" : 1,
    "activityUpdateTime" : 1687959242,
    "rewardAd" : 0,
    "Hudong_Interval" : 900,
    "ThemeFeedAd" : 4,
    "showRing" : 1
  },
  "ab" : 0
};

$done({body : JSON.stringify(chxm1023)});