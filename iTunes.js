/*************************************

项目名称：iTunes-系列解锁合集
更新日期：2026-04-25
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！
使用说明：如果脚本无效，请先排除是否脚本冲突
特别说明：此脚本可能会导致App Store无法登录ID
解决方法：关[MITM][脚本][代理工具]方法选一即可

**************************************

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/iTunes.js

[mitm]
hostname = buy.itunes.apple.com

*************************************/


let body = $response.body;
let ddm = null, data = null, anchor = false;
function tryParse(raw) {
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}
ddm = tryParse(body);
if (!ddm) {
  let start = body.indexOf("{");
  let end = body.lastIndexOf("}");
  if (start !== -1 && end !== -1) {
    ddm = tryParse(body.substring(start, end + 1));
    if (ddm) console.log("✅ 使用截断JSON解析成功");
  }
}
if (!ddm) {
  let match = body.match(/\{[\s\S]*\}/);
  if (match) {
    ddm = tryParse(match[0]);
    if (ddm) console.log("✅ 使用正则JSON解析成功");
  }
}
if (!ddm) {
  console.log("❌ JSON解析彻底失败，跳过脚本");
  $done({});
  return;
}
const ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
const bundle_id = ddm.receipt["bundle_id"] || ddm.receipt["Bundle_Id"];

// ===== App列表 =====
const list = {
  'bazaart': { tp: 'timea', hx: 'hxpda', id: "Bazaart_Super_Three_Months_v4" }, //Bazaart百色特
  'SHScan': { tp: 'timea', hx: 'hxpda', id: "com.ws.SHScanFree.Year" }, //扫描王
  'EnglishTalent': { tp: 'timea', hx: 'hxpda', id: "com.mango.newYearVip", strict: "auto" }, //英语演讲
  'art.yueyin.ebook-convert': { tp: 'timea', hx: 'hxpda', id: "art.yueyin.ebook.year" }, //电子书格式转换
  'MaiqiSun': { tp: 'timeb', hx: 'hxpda', id: "life_cn_68" }, //iSunning
  'PulseWatch': { tp: 'timeb', hx: 'hxpda', id: "relaxlife_ebp" }, //RelaxWatch:AI智能压力监测
  'PicCompress': { tp: 'timea', hx: 'hxpda', id: "pc_vip_new_1y" }, //图片压缩
  'XiangCePhoto': { tp: 'timeb', hx: 'hxpda', id: "ql128" }, //相册清理-删除重复照片
  'FileMaster': { tp: 'timeb', hx: 'hxpda', id: "FileMaster_ProVersion" },  //文件大师
  'Tuesday': { tp: 'timeb', hx: 'hxpda', id: "PIGLET_VIP_Forever" },  //Tuesday-纪念日
  'IPTV%20Flixana': { tp: 'timeb', hx: 'hxpda', id: "iptv_flixana_lifetime_sub" },  //IPTV Flixana
  'AdBlocker': { tp: 'timeb', hx: 'hxpda', id: "com.va.adBlocker.lifeTimefree" },  //AdBlocker
  'ECGPlus': { tp: 'timeb', hx: 'hxpda', id: "com.wms.hrv.pro" },  //ECG+心电房颤分析
  'WatchWallpaper': { tp: 'timea', hx: 'hxpda', id: "indie.davidwang.WatchWallpaper.yearsubscriptegold" },  //表盘专辑
  'com.beauty.MeiTui': { tp: 'timea', hx: 'hxpda', id: "vip_member_v3_365day" },  //AI美腿
  'ChmReader': { tp: 'timeb', hx: 'hxpda', id: "EpubReader_ProVersion" },  //Epub阅读器
  'MediaConvert': { tp: 'timeb', hx: 'hxpda', id: "MediaConverter_ProVersion" },  //格式转换
  'Period': { tp: 'timeb', hx: 'hxpda', id: "com.hanchongzan.time.pro" },  //时光提醒
  'com.sixiaobo.MusCut': { tp: 'timeb', hx: 'hxpdb', id: "com.purecollage.pro" },  //无损拼图
  'com.hanchongzan.loverlist': { tp: 'timeb', hx: 'hxpda', id: "com.hanchongzan.loverlist.01" },  //恋人清单
  'FlashTransportMaster': { tp: 'timea', hx: 'hxpda', id: "com.flashtransport.fightenegery.yearly.base" },  //时光罐罐
  'com.ideack.ASR': { tp: 'timeb', hx: 'hxpda', id: "ASR_Permanent_Plan" },  //录音转文字
  'Presets': { tp: 'timea', hx: 'hxpda', id: "com.chromatech.chroma.yearlyAutoRenewable" },  //Presets:照片处理、图像编辑器
  'GoodTask': { tp: 'timeb', hx: 'hxpda', id: "com.hahainteractive.goodtask3.pro" },  //代办事项清单-GoodTask
  'com.hanchongzan.period': { tp: 'timeb', hx: 'hxpda', id: "com.hanchongzan.period.girl" },  //姨妈来咯
  'com.hanchongzan.book': { tp: 'timeb', hx: 'hxpda', id: "com.hanchongzan.book.vip" }, //闪电记账
  'SoundLab': { tp: 'timeb', hx: 'hxpda', id: "8001" },  //合声-音乐制作
  'ECGANALYZER': { tp: 'timea', hx: 'hxpda', id: "com.wms.hrv.yearlyfamilysharing" }, //ECG+
  'com.RuoG.Pixiu': { tp: 'timea', hx: 'hxpda', id: "com.RuoG.Pixiu.VIPYear" }, //貔貅记账
  'com.ideack.BusinessCard': { tp: 'timeb', hx: 'hxpda', id: "BusinessCardVipPerpetual" }, //名片夹
  'com.ideack.MagicAudio': { tp: 'timeb', hx: 'hxpdb', id: "MagicAudioPermanent" }, //音乐剪辑
  'DuChuangZhe': { tp: 'timea', hx: 'hxpda', id: "org.zrey.du.main" }, //独创者
  'PhotoWhite': { tp: 'timeb', hx: 'hxpda', id: "org.zrey.photowhite.flash_lifetime" },  //印白相册
  'Pure%20Tuber%20Pro': { tp: 'timeb', hx: 'hxpda', id: "lifetime" },  //PureTuberPro
  'FETreeVideoChange': { tp: 'timeb', hx: 'hxpda', id: "com.dj.videototext.forever" },  //视频转文字
  '%E5%B0%8F%E5%B0%8F%E7%9B%B8%E6%9C%BA%E5%A4%A7%E5%B8%88': { tp: 'timeb', hx: 'hxpda', id: "com.ai.merge.forever.vip" },  //乐颜
  'FoodIdentificationTool': { tp: 'timeb', hx: 'hxpda', id: "20002" },  //剂查查
  'com.qingcheng.seal.Seal': { tp: 'timeb', hx: 'hxpda', id: "com.qingcheng.seal.Seal.premium.forever" },  //印章制作
  'com.geekapp.VoiceTranslation': { tp: 'timeb', hx: 'hxpda', id: "VoiceTranslatorPerpetual" },  //出国翻译官
  'com.idealityapp.VideoEditing': { tp: 'timeb', hx: 'hxpda', id: "MagicVideo_Vip_Permanent" },  //魔影-视频剪辑
  'YinzhangMaster': { tp: 'timeb', hx: 'hxpda', id: "com.xiaoqi.seal.forever" },  //印章大师
  'com.cuilingshi.flipclock': { tp: 'timeb', hx: 'hxpda', id: "FlipClockProVersion" },  //翻页时钟
  'com.maine.aifill': { tp: 'timeb', hx: 'hxpda', id: "com.maine.aifill.unlimited" },  //AI FILL-智能填充.换衣/换背景
  'Graphionica': { tp: 'timea', hx: 'hxpda', id: "premium_year" },  //Graphionica
  'AIAssistant': { tp: 'timea', hx: 'hxpda', id: "AIchat_1w_7.99_trial" },  //AIAssistant
  'MonitorPlus': { tp: 'timeb', hx: 'hxpda', id: "com.unhonin.MonitorPlus.proversion" },  //Monitor+
  'MessageHold': { tp: 'timea', hx: 'hxpda', id: "com.messagehold.forever" },  //拦截盾
  'Guitar%20Gravitas': { tp: 'timea', hx: 'hxpda', id: "GuitarGravitasChordsScalesArpeggiosLessons" },  //GuitarGravitas
  'com.casttv.remotetv': { tp: 'timeb', hx: 'hxpda', id: "liftetime2" }, //TVRemote电视遥控器
  'WallpaperWidget': { tp: 'timea', hx: 'hxpda', id: "com.widget.theme.yearly.3dayfree" }, //壁纸主题(需试用)
  'ProREC': { tp: 'timea', hx: 'hxpda', id: "ProAudioCamera_Annual" }, //ProREC-相机
  'TypeOn%20Keyboard': { tp: 'timeb', hx: 'hxpda', id: "com.hanchongzan.book.vip" }, //TypeOn
  'PhotoCollagePro': { tp: 'timeb', hx: 'hxpda', id: "PHOTABLE_PREMIUM" }, //Photable-腹肌P图神器
  'com.alphamobiletech.bodyApp': { tp: 'timeb', hx: 'hxpda', id: "Bodyapp_Forever" }, //Bodyapp-身材修图软件
  'com.alphamobiletech.facey': { tp: 'timeb', hx: 'hxpda', id: "Facey_Forever" }, //Facey-专业彩妆P图神器
  'Packet': { tp: 'timeb', hx: 'hxpda', id: "com.aaaalab.nepacket.iap.full" }, //HTTPS抓包
  'AllMyBatteries': { tp: 'timeb', hx: 'hxpda', id: "AllMyBatteries_Ultimate" }, //AllMyBatteries-电池管家
  'VDIT': { tp: 'timeb', hx: 'hxpda', id: "me.imgbase.videoday.profeaturesLifetime" }, //VDIT-视频转换
  'CodeSnippet': { tp: 'timea', hx: 'hxpda', id: "it.beatcode.codesnippetpro.annualSubscription" }, //CodeSnippet
  'darkWeb': { tp: 'timea', hx: 'hxpda', id: "dforce_unlock_all_functions" }, //DForce-Safari扩展
  'BookReader': { tp: 'timea', hx: 'hxpda', id: "com.reader.1year" }, //阅读器-小说阅读器
  'BeatStation': { tp: 'timea', hx: 'hxpda', id: "BS_Pro_Yearly" }, //BeatStation-节奏工作站
  'FastPlayer': { tp: 'timea', hx: 'hxpda', id: "VideoPlayer_ProVersion" }, //万能播放器
  'SimpleNotation': { tp: 'timeb', hx: 'hxpda', id: "com.xinlin.notation.once" }, //简谱大师
  'ChordMaster': { tp: 'timeb', hx: 'hxpda', id: "com.chordMaster.once" }, //MusicTotor-识谱大师
  'Xfuse': { tp: 'timeb', hx: 'hxpda', id: "com.xfuse.ProVision" }, //磁力宅播放器
  'com.BertonYc.ScannerOCR': { tp: 'timeb', hx: 'hxpda', id: "Scanner_Subscibe_Permanent" }, //万能扫描王
  'HRV': { hx: 'hxpdc', id: "com.stress.test.record.yearly" },  //解压小橘子(需试用)
  'iVCam': { tp: 'timeb', hx: 'hxpda', id: "ivcam.full" },//iVCam-电脑摄像头
  'RBrowser': { tp: 'timea', hx: 'hxpda', id: "com.mm.RBroswer.product11" }, //R浏览器(需试用)
  'Filterra': { tp: 'timeb', hx: 'hxpda', id: "com.filterra.wtonetimepurchase" },//Filterra-照片编辑器
  'MOLDIV': { tp: 'timeb', hx: 'hxpda', id: "com.jellybus.Moldiv.IAP.PRO7999" },//MOLDIV-视频/照片编辑
  'PICSPLAY': { tp: 'timea', hx: 'hxpda', id: "com.jellybus.PicsPlay2.IAP.PRO5999" },//PICSPLAY-照片编辑
  'Rookie': { tp: 'timea', hx: 'hxpda', id: "com.jellybus.Rookie.IAP.PRO5999" },//RKCAM-照片编辑
  'MoneyWiz': { tp: 'timea', hx: 'hxpda', id: "com.moneywiz.personalfinance.1year" }, //MoneyWiz-个人财务
  'qxzs': { tp: 'timeb', hx: 'hxpda', id: "yongjiu" },//心率广播
  'Overdrop': { tp: 'timeb', hx: 'hxpda', id: "com.weather.overdrop.forever" }, //Overdrop-天气预报
  'Boom': { tp: 'timeb', hx: 'hxpda', id: "com.globaldelight.iBoom.LifetimeDiscountPack" }, //Boom-感受音乐
  'PDFReaderPro%20Free': { tp: 'timeb', hx: 'hxpda', id: "com.pdfreaderpro.free.member.all_access_pack_permanent_license.001" }, //PDFReaderProFree
  'VideoHelper': { tp: 'timeb', hx: 'hxpda', id: "vip_service" }, //媒关系
  'Digital%20Planner': { tp: 'timea', hx: 'hxpda', id: "com.softwings.DigitalPlanner.1year" }, //电子手帐
  'SuperMandarin': { tp: 'timea', hx: 'hxpda', id: "pth_vip_year" }, //普通话水平测试
  'SuperQuestion': { tp: 'timea', hx: 'hxpda', id: "qtzs_vip_year" }, //真题全刷
  'SuperElves': { tp: 'timeb', hx: 'hxpda', id: "com.SuperElves.Answer.Forever" }, //答案精灵
  'SuperDriving': { tp: 'timeb', hx: 'hxpda', id: "jiakao_vip_forever" }, //驾考学典
  'Pollykann': { tp: 'timeb', hx: 'hxpda', id: "vip.forever.pollykann" }, //小鹦看看
  'JCCalendar': { tp: 'timeb', hx: 'hxpda', id: "com.sjc.calendar.vip.lifelong" }, //简约日历
  'com.yanxia.ChsMedical': { tp: 'timeb', hx: 'hxpda', id: "VIPUser" }, //中医精华
  'SuperPointer': { tp: 'timeb', hx: 'hxpda', id: "com.SuperPointer.Location.Forever" }, //海拔指南针
  'SnakeReader': { tp: 'timea', hx: 'hxpda', id: "com.lyran.snakescanner.premium18" }, //开卷阅读
  'FourthPPT': { tp: 'timeb', hx: 'hxpda', id: "com.FourthPPT.Mobile.Forever" }, //PPT制作软件
  'OneExtractor': { tp: 'timeb', hx: 'hxpda', id: "com.OneExtractor.Video.Forever" }, //视频提取器
  'com.Colin.Colors': { tp: 'timea', hx: 'hxpda', id: "com.colin.colors.annualVIP" }, //搜图
  'PhotosSorter': { tp: 'timeb', hx: 'hxpda', id: "sorter.pro.ipa" }, //Sorter-相册整理
  'intolive': { tp: 'timea', hx: 'hxpda', id: "me.imgbase.intolive.proSubYearly" }, //intolive-实况壁纸制作器
  'MyAlbum': { tp: 'timeb', hx: 'hxpda', id: "com.colin.myalbum.isUpgradeVip" }, //Cleaner-照片管理
  'VideoEditor': { tp: 'timeb', hx: 'hxpda', id: "com.god.videohand.alwaysowner" }, //VideoShot
  'ShotOn': { tp: 'timeb', hx: 'hxpda', id: "com.colin.shoton.forevervip" }, //ShotOn
  'TimeCut': { tp: 'timea', hx: 'hxpda', id: "com.floatcamellia.hfrslowmotion.forevervip" },  //TimeCut
  'com.floatcamellia.motiok': { tp: 'timea', hx: 'hxpda', id: "com.floatcamellia.motiok.vipforever" },  //Hype_Text-AE特效片制作
  'GreetingScanner': { tp: 'timea', hx: 'hxpda', id: "com.alphaplus.greetingscaner.w.b" },  //扫描识别王
  'FancyCamPlus': { tp: 'timea', hx: 'hxpda', id: "com.alphaplus.fancycam.year.198" },  //悦颜相机
  'Again': { tp: 'timeb', hx: 'hxpda', id: "com.owen.again.profession" },  //Again-稍后阅读器
  'com.damon.dubbing': { tp: 'timea', hx: 'hxpda', id: "com.damon.dubbing.vip12" },  //有声英语绘本
  'ZHUBEN': { tp: 'timea', hx: 'hxpda', id: "com.xiaoyu.yue" },  //有声英语绘本
  'XIAOTangHomeParadise': { tp: 'timea', hx: 'hxpda', id: "com.yuee.mo2" },  //鸿海幼儿启蒙
  'film': { tp: 'timea', hx: 'hxpda', id: "pro_auto_subscribe_year_ovs" },  //胶卷相机
  'Muza': { tp: 'timea', hx: 'hxpda', id: "com.appmuza.premium_year" },  //Muza-修图APP
  'StandbyWidget': { tp: 'timed', hx: 'hxpda', id: "com.standby.idream.year.68", ids: "standbyus.nonconsume.missingyou" },  //StandBy_Us-情侣定位
  'Mango6Minute': { tp: 'timea', hx: 'hxpda', id: "576170870" },  //6分钟英语
  'Photo%20Cutout': { tp: 'timea', hx: 'hxpda', id: "com.icepine.allyear" },  //轻松扣图
  'WasteCat': { tp: 'timeb', hx: 'hxpda', id: "dev.sanjin.WasteCat.PermanentVip" },  //垃圾贪吃猫
  'MeowTalk': { tp: 'timea', hx: 'hxpda', id: "meowtalk.month.basic.autorenewable.subscription" },  //喵说
  'habitdot': { tp: 'timeb', hx: 'hxpda', id: "habitdots_pro_forever" },  //习惯点点
  'stretchworkout': { tp: 'timea', hx: 'hxpda', id: "com.abishkking.premiumYearStretch" },  //拉伸运动
  'com.uzstudio.avenuecast.ios': { tp: 'timeb', hx: 'hxpda', id: "1001" },  //凡视知音
  'CongZhenBaZi': { tp: 'timeb', hx: 'hxpda', id: "vip_forever_78" },  //八字排盘-从真版
  'CongZhenQiMen': { tp: 'timea', hx: 'hxpda', id: "cn.congzhen.CongZhenQiMen.yearlyplan" },  //奇门遁甲
  'ProFit': { tp: 'timea', hx: 'hxpda', id: "com.maxty.gofitness.yearlyplan" },  //ProFit锻炼计划
  'GPSMaker': { tp: 'timea', hx: 'hxpda', id: "theodolite_vip_year" },  //指南针定位
  'Smoke': { tp: 'timea', hx: 'hxpda', id: "smoke19870727" },  //今日香烟
  'AppAlarmIOS': { tp: 'timea', hx: 'hxpda', id: "alarm.me.vip.year.tier1" },  //Me+
  'Tinglee': { tp: 'timea', hx: 'hxpdb', id: "vip.forever.tinglee" },  //英语听听
  'NoteKeys': { tp: 'timea', hx: 'hxpda', id: "notekeys_access_weekly" },  //五线谱
  'SheetMusicPro': { tp: 'timea', hx: 'hxpda', id: "sheetmusicpro.yearwithtrial" },  //乐谱吧
  'ProtractorEdge': { tp: 'timea', hx: 'hxpda', id: "ProtracatorEdge.PremiumAccess" },  //量角器
  'Piano%20Plus': { tp: 'timea', hx: 'hxpda', id: "kn_access_weekly" },  //Piano Plus
  'Notation%20Pad': { tp: 'timea', hx: 'hxpda', id: "np_access_weekly" },  //Notation Pad
  'Guitar%20Notation': { tp: 'timea', hx: 'hxpda', id: "gn_access_weekly" },  //Guitar Notation
  'Piano%20Fantasy': { tp: 'timea', hx: 'hxpda', id: "com.lotuz.PianoFantasy.weekwithtrail" },  //钢琴幻想
  'Piano%20Rush': { tp: 'timea', hx: 'hxpda', id: "com.lotuz.PianoPro.weekwithtrail" },  //钢琴大师
  'com.richads.saucyart': { tp: 'timea', hx: 'hxpda', id: "com.richads.saucyart.sub.quarterly_29.99" },  //Perky
  'SurveyorPro': { tp: 'timea', hx: 'hxpda', id: "com.celiangyuan.SurveyorPro.OneYear" },  //测量员Pro
  'com.ydatong.dingdone': { tp: 'timeb', hx: 'hxpda', id: "com.ydatong.dingdone.vip.forever" },  //叮当代办
  'Dial': { tp: 'timea', hx: 'hxpda', id: "2104" },  //T9拨号
  'qxwp%20copy': { tp: 'timed', hx: 'hxpda', id: "com.chowjoe.wp2free.year.pro", ids: "com.chowjoe.wp2free.coin.70" },  //壁纸
  'LingLongShouZ': { tp: 'timea', hx: 'hxpda', id: "zhenwushouzhangQuarterlyPlus" },  //Cute手帐软件
  'MediaEditor': { tp: 'timeb', hx: 'hxpda', id: "alwaysowner" },  //剪影(需试用)
  'com.gostraight.smallAccountBook': { tp: 'timeb', hx: 'hxpda', id: "ForeverVIPPayment" },  //iCost记账(需要购买)
  'ZJTBiaoGe': { tp: 'timea', hx: 'hxpda', id: "zhangjt.biaoge.monthvip" },  //表格手机版
  'MiniMouse': { tp: 'timea', hx: 'hxpda', id: "minimouse_vip_1year" },  //MiniMouse
  'Paste%20Keyboard': { tp: 'timea', hx: 'hxpda', id: "com.keyboard.1yetr" },  //复制和粘贴键盘
  'EWA': { tp: 'timea', hx: 'hxpda', id: "com.ewa.renewable.subscription.year8" },  //EWA-学习外语
  'BuBuSZ': { tp: 'timea', hx: 'hxpda', id: "quaVersion" },  //BuBu手帐
  'com.icandiapps.nightsky': { tp: 'timea', hx: 'hxpda', id: "com.icandiapps.ns4.annual" },  //星空
  'Wallpapers': { tp: 'timea', hx: 'hxpda', id: "wallpaperworld.subscription.yearly.12.notrial" },  //Wallpaper Tree壁纸
  'com.yumiteam.Kuki.ID': { tp: 'timea', hx: 'hxpda', id: "com.yumiteam.Kuki.ID.2" },  //PicsLeap-美飞
  'com.quangtm193.picpro': { tp: 'timea', hx: 'hxpda', id: "com.quangtm193.picpro1year" },  //PicPro-人工智能照片编辑器
  'Storybeat': { tp: 'timea', hx: 'hxpda', id: "yearly_1" },  //Storybeat
  'SmartGym': { tp: 'timea', hx: 'hxpda', id: "com.smartgymapp.smartgym.premiumuserworkoutsyearly" },  //SmartGym
  'Prookie': { tp: 'timea', hx: 'hxpda', id: "prookie.month.withtrial.0615" },  //AI灵绘
  'BodyTune': { tp: 'timea', hx: 'hxpda', id: "Bodypro1" },  //BodyTune-瘦身相机
  'killer.sudoku.free.brain.puzzle': { tp: 'timea', hx: 'hxpda', id: "ks.i.iap.premium" },  //杀手数独
  'sudoku.puzzle.free.game.brain': { tp: 'timea', hx: 'hxpda', id: "sudoku.i.sub.vvip.p1y" },  //数独
  'One%20Markdown': { tp: 'timeb', hx: 'hxpda', id: "10012" },  //One Markdown
  'MWeb%20iOS': { tp: 'timeb', hx: 'hxpda', id: "10001" },  //MWeb-编辑器/笔记/发布
  'NYMF': { tp: 'timea', hx: 'hxpda', id: "com.nymf.app.premium_year" },  //Nymf艺术照片
  'com.lockwidt.cn': { tp: 'timea', hx: 'hxpda', id: "com.lockwidt.cn.member" },  //壁纸16
  'Utsuki': { tp: 'timea', hx: 'hxpda', id: "KameePro" },  //梦见账本
  'one%20sec': { tp: 'timea', hx: 'hxpda', id: "wtf.riedel.one_sec.pro.annual.individual" },  //one sec-番茄钟
  'com.instagridpost.rsigp': { tp: 'timea', hx: 'hxpda', id: "com.GridPost.oneyearplus" },  //九宫格切图
  'com.skysoft.removalfree': { tp: 'timea', hx: 'hxpda', id: "com.skysoft.removalfree.discount.unlimitedaccess" },  //神奇消除笔-图片消除
  'MGhostLens': { tp: 'timea', hx: 'hxpda', id: "com.ghostlens.premium1month" },  //魔鬼相机
  'Luminous': { tp: 'timea', hx: 'hxpda', id: "com.spacemushrooms.weekly" },  //光影修图
  'PerfectImage': { tp: 'timea', hx: 'hxpda', id: "Perfect_Image_VIP_Yearly" },  //完美影像(需试用)
  'moment': { tp: 'timea', hx: 'hxpda', id: "PYJMoment2" },  //片羽集(需试用)
  'HiddenBox': { tp: 'timec', hx: 'hxpdb', version: "1" },//我的书橱
  'Synthesizer': { tp: 'timea', hx: 'hxpda', id: "com.qingxiu.synthesizer.mon" },  //语音合成
  'ContractMaster': { tp: 'timea', hx: 'hxpda', id: "com.qingxiu.contracts.monthly" },  //印象全能王
  'MyDiary': { tp: 'timea', hx: 'hxpda', id: "diary.yearly.vip.1029" },  //我的日记
  'Translator': { tp: 'timea', hx: 'hxpda', id: "trans_sub_week" },  //翻译家
  'Idea': { tp: 'timea', hx: 'hxpda', id: "top.ideaapp.ideaiOS.membership.oneyear" },  //灵感(需试用)
  'ZeroTuImg': { tp: 'timea', hx: 'hxpda', id: "ZeroTuImgPlus" },  //Zero壁纸
  'com.traveltao.ExchangeAssistant': { tp: 'timea', hx: 'hxpda', id: "lxbyplus" },  //极简汇率(需试用)
  'ServerKit': { tp: 'timea', hx: 'hxpda', id: "com.serverkit.subscription.year.a" },  //服务器助手
  'RawPlus': { tp: 'timea', hx: 'hxpda', id: "com.dynamicappdesign.rawplus.yearlysubscription" },  //Raw相机
  'OrderGenerator': { tp: 'timeb', hx: 'hxpda', id: "oder_pay_forever" },  //订单生成
  'GenerateAllOrdersTool': { tp: 'timea', hx: 'hxpda', id: "Order_Vip_010" },  //订单生成器(需试用)
  'MoMoShouZhang': { tp: 'timea', hx: 'hxpda', id: "shunchangshouzhangQuarterlyPlus" },  //卡卡手账(需试用)
  'Mindkit': { tp: 'timeb', hx: 'hxpda', id: "mindkit_permanently" },  //Mindkit
  'Miary': { tp: 'timeb', hx: 'hxpda', id: "lifetime_sub" },  //Miary-记录日记
  'BingQiTools': { tp: 'timea', hx: 'hxpda', id: "bingqi_e2" },  //猫狗翻译
  'AnyDown': { tp: 'timeb', hx: 'hxpda', id: "com.xiaoqi.down.forever" },  //AnyDown-下载神器
  'Reader': { tp: 'timeb', hx: 'hxpda', id: "com.xiaoqi.reader.forever" },  //爱阅读-TXT阅读器
  'com.bestmusicvideo.formmaster': { tp: 'timea', hx: 'hxpda', id: "com.form.1yearvip" },  //表格大师
  'ExcelSpreadSheetsWPS': { tp: 'timea', hx: 'hxpda', id: "com.turbocms.SimpleSpreadSheet.viponeyear" },  //简易表格(需试用)
  'XinQingRiJi': { tp: 'timea', hx: 'hxpda', id: "zhiwenshouzhangQuarterlyPlus" },  //猫咪手帐(需试用)
  'Nutrilio': { tp: 'timea', hx: 'hxpda', id: "net.nutrilio.one_year_plus" },  //Nutrilio
  'AIHeader': { tp: 'timea', hx: 'hxpda', id: "com.ai.avatar.maker.month.3dayfree" },  //AI头像馆
  'MoodTracker': { tp: 'timeb', hx: 'hxpda', id: "co.vulcanlabs.moodtracker.lifetime2" },  //ChatSmith(美区)
  'com.dandelion.Routine': { tp: 'timeb', hx: 'hxpda', id: "membership" },  //小日常
  'YSBrowser': { tp: 'timeb', hx: 'hxpda', id: "com.ys.pro" },  //亚瑟浏览器
  'org.zrey.metion': { tp: 'timed', hx: 'hxpda', id: "org.zrey.metion.pro", ids: "org.zrey.metion.main" },  //Metion-基础+Pro
  'ZenJournal': { tp: 'timea', hx: 'hxpda', id: "zen_pro" },  //禅记
  'com.visualmidi.app.perfectpiano.Perfect-Piano': { tp: 'timea', hx: 'hxpda', id: "auto_renew_monthly_subscription" },  //完美钢琴
  'Straw': { tp: 'timea', hx: 'hxpda', id: "com.1year.eyedropper" },  //吸管Pro-取色
  'vibee': { tp: 'timea', hx: 'hxpda', id: "com.vibee.year.bigchampagne" },  //vibee-氛围歌单小组件
  'DrumPads': { tp: 'timeb', hx: 'hxpda', id: "com.gismart.drumpads.pro_lifetime_30" },  //BeatMakerGo-打碟机/打击垫/DJ鼓机
  'WaterMaskCamera': { tp: 'timea', hx: 'hxpda', id: "com.camera.watermark.yearly.3dayfree" },  //徕卡水印相机
  'SymbolKeyboard': { tp: 'timeb', hx: 'hxpda', id: "fronts.keyboard.singingfish.one" },  //Fonts花样字体
  'com.kuaijiezhilingdashi.appname': { tp: 'timea', hx: 'hxpda', id: "com.othermaster.yearlyvip" },  //快捷指令库
  'LogInput': { tp: 'timea', hx: 'hxpda', id: "com.logcg.loginput" },  //落格输入法
  'HandNote': { tp: 'timeb', hx: 'hxpda', id: "permanent_membership" },  //千本笔记
  'Kilonotes': { tp: 'timea', hx: 'hxpda', id: "kipa_kilonotes_quarter_subscription" },  //千本笔记
  'YiJianKouTu': { tp: 'timea', hx: 'hxpda', id: "XiChaoYiJianKouTuPlus" },  //一键抠图
  'FileArtifact': { tp: 'timeb', hx: 'hxpda', id: "com.shengzhou.fileartifact.permanent" },  //文晓生
  'Wext': { tp: 'timeb', hx: 'hxpda', id: "com.lmf.wext.life" },  //万源阅读
  'ColorCapture': { tp: 'timeb', hx: 'hxpda', id: "10001" },  //色采
  'xTerminal': { tp: 'timea', hx: 'hxpda', id: "xterminal.pro2" },  //xTerminal
  'Fotoz': { tp: 'timeb', hx: 'hxpda', id: "com.kiddy.fotoz.ipa.pro" },  //Fotoz - 图片一键下载
  'TheLastFilm': { tp: 'timea', hx: 'hxpda', id: "Filmroll_Pro_1Year" },  //最后一卷胶片(需订阅一次)
  'Motivation': { tp: 'timea', hx: 'hxpda', id: "com.monkeytaps.motivation.premium.year3" },  //Motivation
  'io.sumi.GridDiary2': { tp: 'timea', hx: 'hxpda', id: "io.sumi.GridDiary.pro.annually" },  //格志
  'com.leapfitness.fasting': { tp: 'timea', hx: 'hxpda', id: "com.leapfitness.fasting.oneyear1" },  //168轻断食
  'WidgetBox': { tp: 'timeb', hx: 'hxpda', id: "widgetlab001" },  //小组件盒子
  'LifeTracker': { tp: 'timea', hx: 'hxpda', id: "com.dk.lifetracker.yearplan" },  //Becord生活记录
  'imgplay': { tp: 'timea', hx: 'hxpda', id: "me.imgbase.imgplay.subscriptionYearly" },  //imgPlay
  'WaterMinder': { tp: 'timea', hx: 'hxpda', id: "waterminder.premiumYearly" },  //WaterMinder喝水APP
  'HashPhotos': { tp: 'timeb', hx: 'hxpda', id: "com.kobaltlab.HashPhotos.iap.proLifetime" },  //HashPhotos
  'SilProject': { tp: 'timea', hx: 'hxpda', id: "com.sm.Alina.Pro" },  //Alina米克锁屏—
  'com.chenxi.shanniankapian': { tp: 'timea', hx: 'hxpda', id: "com.chenxi.shannian.superNian" },  //闪念
  'com.risingcabbage.pro.camera': { tp: 'timea', hx: 'hxpda', id: "com.risingcabbage.pro.camera.yearlysubscription" },  //ReLens相机
  'co.bazaart.patternator': { tp: 'timea', hx: 'hxpda', id: "Patternator_Lock_Screen_Monthly" },  //拍特内头
  'cn.linfei.SimpleRecorder': { tp: 'timea', hx: 'hxpda', id: "cn.linfei.SimpleRecorder.Plus" },  //录音机
  'com.maliquankai.appdesign': { tp: 'timec', hx: 'hxpdb', version: "1.5.8" },  //PutApp-应用收集
  'BestColor': { tp: 'timea', hx: 'hxpda', id: "com.bestColor.tool.month" },  //小红图
  'com.decibel.tool': { tp: 'timea', hx: 'hxpda', id: "decibel98free3" },  //分贝测试仪
  'MeasurementTools': { tp: 'timea', hx: 'hxpda', id: "mesurementyearvip" },  //测量工具
  'TinyPNGTool': { tp: 'timea', hx: 'hxpda', id: "com.tinypngtool.tool.weekvip" },  //TinyPNG
  'IconChange': { tp: 'timea', hx: 'hxpda', id: "iconeryearvip" },  //iconser图标更换
  'com.floatcamellia.motionninja': { tp: 'timea', hx: 'hxpda', id: "com.floatcamellia.motionninja.yearlyvip" },  //MotionNinja
  'com.iuuapp.audiomaker': { tp: 'timed', hx: 'hxpda', id: "com.iuuapp.audiomaker.cloud.year", ids: "com.iuuapp.audiomaker.removeads" },  //音频剪辑
  'com.biggerlens.photoretouch': { tp: 'timeb', hx: 'hxpda', id: "com.photoretouch.SVIP" },  //PhotoRetouch消除笔P图
  'com.macpaw.iosgemini': { tp: 'timea', hx: 'hxpda', id: "com.macpaw.iosgemini.month.trial" },  //GeminiPhotos
  'com.mematom.ios': { tp: 'timea', hx: 'hxpda', id: "MMYear" },  //年轮3
  'com.LuoWei.aDiary': { tp: 'timea', hx: 'hxpda', id: "com.LuoWei.aDiary.yearly0" },  //aDiary-待办日记本
  'com.zerone.hidesktop': { tp: 'timeb', hx: 'hxpda', id: "com.zerone.hidesktop.forever" },  //iScreen-桌面小组件主题美化
  'MagicWidget': { tp: 'timeb', hx: 'hxpda', id: "cf__forever_0_4.7.1" },  //ColorfulWidget—小组件
  'com.tasmanic.capture': { tp: 'timea', hx: 'hxpda', id: "CTPCAPTUREYEARLY" },  //3DScanner-绘制/测量平面图
  'com.readdle.CalendarsLite': { tp: 'timea', hx: 'hxpda', id: "com.readdle.CalendarsLite.subscription.year20trial7" },  //Calendars-日历/计划
  'com.readdle.ReaddleDocsIPad': { tp: 'timea', hx: 'hxpda', id: "com.readdle.ReaddleDocsIPad.subscription.month10_allusers" },  //Documents
  'com.1ps.lovetalk': { tp: 'timea', hx: 'hxpda', id: "com.1ps.lovetalk.normal.weekly" },  //高级恋爱话术
  'tech.miidii.MDClock': { tp: 'timeb', hx: 'hxpda', id: "tech.miidii.MDClock.pro" },  //谜底时钟
  'com.floatcamellia.prettyup': { tp: 'timeb', hx: 'hxpda', id: "com.floatcamellia.prettyup.onetimepurchase" },  //PrettyUp视频P图
  'com.zijayrate.analogcam': { tp: 'timea', hx: 'hxpda', id: "com.zijayrate.analogcam.vipforever10" },  //oldroll复古相机
  'net.daylio.Daylio': { tp: 'timea', hx: 'hxpda', id: "net.daylio.one_year_pro.offer_initial" },  //Daylio-日记
  'com.palmmob.pdfios': { tp: 'timea', hx: 'hxpda', id: "com.palmmob.pdfios.168" },  //图片PDF转换器
  'com.palmmob.scanner2ios': { tp: 'timea', hx: 'hxpda', id: "com.palmmob.scanner2ios.396" },  //文字扫描
  'com.palmmob.officeios': { tp: 'timea', hx: 'hxpda', id: "com.palmmob.officeios.188" },  //文档表格编辑
  'com.palmmob.recorder': { tp: 'timea', hx: 'hxpda', id: "com.palmmob.recorder.198" },  //录音转文字
  'com.7color.newclean': { tp: 'timea', hx: 'hxpda', id: "com.cleaner.salesyear" },  //手机清理
  'Habbit': { tp: 'timea', hx: 'hxpda', id: "HabitUpYearly" },  //习惯清单
  'com.dbmeterpro.dB-Meter-Free': { tp: 'timea', hx: 'hxpda', id: "com.dbmeterpro.premiumModeSubscriptionWithTrial" },  //dBMeter-分贝仪(专业版)
  'com.vstudio.newpuzzle': { tp: 'timea', hx: 'hxpda', id: "com.vstudio.newpuzzle.yearlyVipFreetrail.15_99" },  //拼图酱
  'com.ziheng.OneBox': { tp: 'timeb', hx: 'hxpda', id: "com.ziheng.OneBox" },  //Pandora管理订阅
  'ChickAlarmClock': { tp: 'timea', hx: 'hxpda', id: "com.ChickFocus.ChickFocus.yearly_2023_promo" },  //小鸡专注
  'com.CalculatorForiPad.InternetRocks': { tp: 'timea', hx: 'hxpda', id: "co.airapps.calculator.year" },  //计算器Air
  'SuperWidget': { tp: 'timea', hx: 'hxpda', id: "com.focoslive" },  //PandaWidget小组件
  'Picsew': { tp: 'timeb', hx: 'hxpdb', id: "com.sugarmo.ScrollClip.pro"},  //Picsew截长图3.9.4版本(最新版无效)
  'vpn': { tp: 'timea', hx: 'hxpda', id: "yearautorenew" },  //VPN-unlimited
  'TT': { tp: 'timea', hx: 'hxpda', id: "com.55panda.hicalculator.year_sub" },  //TT_私密相册管家
  'Focos': { tp: 'timea', hx: 'hxpda', id: "com.focos.1w_t4_1w" },  //Focos
  'ProKnockOut': { tp: 'timed', hx: 'hxpda', id: "com.knockout.SVIP.50off", ids: "com.knockout.AISVIP.yearly.upgrade" },  //ProKnockOut
  'com.teadoku.flashnote': { tp: 'timea', hx: 'hxpda', id: "pro_ios_ipad_mac" }  //AnkiNote
};

// ===== 自动App分组 =====
const autoMap = {
  year: [
    'com.internet-rocks',  //Air Apps System
    'co.airapps'  //Air Apps System
  ],
  yearly: [
    'com.pocket'  //NetPocket Co
  ],
  yearlysubscription: [
    'solutions.wzp'  //Air Apps System 
  ],
  lifetime: [
    'co.vulcanlabs'  //Vulcan Labs Company Limited
  ],
  forever: [
    
  ]
};

// ===== 需要expires为null的App =====
const nullExpireApps = [];

// ===== 购买时间 =====
const purchase = "2025-09-09T09:09:09Z";
// ===== 到期时间 =====
const expiration = "2099-09-09T09:09:09Z";

// ===== 自动生成订阅ID =====
const AutoID = {
  year: (bid) => `${bid}.year`,
  yearly: (bid) => `${bid}.yearly`,
  yearlysubscription: (bid) => `${bid}.yearlysubscription`,
  lifetime: (bid) => `${bid}.lifetime`,
  forever: (bid) => `${bid}.Forever`
};

// ===== 自动注入list =====
for (const type in autoMap) {
  autoMap[type].forEach(key => {
    if (!list[key]) {
      const isForever = ['lifetime', 'forever'].includes(type);
      list[key] = {
        tp: isForever ? 'timeb' : 'timea',
        hx: 'hxpda',
        auto: true,
        autoType: type
      };
    }
  });
}

// ===== 工具函数 =====
function rand(len) {
  let s = "";
  for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10);
  return s;
}

function format(time) {
  return time.toISOString().replace(/\.\d{3}Z$/, 'Z').replace('T', ' ').replace('Z', ' Etc/GMT');
}

function formatPST(time) {
  let pst = new Date(time.getTime() - 7 * 3600 * 1000);
  return pst.toISOString().replace(/\.\d{3}Z$/, 'Z').replace('T', ' ').replace('Z', ' America/Los_Angeles');
}

// ===== 时间初始化 =====
let now = new Date(purchase);
let start = new Date(now.getTime() - 60 * 1000);
let expire = new Date(now.getTime() + 3650 * 86400000);
let fixedExpire = new Date(expiration);

// ===== transaction id =====
let transactionid = "49000" + rand(10);

// ===== 构建订阅 =====
;var encode_version = 'jsjiami.com.v5', atmbi = '__0x1342b6',  __0x1342b6=['5oO95ZSY5oKq772J5beN5pG/5L+w5ou95Yq88K+fqvChna3woJy2w6jljIDlvb3njbbjgZvlipbkuLTpoqnpgLbDuVvCol5HwpcNwobCskzCvRzClFUEw6LDsMOEwpbDu8K7wrU=','KcKSGw==','wr/DvknDgyLDu8K+w5MPw5IiW8OHwqk=','C13CpMKScg==','XsOODkrDhg==','w5N7wrolQA==','J8KxWsKtdA==','w60lbHLCoVHCuMK7wqo=','wpzCrcKcwrDDpg==','dMKSQhYs','IFDCl8KBejwlSMKlw6Nowq4=','NVIpE3/CqcKWYDBjU2ENwpjDt8Ke','X8KhEcO2Kw==','wrLDu3TDqTI=','XHBYKlw=','BcKDDsKeWcKAwps=','wpcYw5lbIA==','EUYjLsKHLcON','wqYPUsKDw7U=','dcKoFsOyAz3DvQ==','w7drw5nDrMKp','w4DCjGBMbg==','wp7DrxjCucKP','w7LCvX/DpcOs','woMlw4plNQ==','w6HCuW7CrG0=','w4HCiHhrYsOuwrE=','wrjCvV43w6c=','fsOCw5J4EQ==','w6AsXl7CgQ==','w55kwpQiVA==','woxGw63Dsy0=','TcONKl3DjA==','S8OYw5g1NA==','w6cKwokgw4NFYQ==','wqPDvD/CvMKuw7MQwrHDnzXDkHHCum/DoTQ=','wr5Iw6fDhCY=','LMKYwr7DqS4=','wrLDu8KVwoU=','w70HeGPCoQ==','w7MOwrEzw6I=','wpRoFnbDjS7DhA==','w6PCjVDCmkw=','wrtRwoc=','YwR7NcKV','TsO7VsKMPw==','WcKcLMO/Gw==','IcKTD8Kyfw==','CMK2SsKjdw==','wrLDqFfDvirDu8Ky','wo3DmkLDmAU=','wqTDv1fDmBQ=','w7QGwpARw4s=','I1ktN2s=','wqfDqEDDjyrDpsKjwqI=','wpPCgMO6w7QW','wpnCkSzDt8KV','wrtfI0zDng==','woLDrMKxwpMp','w5XClyl/','wpTCt8KrwrvDgcK2wqPCgQ==','JcKRU8K6w7g=','wqlRwpJFwoE=','wqHDpE7Djyc=','UcKQdTATwqzCpMKPfMK2w7VcF8O1EFk=','JEM0H2k=','w7pMwqUjZA==','w75VwqEidsKbwrBtOEPCn8K6OggKaCN0Yw==','w5DCnUvChmrCscKTBMOKUVpcMTzCiMOhdQJPZA==','w4nClkbCjnbCu8KRKA==','cEt7w6HDkw==','wrTDoSzCsMK1w6YX','wojCk8Kswoomw7M=','ZMO0EXfDgQ==','N08tLmTCocKA','W8Kgw6E4dsOwIA==','wqxyOCfDtw==','elJSClbCgsOYETw=','wrXDr8KNwpkV','w4fCkzZ4wpg=','Ik86H2TCvMKR','SA5DBsKYcg==','wqTCvcO8w4QUw59h','w7zDpXYgTMOGw7PCn0YiBhDClAnDoMKLwoBIMg==','a0dqw7HDhMOb','ecO8SsKZ','WGJjLHfCs8O/','wqlgw43DtzxWw783w5sWw5PDscOrwqzDsz4yw4nDl1FwCzxDw47Dg8KdLw==','w75bwrI='];(function(_0x281468,_0x29d0a0){var _0x8e2208=function(_0x216004){while(--_0x216004){_0x281468['push'](_0x281468['shift']());}};_0x8e2208(++_0x29d0a0);}(__0x1342b6,0x115));var _0x19f4=function(_0x77f227,_0x35281b){_0x77f227=_0x77f227-0x0;var _0x106f9=__0x1342b6[_0x77f227];if(_0x19f4['initialized']===undefined){(function(){var _0x564642=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x5321cc='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x564642['atob']||(_0x564642['atob']=function(_0x5460f3){var _0x16e99b=String(_0x5460f3)['replace'](/=+$/,'');for(var _0x451ac7=0x0,_0xc2cb44,_0x525488,_0x13e0f4=0x0,_0x278d3c='';_0x525488=_0x16e99b['charAt'](_0x13e0f4++);~_0x525488&&(_0xc2cb44=_0x451ac7%0x4?_0xc2cb44*0x40+_0x525488:_0x525488,_0x451ac7++%0x4)?_0x278d3c+=String['fromCharCode'](0xff&_0xc2cb44>>(-0x2*_0x451ac7&0x6)):0x0){_0x525488=_0x5321cc['indexOf'](_0x525488);}return _0x278d3c;});}());var _0x351aed=function(_0xfd75bc,_0x39292b){var _0x5005f1=[],_0x301119=0x0,_0x27ba11,_0x4af44f='',_0x2c2f46='';_0xfd75bc=atob(_0xfd75bc);for(var _0x128cd4=0x0,_0x4c0542=_0xfd75bc['length'];_0x128cd4<_0x4c0542;_0x128cd4++){_0x2c2f46+='%'+('00'+_0xfd75bc['charCodeAt'](_0x128cd4)['toString'](0x10))['slice'](-0x2);}_0xfd75bc=decodeURIComponent(_0x2c2f46);for(var _0x29fb97=0x0;_0x29fb97<0x100;_0x29fb97++){_0x5005f1[_0x29fb97]=_0x29fb97;}for(_0x29fb97=0x0;_0x29fb97<0x100;_0x29fb97++){_0x301119=(_0x301119+_0x5005f1[_0x29fb97]+_0x39292b['charCodeAt'](_0x29fb97%_0x39292b['length']))%0x100;_0x27ba11=_0x5005f1[_0x29fb97];_0x5005f1[_0x29fb97]=_0x5005f1[_0x301119];_0x5005f1[_0x301119]=_0x27ba11;}_0x29fb97=0x0;_0x301119=0x0;for(var _0x329f57=0x0;_0x329f57<_0xfd75bc['length'];_0x329f57++){_0x29fb97=(_0x29fb97+0x1)%0x100;_0x301119=(_0x301119+_0x5005f1[_0x29fb97])%0x100;_0x27ba11=_0x5005f1[_0x29fb97];_0x5005f1[_0x29fb97]=_0x5005f1[_0x301119];_0x5005f1[_0x301119]=_0x27ba11;_0x4af44f+=String['fromCharCode'](_0xfd75bc['charCodeAt'](_0x329f57)^_0x5005f1[(_0x5005f1[_0x29fb97]+_0x5005f1[_0x301119])%0x100]);}return _0x4af44f;};_0x19f4['rc4']=_0x351aed;_0x19f4['data']={};_0x19f4['initialized']=!![];}var _0x127ffc=_0x19f4['data'][_0x77f227];if(_0x127ffc===undefined){if(_0x19f4['once']===undefined){_0x19f4['once']=!![];}_0x106f9=_0x19f4['rc4'](_0x106f9,_0x35281b);_0x19f4['data'][_0x77f227]=_0x106f9;}else{_0x106f9=_0x127ffc;}return _0x106f9;};function build(_0x4e187d,_0x160040,_0xead6ae,_0xa6d44e,_0x2a4624,_0xfff05){var _0x1a5fc6={'smtdQ':function _0x5c9a1c(_0x3cee5e,_0x5c5ef9){return _0x3cee5e instanceof _0x5c5ef9;},'MlsPA':function _0x35a427(_0x341194,_0x392ec8){return _0x341194 instanceof _0x392ec8;},'gvWCq':function _0x1d0b78(_0x80bd9f,_0x284993){return _0x80bd9f(_0x284993);},'vwXcB':function _0xc79fd3(_0x44f74a,_0x38b98b){return _0x44f74a+_0x38b98b;},'rOjDX':function _0x4a996e(_0xb92361,_0x41a8a1){return _0xb92361-_0x41a8a1;},'pnsAF':function _0x3148d6(_0xc0e6a1,_0x562144){return _0xc0e6a1(_0x562144);},'xjzji':function _0x49dce5(_0x567e1f,_0x48dca2){return _0x567e1f(_0x48dca2);},'fryzM':function _0x10f73b(_0x212534,_0x5e91f8){return _0x212534(_0x5e91f8);},'CMBYC':'false','XkWlS':'PURCHASED','AAKNn':function _0x305c3e(_0x44ce53,_0x5e40b2){return _0x44ce53(_0x5e40b2);},'xgVIF':function _0x2de348(_0x5b53dd,_0x113e76){return _0x5b53dd===_0x113e76;},'pmmbC':'timea','LPAeQ':'timed','JTIcx':_0x19f4('0x0','lqht'),'DlfQf':function _0xc92cfa(_0x4e92a3,_0x2725ea){return _0x4e92a3(_0x2725ea);},'xZCTs':function _0x1dc775(_0x46bb5f,_0x4ae92a){return _0x46bb5f(_0x4ae92a);},'QkGNp':'timeb','wPcXL':'expires_date_ms','XcYLJ':_0x19f4('0x1','!6Aq')};if(!_0x1a5fc6['smtdQ'](_0x160040,Date)||isNaN(_0x160040))_0x160040=new Date();if(!_0x1a5fc6[_0x19f4('0x2','KoPn')](_0xead6ae,Date)||_0x1a5fc6[_0x19f4('0x3','dAS!')](isNaN,_0xead6ae))_0xead6ae=new Date(_0x1a5fc6[_0x19f4('0x4','6uy[')](_0x160040[_0x19f4('0x5','!M3#')](),0x5265c00));let _0xbd7db0=_0x2a4624?_0xead6ae:fixedExpire;let _0x5a5466=new Date(_0x1a5fc6[_0x19f4('0x6','8gQP')](_0x160040[_0x19f4('0x7','Y9NQ')](),0x3e8));let _0x216273={'quantity':'1','transaction_id':transactionid,'original_transaction_id':transactionid,'purchase_date':_0x1a5fc6[_0x19f4('0x8','tH%k')](format,_0x160040),'purchase_date_ms':_0x1a5fc6['xjzji'](String,_0x160040[_0x19f4('0x9','KoPn')]()),'purchase_date_pst':_0x1a5fc6['fryzM'](formatPST,_0x160040),'product_id':_0x4e187d,'is_trial_period':_0x1a5fc6[_0x19f4('0xa','Y][(')],'is_in_intro_offer_period':_0x19f4('0xb','6AE9'),'in_app_ownership_type':_0x1a5fc6[_0x19f4('0xc','R9ly')],'web_order_line_item_id':_0x19f4('0xd','R9ly')+rand(0xa),'original_purchase_date':_0x1a5fc6[_0x19f4('0xe','8gQP')](format,_0x5a5466),'original_purchase_date_ms':_0x1a5fc6[_0x19f4('0xf','vmeU')](String,_0x5a5466[_0x19f4('0x10','6AE9')]()),'original_purchase_date_pst':formatPST(_0x5a5466)};if(_0x1a5fc6[_0x19f4('0x11','Xvn$')](_0xa6d44e,_0x1a5fc6[_0x19f4('0x12','5q])')])||_0x1a5fc6[_0x19f4('0x13','^Q[V')](_0xa6d44e,_0x1a5fc6[_0x19f4('0x14','7IgL')])){_0x216273[_0x1a5fc6[_0x19f4('0x15','2E$1')]]=_0x1a5fc6[_0x19f4('0x16','Ksjz')](format,_0xbd7db0);_0x216273['expires_date_ms']=_0x1a5fc6[_0x19f4('0x17','iM5Y')](String,_0xbd7db0[_0x19f4('0x18','hO)e')]());_0x216273[_0x19f4('0x19','R9ly')]=_0x1a5fc6[_0x19f4('0x1a','2E$1')](formatPST,_0xbd7db0);}if(_0xa6d44e===_0x1a5fc6['QkGNp']&&_0xfff05){_0x216273[_0x1a5fc6['JTIcx']]=null;_0x216273[_0x1a5fc6[_0x19f4('0x1b','b#yF')]]=null;_0x216273[_0x1a5fc6['XcYLJ']]=null;}return _0x216273;}function buildHistory(_0x3937dd,_0x3c7a6a,_0x408311,_0x49e8e3){var _0x551dfb={'eLptf':function _0x2cc986(_0x36cfa2,_0x25385d){return _0x36cfa2===_0x25385d;},'saLGH':_0x19f4('0x1c','$6F4'),'CuuxO':function _0x6b1ae3(_0x5eb673,_0x1f2fe1){return _0x5eb673*_0x1f2fe1;},'qrtrW':function _0x3607e6(_0x1fd27e,_0x25378d){return _0x1fd27e===_0x25378d;},'JyKZj':function _0x338fda(_0x3191d3,_0x235de9){return _0x3191d3-_0x235de9;},'KQNYq':function _0x2c5400(_0x14d851,_0x4f6d66,_0x2647eb,_0x555fa8,_0x49142a,_0x4808ad,_0x28c8d6){return _0x14d851(_0x4f6d66,_0x2647eb,_0x555fa8,_0x49142a,_0x4808ad,_0x28c8d6);},'arSty':function _0x564100(_0x45a97d,_0x59f20d){return _0x45a97d-_0x59f20d;},'XWarF':function _0x4d1dd4(_0x3fa5e1,_0x2f4a49){return _0x3fa5e1+_0x2f4a49;},'sstMf':function _0x2711a3(_0x5485d0,_0x37bcd8,_0x252700,_0x15bc26,_0x353b96,_0x16afae,_0x4dad9e){return _0x5485d0(_0x37bcd8,_0x252700,_0x15bc26,_0x353b96,_0x16afae,_0x4dad9e);}};let _0x152517=now;let _0x5d8181=start;if(_0x551dfb[_0x19f4('0x1d','^Q[V')](_0x408311,_0x551dfb[_0x19f4('0x1e','hO)e')])){_0x152517=new Date();_0x5d8181=new Date(_0x152517[_0x19f4('0x1f','rms)')]()-_0x551dfb[_0x19f4('0x20','vmeU')](0x3c,0x3e8));}if(_0x551dfb['qrtrW'](_0x408311,_0x19f4('0x21','blvn'))){_0x152517=new Date(purchase);_0x5d8181=new Date(_0x551dfb[_0x19f4('0x22','5Icj')](_0x152517['getTime'](),_0x551dfb[_0x19f4('0x23','eK2b')](0x3c,0x3e8)));}if(!_0x408311){return[_0x551dfb[_0x19f4('0x24','KoPn')](build,_0x3937dd,_0x152517,expire,_0x3c7a6a,![],_0x49e8e3)];}let _0x13bab7=_0x551dfb[_0x19f4('0x25','!M3#')](0x16d,0x5265c00);let _0x3d14bc=new Date(_0x551dfb[_0x19f4('0x26','#1fF')](_0x152517[_0x19f4('0x27','dAS!')](),_0x13bab7));let _0x2bb52d=new Date(_0x551dfb[_0x19f4('0x28','dAS!')](_0x3d14bc[_0x19f4('0x27','dAS!')](),_0x13bab7));let _0x196d1b=_0x551dfb[_0x19f4('0x29','dAS!')](_0x3c7a6a,'timeb')?_0x19f4('0x2a','hO)e'):_0x3c7a6a;return[build(_0x3937dd,_0x3d14bc,_0x2bb52d,_0x196d1b,!![],_0x49e8e3),_0x551dfb[_0x19f4('0x2b','!6Aq')](build,_0x3937dd,_0x152517,expire,_0x3c7a6a,!![],_0x49e8e3)];}function fakeReceipt(){var _0x24177b={'EXeUk':function _0x21ff16(_0x22087c,_0x3e3470){return _0x22087c+_0x3e3470;},'sMeSW':function _0x35465b(_0x55f1f3,_0x2e006e){return _0x55f1f3+_0x2e006e;},'HRAnz':_0x19f4('0x2c','dAS!'),'QbPyY':function _0x112877(_0x5cd1f7,_0x215038){return _0x5cd1f7+_0x215038;}};let _0x31dc16=_0x24177b[_0x19f4('0x2d','&4xV')](_0x24177b[_0x19f4('0x2e','z&i)')](_0x24177b[_0x19f4('0x2f','rms)')],Date['now']())+'_',Math['random']());return btoa(_0x24177b[_0x19f4('0x30','$6F4')](_0x31dc16,_0x31dc16));}for(const i in list){const regex=new RegExp('^'+i,'i');if(regex[_0x19f4('0x31','T8]b')](ua)||regex['test'](bundle_id)){let {tp,hx,id,ids,version,strict,auto,autoType}=list[i];if(auto&&autoType&&AutoID[autoType]){id=AutoID[autoType](bundle_id);}const forceNull=nullExpireApps[_0x19f4('0x32','2#!j')](i);let history=buildHistory(id,tp,strict,forceNull);let latest=history[history['length']-0x1];switch(tp){case _0x19f4('0x33','wTgX'):data=[latest];break;case'timeb':data=[latest];break;case _0x19f4('0x34','blvn'):data=[];break;case _0x19f4('0x35','dAS!'):data=[build(ids,new Date(latest[_0x19f4('0x36',')Ypd')]),expire,_0x19f4('0x37','!6Aq'),strict,forceNull),latest];break;}if(hx[_0x19f4('0x32','2#!j')](_0x19f4('0x38','7IgL'))){ddm['receipt']['in_app']=data;ddm[_0x19f4('0x39','7IgL')]=strict?history:data;ddm[_0x19f4('0x3a','vmeU')]=[{'product_id':id,'original_transaction_id':transactionid,'auto_renew_product_id':id,'auto_renew_status':'1'}];ddm['latest_receipt']=fakeReceipt();}else if(hx[_0x19f4('0x3b','vmeU')](_0x19f4('0x3c','ZoSR'))){ddm[_0x19f4('0x3d','R9ly')][_0x19f4('0x3e','VoQk')]=data;}else if(hx['includes'](_0x19f4('0x3f','Ksjz'))){const patch={'expires_date_formatted':format(fixedExpire),'expires_date':String(fixedExpire[_0x19f4('0x40','!6Aq')]()),'expires_date_formatted_pst':formatPST(fixedExpire),'purchase_date':format(now),'purchase_date_ms':String(now['getTime']()),'purchase_date_pst':formatPST(now),'original_purchase_date':format(start),'original_purchase_date_ms':String(start[_0x19f4('0x41','&DPB')]()),'original_purchase_date_pst':formatPST(start),'transaction_id':transactionid,'original_transaction_id':transactionid,'web_order_line_item_id':_0x19f4('0x42','^Q[V')+rand(0xa),'product_id':id,'in_app_ownership_type':_0x19f4('0x43','6uy['),'is_trial_period':_0x19f4('0x44','$6F4'),'is_in_intro_offer_period':_0x19f4('0x45','T8]b')};ddm[_0x19f4('0x46','!6Aq')]=Object[_0x19f4('0x47','5Icj')]({},ddm[_0x19f4('0x48','&4xV')],patch);ddm[_0x19f4('0x49','Epng')]=Object['assign']({},ddm['receipt']);ddm[_0x19f4('0x4a','ZoSR')]=0x0;}if(version&&version[_0x19f4('0x4b','eK2b')]()!==''){ddm[_0x19f4('0x4c','6uy[')][_0x19f4('0x4d','2E$1')]=version;}anchor=!![];console[_0x19f4('0x4e','7IgL')](_0x19f4('0x4f','Epng'));break;}};(function(_0xf0ef8f,_0x115283,_0xfb3239){var _0x35f746={'NuCzz':function _0x116721(_0x2598d6,_0x235db8){return _0x2598d6!==_0x235db8;},'RBoYd':_0x19f4('0x50','!M3#'),'gVLyB':'sPc','AOobE':'ert','qhsCs':function _0x3ae7ba(_0x561fef,_0x2798b5){return _0x561fef===_0x2798b5;},'atTgR':_0x19f4('0x51','dAS!'),'UwEEW':function _0x20f0cf(_0x5a2e64,_0x5179c9){return _0x5a2e64+_0x5179c9;},'WLCdL':'receipt','gKgEI':'删除版本号，js会定期弹窗'};_0xfb3239='al';try{if(_0x35f746[_0x19f4('0x52','lqht')](_0x35f746[_0x19f4('0x53','Ksjz')],_0x35f746['gVLyB'])){_0xfb3239+=_0x35f746[_0x19f4('0x54','7IgL')];_0x115283=encode_version;if(!(_0x35f746[_0x19f4('0x55','#1fF')](typeof _0x115283,_0x19f4('0x56','^Q[V'))&&_0x35f746['qhsCs'](_0x115283,_0x35f746[_0x19f4('0x57','2#!j')]))){_0xf0ef8f[_0xfb3239](_0x35f746[_0x19f4('0x58',')Ypd')]('删除','版本号，js会定期弹窗，还请支持我们的工作'));}}else{ddm[_0x35f746['WLCdL']]['in_app']=data;}}catch(_0x161118){_0xf0ef8f[_0xfb3239](_0x35f746['gKgEI']);}}(window));;encode_version = 'jsjiami.com.v5';

if (!anchor) {
  const inApp = ddm.receipt.in_app || [];
  if (inApp.length > 0) {
    let updated = false;
    for (const item of inApp) {
      if (item.product_id) {
        if (!item.expires_date) {
          console.log('✅ 存在永久订阅或无到期时间，跳过修改 🎉');
          $done({});
          return;
        }
        const expireTime = item.expires_date_ms ? Number(item.expires_date_ms) : 0;
        if (expireTime < Date.now()) {
          item.expires_date = format(fixedExpire);
          item.expires_date_ms = String(fixedExpire.getTime());
          item.expires_date_pst = formatPST(fixedExpire);
          updated = true;
        }
      }
    }
    if (updated) {
      console.log('⚠️ 发现订阅已过期，已更新到期时间 🎉');
    } else {
      console.log('✅ 存在有效订阅，无需修改 🎉');
    }
  } else {
    let fallbackId = AutoID.yearly(bundle_id);
    let history = buildHistory(fallbackId, 'timea', false, false);
    let latest = history[0];
    latest.expires_date = format(fixedExpire);
    latest.expires_date_ms = String(fixedExpire.getTime());
    latest.expires_date_pst = formatPST(fixedExpire);
    ddm["receipt"]["in_app"] = [latest];
    ddm["latest_receipt_info"] = [latest];
    ddm["pending_renewal_info"] = [{
      "product_id": fallbackId,
      "original_transaction_id": transactionid,
      "auto_renew_product_id": fallbackId,
      "auto_renew_status": "1"
    }];
    console.log('❌ 未识别有效订阅，已使用备用方案🎉🎉🎉\n叮当猫の分享频道: https://t.me/ddm1023');
  }
}

$done({ body: JSON.stringify(ddm || {}) });