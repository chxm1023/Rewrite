/*************************************

项目名称：Vista看天下
下载地址：https://t.cn/A6ORUIIv
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/open3\.vistastory\.com\/v\d\/api\/(vip|my\/home\/get_home_center|user/pendant|poster\/share_poster|adm\/get_popup_ad|index\/loading_ad) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Vista.js

[mitm] 
hostname = open3.vistastory.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const subscription = {      "userId" : 666666,      "beginTime" : 1666666666666,      "id" : 188888,      "endTime" : 4092599349000,      "createTimeFormat" : "2022-10-25 10:57:46",      "createTime" : 1666666666666,      "isActive" : 1    };

const vipa = '/api/vip';
const vipb = '/my/home/get_home_center';
const guashi = '/user/pendant';
const yaoqing = '/poster/share_poster'
const popup = '/adm/get_popup_ad';
const ad = '/index/loading_ad';


if ($request.url.indexOf(vipa) != -1){
  chxm1023["isVip"] = 1;
  chxm1023["expireVip"] = 0;
  chxm1023["subscriptionVip"] = (subscription);
  chxm1023["isUpgradeVip"] = 0;
  chxm1023["vipInfo"] = {
    "isMiniVip" : 0,
    "expireVip" : 0,
    "subscriptionVip" : (subscription),
    "isVip" : 1
  };
}

if ($request.url.indexOf(vipb) != -1){
  chxm1023["subscriptionVip"] = (subscription);
  chxm1023["isVip"] = 1;
  chxm1023["level"] = 99;
  chxm1023["exp"] = 0;
  chxm1023["info"] = "叮当猫の分享频道:@chxm1023";
}

if ($request.url.indexOf(guashi) != -1){
  chxm1023.userLevel = 99;
  chxm1023.status = 1;
  chxm1023.msg = "success";
  if(chxm1023.pendantList && Array.isArray(chxm1023.pendantList)) {
    chxm1023.pendantList.forEach(item => {
      item.level = 1;
    });
  }
}

if ($request.url.indexOf(yaoqing) != -1){
  chxm1023.posterList = [
    {
      "status" : 1,
      "id" : 6,
      "title" : "                                                                ",
      "imgUrl" : "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/dlam.png",
      "imgPath" : "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/dlam.png",
      "position" : 0
    }
  ];
  chxm1023.inviteUrl = "https://t.me/chxm1023"
}

if ($request.url.indexOf(popup) != -1){
  delete chxm1023.popup;
}

if ($request.url.indexOf(ad) != -1){
  delete chxm1023.ad;
}

$done({body : JSON.stringify(chxm1023)});
