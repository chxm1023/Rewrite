/*************************************

项目功能：推糖-壁纸头像美图社区
下载地址：https://t.cn/Ai3pMcdl
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^http[s]?:\/\/.*\.duitang\.com\/napi\/people\/me url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/duitang2.js

[mitm] 
hostname = *.duitang.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data.is_life_artist = true;
chxm1023.data.latest_vip_level = 11;
chxm1023.data.vip_end_at_mills = 4092599350000;
chxm1023.data.vip_end_at = 4092599350;
chxm1023.data.svip_mechanism = 1;
chxm1023.data.follow_count = 1000000;
chxm1023.data.score = 1000000;
chxm1023.data.be_follow_count = 1000000;
chxm1023.data.vip_level = 11;
chxm1023.data.vip = true;
chxm1023.data.can_edit_nickname = true;

$done({body : JSON.stringify(chxm1023)});