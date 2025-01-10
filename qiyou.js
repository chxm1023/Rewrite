/*************************************

项目名称：奇游加速器
下载地址：https://t.cn/A6WUkZaO
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.qiyou\.cn\/api\/common_bll\/v\d\/(member\/(login_status|mobile_expire_remind)|client_advertisements) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/qiyou.js


[mitm]
hostname = api.qiyou.cn

*************************************/


var chxm1023 = JSON.parse($response.body);
const vip = '/member/login_status';
const shijian = '/member/mobile_expire_remind';
const ad = '/client_advertisements';

if ($request.url.indexOf(vip) != -1){
  chxm1023.member["accounts"] = [
      {
        "amount" : 20360012991,
        "duration_type" : "MONTH",
        "account_type" : "TRIAL_USER",
        "account_status" : "VALID"
      },
      {
        "amount" : 4092599349,
        "duration_type" : "MONTH",
        "account_type" : "MOBILE_USER",
        "account_status" : "VALID"
      }
    ];
  chxm1023.member["member_name"] = "叮当猫の分享频道";
  chxm1023.member["user_type"] = 1;
  chxm1023.member["member_pay_flag"] = 1;
}

if ($request.url.indexOf(shijian) != -1){
  chxm1023["expire_time"] = "2099-09-09 09:09:09";
}

if ($request.url.indexOf(ad) != -1){
  delete chxm1023.data;
}


$done({body : JSON.stringify(chxm1023)});
