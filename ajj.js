/*************************************

项目名称：爱剪辑
下载地址：https://t.cn/A6KKPMgP
更新日期：2025-01-08
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.open\.loveclip\.site\/UserInfo\/(UserPersonalCoreAsync|GetUserDetail) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/ajj.js

[mitm]
hostname = api.open.loveclip.site

*************************************/


var ddm = JSON.parse($response.body);

if(/(UserPersonalCoreAsync|GetUserDetail)/.test($request.url)){
  ddm.data.IsVip = true;
  ddm.data.VipLevel = "1";
  ddm.data.VipExpire = "2099-09-09 09:09:09";
}

$done({body : JSON.stringify(ddm)});

