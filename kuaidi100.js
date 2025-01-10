/*************************************

项目名称：快递100收件
下载地址：https://t.cn/A6Ez6yMk
更新日期：2024-09-20
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/.*\.kuaidi100\.com\/(mkt\/courier\/open|open\/test|advertisement) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/kuaidi100.js

[mitm]
hostname = *.kuaidi100.com

*************************************/


var chxm1023 = JSON.parse($response.body);

if(/advertisement/.test($request.url)){
  chxm1023.data = {};
}

if (/getLoginInfo/i.test($request.url)) {
  chxm1023.data = {
   ...chxm1023.data,
    "vipTag": "VIP",
    "vipDeadline": 4092599349000
  };
  chxm1023.vipTag = "VIP";
  chxm1023.vipDeadline = 4092599349000;
}

if (/getMyVip/.test($request.url)) {
  chxm1023.data = {
   ...chxm1023.data,
    "vipTag": "VIP",
    "expired": 0,
    "vipTimeDetail": {
      "VIP": 4092599349000,
      "PAID_WEB": 4092599349000,
      "PAID_APP": 4092599349000
    },
    "vipDeadline": 4092599349000
  };
  if (chxm1023.data.serviceList && Array.isArray(chxm1023.data.serviceList)) {
    chxm1023.data.serviceList.forEach((item) => {
      if ('endTime' in item) {
        item.endTime = 4092599349000;
      }
    });
  }
}

if(/getAllPaidService/.test($request.url)){
  chxm1023.data = {
    "CAINIAOBLUETOOTHPRINTING" : 4092599349000,
    "BATCHADDNEW" : 4092599349000,
    "EXPEXPORT" : 4092599349000,
    "EXCELSPEEDIMPORT" : 4092599349000,
    "HISEXPEXPORT" : 4092599349000,
    "APPEXPORT3MONTH" : 4092599349000,
    "APPLIST3MONTH" : 4092599349000,
    "MULTIELEC" : 4092599349000,
    "DEPUTY" : 4092599349000,
    "MULTISTORE" : 4092599349000,
    "EXCEPTIONNOTICE" : 4092599349000,
    "WORKERLIMIT" : 4092599349000,
    "EXCELSOURCEDOWNLOAD" : 4092599349000
  };
}

$done({body : JSON.stringify(chxm1023)});
