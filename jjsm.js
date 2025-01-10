/*************************************

项目名称：极简扫描
下载地址：https://t.cn/A6KJaeDD
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/cn\.czur\.cc\/api\/v\d\/User\/info.+ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/jjsm.js

[mitm]
hostname = cn.czur.cc

*************************************/

var chxm1023 = JSON.parse($response.body);

chxm1023 = {
  "msg" : "Success",
  "body" : {
    "vipStartOn" : null,
    "remainingVip" : 766496,
    "vipEndOn" : "2099-09-09 09:09:09",
    "invitationCount" : 0,
    "svipEndOn" : "2099-09-09 09:09:09",
    "svipStartOn" : null,
    "svip" : true,
    "renewStatus" : false,
    "email" : null,
    "billDate" : null,
    "isInvitate" : false,
    "funcDefId" : 9999,
    "invitationCode" : "PYUJ",
    "remainingCloudocrVip" : 9999,
    "isVip" : true,
    "appleExpireDate" : null,
    "usagesLimit" : 1073741824000000,
    "photoOssKey" : null,
    "payExpireDate" : 4092599349000,
    "userType" : "svip",
    "usages" : 958486,
    "remainingOcr" : -1,
    "totalOcr" : -1,
    "totalPdf" : -1,
    "totalHighCertificate" : 9999,
    "totalHandwriting" : 9999,
    "totalCloudocr" : 9999,
    "totalCertificate" : -1,
    "remainingHandwriting" : 9999,
    "remainingCloudocrNormal" : 9999,
    "remainingHighCertificate" : 9999,
    "remainingHandwritingNormal" : 9999,
    "remainingCertificate" : -1,
    "remainingPdf" : -1
  },
  "code" : 1000
};

$done({body : JSON.stringify(chxm1023)});








