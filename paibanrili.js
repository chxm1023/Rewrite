/*************************************

项目名称：排班日历
下载地址：https://t.cn/A6Nz3Zuo
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/schedule-api\.julanling\.com\/api\/(get_member_info|vip_detail) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/paibanrili.js

[mitm]
hostname = schedule-api.julanling.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const vipa = '/api/get_member_info';
const vipb = '/api/vip_detail';

if ($request.url.indexOf(vipa) != -1){
  chxm1023.results.grade = 3;
  chxm1023.results.upgrade_grade_img = "https://cdn.julanling.com/Fqnty5qaZwXwHkIXj5jtpX4FvBS5";
  chxm1023.results.benefits = {
      "data_backup" : {
        "expire_time" : "2099-09-09 09:09:09",
        "start_time" : "2023-04-03 09:39:23",
        "business_type" : "data_backup",
        "attribute" : [

        ]
      },
      "more_shift" : {
        "expire_time" : "2099-09-09 09:09:09",
        "start_time" : "2023-04-03 09:39:23",
        "business_type" : "more_shift",
        "attribute" : [
          {
            "LIMIT" : "100"
          }
        ]
      },
      "vip_identity" : {
        "expire_time" : "2099-09-09 09:09:09",
        "start_time" : "2023-04-03 09:39:23",
        "business_type" : "vip_identity",
        "attribute" : [

        ]
      },
      "android_widget_month" : {
        "expire_time" : "2099-09-09 09:09:09",
        "start_time" : "2023-04-03 09:39:23",
        "business_type" : "android_widget_month",
        "attribute" : [

        ]
      }
   };
}

if ($request.url.indexOf(vipb) != -1){
  chxm1023.results.card_number = "666666";
  chxm1023.results.grade = 3;
}


$done({body : JSON.stringify(chxm1023)});
