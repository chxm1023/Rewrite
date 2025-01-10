/*************************************

项目名称：傲软抠图
下载地址：https://t.cn/A6xBOE5d
项目名称：傲软扫描
下载地址：https://t.cn/A6o1jHWR
项目名称：傲软PDF转换
下载地址：https://t.cn/A6o1j588
项目名称：傲软PDF编辑
下载地址：https://t.cn/A6o1jCGU
项目名称：傲软投屏
下载地址：https://t.cn/A65nw9gx
项目名称：咖映
下载地址：https://t.cn/A6o1lsFL
项目名称：轻闪PDF
下载地址：https://t.cn/A6o1iiI2
项目名称：乃糖小组件
下载地址：https://t.cn/A6o1iMdP
项目名称：佐糖
下载地址：https://t.cn/A6o1iVTI
项目名称：佐糖照片修复
下载地址：https://t.cn/A6o1itzG
更新日期：2025-01-08
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.(aoscdn\.com|apsapp\.cn) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/arqjt.js

[mitm]
hostname = *.aoscdn.com, *.apsapp.cn

*************************************/


var ddm = JSON.parse($response.body);
const vipa = '/base/vip/client/authorizations';
const vipb = '/vips';


if ($request.url.indexOf(vipa) != -1){
  ddm.data.is_activated = 1;
  ddm.data.remain_days = 999999999;
  ddm.data.expire_time = "2099-09-09 09:09:09";
  ddm.data.expired_at = 4092600296;
  ddm.data.license_type = "premium";
  ddm.data.durations = 999999999;
  ddm.data.vip_special = 1;
}

if ($request.url.indexOf(vipb) != -1){
  ddm.data = {
    "group_expired_at" : 0,
    "is_tried" : 0,
    "max_devices" : 1,
    "period_type" : "active",
    "candy_expired_at" : 0,
    "pending" : 0,
    "remained_seconds" : 0,
    "limit" : 0,
    "expired_at" : 4092600296,
    "candy" : 0,
    "license_type" : "premium",
    "quota" : 999999999,
    "status" : 1,
    "vip_special" : 1,
    "coin" : 9999
  };
}

$done({body : JSON.stringify(ddm)});
