/*************************************

项目名称：PhotoSlip-照片清理大师
下载地址：https://t.cn/A6XMsIv7
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

**************************************

[rewrite_local]

^https:\/\/www2\.tigeroom\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/zpqlds.js

[mitm] 

hostname = www2.tigeroom.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "message" : "",
  "data" : {
    "phone" : null,
    "viptime" : "2099-09-09",
    "stafftype" : "02",
    "isperfect" : 0,
    "username" : null,
    "staffid" : "1601256577462566913",
    "photo" : "https://fff-kangxizidian.oss-cn-hangzhou.aliyuncs.com/image/photo/default/default-photo.png",
    "email" : null,
    "isvip" : 1,
    "appleid" : null
  },
  "code" : 200
};


$done({body : JSON.stringify(chxm1023)});
