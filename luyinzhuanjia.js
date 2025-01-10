/*************************************

项目名称：录音专家
下载地址：https://t.cn/A6lWVauX
更新日期：2023-12-26
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^http:\/\/luyintu\.cushuikeji\.cn\/tuv2\.(user\/info|order\/comboDuration|home\/activityAlert) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/luyinzhuanjia.js

[mitm]
hostname = luyintu.cushuikeji.cn

*************************************/


var chxm1023 = JSON.parse($response.body);
const user = /tuv2\.user\/info/;
const scxx = /tuv2\.order\/comboDuration/;
const ad = /tuv2\.home\/activityAlert/;

if(user.test($request.url)){
  chxm1023.result = {
    ...chxm1023.result,
    "vip_end_time" : 4092599349,
    "vip_try" : 1,
    "is_give_call_duration" : 36000006,
    "call_duration" : 36000006,
    "record_surplus_duration" : 36000006,
    "hours_left" : 36000006,
    "is_vip" : 1,
    "shers" : 99,
    "surplus_duration" : 36000006,
    "vip_hours" : 36000006,
    "volume_total" : 582540000000,
    "permanent_vip" : 1,
    "vip_grade" : 1,
    "enabled" : 1,
    "vip_type" : 1,
  };
}

if(scxx.test($request.url)){
  chxm1023.result.duration = {
    "vip_duration" : 36000006,
    "total_surplus_duration" : 36000006,
    "vip_surplus_duration" : 36000006,
    "user_duration" : 36000006,
    "buy_surplus_duration" : 36000006
  };
}

if(ad.test($request.url)){
  chxm1023.result = [];
}

$done({body : JSON.stringify(chxm1023)});