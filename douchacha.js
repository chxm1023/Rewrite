/*************************************

项目名称：抖查查-直播短视频电商数据
下载地址：https://t.cn/A6Nq76Nh
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.douchacha\.com\/api\/(user\/info|order\/get_info) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/douchacha.js

[mitm]
hostname = api.douchacha.com

*************************************/


var body = $response.body;
var chxm1023 = JSON.parse(body);

const vipa = '/user/info';
const vipb = '/order/get_info';

if ($request.url.indexOf(vipa) != -1){
  chxm1023.data.grade_info = {
      "paused_day" : 0,
      "current_day" : 99999,
      "current_grade" : "EVIP",
      "current_grade_expire_time" : "4092599349000",
      "service_time" : "1666666666666"
    };
  chxm1023.data.permission_range = [
      "1666666666666",
      "4092599349000"
    ];
  chxm1023.data.grade = "EVIP";
}

if ($request.url.indexOf(vipb) != -1){
  chxm1023.data.user_grade_packages= [
      {
        "subscribe_activity_start_time" : "0",
        "activity_end_time" : "4092599349000",
        "activity_price" : 12800,
        "subscribe_activity_end_time" : "4092599349000",
        "apple_price" : 25800,
        "apple_try_product_id" : "pro_v3_SVIP_1_free_3",
        "desc" : "旗舰版",
        "apple_try_day" : 99999,
        "price" : 19800,
        "apple_product_id" : "pro_v3_EVIP_1",
        "activity_start_time" : "1666666666666",
        "alias" : "EVIP",
        "apple_week_subscribe_price" : 199800,
        "apple_subscribe_price" : 16300,
        "apple_subscribe_new_user_price" : 0,
        "month" : 1,
        "original_price" : 19800,
        "new_user_price" : 9800,
        "apple_try_price" : 16300
      },
      {
        "subscribe_activity_start_time" : "0",
        "activity_end_time" : "4092599349000",
        "activity_price" : 78800,
        "subscribe_activity_end_time" : "4092599349000",
        "apple_price" : 199800,
        "desc" : "旗舰版",
        "price" : 149800,
        "apple_product_id" : "pro_v3_EVIP_1",
        "activity_start_time" : "1666666666666",
        "alias" : "EVIP",
        "apple_week_subscribe_price" : 589800,
        "apple_subscribe_price" : 99800,
        "apple_subscribe_new_user_price" : 0,
        "month" : 1,
        "original_price" : 159800,
        "new_user_price" : 0
      }
    ];
}

$done({body : JSON.stringify(chxm1023)});
