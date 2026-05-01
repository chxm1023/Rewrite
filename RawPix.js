/*************************************

应用名称：RawPix-DIY壁纸
脚本功能：解锁VIP
下载地址：https://is.gd/Sx6SmN
更新日期：2026-05-02
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.rawpixlive\.com\/api\/sign\/profile url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/RawPix.js


[mitm]
hostname = api.rawpixlive.com

*************************************/


var ddm = JSON.parse($response.body);

ddm.data.isCreator = 1;
ddm.data.is_vip = true;
ddm.data.expireTime = 4092599349;
ddm.data.level = 6;
ddm.data.level_name = "年卡会员";
ddm.data.can_trail = false;

$done({ body: JSON.stringify(ddm) });