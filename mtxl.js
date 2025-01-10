/*************************************

项目名称：Wink-像修图一样修视频
下载地址：https://t.cn/A6ouQvnT
项目名称：蛋啵-宝宝版美图秀秀
下载地址：https://t.cn/A69AjDYp
项目名称：潮自拍
下载地址：https://t.cn/A6A2Sybv
项目名称：海报工厂
下载地址：https://t.cn/A66WBa0v
项目名称：Chic-创意胶片相机
下载地址：https://t.cn/A6oLDrrK
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api-.*\.meitu\.com\/(.+\/user\/vip_info|user\/show) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/mtxl.js

[mitm]
hostname = api-*.meitu.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const vip = '/user/vip_info';
const user = '/user/show';

if ($request.url.indexOf(vip) != -1){
chxm1023.data.trial_period_invalid_time = 4092599349000;
chxm1023.data.current_order_invalid_time = 4092599349000;
chxm1023.data.valid_time = 4092599349000;
chxm1023.data.invalid_time = 4092599349000;
chxm1023.data.use_vip = true;
chxm1023.data.have_valid_contract = true;
chxm1023.data.derive_type_name = "普通会员";
chxm1023.data.in_trial_period = true;
chxm1023.data.is_vip = true;
}

if ($request.url.indexOf(user) != -1){
chxm1023.data.vip_type = 1;
chxm1023.data.vip_icon = "https://xximg1.meitudata.com/6948531818264286440.png";
chxm1023.data.follower_count = 999000;
chxm1023.data.fan_count = 999000;
chxm1023.data.favorites_count = 999000;
chxm1023.data.be_like_count = 999000;
}

$done({body : JSON.stringify(chxm1023)});
