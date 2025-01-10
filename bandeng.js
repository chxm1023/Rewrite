/*************************************

项目名称：板凳音乐
下载地址：https://t.cn/A6WODB1b
更新日期：2024-01-09
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/mobileapp\.wuyamusic\.com\/playmusic-app-server-400\/(vip\/user\/list.+|music\/score\/get2.+|choose\/getmusic|api|app\/swiper) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/bandeng.js

[mitm]
hostname = mobileapp.wuyamusic.com

*************************************/


var ddm = JSON.parse($response.body);
const vip = /vip\/user/;
const yuepu = /music\/score/;
const ad = /(api\/msg\/listpopupmessage|app\/swiper\/listv)/;

if(vip.test($request.url)){
	ddm.data = [
    {...ddm.data,
      "remainderDay" : 99999,
      "version" : 1,
      "type" : 1,
      "date" : 4092599349000,
      "flag" : 1,
      "playId" : "07",
      "vipType" : "year",
      "usableUp" : 1,
      "status" : 1,
      "vipTypeId" : "20"
    }
  ];
}

if(yuepu.test($request.url)){
	ddm.data.usableNumber = 99;
	ddm.data.free = 1;
	delete ddm.data.amount;
}

if(ad.test($request.url)){
	ddm.data = [];
	ddm.rows = ddm.rows.filter(item => item.title !== "联系我们");
}

$done({body : JSON.stringify(ddm)});
