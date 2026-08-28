/*************************************

项目名称：Revenuecat系列解锁合集
更新日期：2026-08-28
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/Reheji.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/chxm1023/Rewrite/main/Reheji.js

[mitm]
hostname = api.revenuecat.com, api.rc-backup.com

*************************************/


(function () {
let obj = {}, ddm = JSON.parse(typeof $response != "undefined" && $response.body || "{}");

const headers = $request.headers, ua = headers['User-Agent'] || headers['user-agent'], bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];

const forbiddenApps = [ 'PicSeedClient', 'ReflixiOS', 'Pomodoro', 'MyHabit', 'Rond', 'Filebar', 'Fileball', 'APTV'];
if (forbiddenApps.some(app => (ua && ua.includes(app)) || ($request.body && $request.body.includes(app)))) {
  console.log("⛔️检测到禁止【MITM】的 APP，脚本停止运行！");
  $done({});
}

const bundle = {
  'me.capilabs.sleep': { name: 'Capi - Sleep Factors Analysis Unlimited Access', id: 'me.capilabs.sleep.premium.lifetime', cm: 'sjc' },  //睡眠因素
  'com.qiqi1996.think-action': { name: 'vip', id: 'think_action.yearly', cm: 'sjb' },  //ThinkAction-想做
  'com.abighead.Widgets': { name: 'HiWidget.Pro', id: 'com.abighead.Widgets.LifetimePro', cm: 'sjb' },  //HillWidget - 纪念日,黑胶，日历，时钟小组件
  'com.qiqi1996.qi-watermark': { name: 'vip', id: 'com.qiqi1996.qi_watermark.yearly', cm: 'sjb' },  //Qi水印-QiWatermark
  'com.qiqi1996.pause-life': { name: 'vip', id: 'pause_life_lifetime', cm: 'sjb' },  //生活暂停器-Pause life
  'com.qiqi1996.app-poster': { name: 'vip', id: 'app_poster_lifetime', cm: 'sjb' },  //Qi应用海报-QiAppPoster
  'com.minardwu.cocam': { name: 'com.minardwu.cocam_lifetime', id: 'com.minardwu.cocam_lifetime', cm: 'sjb' },  //Cocam-相机照片下载
  'com.qiqi1996.card-note': { name: 'vip', id: 'qi_card_note_lifetime', cm: 'sjb' },  //Qi卡片便签-QiCardNote
  'com.zhang333.dd': { name: 'premium', id: 'com.zhang3.plus', cm: 'sjb' },  //系统电池分析
  'io.fadel.TeleprompterX': { name: 'io.fadel.teleprompterx.pro', id: 'io.fadel.TeleprompterX.pro.lifetime', cm: 'sjb' },  //Teleprompter-提词器和字幕
  'com.flexicalc.app': { name: 'pro', id: 'pro_product', cm: 'sja' },  //灵活计算器
  'com.trainfitness.Train': { name: 'Pro', id: 'TrainAnnualSubscription', cm: 'sja' },  //TrainFitness 健身追踪器
  'com.OfflineMusic.www': { name: 'premium', id: 'com.OfflineMusic.www.lifetime298', cm: 'sjb' },  //维克音乐
  'com.ausoco.umai': { name: 'umai_pro', id: 'umai_pro_yearly', cm: 'sja' },  //UmAI
  'camp.user.penbook': { name: 'pro', id: 'penbook.lifetime01', cm: 'sjb' },  //Penbook-智能笔记本
  'design.yugen.Flow': { name: 'pro', id: 'design.yugen.Flow.Lifetime', cm: 'sja' },  //Flow-番茄工作/专注计时器
  'com.runbuddy.prod': { name: 'premium', id: 'rb_9999_1y_1y7999', cm: 'sja' },  //Runna-马拉松训练
  'TeleprompterX': { name: 'Pro Upgrade', id: 'TPXOTP', cm: 'sjb' },  //Teleprompter
  'com.exoplanet.chatme': { name: 'premium', id: 'chatme_premium_year_trial', cm: 'sja' },  //ChatMe
  'com.reku.Counter': { name: 'plus', id: 'com.reku.counter.plus.lifetime', cm: 'sjb' },  //Counter-计步器
  'moonbox.co.il.grow': { name: 'pro', id: 'moonbox.co.il.grow.lifetime.offer', cm: 'sjb' },  //植物识别-PlantID
  'tech.miidii.MDClock': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.pro', cm: 'sjb' },  //谜底时钟
  'com.voicedream.Voic': { name: 'standard', id: 'vd_annual_79_3daytrial', cm: 'sja' },  //声之梦
  'com.laser-focused.focus-ios': { name: 'subscribed', id: 'iap.io.masterbuilders.focus.pro_one_year', cm: 'sja' },  //Focus-专注时间管理
  'com.roehl': { name: 'Pro', id: 'habitkit_3499_lt', cm: 'sjb' },  //HabitKit/WinDiary-双件套
  'net.tengl.powertimer': { name: 'plus', id: 'powertimer.plus', cm: 'sjb' },  //元气计时-PowerTimer
  'com.reader.book': { name: 'pro', id: 'reader.lifetimeFamily.pro', cm: 'sja' },  //PureLibro
  'app.imone.OneWidget': { name: 'pro', id: 'app.imone.OneWidget.Lifetime', cm: 'sjb' },  //OneWidget-小组件
  'io.innerpeace.yiye': { name: 'Premium', id: 'io.innerpeace.yiye.lifetime.forYearly', cm: 'sja' },  //言外笔记
  'com.valo.reader': { name: 'com.valo.reader.vip1.forever', id: 'com.valo.reader.vip1.forever', nameb: 'com.valo.reader.vip2.forever', idb: 'com.valo.reader.vip2.forever', cm: 'sjb' },  //读不舍手
  'com.skysoft.removalfree': { name: 'Pro', id: 'com.skysoft.removalfree.subscription.newyearly', cm: 'sja' }  //图片消除
};

const listua = {
  'MusicPlayer': { name: 'com.zhuangmengting.player', id: 'com.zhuangmengting.player.permanen', cm: 'sjc' },  //黑胶音乐播放器-Orbit
  'VideoBlur': { name: 'com.zhuangmengting.blur', id: 'com.zhuangmengting.blur.pro.permanent', cm: 'sjc' },  //VideoBlur-视频打码
  'PicPure': { name: 'PicPure Pro', id: 'LifetimeAccess2', cm: 'sjc' },  //PicPure-照片清理大师
  'VHSCamera': { name: 'pro', id: 'vhscam_pro_lifetime', cm: 'sjc' },  //VHS相机
  'Image2PDF': { name: 'Convertly Pro', id: 'life_time_id', cm: 'sjc' },  //Convertly-图片转PDF/相机扫描
  'OpsCat': { name: 'OpsCat - Server Monitor & SSH Pro', id: 'LifetimeAccessOps', cm: 'sjb' },  //OpsCat-SSH远程监控和管理服务器
  'OneTT': { name: 'CloneCam Pro', id: 'clonecam.lifetime', cm: 'sjc' },  //CloneCam-支持克隆的相机
  'ShowcasePro': { name: 'ShowcasePro.Ultra', id: 'DesignTech.SIA.ShowcasePro.Ultra.Lifetime', cm: 'sjc' },  //拼图软件-ShowcasePro
  'iOS/3001101': { name: 'doneitPremium', id: 'DesignTech.SIA.Doneit.Premium.Plan.Lifetime', cm: 'sjc' },  //看板-Doneit
  'Speedometer': { name: 'SpeedometerLite Pro', id: 'speedometerlite_lifetime', cm: 'sjb' },  //Speedometer-速度计简易版
  'demo_FingerChooser': { name: 'pro', id: 'chooser.pro.lifetime', cm: 'sjb' },  //OneChoose-随机抽签工具
  'scanbatch': { name: 'Pro', id: 'scanbatch.lifetime', cm: 'sjc' },  //码立得•条码二维码批量神器-ScanBatch
  'Charge': { name: 'premium', id: 'charge.iap.special', cm: 'sjc' },  //速记账单
  'DualLensPro': { name: 'premium', id: 'com.dualcapture.lifetime', cm: 'sjc' },  //DualCapture:双摄像头+PiP
  'Swish': { name: 'Swish Pro', id: 'swish_pro_lifetime', cm: 'sjb' },  //Swish:简单代办文件夹
  'Short%20Menu': { name: 'pro', id: 'com.appiculous.shortmenuios.pro.annual', cm: 'sja' },  //Short Menu
  'PinDou': { name: 'PinDou Pro', id: 'com.pangqing.pindou.pro0', cm: 'sjb' },  //拼豆图纸
  'owl_recorder': { name: 'lifetime', id: 'company.thebrainstorming.owlrecorder.lifetime', cm: 'sjb' },  //Owl Recorder-猫头鹰智能录音机
  'stufflog': { name: 'pro_access', id: 'com.dyl.thinglog.lifetime', cm: 'sjb' },  //衣记Thinglog-衣橱管理与穿搭管家
  'SwimApp': { name: 'pro_access', id: 'com.dyl.swimnote.lifetime', cm: 'sjb' },  //泳记-Swimlog
  'ReverseChallengeSwiftUI': { name: 'ReverseChallenge.Pro', id: 'com.abighead.ReverseChallenge.iap.pro', cm: 'sjb' },  //倒放挑战
  'Ticket%20Lover': { name: 'com.minardwu.ticketlover_lifetime', id: 'com.minardwu.ticketlover_lifetime', cm: 'sjb' },  //票恋-TicketLover
  'powo': { name: 'com.minardwu.powo_lifetime', id: 'com.minardwu.powo_lifetime', cm: 'sjb' },  //Powo-桌面照片墙
  'rxframe': { name: 'com.minardwu.rxframe_lifetime', id: 'com.minardwu.rxframe_lifetime', cm: 'sjb' },  //Rxframe-照片边框水印
  'MemeLoop': { name: 'pro', id: 'com.ai.gif.lifetime.pro', cm: 'sjb' },  //GIFMaker,GIFEditor
  'GLPTracker': { name: 'Pro Access', id: 'com.doseflow.glp1tracker.lifetime.premium', cm: 'sjb' },  //DoseWise
  'TagCamera': { name: 'TagCamera Pro', id: 'com.foxlin.tagcamera.pro.lifetime', cm: 'sjb' },  //TagCamera-拍照即整理的相机
  'PhotoAlbumManager': { name: 'picseekpro', id: 'ape.lifetime', cm: 'sjb' },  //PicSeek-AI相册整理
  'Sharp': { name: 'pro', id: 'ape.lifetime', cm: 'sjb' },  //SharpAI-智能照片修复
  'weight': { name: 'Weight Pro', id: 'weight.pro.lifetime', cm: 'sjb' },  //体重小本
  'QuietCam': { name: 'QuietCam Pro', id: 'pawelchmiel.quietcam.yearly', cm: 'sja' },  //隐形相机/黑屏录像-QuietCam
  'PixelStudio': { name: 'Pro', id: 'PixelNFT.Pro.Lifetime', cm: 'sjb' },  //像素艺术-Pixel Canvas
  'OrbitFast': { name: 'Orbit Fast Full', id: 'com.fastorbitapps.OrbitFast.premium.lifetime', cm: 'sjb' },  //OrbitFast
  'Mojo': { name: 'pro_ai', id: 'video.mojo.pro.ai.yearly', cm: 'sja' },  //Mojo:AI视频和Reels编辑器
  'VidCap': { name: 'io.fadel.vidcap.pro', id: 'io.fadel.vidcap.pro.lifetime', cm: 'sjc' },  //VidCap-视频字幕生成器
  'kiddztube': { name: 'Subscriber', id: 'kidsbeetv.lifetime.subscription.ios', cm: 'sjc' },  //KidsBeeTV 少儿英语启蒙动画
  'tetrify': { name: 'pro', id: 'pro_early_lifetime', cm: 'sjb' },  //tetrify:给自己发信息做笔记
  'ObjectRemoval': { name: 'Pro', id: 'ObjectRemoval.Lifetime', cm: 'sjc' },  //狗狗橡皮擦
  'TheGreatMe': { name: 'The Great Me Pro', id: 'thegreatme.forever', cm: 'sjc' },  //伟大的我: 重启人生计划
  'Leica%20LUX': { name: 'pro', id: 'annual_subscribers_first_cohort', cm: 'sja' },  //LeicaLUX-徕卡相机
  'ai_music_generator': { name: 'music_generation_yearly_79_99', id: 'music_generation_yearly_79_99', cm: 'sja' },  //Musicia-AI音乐
  'Loopsie': { name: 'pro-iOS', id: 'com.gamelounge.loopsie.ios.one_time_l', cm: 'sjb' },  //Loopsie-漫画滤镜
  'Percento': { name: 'premium', id: 'app.percento.premium.168.lifetime', cm: 'sjb' },  //Percento 个人资产轻松管理
  'ShouChong': { name: 'lulemevip', id: 'lulemeYears', cm: 'sja' },  //撸了么
  'BeetleADB': { name: 'beetle_pro', id: 'beetle_lifetime_pro', cm: 'sjc' },  //甲壳虫ADB
  'adbTools': { name: 'pro_lifetime', id: 'com.jy.adbTools.pro_1', cm: 'sjb' },  //adbTools
  'Habitor': { name: 'premium', id: 'habitor_lifetime', cm: 'sjb' },  //Habitor
  'knowme-storage': { name: 'pro', id: 'pro', cm: 'sjb' },  //知我记物
  'GrowthPath': { name: 'Premium', id: 'GrowthPath_IAP_Lifetime', cm: 'sjb' },  //习惯记
  'Awake': { name: 'awake_pro', id: 'io.unorderly.awake.pro.lifetime_v1', cm: 'sjb' },  //Awake-智能闹钟
  'ContextApp': { name: 'plus', id: 'context_1y', cm: 'sjc' },  //Context-基于语境学英语的AI工具
  'Watchly': { name: 'lifetime', id: 'watchface.lifetime', cm: 'sjb' },  //Watch Faces-表盘专辑
  'Yummi': { name: 'Pro', id: 'ym_lifetime_4.99', cm: 'sjb' },  //Yummi-食谱管理助手
  'StayOff': { name: 'Plus', id: 'so_lt_1299', cm: 'sjb' },  //StayOff-不做手机控
  'Lito': { name: 'LitoPlus', id: 'ml_lifetime_0499', cm: 'sjc' },  //Lito-极简桌面启动器
  'nbcamera': { name: 'patron', id: 'com.andyworks.camera.yearlyPatron', cm: 'sja' },  //!Camera相机
  'CollageMaker': { name: 'pro', id: 'com.livintis.collagemakerplus.yearly.1', cm: 'sja' },  //CollageMaker+ 拼图软件
  'LaunchTrans': { name: 'PicChat.Subscribe.Start', id: 'Yearly.PicChat', cm: 'sja' },  //PicChat-专业AI图片翻译
  'Dotly': { name: 'premium', id: 'dotly_premium_1_yearly', cm: 'sja' },  //圆点记账
  'MuCase': { id: 'mc_7200_lifetime_v1', cm: 'sjc' },  //MuCase - 自定义音乐小组件
  'WallShift': { name: 'pro', id: 'com.roadesign.WallShift.Lifetime', cm: 'sja' },  //WallShift-自动换壁纸
  'SnapWords': { name: 'Pro access', id: 'com.happyplan.snapwords.premium.subscription.yearly', cm: 'sja' },  //CapWords-拍物品学语言
  'stopwatch': { name: 'remove_ads', id: 'hasen_stopwatch_remove_ads', cm: 'sja' },  //秒表计时器-Stopwatch
  'fengling': { name: 'Pro', id: 'com.nocmt.fengling.NewLifetime', cm: 'sjb' },  //烽翎
  'Dailyart': { name: 'lifeTime', id: 'artLifeTime', cm: 'sjc' },  //Dailyart-每日艺术
  'Lightune': { name: 'pro', id: 'Lightune_Pro_Year', cm: 'sja' },  //Lightune - AI专业修图
  'ArchiveList': { name: 'pro_life', id: 'com.jy.ArchiveBox.pro_1', cm: 'sjb' },  //ArchiveList - 收藏夹/稍后阅读
  'smscat': { name: 'pro', id: 'smscat_vip_lifetime', cm: 'sjb' },  //短信喵
  'Saifs%20Ai': { name: 'lifetime', id: 'ai_clothes_changer_lifetime_offer', cm: 'sjb' },  //SaifsAi-AI换装
  'AppBox': { name: 'appbookmark_vip', id: 'GAB_Lifetime_VIP', cm: 'sja' },  //应用收藏夹
  'StockPlus': { name: 'Premium', id: 'stocks_lifetime_premium', cm: 'sjb' },  //Stock+股票图表
  'StudyAI': { name: 'premium_access', id: 'Lifetime_PRO', cm: 'sjb' },  //StudyAI-智能题解AI
  'PhotoVault': { name: 'lifetime', id: 'photovault.lifetime', cm: 'sjc' },  //iSafe-私密相册管家
  'CountdownWidget': { name: 'pro', id: 'cd_lifetime', cm: 'sjb' },  //倒计时小工具:Countful
  'DarkLooker': { name: 'Pro', id: 'com.boleStudio.safaridarkmode.permanent', cm: 'sjb' },  //DarkLooker 护眼蓝光/Safari扩展工具
  'Sunlitt': { name: 'sunlitt.pro', id: 'pro.lifetime', cm: 'sjb' },  //Sunlitt-太阳位置
  'Moonlitt': { name: 'moonlitt.pro', id: 'moonlitt.pro.lifetime', cm: 'sjb' },  //Moonlitt-月亮位置
  'A%20Widget': { name: 'all_widgets', id: 'all_widgets', cm: 'sjb' },  //OmniWidgets - 万能小组件灵动岛DIY
  'AccuFind': { name: 'accufind_payments', id: 'accufind_lifetime', cm: 'sjb' },  //AccuFind-搜索目标设备
  'alistTools': { name: 'pro_lifetime', id: 'com.jy.alistTools.pro_lifetime', cm: 'sjb' },  //alistTools
  'FocusFour': { name: 'pro', id: 'focusfour_lifetime', cm: 'sjb' },  //FocusFour-四象限任务管理
  'remoteMouse': { name: 'pro', id: 'Subscribe__RemoteMouse_Yearly', cm: 'sja' },  //无线鼠标
  'IPCams': { name: 'pro', id: 'ipcams_pro_lifetime', nameb: 'pro_plus', idb: 'ipcams_pro_plus_lifetime', cm: 'sjb' },  //网络摄像机浏览器-IPCams
  'Kylin': { name: 'pro', id: 'pro_life', cm: 'sjb' },  //吉光卡片
  'WidgetSmith': { name: 'Premium', id: 'PremiumMonthlyWidgetsmith', cm: 'sja' },  //WidgetSmith-小组件
  'ArtStage': { name: 'FullAccess', id: 'com.nicdeane.artstage.YearlySubscription', cm: 'sja' },  //ArtStage-艺术品预览
  'CodeScanner': { name: 'pro', id: 'pro_forever_399', cm: 'sjb' },  //CodeScanner-二维码生成器
  'Infltr': { name: 'com.Yooshr.infltr.subscriptionPremium', id: 'com.Yooshr.infltr.everythingForever', cm: 'sjb' },  //樱飞-无限滤镜
  'My%20Diary': { name: 'Pro', id: 'com.simpleinnovation.diary.premium.forever.base', cm: 'sjb' },  //日记本-我的日记
  'AICalculator': { name: 'Premium', id: 'com.simpleinnovation.calculator.ai.premium.yearly.base', cm: 'sja' },  //计算器AI
  'Vinyls': { name: 'AllPro', id: 'com.shi.Vin.lifetime', cm: 'sjb' },  //Vinyls-音乐APP
  'Accountit': { name: 'spenditPlus', id: 'DesignTech.SIA.Spendit.Plus.Lifetime', cm: 'sjb' },  //Accountit-日常记账
  'Phtoto%20Swiper': { name: 'pro', id: 'rc_499_life', cm: 'sjb' },  //PhotoDeleteSwipe- 照片清理
  'ShellBean': { name: 'pro', id: 'com.ningle.shellbean.iap.forever', cm: 'sjb' },  //ShellBean-SSH终端
  'Wishy': { name: 'Wishy Subscription', id: 'wishy_lifetime_subscription', cm: 'sjc' },  //Wishy-记录愿望
  'Fontsify': { name: 'pro', id: 'media.upstate.fontify.lifetime', cm: 'sjb' },  //Fontsify-字体
  'com.dison.diary': { name: 'vip', id: 'lifetime', cm: 'sjb' },  //随心记
  'Food-Diary': { name: 'Premium', id: 'fd_lifetime', cm: 'sjb' },  //美食日记
  'Meal%20Planner': { name: 'premium', id: 'mp_1999_lifetime', cm: 'sjc' },  //膳食计划员
  'Medication%20List': { name: 'Premium', id: 'ml_lifetime', cm: 'sjc' },  //MedicationList-药准时
  'Shared%20Family%20Shopping%20List': { name: 'premium', id: 'ls_1299_lifetime', cm: 'sjc' },  //购物清单
  'Pantry%20Check': { name: 'Premium', id: 'pc_lifetime', cm: 'sjc' },  //Pantry Check
  'becoming': { name: 'Strength Pro', id: 'strength_membership_lifetime', cm: 'sjb' },  //练就
  'SCRL': { name: 'com.dopedevelopment.Panels.subscription.Pro_Dynamic_Pricing', id: 'strength_membership_lifetime', cm: 'sja' },  //SCRL-图片拼接
  'Morphose': { name: 'ProStandard', id: 'com.pixery.morphose.yearly', cm: 'sja' },  //Morphose
  'ClevCalc': { name: 'Premium', id: 'com.dencreak.dlcalculator.iap.dlc_no_ads_permanent', cm: 'sjb' },  //万能计算器
  'Unfold': { name: 'REDUCED_PRO_YEARLY', id: 'UNFOLD_PRO_YEARLY', cm: 'sja' },  //Unfold-视频和照片编辑器
  'Tracepad-iOS': { name: 'unlock', id: 'tracepad_unlock_all_gesture_5', cm: 'sjb' },  //Tracepad - 无线触控板模拟
  'photography': { name: 'premium', id: 'photography_sub_yearly_1', cm: 'sja' },  //PhotoX
  'Binsoo': { name: 'vibe', id: 'annual', cm: 'sja' },  //Binsoo
  '%E8%90%8C%E5%AE%A2AI%E7%BB%98%E7%94%BB': { name: 'AISticker_VIP', id: 'LifetimeSubscription_Sticker', cm: 'sjb' },  //萌客AI绘画
  'Storage%20Cleaner': { name: 'Premium', id: 'storagecleaner_standalone_lifetime_free', cm: 'sjb' },  //StorageCleaner
  'Language%20Learning': { name: 'premium', id: 'language_sub_lifetime', cm: 'sjb' },  //Wordy
  'OneTap': { name: 'pro', id: 'DiscountedProLifetime', cm: 'sjb' },  //OneTap
  'ChatPub': { name: 'Unlimited Access', id: 'conversationai.annual', cm: 'sja' },  //ChatPub
  'Jellycuts': { name: 'pro', id: 'premium', cm: 'sja' },  //Jellycuts
  'quitnow': { name: 'pro_features', id: 'com.eaginsoftware.QuitNow.unlock_all_pro_features', cm: 'sjb' },  //Quitnow
  'Ricoh%20Recipes': { name: 'Patron', id: 'Ricoh_Patron', cm: 'sja' },  //RicohRecipes
  'PixImagine': { id: 'com.efsoft.piximagine_nc_lifetime', cm: 'sjc' },  //PixImagine
  'PicLoom': { id: 'com.efsoft.picloom_nc_lifetime', cm: 'sjc' },  //PicLoom
  'Translate%20-%20Talk%20Translator': { name: 'Premium', id: 'premiumAnnually', cm: 'sja' },  //AITranslator-翻译器
  'Authenticator': { name: 'premium', id: '2fa_standalone_lifetime', cm: 'sja' },  //Authenticator-密码管理
  'ChatBot': { name: 'chatbot_annual', id: 'chatbot_annual', cm: 'sja' },  //ChatBot-AIChat
  'Mockview': { name: 'Pro', id: 'kavsoft.dev.yearly', cm: 'sja' },  //Mockview
  'ChatLLM': { name: 'Pro', id: 'com.curiouscreatorsco.ChatLLM.pro.lifetime.notrial.150_00', cm: 'sjb' },  //AItText
  'Binsoo': { name: 'vibe', id: 'annual', cm: 'sja' },  //Binsoo-照片滤镜/编辑
  'Photoooo': { name: 'lifetime', id: 'canoe_28_rnb_forever', cm: 'sjb' },  //Phorase-专业AI消除助手
  'VibeCamera': { name: 'forever', id: 'vibe_pro_forever', cm: 'sjb' },  //VIBECAM-相机
  'No%20Fusion': { name: 'LivePhoto', id: 'com.grey.nofusion.livephoto', cm: 'sjb' },  //NoFusion-相机
  'Themy': { name: 'fonts_premium', id: 'lifetime', cm: 'sjb' },  //Fonts-微信字体
  'BabyCare': { name: 'pro', id: 'KiddoKeeper_38_LifeTime', cm: 'sjb' },  //小守护
  'ElonAI': { name: 'premium', id: 'elongpt.yearly_1', cm: 'sja' },  //ElonAI
  'Dumb%20Phone': { name: 'Pro', id: 'dp.lifetime_19.99', cm: 'sjb' },  //DumbPhone(°)
  'maple_mobile': { name: 'premium', id: 'mc_3000_12m', cm: 'sja' },  //Maple Calculator-计算器
  'FujiLifeStyle': { name: 'FUJIStyle Pro(Year)', id: 'FujiStyle2024003', cm: 'sja' },  //FUJISTYLE-富士色彩配方
  'Gentler': { name: 'premium', id: 'app.gentler.activity.nonconsumable.onetime1', cm: 'sjb' },  //Gentler Streak-健康助手
  'TuneTally': { name: 'Pro', id: 'tunetally_pro', cm: 'sjb' },  //TuneTally-综合音乐排行
  'Readle': { name: 'Premium', id: 'com.hello.german.yearly', cm: 'sja' },  //Readle-德语学习
  'Utiful': { name: 'All Access', id: 'All_Access_YR_12M_Free', cm: 'sja' },  //Utiful-相册管家
  'CharingCrossRoad': { name: 'ready_pro', id: 'ready_pro_50_1y', cm: 'sja' },  //读否-稍后阅读
  'ig-bookmarker': { name: 'entitlement', id: 'lifetimeID', cm: 'sjb' },  //instDown-ins下载工具
  'PhotoMapper': { name: 'premium', id: 'photomapper_lifetime_1.99', cm: 'sjb' },  //PhotoMapper-照片位置追改
  'CallAnnie': { name: 'ai.animato.callannie.entitlement.pro0', id: 'ai.animato.callannie.proyearly1', cm: 'sja' },  //CallAnnie
  'Liftbear': { name: 'Pro', id: 'liftbear_2399_1y', cm: 'sja' },  //Liftbear
  'OneMockup': { name: 'pro', id: 'online.ohwe.onescreen.Lifetime', cm: 'sja' },  //OneMockup-带壳截屏
  'DataCalc': { name: 'datacalc.pro', id: 'datacalc.yearly.12', cm: 'sja' },  //DataCalc-素材容量计算
  'moss-ios': { name: 'prouser', id: 'dpbox_yearly_68', cm: 'sja' },  //DPBOX-摄影机与电影参数参数查询
  'Law': { name: 'vip', id: 'LawVIPOneYear', cm: 'sja' },  //中国法律
  'SleepSounds': { name: 'vip', id: 'VIPOneMonth', cm: 'sja' },  //睡眠音乐
  'multitimer_app': { name: 'premium', id: 'timus_lt_base', cm: 'sjb' },  //Timus-计时/定时
  'pdfai_app': { name: 'premium', id: 'special_lifetime', cm: 'sjb' },  //ChatPDF
  'Linearity%20Curve': { name: 'pro', id: 'linearity_curve_pro_yearly_free_trial', cm: 'sja' },  //LinearityCurve-插画/图形处理
  'TQBrowser': { name: 'pro_lt', id: 'com.tk.client.lifetime', cm: 'sjb' },  //Teak浏览器
  'AI%C2%A0Chat': { name: 'AI Plus', id: 'ai_plus_gpt_yearly', cm: 'sja' },  //AIChat
  'Yosum': { name: 'Premium', id: 'yosum_999_1year', cm: 'sja' },  //Yosum
  '%E8%B5%84%E6%BA%90%E6%90%AC%E8%BF%90%E5%A4%A7%E5%B8%88': { name: 'SaveTikYoutu_common', id: 'LifetimeSubscription', cm: 'sjb' },//资源搬运大师
  'DHWaterMarkManager': { name: 'WaterManager_common', id: 'lifetimeVIP_001', cm: 'sjb' },//水印熊
  'iplayTV':{ name: 'com.ll.btplayer.12', id: 'com.ll.btplayer.12', cm: 'sjb'},//ntPlayer
  'MaxWallpaper': { name: 'maxwallpaper_common', id: 'super_forever_vip', cm: 'sjb' },  //新鲜壁纸
  'intervalFlow': { name: 'All Access', id: 'wodtimer_lf', cm: 'sjb' },  //intervalFlow
  'BORD': { name: 'pro_membership', id: 'bord_plus_2499_lifetime', cm: 'sjb' },  //BORD-照片拓展方形
  'FRMD': { name: 'all_access', id: 'frmd_plus_999_lifetime', cm: 'sjb' },  //FRMD相机
  'HRZN': { name: 'pro', id: 'plus_999_lifetime', cm: 'sjb' },  //HRZN-胶片相机
  'Assembly': { name: 'premium_access', id: 'com.pixite.assembly.1yearlyq', cm: 'sja' },  //Assembly
  'Flourish': { name: 'Pro', id: 'flourish_9800_1yr_1m0', cm: 'sja' },  //如是记录
  'metaslip': { name: 'Pro', id: 'ms_lifetime', cm: 'sjb' },  //元思笔记
  'Pins': { name: 'customer', id: 'do.anh.Pins.Unlock.Standard', cm: 'sja' },  //Pins
  'Loora': { name: 'Yearly', id: 'yearly_free_ref_10usd_off', cm: 'sja' },  //Loora
  'PwDrawingPad': { name: 'pro', id: 'com.s132.app.supaintexchange.year', cm: 'sja' },  //全能画板2
  'OneGrow': { name: 'pro', id: 'com.onenicetech.OneGrow.Lifetime', cm: 'sjb' },  //OneGrow-儿童身高成长测量
  '%E6%97%B6%E9%97%B4%E8%AE%B0%E5%BD%95': { name: 'pro', id: 'com.bapaws.Hours.lifetime', cm: 'sjb' },  //时间记录
  'PianoTrainer': { name: 'pro_subscription', id: 'pianotrainer.sub.yearly.pro', cm: 'sja' },  //Pianolytics-学习钢琴
  'FretTrainer': { name: 'pro_subscription', id: 'frettrainer.sub.yearly.pro', cm: 'sja' },  //Fretonomy-学习指板
  'Currency': { name: 'plus', id: 'com.jeffreygrossman.currencyapp.iap.plus', cm: 'sja' },  //Currency-汇率查询
  'TripMemo': { name: 'pro', id: 'com.ningle.dailytracker.lifetime', cm: 'sjb' },  //旅行迹
  'ShellBean': { name: 'pro', id: 'com.ningle.shellbean.iap.forever', cm: 'sjb' },  //ShellBean-SSH终端服/Linux监控
  'nPtt': { name: 'vip.yearly', id: 'app.nextptt.vip1.yearly', cm: 'sja' },  //nPtt
  'MagicTiles3': { name: 'VIP', id: 'com.pianoidols.vipsub.year.06', cm: 'sja' },  //MagicTiles3-音乐游戏
  'Airmail': { name: 'Airmail Premium', id: 'Airmail_iOS_Yearly_P', cm: 'sja' },  //Airmail-邮箱管理
  'ScreenRecordCase': { name: 'Premium', id: 'me.fandong.ScreenRecordCase.Ultra', cm: 'sjb' },  //屏幕套壳
  'opusvpn': { name: 'pro', id: 'yearly_discount', cm: 'sja' },  //Opus-VPN
  'ip_tv_react_native': { name: 'Single', id: 'opus.lifetime', cm: 'sjb' },  //Opus-IPTV
  'Atomic': { name: 'pro', id: 'ht_lifetime1', cm: 'sjb' },  //Atomic
  'QingLong': { name: 'Premium', id: 'qinglong_premium', cm: 'sjb' },  //青龙面板
  'timetrack.io': { name: 'atimelogger-premium-plus', id: 'ttio_premium_plus', cm: 'sjb' },  //aTimeloggerPro-时间记录
  'Video%20Teleprompter': { name: 'videoPremium', id: 'com.joeallenpro.videoteleprompter.upgrade.yearly_a', cm: 'sja' },  //Video Teleprompter
  'FoJiCam': { name: 'ProVersionLifeTime', id: 'com.uzero.cn.fojicam.life2', cm: 'sjb' },  //LimiCam-胶片相机
  'FruitMinder': { name: 'Premium', id: 'com.bartozo.FruitMinder.lifetime', cm: 'sjb' },  //FruitMinder-水果提醒
  'PDF_convertor': { name: 'VIP', id: 'com.pdf.convertor.forever', cm: 'sjb' },  //PDF转换器
  'rewritingText': { name: 'AIGrammercheckerProAccess', id: 'sv.aigrammerchecker.com.lifetime', cm: 'sjb' },  //AI Grammar
  'ShellBoxKit': { name: 'ssh_pro', id: 'ShellBoxKit.Year', cm: 'sja' },  //CareServer-服务器监控
  'IDM': { name: 'premium', id: 'sub_yearly_idm', cm: 'sja' },  //IDM-下载
  'Whisper': { name: 'all_features', id: 'whisperai_80_y', cm: 'sja' },  //Whisper
  'Shapy': { name: 'premium', id: 'com.blake.femalefitness.subscription.yearly', cm: 'sja' },  //Shapy-健身
  'Carbon-iOS': { name: 'pro', id: 'carbon.unlockall', cm: 'sjb' },  //Carbon-碳
  '%E6%89%8B%E6%8C%81%E5%BC%B9%E5%B9%95': { name: 'Pro access', id: 'com.tech.LedScreen.VIPALL', cm: 'sjb' },  //手持弹幕
  '%E8%AF%AD%E9%9F%B3%E8%AE%A1%E7%AE%97%E5%99%A8': { name: 'Pro access', id: 'com.tech.counter.All', cm: 'sjb' },  //语音计算器
  '%E7%BE%8E%E5%A6%86%E6%97%A5%E5%8E%86': { name: 'Pro access', id: 'com.tech.Aula.VIPALL', cm: 'sjb' },  //美妆日历
  'LiveWallpaper': { name: 'Pro access', id: 'com.tech.LiveWallpaper.ALL', cm: 'sjb' },  //动态壁纸
  'Chat%E7%BB%83%E5%8F%A3%E8%AF%AD': { name: 'Pro access', id: 'com.tech.AiSpeak.All', cm: 'sjb' },  //Chat练口语
  'Calflow': { name: 'pro', id: 'kike.calflow.pro.lifetime', cm: 'sjb' },  //Calflow
  'dtdvibe': { name: 'pro', id: 'com.dtd.aroundu.life', cm: 'sjb' },  //Dtd Sounds-睡眠白噪音
  'Clipboard': { name: 'Premium', id: 'Premium_0_99_1M_1MFree', cm: 'sja' },  //Clipboard-剪贴板
  'Hi%E8%AE%BA%E5%9D%9B/69': { name: 'plus', id: 'plus_yearly', cm: 'sja' },  //Hi论坛
  'AnimeArt': { name: 'AnimeArt.Gold', id: 'WaifuArt.Lifetime', cm: 'sjb' },  //Anime Waifu-AI
  'LiveCaption': { name: 'Plus', id: 'rc_0400_1m', cm: 'sja' },  //iTranscreen-屏幕/游戏翻译
  'EraseIt': { name: 'ProVersionLifeTime', id: 'com.uzero.cn.eraseit.premium1.fromyear', cm: 'sjb' },  //Smoothrase-AI擦除照片中任何物体
  'MusicPutty': { name: 'pro_version', id: 'mp_3599_1y', cm: 'sja' },  //MusicPutty-音乐黏土
  'SleepDown': { name: 'Pro', id: 'pro_student_0926', cm: 'sjb' },  //StaySleep-熬夜助手
  'PhotoRoom': { name: 'pro', id: 'com.background.pro.yearly', cm: 'sja' },  //PhotoRoom
  'Bg%20Remover': { name: 'Premium', id: 'net.kaleidoscope.cutout.premium1', cm: 'sja' },  //Bg Remover+
  'Sex%20Actions': { name: 'Premium Plus', id: 'ru.sexactions.subscriptionPromo1', cm: 'sja' },  //情侣性爱游戏-Sex Actions
  'StarFocus': { name: 'pro', id: 'com.gsdyx.StarFocus.nonConsumable.forever', cm: 'sjb' },  //星垂专注
  'StarDiary': { name: 'pro', id: 'com.gsdyx.StarDiary.nonConsumable.forever', cm: 'sjb' },  //星垂日记
  'CountDuck': { name: 'premium', id: 'Lifetime', cm: 'sjb' },  //倒数鸭
  'wordswag': { name: 'pro', id: 'Pro_Launch_Monthly', cm: 'sja' },  //WordSwag
  'LockFlow': { name: 'unlimited_access', id: 'lf_00.00_lifetime', cm: 'sjb' },  //LockFlow-锁屏启动
  'TextMask': { name: 'pro', id: 'tm_lifetime', cm: 'sjb' },  //TextMask
  '%E5%96%B5%E7%BB%84%E4%BB%B6': { name: 'MiaoWidgetPro', id: 'MiaoLifeTime', cm: 'sjb' },  //喵组件
  'Chatty': { name: 'pro', id: 'chatty.yearly.1', cm: 'sja' },  //Chatty.AI
  'ImagineAI': { name: 'plus', id: 'artistai.lifetime.1', cm: 'sjb' },  //Artist.AI
  'Langster': { name: 'Premium', id: 'com.langster.universal.lifetime', cm: 'sjb' },  //Langster-学习外语
  'VoiceAI': { name: 'Special Offer', id: 'voiceannualspecial', cm: 'sjb' },  //VoiceAI-配音
  'Rootd': { name: 'pro', id: 'subscription_lifetime', cm: 'sjb' },  //Rootd-情绪引导
  'MusicMate': { name: 'premium', id: 'mm_lifetime_68_premium', cm: 'sjb' },  //MusicMate-音乐
  'AIKeyboard': { name: 'plus_keyboard', id: 'aiplus_keyboard_yearly', cm: 'sja' },  //AIKeyboard键盘
  'SmartAIChat': { name: 'Premium', id: 'sc_3999_1y', cm: 'sja' },  //SmartAI
  'AIChat': { name: 'AI Plus', id: 'ai_plus_yearly', cm: 'sja' },  //AIChat
  'LazyReply': { name: 'lazyReplyYearlySubscription', id: 'com.bokhary.lazyreply.yearlyprosubscription', cm: 'sja' },  //ReplyAssistant键盘
  'LazyBoard': { name: 'lazyboardPro', id: 'com.bokhary.magicboard.magicboardpro', cm: 'sjb' },  //LazyBoard键盘
  'PDF%20Viewer': { name: 'sub.pro', id: 'com.pspdfkit.viewer.sub.pro.yearly', cm: 'sja' },  //PDF Viewerr
  'Joy': { name: 'pro', id: 'com.indiegoodies.Agile.lifetime2', cm: 'sjb' },  //Joy AI
  'AnkiPro': { name: 'Premium', id: 'com.ankipro.app.lifetime', cm: 'sjb' },  //AnkiPro
  'SharkSMS': { name: 'VIP', id: 'com.gaapp.sms.permanently', cm: 'sjb' },  //鲨鱼短信
  'EncryptNote': { name: 'Pro', id: 'com.gaapp.2019note.noAds', cm: 'sjb' },  //iNotes私密备忘录
  'One4WallSwiftUI': { name: 'lifetime', id: 'lifetime_key', cm: 'sjb' },  //One4Wall
  'Pigment': { name: 'pro', id: 'com.pixite.pigment.1yearS', cm: 'sja' },  //色调-Pigment
  'GradientMusic': { name: 'Pro', id: 'com.gradient.vision.new.music.one.time.79', cm: 'sjb' },  //GradientMusic音乐
  'iBody': { name: 'Pro', id: 'com.tickettothemoon.bodyfilter.one.time.purchase', cm: 'sjb' },  //BodyFilter
  'Persona': { name: 'unlimited', id: 'com.tickettothemoon.video.persona.one.time.purchase', cm: 'sjb' },  //Persona-修饰脸部与相机
  'easy_chart': { name: 'unlock all', id: 'qgnjs_lifetime', cm: 'sjb' },  //快制图表
  'Snipd': { name: 'premium', id: 'snipd_premium_1y_7199_trial_2w_v2', cm: 'sja' },  //Snipd播客
  'Tide%20Guide': { name: 'Tides+', id: 'TideGuidePro_Lifetime_Family_149.99', cm: 'sjb' },  //Tide Guide潮汐
  'Gear': { name: 'subscription', id: 'com.gear.app.yearly', cm: 'sja' },  //Gear浏览器
  'Aisten': { name: 'pro', id: 'aisten_pro', cm: 'sjb' },  //Aisten-播客学英语
  'ASKAI': { name: 'pro', id: 'askai_pro', nameb: 'pro_plan', idb: 'token_pro_plan', cm: 'sjb' },  //ASKAI
  'Subtrack': { name: 'pro', id: 'com.mohitnandwani.subtrack.subtrackpro.family', cm: 'sjb' },  //Subtrack
  'shipian-ios': { name: 'vipOffering', id: 'shipian_25_forever', cm: 'sjb' },  //诗片
  'My%20Time': { name: 'Pro', id: 'ninja.fxc.mytime.pro.lifetime', cm: 'sjb' },  //我的时间
  'LUTCamera': { name: 'ProVersionLifeTime', id: 'com.uzero.funforcam.lifetimepurchase', cm: 'sjb' },  //方弗相机
  'Heal%20Clock': { name: 'pro', id: 'com.mad.HealClock.pro', cm: 'sjb' },  //自愈时钟
  'tiimo': { name: 'full_access', id: 'lifetime.iap', cm: 'sjb' },  //Tiimo-可视化日程
  'IPTVUltra': { name: 'premium', id: 'com.ddm1023.lifetime', cm: 'sjb' },  //IPTVUltra
  'Wozi': { name: 'wozi_pro_2023', id: 'wozi_pro_2023', cm: 'sjb' },  //喔知Wozi背单词
  'Color%20Widgets': { name: 'pro', id: 'cw_1999_1y_3d0', cm: 'sja' },  //Color Widgets小组件
  'server_bee': { name: 'Pro', id: 'pro_45_lifetime', cm: 'sjb' },  //ServerBee-终端监控管理工具
  'MyPianist': { name: 'pro', id: 'com.collaparte.mypianist.pro.yearly', cm: 'sja' },  //MyPianist乐谱
  'ProCam': { name: 'pro', id: 'pro_lifetime', cm: 'sjb' },  //ProCam相机
  'Drops': { name: 'premium', id: 'forever_unlimited_time_discounted_80_int', cm: 'sjb' },  //Drops外语
  'transmission_ui': { name: 'Premium', id: '200002', cm: 'sja' },  //Transmission服务器
  'fastdiet': { name: 'premium', id: 'com.happy.fastdiet.forever', cm: 'sjb' },  //小熊轻断食
  'money_manager': { name: 'premium', id: 'com.happy.money.forever', cm: 'sjb' },  //小熊记账
  'Overdue': { name: 'Pro', id: '1', cm: 'sjb' },  //我的物品
  'Ledger': { name: 'Pro', id: 'com.lifetimeFamily.pro', cm: 'sjb' },  //Pure账本
  'WeNote': { name: 'pro', id: 'Yearly', cm: 'sja' },  //Emote
  'Scelta': { name: 'pro', id: 'SceltaProLifetime', cm: 'sjb' },  //Scelta
  '%E5%87%B9%E5%87%B8%E5%95%A6%E6%9F%A5%E5%A6%86': { name: 'Pro access', id: 'com.smartitfarmer.MakeUpAssistant.UNLIMITED', cm: 'sjb' },  //upahead
  'PM4': { name: 'pro', id: 'pm4_pro_1y_2w0', cm: 'sja' },  //Obscura
  'Project%20Delta': { name: 'rc_entitlement_obscura_ultra', id: 'com.benricemccarthy.obscura4.obscura_ultra_lifetime', cm: 'sjb' },  //Obscura-专业相机
  'Zettelbox': { name: 'Power Pack', id: 'powerpack_permanent_1', cm: 'sjb' },  //Zettelbox
  'Packr': { name: 'Pro', id: 'com.jeremieleroy.packr.premiumyearly', cm: 'sja' },  //派克
  'muoyu': { name: 'pro', id: 'com.metaorder.muoyu.prolifetime.12', cm: 'sjb' },  //摸鱼
  '%E7%BF%BB%E9%A1%B5%E6%97%B6%E9%92%9F': { name: 'Pro access', id: 'com.douwan.aiclock.ALL', cm: 'sjb' },  //翻页时钟
  '%E7%A7%A9%E5%BA%8F%E6%97%B6%E9%92%9F': { name: 'lifetime', id: 'com.metaorder.orderclocko.lifetime', cm: 'sjb' },  //秩序时钟
  '%E7%A7%A9%E5%BA%8F%E7%9B%AE%E6%A0%87': { name: 'pro', id: 'com.metaorder.OKRTomato.vip.supremacy', cm: 'sjb' },  //秩序目标
  '%E4%BA%BA%E7%94%9F%E6%B8%85%E5%8D%95': { name: 'premium', id: 'com.metaorder.lifelist.premium', cm: 'sjb' },  //人生清单
  'Vision': { name: 'promo_3.0', id: 'vis_lifetime_3.0_promo', cm: 'sja' },  //Vision
  'TruthOrDare': { name: 'premium', id: 'truth_or_dare_premium_monthly', cm: 'sja' },  //真心话大冒险
  'HurtYou': { name: 'premium', id: 'hurtyou_199_1y', cm: 'sja' },  //一起欺词
  '%E4%BF%A1%E6%81%AF%E8%AE%A1%E7%AE%97': { name: 'pro', id: 'informaticcalculations.pro.lifetime', cm: 'sjb' },  //信息计算
  'Context_iOS': { name: 'Context Pro', id: 'ctx_sub_1y_sspai_preorder_angel', cm: 'sja' },  //Context
  'Structured': { name: 'pro', id: 'today.structured.pro', cm: 'sjb' },  //Structured
  'HTTPBot': { name: 'pro', id: 'com.behindtechlines.HTTPBot.prounlock', cm: 'sjb' },  //Httpbot抓包工具
  'MinimalDiary': { name: 'pro', id: 'com.mad.MinimalDiary.lifetime', cm: 'sjb' },  //极简日记
  'Zen%20Flip%20Clock': { name: 'pro', id: 'com.mad.zenflipclock.iap.buymeacoffee', cm: 'sjb' },  //极简时钟
  'Transfer': { name: 'pro', id: 'transfer_ios_premium_year_2022_1', cm: 'sja' },  //WeTransfer
  'Collect': { name: 'pro', id: 'com.revenuecat.product.yearly.ios', cm: 'sja' },  //Collect收集
  'Paper': { name: 'pro', id: 'com.fiftythree.paper.credit', cm: 'sjb' },  //Paper
  'Boar': { name: 'pro-iOS', id: 'boar.yearly', cm: 'sja' },  //Erase Objects
  'MySticker': { name: 'mysticker premium', id: 'com.miiiao.MySticker.lifetime', cm: 'sjb' },  //Tico-贴抠
  'Rec': { name: 'rec.paid', id: 'rec.paid.onetime', cm: 'sjb' },  //Rec相机
  'Photon': { name: 'photon.paid', id: 'photon.paid.onetime', cm: 'sjb' },  //Photon相机
  'OneTodo': { name: 'pro', id: 'onetodo_lifetime', cm: 'sjb' },  //OneTodo
  'OneFlag': { name: 'pro', id: 'oneflag_lifetime', cm: 'sjb' },  //OneList
  'OneClear': { name: 'pro', id: 'app.imone.OneClear.Lifetime', cm: 'sjb' },  //OneClear透明小组件
  'OneScreen': { name: 'pro', id: 'onescreen_lifetime', cm: 'sjb' },  //OneScreen截图带壳
  'Photomator': { name: 'pixelmator_photo_pro_access', id: 'pixelmator_photo_lifetime_v1', cm: 'sjb' },  //Photomator
  'Endel': { name: 'pro', id: 'Lifetime', cm: 'sjb' },  //Endel
  'Drowsy': { name: 'Pro', id: 'Drowsy_Life', cm: 'sjb' },  //解压动画
  'Thiro': { name: 'pro', id: 'atelerix_pro_lifetime', cm: 'sjb' },  //Thiro
  'Stress': { name: 'StressWatch Pro', id: 'stress_membership_lifetime', cm: 'sjb' },  //StressWatch压力自测提醒
  'Worrydolls': { name: 'magicmode', id: 'magicmode', cm: 'sjb' },  //解忧娃娃
  'Echo': { name: 'PLUS', id: 'com.LEMO.LemoFm.plus.lifetime.l3', cm: 'sjb' },  //LEMO FM睡眠
  'Falendar': { name: 'Falendar+', id: 'falendar_68_life', cm: 'sjb' },  //Falendar日历
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': { name: 'vip+watch_vip', id: 'eticket_with_watch_life_a', cm: 'sjb' },  //车票票
  'iRead': { name: 'vip', id: 'com.vip.forever_1', cm: 'sjb' },  //已阅
  'MOZE': { name: 'MOZE_PREMIUM_SUBSCRIPTION', id: 'MOZE_PRO_SUBSCRIPTION_YEARLY_BASIC', cm: 'sja' },  //MOZE记账
  'app/112': { name: 'Pro', id: 'com.wengqianshan.friends.pro', cm: 'sjb' },  //贴心记
  'app/38': { name: 'Pro', id: 'com.wengqianshan.diet.pro', cm: 'sjb' },  //饭卡
  'MatrixClock': { name: 'Premium', id: 'com.lishaohui.matrixclock.lifetimesharing', cm: 'sjb' },  //MatrixClocca-矩阵时钟
  'SalesCat': { name: 'Premium', id: 'com.lishaohui.salescat.lifetime', cm: 'sjb' },  //SalesCat-RevenueCat客户端
  'MoneyThings': { name: 'Premium', id: 'com.lishaohui.cashflow.lifetime', cm: 'sjb' },  //Money Things记账
  'ChatGPTApp': { name: 'Advanced', id: 'com.palligroup.gpt3.yearlyyy', cm: 'sja' },  //ChatAI-中文智能聊天机器人
  'Journal_iOS': { name: 'PRO', id: 'com.pureformstudio.diary.yearly_2022_promo', cm: 'sja' },  //Diarly日历
  'LemonKeepAccounts': { name: 'VIP', id: 'lm_1_1month', cm: 'sja' },  //旺财记账
  'mizframa': { name: 'premium', id: 'mf_20_lifetime2', cm: 'sjb' },  //Mizframa
  'EasyClicker': { name: 'pro', id: 'easyclicker.premium.discount2', cm: 'sjb' },  //自动点击器
  'ImageX': { name: 'imagex.pro.ios', id: 'imagex.pro.ios.lifetime', cm: 'sjb' },  //Imagex
  'image_upscaler': { name: 'pro', id: 'yearly_sub_pro', cm: 'sja' },  //Lens智图
  'DayPoem': { name: 'Pro Access', id: 'com.uzero.poem.month1', cm: 'sja' },  //西江诗词
  'Personal%20Best': { name: 'pro', id: 'PersonalBestPro_Yearly', cm: 'sja' },  //Personal Best-运动报告
  'Darkroom': { name: 'iapkit_darkroomplus', id: 'co.bergen.Darkroom.product.forever.everything', cm: 'sjb' },  //Darkroom-照片/视频编辑
  'CardPhoto': { name: 'allaccess', id: 'CardPhoto_Pro', cm: 'sjb' },  //卡片馆-相框与复古胶片
  'OneWidget': { name: 'allaccess', id: 'com.onewidget.vip', cm: 'sjb' },  //奇妙组件-轻巧桌面小组件
  'PinPaper': { name: 'allaccess', id: 'Paper_Lifetime', cm: 'sjb' },  //InPaper-创作壁纸
  'Cookie': { name: 'allaccess', id: 'app.ft.Bookkeeping.lifetime', cm: 'sjb' },  //Cookie-记账
  'MyThings': { name: 'pro', id: 'xyz.jiaolong.MyThings.pro.infinity', cm: 'sjb' },  //物品指南
  '%E4%BA%8B%E7%BA%BF': { name: 'pro', id: 'xyz.jiaolong.eventline.pro.lifetime', cm: 'sjb' },  //事线-串事成线
  'PipDoc': { name: 'pro', id: 'pipdoc_pro_lifetime', cm: 'sjb' },  //PipDoc-画中画
  'Facebook': { name: 'pro', id: 'fb_pro_lifetime', cm: 'sjb' },  //MetaSurf-社交网站浏览器
  'Free': { name: 'pro', id: 'appspree_pro_lifetime', cm: 'sjb' },  //Appspree
  'Startodo': { name: 'pro', id: 'pro_lifetime', cm: 'sjb' },  //Startodo
  'Browser': { name: 'pro', id: 'pro_zoomable', cm: 'sjb' },  //Zoomable-桌面浏览器
  'YubePiP': { name: 'pro', id: 'piptube_pro_lifetime', cm: 'sjb' },  //YubePiP-油管播放器
  'PrivateBrowser': { name: 'pro', id: 'private_pro_lifetime', cm: 'sjb' },  //Brovacy-隐私浏览器
  'Photo%20Cleaner': { name: 'premium', id: 'com.monocraft.photocleaner.lifetime.3', cm: 'sjb' },  //照片清理Photo Cleaner
  'bluredit': { name: 'Premium', id: 'net.kaleidoscope.bluredit.premium1', cm: 'sja' },  //bluredit-模糊视频&照片
  'TouchRetouchBasic': { name: 'premium', id: 'tr5_yearlysubsc_15dlrs_2', cm: 'sja' },  //TouchRetouch-水印清理
  'TimeFinder': { name: 'pro', id: 'com.lukememet.TimeFinder.Premium', cm: 'sjb' },  //TimeFinder-提醒App
  'Alpenglow': { name: 'newPro', id: 'ProLifetime', cm: 'sja' },  //Alpenglow-日出日落
  'Decision': { name: 'com.nixwang.decision.entitlements.pro', id: 'com.nixwang.decision.pro.annual', cm: 'sja' },  //小决定-选择困难症克星
  'ElementNote': { name: 'pro', id: 'com.soysaucelab.element.note.lifetime', cm: 'sjb' },  //ElementNote-笔记&PDF
  'Noto%20%E7%AC%94%E8%AE%B0': { name: 'pro', id: 'com.lkzhao.editor.full', cm: 'sja' },  //Noto-笔记
  'Tangerine': { name: 'Premium', id: 'PremiumMonthly', cm: 'sja' },  //Tangerine-习惯与情绪追踪
  'Email%20Me': { name: 'premium', id: 'ventura.media.EmailMe.premium.lifetime', cm: 'sjb' },  //Email Me-给自己发邮箱
  'Brass': { name: 'pro', id: 'brass.pro.annual', cm: 'sja' },  //Brass-定制图标&小组件
  'Happy%3ADays': { name: 'pro', id: 'happy_999_lifetime', cm: 'sjb' },  //Happy:Days-小组件App
  'Aphrodite': { name: 'all', id: 'com.ziheng.aphrodite.onetime', cm: 'sjb' },  //Aphrodite-啪啪啪日历
  'apollo': { name: 'all', id: 'com.ziheng.apollo.onetime', cm: 'sjb' },  //Apollo-记录影视
  'widget_art': { name: 'all', id: 'com.ziheng.widgetart.onetime', cm: 'sjb' },  //WidgetArt-自定义小组件
  'audiomack-iphone': { name: 'Premium1', id: 'com.audiomack.premium.2022', cm: 'sja' },  //AudioMack-音乐App
  'MallocVPN': { name: 'IOS_PRO', id: 'malloc_yearly_vpn', cm: 'sja' },  //Malloc VPN
  'WhiteCloud': { name: 'allaccess', id: 'wc_pro_1y', cm: 'sja' },  //白云天气
  'Spark': { name: 'premium', id: 'spark_6999_1y_1w0', nameb: 'premium', idb: 'spark_openai_tokens_4xt', cm: 'sja' },  //Spark_Mail-邮箱管理
  'NotePlan': { name: 'premium', id: 'co.noteplan.subscription.personal.annual', cm: 'sja' },  //NotePlan
  'vibes': { name: 'patron', id: 'com.andyworks.vibes.yearlyPatron', cm: 'sja' },  //NotBoring-Vibes个性化音乐
  'simple-weather': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-天气
  'streaks': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-习惯
  'andyworks-calculator': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-计算器
  'simple-timer': { name: 'patron', id: 'com.andyworks.weather.yearlyPatron', cm: 'sja' },  //NotBoring-时间
  'Harukong': { name: 'premium', id: 'com.bluesignum.harukong.lifetime.premium', cm: 'sjb' },  //天天豆-日记应用
  'UTC': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.subscription.month', cm: 'sja' },  //花样文字
  'OffScreen': { name: 'Entitlement.Pro', id: 'tech.miidii.offscreen.pro', cm: 'sjb' },  //OffScreen-自律番茄钟
  '%E8%B0%9C%E5%BA%95%E9%BB%91%E8%83%B6': { name: 'Entitlement.Pro', id: 'tech.miidii.MDVinyl.lifetime', cm: 'sja' },  //谜底黑胶
  '%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.pro', cm: 'sjb' },  //目标地图
  '%E7%9B%AE%E6%A0%87%E5%9C%B0%E5%9B%BE': { name: 'pro', id: 'com.happydogteam.relax.lifetimePro', cm: 'sjb' },  //
  'APTV': { name: 'Pro', id: 'com.kimen.aptvpro.lifetime', cm: 'sjb' },  //APTV
  'Seamless': { name: 'Seamless.Pro', id: 'net.shinystone.Seamless.Pro', cm: 'sjb' },  //Seamless同步
  'Anybox': { name: 'pro', id: 'cc.anybox.Anybox.annual', cm: 'sja' },  //Anybox-跨平台书签管理
  'ScannerPro': { name: 'plus', id: 'com.ddm1024.premium.yearly', cm: 'sja' },  //Scanner Pro-文档扫描
  'Pillow': { name: 'premium', id: 'com.neybox.pillow.premium.year.v2', cm: 'sja' },  //Pillow-睡眠周期跟踪
  'Taio': { name: 'full-version', id: 'taio_1651_1y_2w0_std_v2', cm: 'sja' },  //Tiao
  'CPUMonitor': { name: 'Pro', id: 'com.mars.cpumonitor_removeAd', cm: 'sjb' },  //手机硬件管家
  'totowallet': { name: 'all', id: 'com.ziheng.totowallet.onetimepurchase', cm: 'sjb' },  //图图记账
  '1Blocker': { name: 'premium', id: 'blocker.ios.iap.lifetime', cm: 'sjb' },  //1Blocker-广告拦截
  'VSCO': { name: 'pro', id: 'vscopro_global_5999_annual_7D_free', cm: 'sja' }  //VSCO-照片与视频编辑编辑
};

var _0xodH='jsjiami.com.v7';const _0x322286=_0x1ec7;(function(_0x2106b2,_0xb6db01,_0x330d7e,_0x2d22c3,_0xf64c2e,_0x1652ba,_0x463afd){return _0x2106b2=_0x2106b2>>0x8,_0x1652ba='hs',_0x463afd='hs',function(_0x2444a4,_0xf3eb44,_0x395560,_0x3790a9,_0x343b2f){const _0x2fdba3=_0x1ec7;_0x3790a9='tfi',_0x1652ba=_0x3790a9+_0x1652ba,_0x343b2f='up',_0x463afd+=_0x343b2f,_0x1652ba=_0x395560(_0x1652ba),_0x463afd=_0x395560(_0x463afd),_0x395560=0x0;const _0x283067=_0x2444a4();while(!![]&&--_0x2d22c3+_0xf3eb44){try{_0x3790a9=-parseInt(_0x2fdba3(0x181,'gD9h'))/0x1*(parseInt(_0x2fdba3(0x18c,'7DMa'))/0x2)+parseInt(_0x2fdba3(0x164,'(sXB'))/0x3+parseInt(_0x2fdba3(0x17f,'%m7q'))/0x4+-parseInt(_0x2fdba3(0x17a,'t%ct'))/0x5+parseInt(_0x2fdba3(0x104,'zBaH'))/0x6*(-parseInt(_0x2fdba3(0x283,'BCP('))/0x7)+parseInt(_0x2fdba3(0x1e2,'gIHD'))/0x8+parseInt(_0x2fdba3(0x21e,'tq0Z'))/0x9*(-parseInt(_0x2fdba3(0x257,'XM[P'))/0xa);}catch(_0x10a795){_0x3790a9=_0x395560;}finally{_0x343b2f=_0x283067[_0x1652ba]();if(_0x2106b2<=_0x2d22c3)_0x395560?_0xf64c2e?_0x3790a9=_0x343b2f:_0xf64c2e=_0x343b2f:_0x395560=_0x343b2f;else{if(_0x395560==_0xf64c2e['replace'](/[yHIXdxfSrCuAQOngUKN=]/g,'')){if(_0x3790a9===_0xf3eb44){_0x283067['un'+_0x1652ba](_0x343b2f);break;}_0x283067[_0x463afd](_0x343b2f);}}}}}(_0x330d7e,_0xb6db01,function(_0x3b69e6,_0x5f58f7,_0x1c209b,_0xf7ed23,_0x34d764,_0x403981,_0x5dedba){return _0x5f58f7='\x73\x70\x6c\x69\x74',_0x3b69e6=arguments[0x0],_0x3b69e6=_0x3b69e6[_0x5f58f7](''),_0x1c209b='\x72\x65\x76\x65\x72\x73\x65',_0x3b69e6=_0x3b69e6[_0x1c209b]('\x76'),_0xf7ed23='\x6a\x6f\x69\x6e',(0x5298bf,_0x3b69e6[_0xf7ed23](''));});}(0xbe00,0xc5197,_0x47de,0xc0),_0x47de)&&(_0xodH=_0x47de);const subChk=ddm[_0x322286(0x1f7,'edk*')]&&ddm[_0x322286(0x10e,'MO((')][_0x322286(0x115,'JfLn')];function _0x47de(){const _0x3444de=(function(){return[_0xodH,'yfdjxsHjuriySaXQOmiKg.OgNcHSomIIn.CvAU7d==','W448WP40k8kBjSkdzCoWWQddKq','WQGKW5WqqH/cUuhcKSoHW6JdRa','W6bEWQJdLCoVWRy','wYvHW5fb','W5GlWOWqnG','WOiiW45EWQ8','tGfcW5ed','WReUW7XWgG','WPVcVatdJCkA','WRfgEttcRa','mGvSWRbX','bHfaka','rSkBW7CWW4zU','eNK0k39Z','vmkDW6yQW4jYWPRdICkMW6q','hCkuW7KBW4a','W6RcQtpcSmor','WQJdNZC','WRhcLez/WRS','W6aCWQCReG','WRjHzG','fSkOc8oNWRXpWPtdUIPCemojWOj3Bq','WQzGEsZcIGq','zX1cW4r6','WParW5Lxhq','WRyxW6W','W5q0W4dcQmoNdLVcHfSDWOBcObm','BISAASkl','ah8LmxTVzXhcRLBdM8obpW','n8kVW78YW4e','W64MocrA','hdv+cbO','WP01W7TiWPa','WRqbW7CdWR4','bCkMWPhdKSkm','vG4TDCkr','WR/dIcZcNmoMW6NcQCkpdc/cGKhcSvSkW4VcUX7dHComW4WpWRroWQbnW78','WPavW7mpWOC','CmkCW7FcMIy','C8kTW5ZcLrW','W7jKsrO8','lSoKW4Owwq','pCoWW7aBDW','W44HfXLoW68dAq','ASknW4iRp8oXWPraj8o5vKG','dmkeW5ehW5i','l8kFWQVdOCkkWPtdMduiWRKEWQX5xCo7kmohtq','e8oaW60rCq','eLL9WPBcGSolp8kuW5fTnCk7WOiFWRBdNSkW','WPqRW7aYyW','eSk1WQNdJCkT','dGRcKG','h8opW4BdVsJcT8oLW7XRdCoXWP3cQmk6W58','WO/cI23dQ8oj','WRZdJIlcJmoMW7K','b8oiWQ0MbSolW653WO3cV8kKhG','WQRcHfL7WRG','WR4/W4OkvqhcTu7cKSo9','W4lcKWpcLmk/','eY1oibC','B8kbW7RcHXFcVSkj','gCooW5/cUJJcV8oTWQa+uCk2W4a','W4bnWQZdSCo9','WRpdUqFcN8ox','W4ivW6BcSSoN','c8ofhbT7iW','mmo3W7iIua','tmkKW4mVW4y','W4ZcRmomz8kC','Amk+W67cHCoS','W7zeWR3dImoUWQNdNMNcQSklm8kj','8kYOTmoz5Qk25RwT5PwU5PES5O2R77+U5zoI5yI25As555wE5PEv5QcDWQRcMvm','W7rEWO/dTSoj','W5CTW5VcVSoh','W4KnWPZcPG','ACklW6W','sGbMW7qD','WQtcRNjGWRldTa','g8opW7pcMc4','sfXPW5ddIW','WRBcPvVdMWlcNcJcSv3dOtddR8op','lCkfdCoGWQe','b8oaWPBdOmkjWPldGH8eWP4AWRyGCCojimof','dmosW4tcTZNcSmo8WPiYw8kNW53cRmkHW5zWmg0','ntH9WPzf','W4yYW5hcSSoJeG','WO/cJmo7W4pdUW','oSoMW7CrEba','WRmYW7fWiq','ftXYWPvIW6u','FmoQzCoRW47cLSkoWPxdLSoWW4qSvCkqs8kgzZ06lg/dN1ZcUmowi0Cbz8k0WPmroXxdNmkVo8oJW5BdQ8olWQjpB8ojWOZcNd0ZWPJcVdNdT2egWO5e','W5tcJY7cV8oX','FCombG','W5tcTX7cGCkPnxq1W71Gc8ou','trHhW4LhWO0','BmkwW6ihhW','W5iwW6u','W4C9WO0','g8ofW58','W4JcRbVcOmoF','WRTEdmkcEa','D0frW43dUW','WPv5q0qkWRSqvSois8oWba','WQNcSMy','D8kwW5lcIdq','efL0','W5pcUCoG','W7mHmNZdMv7dQmoHmSkhW47cHra','6zAr6kYk5l6g5Ok977+J','WPO7WRGFdSkfia','WOmyW41VWQ7cUa','FSovkCkuWQBcM0hdUKtcPJKaW6e','sIinumkUmmkxma','ECoBifH+','dSkmW7azW4a','W4DHWRpdJmo0','W7CzW6FcTSow','AtKirSkq','bJnQWPjUW7pdLW','yCorkfPr','WQ3cJCodWORdLv0wW74fWPy2W4K','AmotWOv2WODqk1ZdMhibvKK','we7cQcZdLCkvW6xcVa','ib7cOSoyWQW','4Ogg77Miv+s7OUMdQEI+OEAlUoIITEwNP+I1To+9H+wtMowkGEwMGoEuV+AuI+AGLmk5ggS','WQFcPrtdJmkj','e29lWRVcNa','6k6n5Rcf6zwU6kY2W6Gq','wNrBW6NdI8kqvCodvL/dL3u','vg5DW5RdTG','WOeXW5b3','ts0dwq','WR/dMZhcI8o2','6k+i5Rgo6zsY6k2VWOpdLq','cdFcQmo/WPi','W6VdJSkuW4VcGr8CW74TWPq'].concat((function(){return['W4tcTr/cTCok','hmkUjCojWOa','FsLqW7ORzCklWOhdG8kdWPzP','W5aDoZbi','W7JdHmkJWPhcPSkKW5eTmmk9W4FdSaNdJ8kL','W5ebWO8ufW','W4VcLa/cSmku','j8o0fwfAg3G','W7H5DH8w','W7FcGNVdGmkRWRldPCoOuq','eCkzcmoMWPO','WOVcTbxdU8k5','cmk7WOpdOmkq','WPnAW4ddP8kzW4lcPr5x','WOXAbCkmvG','pSkJWQ7dT8k6','W4G5W4ZdR8kc','rsfdW4Pp','57UC6lI15lYl5zod','rIiAvCkVomkxlGb2oCkI','W7XEWQhdHmoOWPRdI3hcVCkgl8kBhCohoa','bJnQWOLZW7RdGCodemoCW4ZcQa','WQBcKfzmWRW','qMtcIaJdKG','lmkzWQxdSCkkWOq','4P6dWPRKUy7ML5FMJPlNMi7KUl7NK5BLTOZLHly','zSkBW5eUomoWWOjS','ah8LmxTVzWpcV00','W4OEW7ldLmkH','DSkRW6NcVmoiW5NdUYJcVCoT','FmkaW5aXlSoMWO5Vn8oXtupcIW','oeiPcwG','qc0Ax8kZ','aCkslSohWQO','ACoLi3zy','8l2MLKFLTkdMKltKVjNMI4FLIPFWM42T8yQEU/gjVkJcG+woJ+w/OUEmHUoaJEwlS+s6S+MJP+MaLHPRC8kZWOW/WOFcSNzmW4zRl8okmstdTGauW4lcQCov','zSo0j8kTWOG','pSobW4arFa','WQW5W5Squr0','yxxcNJddOW','k8kKWOpdS8kr','n8oRW4/cLIq','mdv5WQ1u','8kklLG3MOO3MTltLIPlLTQBLSllOL6pNM7dcPSogWOFVV63LTkdOT5VOVzZOH7RMN4BMI4lOOipJGQS','wMjFW6NdJCkzq8oXv1ddL2m','W5SGWOu5kSkun8kXzCoWWQddI2nNWQ7cUCkEWOVdVMSCcLOyW4b5WP4','WOZdTcBcRmow','FmkaW5aXlSoMWO59jSoQ','4Oo777ICkUs5VUMdLUI/U+AkU+IJIUwLHEI3IE++LowtNEwlGEwMLEEwREAwQoAGMmooWQOa','F8kDW4O1bG','W5nBqG8GxG','WR3dIclcKmoe','57QX6lM35l255zoA','W4xdUW/cG2m','gSoEfWvx','WPqQW4zWnmo6','BSkgW4eRkSo6','WR3cNSoqW5FdOa','d8ovW4NcOc/cOCoHWQ8+tq','vuZcRbpdGq','WRVcR8oCW6tdPq','W6eYWRtcMSoX','WOBdUYFcUCo/','wmkgvKSXFrpcKmogW4tdKSoJWOPNW6b9W4b7WOuI','W4OHWPK0omkz','W6GDWOldGxasWOVcVCknwWxdIW','AX4jD8kV','xwnpW7K','WPtdJYhcNmotua','6kYW5Rgr6zst6k6QW5Dk','W5RdP3pcJ8oEWOtcGSkJW7pcPenTW68','WQxcTSoaW6tdSW','exXCcCo2zmolBLuHgCoHW5FdSCofpcVdRmo1ya','W6/cJcFcTa','qWLEW4vdWPC','rcKA','v3tcNrFdRq','W6PArqeE','eam4WPxcUW','AZ15W4K8','kSkonCoUWQy','lqBcLSoSWQ0','zCoRaCkqWPi','W44nW6xdI8kx','W7qYW73dQCkR','bH3cG8oKWPGb','e0j7WQZcG8oHlCksW4b8nmkQWOutWQO','WOtcSsJdS8kJ','W6yyW5lcK8oc','mdirWQpcMq','W7NdImkfW5hcHqm','WQRcIM7dLCoYk8kogWxdOq','CZrzW6a','udKmt8k4jSkBiqbQ','WPK2W5i','f8k7WOBdOCkp','t21zW7pdNa','W40tW6m','wCo0nLn+','rCo6d1n4','W5q1W4pcR8oXd3hcM0Sr','rmk9W5Wjpq','WQnExX/cUq','tJnWW70n','vSkqW5yPaq','WO56rHtcJa','AmoHiNzD','W5C2W73dR8k2','cfnGWR0','W5GNWOGUpmkfkSkmzCoS','WRiFW5GjWOm','emkQW5CIW4G','WOVcTJhdNCkd','oSoLW7qNBaOYW45G','W7z6waFcVbJcVW','W4jarWi','wrLy','W4WMWRe','qKNcJZhdJSkp','uSokxSoyW60','d8ouW4RcPZNcOa','E8kDW5CS','WQhdKN7dG8oNpmkjdaxdSbTQDcLzWPf6','W6NcLHtcU8kEkW','WP4dW4jeWQJcVSoMow43W6NdSSkTWPnNWRJcGW','WQTsjmk4vq','ksT6WQzb','yXfJW61O','WOBdIdpcGCobtq','W405W6/dICk+','cJ4EWRlcJCoheCo6wNddHwHX','WPjjb8knqrJcIZpdNhxcICoYW7OXrSkhq0a','W6y6WPxcL8oZ','d8kHW5izW5S','oXvZWOT3','WPSqW54iva','WPfocSkAvWNcLG7dKgm','6k2x5RgT6zs66k6uBW0'].concat((function(){return['WRBcQgn6WRBdQmk/bL0odCksWRK','4P6UCUAGQUA0LUw2REwUR+wDQ+AFP+AvIoISVoMBKE++RUw3PEwbL+AUQEI8HoIIT+IhV+AEPG','grfk','FCosja','W7inW7RcK8oI','e8obW5aOpZSVW45QfuaP','BmkpW5FcIJ8','BgToW5ddNG','cWVcNSoQWOSh','6k+W5RkM6zAc6kYmsmoS','pSkEWRFdRmkyWPK','WQzzhCkEwq','W4RdVmkLW4JcHG','W5VdSq7cH3G','W4VcVSoIFG','WQj8ztlcNa','WQi+W4aCrcZcRfNcHCoSW7tdVSo1FLK','WPBdJtBcMSo4','ecH8WPnKW6tdJComemoa','hLK1kNW','W6FcPXdcHCkJ','g2jBWOlcMG','W7GUWOtdOZK','oSohWODWECkMW5b5k8owrfxcVW','DSksW7RcTqC','y8oglmksWOq','u8knW7CT','WR0RW5OkuW','W5GxWPRcRmocWOJdTfyBn3XfWOa','EftcOHtdMG','W6tdPblcJN8','WPf5WO7dNt0aWOVcPW','WQdcPxfGWQFdV8kLku0gfSkz','nmkhWPpdR8kk','BSk0W6lcHYO','W48tW7m','WQfaAsJcHq','ch9uWR/cNW','6k+V5Rct6zs56k28yYa','fIizWR7cPLG','z8oRC8oOW57dNSoiW5JdKSoY','WOnig8kauXu','cmo4WPGzyW','W5r6WQldM8o1','umovlgTM','FmkbW4aRi8oZWO55oG','oSoYWP0tqmoNW7jGWOy','WO5udW','bGTppHZdKd0FWRSg','nSouW4pcRX/cM8kiW5u','W47cSGZcTSon','u1dcPHZdGG','kmoGW6ylFaW0W55Gfq','W63cHGZcUCo8','WOzsuXdcNa','DKDfW5xdVG','6k+65RoI6zws6kYiW7/dIq','gCocdGzPpMNdKSksWPG','qJ8DvCk8oG','qmkTW7RcP8opWPa','WQNcJwm','pmo2WPS','WPBdKZ/dM8oqwSoMpLX/WRNcLIC+WRG','W5ddR8kIW6JdGIGhW64NWPreWR0','W5mFWOyBkG','kmomW6i1DG','W5dcJSopDSkT','W7aCWOtdKHGwWQRcISkM','eCkOf8oYWR0QW4VcOdLpeCkgWOnXm8kAW7vDnqb9W5FcR8o8WObyfmoHW57cR8o/r07cV27dTrtdGhtdQbRdLthcR8k5fb3dLgnOW5nkWR1XWPhcRG','W6StWQhdTt0','WRZdJYhcI8oWW7JcTmkYddm','pCofWOb3ymkKW54YC8kHDH3dGrhdRSoehwffia','s8kcW7SRba','WOBdLJe','vZ5nW703','WPGwW75xfW','gfKmWPKuW5D/rgCfWQeVWOG','z8oRC8oOW57dNSoiW4RdG8oPW4jSva','WPVcOIFdJCkiW4BdN8kBW5/cHG','x1lcGbRdImkjW7pcQSoFeIFcLqhdQa/cQK8','WRrMAdBcJHJcTCoKeCkE','8kIBJokcUFcVGjLi5PYY5yYb6yEg5yIs5Psa5O2W77Y48lQlPpczMiJWRzUt','sMjpW6xdN8kCsmo5vG','WQtcNYBdNCks','gZqeWRdcTv4','jSoiW5JcLXK','df5RWR7cUG','mmkPaSo6WRq','q8ozmCkMWQe','Amoop8koWRhcHu3dP1xcOsiD','lmoLbcft','emofW4xcTdJcUW','rd43C8k0','lMKsWQPTmCopWRpdRmkNWQz+WOe','pSouW7yoxa','W6bEWQJdLCoVWRBdUgVcQ8ka','vKD4W4xdNa','4P+cm+AJIUA0JUw0N+wSSUwFToAEJ+AuVoITJUMANE+/VUw2M+wdJUAVP+I/GEIGNoIhUUAEQa','WPv/W6pcO2DNWPRcRCkVwxFcVW','FSo4l8kjWQq','W5BcPCobECkzWQhdU8oO','yJPaW7z5','dZj5','fa1EjbJdJa','W5RcUmoZECkdWQtdQSoGdYfDWQG','tmoRxSotW7y','W4iVW5BcSSoWefFcMuOAWP3cVq','W5aOWQtdOJu','l8kxW5yYW5iACvRdRLa','hviidKi','W4NcSs7cK8o8','oSoqcJr/','dSohlsrM','DvXNW4xdQq','p8oUW7i','W4ZdQmkVW6hcHa','fbVcKSo+WPWDWQlcMSo8W4Kypsy','oXfZWQzp','W4DVWOiOySkKwmo4smkTCbG','wJjMW7rI','frSABmkwmmkR','W5eFWPFdUXi','8j6wL8k75Bsr5y2l6yAb5yUk5PEn5O2G77+N8ykFNFglNktXHP2s','8yMjLYZMOABMT5RMLRNMLPFMJjFVVAZLKRZLI5lLPjNNLBhML7xMOAxdNJn7','WOtcQCohW7hcTSoqWPbUA8o6W4/dOa','WPpcH3D4WRC','rW5nW5m','tmo5q8oPW5q','z8oQCmoVW4JdN8oIW5xdK8oL','W5m8WRtdOJmLWPdcRCkhwW','W4ZcO8oLy8kuWRRdPSoVdZ0','WRFcKgldUCoIlmkfcGpdOrnUlsvcWP5U','WQ7dItdcKCo0W6q','W4e6WQxdUdC5','fXrzWPzP','cCkUdmoMWRTZWPddKd1rdmobWOv+E8kvW7fqkIPGWPJcVmoJWOqzbq'];}()));}()));}());_0x47de=function(){return _0x3444de;};return _0x47de();};function _0x1ec7(_0x40e794,_0x114c12){const _0x47debe=_0x47de();return _0x1ec7=function(_0x1ec70f,_0x149aff){_0x1ec70f=_0x1ec70f-0xfe;let _0x271221=_0x47debe[_0x1ec70f];if(_0x1ec7['MYBDqL']===undefined){var _0x395960=function(_0x556300){const _0x3550e7='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x3d2f7e='',_0x23e285='';for(let _0x3155c5=0x0,_0x32ddd3,_0x4a3ea5,_0x5dd0a0=0x0;_0x4a3ea5=_0x556300['charAt'](_0x5dd0a0++);~_0x4a3ea5&&(_0x32ddd3=_0x3155c5%0x4?_0x32ddd3*0x40+_0x4a3ea5:_0x4a3ea5,_0x3155c5++%0x4)?_0x3d2f7e+=String['fromCharCode'](0xff&_0x32ddd3>>(-0x2*_0x3155c5&0x6)):0x0){_0x4a3ea5=_0x3550e7['indexOf'](_0x4a3ea5);}for(let _0x30b6cf=0x0,_0x24842b=_0x3d2f7e['length'];_0x30b6cf<_0x24842b;_0x30b6cf++){_0x23e285+='%'+('00'+_0x3d2f7e['charCodeAt'](_0x30b6cf)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x23e285);};const _0x160731=function(_0x70fafe,_0x36a47c){let _0x46b0b2=[],_0x36a67c=0x0,_0x223fe6,_0xf216de='';_0x70fafe=_0x395960(_0x70fafe);let _0x1b8058;for(_0x1b8058=0x0;_0x1b8058<0x100;_0x1b8058++){_0x46b0b2[_0x1b8058]=_0x1b8058;}for(_0x1b8058=0x0;_0x1b8058<0x100;_0x1b8058++){_0x36a67c=(_0x36a67c+_0x46b0b2[_0x1b8058]+_0x36a47c['charCodeAt'](_0x1b8058%_0x36a47c['length']))%0x100,_0x223fe6=_0x46b0b2[_0x1b8058],_0x46b0b2[_0x1b8058]=_0x46b0b2[_0x36a67c],_0x46b0b2[_0x36a67c]=_0x223fe6;}_0x1b8058=0x0,_0x36a67c=0x0;for(let _0x586a1a=0x0;_0x586a1a<_0x70fafe['length'];_0x586a1a++){_0x1b8058=(_0x1b8058+0x1)%0x100,_0x36a67c=(_0x36a67c+_0x46b0b2[_0x1b8058])%0x100,_0x223fe6=_0x46b0b2[_0x1b8058],_0x46b0b2[_0x1b8058]=_0x46b0b2[_0x36a67c],_0x46b0b2[_0x36a67c]=_0x223fe6,_0xf216de+=String['fromCharCode'](_0x70fafe['charCodeAt'](_0x586a1a)^_0x46b0b2[(_0x46b0b2[_0x1b8058]+_0x46b0b2[_0x36a67c])%0x100]);}return _0xf216de;};_0x1ec7['lIAoqf']=_0x160731,_0x40e794=arguments,_0x1ec7['MYBDqL']=!![];}const _0x4cefd2=_0x47debe[0x0],_0xffef7a=_0x1ec70f+_0x4cefd2,_0x185149=_0x40e794[_0xffef7a];return!_0x185149?(_0x1ec7['RqmqfN']===undefined&&(_0x1ec7['RqmqfN']=!![]),_0x271221=_0x1ec7['lIAoqf'](_0x271221,_0x149aff),_0x40e794[_0xffef7a]=_0x271221):_0x271221=_0x185149,_0x271221;},_0x1ec7(_0x40e794,_0x114c12);}if(subChk&&typeof subChk===_0x322286(0x1e6,'M%]e')){const now=Date[_0x322286(0x15f,'XM[P')]();if(Object[_0x322286(0x16d,'aYuX')](subChk)[_0x322286(0x11f,'yIUF')](_0x18e9ef=>{const _0x531455=_0x322286,_0x12902b={'skAsq':function(_0x476932,_0x5b5048){return _0x476932==_0x5b5048;},'goXKb':function(_0x39b760,_0x45fafd){return _0x39b760>_0x45fafd;}};if(!_0x18e9ef?.[_0x531455(0x21f,'udM@')])return![];if(_0x12902b[_0x531455(0x11c,'gIHD')](_0x18e9ef[_0x531455(0x19e,'BCP(')],null))return!![];const _0x16e670=Date[_0x531455(0x241,'JfLn')](_0x18e9ef[_0x531455(0x194,'tq0Z')]);return Number[_0x531455(0x18e,'%Mpj')](_0x16e670)&&_0x12902b[_0x531455(0x162,'x35#')](_0x16e670,now);})){console[_0x322286(0x228,'yIUF')](_0x322286(0x287,'%m7q')),$done({});return;}}const finalize=function(_0x54268f=null){const _0x3cceb0=_0x322286,_0x11059f={'YaXKU':function(_0x172f9c,_0xe4dcf6){return _0x172f9c===_0xe4dcf6;},'JufzK':function(_0x53a525,_0xa0784a){return _0x53a525(_0xa0784a);},'KvvdZ':function(_0xccc6f8,_0x25c6c7){return _0xccc6f8!==_0x25c6c7;},'LHccy':_0x3cceb0(0x1ed,'k@dx'),'fIsRV':_0x3cceb0(0x1bf,'9pDv')};_0x54268f&&(_0x11059f[_0x3cceb0(0x12b,'M%]e')](_0x11059f[_0x3cceb0(0x279,'gIHD')],_0x11059f[_0x3cceb0(0x20b,'0s&4')])?_0x11059f[_0x3cceb0(0x145,'JfLn')](_0x4f989b[_0x3cceb0(0x10c,'Mkyt')],0xc8)?_0x11059f[_0x3cceb0(0x1f5,'i!M@')](_0x4960d1,_0x235a12):_0x11059f[_0x3cceb0(0x189,'zBaH')](_0x177076,_0x3cceb0(0x108,'vSsO')+_0x3720d3[_0x3cceb0(0x1b9,'7U@q')]):(obj[_0x3cceb0(0x1df,'tq0Z')]=JSON[_0x3cceb0(0x253,'h0kt')](_0x54268f),console[_0x3cceb0(0x211,'6eA5')](_0x11059f[_0x3cceb0(0x1e8,'%Mpj')]))),_0x11059f[_0x3cceb0(0x1e9,'g%Sr')]($done,obj);};if(typeof $response===_0x322286(0x254,'Bvr&'))delete headers[_0x322286(0x216,'edk*')],delete headers[_0x322286(0x166,'Us5K')],obj[_0x322286(0x150,'XM[P')]=headers,finalize();else{/(offerings|attributes|adservices_attribution)/[_0x322286(0x208,'j9uJ')]($request[_0x322286(0x210,'M%]e')])&&(console[_0x322286(0x228,'yIUF')](_0x322286(0x1c7,'yIUF')),$done({}));const timea={'purchase_date':_0x322286(0x26d,'h0kt'),'expires_date':_0x322286(0x1db,'1K&o')},timeb={'original_purchase_date':_0x322286(0x1e4,'zBaH'),'is_sandbox':![],'store_transaction_id':_0x322286(0x1a0,'vSsO'),'store':_0x322286(0x20d,'6kl^'),'ownership_type':_0x322286(0x269,'6eA5')};let name,nameb,ids,idb,data,anchor=![],localMatched=![];for(const src of[listua,bundle]){for(const i in src){const test=src===listua?ua:bundle_id;if(new RegExp('^'+i,'i')[_0x322286(0x240,'kD7Q')](test)){if(src[i]['cm'][_0x322286(0x1b6,'h0kt')](_0x322286(0x174,'Lf$D')))data=timea,anchor=!![];else{if(src[i]['cm'][_0x322286(0x13f,'t%ct')](_0x322286(0x263,'Bvr&')))data=Object[_0x322286(0x110,'s4vL')]({},timea,{'expires_date':null}),anchor=!![];else src[i]['cm'][_0x322286(0x184,'zBaH')](_0x322286(0x26f,'kPZd'))&&(data=Object[_0x322286(0x16b,'6kl^')]({},timea,{'expires_date':null}),anchor=![]);}ids=src[i]['id'],name=src[i][_0x322286(0x197,'zBaH')]||'',idb=src[i][_0x322286(0x147,'k@dx')],nameb=src[i][_0x322286(0x1aa,'udM@')],localMatched=!![];break;}}if(localMatched)break;}const updateEntitlements=function(_0x5c6241='',_0x2626ad='',_0x485cbd=![]){const _0x1790fd=_0x322286,_0x46fd34={'ShgMS':_0x1790fd(0x190,'i!M@'),'QXrPv':function(_0x17c38e,_0x5c140a,_0x42dc86,_0xf44385){return _0x17c38e(_0x5c140a,_0x42dc86,_0xf44385);},'OrQrb':_0x1790fd(0x229,'Z*V!'),'wPBPr':_0x1790fd(0x148,'x35#'),'HWWbi':function(_0x40fed9,_0x409b65){return _0x40fed9(_0x409b65);},'nfguA':function(_0x39563e,_0x4e3d23){return _0x39563e||_0x4e3d23;},'Dbuwm':function(_0x5cc70a,_0x424297){return _0x5cc70a||_0x424297;},'NQtVY':function(_0xb468ef,_0x4f1bd5){return _0xb468ef||_0x4f1bd5;},'RKjai':_0x1790fd(0xfe,'x35#'),'cqdoL':_0x1790fd(0x1ae,'Mkyt'),'mSrhd':_0x1790fd(0x1a9,'JP6V'),'XgRri':function(_0x43b045,_0x4fafcf){return _0x43b045&&_0x4fafcf;},'kMKsp':function(_0x6e5732,_0x1e1909){return _0x6e5732===_0x1e1909;},'PXEmR':_0x1790fd(0x127,'gD9h')},_0x11a27f=_0x46fd34[_0x1790fd(0x23f,'Z*V!')](name,_0x5c6241),_0x2cd6f6=_0x46fd34[_0x1790fd(0x231,'udM@')](ids,_0x2626ad),_0x576775=_0x46fd34[_0x1790fd(0x28b,'M%]e')](data,timea),_0x4325ca=Object[_0x1790fd(0x230,'Us5K')]({},_0x576775,timeb);if(!anchor){const _0x5b0f47={'price':{'amount':0x0,'currency':_0x46fd34[_0x1790fd(0x13c,'g%Sr')]},'display_name':_0x46fd34[_0x1790fd(0x237,'kPZd')]};ddm[_0x1790fd(0x274,'gIHD')][_0x1790fd(0x10f,'edk*')]=Object[_0x1790fd(0x155,'1K&o')](ddm[_0x1790fd(0x122,'kD7Q')][_0x1790fd(0x144,'j9uJ')]||{},{[_0x2cd6f6]:[Object[_0x1790fd(0x1d3,'ofNM')]({},{'id':_0x46fd34[_0x1790fd(0x239,'7k!4')]},_0x4325ca,_0x5b0f47)]}),ddm[_0x1790fd(0x24e,'Mkyt')][_0x1790fd(0x1f2,'j9uJ')]=Object[_0x1790fd(0x27a,'i!M@')](ddm[_0x1790fd(0x19b,'7DMa')][_0x1790fd(0x129,'i&Oa')]||{},{[_0x2cd6f6]:Object[_0x1790fd(0x24f,'udM@')]({},_0x576775,_0x5b0f47)});}_0x46fd34[_0x1790fd(0x10b,'Mkyt')](!_0x485cbd,_0x11a27f)&&(ddm[_0x1790fd(0x26c,'s4vL')][_0x1790fd(0x290,'mrTZ')]=Object[_0x1790fd(0x110,'s4vL')](ddm[_0x1790fd(0x10d,'6eA5')][_0x1790fd(0x28e,'MO((')]||{},{[_0x11a27f]:Object[_0x1790fd(0x1d3,'ofNM')]({},_0x576775,{'product_identifier':_0x2cd6f6})})),ddm[_0x1790fd(0x274,'gIHD')][_0x1790fd(0x273,'Mkyt')]=Object[_0x1790fd(0x27a,'i!M@')](ddm[_0x1790fd(0x25a,'6kl^')][_0x1790fd(0x183,'Z*V!')]||{},{[_0x2cd6f6]:_0x4325ca}),_0x46fd34[_0x1790fd(0x23c,'6eA5')](idb,nameb)&&!_0x485cbd&&(_0x46fd34[_0x1790fd(0x131,'0s&4')](_0x46fd34[_0x1790fd(0x188,'mrTZ')],_0x46fd34[_0x1790fd(0x135,'&5B$')])?(ddm[_0x1790fd(0x14d,'JfLn')][_0x1790fd(0x1b1,'aYuX')]=Object[_0x1790fd(0x1e0,'kPZd')](ddm[_0x1790fd(0x238,'aYuX')][_0x1790fd(0x1af,'zBaH')],{[nameb]:Object[_0x1790fd(0x172,'M%]e')]({},_0x576775,{'product_identifier':idb})}),ddm[_0x1790fd(0x276,'%m7q')][_0x1790fd(0x12e,'mrTZ')]=Object[_0x1790fd(0x1f1,'k@dx')](ddm[_0x1790fd(0x1f9,'zBaH')][_0x1790fd(0x242,'JP6V')],{[idb]:_0x4325ca})):(_0x378159[_0x1790fd(0x17b,'(s!S')](_0x46fd34[_0x1790fd(0x1c6,'aYuX')]),_0x46fd34[_0x1790fd(0x11e,'aYuX')](_0x4e0d28,_0x46fd34[_0x1790fd(0x191,'gIHD')],_0x46fd34[_0x1790fd(0x163,'tq0Z')],![]),_0x46fd34[_0x1790fd(0x1fe,'5!q2')](_0x20017f,_0x14768d)));},fetchProductEntitlements=function(){const _0x745305=_0x322286,_0x2a51b4={'tIGvn':function(_0x1f13e6,_0x54edd0){return _0x1f13e6(_0x54edd0);},'phxwK':function(_0xe09cdb,_0x51284c){return _0xe09cdb===_0x51284c;},'kbvZO':function(_0x1b6f17,_0x520eaf){return _0x1b6f17(_0x520eaf);},'iKSEe':function(_0x2ac37c,_0x88732e){return _0x2ac37c!==_0x88732e;},'lEkGP':_0x745305(0x134,'tkrW'),'RGSpd':_0x745305(0x247,'Us5K'),'URdBu':_0x745305(0x185,'5!q2'),'iJwjo':_0x745305(0x168,'aYuX'),'Oomnn':_0x745305(0x13d,'6kl^'),'oYXrm':function(_0x93c715,_0x40a17c){return _0x93c715(_0x40a17c);},'VPbBZ':function(_0x1369bd,_0x332a6a,_0xfc65ee,_0x3f39ae){return _0x1369bd(_0x332a6a,_0xfc65ee,_0x3f39ae);},'ZhsDU':function(_0x32d156,_0x3411aa){return _0x32d156||_0x3411aa;},'DwIiI':function(_0x168260,_0x2c1e26){return _0x168260||_0x2c1e26;},'zSeIH':_0x745305(0x12d,'ofNM'),'aNjrE':_0x745305(0x1d0,'i&Oa'),'hKJwW':_0x745305(0x1a5,'s4vL'),'TOQqV':function(_0x340ae7,_0x192641){return _0x340ae7&&_0x192641;},'TYnbo':_0x745305(0x227,'gD9h'),'eArvC':_0x745305(0x1a8,'Us5K'),'qeFhu':_0x745305(0x157,'kD7Q'),'AYpHF':_0x745305(0x278,'tq0Z'),'OzWMH':function(_0x5149ed,_0x51cf44){return _0x5149ed===_0x51cf44;},'vUsqA':_0x745305(0x23e,'XM[P'),'cMWEi':_0x745305(0x1b5,'s4vL'),'qcCvv':function(_0x4b01a4,_0x31baf3){return _0x4b01a4!==_0x31baf3;},'RQFgD':_0x745305(0x13a,'XM[P'),'hEkdT':_0x745305(0x107,'edk*'),'sGuLK':function(_0x4370dc){return _0x4370dc();},'KHnKp':function(_0x56d1aa,_0x1190bc){return _0x56d1aa>_0x1190bc;},'UNygE':function(_0x433e65,_0x5ea2b1){return _0x433e65!==_0x5ea2b1;},'uBCIJ':_0x745305(0x18f,'k@dx'),'iPydX':_0x745305(0x187,'OATn'),'JvdFF':function(_0x202f5b,_0x179f7e){return _0x202f5b(_0x179f7e);},'NyzAd':function(_0x35029e,_0x755c54){return _0x35029e==_0x755c54;},'dMUZT':function(_0x30f998,_0x27e0bb){return _0x30f998(_0x27e0bb);},'eoowq':_0x745305(0x28f,'Mkyt'),'CNeTE':_0x745305(0x1c3,'%Mpj'),'kkLiM':_0x745305(0x180,'9pDv'),'xFBGO':_0x745305(0x16e,'Mkyt'),'HUiin':_0x745305(0x26a,'i&Oa'),'gTHKk':function(_0x106552,_0x5650d7){return _0x106552(_0x5650d7);}},_0x1893e6={'url':_0x2a51b4[_0x745305(0x1be,'5!q2')],'headers':headers},_0x9a143c=_0x2a51b4[_0x745305(0x143,'6kl^')],_0x4127c6=function(_0x4dd180){const _0x4ff921=_0x745305,_0x5921a2={'ccPER':function(_0xee911a,_0x4fa138){const _0x1a99a0=_0x1ec7;return _0x2a51b4[_0x1a99a0(0x13b,'XM[P')](_0xee911a,_0x4fa138);},'prIkF':function(_0x4ff726,_0x545c24){const _0x2e7bb2=_0x1ec7;return _0x2a51b4[_0x2e7bb2(0x24b,'j9uJ')](_0x4ff726,_0x545c24);},'dqBVz':function(_0x53b74c,_0x4ad859){const _0x55b0b5=_0x1ec7;return _0x2a51b4[_0x55b0b5(0x1cd,'h0kt')](_0x53b74c,_0x4ad859);},'JPLEP':function(_0x1d619e,_0x3aefa1){const _0x89d9e2=_0x1ec7;return _0x2a51b4[_0x89d9e2(0x126,'(s!S')](_0x1d619e,_0x3aefa1);},'eHlNN':function(_0x231a7e,_0x558c57){const _0x295e06=_0x1ec7;return _0x2a51b4[_0x295e06(0x195,'tq0Z')](_0x231a7e,_0x558c57);},'IiLQa':function(_0x3cf757,_0x3944c0){const _0x1546d4=_0x1ec7;return _0x2a51b4[_0x1546d4(0x1e3,'vSsO')](_0x3cf757,_0x3944c0);},'SRVlh':_0x2a51b4[_0x4ff921(0x21d,'Lf$D')],'qVAjB':_0x2a51b4[_0x4ff921(0x232,'7DMa')],'tLAak':function(_0x57b478,_0xfcb145){const _0x3ef00f=_0x4ff921;return _0x2a51b4[_0x3ef00f(0x112,'aYuX')](_0x57b478,_0xfcb145);},'KKdEh':function(_0x3d4167,_0x36fa0d){const _0x5a1e3b=_0x4ff921;return _0x2a51b4[_0x5a1e3b(0x1c4,'Us5K')](_0x3d4167,_0x36fa0d);},'GdaoE':_0x2a51b4[_0x4ff921(0x294,'S@RQ')],'RnDXq':_0x2a51b4[_0x4ff921(0x1ad,'M%]e')],'PfeFc':_0x2a51b4[_0x4ff921(0x270,'BCP(')],'SgePg':function(_0x5b6fb1,_0x3a218c){const _0xbee08d=_0x4ff921;return _0x2a51b4[_0xbee08d(0x156,'6kl^')](_0x5b6fb1,_0x3a218c);},'AvMZq':function(_0x498276,_0x1f24b1){const _0x230475=_0x4ff921;return _0x2a51b4[_0x230475(0x27c,'j9uJ')](_0x498276,_0x1f24b1);},'FTOCP':function(_0xd0ddd0,_0x36b948){const _0x27e3dc=_0x4ff921;return _0x2a51b4[_0x27e3dc(0x19a,'k@dx')](_0xd0ddd0,_0x36b948);},'grYOo':function(_0x264272,_0x479d57,_0xc136dc,_0x5c5dd3){const _0x11846c=_0x4ff921;return _0x2a51b4[_0x11846c(0x11a,'BCP(')](_0x264272,_0x479d57,_0xc136dc,_0x5c5dd3);},'ULXHf':function(_0x8651a2,_0x34fd16){const _0x1293b3=_0x4ff921;return _0x2a51b4[_0x1293b3(0x27b,'x35#')](_0x8651a2,_0x34fd16);},'GPkzo':function(_0x5b6220,_0x2de2c7){const _0x37c756=_0x4ff921;return _0x2a51b4[_0x37c756(0x26e,'h0kt')](_0x5b6220,_0x2de2c7);},'VbPnT':function(_0x20f171,_0x9807c7){const _0x380167=_0x4ff921;return _0x2a51b4[_0x380167(0x11b,'ofNM')](_0x20f171,_0x9807c7);},'mOKND':_0x2a51b4[_0x4ff921(0x1a1,'gD9h')],'GoeoW':_0x2a51b4[_0x4ff921(0x1ab,'Us5K')],'Hldnx':_0x2a51b4[_0x4ff921(0x1ee,'Z*V!')],'vJyaX':function(_0x1ec16b,_0xb44a83){const _0xf35582=_0x4ff921;return _0x2a51b4[_0xf35582(0x177,'S@RQ')](_0x1ec16b,_0xb44a83);},'MgtVP':function(_0x586009,_0x30fe48){const _0x123a78=_0x4ff921;return _0x2a51b4[_0x123a78(0x192,'j9uJ')](_0x586009,_0x30fe48);},'xNMEd':function(_0x5aebd8,_0x2c4abe){const _0x39d887=_0x4ff921;return _0x2a51b4[_0x39d887(0x14c,'(s!S')](_0x5aebd8,_0x2c4abe);},'XHmkp':_0x2a51b4[_0x4ff921(0x165,'i&Oa')],'gtFWS':_0x2a51b4[_0x4ff921(0x284,'6kl^')],'FkDir':_0x2a51b4[_0x4ff921(0x25b,'S@RQ')],'YedkL':_0x2a51b4[_0x4ff921(0x1f4,'mrTZ')],'Htpep':function(_0x3937b9,_0x108113){const _0x4f214f=_0x4ff921;return _0x2a51b4[_0x4f214f(0x286,'tq0Z')](_0x3937b9,_0x108113);},'MXmHR':function(_0x3246b5,_0x4ede85){const _0x3cc945=_0x4ff921;return _0x2a51b4[_0x3cc945(0x133,'yIUF')](_0x3246b5,_0x4ede85);},'ZKUWs':function(_0x400758,_0x112a87){const _0x496216=_0x4ff921;return _0x2a51b4[_0x496216(0x21b,'M%]e')](_0x400758,_0x112a87);},'wROEs':_0x2a51b4[_0x4ff921(0x11d,'%m7q')],'IKnUG':function(_0x559100,_0x44cbe6){const _0x2e628c=_0x4ff921;return _0x2a51b4[_0x2e628c(0x1b8,'Lf$D')](_0x559100,_0x44cbe6);},'plyeC':_0x2a51b4[_0x4ff921(0x1b2,'(s!S')]};if(_0x2a51b4[_0x4ff921(0x1d5,'vSsO')](_0x2a51b4[_0x4ff921(0x160,'BCP(')],_0x2a51b4[_0x4ff921(0x258,'S@RQ')]))_0x5921a2[_0x4ff921(0x1a7,'gIHD')](_0x4828e1,_0x4ff921(0x225,'g%Sr')+_0x5d6e3d);else return new Promise((_0x2dfc57,_0x1e6440)=>{const _0x2568cd=_0x4ff921,_0x4f6e2a={'HRgKt':function(_0x4eadec,_0x2311d1){const _0x37def6=_0x1ec7;return _0x5921a2[_0x37def6(0x123,'0s&4')](_0x4eadec,_0x2311d1);},'vYRTB':function(_0x53184b,_0x380d2a){const _0x5a61f0=_0x1ec7;return _0x5921a2[_0x5a61f0(0x22d,'tq0Z')](_0x53184b,_0x380d2a);},'sYfMi':function(_0x31ddf5,_0xd1ba51){const _0x333a28=_0x1ec7;return _0x5921a2[_0x333a28(0x12f,'zBaH')](_0x31ddf5,_0xd1ba51);},'fpxbK':function(_0x31a7b7,_0x284101){const _0x4aa467=_0x1ec7;return _0x5921a2[_0x4aa467(0x1bd,'i&Oa')](_0x31a7b7,_0x284101);},'xMlFu':_0x5921a2[_0x2568cd(0x222,'aYuX')]};if(_0x5921a2[_0x2568cd(0x205,'%m7q')](_0x5921a2[_0x2568cd(0x15c,'OATn')],_0x5921a2[_0x2568cd(0x16c,'ofNM')])){const _0x311a88={'url':_0x4dd180,'headers':headers};if(_0x5921a2[_0x2568cd(0x219,'udM@')](typeof $task,_0x5921a2[_0x2568cd(0x178,'udM@')]))$task[_0x2568cd(0x13e,'6kl^')](_0x311a88)[_0x2568cd(0x234,'MO((')](_0x2ca997=>{const _0x1ad94b=_0x2568cd;_0x4f6e2a[_0x1ad94b(0x1de,'zBaH')](_0x2ca997[_0x1ad94b(0x285,'OATn')],0xc8)?_0x4f6e2a[_0x1ad94b(0x103,'M%]e')](_0x2dfc57,_0x2ca997):_0x4f6e2a[_0x1ad94b(0x1b3,'%Mpj')](_0x1e6440,_0x1ad94b(0x1dd,'6eA5')+_0x2ca997[_0x1ad94b(0x200,'mrTZ')]);})[_0x2568cd(0x1bc,'zBaH')](_0x5c1e95=>{const _0x2386e1=_0x2568cd;_0x4f6e2a[_0x2386e1(0x244,'(sXB')](_0x1e6440,_0x2386e1(0x24c,'BCP(')+_0x5c1e95);});else{if(_0x5921a2[_0x2568cd(0x1cf,'kPZd')](typeof $httpClient,_0x5921a2[_0x2568cd(0x204,'h0kt')]))$httpClient[_0x2568cd(0x1e7,'zBaH')](_0x311a88,(_0x1d9f92,_0x551ab6,_0x11e850)=>{const _0x1eba54=_0x2568cd;if(_0x1d9f92)_0x5921a2[_0x1eba54(0x17c,'XM[P')](_0x1e6440,_0x1eba54(0x193,'i!M@')+_0x1d9f92);else _0x5921a2[_0x1eba54(0x296,'1K&o')](_0x551ab6[_0x1eba54(0x214,'x35#')],0xc8)?_0x5921a2[_0x1eba54(0x1d9,'JP6V')](_0x2dfc57,Object[_0x1eba54(0x1d4,'h0kt')](_0x551ab6,{'body':_0x11e850})):_0x5921a2[_0x1eba54(0x12c,'ofNM')](_0x1e6440,_0x1eba54(0x22b,'6kl^')+_0x551ab6[_0x1eba54(0x21c,'kPZd')]);});else{if(_0x5921a2[_0x2568cd(0x146,'Us5K')](typeof $https,_0x5921a2[_0x2568cd(0x178,'udM@')]))$https[_0x2568cd(0x125,'s4vL')](_0x311a88,(_0x5afece,_0x336dfb,_0x12f595)=>{const _0x3564f0=_0x2568cd;if(_0x5afece)_0x5921a2[_0x3564f0(0x205,'%m7q')](_0x5921a2[_0x3564f0(0x1ec,'i&Oa')],_0x5921a2[_0x3564f0(0x105,'6eA5')])?_0x5921a2[_0x3564f0(0x139,'&5B$')](_0x1e6440,_0x3564f0(0x25e,'Z*V!')+_0x5afece):_0x4f6e2a[_0x3564f0(0x118,'gD9h')](_0x5da7e9,_0x3564f0(0x1e1,'%m7q')+_0x57252b);else _0x5921a2[_0x3564f0(0x1d7,'%Mpj')](_0x336dfb[_0x3564f0(0x182,'tkrW')],0xc8)?_0x5921a2[_0x3564f0(0x1c5,'x35#')](_0x2dfc57,Object[_0x3564f0(0x120,'kD7Q')](_0x336dfb,{'body':_0x12f595})):_0x5921a2[_0x3564f0(0x173,'h0kt')](_0x1e6440,_0x3564f0(0x14b,'Bvr&')+_0x336dfb[_0x3564f0(0x116,'OATn')]);});else _0x5921a2[_0x2568cd(0x220,'JP6V')](typeof $http,_0x5921a2[_0x2568cd(0x233,'(sXB')])?$http[_0x2568cd(0x176,'x35#')](_0x311a88,(_0x46c8dc,_0x4abb11,_0x13788e)=>{const _0x3c89ef=_0x2568cd,_0x109dd9={'yBCGJ':function(_0x4845c8,_0x53bbc4){const _0x545114=_0x1ec7;return _0x5921a2[_0x545114(0x297,'tq0Z')](_0x4845c8,_0x53bbc4);}};if(_0x5921a2[_0x3c89ef(0x132,'t%ct')](_0x5921a2[_0x3c89ef(0x250,'Bvr&')],_0x5921a2[_0x3c89ef(0x186,'0s&4')])){if(_0x46c8dc)_0x5921a2[_0x3c89ef(0x243,'%Mpj')](_0x5921a2[_0x3c89ef(0x295,'1K&o')],_0x5921a2[_0x3c89ef(0x141,'0s&4')])?_0x109dd9[_0x3c89ef(0x206,'5!q2')](_0x1fad99,_0x3c89ef(0x171,'S@RQ')+_0x39b187[_0x3c89ef(0x25f,'1K&o')]):_0x5921a2[_0x3c89ef(0x152,'OATn')](_0x1e6440,_0x3c89ef(0x22f,'XM[P')+_0x46c8dc);else _0x5921a2[_0x3c89ef(0x252,'5!q2')](_0x4abb11[_0x3c89ef(0x1ce,'g%Sr')],0xc8)?_0x5921a2[_0x3c89ef(0x213,'Mkyt')](_0x2dfc57,Object[_0x3c89ef(0x260,'zBaH')](_0x4abb11,{'body':_0x13788e})):_0x5921a2[_0x3c89ef(0x18b,'5!q2')](_0x1e6440,_0x3c89ef(0x1dd,'6eA5')+_0x4abb11[_0x3c89ef(0x14a,'s4vL')]);}else{_0x4582d3[_0x3c89ef(0x17e,'MO((')](_0x4f6e2a[_0x3c89ef(0x266,'gD9h')]),_0x4f6e2a[_0x3c89ef(0x267,'6kl^')](_0x4a94f3,{});return;}}):_0x5921a2[_0x2568cd(0x136,'Us5K')](_0x5921a2[_0x2568cd(0x19f,'t%ct')],_0x5921a2[_0x2568cd(0x1d8,'vSsO')])?_0x5921a2[_0x2568cd(0x25d,'tq0Z')](_0x1e6440,_0x5921a2[_0x2568cd(0x15d,'mrTZ')]):_0x5921a2[_0x2568cd(0x282,'zBaH')](_0x4631d4,'',_0x236f42,!![]);}}}else{const _0x5ec722=_0x5921a2[_0x2568cd(0x22a,'mrTZ')](_0x1a1847,_0x2d2c39),_0x59d19a=_0x5921a2[_0x2568cd(0x251,'OATn')](_0x3352b2,_0x147365),_0x5302ad=_0x5921a2[_0x2568cd(0x203,'BCP(')](_0x98b8e1,_0x46f462),_0x52f31b=_0x4015b7[_0x2568cd(0x169,'mrTZ')]({},_0x5302ad,_0x37685b);if(!_0x527792){const _0xb52dd8={'price':{'amount':0x0,'currency':_0x5921a2[_0x2568cd(0x271,'ofNM')]},'display_name':_0x5921a2[_0x2568cd(0x1d1,'(sXB')]};_0xcdddbf[_0x2568cd(0x292,'0s&4')][_0x2568cd(0x218,'tkrW')]=_0x400c45[_0x2568cd(0x121,'7k!4')](_0x3fd3ca[_0x2568cd(0x256,'yIUF')][_0x2568cd(0x275,'%Mpj')]||{},{[_0x59d19a]:[_0x3118f8[_0x2568cd(0x1d4,'h0kt')]({},{'id':_0x5921a2[_0x2568cd(0x16f,'S@RQ')]},_0x52f31b,_0xb52dd8)]}),_0x4115c3[_0x2568cd(0x209,'gD9h')][_0x2568cd(0x236,'JfLn')]=_0x485cd8[_0x2568cd(0x12a,'%m7q')](_0x7f8771[_0x2568cd(0x1f7,'edk*')][_0x2568cd(0x1b0,'OATn')]||{},{[_0x59d19a]:_0x50306c[_0x2568cd(0x161,'(s!S')]({},_0x5302ad,_0xb52dd8)});}_0x5921a2[_0x2568cd(0x207,'Lf$D')](!_0x135e99,_0x5ec722)&&(_0x313bd2[_0x2568cd(0x1d6,'x35#')][_0x2568cd(0x27f,'Z*V!')]=_0x9e5ba9[_0x2568cd(0x111,'6eA5')](_0x43b31a[_0x2568cd(0x1f9,'zBaH')][_0x2568cd(0x151,'x35#')]||{},{[_0x5ec722]:_0x2c738f[_0x2568cd(0x217,'9pDv')]({},_0x5302ad,{'product_identifier':_0x59d19a})})),_0x22c72d[_0x2568cd(0x209,'gD9h')][_0x2568cd(0x100,'k@dx')]=_0x34c1e0[_0x2568cd(0x1c2,'JfLn')](_0x163f97[_0x2568cd(0x1cb,'h0kt')][_0x2568cd(0x1ba,'h0kt')]||{},{[_0x59d19a]:_0x52f31b}),_0x5921a2[_0x2568cd(0x124,'S@RQ')](_0x45e874,_0x46fd89)&&!_0x1cd9fc&&(_0x22ab71[_0x2568cd(0x1b7,'7k!4')][_0x2568cd(0x1c8,'tq0Z')]=_0x342d7d[_0x2568cd(0x28d,'yIUF')](_0x1738f3[_0x2568cd(0x238,'aYuX')][_0x2568cd(0x15a,'OATn')],{[_0x398323]:_0x158c0a[_0x2568cd(0x1c2,'JfLn')]({},_0x5302ad,{'product_identifier':_0x339848})}),_0x1aa63b[_0x2568cd(0x1d6,'x35#')][_0x2568cd(0x226,'(s!S')]=_0x255676[_0x2568cd(0x1f6,'7DMa')](_0x2275af[_0x2568cd(0x224,'udM@')][_0x2568cd(0x130,'7k!4')],{[_0x3a443e]:_0x52f31b}));}});};return _0x2a51b4[_0x745305(0x23b,'j9uJ')](_0x4127c6,_0x1893e6[_0x745305(0x128,'%m7q')])[_0x745305(0x196,'ofNM')](_0x4dc827=>{const _0xd85c28=_0x745305,_0x276dab={'oqaEy':_0x2a51b4[_0xd85c28(0x1a6,'i&Oa')],'oXHfZ':function(_0x219ef4){const _0x334baf=_0xd85c28;return _0x2a51b4[_0x334baf(0x1da,'kPZd')](_0x219ef4);}},_0x1dd41d=JSON[_0xd85c28(0x198,'s4vL')](_0x4dc827[_0xd85c28(0x15e,'JP6V')]);if(_0x1dd41d&&_0x1dd41d[_0xd85c28(0x113,'i&Oa')]&&_0x2a51b4[_0xd85c28(0x1bb,'7k!4')](Object[_0xd85c28(0x10a,'M%]e')](_0x1dd41d[_0xd85c28(0x138,'s4vL')])[_0xd85c28(0x22e,'k@dx')],0x0)){if(_0x2a51b4[_0xd85c28(0x1f0,'Lf$D')](_0x2a51b4[_0xd85c28(0x137,'zBaH')],_0x2a51b4[_0xd85c28(0x248,'XM[P')]))return _0x4dc827;else{_0x521b70[_0xd85c28(0x1fa,'ofNM')](_0x276dab[_0xd85c28(0x1ef,'Lf$D')]),_0x276dab[_0xd85c28(0x268,'MO((')](_0x5eb59b);return;}}else return _0x2a51b4[_0xd85c28(0x14e,'9pDv')](_0x4127c6,_0x9a143c);})[_0x745305(0x1bc,'zBaH')](_0x3ada0f=>{const _0x613be1=_0x745305,_0x501def={'TSYYf':function(_0x45b639,_0x87a97f){const _0x447478=_0x1ec7;return _0x2a51b4[_0x447478(0x27e,'Z*V!')](_0x45b639,_0x87a97f);},'kTlJM':function(_0x4231f7,_0xd4b45a){const _0x49f682=_0x1ec7;return _0x2a51b4[_0x49f682(0x201,'h0kt')](_0x4231f7,_0xd4b45a);},'AAYUq':_0x2a51b4[_0x613be1(0x1ff,'5!q2')],'XLmFH':function(_0x5a5a79,_0x5a1602){const _0x587a38=_0x613be1;return _0x2a51b4[_0x587a38(0x202,'%m7q')](_0x5a5a79,_0x5a1602);}};if(_0x2a51b4[_0x613be1(0x1d2,'1K&o')](_0x2a51b4[_0x613be1(0x235,'%m7q')],_0x2a51b4[_0x613be1(0x1ca,'s4vL')])){const _0x188a4c=_0x4a3ea5[_0x613be1(0x249,'Lf$D')]();if(_0x5dd0a0[_0x613be1(0x16d,'aYuX')](_0x30b6cf)[_0x613be1(0x1e5,'S@RQ')](_0x2a57ca=>{const _0x5914cf=_0x613be1;if(!_0x2a57ca?.[_0x5914cf(0x167,'x35#')])return![];if(_0x501def[_0x5914cf(0xff,'7DMa')](_0x2a57ca[_0x5914cf(0x246,'(s!S')],null))return!![];const _0x111ddd=_0x36a67c[_0x5914cf(0x1fc,'tq0Z')](_0x2a57ca[_0x5914cf(0x140,'h0kt')]);return _0x223fe6[_0x5914cf(0x28a,'MO((')](_0x111ddd)&&_0x501def[_0x5914cf(0x1c0,'Z*V!')](_0x111ddd,_0x188a4c);})){_0xf216de[_0x613be1(0x17e,'MO((')](_0x501def[_0x613be1(0x25c,'%m7q')]),_0x501def[_0x613be1(0x101,'aYuX')](_0x1b8058,{});return;}}else return console[_0x613be1(0x1fd,'Lf$D')](_0x2a51b4[_0x613be1(0x22c,'XM[P')],_0x3ada0f),_0x2a51b4[_0x613be1(0x21a,'aYuX')](_0x4127c6,_0x9a143c);});},fallbackSolution=function(){const _0x58b9aa=_0x322286,_0x192213={'szKwk':_0x58b9aa(0x1cc,'%m7q'),'bmHYy':function(_0x4fc793,_0x1014cd,_0x3e5549,_0x427142){return _0x4fc793(_0x1014cd,_0x3e5549,_0x427142);},'Iuaxz':_0x58b9aa(0x262,'edk*'),'lfmMH':_0x58b9aa(0x264,'kPZd'),'rdbEt':function(_0x3b70f7,_0x25baae){return _0x3b70f7(_0x25baae);}};console[_0x58b9aa(0x28c,'aYuX')](_0x192213[_0x58b9aa(0x158,'MO((')]),_0x192213[_0x58b9aa(0x259,'%Mpj')](updateEntitlements,_0x192213[_0x58b9aa(0x27d,'i&Oa')],_0x192213[_0x58b9aa(0x1f3,'gIHD')],![]),_0x192213[_0x58b9aa(0x119,'tkrW')](finalize,ddm);};localMatched?(console[_0x322286(0x170,'5!q2')](_0x322286(0x106,'XM[P')),updateEntitlements(),finalize(ddm)):(console[_0x322286(0x175,'gD9h')](_0x322286(0x277,'0s&4')),fetchProductEntitlements()[_0x322286(0x215,'h0kt')](_0x448548=>{const _0x44f76a=_0x322286,_0x4b7b5e={'fScmh':function(_0x480b7d,_0x415253){return _0x480b7d(_0x415253);},'VZvqb':function(_0x4f0f18,_0x4a3cf1){return _0x4f0f18===_0x4a3cf1;},'XVUdC':function(_0x3bce3c,_0x3f6281){return _0x3bce3c(_0x3f6281);},'FEUjc':function(_0x2e3677,_0x2d7c3a){return _0x2e3677===_0x2d7c3a;},'wNUqa':_0x44f76a(0x1fb,'Us5K'),'oBwWZ':_0x44f76a(0x289,'Z*V!'),'VtaMX':_0x44f76a(0x15b,'Bvr&'),'jDOLi':function(_0x3d2499){return _0x3d2499();},'slYZe':function(_0x2c41c4,_0x2fd963){return _0x2c41c4===_0x2fd963;},'mafMQ':function(_0x2c8e53,_0x942f6,_0x50b8a6,_0x435ba1){return _0x2c8e53(_0x942f6,_0x50b8a6,_0x435ba1);},'KZwdm':function(_0x104b18,_0x5bdbf6){return _0x104b18===_0x5bdbf6;},'eTDic':_0x44f76a(0x20a,'&5B$'),'iEHal':function(_0xb318c4,_0x1ba823){return _0xb318c4!==_0x1ba823;},'Cqhbm':_0x44f76a(0x280,'1K&o'),'nXOLZ':function(_0x2f12d6,_0xd23a1a,_0x56fee4,_0x3b36cb){return _0x2f12d6(_0xd23a1a,_0x56fee4,_0x3b36cb);},'SCfXj':function(_0x95e89d,_0x1e2372){return _0x95e89d(_0x1e2372);}},_0x208f72=JSON[_0x44f76a(0x291,'6eA5')](_0x448548[_0x44f76a(0x20f,'g%Sr')]),_0x18e0f8=_0x208f72[_0x44f76a(0x1c9,'gD9h')]||{};if(!_0x18e0f8||_0x4b7b5e[_0x44f76a(0x153,'kPZd')](Object[_0x44f76a(0x1f8,'BCP(')](_0x18e0f8)[_0x44f76a(0x24d,'i!M@')],0x0)){if(_0x4b7b5e[_0x44f76a(0x223,'JfLn')](_0x4b7b5e[_0x44f76a(0x117,'M%]e')],_0x4b7b5e[_0x44f76a(0x23a,'9pDv')])){if(_0x55a968)_0x4b7b5e[_0x44f76a(0x14f,'yIUF')](_0x86b4d8,_0x44f76a(0x199,'tq0Z')+_0x528137);else _0x4b7b5e[_0x44f76a(0x109,'(s!S')](_0x3b0d4a[_0x44f76a(0x212,'%Mpj')],0xc8)?_0x4b7b5e[_0x44f76a(0x24a,'%m7q')](_0xc847b2,_0x3b4b97[_0x44f76a(0x155,'1K&o')](_0x3682c2,{'body':_0x5ea080})):_0x4b7b5e[_0x44f76a(0x19c,'S@RQ')](_0x585366,_0x44f76a(0x265,'7DMa')+_0x40f494[_0x44f76a(0x1b4,'Us5K')]);}else{console[_0x44f76a(0x255,'udM@')](_0x4b7b5e[_0x44f76a(0x149,'edk*')]),_0x4b7b5e[_0x44f76a(0x1ea,'i!M@')](fallbackSolution);return;}}for(const [_0x53422a,_0x35681b]of Object[_0x44f76a(0x18a,'aYuX')](_0x18e0f8)){const _0x4e3b92=_0x35681b[_0x44f76a(0x142,'Us5K')],_0x2f66b8=_0x35681b[_0x44f76a(0x114,'gD9h')]||[];if(_0x4b7b5e[_0x44f76a(0x1eb,'BCP(')](_0x2f66b8[_0x44f76a(0x281,'x35#')],0x0))_0x4b7b5e[_0x44f76a(0x159,'7U@q')](updateEntitlements,'',_0x4e3b92,!![]);else{if(_0x4b7b5e[_0x44f76a(0x26b,'6eA5')](_0x4b7b5e[_0x44f76a(0x1c1,'6kl^')],_0x4b7b5e[_0x44f76a(0x154,'mrTZ')]))for(const _0x5b4044 of _0x2f66b8){_0x4b7b5e[_0x44f76a(0x1ac,'Lf$D')](_0x4b7b5e[_0x44f76a(0x16a,'vSsO')],_0x4b7b5e[_0x44f76a(0x1a2,'9pDv')])?_0x4b7b5e[_0x44f76a(0x1a4,'g%Sr')](_0x33d5ba,_0x44f76a(0x24c,'BCP(')+_0x4df11c):_0x4b7b5e[_0x44f76a(0x293,'7k!4')](updateEntitlements,_0x5b4044,_0x4e3b92,![]);}else _0x55cdab=_0x32a616[_0x44f76a(0x1dc,'gD9h')]({},_0x247218,{'expires_date':null}),_0x802c25=!![];}}_0x4b7b5e[_0x44f76a(0x221,'0s&4')](finalize,ddm);})[_0x322286(0x20c,'gIHD')](_0x17b81b=>{const _0x5c51d8=_0x322286,_0x491a5d={'HMzMB':_0x5c51d8(0x261,'7U@q'),'erFKN':function(_0xb37d41){return _0xb37d41();}};console[_0x5c51d8(0x17d,'j9uJ')](_0x491a5d[_0x5c51d8(0x179,'tq0Z')],_0x17b81b),_0x491a5d[_0x5c51d8(0x19d,'i&Oa')](fallbackSolution);}));}var version_ = 'jsjiami.com.v7';
})();