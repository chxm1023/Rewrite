/*************************************

项目名称：Wlingua
下载地址：https://t.cn/A6EEe5Bs
更新日期：2024-10-13
脚本作者：@David_Hex01
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.wlingua\.io\/v\d+\/user\/\d+\/meta-course\/\d+\/get$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/wlingua.js

[mitm]
hostname = api.wlingua.io

*************************************/


var body = $response.body;
var obj = JSON.parse(body);

obj.config.sentenceExType.writeDictation = true;
obj.config.sentenceExType.write = true;
obj.config.sentenceExType.speak = true;
obj.config.sentenceExType.speakPronunciation = true;
obj.config.autoContinueEnabled = true;
obj.config.vocExType.flashcard = true;

obj.subscription.premiumEndTime = 4092599349;
obj.premiumEndTime = 4092599349;

body = JSON.stringify(obj);

$done({body});