/*************************************

项目名称：壁纸-高清墙纸/背景主题
下载地址：https://t.cn/A6WmzYvC
更新日期：2023-11-20
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/leancloud\.emotionwp\.com\/.+\/(classes|batch\/save) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/bizhi.js

[mitm]
hostname = leancloud.emotionwp.com

*************************************/


var chxm1023 = JSON.parse($response.body);
const user = /classes\/wpf_account/;
const xiazai = /classes/;
const save = /batch\/save/;

if(user.test($request.url)){
  chxm1023.results = [{
      "updatedAt" : "2023-09-09T09:09:09Z",
      "vipEndTime" : 4092599349,
      "svipEndTimeFormat" : "2099-09-09",
      "sex" : "1",
      "isSVIP" : 1,
      "isVIP" : 1,
      "userId" : "A66666666_B6666666666666-C66",
      "loginType" : 1,
      "nickName" : "叮当猫の分享频道",
      "headImageUrl" : "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/ddm.png",
      "objectId" : "666666666666666666666666",
      "createdAt" : "2023-09-09T09:09:09Z",
      "svipEndTime" : 4092599349,
      "coin" : 99999
  }];
}

if(xiazai.test($request.url)){
  chxm1023.results.forEach(item => {
    if ('needVIP' in item && 'needSVIP' in item && 'needCoin' in item && 'score' in item) {
      item.score = 99999;
      item.needVIP = 0;
      item.needSVIP = 0;
      item.needCoin = 0;
    }
  });
}

if(save.test($request.url)){
  chxm1023 = {
  "666666666666666666666666" : {
    "updatedAt" : "2023-09-09T09:09:09Z",
    "objectId" : "666666666666666666666666"
  },
  "code" : 1
  }
}

$done({body : JSON.stringify(chxm1023)});