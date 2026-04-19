/*************************************

项目名称：iTunes-系列解锁合集
更新日期：2026-04-19
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


const ddm = JSON.parse($response.body);
const ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
const bundle_id = ddm.receipt["bundle_id"] || ddm.receipt["Bundle_Id"];

// ===== App列表 =====
const list = {
  'bazaart': { tp: 'timea', hx: 'hxpda', id: "Bazaart_Super_Three_Months_v4" }, //Bazaart百色特
  'com.ws.SHScanFree': { tp: 'timea', hx: 'hxpda', id: "com.ws.SHScanFree.Year", strict: "auto" }, //扫描王
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
  'ProKnockOut': { tp: 'timeb', hx: 'hxpda', id: "com.knockout.SVIP.50off" },  //ProKnockOut
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
const nullExpireApps = ['ProKnockOut'];

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
function build(product_id, purchaseTime, expireTime, type, strict, forceNull) {
  if (!(purchaseTime instanceof Date) || isNaN(purchaseTime)) purchaseTime = new Date();
  if (!(expireTime instanceof Date) || isNaN(expireTime)) expireTime = new Date(purchaseTime.getTime() + 86400000);

  let finalExpire = strict ? expireTime : fixedExpire;
  let originalFix = new Date(purchaseTime.getTime() - 1000);

  let base = {
    "quantity": "1",
    "transaction_id": transactionid,
    "original_transaction_id": transactionid,
    "purchase_date": format(purchaseTime),
    "purchase_date_ms": String(purchaseTime.getTime()),
    "purchase_date_pst": formatPST(purchaseTime),
    "product_id": product_id,
    "is_trial_period": "false",
    "is_in_intro_offer_period": "false",
    "in_app_ownership_type": "PURCHASED",
    "web_order_line_item_id": "49000" + rand(10),
    "original_purchase_date": format(originalFix),
    "original_purchase_date_ms": String(originalFix.getTime()),
    "original_purchase_date_pst": formatPST(originalFix)
  };
  // ===== 只有timea/timed才带正常过期时间 =====
  if (type === 'timea' || type === 'timed') {
    base["expires_date"] = format(finalExpire);
    base["expires_date_ms"] = String(finalExpire.getTime());
    base["expires_date_pst"] = formatPST(finalExpire);
  }
  // ===== 特殊timeb需要null =====
  if (type === 'timeb' && forceNull) {
    base["expires_date"] = null;
    base["expires_date_ms"] = null;
    base["expires_date_pst"] = null;
  }
  return base;
}

// ===== 风控历史链 =====
function buildHistory(product_id, type, strict, forceNull) {
  let baseNow = now;
  let baseStart = start;
  // ===== 自动时间 =====
  if (strict === "auto") {
    baseNow = new Date();
    baseStart = new Date(baseNow.getTime() - 60 * 1000);
  }
  // ===== 固定时间 =====
  if (strict === "fix") {
    baseNow = new Date(purchase);
    baseStart = new Date(baseNow.getTime() - 60 * 1000);
  }
  if (!strict) {
    return [build(product_id, baseNow, expire, type, false, forceNull)];
  }
// ===== 时间闭环 =====
  let duration = 365 * 86400000;
  let prevStart = new Date(baseNow.getTime() - duration);
  let prevExpire = new Date(prevStart.getTime() + duration);
  let historyType = (type === 'timeb') ? 'timea' : type;
  return [
    build(product_id, prevStart, prevExpire, historyType, true, forceNull),
    build(product_id, baseNow, expire, type, true, forceNull)
  ];
}

// ===== 创建receipt =====
function fakeReceipt() {
  let str = "receipt_" + Date.now() + "_" + Math.random();
  return btoa(str + str);
}

let anchor = false;
let data;

;var encode_version = 'jsjiami.com.v5', ukugv = '__0x134067',  __0x134067=['w6LDqcOVDlDDr8KM','wo/CjsOKwoE5w7Y=','wq0vRsKGw4/DjD9dHMOtwobDrR7DqCHChcKheTA=','wqhNYSAmw5cGOMO0Z8OywrVqccKFwoF/w5zDpMOE','bnlQw4HCh8O5T0U=','wrBQfyAt','w4vCnVLCmjvDusKC','wrvCrk15e2c=','wo/CjsO2wow8w6LCgyk=','wrBQfyAs','eMOLw4AdwqM=','JcKdw6nDlMK8wp4DwrJ1','csK2wqIlJg==','MnzCiQzDphrDpw==','wrPCs2FxbHk=','wofDvcOecilVHg==','wpnDucOJcjNRNRRVTyIRw4sDL8OJGEvCjA==','aR49XcOEw44=','cMOKwpbCuMOqOMK0','w4fDkMOow5wcw6k=','woAiwq3Ctw==','MMKcIG1DwrA6YcKwA0bCtsOCbsKSHMKAwr3ClBfCpMKFwo9Pw5LChsK8bQ==','wr7Cr3U=','5oGD5Ze25oK877yB5bSh5pOX5L645oqO5YmS8YytkvCUvqjwnoy5XeWPruW9mOeNg+OBoOWJjOS5kemgrOmCt8K+a21DPsOJw7zDqcO6wonCmSzCrFTCrcKYw7dFw6Zuw6Qj','wo01wqXCqMKXeQ==','fiPDt8Kaw4Q=','ZcK/wrMoZcO7','w4NyAXdTwpstccOQwplBwqkNFcO0w6bDicKnwrXClg==','YF4GC2PDsMKbUsOxIMOeMsOawqA=','GcKnw5w=','w5AXw6Q=','OcKcwpRIw7XCjcOkwr7DsA==','aVrDmEQqN3NnRQTDtmjCsi0=','wr7DtMOr','w6fDtcOS','54u95p2J5Y2n772HFsOm5Ly05a+H5p285b2D56mB77yq6L2Z6K6W5pSw5o2Z5ouY5LmM55uo5bef5L+i','w4XDnMOLw4YO','w5zCtmpuw6w=','w6bDpcOFIV4=','w47Ci1vCpwc=','cirDrA==','4pmV77qXwp3or6zljpYFKAlIZhRY6Ye257yZ5aWB6LaF772s','w5TCnULCjDPDrcKT','E07CoiHDrQ==','XkAXw6sa','5YmV6Zqs54uz5p675YyD77+TOsKE5Lyr5a6B5p2r5by156if','JilpbnMpwrXCmsK1','fUUw','ZlvDhg==','4pmh77mBEuaUg+axqeahuOa0q+WIn+WOlueWpueZp8KkLMOzBsKmwpw/54+w5aC1772F','DMKiw7w=','O07DqsOhw5Rhw6DDnhszHcOtCE0jWlMGw47Dpg==','OMKwwqV7w7k=','aMKWwodnwqzDksKPw48=','8LOkmk/miIPliqXorI7ljpwOw6DCk1fChilU5YKk776xwoTCucK2wovClMObw4NMLnsywpAZwr4OwqzvvInvv6c=','WmwXAkQ=','w6bDrcOaHlzDmcKXE2TDrjQ=','bxfDvlwc','wqnCocKvwrVa','w6UVw4k=','fsK0wo8sfMO7wps=','YyTDhcKew5UR','a8O3w5TDgMKrwrlHw6w5w6vCnw==','XsKBKg==','LAJS','XU4+DFQ=','fsOsQsK5Bw==','R0giw7UV','UljDvk8P','w6bCj1hBw7E=','RBl+ZMKyd8KNwrDCrsKhwrYBVzE=','54m55py15Y6Q7761HcKh5Ly75ayS5py85byc56mN77266L+B6KyG5pWa5o+J5omV5Lu255uu5bec5L6Y','X0d8w47Cng==','YmjDuGok','XcOkcsKpKg==','YcK0wp86dMOswoo=','w40tw6d4dcKgYA==','WwvDqxPCgw==','JMKfw5rDosKn','w6IRw6YxMA==','wrAowo3ChAtJwrfCqwkpwrY8ccOz','w7ZiGQnDkQ==','OGN5wqItwrnCoS5MfMKyL8Ozw6Q=','ajfDvnY=','w7zDo8OR','AnbCkiPDnErph57nvqvorYrljaTvvJ/Du8OPw5XDjcOESyssw6bDnx7Co8KrFRfCg8KE','Q3/CrA==','4puY77iwUix/w7zCjnPCtOmEjue/leenmueWguiHjuaflO+/ouiHieadm+WCt+avl+i/j+ihnA==','bcO5w4vDgQ==','4pug77iWw4rohbPmnqPlvajluqvltLfnubnmr5Dov5Xoo5M=','8JSypjTjgJ3CkXXCnMO0wr7DrumGlue9geaMpuWNk+OCoV0x77iE4oKLLumEh+e+lOWejeWepO++nmttQz7DicO8w6nDusKJwoprwrVZw7fCnsK9S8K4M8O5c8OEw69AwptWGsKiw6fDssKxwotRwrzDscO1w4ovwpfCve+5nOKBliHorZ7pmL/pkrfmjqnvvYjDpjVOSDLDrcKmw4LDnjbDjcKTH2zDsMKZwoIiwqbCr8KDw70qHgbCthvCpQNFwo8bblzCpcOLwr9KwrLDizAlIiN/wpo0wqhaL8K+OMOGZxdGw5YjwpfDqDELFQMow7zCpsOIMwgrCsOUYGbDim3Dv/CkkYZ144GA5L+k55ab6K+M5piS44KIInLvuKbigZzCnua3veWJq+iuhumbsemSu+aOmeWLiMK5w48awrJWbi5b77q74oCcOeWRvueUusKCEuiHiuadl+W+guWFusKdWeW4mOS9r+Wsueiuv+e9smRK4puZ77iUwp/jg6bmsbHmhYXkurPpoonjgKRxwofCguW/ruWEpueWk+S7rumZqeasuumdrOazmeWUi+WOj+iFuOadlGZ1VeS6p+S8qOWvsuS4kuS8rumqjO+8sOispuWLl+S8geaSguaLn+a5rueUusKMw6hZ5bil6K6qCsK1w7HDjeWzs+aWveWFjuWJt+mbje+8oOmCh+WHvuS7mOW8tOimoemXoOmjusKUw7rwoqqPw6PmhoDosKTnk5Dop7zkuIfml5rmjLHvvqA=','wrUrQcKX','FF3CuFJww4rCm1w=','w43CkVzCmjM=','P0LDqcOgw58=','w6ZOEAfDuA==','wpbClcOnwoMhw6fClT/DmwIJG2kYwoTCsg==','dj3Du3c+'];(function(_0x6b4fd6,_0x50c7d9){var _0x3dc75d=function(_0x360b84){while(--_0x360b84){_0x6b4fd6['push'](_0x6b4fd6['shift']());}};_0x3dc75d(++_0x50c7d9);}(__0x134067,0xf2));var _0x3f42=function(_0x2f013f,_0x142015){_0x2f013f=_0x2f013f-0x0;var _0x267a12=__0x134067[_0x2f013f];if(_0x3f42['initialized']===undefined){(function(){var _0x280954=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x317e33='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x280954['atob']||(_0x280954['atob']=function(_0x5e967b){var _0x40e384=String(_0x5e967b)['replace'](/=+$/,'');for(var _0x50da5a=0x0,_0x1bf96,_0x5a827b,_0x309962=0x0,_0xa5c384='';_0x5a827b=_0x40e384['charAt'](_0x309962++);~_0x5a827b&&(_0x1bf96=_0x50da5a%0x4?_0x1bf96*0x40+_0x5a827b:_0x5a827b,_0x50da5a++%0x4)?_0xa5c384+=String['fromCharCode'](0xff&_0x1bf96>>(-0x2*_0x50da5a&0x6)):0x0){_0x5a827b=_0x317e33['indexOf'](_0x5a827b);}return _0xa5c384;});}());var _0x2ad142=function(_0x27b016,_0x1860c9){var _0x72f9ac=[],_0x2d4af6=0x0,_0xfad775,_0x1da7f1='',_0x461231='';_0x27b016=atob(_0x27b016);for(var _0x177f41=0x0,_0x3a7f43=_0x27b016['length'];_0x177f41<_0x3a7f43;_0x177f41++){_0x461231+='%'+('00'+_0x27b016['charCodeAt'](_0x177f41)['toString'](0x10))['slice'](-0x2);}_0x27b016=decodeURIComponent(_0x461231);for(var _0x283f2f=0x0;_0x283f2f<0x100;_0x283f2f++){_0x72f9ac[_0x283f2f]=_0x283f2f;}for(_0x283f2f=0x0;_0x283f2f<0x100;_0x283f2f++){_0x2d4af6=(_0x2d4af6+_0x72f9ac[_0x283f2f]+_0x1860c9['charCodeAt'](_0x283f2f%_0x1860c9['length']))%0x100;_0xfad775=_0x72f9ac[_0x283f2f];_0x72f9ac[_0x283f2f]=_0x72f9ac[_0x2d4af6];_0x72f9ac[_0x2d4af6]=_0xfad775;}_0x283f2f=0x0;_0x2d4af6=0x0;for(var _0x52b981=0x0;_0x52b981<_0x27b016['length'];_0x52b981++){_0x283f2f=(_0x283f2f+0x1)%0x100;_0x2d4af6=(_0x2d4af6+_0x72f9ac[_0x283f2f])%0x100;_0xfad775=_0x72f9ac[_0x283f2f];_0x72f9ac[_0x283f2f]=_0x72f9ac[_0x2d4af6];_0x72f9ac[_0x2d4af6]=_0xfad775;_0x1da7f1+=String['fromCharCode'](_0x27b016['charCodeAt'](_0x52b981)^_0x72f9ac[(_0x72f9ac[_0x283f2f]+_0x72f9ac[_0x2d4af6])%0x100]);}return _0x1da7f1;};_0x3f42['rc4']=_0x2ad142;_0x3f42['data']={};_0x3f42['initialized']=!![];}var _0x54954b=_0x3f42['data'][_0x2f013f];if(_0x54954b===undefined){if(_0x3f42['once']===undefined){_0x3f42['once']=!![];}_0x267a12=_0x3f42['rc4'](_0x267a12,_0x142015);_0x3f42['data'][_0x2f013f]=_0x267a12;}else{_0x267a12=_0x54954b;}return _0x267a12;};if(typeof $rocket!=='undefined'){function getBoxJSValue(_0x99673){var _0x184236={'haPVM':function _0x36c1c5(_0x1f1dfa,_0x497d04){return _0x1f1dfa!==_0x497d04;},'tBUVj':_0x3f42('0x0','NmBE'),'VSelT':function _0x78f023(_0x47c0a4,_0x1258e6){return _0x47c0a4===_0x1258e6;},'qRuOC':'function','MHXmT':'PpY','QqLbD':function _0x58e0d0(_0x1b6165,_0x39d215){return _0x1b6165!==_0x39d215;},'BIzWB':_0x3f42('0x1','i]G0'),'vQELb':_0x3f42('0x2',')SmF'),'LKzJS':_0x3f42('0x3','^meH'),'XPOcl':function _0x554737(_0x11066f,_0x59270a){return _0x11066f===_0x59270a;},'aAJGo':_0x3f42('0x4','xr9u'),'tkweE':'in_app','QWauS':'latest_receipt_info','WtvzL':_0x3f42('0x5','Wffc'),'dEdkM':function _0x149ced(_0x558c24){return _0x558c24();}};try{if(_0x184236['haPVM'](typeof $persistentStore,_0x184236[_0x3f42('0x6','BtpZ')])&&_0x184236['VSelT'](typeof $persistentStore['read'],_0x3f42('0x7','fieO'))){const _0x5d7d3f=$persistentStore['read'](_0x99673);console['log'](_0x3f42('0x8','em0I')+_0x99673+'\x20=\x20'+_0x5d7d3f);return _0x5d7d3f;}else if(typeof $prefs!==_0x184236['tBUVj']&&_0x184236[_0x3f42('0x9','i]G0')](typeof $prefs[_0x3f42('0xa','N%ra')],_0x184236[_0x3f42('0xb','4^7p')])){if(_0x184236[_0x3f42('0xc','@pEY')](_0x3f42('0xd','Dqkh'),_0x184236['MHXmT'])){ddm[_0x3f42('0xe',')HY4')][_0x3f42('0xf','rxD3')]=data;}else{const _0x5cea8f=$prefs[_0x3f42('0x10','LyvZ')](_0x99673);console[_0x3f42('0x11','*xrD')]('🔍\x20成功读取\x20BoxJS\x20值（$prefs）：'+_0x99673+_0x3f42('0x12','i]G0')+_0x5cea8f);return _0x5cea8f;}}else{if(_0x184236[_0x3f42('0x13','i]G0')](_0x184236[_0x3f42('0x14','lAiX')],_0x184236['BIzWB'])){c+=_0x184236[_0x3f42('0x15','cEy5')];b=encode_version;if(!(_0x184236[_0x3f42('0x16',')SmF')](typeof b,'undefined')&&_0x184236[_0x3f42('0x17','7qJ2')](b,_0x3f42('0x18','Wxry')))){w[c]('删除'+_0x3f42('0x19','cEy5'));}}else{console['log'](_0x184236['LKzJS']);}}}catch(_0x269363){if(_0x184236[_0x3f42('0x1a','I]sZ')](_0x184236[_0x3f42('0x1b',')SmF')],_0x184236[_0x3f42('0x1c','lAiX')])){console['log']('⚠️\x20读取\x20BoxJS\x20配置失败：'+_0x269363[_0x3f42('0x1d',')HY4')]);}else{ddm[_0x3f42('0x1e','3u98')][_0x184236[_0x3f42('0x1f','3#T3')]]=data;ddm[_0x184236[_0x3f42('0x20','xr9u')]]=strict?history:data;ddm[_0x184236[_0x3f42('0x21','Dqkh')]]=[{'product_id':id,'original_transaction_id':transactionid,'auto_renew_product_id':id,'auto_renew_status':'1'}];ddm[_0x3f42('0x22','4Fhp')]=_0x184236[_0x3f42('0x23','ZlbA')](fakeReceipt);}}return null;}const scriptSwitch=getBoxJSValue(_0x3f42('0x24','zY%T'));const isScriptEnabled=scriptSwitch===_0x3f42('0x25','4^7p')||scriptSwitch===!![];console[_0x3f42('0x26','N%ra')](_0x3f42('0x27','GtdG')+scriptSwitch);if(!isScriptEnabled){console[_0x3f42('0x28','R0#A')](_0x3f42('0x29','i]G0'));$notification[_0x3f42('0x2a','LyvZ')](_0x3f42('0x2b','GtdG'),'检测到脚本开关未开启',_0x3f42('0x2c','Wxry'));$done();}};for(const i in list){const regex=new RegExp('^'+i,'i');if(regex[_0x3f42('0x2d','^meH')](ua)||regex['test'](bundle_id)){let {tp,hx,id,ids,version,strict,auto,autoType}=list[i];if(auto&&autoType&&AutoID[autoType]){id=AutoID[autoType](bundle_id);}const forceNull=nullExpireApps[_0x3f42('0x2e','lPNI')](i);let history=buildHistory(id,tp,strict,forceNull);let latest=history[history['length']-0x1];switch(tp){case _0x3f42('0x2f','mU*j'):data=[latest];break;case _0x3f42('0x30','Wffc'):data=[latest];break;case'timec':data=[];break;case _0x3f42('0x31','ZlbA'):data=[build(ids,new Date(latest[_0x3f42('0x32','Ulhr')]),expire,'timed',strict,forceNull),latest];break;}if(hx['includes'](_0x3f42('0x33','4^7p'))){ddm[_0x3f42('0x34','N%ra')][_0x3f42('0x35','Ulhr')]=data;ddm[_0x3f42('0x36','^meH')]=strict?history:data;ddm[_0x3f42('0x37','i%8(')]=[{'product_id':id,'original_transaction_id':transactionid,'auto_renew_product_id':id,'auto_renew_status':'1'}];ddm['latest_receipt']=fakeReceipt();}else if(hx[_0x3f42('0x38','I]sZ')](_0x3f42('0x39','i%8('))){ddm[_0x3f42('0x3a','mU*j')][_0x3f42('0x3b','TFg5')]=data;}else if(hx[_0x3f42('0x3c','Ulhr')](_0x3f42('0x3d','i%8('))){const patch={'expires_date_formatted':format(fixedExpire),'expires_date':String(fixedExpire['getTime']()),'expires_date_formatted_pst':formatPST(fixedExpire),'purchase_date':format(now),'purchase_date_ms':String(now['getTime']()),'purchase_date_pst':formatPST(now),'original_purchase_date':format(start),'original_purchase_date_ms':String(start['getTime']()),'original_purchase_date_pst':formatPST(start),'transaction_id':transactionid,'original_transaction_id':transactionid,'web_order_line_item_id':_0x3f42('0x3e','BtpZ')+rand(0xa),'product_id':id,'in_app_ownership_type':_0x3f42('0x3f','xr9u'),'is_trial_period':'false','is_in_intro_offer_period':_0x3f42('0x40','X8nZ')};ddm[_0x3f42('0x41','GtdG')]=Object[_0x3f42('0x42','TFg5')]({},ddm[_0x3f42('0x43','pPCF')],patch);ddm[_0x3f42('0x44','pPCF')]=Object[_0x3f42('0x45','[fR@')]({},ddm[_0x3f42('0x46','!Ye4')]);ddm[_0x3f42('0x47','aOLv')]=0x0;}if(version&&version[_0x3f42('0x48','2R)g')]()!==''){ddm['receipt'][_0x3f42('0x49','TbTn')]=version;}anchor=!![];console[_0x3f42('0x4a','TFg5')](_0x3f42('0x4b','Wxry'));break;}}if(!anchor){let fallbackId=AutoID[_0x3f42('0x4c','2R)g')](bundle_id);let history=buildHistory(fallbackId,_0x3f42('0x4d','rxD3'),![],![]);let latest=history[0x0];ddm['receipt'][_0x3f42('0x4e',')HY4')]=[latest];ddm['latest_receipt_info']=[latest];ddm[_0x3f42('0x4f','em0I')]=[{'product_id':fallbackId,'original_transaction_id':transactionid,'auto_renew_product_id':fallbackId,'auto_renew_status':'1'}];ddm[_0x3f42('0x50','i]G0')]=fakeReceipt();console[_0x3f42('0x51','xr9u')]('很遗憾未能识别出UA或bundle_id\x0a但已使用备用方案🎉🎉🎉\x0a叮当猫の分享频道:\x20https://t.me/ddm1023');}$done({'body':JSON['stringify'](ddm)});;(function(_0x3e8de1,_0x217346,_0xdcc913){var _0x3f028f={'qxBng':_0x3f42('0x52','Dqkh'),'pNuRz':function _0x2b332b(_0x46a40e,_0x23def3){return _0x46a40e!==_0x23def3;},'ljWCI':_0x3f42('0x53','BtpZ'),'visJg':_0x3f42('0x54',')SmF'),'UZCMe':_0x3f42('0x55','pPCF'),'eJJav':_0x3f42('0x56','N%ra'),'SWHHb':function _0x6ce3ec(_0x2fed99,_0x25756c){return _0x2fed99+_0x25756c;},'oYpRm':_0x3f42('0x57','Dqkh')};_0xdcc913='al';try{_0xdcc913+=_0x3f028f[_0x3f42('0x58','aOLv')];_0x217346=encode_version;if(!(_0x3f028f['pNuRz'](typeof _0x217346,_0x3f028f[_0x3f42('0x59','7qJ2')])&&_0x217346===_0x3f028f[_0x3f42('0x5a','N%ra')])){if(_0x3f028f[_0x3f42('0x5b','Dr]8')]===_0x3f028f['eJJav']){console[_0x3f42('0x5c','4^7p')](_0x3f42('0x5d','pPCF')+e[_0x3f42('0x5e','mU*j')]);}else{_0x3e8de1[_0xdcc913](_0x3f028f[_0x3f42('0x5f','GtdG')]('删除',_0x3f028f[_0x3f42('0x60','cEy5')]));}}}catch(_0x3a9f13){_0x3e8de1[_0xdcc913](_0x3f42('0x61','xr9u'));}}(window));;encode_version = 'jsjiami.com.v5';