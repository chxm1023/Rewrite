/*************************************

项目名称：凡音钢琴
下载地址：https://too.st/6UO
更新日期：2023-12-18
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/gzfanyin\.com\/api\/ums\/getMember url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/fanyingangqin.js

[mitm]
hostname = gzfanyin.com

*************************************/


var chxm1023 = JSON.parse($response.body);

chxm1023.data = { 
   ...chxm1023.data,
   memberRole: 1,
   vipEndDate: "2099-09-09 09:09:09",
   isAdmin: "Y",
   nickName: "叮当猫",
   avatar: "https://raw.githubusercontent.com/chxm1023/Script_X/main/icon/ddm.png",
   vipGrade: 3
};

$done({body : JSON.stringify(chxm1023)});