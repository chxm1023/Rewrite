/*************************************
项目名称：WPS Office
下载地址：https://t.cn/A6KOhd30
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/(vas|account|drive)\.wps\.cn\/(query\/api\/.+\/list_purchase_info|api\/(v\d\/spaces|users\/.+\/overview)) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/WPS.js

[mitm]
hostname = *.wps.cn

*************************************/


var chxm1023 = JSON.parse($response.body);
const vip1 = '/list_purchase_info';
const vip2 = '/overview';
const flkj = '/spaces';

if ($request.url.indexOf(vip1) != -1){
chxm1023.data["merchandises"] = [
      {
        "sku_key" : "12",
        "expire_time" : 4092599349,
        "effect_time" : 4092599349,
        "name" : "稻壳会员",
        "type" : "vip"
      },
      {
        "sku_key" : "20",
        "expire_time" : 4092599349,
        "effect_time" : 4092599349,
        "name" : "WPS会员",
        "type" : "vip"
      },
      {
        "sku_key" : "40",
        "expire_time" : 4092599349,
        "effect_time" : 4092599349,
        "name" : "超级会员",
        "type" : "vip"
      },
      {
        "sku_key" : "vip_pro_plus",
        "expire_time" : 4092599349,
        "effect_time" : 4092599349,
        "name" : "WPS超级会员Pro套餐",
        "type" : "vip"
      }
  ];
}

if ($request.url.indexOf(vip2) != -1){
  chxm1023["privilege"] = [
    {
      "times" : 541826,
      "spid" : "data_recover",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "ocr",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "pdf2doc",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "pdf_merge",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "pdf_sign",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "pdf_split",
      "expire_time" : 4092599349
    },
    {
      "times" : 541826,
      "spid" : "speech_record",
      "expire_time" : 4092599349
    }
  ];
  chxm1023["level"] = 3,
  chxm1023["vip"] = {
    "memberid" : 40,
    "expire_time" : 4092599349,
    "name" : "超级会员",
    "has_ad" : 0,
    "enabled" : [
      {
        "name" : "超级会员",
        "memberid" : 40,
        "expire_time" : 4092599349
      },
      {
        "name" : "WPS会员",
        "memberid" : 20,
        "expire_time" : 4092599349
      },
      {
        "name" : "稻壳会员",
        "memberid" : 12,
        "expire_time" : 4092599349
      }
    ]
  };
}

if ($request.url.indexOf(flkj) != -1){
  chxm1023["total"] = 1100585369600;
}

$done({body : JSON.stringify(chxm1023)});
