/*************************************

项目名称：iTunes-系列解锁合集
更新日期：2026-04-11
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
const yearid = `${bundle_id}.year`;
const yearlyid = `${bundle_id}.yearly`;
const yearlysubscription = `${bundle_id}.yearlysubscription`;
const lifetimeid = `${bundle_id}.lifetime`;

const list = {
  'EnglishTalent': { tp: 'timea', hx: 'hxpda', id: "com.mango.newYearVip", strict: true }, //英语演讲
  'art.yueyin.ebook-convert': { tp: 'timea', hx: 'hxpda', id: "art.yueyin.ebook.year" }, //电子书格式转换
  'MaiqiSun': { tp: 'timeb', hx: 'hxpda', id: "life_cn_68" }, //iSunning
  'CCRemote': { tp: 'timea', hx: 'hxpda', id: "ays.chromo.remote.yearly" }, //Chromo-Remote
  'PulseWatch': { tp: 'timeb', hx: 'hxpda', id: "relaxlife_ebp" }, //RelaxWatch:AI智能压力监测
  'PicCompress': { tp: 'timea', hx: 'hxpda', id: "pc_vip_new_1y" }, //图片压缩
  'XiangCePhoto': { tp: 'timeb', hx: 'hxpda', id: "ql128" }, //相册清理-删除重复照片
  'FileMaster': { tp: 'timeb', hx: 'hxpda', id: "FileMaster_ProVersion" },  //文件大师
  'Squeeze': { tp: 'timea', hx: 'hxpda', id: "uk.co.olsonapps.kegeltrainerlite.yearly" },  //凯格尔运动教练-盆底肌运动
  'Tuesday': { tp: 'timeb', hx: 'hxpda', id: "PIGLET_VIP_Forever" },  //Tuesday-纪念日
  'IPTV%20Flixana': { tp: 'timeb', hx: 'hxpda', id: "iptv_flixana_lifetime_sub" },  //IPTV Flixana
  'AdBlocker': { tp: 'timeb', hx: 'hxpda', id: "com.va.adBlocker.lifeTimefree" },  //AdBlocker
  'ECGPlus': { tp: 'timeb', hx: 'hxpda', id: "com.wms.hrv.pro" },  //ECG+心电房颤分析
  'PhotosPK': { tp: 'timeb', hx: 'hxpda', id: "indie.davidwang.PicPicks.membership.lifetime" },  //PicPicks-AI智能照片整理
  'WatchWallpaper': { tp: 'timea', hx: 'hxpda', id: "indie.davidwang.WatchWallpaper.yearsubscriptegold" },  //表盘专辑
  'com.beauty.MeiTui': { tp: 'timea', hx: 'hxpda', id: "vip_member_v3_365day" },  //AI美腿
  'ChmReader': { tp: 'timeb', hx: 'hxpda', id: "EpubReader_ProVersion" },  //Epub阅读器
  'MediaConvert': { tp: 'timeb', hx: 'hxpda', id: "MediaConverter_ProVersion" },  //格式转换
  'FDSunAlly': { tp: 'timeb', hx: 'hxpda', id: "com.freenotes.sunally.lifetime" },  //SunAlly-智能健康助力
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
  'DeviceFinder': { tp: 'timeb', hx: 'hxpda', id: "com.wonderfind.lifetime" },  //Wonderfind-设备查找
  'Graphionica': { tp: 'timea', hx: 'hxpda', id: "premium_year" },  //Graphionica
  'AIAssistant': { tp: 'timea', hx: 'hxpda', id: "AIchat_1w_7.99_trial" },  //AIAssistant
  'MonitorPlus': { tp: 'timeb', hx: 'hxpda', id: "com.unhonin.MonitorPlus.proversion" },  //Monitor+
  'MessageHold': { tp: 'timea', hx: 'hxpda', id: "com.messagehold.forever" },  //拦截盾
  'co.vulcanlabs': { tp: 'timea', hx: 'hxpda', id: lifetimeid },  //vulcanlabs合集
  'Guitar%20Gravitas': { tp: 'timea', hx: 'hxpda', id: "GuitarGravitasChordsScalesArpeggiosLessons" },  //GuitarGravitas
//  'com.eleven.chatgpt': { tp: 'timea', hx: 'hxpda', id: "com.chatgpt.yearly" },  //ChatAI
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
  'PhotoMovie': { tp: 'timea', hx: 'hxpda', id: "com.mediaeditor.photomovie.year" }, //PhotoMovie-照片视频
  'ShotOn': { tp: 'timeb', hx: 'hxpda', id: "com.colin.shoton.forevervip" }, //ShotOn
  'PhimCiaj': { tp: 'timeb', hx: 'hxpda', id: "com.jiancent.calligraphymaster.lifetime" }, //练字大师
  'TimeCut': { tp: 'timea', hx: 'hxpda', id: "com.floatcamellia.hfrslowmotion.forevervip" },  //TimeCut
  'com.floatcamellia.motiok': { tp: 'timea', hx: 'hxpda', id: "com.floatcamellia.motiok.vipforever" },  //Hype_Text-AE特效片制作
  'POPOLockScreenWidgetable': { tp: 'timea', hx: 'hxpda', id: "com.widget.fightenegery.yearly" },  //多彩壁纸
  'GreetingScanner': { tp: 'timea', hx: 'hxpda', id: "com.alphaplus.greetingscaner.w.b" },  //扫描识别王
  'FancyCamPlus': { tp: 'timea', hx: 'hxpda', id: "com.alphaplus.fancycam.year.198" },  //悦颜相机
  'Again': { tp: 'timeb', hx: 'hxpda', id: "com.owen.again.profession" },  //Again-稍后阅读器
  'remotelg': { tp: 'timeb', hx: 'hxpda', id: "com.gqp.remotelg.lifetime" },  //UniversalRemoteTV+ 遥控器
  'Notebook': { tp: 'timea', hx: 'hxpda', id: "com.zoho.notebook.ios.personal.yearly" },  //Notebook
  'com.damon.dubbing': { tp: 'timea', hx: 'hxpda', id: "com.damon.dubbing.vip12" },  //有声英语绘本
  'ZHUBEN': { tp: 'timea', hx: 'hxpda', id: "com.xiaoyu.yue" },  //有声英语绘本
  'XIAOTangHomeParadise': { tp: 'timea', hx: 'hxpda', id: "com.yuee.mo2" },  //鸿海幼儿启蒙
  'film': { tp: 'timea', hx: 'hxpda', id: "pro_auto_subscribe_year_ovs" },  //胶卷相机
  'Muza': { tp: 'timea', hx: 'hxpda', id: "com.appmuza.premium_year" },  //Muza-修图APP
  'StandbyWidget': { tp: 'timed', hx: 'hxpda', id: "com.standby.idream.year.68", ids: "standbyus.nonconsume.missingyou" },  //StandBy_Us-情侣定位
  'Mango6Minute': { tp: 'timea', hx: 'hxpda', id: "576170870" },  //6分钟英语
  'Photo%20Cutout': { tp: 'timea', hx: 'hxpda', id: "com.icepine.allyear" },  //轻松扣图
  'cleanPhone': { tp: 'timea', hx: 'hxpda', id: "com.clean.year" },  //爱机清理
  'ppt': { tp: 'timea', hx: 'hxpda', id: "com.palmmob.pptios.yearly" },  //手机PPT制作
  'WasteCat': { tp: 'timeb', hx: 'hxpda', id: "dev.sanjin.WasteCat.PermanentVip" },  //垃圾贪吃猫
  'MeowTalk': { tp: 'timea', hx: 'hxpda', id: "meowtalk.month.basic.autorenewable.subscription" },  //喵说
  'habitdot': { tp: 'timeb', hx: 'hxpda', id: "habitdots_pro_forever" },  //习惯点点
  'stretchworkout': { tp: 'timea', hx: 'hxpda', id: "com.abishkking.premiumYearStretch" },  //拉伸运动
  'Planist': { tp: 'timed', hx: 'hxpda', id: "org.zrey.planist.main", ids: "org.zrey.planist.lifetime" },  //Planist-计划和清单
  'com.uzstudio.avenuecast.ios': { tp: 'timeb', hx: 'hxpda', id: "1001" },  //凡视知音
  'CongZhenBaZi': { tp: 'timeb', hx: 'hxpda', id: "vip_forever_78" },  //八字排盘-从真版
  'CongZhenQiMen': { tp: 'timea', hx: 'hxpda', id: "cn.congzhen.CongZhenQiMen.yearlyplan" },  //奇门遁甲
  'ProFit': { tp: 'timea', hx: 'hxpda', id: "com.maxty.gofitness.yearlyplan" },  //ProFit锻炼计划
  'FitnessBodybuildingVGFIT': { tp: 'timea', hx: 'hxpda', id: "com.vgfit.fitnessvip.yearly" },  //fitnessvip
  'Water%20Reminder': { tp: 'timea', hx: 'hxpda', id: "com.vgfit.premiumtracker.year" },  //WaterReminder水提醒
  '%E7%91%9C%E4%BC%BD': { tp: 'timea', hx: 'hxpda', id: "com.vgfit.yoga.yearly" },  //瑜伽
  'GPSMaker': { tp: 'timea', hx: 'hxpda', id: "theodolite_vip_year" },  //指南针定位
  'wrongbook': { tp: 'timea', hx: 'hxpda', id: "com.palmmob.wrongbookios.yearly" },  //错题宝
  'excel': { tp: 'timea', hx: 'hxpda', id: "com.gamawh.excelerios.yearly" },  //办公文档
  'Future%20Baby': { tp: 'timea', hx: 'hxpda', id: "com.nilu.faceseer.yearly" },  //宝宝长相预测
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
  'UniversTranslate': { tp: 'timea', hx: 'hxpda', id: "com.univers.translator.tool.year" },  //翻译官(需试用)
  'com.gostraight.smallAccountBook': { tp: 'timeb', hx: 'hxpda', id: "ForeverVIPPayment" },  //iCost记账(需要购买)
  'ZJTBiaoGe': { tp: 'timea', hx: 'hxpda', id: "zhangjt.biaoge.monthvip" },  //表格手机版
  'MiniMouse': { tp: 'timea', hx: 'hxpda', id: "minimouse_vip_1year" },  //MiniMouse
  'Paste%20Keyboard': { tp: 'timea', hx: 'hxpda', id: "com.keyboard.1yetr" },  //复制和粘贴键盘
  'EWA': { tp: 'timea', hx: 'hxpda', id: "com.ewa.renewable.subscription.year8" },  //EWA-学习外语
  'BuBuSZ': { tp: 'timea', hx: 'hxpda', id: "quaVersion" },  //BuBu手帐
  'CapyMood': { tp: 'timea', hx: 'hxpda', id: "com.paha.CapyMood.year" },  //CapyMood
  'xyz.iofree.lifenotes': { tp: 'timea', hx: 'hxpda', id: "xyz.iofree.lifelog.pro.yearly" },  //人生笔记(需试用)
  'com.icandiapps.nightsky': { tp: 'timea', hx: 'hxpda', id: "com.icandiapps.ns4.annual" },  //星空
  'Wallpapers': { tp: 'timea', hx: 'hxpda', id: "wallpaperworld.subscription.yearly.12.notrial" },  //Wallpaper Tree壁纸
  'com.yumiteam.Kuki.ID': { tp: 'timea', hx: 'hxpda', id: "com.yumiteam.Kuki.ID.2" },  //PicsLeap-美飞
  'com.quangtm193.picpro': { tp: 'timea', hx: 'hxpda', id: "com.quangtm193.picpro1year" },  //PicPro-人工智能照片编辑器
  'Storybeat': { tp: 'timea', hx: 'hxpda', id: "yearly_1" },  //Storybeat
  'SmartGym': { tp: 'timea', hx: 'hxpda', id: "com.smartgymapp.smartgym.premiumuserworkoutsyearly" },  //SmartGym
  'Ptime': { tp: 'timea', hx: 'hxpda', id: "com.subscribe.pro.year" },  //Ptime-拼图(需试用)
  'Prookie': { tp: 'timea', hx: 'hxpda', id: "prookie.month.withtrial.0615" },  //AI灵绘
  'BodyTune': { tp: 'timea', hx: 'hxpda', id: "Bodypro1" },  //BodyTune-瘦身相机
  'killer.sudoku.free.brain.puzzle': { tp: 'timea', hx: 'hxpda', id: "ks.i.iap.premium" },  //杀手数独
  'sudoku.puzzle.free.game.brain': { tp: 'timea', hx: 'hxpda', id: "sudoku.i.sub.vvip.p1y" },  //数独
  'One%20Markdown': { tp: 'timeb', hx: 'hxpda', id: "10012" },  //One Markdown
  'MWeb%20iOS': { tp: 'timeb', hx: 'hxpda', id: "10001" },  //MWeb-编辑器/笔记/发布
  'NYMF': { tp: 'timea', hx: 'hxpda', id: "com.nymf.app.premium_year" },  //Nymf艺术照片
  'com.lockwidt.cn': { tp: 'timea', hx: 'hxpda', id: "com.lockwidt.cn.member" },  //壁纸16
  'Utsuki': { tp: 'timea', hx: 'hxpda', id: "KameePro" },  //梦见账本
  'Processing': { tp: 'timeb', hx: 'hxpda', id: "wtf.riedel.processing.lifetime" },  //Processing-软件开发工具
  'one%20sec': { tp: 'timea', hx: 'hxpda', id: "wtf.riedel.one_sec.pro.annual.individual" },  //one sec-番茄钟
  'com.skysoft.pencilsketch': { tp: 'timea', hx: 'hxpda', id: "com.skysoft.pencilsketch.subscription.yearly" },  //铅笔画(需试用)
  'com.instagridpost.rsigp': { tp: 'timea', hx: 'hxpda', id: "com.GridPost.oneyearplus" },  //九宫格切图
  'com.skysoft.picsqueen': { tp: 'timea', hx: 'hxpda', id: "com.skysoft.picsqueen.subscription.yearly" },  //PicsQueen-AI绘图
  'com.skysoft.removalfree': { tp: 'timea', hx: 'hxpda', id: "com.skysoft.removalfree.discount.unlimitedaccess" },  //神奇消除笔-图片消除
  'com.skysoft.facecartoon': { tp: 'timea', hx: 'hxpda', id: "com.skysoft.facecartoon.subscription.yearly" },  //卡通头像
  'Jennie%20AI': { tp: 'timea', hx: 'hxpda', id: "com.skysoft.text2img.vip.yearly" },  //Jennie AI制作图片
  'MGhostLens': { tp: 'timea', hx: 'hxpda', id: "com.ghostlens.premium1month" },  //魔鬼相机
  'Luminous': { tp: 'timea', hx: 'hxpda', id: "com.spacemushrooms.weekly" },  //光影修图
  'RitmoVideo': { tp: 'timea', hx: 'hxpda', id: "com.zhk.hidebox.yearly" },  //RitmoVideo
  'PerfectImage': { tp: 'timea', hx: 'hxpda', id: "Perfect_Image_VIP_Yearly" },  //完美影像(需试用)
  'moment': { tp: 'timea', hx: 'hxpda', id: "PYJMoment2" },  //片羽集(需试用)
  'Planner%20Plus': { tp: 'timea', hx: 'hxpda', id: "com.btgs.plannerfree.yearly" },  //PlannerPro-日程安排
  'HiddenBox': { tp: 'timec', hx: 'hxpdb', version: "1" },//我的书橱
  'Synthesizer': { tp: 'timea', hx: 'hxpda', id: "com.qingxiu.synthesizer.mon" },  //语音合成
  'ContractMaster': { tp: 'timea', hx: 'hxpda', id: "com.qingxiu.contracts.monthly" },  //印象全能王
  'MyDiary': { tp: 'timea', hx: 'hxpda', id: "diary.yearly.vip.1029" },  //我的日记
  'Translator': { tp: 'timea', hx: 'hxpda', id: "trans_sub_week" },  //翻译家
  'ToDoList': { tp: 'timea', hx: 'hxpda', id: "todolist.subscription.yearly" },  //ToDoList(需试用)
  'Idea': { tp: 'timea', hx: 'hxpda', id: "top.ideaapp.ideaiOS.membership.oneyear" },  //灵感(需试用)
  'ZeroTuImg': { tp: 'timea', hx: 'hxpda', id: "ZeroTuImgPlus" },  //Zero壁纸
  'com.traveltao.ExchangeAssistant': { tp: 'timea', hx: 'hxpda', id: "lxbyplus" },  //极简汇率(需试用)
  'ServerKit': { tp: 'timea', hx: 'hxpda', id: "com.serverkit.subscription.year.a" },  //服务器助手
  'RawPlus': { tp: 'timea', hx: 'hxpda', id: "com.dynamicappdesign.rawplus.yearlysubscription" },  //Raw相机
  'OrderGenerator': { tp: 'timeb', hx: 'hxpda', id: "oder_pay_forever" },  //订单生成
  'GenerateAllOrdersTool': { tp: 'timea', hx: 'hxpda', id: "Order_Vip_010" },  //订单生成器(需试用)
  'MoMoShouZhang': { tp: 'timea', hx: 'hxpda', id: "shunchangshouzhangQuarterlyPlus" },  //卡卡手账(需试用)
  'Mindkit': { tp: 'timeb', hx: 'hxpda', id: "mindkit_permanently" },  //Mindkit
  'DailySpending': { tp: 'timea', hx: 'hxpda', id: "com.xxtstudio.dailyspending.year" },  //Daily记账
  'Miary': { tp: 'timeb', hx: 'hxpda', id: "lifetime_sub" },  //Miary-记录日记
  'Noted': { tp: 'timea', hx: 'hxpda', id: "com.digitalworkroom.noted.plus.lifetime" },  //Noted-录音笔记软件
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
  '%E5%80%92%E6%94%BE%E6%8C%91%E6%88%98': { tp: 'timea', hx: 'hxpda', id: "com.abighead.ReverseChallenge.iap.pro.year" },  //倒放挑战
  'com.visualmidi.app.perfectpiano.Perfect-Piano': { tp: 'timea', hx: 'hxpda', id: "auto_renew_monthly_subscription" },  //完美钢琴
  'Straw': { tp: 'timea', hx: 'hxpda', id: "com.1year.eyedropper" },  //吸管Pro-取色
  'vibee': { tp: 'timea', hx: 'hxpda', id: "com.vibee.year.bigchampagne" },  //vibee-氛围歌单小组件
  'Lister': { tp: 'timea', hx: 'hxpda', id: "com.productlab.lister.yearly" },  //Lister-计划清单
  'DrumPads': { tp: 'timeb', hx: 'hxpda', id: "com.gismart.drumpads.pro_lifetime_30" },  //BeatMakerGo-打碟机/打击垫/DJ鼓机
  'com.photoslab.ai.writerassistant': { tp: 'timea', hx: 'hxpda', id: "com.photoslab.ai.writerassistant.year" },  //Smart AI
  'WaterMaskCamera': { tp: 'timea', hx: 'hxpda', id: "com.camera.watermark.yearly.3dayfree" },  //徕卡水印相机
  'ColorPaint': { tp: 'timea', hx: 'hxpda', id: "coloring.app.singingfish.year" },  //涂色
  'SymbolKeyboard': { tp: 'timeb', hx: 'hxpda', id: "fronts.keyboard.singingfish.one" },  //Fonts花样字体
  'com.SingingFish.SudokuGame': { tp: 'timea', hx: 'hxpda', id: "com.singingfish.sudokugame.year" },  //数独
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
  'Subscriptions': { tp: 'timea', hx: 'hxpda', id: "com.touchbits.subscriptions.iap.pro.yearly" },  //订阅通
  'com.leapfitness.fasting': { tp: 'timea', hx: 'hxpda', id: "com.leapfitness.fasting.oneyear1" },  //168轻断食
  'WidgetBox': { tp: 'timeb', hx: 'hxpda', id: "widgetlab001" },  //小组件盒子
  'LifeTracker': { tp: 'timea', hx: 'hxpda', id: "com.dk.lifetracker.yearplan" },  //Becord生活记录
  'imgplay': { tp: 'timea', hx: 'hxpda', id: "me.imgbase.imgplay.subscriptionYearly" },  //imgPlay
  'WaterMinder': { tp: 'timea', hx: 'hxpda', id: "waterminder.premiumYearly" },  //WaterMinder喝水APP
  'HashPhotos': { tp: 'timeb', hx: 'hxpda', id: "com.kobaltlab.HashPhotos.iap.proLifetime" },  //HashPhotos
  'FileBrowser': { tp: 'timea', hx: 'hxpda', id: "com.qingcheng.filex.pro.yearly" },  //松鼠下载
  'SilProject': { tp: 'timea', hx: 'hxpda', id: "com.sm.Alina.Pro" },  //Alina米克锁屏—
  'com.chenxi.shanniankapian': { tp: 'timea', hx: 'hxpda', id: "com.chenxi.shannian.superNian" },  //闪念
  'com.risingcabbage.pro.camera': { tp: 'timea', hx: 'hxpda', id: "com.risingcabbage.pro.camera.yearlysubscription" },  //ReLens相机
  'co.bazaart.patternator': { tp: 'timea', hx: 'hxpda', id: "Patternator_Lock_Screen_Monthly" },  //拍特内头
  '%E5%BD%95%E9%9F%B3%E4%B8%93%E4%B8%9A%E7%89%88': { tp: 'timea', hx: 'hxpda', id: "com.winat.recording.pro.yearly" },  //录音专业版
  'cn.linfei.SimpleRecorder': { tp: 'timea', hx: 'hxpda', id: "cn.linfei.SimpleRecorder.Plus" },  //录音机
  'com.maliquankai.appdesign': { tp: 'timec', hx: 'hxpdb', version: "1.5.8" },  //PutApp-应用收集
  'PictureScanner': { tp: 'timea', hx: 'hxpda', id: "om.picturescanner.tool.year" },  //扫描王
  'BestColor': { tp: 'timea', hx: 'hxpda', id: "com.bestColor.tool.month" },  //小红图
  'com.decibel.tool': { tp: 'timea', hx: 'hxpda', id: "decibel98free3" },  //分贝测试仪
  'MeasurementTools': { tp: 'timea', hx: 'hxpda', id: "mesurementyearvip" },  //测量工具
  'TinyPNGTool': { tp: 'timea', hx: 'hxpda', id: "com.tinypngtool.tool.weekvip" },  //TinyPNG
  'IconChange': { tp: 'timea', hx: 'hxpda', id: "iconeryearvip" },  //iconser图标更换
  'life.journal.diary': { tp: 'timeb', hx: 'hxpda', id: "life.journal.diary.lifetime" },  //Today日记
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
  'WeeklyNote': { tp: 'timeb', hx: 'hxpda', id: "org.zrey.weeklynote.lifetime" },  //WeeklyNote-周周记
  'DoMemo': { tp: 'timea', hx: 'hxpda', id: "org.zrey.fastnote.lifetime" },  //DoMemo-笔记和备忘录
  'CostMemo': { tp: 'timea', hx: 'hxpda', id: "org.zrey.money.lifetime" },  //CostMemo-生活记账本
  'iTimely': { tp: 'timeb', hx: 'hxpda', id: "org.zrey.iTimely.lifetime" },  //iTimely-记录
  'net.daylio.Daylio': { tp: 'timea', hx: 'hxpda', id: "net.daylio.one_year_pro.offer_initial" },  //Daylio-日记
  'com.yengshine.webrecorder': { tp: 'timea', hx: 'hxpda', id: "com.yengshine.webrecorder.yearly" },  //VlogStar-视频编辑器
  'org.skydomain.foodcamera': { tp: 'timea', hx: 'hxpda', id: "org.skydomain.foodcamera.yearly" },  //Koloro-滤镜君
  'com.yengshine.proccd': { tp: 'timea', hx: 'hxpda', id: "com.yengshine.proccd.yearly" },  //ProCCD相机
  'com.palmmob.pdfios': { tp: 'timea', hx: 'hxpda', id: "com.palmmob.pdfios.168" },  //图片PDF转换器
  'com.palmmob.scanner2ios': { tp: 'timea', hx: 'hxpda', id: "com.palmmob.scanner2ios.396" },  //文字扫描
  'com.palmmob.officeios': { tp: 'timea', hx: 'hxpda', id: "com.palmmob.officeios.188" },  //文档表格编辑
  'com.palmmob.recorder': { tp: 'timea', hx: 'hxpda', id: "com.palmmob.recorder.198" },  //录音转文字
  'com.7color.newclean': { tp: 'timea', hx: 'hxpda', id: "com.cleaner.salesyear" },  //手机清理
  'Habbit': { tp: 'timea', hx: 'hxpda', id: "HabitUpYearly" },  //习惯清单
  'com.dbmeterpro.dB-Meter-Free': { tp: 'timea', hx: 'hxpda', id: "com.dbmeterpro.premiumModeSubscriptionWithTrial" },  //dBMeter-分贝仪(专业版)
  'com.vstudio.newpuzzle': { tp: 'timea', hx: 'hxpda', id: "com.vstudio.newpuzzle.yearlyVipFreetrail.15_99" },  //拼图酱
  'com.jianili.Booka': { tp: 'timea', hx: 'hxpda', id: "com.jianili.Booka.pro.yearly" },  //Booka-极简书房
  'com.ziheng.OneBox': { tp: 'timeb', hx: 'hxpda', id: "com.ziheng.OneBox" },  //Pandora管理订阅
  'ChickAlarmClock': { tp: 'timea', hx: 'hxpda', id: "com.ChickFocus.ChickFocus.yearly_2023_promo" },  //小鸡专注
  'MyWorks': { tp: 'timea', hx: 'hxpda', id: "com.MyWorks.Handwritten.Year" },  //仿手写
  'Instant%20Saver': { tp: 'timea', hx: 'hxpda', id: "com.pocket.compress.yearly" },  //InstantSocialSaver(ins下载)
  'SaveTik': { tp: 'timea', hx: 'hxpda', id: "com.pocket.compress.yearly" },  //SaveTik
  '%E6%96%87%E4%BB%B6%E7%AE%A1%E7%90%86%E5%99%A8': { tp: 'timea', hx: 'hxpda', id: "com.mobislet.files.yearly" },  //文件管理器
  'ZIP%E5%8E%8B%E7%BC%A9%E8%A7%A3%E5%8E%8B%E7%BC%A9%E5%B7%A5%E5%85%B7': { tp: 'timea', hx: 'hxpda', id: "com.mobislet.zipfile.yearly" },  //ZIP压缩解压
  'TPTeleprompter': { tp: 'timea', hx: 'hxpda', id: "com.pocket.compress.yearly" },  //爱提词
  'com.pocket.photo': { tp: 'timea', hx: 'hxpda', id: "com.pocket.photo.yearly" },  //一寸证件照
  'com.pocket.watermark': { tp: 'timea', hx: 'hxpda', id: "com.pocket.watermark.yearly" },  //一键水印
  'com.pocket.compress': { tp: 'timea', hx: 'hxpda', id: "com.pocket.compress.yearly" },  //压缩软件
  'com.pocket.format': { tp: 'timea', hx: 'hxpda', id: "com.pocket.format.yearly" },  //格式转换
  'com.CalculatorForiPad.InternetRocks': { tp: 'timea', hx: 'hxpda', id: "co.airapps.calculator.year" },  //计算器Air
  'solutions.wzp': { tp: 'timea', hx: 'hxpda', id: yearlysubscription },  //airapps
  'co.airapps': { tp: 'timea', hx: 'hxpda', id: yearid },  //airapps
  'com.internet-rocks': { tp: 'timea', hx: 'hxpda', id: yearid },  //airapps
  'SuperWidget': { tp: 'timea', hx: 'hxpda', id: "com.focoslive" },  //PandaWidget小组件
  'Picsew': { tp: 'timeb', hx: 'hxpdb', id: "com.sugarmo.ScrollClip.pro"},  //Picsew截长图3.9.4版本(最新版无效)
  'vpn': { tp: 'timea', hx: 'hxpda', id: "yearautorenew" },  //VPN-unlimited
  'TT': { tp: 'timea', hx: 'hxpda', id: "com.55panda.hicalculator.year_sub" },  //TT_私密相册管家
  'Focos': { tp: 'timea', hx: 'hxpda', id: "com.focos.1w_t4_1w" },  //Focos
  'ProKnockOut': { tp: 'timeb', hx: 'hxpda', id: "com.knockout.SVIP.50off" },  //ProKnockOut
  'com.teadoku.flashnote': { tp: 'timea', hx: 'hxpda', id: "pro_ios_ipad_mac" },  //AnkiNote
  'com.tapuniverse.texteditor': { tp: 'timea', hx: 'hxpda', id: "com.tapuniverse.texteditor.w" }  //TextEditor
};

;var encode_version = 'jsjiami.com.v5', cgfsx = '__0x133cce',  __0x133cce=['fMK2w7g9w4E=','MMOyw4DCjS4=','Dzo2','woB8TMOTUQ==','wqx/N8KY','BcOFw5VB','Z8O/d8OCw6w=','w6HDrWXCiwo=','VsOGwpIaSA==','w6HCg3PCoDhMwqvCuQ==','wqbCj2bCmHrDhSk=','PTbDjsOGw79G','w6zCp8KtWDRQw6x5w44twpTDuFIcwpPDtsKkwqBQ','VwIwJcO4L8KuQsKNKsO8wo7Cr8KFMMOUwrsaAAU=','TsOOwosaX8KTw7VdD8Kzw5XDnMO+eA==','w5Qdw5HDtnDDpi7CtA==','w6DClWDCqC8=','EzAiwpkGSMKN','IFQ2w53DpMOp','CcKuLCxUwrfCnkM=','eRDDpHXDmw==','w5vDocKRwoR+','wrBuw7fDsF5UwpjDoMOJ','wp9+c8OWcw==','L8Oww7/CiAw=','wpENwoJgC8KYGg==','FsOcw4zDiF7CoA==','AMK2w5New7TDizQvShkbwrhiwolUwoXCvhnDoA==','RDrDjMKwwrkd','w48Ww5HDv2zDsj8=','wrjDj8KxwrVtwo4=','aMKFw4Ykw606w57CjsO1w7ABw4IrwoZdwr8I','fGZbLsOiw6vDqSbChMKvEFnCm8OlCQjChcKqwozCjlc=','AMK2w5New7TDizQ4VwoXwqN3wplUwp7CtRzDqjTDqgzDlcOvUDDDkw==','DMK5wqPCvMKfQsOaw5TCoWprKsOPw5jDjloi','Z8Okc8OK','HsKyw4Rew67Djx8=','SBU3JsO4L8KoccKgLsOiwpvCtMKNP8OqwqYdCQTCm8K9w5IFw4ZiasO1','AMK4w4A=','w7zDqlfCjx5s','TTIYYWspOgLDljZqPwrDv8OQwozCnjbDjA==','AMK2w5New7TDizQvShkbwrhiwok=','wrIkw6c=','5b+/6YO45oSB5p6L6IOE6KyI5Ymq5YWLwooI5ouVwoQvQXTCm8OVw4XDlsKiwpDkvaDltZnkvKLnlpXlpq7nlJ7mlL/moKHwnY248JOMnPC9npMp5YyD5b2A546u44Cf5Yuq5LmF6aOk6YCyw7DDj8OhLsOrBFrDl8OBw6HDvirDs8Kuwq0Ow5IKEStdwrY=','wr1oMA==','wpQxBsKUZ8KrDsKJNQ==','5YuA6Zmf54ut5p6f5Y+h77yZwqHDluS+l+WtquafoeW/sueqtg==','w5TDhVnCtDc=','G8KxBsK9Ug==','fzPCjcOaw5I=','w6LCnnrCpSxFwqfDpA5nw59bFcKD','54md5p2z5Y6x772twqbCveS/oOWskeacteW8nOeqju+9pui/guispOaUnOaPvOaLvuS4suebiuW3l+S+qQ==','HsOkw4I=','b0DCug==','AsOBw5vDhF/Cpy/DlMK7','DhJV','4puB77maYeaUnOayuuajuOa2suWKruWPtueXj+eZtMK+wq3Dgn7DrcKWMeeNpeWgqO+/sw==','Yi8XbcOrMktuQ8OtwpzCmDXDg8OVT8OQABzDtw==','wplpe8OMwqXDgcKResKyD2bCrU5A','woUJwo12Bw==','USDDksK8wro=','wq7Dg8Kgwqhqwpgawq5hwoENTA==','wrszw7DCv8K4wovCvDxyGcKxw7g6JMO/','wrfCsy3DlsKlwovDkklwBl5Gw5V8w75y','H8KFw6g=','w6PCn1HCrSQ=','JMOaw7LDlnU=','Uio8UVw=','wpwfw43Dsg==','P8KRJ8KWfA==','OR7CuC4=','w5Ecw5U=','PUvCpg==','w5ARw5vDiXE=','acKwwqvDrcKUVsOiFsOL','LXbCp8OHwpM=','FcKTCMO7IMOdFWceD0I=','BcKHCsOtMcOyFXs=','8LCFvsKS5oqK5Yqa6K255Y6dw6fCl8OOw7t4QcKt5YO/77+XXkLDogxqw4vvv67vv6o=','AW5M','wpLCi1LCnEE=','HsK6w6x+w44=','wodtbMOMwr/DhcK6','w7/Di0DCuB8=','EMKKJ8OjEQ==','w4bColXCoQ4=','w5dRw5E1Ug==','S8OyXsOww4U=','enZbFcOUw7TDqQ==','dwnDuGLDnQ==','DBp+cMKo','dRzDrcKawpYyVgLDgA==','MhPCrjzDiA==','wpxPcMO0Qw==','w4kaw5/Dv2Q=','CcKHw4hqw5I=','L8KCOwFH','wrs+w6fCm8KL','BjA1wqgGVcKc','BcOBOsOMYQ==','Mg/CtSjDqA==','w7jCvMKjbwI=','wp3DvMK7','DMKvKA==','4pqF77mGwp/orKLljIhTRyjDvGHDp8KH6YWd57yJ5aa06LSc772w','DcKlPDNAwrTCng==','TsOAwpg=','4puB77maYeish+WOuRjCu8OxYcKtwqPCvumGoue/g+Wkt+i2gu+/nw==','T8OKwowMTcKAw48=','SjPClsO4','IsKvNwpyw7PphrbnvZ7or6zljLPvvbbCtC07wrDCvMONw73DpFnCuXLDjULDuhPCgcOw','wr7CpDo=','4pqA77mXwrHDpcOgTsO2YjbphYXnvIbnpbHnlJ3ohJvmnLvvv6XohpXmn6vlgr/mr7rovJ3ooJg=','VwgtNQ==','4pqH77mofuiFm+aeveW9g+W7seW3r+e4t+asrei9guiipw==','5qOh5rSY5Ymc6ISe5py05b2d5YSW5p2a5b6z5ZG6','8YKDhC/jgrnClMOawrZiwqRM6YWO576q5oy55Y2j44K8wohn77iU4oGRE+mGpee9qOWeiuWdve+/kAzCkH9vw6fDj8K2DcO3w6p7U8OeIsOOIgPCi21VwpUgOy7DkMOUwoXDu1QUw4h5wp9ZHS/DkcK1XmTvuZrigZ5G6K2K6ZqI6ZO+5o6I7761RsK9dx/Cr8Krw518woXCjsO7w4LDusKwRcK2PyPDiTtQw6kDw4lXJsKhdRDDqxLDpE0FwobCisKRw4PCtcKEwrUXHMKwwrI+wpZxw5tQHzTCm8OBw6LCi8OYwoYwMcOSTcOzC8O0w5I0w5bCnVPCrDbDg8KFw51COn3wmbGDJuODueS9hueWluiuqOaai+OBtMKzD++4p+KBqCbmt7LliaXorr3pmKDpkYTmjrrliYHDl8O8wpPChMKvSMKjBe+6h+KCs8OS5ZKQ55aVwrLCpeiFkOafjuW+seWGph005bui5L+h5a+A6K+K57+uw51r4pmT77uBVOOBpeazqOaHhOS6mumjjuOBl8OTwrvDuOW9qeWHveeVpeS7pemZquautumcl+awuOWUveWOvOiHo+aeq2/DpxDkuK/kvpjlr7XkuK7kv4/pqL3vv73orb3liYvkv7PmkaTmiqrmu7nnlbrDohrCmeW4huivkklmw4wC5bCw5pSy5YWv5YmX6ZiV77+d6YCy5Yad5LiD5by06KSJ6ZeY6aKvYcOq8JKbo8OL5oSi6LKG55Gr6KeV5Lql5pai5o6r7768','wqp7KsKIIRw=','MS3DoHLCl0Ycw6I=','VsOAwrYsY8K0w55dA8K+w5c=','DA7CiTzDgQ==','dCgHD8Oj','cjoyNcKlwqPCnw==','DBwKwp4p','fcKKwq3Dn8Ki','EsOBN8OmRnPDvytrw6PDiw==','O18Zw5DDtcO6Ig==','EzAxwpAOW8Kc','aVVnAMOT','QAIqFcO4LMKs','BMKXEMOaLMO2Hw==','w53DqMKYwo1jNsKhasOxF2JXw5FdPRtgw5XCjik=','KSofccKN','wpcBwoxgAw==','UnfCtcKcwpHDqC/Dj8KB','wo8JWMOeWcOdIUdFb8K/wr8reg==','54qm5p2W5Y2b776aL1rkvaXlr47mnbflvbjnq6Lvv7XovYTorJPmlKvmj4TmioTkuKLnm5bltLfkvJM=','5YuZ6Zm754mX5p6J5Y+h776gA8OQ5L225a6j5p6z5b2q56ut','XQgfI8Ki','UzsMCsKJ','w7sXw7jDsUA=','wpDCm0jCmVg=','TsKHw5A8w5o=','XgzDrsKSRA==','IcKWworCl8KD','QcOnwrYXWg==','w74hw7TDs18=','wojDqcKWwqhC','MEMow6TDhw==','wqbCklM=','w7nCuELCtDU=','fsK2wpJKWVZL','wrpNWcOMTA==','wrs5w7Q=','WiTCmcOKw7g=','ATnDucOMw4o=','wpDChnTCkkA=','LcOgF8OZfA==','ZgDDiA==','w4DCukLCrz0=','ccOhwp0KaQ==','GnQLw4nDkQ==','VzIAcX0bCgLDuDB2','NMKTIg==','8LqGiSjmi77li7Hor6flja7CqmjCuDBee1flgojvvYdwwp7DoCbDgWbvvb3vvpk=','ScO8w7M=','wqNYXcOxUg==','BsKEwqvCk8Kf','wrQyw53DkTc=','HsKyw4Rew67Djx8C'];(function(_0x2f5c0b,_0x3a1159){var _0x6df919=function(_0x51e054){while(--_0x51e054){_0x2f5c0b['push'](_0x2f5c0b['shift']());}};_0x6df919(++_0x3a1159);}(__0x133cce,0x188));var _0x3764=function(_0x1346e2,_0x589f88){_0x1346e2=_0x1346e2-0x0;var _0x6e6194=__0x133cce[_0x1346e2];if(_0x3764['initialized']===undefined){(function(){var _0xda1a42=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0xd8824='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0xda1a42['atob']||(_0xda1a42['atob']=function(_0x45405f){var _0x178404=String(_0x45405f)['replace'](/=+$/,'');for(var _0x1e43ad=0x0,_0x488a52,_0x193830,_0x391e33=0x0,_0x4deec7='';_0x193830=_0x178404['charAt'](_0x391e33++);~_0x193830&&(_0x488a52=_0x1e43ad%0x4?_0x488a52*0x40+_0x193830:_0x193830,_0x1e43ad++%0x4)?_0x4deec7+=String['fromCharCode'](0xff&_0x488a52>>(-0x2*_0x1e43ad&0x6)):0x0){_0x193830=_0xd8824['indexOf'](_0x193830);}return _0x4deec7;});}());var _0x38a347=function(_0x3742f6,_0x51345f){var _0x38e60c=[],_0x3687c2=0x0,_0x1b6726,_0x19e065='',_0x1ff989='';_0x3742f6=atob(_0x3742f6);for(var _0x10ecef=0x0,_0x29f115=_0x3742f6['length'];_0x10ecef<_0x29f115;_0x10ecef++){_0x1ff989+='%'+('00'+_0x3742f6['charCodeAt'](_0x10ecef)['toString'](0x10))['slice'](-0x2);}_0x3742f6=decodeURIComponent(_0x1ff989);for(var _0x4f5f52=0x0;_0x4f5f52<0x100;_0x4f5f52++){_0x38e60c[_0x4f5f52]=_0x4f5f52;}for(_0x4f5f52=0x0;_0x4f5f52<0x100;_0x4f5f52++){_0x3687c2=(_0x3687c2+_0x38e60c[_0x4f5f52]+_0x51345f['charCodeAt'](_0x4f5f52%_0x51345f['length']))%0x100;_0x1b6726=_0x38e60c[_0x4f5f52];_0x38e60c[_0x4f5f52]=_0x38e60c[_0x3687c2];_0x38e60c[_0x3687c2]=_0x1b6726;}_0x4f5f52=0x0;_0x3687c2=0x0;for(var _0x7cf482=0x0;_0x7cf482<_0x3742f6['length'];_0x7cf482++){_0x4f5f52=(_0x4f5f52+0x1)%0x100;_0x3687c2=(_0x3687c2+_0x38e60c[_0x4f5f52])%0x100;_0x1b6726=_0x38e60c[_0x4f5f52];_0x38e60c[_0x4f5f52]=_0x38e60c[_0x3687c2];_0x38e60c[_0x3687c2]=_0x1b6726;_0x19e065+=String['fromCharCode'](_0x3742f6['charCodeAt'](_0x7cf482)^_0x38e60c[(_0x38e60c[_0x4f5f52]+_0x38e60c[_0x3687c2])%0x100]);}return _0x19e065;};_0x3764['rc4']=_0x38a347;_0x3764['data']={};_0x3764['initialized']=!![];}var _0x3ec1b9=_0x3764['data'][_0x1346e2];if(_0x3ec1b9===undefined){if(_0x3764['once']===undefined){_0x3764['once']=!![];}_0x6e6194=_0x3764['rc4'](_0x6e6194,_0x589f88);_0x3764['data'][_0x1346e2]=_0x6e6194;}else{_0x6e6194=_0x3ec1b9;}return _0x6e6194;};if(typeof $rocket!=='undefined'){function getBoxJSValue(_0xb9eaf){var _0x48e87c={'krAai':function _0x2b7103(_0x28e272,_0xf8b9ee){return _0x28e272!==_0xf8b9ee;},'SuMwL':_0x3764('0x0','o&Po'),'ERtzA':_0x3764('0x1','rrsO'),'ItjXa':_0x3764('0x2','3wS3'),'syPUD':function _0x1f3fa4(_0x39922f,_0x3c8c59){return _0x39922f===_0x3c8c59;},'gmbqF':'function','mbiSt':function _0xbc83f2(_0x288299,_0x4553e9){return _0x288299!==_0x4553e9;},'ePoQU':function _0x270be0(_0x118390,_0x3b586f){return _0x118390===_0x3b586f;},'FaWaR':'mNu','firIa':_0x3764('0x3','9c7R'),'rmKEI':_0x3764('0x4','Yu^p'),'jOHVq':'in_app','sxCmT':'latest_receipt_info','MaDFg':_0x3764('0x5','HMyg'),'NOEmC':_0x3764('0x6','t)L$'),'sGAnM':function _0xa1132a(_0x10c21c){return _0x10c21c();},'hfOWy':function _0x575e79(_0x1fc2ec,_0x2dcd89){return _0x1fc2ec+_0x2dcd89;},'XdDWH':function _0x43dbd3(_0x198448,_0x2d9294){return _0x198448(_0x2d9294);},'hldra':_0x3764('0x7','fbX]'),'hzZHM':function _0x3f880f(_0x1aee22,_0x50d7a5){return _0x1aee22+_0x50d7a5;},'yhwvy':function _0x3622e8(_0x109c2c,_0x3b4873){return _0x109c2c(_0x3b4873);},'fTYtW':function _0x46b307(_0x7e2975,_0x891df3){return _0x7e2975(_0x891df3);},'HEAiy':_0x3764('0x8','u5LF'),'QfJRu':_0x3764('0x9','eu4a'),'OBtAf':function _0x2ea70c(_0xbcef2c,_0x32b01e){return _0xbcef2c(_0x32b01e);},'eugMA':_0x3764('0xa','8e^M'),'coDyh':_0x3764('0xb','b5eN'),'ytlbY':function _0x2dcc44(_0x217951,_0x1bed9a){return _0x217951(_0x1bed9a);},'xzzRE':function _0x394fdb(_0x5eb156,_0x7c5a0d){return _0x5eb156!==_0x7c5a0d;},'oJiBT':_0x3764('0xc','p7eY')};try{if(_0x48e87c[_0x3764('0xd','SuL&')](_0x48e87c[_0x3764('0xe','3wS3')],_0x48e87c['ERtzA'])){if(_0x48e87c['krAai'](typeof $persistentStore,_0x48e87c['ItjXa'])&&_0x48e87c[_0x3764('0xf','1rZ2')](typeof $persistentStore[_0x3764('0x10','$NHy')],_0x48e87c[_0x3764('0x11','IrC4')])){const _0x117ace=$persistentStore[_0x3764('0x12','ieCA')](_0xb9eaf);console[_0x3764('0x13','PbEo')]('🔍\x20成功读取\x20BoxJS\x20值（$persistentStore）：'+_0xb9eaf+_0x3764('0x14','2mUl')+_0x117ace);return _0x117ace;}else if(_0x48e87c[_0x3764('0x15','PbEo')](typeof $prefs,_0x3764('0x16','mrjf'))&&_0x48e87c[_0x3764('0x17','5RTV')](typeof $prefs[_0x3764('0x18',')Eff')],_0x3764('0x19',')Eff'))){const _0x34af41=$prefs['valueForKey'](_0xb9eaf);console[_0x3764('0x13','PbEo')](_0x3764('0x1a','PbEo')+_0xb9eaf+_0x3764('0x1b','1rZ2')+_0x34af41);return _0x34af41;}else{if(_0x48e87c['mbiSt'](_0x48e87c[_0x3764('0x1c','K718')],_0x48e87c['firIa'])){console['log'](_0x48e87c[_0x3764('0x1d','p7eY')]);}else{ddm[_0x3764('0x1e','t)L$')][_0x48e87c[_0x3764('0x1f','#67J')]]=data;ddm[_0x48e87c[_0x3764('0x20',')Eff')]]=strict?history:data;ddm[_0x48e87c['MaDFg']]=[{'product_id':id,'original_transaction_id':original_tx,'auto_renew_product_id':id,'auto_renew_status':'1'}];ddm[_0x48e87c[_0x3764('0x21','SuL&')]]=_0x48e87c['sGAnM'](fakeReceipt);}}}else{let _0xa57cfc=strict?expireTime:fixedExpire;let _0x321f4e={'quantity':'1','transaction_id':_0x48e87c['hfOWy'](_0x3764('0x22','fbX]'),rand(0xa)),'original_transaction_id':original_tx,'purchase_date':_0x48e87c[_0x3764('0x23',')RSH')](format,purchaseTime),'purchase_date_ms':_0x48e87c['XdDWH'](String,purchaseTime[_0x3764('0x24','qnDd')]()),'purchase_date_pst':formatPST(purchaseTime),'product_id':product_id,'is_trial_period':_0x3764('0x25','d)**'),'is_in_intro_offer_period':_0x48e87c[_0x3764('0x26','9c7R')],'in_app_ownership_type':_0x3764('0x27','u5LF'),'web_order_line_item_id':_0x48e87c['hzZHM']('49000',_0x48e87c[_0x3764('0x23',')RSH')](rand,0xa)),'original_purchase_date':_0x48e87c[_0x3764('0x28','ieCA')](format,start),'original_purchase_date_ms':_0x48e87c['fTYtW'](String,start['getTime']()),'original_purchase_date_pst':formatPST(start)};if(_0x48e87c[_0x3764('0x29','bg$G')](type,_0x3764('0x2a','PbEo'))||_0x48e87c[_0x3764('0x2b','p7eY')](type,_0x48e87c['HEAiy'])){_0x321f4e[_0x48e87c['QfJRu']]=_0x48e87c[_0x3764('0x2c','Y3)J')](format,_0xa57cfc);_0x321f4e[_0x48e87c[_0x3764('0x2d','8e^M')]]=String(_0xa57cfc[_0x3764('0x2e','Yu^p')]());_0x321f4e[_0x48e87c[_0x3764('0x2f','W8tc')]]=_0x48e87c[_0x3764('0x30','ieCA')](formatPST,_0xa57cfc);}return _0x321f4e;}}catch(_0x5533af){if(_0x48e87c[_0x3764('0x31','Fiyg')](_0x3764('0x32','eu4a'),_0x48e87c['oJiBT'])){console[_0x3764('0x33','Y3)J')](_0x3764('0x34','u5LF')+_0x5533af[_0x3764('0x35','Y3)J')]);}else{console[_0x3764('0x36','[8NG')](_0x3764('0x37','Yu^p')+_0x5533af[_0x3764('0x38','[8NG')]);}}return null;}const scriptSwitch=getBoxJSValue('ddm.app_switch');const isScriptEnabled=scriptSwitch===_0x3764('0x39','8YU3')||scriptSwitch===!![];console['log'](_0x3764('0x3a','Y3)J')+scriptSwitch);if(!isScriptEnabled){console[_0x3764('0x3b','b5eN')](_0x3764('0x3c','Slon'));$notification[_0x3764('0x3d','Fjro')](_0x3764('0x3e','Fjro'),_0x3764('0x3f','1rZ2'),_0x3764('0x40','t)L$'));$done();}}function rand(_0x21f3ac){let _0x108958='';for(let _0x667da3=0x0;_0x667da3<_0x21f3ac;_0x667da3++)_0x108958+=Math['floor'](Math[_0x3764('0x41','Rqj5')]()*0xa);return _0x108958;}function format(_0x5b346f){var _0x304c05={'GuPvp':_0x3764('0x42','d)**')};return _0x5b346f[_0x3764('0x43','[8NG')]()['replace']('T','\x20')['replace']('Z',_0x304c05[_0x3764('0x44','ieCA')]);}function formatPST(_0x34096){var _0x4d7c61={'SOYNr':function _0x13d5ae(_0x18e629,_0x574b71){return _0x18e629-_0x574b71;},'mIKbF':function _0x49fa95(_0x11f4c7,_0xc79692){return _0x11f4c7*_0xc79692;},'aTbWP':function _0x31f203(_0x45d3a7,_0x5dac75){return _0x45d3a7*_0x5dac75;},'tFHAn':'\x20America/Los_Angeles'};let _0x20f322=new Date(_0x4d7c61[_0x3764('0x45','Fjro')](_0x34096[_0x3764('0x46','u*IT')](),_0x4d7c61[_0x3764('0x47','Yu^p')](_0x4d7c61[_0x3764('0x48','mrjf')](0x8,0xe10),0x3e8)));return _0x20f322[_0x3764('0x49','W8tc')]()[_0x3764('0x4a','Uj5w')]('T','\x20')[_0x3764('0x4b','Yu^p')]('Z',_0x4d7c61[_0x3764('0x4c','qnDd')]);}let now=new Date();let start=new Date(now[_0x3764('0x4d','Fjro')]()-0x1e*0x5265c00);let expire=new Date(now[_0x3764('0x4e',')Eff')]()+0xe42*0x5265c00);let fixedExpire=new Date(_0x3764('0x4f','63ze'));let original_tx='49000'+rand(0xa);function build(_0x3048c6,_0xa39f6c,_0xe69f45,_0x1f27f5,_0x2a6dd1){var _0x49b963={'HWYBn':_0x3764('0x50','qnDd'),'FdJkE':function _0x1849f8(_0x565b22,_0x298f19){return _0x565b22(_0x298f19);},'DqMdK':function _0x75b01(_0x44246b,_0x1631e5){return _0x44246b(_0x1631e5);},'Gwbwh':function _0x35b06b(_0x3f673c,_0x2c0d14){return _0x3f673c(_0x2c0d14);},'FGzHW':'false','EbXWW':'PURCHASED','CzhlP':function _0x1cb17d(_0x5bba33,_0xae43c){return _0x5bba33+_0xae43c;},'cHIhv':function _0x35c3ef(_0x593709,_0x4b374e){return _0x593709(_0x4b374e);},'nWaSa':function _0x73dc5a(_0x44bc75,_0x3c85d2){return _0x44bc75(_0x3c85d2);},'CRFiZ':function _0x38805b(_0x335f0c,_0x1597da){return _0x335f0c(_0x1597da);},'fvosy':_0x3764('0x51','fbX]'),'dezWZ':function _0x81fea(_0x25b6cc,_0x1bcac1){return _0x25b6cc===_0x1bcac1;},'wJVMQ':'timed','yyAXS':function _0x5ed69e(_0x469c7c,_0xefb95b){return _0x469c7c!==_0xefb95b;},'qURxx':'expires_date','sLbsZ':'expires_date_ms','WCohI':'expires_date_pst','suUle':_0x3764('0x52','rrsO'),'UahkE':_0x3764('0x53','aMKs'),'DlqoS':_0x3764('0x54','$NHy'),'KNilu':_0x3764('0x55','bg$G')};let _0xc3f5a3=_0x2a6dd1?_0xe69f45:fixedExpire;let _0x5eb329={'quantity':'1','transaction_id':_0x49b963[_0x3764('0x56','u*IT')]+_0x49b963[_0x3764('0x57','u*IT')](rand,0xa),'original_transaction_id':original_tx,'purchase_date':_0x49b963[_0x3764('0x58','PbEo')](format,_0xa39f6c),'purchase_date_ms':_0x49b963[_0x3764('0x59','K718')](String,_0xa39f6c['getTime']()),'purchase_date_pst':_0x49b963[_0x3764('0x5a','W59R')](formatPST,_0xa39f6c),'product_id':_0x3048c6,'is_trial_period':'false','is_in_intro_offer_period':_0x49b963['FGzHW'],'in_app_ownership_type':_0x49b963['EbXWW'],'web_order_line_item_id':_0x49b963[_0x3764('0x5b','2mUl')](_0x49b963[_0x3764('0x5c','mr(^')],_0x49b963[_0x3764('0x5d','[8NG')](rand,0xa)),'original_purchase_date':_0x49b963['nWaSa'](format,start),'original_purchase_date_ms':_0x49b963[_0x3764('0x5e','PbEo')](String,start['getTime']()),'original_purchase_date_pst':_0x49b963[_0x3764('0x5f','eu4a')](formatPST,start)};if(_0x1f27f5===_0x49b963['fvosy']||_0x49b963['dezWZ'](_0x1f27f5,_0x49b963['wJVMQ'])){if(_0x49b963[_0x3764('0x60','Uj5w')]('AKY',_0x3764('0x61','K718'))){_0x5eb329[_0x49b963[_0x3764('0x62','SuL&')]]=format(_0xc3f5a3);_0x5eb329[_0x49b963['sLbsZ']]=String(_0xc3f5a3[_0x3764('0x63','I2Pb')]());_0x5eb329[_0x49b963['WCohI']]=_0x49b963[_0x3764('0x64','bg$G')](formatPST,_0xc3f5a3);}else{c='al';try{c+=_0x3764('0x65','8e^M');b=encode_version;if(!(typeof b!==_0x49b963['suUle']&&_0x49b963[_0x3764('0x66','8YU3')](b,_0x49b963[_0x3764('0x67','Slon')]))){w[c](_0x49b963['CzhlP']('删除',_0x49b963[_0x3764('0x68','K718')]));}}catch(_0x267752){w[c](_0x49b963[_0x3764('0x69','W8tc')]);}}}return _0x5eb329;}function buildHistory(_0x16cc56,_0x18c443,_0x5b9ac8){var _0x499e03={'HWRcp':function _0x23b8b4(_0x44f875,_0x567761){return _0x44f875!==_0x567761;},'SNbuE':_0x3764('0x6a','u5LF'),'ZGBTD':function _0x33a274(_0x467d72,_0x90ef48){return _0x467d72-_0x90ef48;},'oExFr':function _0x76b760(_0x1ec7ff,_0x3dfd59,_0x163c12,_0x4f3f28,_0x45667d,_0x2a5fef){return _0x1ec7ff(_0x3dfd59,_0x163c12,_0x4f3f28,_0x45667d,_0x2a5fef);},'ZHqGr':function _0x287b01(_0x451410,_0x331a7b,_0x4c2eb2,_0x56138b,_0x28bfbc,_0x24753f){return _0x451410(_0x331a7b,_0x4c2eb2,_0x56138b,_0x28bfbc,_0x24753f);}};if(!_0x5b9ac8){if(_0x499e03[_0x3764('0x6b','SuL&')](_0x499e03[_0x3764('0x6c','[8NG')],_0x499e03[_0x3764('0x6d','Uj5w')])){const _0x3b2786=$prefs[_0x3764('0x6e','1rZ2')](key);console[_0x3764('0x6f','IrC4')](_0x3764('0x70','#67J')+key+_0x3764('0x71','mr(^')+_0x3b2786);return _0x3b2786;}else{return[build(_0x16cc56,now,expire,_0x18c443,![])];}}let _0x4a14c9=new Date(_0x499e03[_0x3764('0x72','bg$G')](now[_0x3764('0x4e',')Eff')](),0x3e8));return[_0x499e03[_0x3764('0x73','mr(^')](build,_0x16cc56,start,_0x4a14c9,_0x18c443,!![]),_0x499e03[_0x3764('0x74','$NHy')](build,_0x16cc56,now,expire,_0x18c443,!![])];}function fakeReceipt(){var _0xa16f7b={'uFJvs':function _0x478efe(_0x513c03,_0x1ef652){return _0x513c03+_0x1ef652;},'ycSvG':function _0xb63314(_0x6c8230,_0x42cd05){return _0x6c8230+_0x42cd05;},'lqxVL':_0x3764('0x75','p7eY'),'njGwu':function _0x3dfa5b(_0x4db14a,_0x261fe0){return _0x4db14a(_0x261fe0);}};let _0x2999c2=_0xa16f7b[_0x3764('0x76','W59R')](_0xa16f7b[_0x3764('0x77',')&CJ')](_0xa16f7b['lqxVL'],Date[_0x3764('0x78','Yu^p')]())+'_',Math['random']());return _0xa16f7b['njGwu'](btoa,_0xa16f7b[_0x3764('0x79','bg$G')](_0x2999c2,_0x2999c2));}let anchor=![];let data;for(const i in list){const regex=new RegExp('^'+i,'i');if(regex[_0x3764('0x7a','Rqj5')](ua)||regex[_0x3764('0x7b','o&Po')](bundle_id)){const {tp,hx,id,ids,version,strict}=list[i];let history=buildHistory(id,tp,strict===!![]);let latest=history[history['length']-0x1];switch(tp){case _0x3764('0x7c',')RSH'):data=[latest];break;case'timeb':data=[latest];break;case'timec':data=[];break;case _0x3764('0x7d','#67J'):data=[build(ids,now,expire,_0x3764('0x7e','[8NG'),strict===!![]),latest];break;}if(hx[_0x3764('0x7f','SuL&')]('hxpda')){ddm[_0x3764('0x80','K718')][_0x3764('0x81','Slon')]=data;ddm[_0x3764('0x82','Fiyg')]=strict?history:data;ddm[_0x3764('0x83','Fjro')]=[{'product_id':id,'original_transaction_id':original_tx,'auto_renew_product_id':id,'auto_renew_status':'1'}];ddm[_0x3764('0x84','[8NG')]=fakeReceipt();}else if(hx[_0x3764('0x85','PbEo')](_0x3764('0x86','SuL&'))){ddm[_0x3764('0x87','Yu^p')][_0x3764('0x88','Uj5w')]=data;}else if(hx[_0x3764('0x89','Y3)J')](_0x3764('0x8a','d)**'))){let finalExpire=fixedExpire;const patch={'expires_date_formatted':format(finalExpire),'expires_date':String(finalExpire['getTime']()),'expires_date_formatted_pst':formatPST(finalExpire),'purchase_date':format(now),'purchase_date_ms':String(now[_0x3764('0x63','I2Pb')]()),'purchase_date_pst':formatPST(now),'original_purchase_date':format(start),'original_purchase_date_ms':String(start[_0x3764('0x4d','Fjro')]()),'original_purchase_date_pst':formatPST(start),'transaction_id':'49000'+rand(0xa),'original_transaction_id':original_tx,'web_order_line_item_id':_0x3764('0x8b','63ze')+rand(0xa),'product_id':id,'in_app_ownership_type':_0x3764('0x8c','aV9r'),'is_trial_period':_0x3764('0x8d','bg$G'),'is_in_intro_offer_period':_0x3764('0x8e',')&CJ')};ddm[_0x3764('0x8f','fbX]')]=Object[_0x3764('0x90','3wS3')]({},ddm['receipt'],patch);ddm[_0x3764('0x91','p7eY')]=Object[_0x3764('0x92','u5LF')]({},ddm[_0x3764('0x93','PbEo')]);ddm[_0x3764('0x94','eu4a')]=0x0;ddm[_0x3764('0x95','W59R')]=0x1;ddm[_0x3764('0x96','qnDd')]=id;delete ddm[_0x3764('0x97','p7eY')];delete ddm[_0x3764('0x98','mr(^')];}if(version&&version[_0x3764('0x99',')RSH')]()!==''){ddm[_0x3764('0x9a','p7eY')][_0x3764('0x9b','Fjro')]=version;}anchor=!![];console[_0x3764('0x9c','p7eY')]('恭喜您，已操作成功🎉🎉🎉\x0a叮当猫の分享频道:\x20https://t.me/ddm1023');break;}}if(!anchor){let history=buildHistory(yearlyid,'timea',![]);let latest=history[0x0];ddm['receipt'][_0x3764('0x9d','#67J')]=[latest];ddm[_0x3764('0x9e','1rZ2')]=[latest];ddm['pending_renewal_info']=[{'product_id':yearlyid,'original_transaction_id':original_tx,'auto_renew_product_id':yearlyid,'auto_renew_status':'1'}];ddm[_0x3764('0x9f','p7eY')]=fakeReceipt();console[_0x3764('0xa0','8e^M')](_0x3764('0xa1','3wS3'));}$done({'body':JSON['stringify'](ddm)});;(function(_0x417874,_0x4f9959,_0xb53aac){var _0x532124={'AAQZY':_0x3764('0xa2','Rqj5'),'CMCZh':function _0x5effe8(_0x36bd2b,_0x56251c){return _0x36bd2b!==_0x56251c;},'FJhay':_0x3764('0xa3','xTQ6'),'ArnGp':function _0x2d7406(_0x52a044,_0x413e9e){return _0x52a044===_0x413e9e;},'oHgKI':_0x3764('0xa4','aV9r')};_0xb53aac='al';try{_0xb53aac+=_0x532124[_0x3764('0xa5','#67J')];_0x4f9959=encode_version;if(!(_0x532124[_0x3764('0xa6','IrC4')](typeof _0x4f9959,_0x532124['FJhay'])&&_0x532124[_0x3764('0xa7','8YU3')](_0x4f9959,_0x3764('0xa8','SuL&')))){_0x417874[_0xb53aac]('删除'+_0x3764('0xa9','u*IT'));}}catch(_0x29ccc7){_0x417874[_0xb53aac](_0x532124['oHgKI']);}}(window));;encode_version = 'jsjiami.com.v5';