/*************************************

项目名称：地震预警
下载地址：https://t.cn/A6CoMiO5
更新日期：2024-04-29
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/mobile-new\.chinaeew\.cn\/v\d\/order\/apple\/vip url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/dzyj.js

[mitm]
hostname = mobile-new.chinaeew.cn

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "message" : "查询成功",
  "data" : {
    "endTime" : 4092599349000
  },
  "code" : 0
};

$done({body : JSON.stringify(chxm1023)});
