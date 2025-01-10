/*************************************

项目名称：小习惯-打卡App 解锁VIP
下载地址：https://t.cn/A69lQVtI
使用声明：仅供学习与交流，请勿转载与贩卖！⚠️

**************************************

[rewrite_local]

^https:\/\/xianbeikeji\.com\/daily\/app\/user\/query url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/xxg.js

[mitm]

hostname = xianbeikeji.com

*************************************/


var chxm1023=JSON.parse($response.body);chxm1023.data.userInfo.vipFlag=1,$done({body:JSON.stringify(chxm1023)});
