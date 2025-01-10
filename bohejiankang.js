/*************************************

项目名称：薄荷健康-解锁超级会员
下载地址：https://t.cn/A69ull4r
更新日期：2025-01-09
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.boohee\.com\/app-interface\/.+\/user\/user_info url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/bohejiankang.js

[mitm]
hostname = api.boohee.com

*************************************/


var ddm = JSON.parse($response.body);

ddm.data.vip.is_member = true;
ddm.data.vip.state = "1";
ddm.data.vip.expired_at = "2099-09-09 09:09:09";
ddm.data.vip.integral_member = {
  "integral": 0,
  "level": 1,
  "level_name": "蓝钻会员"
};

$done({body : JSON.stringify(ddm)});
