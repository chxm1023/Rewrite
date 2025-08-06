/*************************************

项目名称：Revenuecat系列解锁合集
更新日期：2025-07-27
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
let obj = {};
let ddm = JSON.parse(typeof $response != "undefined" && $response.body || "{}");
const headers = $request.headers;
const ua = headers['User-Agent'] || headers['user-agent'];
const bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];
const forbiddenApps = ['Rond', 'Filebar', 'Fileball', 'APTV'];
if (forbiddenApps.some(app => ua && ua.includes(app) || $request.body && $request.body.includes(app))) {
  console.log("⛔️检测到禁止 MITM 的 APP，脚本停止运行！");
  $done({});
}
const bundle = {
  'com.trainfitness.Train': {
    name: 'Pro',
    id: 'TrainAnnualSubscription',
    cm: 'sja'
  },
  //TrainFitness 健身追踪器
  'com.OfflineMusic.www': {
    name: 'premium',
    id: 'com.OfflineMusic.www.lifetime298',
    cm: 'sjb'
  },
  //维克音乐
  'com.ausoco.umai': {
    name: 'umai_pro',
    id: 'umai_pro_yearly',
    cm: 'sja'
  },
  //UmAI
  'camp.user.penbook': {
    name: 'pro',
    id: 'penbook.lifetime01',
    cm: 'sjb'
  },
  //Penbook-智能笔记本
  'design.yugen.Flow': {
    name: 'pro',
    id: 'design.yugen.Flow.Lifetime',
    cm: 'sja'
  },
  //Flow-番茄工作/专注计时器
  'com.runbuddy.prod': {
    name: 'premium',
    id: 'rb_9999_1y_1y7999',
    cm: 'sja'
  },
  //Runna-马拉松训练
  'TeleprompterX': {
    name: 'Pro Upgrade',
    id: 'TPXOTP',
    cm: 'sjb'
  },
  //Teleprompter
  'com.exoplanet.chatme': {
    name: 'premium',
    id: 'chatme_premium_year_trial',
    cm: 'sja'
  },
  //ChatMe
  'com.reku.Counter': {
    name: 'plus',
    id: 'com.reku.counter.plus.lifetime',
    cm: 'sjb'
  },
  //Counter-计步器
  'moonbox.co.il.grow': {
    name: 'pro',
    id: 'moonbox.co.il.grow.lifetime.offer',
    cm: 'sjb'
  },
  //植物识别-PlantID
  'tech.miidii.MDClock': {
    name: 'Entitlement.Pro',
    id: 'tech.miidii.MDClock.pro',
    cm: 'sjb'
  },
  //谜底时钟
  'com.voicedream.Voic': {
    name: 'standard',
    id: 'vd_annual_79_3daytrial',
    cm: 'sja'
  },
  //声之梦
  'com.laser-focused.focus-ios': {
    name: 'subscribed',
    id: 'iap.io.masterbuilders.focus.pro_one_year',
    cm: 'sja'
  },
  //Focus-专注时间管理
  'com.roehl': {
    name: 'Pro',
    id: 'habitkit_3499_lt',
    cm: 'sjb'
  },
  //HabitKit/WinDiary-双件套
  'net.tengl.powertimer': {
    name: 'plus',
    id: 'powertimer.plus',
    cm: 'sjb'
  },
  //元气计时-PowerTimer
  'com.reader.book': {
    name: 'pro',
    id: 'reader.lifetimeFamily.pro',
    cm: 'sja'
  },
  //PureLibro
  'app.imone.OneWidget': {
    name: 'pro',
    id: 'app.imone.OneWidget.Lifetime',
    cm: 'sjb'
  },
  //OneWidget-小组件
  'io.innerpeace.yiye': {
    name: 'Premium',
    id: 'io.innerpeace.yiye.lifetime.forYearly',
    cm: 'sja'
  },
  //言外笔记
  'com.valo.reader': {
    name: 'com.valo.reader.vip1.forever',
    id: 'com.valo.reader.vip1.forever',
    nameb: 'com.valo.reader.vip2.forever',
    idb: 'com.valo.reader.vip2.forever',
    cm: 'sjb'
  },
  //读不舍手
  'com.skysoft.removalfree': {
    name: 'Pro',
    id: 'com.skysoft.removalfree.subscription.newyearly',
    cm: 'sja'
  } //图片消除
};
const listua = {
  'Watchly': {
    name: 'lifetime',
    id: 'watchface.lifetime',
    cm: 'sjb'
  },
  //Watch Faces-表盘专辑
  'Yummi': {
    name: 'Pro',
    id: 'ym_lifetime_4.99',
    cm: 'sjb'
  },
  //Yummi-食谱管理助手
  'StayOff': {
    name: 'Plus',
    id: 'so_lt_1299',
    cm: 'sjb'
  },
  //StayOff-不做手机控
  'Lito': {
    name: 'LitoPlus',
    id: 'ml_lifetime_0499',
    cm: 'sjc'
  },
  //Lito-极简桌面启动器
  'nbcamera': {
    name: 'patron',
    id: 'com.andyworks.camera.yearlyPatron',
    cm: 'sja'
  },
  //!Camera相机
  'CollageMaker': {
    name: 'pro',
    id: 'com.livintis.collagemakerplus.yearly.1',
    cm: 'sja'
  },
  //CollageMaker+ 拼图软件
  'LaunchTrans': {
    name: 'PicChat.Subscribe.Start',
    id: 'Yearly.PicChat',
    cm: 'sja'
  },
  //PicChat-专业AI图片翻译
  'Dotly': {
    name: 'premium',
    id: 'dotly_premium_1_yearly',
    cm: 'sja'
  },
  //圆点记账
  'MuCase': {
    id: 'mc_7200_lifetime_v1',
    cm: 'sjc'
  },
  //MuCase - 自定义音乐小组件
  'WallShift': {
    name: 'pro',
    id: 'com.roadesign.WallShift.Lifetime',
    cm: 'sja'
  },
  //WallShift-自动换壁纸
  'SnapWords': {
    name: 'Pro access',
    id: 'com.happyplan.snapwords.premium.subscription.yearly',
    cm: 'sja'
  },
  //CapWords-拍物品学语言
  'stopwatch': {
    name: 'remove_ads',
    id: 'hasen_stopwatch_remove_ads',
    cm: 'sja'
  },
  //秒表计时器-Stopwatch
  'fengling': {
    name: 'Pro',
    id: 'com.nocmt.fengling.NewLifetime',
    cm: 'sjb'
  },
  //烽翎
  'Dailyart': {
    name: 'lifeTime',
    id: 'artLifeTime',
    cm: 'sjc'
  },
  //Dailyart-每日艺术
  'Lightune': {
    name: 'pro',
    id: 'Lightune_Pro_Year',
    cm: 'sja'
  },
  //Lightune - AI专业修图
  'ArchiveList': {
    name: 'pro_life',
    id: 'com.jy.ArchiveBox.pro_1',
    cm: 'sjb'
  },
  //ArchiveList - 收藏夹/稍后阅读
  'smscat': {
    name: 'pro',
    id: 'smscat_vip_lifetime',
    cm: 'sjb'
  },
  //短信喵
  'Saifs%20Ai': {
    name: 'lifetime',
    id: 'ai_clothes_changer_lifetime_offer',
    cm: 'sjb'
  },
  //SaifsAi-AI换装
  'AppBox': {
    name: 'appbookmark_vip',
    id: 'GAB_Lifetime_VIP',
    cm: 'sja'
  },
  //应用收藏夹
  'Loopsie': {
    name: 'pro-iOS',
    id: 'com.gamelounge.loopsie.ios.one_time',
    cm: 'sjb'
  },
  //Loopsie
  'StockPlus': {
    name: 'Premium',
    id: 'stocks_lifetime_premium',
    cm: 'sjb'
  },
  //Stock+股票图表
  'StudyAI': {
    name: 'premium_access',
    id: 'Lifetime_PRO',
    cm: 'sjb'
  },
  //StudyAI-智能题解AI
  'PhotoVault': {
    name: 'lifetime',
    id: 'photovault.lifetime',
    cm: 'sjc'
  },
  //iSafe-私密相册管家
  'CountdownWidget': {
    name: 'pro',
    id: 'cd_lifetime',
    cm: 'sjb'
  },
  //倒计时小工具:Countful
  'DarkLooker': {
    name: 'Pro',
    id: 'com.boleStudio.safaridarkmode.permanent',
    cm: 'sjb'
  },
  //DarkLooker 护眼蓝光/Safari扩展工具
  'Sunlitt': {
    name: 'sunlitt.pro',
    id: 'pro.lifetime',
    cm: 'sjb'
  },
  //Sunlitt-太阳位置
  'Moonlitt': {
    name: 'moonlitt.pro',
    id: 'moonlitt.pro.lifetime',
    cm: 'sjb'
  },
  //Moonlitt-月亮位置
  'Leica%20LUX': {
    name: 'pro',
    id: 'lux_7999_1y_2w0',
    cm: 'sja'
  },
  //LeicaLUX-相机
  'A%20Widget': {
    name: 'all_widgets',
    id: 'all_widgets',
    cm: 'sjb'
  },
  //OmniWidgets - 万能小组件灵动岛DIY
  'AccuFind': {
    name: 'accufind_payments',
    id: 'accufind_lifetime',
    cm: 'sjb'
  },
  //AccuFind-搜索目标设备
  'alistTools': {
    name: 'pro_lifetime',
    id: 'com.jy.alistTools.pro_lifetime',
    cm: 'sjb'
  },
  //alistTools
  'FocusFour': {
    name: 'pro',
    id: 'focusfour_lifetime',
    cm: 'sjb'
  },
  //FocusFour-四象限任务管理
  'remoteMouse': {
    name: 'pro',
    id: 'Subscribe__RemoteMouse_Yearly',
    cm: 'sja'
  },
  //无线鼠标
  'IPCams': {
    name: 'pro',
    id: 'ipcams_pro_lifetime',
    nameb: 'pro_plus',
    idb: 'ipcams_pro_plus_lifetime',
    cm: 'sjb'
  },
  //网络摄像机浏览器-IPCams
  'Kylin': {
    name: 'pro',
    id: 'pro_life',
    cm: 'sjb'
  },
  //吉光卡片
  'WidgetSmith': {
    name: 'Premium',
    id: 'PremiumMonthlyWidgetsmith',
    cm: 'sja'
  },
  //WidgetSmith-小组件
  'ArtStage': {
    name: 'FullAccess',
    id: 'com.nicdeane.artstage.YearlySubscription',
    cm: 'sja'
  },
  //ArtStage-艺术品预览
  'CodeScanner': {
    name: 'pro',
    id: 'pro_forever_399',
    cm: 'sjb'
  },
  //CodeScanner-二维码生成器
  'Infltr': {
    name: 'com.Yooshr.infltr.subscriptionPremium',
    id: 'com.Yooshr.infltr.everythingForever',
    cm: 'sjb'
  },
  //樱飞-无限滤镜
  'My%20Diary': {
    name: 'Pro',
    id: 'com.simpleinnovation.diary.premium.forever.base',
    cm: 'sjb'
  },
  //日记本-我的日记
  'AICalculator': {
    name: 'Premium',
    id: 'com.simpleinnovation.calculator.ai.premium.yearly.base',
    cm: 'sja'
  },
  //计算器AI
  'Vinyls': {
    name: 'AllPro',
    id: 'com.shi.Vin.lifetime',
    cm: 'sjb'
  },
  //Vinyls-音乐APP
  'Accountit': {
    name: 'spenditPlus',
    id: 'DesignTech.SIA.Spendit.Plus.Lifetime',
    cm: 'sjb'
  },
  //Accountit-日常记账
  'Phtoto%20Swiper': {
    name: 'pro',
    id: 'rc_499_life',
    cm: 'sjb'
  },
  //PhotoDeleteSwipe- 照片清理
  'ShellBean': {
    name: 'pro',
    id: 'com.ningle.shellbean.iap.forever',
    cm: 'sjb'
  },
  //ShellBean-SSH终端
  'Wishy': {
    name: 'Wishy Subscription',
    id: 'wishy_lifetime_subscription',
    cm: 'sjc'
  },
  //Wishy-记录愿望
  'Fontsify': {
    name: 'pro',
    id: 'media.upstate.fontify.lifetime',
    cm: 'sjb'
  },
  //Fontsify-字体
  'com.dison.diary': {
    name: 'vip',
    id: 'lifetime',
    cm: 'sjb'
  },
  //随心记
  'Food-Diary': {
    name: 'Premium',
    id: 'fd_lifetime',
    cm: 'sjb'
  },
  //美食日记
  'Meal%20Planner': {
    name: 'premium',
    id: 'mp_1999_lifetime',
    cm: 'sjc'
  },
  //膳食计划员
  'Medication%20List': {
    name: 'Premium',
    id: 'ml_lifetime',
    cm: 'sjc'
  },
  //MedicationList-药准时
  'Shared%20Family%20Shopping%20List': {
    name: 'premium',
    id: 'ls_1299_lifetime',
    cm: 'sjc'
  },
  //购物清单
  'Pantry%20Check': {
    name: 'Premium',
    id: 'pc_lifetime',
    cm: 'sjc'
  },
  //Pantry Check
  'becoming': {
    name: 'Strength Pro',
    id: 'strength_membership_lifetime',
    cm: 'sjb'
  },
  //练就
  'SCRL': {
    name: 'com.dopedevelopment.Panels.subscription.Pro_Dynamic_Pricing',
    id: 'strength_membership_lifetime',
    cm: 'sja'
  },
  //SCRL-图片拼接
  'Morphose': {
    name: 'ProStandard',
    id: 'com.pixery.morphose.yearly',
    cm: 'sja'
  },
  //Morphose
  'ClevCalc': {
    name: 'Premium',
    id: 'com.dencreak.dlcalculator.iap.dlc_no_ads_permanent',
    cm: 'sjb'
  },
  //万能计算器
  'Unfold': {
    name: 'REDUCED_PRO_YEARLY',
    id: 'UNFOLD_PRO_YEARLY',
    cm: 'sja'
  },
  //Unfold-视频和照片编辑器
  'Tracepad-iOS': {
    name: 'unlock',
    id: 'tracepad_unlock_all_gesture_5',
    cm: 'sjb'
  },
  //Tracepad - 无线触控板模拟
  'photography': {
    name: 'premium',
    id: 'photography_sub_yearly_1',
    cm: 'sja'
  },
  //PhotoX
  'Binsoo': {
    name: 'vibe',
    id: 'annual',
    cm: 'sja'
  },
  //Binsoo
  '%E8%90%8C%E5%AE%A2AI%E7%BB%98%E7%94%BB': {
    name: 'AISticker_VIP',
    id: 'LifetimeSubscription_Sticker',
    cm: 'sjb'
  },
  //萌客AI绘画
  'Storage%20Cleaner': {
    name: 'Premium',
    id: 'storagecleaner_standalone_lifetime_free',
    cm: 'sjb'
  },
  //StorageCleaner
  'Language%20Learning': {
    name: 'premium',
    id: 'language_sub_lifetime',
    cm: 'sjb'
  },
  //Wordy
  'OneTap': {
    name: 'pro',
    id: 'DiscountedProLifetime',
    cm: 'sjb'
  },
  //OneTap
  'ChatPub': {
    name: 'Unlimited Access',
    id: 'conversationai.annual',
    cm: 'sja'
  },
  //ChatPub
  'Jellycuts': {
    name: 'pro',
    id: 'premium',
    cm: 'sja'
  },
  //Jellycuts
  'quitnow': {
    name: 'pro_features',
    id: 'com.eaginsoftware.QuitNow.unlock_all_pro_features',
    cm: 'sjb'
  },
  //Quitnow
  'Ricoh%20Recipes': {
    name: 'Patron',
    id: 'Ricoh_Patron',
    cm: 'sja'
  },
  //RicohRecipes
  'PixImagine': {
    id: 'com.efsoft.piximagine_nc_lifetime',
    cm: 'sjc'
  },
  //PixImagine
  'PicLoom': {
    id: 'com.efsoft.picloom_nc_lifetime',
    cm: 'sjc'
  },
  //PicLoom
  'Translate%20-%20Talk%20Translator': {
    name: 'Premium',
    id: 'premiumAnnually',
    cm: 'sja'
  },
  //AITranslator-翻译器
  'Authenticator': {
    name: 'premium',
    id: '2fa_standalone_lifetime',
    cm: 'sja'
  },
  //Authenticator-密码管理
  'ChatBot': {
    name: 'chatbot_annual',
    id: 'chatbot_annual',
    cm: 'sja'
  },
  //ChatBot-AIChat
  'Mockview': {
    name: 'Pro',
    id: 'kavsoft.dev.yearly',
    cm: 'sja'
  },
  //Mockview
  'ChatLLM': {
    name: 'Pro',
    id: 'com.curiouscreatorsco.ChatLLM.pro.lifetime.notrial.150_00',
    cm: 'sjb'
  },
  //AItText
  'Binsoo': {
    name: 'vibe',
    id: 'annual',
    cm: 'sja'
  },
  //Binsoo-照片滤镜/编辑
  'Photoooo': {
    name: 'lifetime',
    id: 'canoe_28_rnb_forever',
    cm: 'sjb'
  },
  //Phorase-专业AI消除助手
  'VibeCamera': {
    name: 'forever',
    id: 'vibe_pro_forever',
    cm: 'sjb'
  },
  //VIBECAM-相机
  'No%20Fusion': {
    name: 'LivePhoto',
    id: 'com.grey.nofusion.livephoto',
    cm: 'sjb'
  },
  //NoFusion-相机
  'Themy': {
    name: 'fonts_premium',
    id: 'lifetime',
    cm: 'sjb'
  },
  //Fonts-微信字体
  'BabyCare': {
    name: 'pro',
    id: 'KiddoKeeper_38_LifeTime',
    cm: 'sjb'
  },
  //小守护
  'ElonAI': {
    name: 'premium',
    id: 'elongpt.yearly_1',
    cm: 'sja'
  },
  //ElonAI
  'Dumb%20Phone': {
    name: 'Pro',
    id: 'dp.lifetime_19.99',
    cm: 'sjb'
  },
  //DumbPhone(°)
  'maple_mobile': {
    name: 'premium',
    id: 'mc_3000_12m',
    cm: 'sja'
  },
  //Maple Calculator-计算器
  'FujiLifeStyle': {
    name: 'FUJIStyle Pro(Year)',
    id: 'FujiStyle2024003',
    cm: 'sja'
  },
  //FUJISTYLE-富士色彩配方
  'Gentler': {
    name: 'premium',
    id: 'app.gentler.activity.nonconsumable.onetime1',
    cm: 'sjb'
  },
  //Gentler Streak-健康助手
  'TuneTally': {
    name: 'Pro',
    id: 'tunetally_pro',
    cm: 'sjb'
  },
  //TuneTally-综合音乐排行
  'Readle': {
    name: 'Premium',
    id: 'com.hello.german.yearly',
    cm: 'sja'
  },
  //Readle-德语学习
  'Utiful': {
    name: 'All Access',
    id: 'All_Access_YR_12M_Free',
    cm: 'sja'
  },
  //Utiful-相册管家
  'CharingCrossRoad': {
    name: 'ready_pro',
    id: 'ready_pro_50_1y',
    cm: 'sja'
  },
  //读否-稍后阅读
  'ig-bookmarker': {
    name: 'entitlement',
    id: 'lifetimeID',
    cm: 'sjb'
  },
  //instDown-ins下载工具
  'PhotoMapper': {
    name: 'premium',
    id: 'photomapper_lifetime_1.99',
    cm: 'sjb'
  },
  //PhotoMapper-照片位置追改
  'CallAnnie': {
    name: 'ai.animato.callannie.entitlement.pro0',
    id: 'ai.animato.callannie.proyearly1',
    cm: 'sja'
  },
  //CallAnnie
  'Liftbear': {
    name: 'Pro',
    id: 'liftbear_2399_1y',
    cm: 'sja'
  },
  //Liftbear
  'OneMockup': {
    name: 'pro',
    id: 'online.ohwe.onescreen.Lifetime',
    cm: 'sja'
  },
  //OneMockup-带壳截屏
  'DataCalc': {
    name: 'datacalc.pro',
    id: 'datacalc.yearly.12',
    cm: 'sja'
  },
  //DataCalc-素材容量计算
  'moss-ios': {
    name: 'prouser',
    id: 'dpbox_yearly_68',
    cm: 'sja'
  },
  //DPBOX-摄影机与电影参数参数查询
  'Law': {
    name: 'vip',
    id: 'LawVIPOneYear',
    cm: 'sja'
  },
  //中国法律
  'SleepSounds': {
    name: 'vip',
    id: 'VIPOneMonth',
    cm: 'sja'
  },
  //睡眠音乐
  'multitimer_app': {
    name: 'premium',
    id: 'timus_lt_base',
    cm: 'sjb'
  },
  //Timus-计时/定时
  'pdfai_app': {
    name: 'premium',
    id: 'special_lifetime',
    cm: 'sjb'
  },
  //ChatPDF
  'Linearity%20Curve': {
    name: 'pro',
    id: 'linearity_curve_pro_yearly_free_trial',
    cm: 'sja'
  },
  //LinearityCurve-插画/图形处理
  'TQBrowser': {
    name: 'pro_lt',
    id: 'com.tk.client.lifetime',
    cm: 'sjb'
  },
  //Teak浏览器
  'AI%C2%A0Chat': {
    name: 'AI Plus',
    id: 'ai_plus_gpt_yearly',
    cm: 'sja'
  },
  //AIChat
  'Yosum': {
    name: 'Premium',
    id: 'yosum_999_1year',
    cm: 'sja'
  },
  //Yosum
  '%E8%B5%84%E6%BA%90%E6%90%AC%E8%BF%90%E5%A4%A7%E5%B8%88': {
    name: 'SaveTikYoutu_common',
    id: 'LifetimeSubscription',
    cm: 'sjb'
  },
  //资源搬运大师
  'DHWaterMarkManager': {
    name: 'WaterManager_common',
    id: 'lifetimeVIP_001',
    cm: 'sjb'
  },
  //水印熊
  'iplayTV': {
    name: 'com.ll.btplayer.12',
    id: 'com.ll.btplayer.12',
    cm: 'sjb'
  },
  //ntPlayer
  'MaxWallpaper': {
    name: 'maxwallpaper_common',
    id: 'super_forever_vip',
    cm: 'sjb'
  },
  //新鲜壁纸
  'intervalFlow': {
    name: 'All Access',
    id: 'wodtimer_lf',
    cm: 'sjb'
  },
  //intervalFlow
  'BORD': {
    name: 'pro_membership',
    id: 'bord_plus_2499_lifetime',
    cm: 'sjb'
  },
  //BORD-照片拓展方形
  'FRMD': {
    name: 'all_access',
    id: 'frmd_plus_999_lifetime',
    cm: 'sjb'
  },
  //FRMD相机
  'HRZN': {
    name: 'pro',
    id: 'plus_999_lifetime',
    cm: 'sjb'
  },
  //HRZN-胶片相机
  'Assembly': {
    name: 'premium_access',
    id: 'com.pixite.assembly.1yearlyq',
    cm: 'sja'
  },
  //Assembly
  'Flourish': {
    name: 'Pro',
    id: 'flourish_9800_1yr_1m0',
    cm: 'sja'
  },
  //如是记录
  'metaslip': {
    name: 'Pro',
    id: 'ms_lifetime',
    cm: 'sjb'
  },
  //元思笔记
  'Pins': {
    name: 'customer',
    id: 'do.anh.Pins.Unlock.Standard',
    cm: 'sja'
  },
  //Pins
  'Loora': {
    name: 'Yearly',
    id: 'yearly_free_ref_10usd_off',
    cm: 'sja'
  },
  //Loora
  'PwDrawingPad': {
    name: 'pro',
    id: 'com.s132.app.supaintexchange.year',
    cm: 'sja'
  },
  //全能画板2
  'OneGrow': {
    name: 'pro',
    id: 'com.onenicetech.OneGrow.Lifetime',
    cm: 'sjb'
  },
  //OneGrow-儿童身高成长测量
  '%E6%97%B6%E9%97%B4%E8%AE%B0%E5%BD%95': {
    name: 'pro',
    id: 'com.bapaws.Hours.lifetime',
    cm: 'sjb'
  },
  //时间记录
  'PianoTrainer': {
    name: 'pro_subscription',
    id: 'pianotrainer.sub.yearly.pro',
    cm: 'sja'
  },
  //Pianolytics-学习钢琴
  'FretTrainer': {
    name: 'pro_subscription',
    id: 'frettrainer.sub.yearly.pro',
    cm: 'sja'
  },
  //Fretonomy-学习指板
  'Currency': {
    name: 'plus',
    id: 'com.jeffreygrossman.currencyapp.iap.plus',
    cm: 'sja'
  },
  //Currency-汇率查询
  'TripMemo': {
    name: 'pro',
    id: 'com.ningle.dailytracker.lifetime',
    cm: 'sjb'
  },
  //旅行迹
  'ShellBean': {
    name: 'pro',
    id: 'com.ningle.shellbean.iap.forever',
    cm: 'sjb'
  },
  //ShellBean-SSH终端服/Linux监控
  'nPtt': {
    name: 'vip.yearly',
    id: 'app.nextptt.vip1.yearly',
    cm: 'sja'
  },
  //nPtt
  'MagicTiles3': {
    name: 'VIP',
    id: 'com.pianoidols.vipsub.year.06',
    cm: 'sja'
  },
  //MagicTiles3-音乐游戏
  'Airmail': {
    name: 'Airmail Premium',
    id: 'Airmail_iOS_Yearly_P',
    cm: 'sja'
  },
  //Airmail-邮箱管理
  'ScreenRecordCase': {
    name: 'Premium',
    id: 'me.fandong.ScreenRecordCase.Ultra',
    cm: 'sjb'
  },
  //屏幕套壳
  'opusvpn': {
    name: 'pro',
    id: 'yearly_discount',
    cm: 'sja'
  },
  //Opus-VPN
  'ip_tv_react_native': {
    name: 'Single',
    id: 'opus.lifetime',
    cm: 'sjb'
  },
  //Opus-IPTV
  'Atomic': {
    name: 'pro',
    id: 'ht_lifetime1',
    cm: 'sjb'
  },
  //Atomic
  'QingLong': {
    name: 'Premium',
    id: 'qinglong_premium',
    cm: 'sjb'
  },
  //青龙面板
  'timetrack.io': {
    name: 'atimelogger-premium-plus',
    id: 'ttio_premium_plus',
    cm: 'sjb'
  },
  //aTimeloggerPro-时间记录
  'Video%20Teleprompter': {
    name: 'videoPremium',
    id: 'com.joeallenpro.videoteleprompter.upgrade.yearly_a',
    cm: 'sja'
  },
  //Video Teleprompter
  'FoJiCam': {
    name: 'ProVersionLifeTime',
    id: 'com.uzero.cn.fojicam.life2',
    cm: 'sjb'
  },
  //LimiCam-胶片相机
  'FruitMinder': {
    name: 'Premium',
    id: 'com.bartozo.FruitMinder.lifetime',
    cm: 'sjb'
  },
  //FruitMinder-水果提醒
  'PDF_convertor': {
    name: 'VIP',
    id: 'com.pdf.convertor.forever',
    cm: 'sjb'
  },
  //PDF转换器
  'rewritingText': {
    name: 'AIGrammercheckerProAccess',
    id: 'sv.aigrammerchecker.com.lifetime',
    cm: 'sjb'
  },
  //AI Grammar
  'ShellBoxKit': {
    name: 'ssh_pro',
    id: 'ShellBoxKit.Year',
    cm: 'sja'
  },
  //CareServer-服务器监控
  'IDM': {
    name: 'premium',
    id: 'sub_yearly_idm',
    cm: 'sja'
  },
  //IDM-下载
  'Whisper': {
    name: 'all_features',
    id: 'whisperai_80_y',
    cm: 'sja'
  },
  //Whisper
  'Shapy': {
    name: 'premium',
    id: 'com.blake.femalefitness.subscription.yearly',
    cm: 'sja'
  },
  //Shapy-健身
  'Carbon-iOS': {
    name: 'pro',
    id: 'carbon.unlockall',
    cm: 'sjb'
  },
  //Carbon-碳
  '%E6%89%8B%E6%8C%81%E5%BC%B9%E5%B9%95': {
    name: 'Pro access',
    id: 'com.tech.LedScreen.VIPALL',
    cm: 'sjb'
  },
  //手持弹幕
  '%E8%AF%AD%E9%9F%B3%E8%AE%A1%E7%AE%97%E5%99%A8': {
    name: 'Pro access',
    id: 'com.tech.counter.All',
    cm: 'sjb'
  },
  //语音计算器
  '%E7%BE%8E%E5%A6%86%E6%97%A5%E5%8E%86': {
    name: 'Pro access',
    id: 'com.tech.Aula.VIPALL',
    cm: 'sjb'
  },
  //美妆日历
  'LiveWallpaper': {
    name: 'Pro access',
    id: 'com.tech.LiveWallpaper.ALL',
    cm: 'sjb'
  },
  //动态壁纸
  'Chat%E7%BB%83%E5%8F%A3%E8%AF%AD': {
    name: 'Pro access',
    id: 'com.tech.AiSpeak.All',
    cm: 'sjb'
  },
  //Chat练口语
  'Calflow': {
    name: 'pro',
    id: 'kike.calflow.pro.lifetime',
    cm: 'sjb'
  },
  //Calflow
  'dtdvibe': {
    name: 'pro',
    id: 'com.dtd.aroundu.life',
    cm: 'sjb'
  },
  //Dtd Sounds-睡眠白噪音
  'Clipboard': {
    name: 'Premium',
    id: 'Premium_0_99_1M_1MFree',
    cm: 'sja'
  },
  //Clipboard-剪贴板
  'Hi%E8%AE%BA%E5%9D%9B/69': {
    name: 'plus',
    id: 'plus_yearly',
    cm: 'sja'
  },
  //Hi论坛
  'AnimeArt': {
    name: 'AnimeArt.Gold',
    id: 'WaifuArt.Lifetime',
    cm: 'sjb'
  },
  //Anime Waifu-AI
  'LiveCaption': {
    name: 'Plus',
    id: 'rc_0400_1m',
    cm: 'sja'
  },
  //iTranscreen-屏幕/游戏翻译
  'EraseIt': {
    name: 'ProVersionLifeTime',
    id: 'com.uzero.cn.eraseit.premium1.fromyear',
    cm: 'sjb'
  },
  //Smoothrase-AI擦除照片中任何物体
  'MusicPutty': {
    name: 'pro_version',
    id: 'mp_3599_1y',
    cm: 'sja'
  },
  //MusicPutty-音乐黏土
  'SleepDown': {
    name: 'Pro',
    id: 'pro_student_0926',
    cm: 'sjb'
  },
  //StaySleep-熬夜助手
  'PhotoRoom': {
    name: 'pro',
    id: 'com.background.pro.yearly',
    cm: 'sja'
  },
  //PhotoRoom
  'Bg%20Remover': {
    name: 'Premium',
    id: 'net.kaleidoscope.cutout.premium1',
    cm: 'sja'
  },
  //Bg Remover+
  'Sex%20Actions': {
    name: 'Premium Plus',
    id: 'ru.sexactions.subscriptionPromo1',
    cm: 'sja'
  },
  //情侣性爱游戏-Sex Actions
  'StarFocus': {
    name: 'pro',
    id: 'com.gsdyx.StarFocus.nonConsumable.forever',
    cm: 'sjb'
  },
  //星垂专注
  'StarDiary': {
    name: 'pro',
    id: 'com.gsdyx.StarDiary.nonConsumable.forever',
    cm: 'sjb'
  },
  //星垂日记
  'CountDuck': {
    name: 'premium',
    id: 'Lifetime',
    cm: 'sjb'
  },
  //倒数鸭
  'wordswag': {
    name: 'pro',
    id: 'Pro_Launch_Monthly',
    cm: 'sja'
  },
  //WordSwag
  'LockFlow': {
    name: 'unlimited_access',
    id: 'lf_00.00_lifetime',
    cm: 'sjb'
  },
  //LockFlow-锁屏启动
  'TextMask': {
    name: 'pro',
    id: 'tm_lifetime',
    cm: 'sjb'
  },
  //TextMask
  '%E5%96%B5%E7%BB%84%E4%BB%B6': {
    name: 'MiaoWidgetPro',
    id: 'MiaoLifeTime',
    cm: 'sjb'
  },
  //喵组件
  'Chatty': {
    name: 'pro',
    id: 'chatty.yearly.1',
    cm: 'sja'
  },
  //Chatty.AI
  'ImagineAI': {
    name: 'plus',
    id: 'artistai.lifetime.1',
    cm: 'sjb'
  },
  //Artist.AI
  'Langster': {
    name: 'Premium',
    id: 'com.langster.universal.lifetime',
    cm: 'sjb'
  },
  //Langster-学习外语
  'VoiceAI': {
    name: 'Special Offer',
    id: 'voiceannualspecial',
    cm: 'sjb'
  },
  //VoiceAI-配音
  'Rootd': {
    name: 'pro',
    id: 'subscription_lifetime',
    cm: 'sjb'
  },
  //Rootd-情绪引导
  'MusicMate': {
    name: 'premium',
    id: 'mm_lifetime_68_premium',
    cm: 'sjb'
  },
  //MusicMate-音乐
  'AIKeyboard': {
    name: 'plus_keyboard',
    id: 'aiplus_keyboard_yearly',
    cm: 'sja'
  },
  //AIKeyboard键盘
  'SmartAIChat': {
    name: 'Premium',
    id: 'sc_3999_1y',
    cm: 'sja'
  },
  //SmartAI
  'AIChat': {
    name: 'AI Plus',
    id: 'ai_plus_yearly',
    cm: 'sja'
  },
  //AIChat
  'LazyReply': {
    name: 'lazyReplyYearlySubscription',
    id: 'com.bokhary.lazyreply.yearlyprosubscription',
    cm: 'sja'
  },
  //ReplyAssistant键盘
  'LazyBoard': {
    name: 'lazyboardPro',
    id: 'com.bokhary.magicboard.magicboardpro',
    cm: 'sjb'
  },
  //LazyBoard键盘
  'PDF%20Viewer': {
    name: 'sub.pro',
    id: 'com.pspdfkit.viewer.sub.pro.yearly',
    cm: 'sja'
  },
  //PDF Viewerr
  'Joy': {
    name: 'pro',
    id: 'com.indiegoodies.Agile.lifetime2',
    cm: 'sjb'
  },
  //Joy AI
  'AnkiPro': {
    name: 'Premium',
    id: 'com.ankipro.app.lifetime',
    cm: 'sjb'
  },
  //AnkiPro
  'SharkSMS': {
    name: 'VIP',
    id: 'com.gaapp.sms.permanently',
    cm: 'sjb'
  },
  //鲨鱼短信
  'EncryptNote': {
    name: 'Pro',
    id: 'com.gaapp.2019note.noAds',
    cm: 'sjb'
  },
  //iNotes私密备忘录
  'One4WallSwiftUI': {
    name: 'lifetime',
    id: 'lifetime_key',
    cm: 'sjb'
  },
  //One4Wall
  'Pigment': {
    name: 'pro',
    id: 'com.pixite.pigment.1yearS',
    cm: 'sja'
  },
  //色调-Pigment
  'GradientMusic': {
    name: 'Pro',
    id: 'com.gradient.vision.new.music.one.time.79',
    cm: 'sjb'
  },
  //GradientMusic音乐
  'iBody': {
    name: 'Pro',
    id: 'com.tickettothemoon.bodyfilter.one.time.purchase',
    cm: 'sjb'
  },
  //BodyFilter
  'Persona': {
    name: 'unlimited',
    id: 'com.tickettothemoon.video.persona.one.time.purchase',
    cm: 'sjb'
  },
  //Persona-修饰脸部与相机
  'easy_chart': {
    name: 'unlock all',
    id: 'qgnjs_lifetime',
    cm: 'sjb'
  },
  //快制图表
  'Snipd': {
    name: 'premium',
    id: 'snipd_premium_1y_7199_trial_2w_v2',
    cm: 'sja'
  },
  //Snipd播客
  'Tide%20Guide': {
    name: 'Tides+',
    id: 'TideGuidePro_Lifetime_Family_149.99',
    cm: 'sjb'
  },
  //Tide Guide潮汐
  'Gear': {
    name: 'subscription',
    id: 'com.gear.app.yearly',
    cm: 'sja'
  },
  //Gear浏览器
  'Aisten': {
    name: 'pro',
    id: 'aisten_pro',
    cm: 'sjb'
  },
  //Aisten-播客学英语
  'ASKAI': {
    name: 'pro',
    id: 'askai_pro',
    nameb: 'pro_plan',
    idb: 'token_pro_plan',
    cm: 'sjb'
  },
  //ASKAI
  'Subtrack': {
    name: 'pro',
    id: 'com.mohitnandwani.subtrack.subtrackpro.family',
    cm: 'sjb'
  },
  //Subtrack
  'shipian-ios': {
    name: 'vipOffering',
    id: 'shipian_25_forever',
    cm: 'sjb'
  },
  //诗片
  'My%20Time': {
    name: 'Pro',
    id: 'ninja.fxc.mytime.pro.lifetime',
    cm: 'sjb'
  },
  //我的时间
  'LUTCamera': {
    name: 'ProVersionLifeTime',
    id: 'com.uzero.funforcam.lifetimepurchase',
    cm: 'sjb'
  },
  //方弗相机
  'Heal%20Clock': {
    name: 'pro',
    id: 'com.mad.HealClock.pro',
    cm: 'sjb'
  },
  //自愈时钟
  'tiimo': {
    name: 'full_access',
    id: 'lifetime.iap',
    cm: 'sjb'
  },
  //Tiimo-可视化日程
  'IPTVUltra': {
    name: 'premium',
    id: 'com.ddm1023.lifetime',
    cm: 'sjb'
  },
  //IPTVUltra
  'Wozi': {
    name: 'wozi_pro_2023',
    id: 'wozi_pro_2023',
    cm: 'sjb'
  },
  //喔知Wozi背单词
  'Color%20Widgets': {
    name: 'pro',
    id: 'cw_1999_1y_3d0',
    cm: 'sja'
  },
  //Color Widgets小组件
  'server_bee': {
    name: 'Pro',
    id: 'pro_45_lifetime',
    cm: 'sjb'
  },
  //serverbee终端监控管理
  'MyPianist': {
    name: 'pro',
    id: 'com.collaparte.mypianist.pro.yearly',
    cm: 'sja'
  },
  //MyPianist乐谱
  'ProCam': {
    name: 'pro',
    id: 'pro_lifetime',
    cm: 'sjb'
  },
  //ProCam相机
  'Drops': {
    name: 'premium',
    id: 'forever_unlimited_time_discounted_80_int',
    cm: 'sjb'
  },
  //Drops外语
  'transmission_ui': {
    name: 'Premium',
    id: '200002',
    cm: 'sja'
  },
  //Transmission服务器
  'fastdiet': {
    name: 'premium',
    id: 'com.happy.fastdiet.forever',
    cm: 'sjb'
  },
  //小熊轻断食
  'money_manager': {
    name: 'premium',
    id: 'com.happy.money.forever',
    cm: 'sjb'
  },
  //小熊记账
  'Overdue': {
    name: 'Pro',
    id: '1',
    cm: 'sjb'
  },
  //我的物品
  'Ledger': {
    name: 'Pro',
    id: 'com.lifetimeFamily.pro',
    cm: 'sjb'
  },
  //Pure账本
  'WeNote': {
    name: 'pro',
    id: 'Yearly',
    cm: 'sja'
  },
  //Emote
  'Scelta': {
    name: 'pro',
    id: 'SceltaProLifetime',
    cm: 'sjb'
  },
  //Scelta
  '%E5%87%B9%E5%87%B8%E5%95%A6%E6%9F%A5%E5%A6%86': {
    name: 'Pro access',
    id: 'com.smartitfarmer.MakeUpAssistant.UNLIMITED',
    cm: 'sjb'
  },
  //upahead
  'PM4': {
    name: 'pro',
    id: 'pm4_pro_1y_2w0',
    cm: 'sja'
  },
  //Obscura
  'Project%20Delta': {
    name: 'rc_entitlement_obscura_ultra',
    id: 'com.benricemccarthy.obscura4.obscura_ultra_lifetime',
    cm: 'sjb'
  },
  //Obscura-专业相机
  'Zettelbox': {
    name: 'Power Pack',
    id: 'powerpack_permanent_1',
    cm: 'sjb'
  },
  //Zettelbox
  'Packr': {
    name: 'Pro',
    id: 'com.jeremieleroy.packr.premiumyearly',
    cm: 'sja'
  },
  //派克
  'muoyu': {
    name: 'pro',
    id: 'com.metaorder.muoyu.prolifetime.12',
    cm: 'sjb'
  },
  //摸鱼
  '%E7%BF%BB%E9%A1%B5%E6%97%B6%E9%92%9F': {
    name: 'Pro access',
    id: 'com.douwan.aiclock.ALL',
    cm: 'sjb'
  },
  //翻页时钟
  '%E7%A7%A9%E5%BA%8F%E6%97%B6%E9%92%9F': {
    name: 'lifetime',
    id: 'com.metaorder.orderclocko.lifetime',
    cm: 'sjb'
  },
  //秩序时钟
  '%E7%A7%A9%E5%BA%8F%E7%9B%AE%E6%A0%87': {
    name: 'pro',
    id: 'com.metaorder.OKRTomato.vip.supremacy',
    cm: 'sjb'
  },
  //秩序目标
  '%E4%BA%BA%E7%94%9F%E6%B8%85%E5%8D%95': {
    name: 'premium',
    id: 'com.metaorder.lifelist.premium',
    cm: 'sjb'
  },
  //人生清单
  'Vision': {
    name: 'promo_3.0',
    id: 'vis_lifetime_3.0_promo',
    cm: 'sja'
  },
  //Vision
  //真心话大冒险 - Moved to revenuecat.js
  'HurtYou': {
    name: 'premium',
    id: 'hurtyou_199_1y',
    cm: 'sja'
  },
  //一起欺词
  '%E4%BF%A1%E6%81%AF%E8%AE%A1%E7%AE%97': {
    name: 'pro',
    id: 'informaticcalculations.pro.lifetime',
    cm: 'sjb'
  },
  //信息计算
  'Context_iOS': {
    name: 'Context Pro',
    id: 'ctx_sub_1y_sspai_preorder_angel',
    cm: 'sja'
  },
  //Context
  'Structured': {
    name: 'pro',
    id: 'today.structured.pro',
    cm: 'sjb'
  },
  //Structured
  'HTTPBot': {
    name: 'pro',
    id: 'com.behindtechlines.HTTPBot.prounlock',
    cm: 'sjb'
  },
  //Httpbot抓包工具
  'MinimalDiary': {
    name: 'pro',
    id: 'com.mad.MinimalDiary.lifetime',
    cm: 'sjb'
  },
  //极简日记
  'Zen%20Flip%20Clock': {
    name: 'pro',
    id: 'com.mad.zenflipclock.iap.buymeacoffee',
    cm: 'sjb'
  },
  //极简时钟
  'Transfer': {
    name: 'pro',
    id: 'transfer_ios_premium_year_2022_1',
    cm: 'sja'
  },
  //WeTransfer
  'Collect': {
    name: 'pro',
    id: 'com.revenuecat.product.yearly.ios',
    cm: 'sja'
  },
  //Collect收集
  'Paper': {
    name: 'pro',
    id: 'com.fiftythree.paper.credit',
    cm: 'sjb'
  },
  //Paper
  'Ape': {
    name: 'pro-iOS',
    id: 'ape.lifetime',
    cm: 'sjb'
  },
  //Sharp AI
  'Boar': {
    name: 'pro-iOS',
    id: 'boar.yearly',
    cm: 'sja'
  },
  //Erase Objects
  'MySticker': {
    name: 'mysticker premium',
    id: 'com.miiiao.MySticker.lifetime',
    cm: 'sjb'
  },
  //Tico-贴抠
  'Rec': {
    name: 'rec.paid',
    id: 'rec.paid.onetime',
    cm: 'sjb'
  },
  //Rec相机
  'Photon': {
    name: 'photon.paid',
    id: 'photon.paid.onetime',
    cm: 'sjb'
  },
  //Photon相机
  'OneTodo': {
    name: 'pro',
    id: 'onetodo_lifetime',
    cm: 'sjb'
  },
  //OneTodo
  'OneFlag': {
    name: 'pro',
    id: 'oneflag_lifetime',
    cm: 'sjb'
  },
  //OneList
  'OneClear': {
    name: 'pro',
    id: 'app.imone.OneClear.Lifetime',
    cm: 'sjb'
  },
  //OneClear透明小组件
  'OneScreen': {
    name: 'pro',
    id: 'onescreen_lifetime',
    cm: 'sjb'
  },
  //OneScreen截图带壳
  'Photomator': {
    name: 'pixelmator_photo_pro_access',
    id: 'pixelmator_photo_lifetime_v1',
    cm: 'sjb'
  },
  //Photomator
  'Endel': {
    name: 'pro',
    id: 'Lifetime',
    cm: 'sjb'
  },
  //Endel
  'Drowsy': {
    name: 'Pro',
    id: 'Drowsy_Life',
    cm: 'sjb'
  },
  //解压动画
  'Thiro': {
    name: 'pro',
    id: 'atelerix_pro_lifetime',
    cm: 'sjb'
  },
  //Thiro
  'Stress': {
    name: 'StressWatch Pro',
    id: 'stress_membership_lifetime',
    cm: 'sjb'
  },
  //StressWatch压力自测提醒
  'Worrydolls': {
    name: 'magicmode',
    id: 'magicmode',
    cm: 'sjb'
  },
  //解忧娃娃
  'Echo': {
    name: 'PLUS',
    id: 'com.LEMO.LemoFm.plus.lifetime.l3',
    cm: 'sjb'
  },
  //LEMO FM睡眠
  'Falendar': {
    name: 'Falendar+',
    id: 'falendar_68_life',
    cm: 'sjb'
  },
  //Falendar日历
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': {
    name: 'vip+watch_vip',
    id: 'eticket_with_watch_life_a',
    cm: 'sjb'
  },
  //车票票
  'iRead': {
    name: 'vip',
    id: 'com.vip.forever_1',
    cm: 'sjb'
  },
  //已阅
  'MOZE': {
    name: 'MOZE_PREMIUM_SUBSCRIPTION',
    id: 'MOZE_PRO_SUBSCRIPTION_YEARLY_BASIC',
    cm: 'sja'
  },
  //MOZE记账
  'app/112': {
    name: 'Pro',
    id: 'com.wengqianshan.friends.pro',
    cm: 'sjb'
  },
  //贴心记
  'app/38': {
    name: 'Pro',
    id: 'com.wengqianshan.diet.pro',
    cm: 'sjb'
  },
  //饭卡
  'MatrixClock': {
    name: 'Premium',
    id: 'com.lishaohui.matrixclock.lifetimesharing',
    cm: 'sjb'
  },
  //MatrixClocca-矩阵时钟
  'SalesCat': {
    name: 'Premium',
    id: 'com.lishaohui.salescat.lifetime',
    cm: 'sjb'
  },
  //SalesCat-RevenueCat客户端
  'MoneyThings': {
    name: 'Premium',
    id: 'com.lishaohui.cashflow.lifetime',
    cm: 'sjb'
  },
  //Money Things记账
  'ChatGPTApp': {
    name: 'Advanced',
    id: 'com.palligroup.gpt3.yearlyyy',
    cm: 'sja'
  },
  //ChatAI-中文智能聊天机器人
  'Journal_iOS': {
    name: 'PRO',
    id: 'com.pureformstudio.diary.yearly_2022_promo',
    cm: 'sja'
  },
  //Diarly日历
  'LemonKeepAccounts': {
    name: 'VIP',
    id: 'lm_1_1month',
    cm: 'sja'
  },
  //旺财记账
  'mizframa': {
    name: 'premium',
    id: 'mf_20_lifetime2',
    cm: 'sjb'
  },
  //Mizframa
  'EasyClicker': {
    name: 'pro',
    id: 'easyclicker.premium.discount2',
    cm: 'sjb'
  },
  //自动点击器
  'ImageX': {
    name: 'imagex.pro.ios',
    id: 'imagex.pro.ios.lifetime',
    cm: 'sjb'
  },
  //Imagex
  'image_upscaler': {
    name: 'pro',
    id: 'yearly_sub_pro',
    cm: 'sja'
  },
  //Lens智图
  'DayPoem': {
    name: 'Pro Access',
    id: 'com.uzero.poem.month1',
    cm: 'sja'
  },
  //西江诗词
  'Personal%20Best': {
    name: 'pro',
    id: 'PersonalBestPro_Yearly',
    cm: 'sja'
  },
  //Personal Best-运动报告
  'Darkroom': {
    name: 'iapkit_darkroomplus',
    id: 'co.bergen.Darkroom.product.forever.everything',
    cm: 'sjb'
  },
  //Darkroom-照片/视频编辑
  'CardPhoto': {
    name: 'allaccess',
    id: 'CardPhoto_Pro',
    cm: 'sjb'
  },
  //卡片馆-相框与复古胶片
  'OneWidget': {
    name: 'allaccess',
    id: 'com.onewidget.vip',
    cm: 'sjb'
  },
  //奇妙组件-轻巧桌面小组件
  'PinPaper': {
    name: 'allaccess',
    id: 'Paper_Lifetime',
    cm: 'sjb'
  },
  //InPaper-创作壁纸
  'Cookie': {
    name: 'allaccess',
    id: 'app.ft.Bookkeeping.lifetime',
    cm: 'sjb'
  },
  //Cookie-记账
  'MyThings': {
    name: 'pro',
    id: 'xyz.jiaolong.MyThings.pro.infinity',
    cm: 'sjb'
  },
  //物品指南
  '%E4%BA%8B%E7%BA%BF': {
    name: 'pro',
    id: 'xyz.jiaolong.eventline.pro.lifetime',
    cm: 'sjb'
  },
  //事线-串事成线
  'PipDoc': {
    name: 'pro',
    id: 'pipdoc_pro_lifetime',
    cm: 'sjb'
  },
  //PipDoc-画中画
  'Facebook': {
    name: 'pro',
    id: 'fb_pro_lifetime',
    cm: 'sjb'
  },
  //MetaSurf-社交网站浏览器
  'Free': {
    name: 'pro',
    id: 'appspree_pro_lifetime',
    cm: 'sjb'
  },
  //Appspree
  'Startodo': {
    name: 'pro',
    id: 'pro_lifetime',
    cm: 'sjb'
  },
  //Startodo
  'Browser': {
    name: 'pro',
    id: 'pro_zoomable',
    cm: 'sjb'
  },
  //Zoomable-桌面浏览器
  'YubePiP': {
    name: 'pro',
    id: 'piptube_pro_lifetime',
    cm: 'sjb'
  },
  //YubePiP-油管播放器
  'PrivateBrowser': {
    name: 'pro',
    id: 'private_pro_lifetime',
    cm: 'sjb'
  },
  //Brovacy-隐私浏览器
  'Photo%20Cleaner': {
    name: 'premium',
    id: 'com.monocraft.photocleaner.lifetime.3',
    cm: 'sjb'
  },
  //照片清理Photo Cleaner
  'bluredit': {
    name: 'Premium',
    id: 'net.kaleidoscope.bluredit.premium1',
    cm: 'sja'
  },
  //bluredit-模糊视频&照片
  'TouchRetouchBasic': {
    name: 'premium',
    id: 'tr5_yearlysubsc_15dlrs_2',
    cm: 'sja'
  },
  //TouchRetouch-水印清理
  'TimeFinder': {
    name: 'pro',
    id: 'com.lukememet.TimeFinder.Premium',
    cm: 'sjb'
  },
  //TimeFinder-提醒App
  'Alpenglow': {
    name: 'newPro',
    id: 'ProLifetime',
    cm: 'sja'
  },
  //Alpenglow-日出日落
  'Decision': {
    name: 'com.nixwang.decision.entitlements.pro',
    id: 'com.nixwang.decision.pro.annual',
    cm: 'sja'
  },
  //小决定-选择困难症克星
  'ElementNote': {
    name: 'pro',
    id: 'com.soysaucelab.element.note.lifetime',
    cm: 'sjb'
  },
  //ElementNote-笔记&PDF
  'Noto%20%E7%AC%94%E8%AE%B0': {
    name: 'pro',
    id: 'com.lkzhao.editor.full',
    cm: 'sja'
  },
  //Noto-笔记
  'Tangerine': {
    name: 'Premium',
    id: 'PremiumMonthly',
    cm: 'sja'
  },
  //Tangerine-习惯与情绪追踪
  'Email%20Me': {
    name: 'premium',
    id: 'ventura.media.EmailMe.premium.lifetime',
    cm: 'sjb'
  },
  //Email Me-给自己发邮箱
  'Brass': {
    name: 'pro',
    id: 'brass.pro.annual',
    cm: 'sja'
  },
  //Brass-定制图标&小组件
  'Happy%3ADays': {
    name: 'pro',
    id: 'happy_999_lifetime',
    cm: 'sjb'
  },
  //Happy:Days-小组件App
  'Aphrodite': {
    name: 'all',
    id: 'com.ziheng.aphrodite.onetime',
    cm: 'sjb'
  },
  //Aphrodite-啪啪啪日历
  'apollo': {
    name: 'all',
    id: 'com.ziheng.apollo.onetime',
    cm: 'sjb'
  },
  //Apollo-记录影视
  'widget_art': {
    name: 'all',
    id: 'com.ziheng.widgetart.onetime',
    cm: 'sjb'
  },
  //WidgetArt-自定义小组件
  'audiomack-iphone': {
    name: 'Premium1',
    id: 'com.audiomack.premium.2022',
    cm: 'sja'
  },
  //AudioMack-音乐App
  'MallocVPN': {
    name: 'IOS_PRO',
    id: 'malloc_yearly_vpn',
    cm: 'sja'
  },
  //Malloc VPN
  'WhiteCloud': {
    name: 'allaccess',
    id: 'wc_pro_1y',
    cm: 'sja'
  },
  //白云天气
  'Spark': {
    name: 'premium',
    id: 'spark_6999_1y_1w0',
    nameb: 'premium',
    idb: 'spark_openai_tokens_4xt',
    cm: 'sja'
  },
  //Spark_Mail-邮箱管理
  'NotePlan': {
    name: 'premium',
    id: 'co.noteplan.subscription.personal.annual',
    cm: 'sja'
  },
  //NotePlan
  'vibes': {
    name: 'patron',
    id: 'com.andyworks.vibes.yearlyPatron',
    cm: 'sja'
  },
  //NotBoring-Vibes个性化音乐
  'simple-weather': {
    name: 'patron',
    id: 'com.andyworks.weather.yearlyPatron',
    cm: 'sja'
  },
  //NotBoring-天气
  'streaks': {
    name: 'patron',
    id: 'com.andyworks.weather.yearlyPatron',
    cm: 'sja'
  },
  //NotBoring-习惯
  'andyworks-calculator': {
    name: 'patron',
    id: 'com.andyworks.weather.yearlyPatron',
    cm: 'sja'
  },
  //NotBoring-计算器
  'simple-timer': {
    name: 'patron',
    id: 'com.andyworks.weather.yearlyPatron',
    cm: 'sja'
  },
  //NotBoring-时间
  'Harukong': {
    name: 'premium',
    id: 'com.bluesignum.harukong.lifetime.premium',
    cm: 'sjb'
  },
  //天天豆-日记应用
  'UTC': {
    name: 'Entitlement.Pro',
    id: 'tech.miidii.MDClock.subscription.month',
    cm: 'sja'
  },
  //花样文字
  'OffScreen': {
    name: 'Entitlement.Pro',
    id: 'tech.miidii.offscreen.pro',
    cm: 'sjb'
  },
  //OffScreen-自律番茄钟
  '%E8%B0%9C%E5%BA%95%E9%BB%91%E8%83%B6': {
    name: 'Entitlement.Pro',
    id: 'tech.miidii.MDVinyl.lifetime',
    cm: 'sja'
  },
  //谜底黑胶
  '%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F': {
    name: 'Entitlement.Pro',
    id: 'tech.miidii.MDClock.pro',
    cm: 'sjb'
  },
  //目标地图
  '%E7%9B%AE%E6%A0%87%E5%9C%B0%E5%9B%BE': {
    name: 'pro',
    id: 'com.happydogteam.relax.lifetimePro',
    cm: 'sjb'
  },
  //
  'APTV': {
    name: 'Pro',
    id: 'com.kimen.aptvpro.lifetime',
    cm: 'sjb'
  },
  //APTV
  'Seamless': {
    name: 'Seamless.Pro',
    id: 'net.shinystone.Seamless.Pro',
    cm: 'sjb'
  },
  //Seamless同步
  'Anybox': {
    name: 'pro',
    id: 'cc.anybox.Anybox.annual',
    cm: 'sja'
  },
  //Anybox-跨平台书签管理
  'ScannerPro': {
    name: 'plus',
    id: 'com.ddm1024.premium.yearly',
    cm: 'sja'
  },
  //Scanner Pro-文档扫描
  'Pillow': {
    name: 'premium',
    id: 'com.neybox.pillow.premium.year.v2',
    cm: 'sja'
  },
  //Pillow-睡眠周期跟踪
  'Taio': {
    name: 'full-version',
    id: 'taio_1651_1y_2w0_std_v2',
    cm: 'sja'
  },
  //Tiao
  'CPUMonitor': {
    name: 'Pro',
    id: 'com.mars.cpumonitor_removeAd',
    cm: 'sjb'
  },
  //手机硬件管家
  'totowallet': {
    name: 'all',
    id: 'com.ziheng.totowallet.onetimepurchase',
    cm: 'sjb'
  },
  //图图记账
  '1Blocker': {
    name: 'premium',
    id: 'blocker.ios.iap.lifetime',
    cm: 'sjb'
  },
  //1Blocker-广告拦截
  'VSCO': {
    name: 'pro',
    id: 'vscopro_global_5999_annual_7D_free',
    cm: 'sja'
  } //VSCO-照片与视频编辑编辑
};
;
var encode_version = 'jsjiami.com.v5';
var __0x122ff5 = ["WU3DtMKn", "P8Ozw4sNw7DDhngcXQFqw7zDkXDDv8OFwr5VWMK9wp17PsKgL8KqBA==", "asKlw5HDqww=", "wp3CqsOqw60=", "w5VDSXzCj8Oxwr/DkcO/w57DuRVcw4TDgsOSEcOmwpHCl8OoWMOOf1hgZg==", "w4lUSH/CjsO6", "w6l8wpXCqcOD", "6K+w5rOz6ZSM6KycdMOF", "wrLCqsKSwrzDlA==", "QcO7Z8KEJQ==", "wpvCmcKawp3DjA==", "BjbCi8KAZA==", "aDjCjsKbWw==", "w4pgwo/CpMOwWw==", "wrJSwpJgQsO8BAbCrsOgwqs=", "O1gr", "8LGFtAfmiorliKLor4LljYNSwq9lwpbDhMOAXeWAvu+8tBUxPsObw7Am772577+9", "w4k0Hg==", "BsOpw4YjwqU=", "w69owrgdPg==", "wr7CisOKw5Zd", "BsOFwow=", "wojCosKjI3Q=", "M8OVw44uwqk=", "wqFdalHDomMmYsOww6gfPg==", "w6gpBsOeRWA=", "wpnCjsKcwqw/", "wpnCh8OCw6lt", "PMO4DMOydg==", "wrjClMKHwqcvSMKmw7pAGQ==", "TnPCoMOTw5jDlsO5PmrDpm7CjQ==", "wqbCnHfChAEMwqTCg1Mcw55O", "wp7CtsO7CHc=", "McOZCsOUbg==", "YQ3DjA==", "wo/CkcO3Bw==", "ZB7DkhsE", "ZA3DjwwUw4AePQJHwpAhw4ANKjkkwrJwwrTDiMO9wpXCncOiw4XCig==", "aMO0UcKKPg==", "QTLCnsKM", "w7bCj8K7woYeecKMw6vDhyDDtMOswq7CisOULQ5twq/DrMOpwrDCgMKpw7F/w7w=", "I8Okw4oOw7HDjQ==", "W8K4w5TCicKh", "wonDi2Y=", "w5vDiCd0wqg=", "KysJEHY=", "6K+25rO66ZSm6K+lQzo=", "V8ONw7kxEQ==", "w4LDpQlLwoXCjg==", "LsOyw5cAw6LDiw==", "w7nDhTxvw5DCuMOPwowsw6hKwpY=", "GcOeworClcK2EQ==", "CcOkN8Obfw==", "wqDCk3fCjh0=", "w5vCnBA=", "wrfCj8OQKEc=", "4oGr77i4bOS6qemDjei+suaLneiit+WnuOi1u++/jOWTn+WJkuWmi+eWuOaWkeahv8Kcw5LCvw==", "w4kLSA==", "YsOXUiQdflfCmsK/wq05wp99w5PCpA==", "bcKAwqzCqTA=", "w5XCtCVpCA==", "ScKGSVU3", "DWHCg03CsA==", "Y8K2MA==", "8Y+2tMOQ5baJ5Yy16YSX5Yil5pep5oyh77648J+cnPCTvIXwsK+1", "8Kyqr+KCqfClgK3CheacpuWNuumFteWJn+aVruaPu+++pPCYmLHwtZmw8JGqhw==", "ZMOZdA==", "wpHClkAzw6I=", "ZcOeccKK", "wrPCgGzCiQADwrXCsVMcw55UwpzCpsOfEivDrcKjwrXDgAo3w7VPwpID", "QsOiecOeKA==", "QHjCrcOJ", "HsO0w7DCp0zDhw==", "ScKiaQ==", "8KO4ucK+5qCA5rWz5pWP5pWv5o2D77yU5ZCA5Yuv5aWX55WZ5pat5qGcw5AOIA==", "w7ERDcOefg==", "SsOJw6EwGcKrwpo=", "w6Fowr/CnFzDq1J8ZcOvwoNdNcO5W3rCqzk=", "XkzDpMK3QzrDiBZwPcK9Qw==", "w5XCu2FLBg==", "w5vClhnDmAHDvw==", "c8KhwpzCscKl", "IsOrwqPCpMKi", "TcKBw5Y=", "ccO+fW41", "w5ZKwrYRAA==", "6K+S5rKP6ZSX6K+WdMKu", "wqdSwop2Tw==", "wrLDlMKyw73DssKc", "RjjCgA==", "K8Ozw6Uiw44=", "wrbCnlrCrxY=", "WsKOw6HDgwzDs8OIwr/Dhg==", "54qJ5p+r5YyH7723ZinkvI/lrIPmnZDlvoDnqpbvvpnov6vorbvmlpHmjb3mioXkuZPnmo7ltpTkvY4=", "5Yuk6ZmX54q25py55Y+Q7762AQfkv7/lrJ/mn43lvqvnqZQ=", "w4BDUg==", "RsOLf8KROg==", "V8KzJcKAcw==", "Sk3CtsOqw5Y=", "woN6VGjCo0s9PsO8w7VIMMK7Og==", "w7fCtHNmCA==", "fcKQMcKQZg==", "w7FEcWrCsg==", "w6jClE1rAcOOf3hy", "w6R0wrTCnU/DoUhGaA==", "McOawrU=", "wpDCusO9w71RO8KBwq8=", "4pmf77qCMuaWpeawkOaisOa0vuWKruWNheeVm+ebo8OuwqI3esO0wrVx542O5aCK7724", "wrPCk8Krwp3DpQ==", "w5DCk8K6wrs6", "wpLDp1A1woE=", "wrPCosKRHw==", "w5HChhnDnAHDvgnDoQ==", "wq/DrlULwoo=", "YgbDjwkq", "BMOow7HCoXM=", "wonCk8KkKywfZ8OrIMOLO8K1", "wpp9X3XCt1U=", "wrnChMKEwrA=", "a8Oecg==", "8JynlHfmi4jlirXorpTljIMuXDAvdnrDqeWBse++jXfCssOILcOiSynDgCUBIxfCk8O9ecK/77+G776C", "wrEnw7A=", "OsOJwqzCr8KM", "NysMEG8=", "VcK5wqXCmDxyHHnCmMO6w5s=", "RsKvw4XCs8KY", "XDbCi8KKasKow4/CvcKowrtZ", "Q8KPw6I=", "8J+GtR/miJrli6bor6Hlj6zCi8ONw7Byw7tewoHlg7fvvq7CksKQw5DCklfCse+8v++8rA==", "w4HDihI=", "w711wrc=", "asOew5kpGA==", "w4d8wps=", "4pqD77uXw6norJbljo8UMWTCq8OVw7Ek6YS557yU5aWE6LaW776h", "w5fCsD8yaFZH", "TjPCisORbsKew5DCkMKQwqlJW8KTGA==", "WMOVwr/DrA==", "QMOIwq0=", "w4TCksKswqg4OumGtee/muitmeWOmO++msOhwr7Ci8KfIRtzwoTDgMOzwrjChMK6w7AxwqYF", "4pij77qpw6DDkMOvw57DlcO7A+mHlee+l+enk+eUi+iFpeadvu++hOiHkOaeq+WBh+aun+i8mOigmQ==", "wrRcwo1h", "4pqn77q+NeiHqeadouW/p+W6k+W1pee4peavmOi9mOijmw==", "5qOB5rez5YiP6ISQ5p2V5bya5YWJ5p6B5b6P5ZKw", "8LajocOB44GFBMKcw4jCk0116Ya5572e5o265Y2T44Ofw6EV77iB4oKYwp3phovnvonlnrDlnY/vvaUyFsOpwq7Ck3XCn8O+QxXCkm0DNcOOcMKMwrh2w4rDpcKMw4/Dv2TCs8Osw6kdf3jCn1XDqAoaBMKffsO277iG4oGTQ+iusOmZlOmTteaPuu+9pyjDksKmw7fCpW0rcU82w7IxbA52eMK3w7wlHmZpf8O6Ni/ChcOnw4rCkMOMw5A2OnzChcOew6LCmzB0wq0Nw5tywqZKKcOrwojCuR1fOsKKwpPClcKmwqfCg1AqeMOoGFnDhcKCcQ9NdsOnwovCg2vDusOf8YGQtgHjgJjkvJLnlororIjmmrjjg7PCtAPvuozigoBd5rWX5Yql6Kyh6Zuo6ZKr5oyG5YmMw4nCkEwCwofCnsKXTe+7ruKBqjPlk5jnlInDqyPohKTmnILlvb3lhJshOOW7u+S/h+Wur+iugee8uHcM4pmr77uHX+ODk+axjuaGuOS5h+miruOAhcKqaMOb5b255YeL55es5Lqo6ZqC5q2c6Z6W5rCK5Ze25YyF6IeZ5pyUwqN/wpTkuqbkvL/lr5DkupLkv4vpq7Pvvp7orJ7lib3kvJLmk5Tmio/mu4bnlqbCtDnCqOW4tOitjG7Ds8KZw4flsbzmlJflhb/liJDpmqbvvZnpg5Xlh4XkuIzlvKLop57plpnpoqknw47wvKuFwoLmhZ/osrPnka3opJvkuKvml5Lmj6jvvIs=", "8YCXvjLltrfmkIjkvKzmiaXliIHwta+68Ka9h/GHj5EI5Y2Q5b61542644KP5YqP5LuS6aO86YOowoBfwrTCtcOYwow+IMOVwqvCsyXDlsKKR8OQw7N7FHXCkGw=", "TcOIw7E7", "wrjClcKXwr0iXcKmw75c", "wo3CmFU=", "RcObaMO/HA==", "w5pSwojCjEc=", "B8O/w7rCpV7DhnFIfA==", "ecKVTW8Pf1TDnsOqw7xrw4Ugw4TCv8OHw5E=", "Dxoew7fCgEbDlMKOwqwdwqHChMOXw4nDhElQ", "JgzDmA7DqsOLwow=", "HsOPwpjClQ==", "w7DCkwI=", "M8OPwqs=", "8LGLkQfmoZrmt7bliInltaflsL3ol5Dnmo7Cu8Ocw5/vvbHlt7Dot4/ov7bohZvmnaDmi5noo5rjgZc=", "HsKXw7jCvSbCv8OhXlbChcOswrQlV37DgMKOZcKSw6w=", "wrfDkVc3TcOtMTvCtcKAw4ACdmjCusOdJsO0wrfCtQ==", "wrfDkVw6TcOtMTvCtcKAw4ACdmjCusOdJsO0wrfCtQ==", "wrHDmF4+UMOsOyfCscKMwqYCf2LCug==", "SyfCl8KgfMKaw4/CvcKG", "wpHCksKiOEQbRsOcCw==", "woLCqsOgw6o=", "wp7DiMKjw77DtcOCw7rDmw==", "wojCk8Oz", "QnPCt8OWw5nDnsO5IA==", "UMKywqs=", "W3/Dg8OiOsKfbcOiAkYpIBDDv3QoCiVNAw==", "X8ONwqk=", "B8O4w48k", "wojCk1A=", "wq3Ck27CiBc=", "P8KJLcOLdsOdwpPCr8OV", "H8Oyw6EFw7E=", "dMK6eHIB", "LxrDigPDqMOX", "woXCusOxw61GIMKHwqNxWA==", "M8O+NsOifMKjwqrDgAEQwrADBsOJGlxX", "dQzDkwEGw40=", "w4TChhXDjBbDpQ/DrXxU", "ByDCn8KJZMOaNsK8UQ0UYF3CrCt/Qw==", "wqVAwo18QMOU", "w5LCp8KQwpM/", "wrdGwpxmRMOIAhbCgMO3", "ewvDiA0Tw7waFxVKwowpw4cEPA==", "TcOUwrnDoGzDoQ==", "LsOkOsOObMKkwqHDkQcQ", "w57DpQBawoLCosONwosxw7kYw5c1ZRs=", "w73Ctw/Dtzk=", "w7bClAx9A8KvYXTDoMOL", "TznCk8KWe8KCw4XCosKGwrBUXA==", "woh6TWjCpUg=", "BEfChnrClzTDtlTDrHc=", "wq7Cj8KRwr04VsKqw7VABVAd", "wprCisOhAEHCgw==", "w7XCiMK2wpEIaMKRw5bDhzw=", "wozDuHA2wqYCHMOuw54aCMKgwpM=", "dMK4wqXCkMKtMQ==", "RMOhTsO+DMOlw7ktwpDCsA==", "w7XCiMK2wpEIaMKRw4TDlifDr8Orwqk=", "wqvCs0oIw4s=", "w5TDvxxWwoTCkcOYwpMmw7QEw4U=", "FkHCl2DCkyg=", "w5ZERGvCmcOgwqLDrMO/w4I=", "w5LCnQPDlgHDuwPDonxINcOW", "TsKTw7bDjw3DtA==", "w67Cj0t9BMOVeH9zw54=", "wpLCglAzw6TDigVpw57DqnpGAA==", "wojCjMOwGkXCnzgvwpJX", "BEfChnrClzTDtkbDvWzDjl0/", "a0fDmw==", "w4ZlYQ==", "w6LCoAc=", "QsKpwqE=", "NcOuw5Y=", "woNtWw==", "6ZeY6Kyo5LyR5oCU77yW", "w41FUmjCicKow6TCocO7w4DDpFJaw43DkcOaGsO9woDCq8OkTcKQbF5jLsOewoQPNHtBw6YmecKbK0TDlsOUTldxam7DhsKwwoNzwopTw5/CqFJ7YA==", "H0bCkHnCh3zCsBnDqHXDiB0+fi7Ci13DjRTCt1oXJMKZYBjCncOKCHHCqsKgw4bCoS7Cq0Aow6AWwoNiH8KXBgw5HcKfGyjDtMKzw4nCtcKc", "worCv8KxC0E=", "XMKBw6fDvjg=", "wrbChcKDF24=", "wrB7VnPCkg==", "CcOAAcOpWQ==", "IyHCmsKPXw==", "BsO5wp8hLA==", "w5DChDlDJw==", "wrzClcKtwo/Dng==", "RHjCm8Oow7o=", "wpxnWmTCpE86dcO7", "aMOUWsKhGA==", "wpHDtGM=", "ccKzwoLDvE8=", "IsOWw4zCl1w=", "4p6Pw5LkuI7ml4LmjbTnm6TkuKLnk6jlt5PlhIU=", "WMKqw6HCs8KD", "wql7wpdGcg==", "w6PCucKQwrov", "SsKlw4A=", "wovCgXc2w5A=", "e8KHw5bDlg0=", "eMKDwr/CqsKf", "BVg1w6rChQ==", "w5B5wqfCq2c=", "f8Klwrs=", "AzAlClA=", "dsKaFMK6bA==", "QcK1woLCrhU=", "d8Kid0E9", "w5fDpAZcwoTClMOSwpA=", "4pqB77uVw6rmlbTms5fmo7/mt6vliqnljpLnlrHnm5nDun4FQHw2dueOjeWhtO+/ug==", "GAYhK3g=", "w5sUbMOZw7E=", "Y8OtfEkj", "fcKFwrTCq8Kg", "b8O/d8KhJA==", "w7FWdWjCnQ==", "FcOFDMOtL8KTwrrDgQ0Qw6NT", "WGnCtcOOw5nDiQ==", "c8KuwqLCmsKi", "wrfCmmbCgw==", "woXCmMKy", "blLDnQ==", "YsOxw6Y=", "5YiF6Zqp54mG5pyV5Y65776COcOW5L+H5a2K5p+L5b6556qH", "wrrCgkTChDI=", "WsKaw7TDgDk=", "wrDCm3U=", "wo3CgWADw6g=", "dMOFdMKHO8KWw6jDuMKJw58=", "QlLDl8K3cA==", "w7ZAwpYtJA==", "XVbCnQ==", "w5XChcKjwpMO", "w7hrwovCvMOy", "6Kyz5rGx6Zen6K+6HcKa", "wo/CvMOGAHE=", "w74/TMO/w5k=", "wrzCv8O5DEI=", "bsK/w5TCosKsPA==", "wp5Zwo58bA==", "wrzCtMK0wpvCn8OOwrbCsAfDoURs", "fMK4w4bCv8K+IR8/LEY=", "A8OLw4sSwoc=", "wopoSmLCqg==", "eVPCvw==", "woTCtcKCFH5g", "GC3Cm8KsQQ==", "WjbDig==", "w4leQQ==", "w7fClHNXFA==", "BMObw7g0wrE=", "wqDCgMKCHF0=", "6KyM5rK76ZaL6K6GHMON", "QcKNworCrgM=", "wobCkkY=", "w6MUBcOueg==", "6K2N5rKX6ZWV6K6uMxE=", "VsKcwqbCoS8=", "SFbDscKqQiU=", "ZcOXwq7Duls=", "aMKqwq7Dp1I=", "CDzCgsK/cMOB", "BSDClg==", "4pq177uEw7borILljJx/H8Kaw5vCscONO+mGtee8geWlqui3ju+8hQ==", "BMO8w5EywpwhVw==", "wo5awo1icg==", "WU/CgMOAw7s=", "woxnwqpFB8O/GQbCisO3w6jCsg==", "UsKuwqvDoHdM", "UzXCssKqQw==", "6Kye5rGL6ZSn6K+uw7gG", "w4rCl2VmDQ==", "LsOlOcOJesKl", "wpfCvMOgw7dCPA==", "a8Kyw4TDkiU=", "ScOsa1pZX0jDmcOgw60wwpE=", "w4oNRsOuw4hK", "WXfDk8KdbQ==", "LcOsw68qw4k=", "w6LChBo=", "a8O1w5Q2Pw==", "6K2s5rCf6ZW+6K2FCjM=", "wqzCm1DCuDA=", "WSPChsKLesKd", "VMOewr/DmU8=", "WlHDo8K3UDg=", "wrfDomgxwq8=", "UHXDk8KtZQ==", "w7h5wqjCr8Oc", "V8KZw7DDti4=", "IsO+wr/CscOjJ8KKw4fDgDvCtzo=", "w6JuwrHCjFzDuw==", "w5nCuzPDqB8=", "S8Oqw5sOIQ==", "ccOmRsOdJA==", "wobChcKBwq8=", "wofCglwjw7PDkQN3", "G8O8w4Ml", "wpjCj8KH", "8L63sMO05ouy5Yu06K+h5YyuwpTDoCHDuMOPwonDhuWCje+9iE9zwr7DgcO3wrjCg8Ktw71/w692w4hNIMKK776z776l", "wqXDnE4=", "w559wpjCqMOxXMO+KXk=", "w4xBwq/CgcOE", "wo3CmMO+HEPCqz4/wrxAw6U=", "w6zCthRGGg==", "AVPCiHzCkQDDsETDgmDDmA==", "w4tCwoY=", "w6PDjyM=", "IgbDng==", "fMKHwrjCv8Ky", "wqbCjcOSw6dQ", "wqZewrVWaw==", "OsO0LA==", "csO7bg==", "w5JAwoM=", "ccKLfg==", "6ZS16K2I5Lyr5oOm77yR", "TsKqwq7Dtlo=", "McOiwroHMQ==", "TcKawr/CiAs=", "w4kYVcOpw5g="];
(function (_0x3cc7f6, _0x4bf101) {
  var _0x5c83ec = function (_0x287f1e) {
    while (--_0x287f1e) {
      _0x3cc7f6.push(_0x3cc7f6.shift());
    }
  };
  var _0x5c847e = function () {
    var _0x5f38ac = {
      'data': {
        'key': 'cookie',
        'value': 'timeout'
      },
      'setCookie': function (_0x315b5b, _0x7b7337, _0x3f9036, _0x302c61) {
        _0x302c61 = _0x302c61 || {};
        var _0x328eae = _0x7b7337 + '=' + _0x3f9036;
        var _0x26ba00 = 0x0;
        var _0x26ba00 = 0x0;
        for (var _0x2dd6b8 = _0x315b5b.length; _0x26ba00 < _0x2dd6b8; _0x26ba00++) {
          var _0x2ed93b = _0x315b5b[_0x26ba00];
          _0x328eae += "; " + _0x2ed93b;
          var _0x43449d = _0x315b5b[_0x2ed93b];
          _0x315b5b.push(_0x43449d);
          _0x2dd6b8 = _0x315b5b.length;
          if (_0x43449d !== true) {
            _0x328eae += '=' + _0x43449d;
          }
        }
        _0x302c61.cookie = _0x328eae;
      },
      'removeCookie': function () {
        return 'dev';
      },
      'getCookie': function (_0x3ec084, _0xe56ebc) {
        _0x3ec084 = _0x3ec084 || function (_0x41293f) {
          return _0x41293f;
        };
        var _0x18d96d = _0x3ec084(new RegExp("(?:^|; )" + _0xe56ebc.replace(/([.$?*|{}()[]\/+^])/g, '$1') + '=([^;]*)'));
        var _0x45c2a3 = function (_0xa9b9c, _0x555e37) {
          _0xa9b9c(++_0x555e37);
        };
        _0x45c2a3(_0x5c83ec, _0x4bf101);
        return _0x18d96d ? decodeURIComponent(_0x18d96d[0x1]) : undefined;
      }
    };
    var _0x5a029b = function () {
      var _0x4b786c = new RegExp("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}");
      return _0x4b786c.test(_0x5f38ac.removeCookie.toString());
    };
    _0x5f38ac.updateCookie = _0x5a029b;
    var _0x45eb25 = '';
    var _0x4dede6 = _0x5f38ac.updateCookie();
    if (!_0x4dede6) {
      _0x5f38ac.setCookie(['*'], 'counter', 0x1);
    } else if (_0x4dede6) {
      _0x45eb25 = _0x5f38ac.getCookie(null, 'counter');
    } else {
      'dev';
    }
  };
  _0x5c847e();
})(__0x122ff5, 0x1d3);
var _0x61fc = function (_0xadaa, _0x25a533) {
  _0xadaa = _0xadaa - 0x0;
  var _0xc9f726 = __0x122ff5[_0xadaa];
  if (_0x61fc.initialized === undefined) {
    (function () {
      var _0x34479f = typeof window !== 'undefined' ? window : typeof process === 'object' && typeof require === 'function' && typeof global === 'object' ? global : this;
      if (!_0x34479f.atob) {
        _0x34479f.atob = function (_0x581dc4) {
          var _0x329f82 = String(_0x581dc4).replace(/=+$/, '');
          var _0x1f3a55 = 0x0;
          var _0x461cc4;
          var _0x5e378c;
          var _0x919ab5 = 0x0;
          for (var _0x5014fa = ''; _0x5e378c = _0x329f82.charAt(_0x919ab5++); ~_0x5e378c && (_0x461cc4 = _0x1f3a55 % 0x4 ? _0x461cc4 * 0x40 + _0x5e378c : _0x5e378c, _0x1f3a55++ % 0x4) ? _0x5014fa += String.fromCharCode(0xff & _0x461cc4 >> (-0x2 * _0x1f3a55 & 0x6)) : 0x0) {
            _0x5e378c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(_0x5e378c);
          }
          return _0x5014fa;
        };
      }
    })();
    var _0x4fb32b = function (_0xb1a77c, _0x1711a1) {
      var _0x63a39b = [];
      var _0x54738d = 0x0;
      var _0x326520;
      var _0xefeb75 = '';
      var _0x4960b4 = '';
      _0xb1a77c = atob(_0xb1a77c);
      var _0x163969 = 0x0;
      for (var _0x4f1310 = _0xb1a77c.length; _0x163969 < _0x4f1310; _0x163969++) {
        _0x4960b4 += '%' + ('00' + _0xb1a77c.charCodeAt(_0x163969).toString(0x10)).slice(-0x2);
      }
      _0xb1a77c = decodeURIComponent(_0x4960b4);
      for (var _0x5abfd3 = 0x0; _0x5abfd3 < 0x100; _0x5abfd3++) {
        _0x63a39b[_0x5abfd3] = _0x5abfd3;
      }
      for (_0x5abfd3 = 0x0; _0x5abfd3 < 0x100; _0x5abfd3++) {
        _0x54738d = (_0x54738d + _0x63a39b[_0x5abfd3] + _0x1711a1.charCodeAt(_0x5abfd3 % _0x1711a1.length)) % 0x100;
        _0x326520 = _0x63a39b[_0x5abfd3];
        _0x63a39b[_0x5abfd3] = _0x63a39b[_0x54738d];
        _0x63a39b[_0x54738d] = _0x326520;
      }
      _0x5abfd3 = 0x0;
      _0x54738d = 0x0;
      for (var _0x5cbc52 = 0x0; _0x5cbc52 < _0xb1a77c.length; _0x5cbc52++) {
        _0x5abfd3 = (_0x5abfd3 + 0x1) % 0x100;
        _0x54738d = (_0x54738d + _0x63a39b[_0x5abfd3]) % 0x100;
        _0x326520 = _0x63a39b[_0x5abfd3];
        _0x63a39b[_0x5abfd3] = _0x63a39b[_0x54738d];
        _0x63a39b[_0x54738d] = _0x326520;
        _0xefeb75 += String.fromCharCode(_0xb1a77c.charCodeAt(_0x5cbc52) ^ _0x63a39b[(_0x63a39b[_0x5abfd3] + _0x63a39b[_0x54738d]) % 0x100]);
      }
      return _0xefeb75;
    };
    _0x61fc.rc4 = _0x4fb32b;
    _0x61fc.data = {};
    _0x61fc.initialized = true;
  }
  var _0x3a3722 = _0x61fc.data[_0xadaa];
  if (_0x3a3722 === undefined) {
    if (_0x61fc.once === undefined) {
      var _0x1d8d0b = function (_0x19f86e) {
        this.rc4Bytes = _0x19f86e;
        this.states = [0x1, 0x0, 0x0];
        this.newState = function () {
          return 'newState';
        };
        this.firstState = "\\w+ *\\(\\) *{\\w+ *";
        this.secondState = "['|\"].+['|\"];? *}";
      };
      _0x1d8d0b.prototype.checkState = function () {
        var _0x39c99a = new RegExp(this.firstState + this.secondState);
        return this.runState(_0x39c99a.test(this.newState.toString()) ? --this.states[0x1] : --this.states[0x0]);
      };
      _0x1d8d0b.prototype.runState = function (_0x3d2ede) {
        if (!Boolean(~_0x3d2ede)) {
          return _0x3d2ede;
        }
        return this.getState(this.rc4Bytes);
      };
      _0x1d8d0b.prototype.getState = function (_0x23fc2c) {
        var _0x51f076 = 0x0;
        for (var _0x3101f6 = this.states.length; _0x51f076 < _0x3101f6; _0x51f076++) {
          this.states.push(Math.round(Math.random()));
          _0x3101f6 = this.states.length;
        }
        return _0x23fc2c(this.states[0x0]);
      };
      new _0x1d8d0b(_0x61fc).checkState();
      _0x61fc.once = true;
    }
    _0xc9f726 = _0x61fc.rc4(_0xc9f726, _0x25a533);
    _0x61fc.data[_0xadaa] = _0xc9f726;
  } else {
    _0xc9f726 = _0x3a3722;
  }
  return _0xc9f726;
};
if (typeof $rocket !== _0x61fc('0x0', "Fr^T")) {
  function getBoxJSValue(_0x11365d) {
    var _0x4bffe4 = function () {
      var _0x2acc3a = true;
      return function (_0x32aa97, _0x56b297) {
        var _0x1d1ce3 = _0x2acc3a ? function () {
          if (_0x56b297) {
            var _0x22b706 = _0x56b297.apply(_0x32aa97, arguments);
            _0x56b297 = null;
            return _0x22b706;
          }
        } : function () {};
        _0x2acc3a = false;
        return _0x1d1ce3;
      };
    }();
    var _0x2bd6c7 = _0x4bffe4(this, function () {
      var _0x2ee06 = function () {
        return "dev";
      };
      var _0x527390 = function () {
        return "window";
      };
      var _0x4c3e91 = function () {
        var _0x6b0400 = new RegExp("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}");
        return !_0x6b0400.test(_0x2ee06.toString());
      };
      var _0x3c4ed9 = function () {
        var _0x655506 = new RegExp("(\\\\[x|u](\\w){2,4})+");
        return _0x655506.test(_0x527390.toString());
      };
      var _0x390411 = function (_0x2e253c) {
        if (_0x2e253c.indexOf(false)) {
          _0x533479(_0x2e253c);
        }
      };
      var _0x533479 = function (_0x511379) {
        if (_0x511379.indexOf("true"[0x3]) !== 3) {
          _0x390411(_0x511379);
        }
      };
      if (!_0x4c3e91()) {
        if (!_0x3c4ed9()) {
          _0x390411("indеxOf");
        } else {
          _0x390411("indexOf");
        }
      } else {
        _0x390411("indеxOf");
      }
    });
    _0x2bd6c7();
    var _0x3a614c = {
      'GsKVZ': function _0x4bdab0(_0x30d349, _0xa8b258) {
        return _0x30d349 !== _0xa8b258;
      },
      'VnnYQ': _0x61fc('0x1', "!po["),
      'mjBpD': function _0x81c053(_0x12cac7, _0x255959) {
        return _0x12cac7 === _0x255959;
      },
      'PcGNO': function _0x29ba71(_0x58bb68, _0x251cf2) {
        return _0x58bb68 !== _0x251cf2;
      },
      'vyoaK': _0x61fc('0x2', "EDFr"),
      'IcbxS': _0x61fc('0x3', "FD6$"),
      'EyLkh': _0x61fc('0x4', "bc)Y")
    };
    try {
      if (_0x3a614c[_0x61fc('0x5', "0Zdo")](typeof $persistentStore, _0x3a614c[_0x61fc('0x6', "#b3a")]) && _0x3a614c[_0x61fc('0x7', "bc)Y")](typeof $persistentStore[_0x61fc('0x8', "UjMy")], _0x61fc('0x9', ")!N)"))) {
        if (_0x3a614c[_0x61fc('0xa', "bc)Y")](_0x3a614c[_0x61fc('0xb', "*#xo")], _0x3a614c[_0x61fc('0xc', "fn[H")])) {
          reject(_0x61fc('0xd', "UjMy") + response[_0x61fc('0xe', "kC0*")]);
        } else {
          const _0x3d003f = $persistentStore[_0x61fc('0xf', "wKKU")](_0x11365d);
          console[_0x61fc('0x10', "f%Fr")](_0x61fc('0x11', "QoC!") + _0x11365d + _0x61fc('0x12', "!po[") + _0x3d003f);
          return _0x3d003f;
        }
      } else if (_0x3a614c[_0x61fc('0x13', "fA%H")](typeof $prefs, _0x3a614c[_0x61fc('0x14', "BC6A")]) && typeof $prefs[_0x61fc('0x15', "(VIc")] === _0x3a614c[_0x61fc('0x16', "nT@T")]) {
        const _0x13c881 = $prefs[_0x61fc('0x17', "F46t")](_0x11365d);
        console[_0x61fc('0x18', "!CG4")](_0x61fc('0x19', "VHty") + _0x11365d + _0x61fc('0x1a', "WDQm") + _0x13c881);
        return _0x13c881;
      } else {
        console[_0x61fc('0x1b', "!po[")](_0x3a614c[_0x61fc('0x1c', "wNA5")]);
      }
    } catch (_0x436931) {
      console[_0x61fc('0x1d', "!3uS")](_0x61fc('0x1e', "(VIc") + _0x436931[_0x61fc('0x1f', "L#He")]);
    }
    return null;
  }
  const scriptSwitch = getBoxJSValue(_0x61fc('0x20', "F46t"));
  const isScriptEnabled = scriptSwitch === _0x61fc('0x21', "3#x)") || scriptSwitch === true;
  console[_0x61fc('0x22', "3#x)")](_0x61fc('0x23', "#b3a") + scriptSwitch);
  if (!isScriptEnabled) {
    console[_0x61fc('0x1b', "!po[")](_0x61fc('0x24', "Fmlp"));
    $notification[_0x61fc('0x25', "Buti")](_0x61fc('0x26', "f%Fr"), _0x61fc('0x27', "VHty"), _0x61fc('0x28', "X)^m"));
    $done();
  }
}
const finalize = function (_0x72eedd = null) {
  var _0x3e2d24 = {
    'rODrs': _0x61fc('0x29', "bc)Y"),
    'KHXtn': function _0x1175bc(_0x494b93, _0x584def) {
      return _0x494b93(_0x584def);
    }
  };
  if (_0x72eedd) {
    obj[_0x61fc('0x2a', "wNA5")] = JSON[_0x61fc('0x2b', "wKKU")](_0x72eedd);
    console[_0x61fc('0x2c', "WDQm")](_0x3e2d24[_0x61fc('0x2d', "iW0R")]);
  }
  _0x3e2d24[_0x61fc('0x2e', "!po[")]($done, obj);
};
if (typeof $response === _0x61fc('0x2f', "fn[H")) {
  delete headers[_0x61fc('0x30', "VHty")];
  delete headers[_0x61fc('0x31', "hhu1")];
  obj[_0x61fc('0x32', "Re#z")] = headers;
  finalize();
} else {
  if (/(offerings|attributes|adservices_attribution)/[_0x61fc('0x33', "fA%H")]($request[_0x61fc('0x34', "$Vt1")])) {
    console[_0x61fc('0x35', "EDFr")](_0x61fc('0x36', "feX]"));
    $done({});
  }
  const timea = {
    'purchase_date': _0x61fc('0x37', "3#x)"),
    'expires_date': _0x61fc('0x38', "$Vt1")
  };
  const timeb = {
    'original_purchase_date': _0x61fc('0x39', "$Vt1"),
    'is_sandbox': false,
    'store_transaction_id': _0x61fc('0x3a', "$Vt1"),
    'store': _0x61fc('0x3b', "F46t"),
    'ownership_type': _0x61fc('0x3c', "UjMy")
  };
  let name;
  let nameb;
  let ids;
  let idb;
  let data;
  let anchor = false;
  let localMatched = false;
  for (const src of [listua, bundle]) {
    for (const i in src) {
      const test = src === listua ? ua : bundle_id;
      if (new RegExp("^" + i, "i")[_0x61fc('0x3d', "FD6$")](test)) {
        if (src[i].cm[_0x61fc('0x3e', "Fmlp")](_0x61fc('0x3f', "NU1!"))) {
          data = timea;
          anchor = true;
        } else if (src[i].cm[_0x61fc('0x40', "X%V^")](_0x61fc('0x41', "(VIc"))) {
          data = {
            'purchase_date': _0x61fc('0x42', "0Zz)")
          };
          anchor = true;
        } else if (src[i].cm[_0x61fc('0x3e', "Fmlp")](_0x61fc('0x43', "3#x)"))) {
          data = timea;
          anchor = false;
        }
        ids = src[i].id;
        name = src[i][_0x61fc('0x44', "p&Jf")] || '';
        idb = src[i][_0x61fc('0x45', "WDQm")];
        nameb = src[i][_0x61fc('0x46', "0hn^")];
        localMatched = true;
        break;
      }
    }
    if (localMatched) {
      break;
    }
  }
  const updateEntitlements = function (_0x42cce6 = '', _0x277cbd = '', _0x46c666 = false) {
    var _0x2b13c8 = {
      'PsElt': function _0x21ddec(_0x45b94b, _0x3cf005) {
        return _0x45b94b || _0x3cf005;
      },
      'QwvKO': function _0x5e21b6(_0x1d7984, _0x3937cb) {
        return _0x1d7984 || _0x3937cb;
      },
      'TZDqT': _0x61fc('0x47', "f%Fr"),
      'JDxHL': function _0x776bc5(_0x41a630, _0x37a350) {
        return _0x41a630 && _0x37a350;
      }
    };
    const _0x86351b = _0x2b13c8[_0x61fc('0x48', "*7)X")](name, _0x42cce6);
    const _0x4d60c8 = ids || _0x277cbd;
    const _0x5e311a = _0x2b13c8[_0x61fc('0x49', "ObgZ")](data, timea);
    const _0x25bde3 = Object[_0x61fc('0x4a', "Re#z")]({}, _0x5e311a, timeb);
    if (!anchor) {
      ddm[_0x61fc('0x4b', "FD6$")][_0x61fc('0x4c', "6NM!")] = Object[_0x61fc('0x4d', "*#xo")](ddm[_0x61fc('0x4e', ")!N)")][_0x61fc('0x4f', "0Zz)")] || {}, {
        [_0x4d60c8]: [Object[_0x61fc('0x50', "Buti")]({}, {
          'id': _0x2b13c8[_0x61fc('0x51', "#b3a")]
        }, _0x25bde3)]
      });
      ddm[_0x61fc('0x52', "Buti")][_0x61fc('0x53', "*#xo")] = Object[_0x61fc('0x54', "3#x)")](ddm[_0x61fc('0x55', "6NM!")][_0x61fc('0x56', "FrUw")] || {}, {
        [_0x4d60c8]: _0x5e311a
      });
    }
    if (_0x2b13c8[_0x61fc('0x57', ")!N)")](!_0x46c666, _0x86351b)) {
      ddm[_0x61fc('0x58', "$Vt1")][_0x61fc('0x59', "F46t")] = Object[_0x61fc('0x5a', "kC0*")](ddm[_0x61fc('0x5b', "hH)4")][_0x61fc('0x5c', "wKKU")] || {}, {
        [_0x86351b]: Object[_0x61fc('0x5d', "NU1!")]({}, _0x5e311a, {
          'product_identifier': _0x4d60c8
        })
      });
    }
    ddm[_0x61fc('0x5e', "#b3a")][_0x61fc('0x5f', "bc)Y")] = Object[_0x61fc('0x60', "44Vo")](ddm[_0x61fc('0x61', "iW0R")][_0x61fc('0x62', "#b3a")] || {}, {
      [_0x4d60c8]: _0x25bde3
    });
    if (_0x2b13c8[_0x61fc('0x63', "WDQm")](idb, nameb) && !_0x46c666) {
      ddm[_0x61fc('0x4e', ")!N)")][_0x61fc('0x64', "FrUw")] = Object[_0x61fc('0x65', "hH)4")](ddm[_0x61fc('0x66', "ru&a")][_0x61fc('0x67', ")!N)")], {
        [nameb]: Object[_0x61fc('0x68', "!CG4")]({}, _0x5e311a, {
          'product_identifier': idb
        })
      });
      ddm[_0x61fc('0x69', "Fr^T")][_0x61fc('0x6a', "WDQm")] = Object[_0x61fc('0x5d', "NU1!")](ddm[_0x61fc('0x6b', "NU1!")][_0x61fc('0x6c', "hH)4")], {
        [idb]: _0x25bde3
      });
    }
  };
  const fetchProductEntitlements = function () {
    var _0x3a5e79 = {
      'wBslb': function _0x17b8f4(_0x2152b5, _0x554634) {
        return _0x2152b5 === _0x554634;
      },
      'YrhrP': _0x61fc('0x6d', "cZlY"),
      'TQYTV': _0x61fc('0x6e', "ru&a"),
      'JnkYH': function _0x51e23c(_0x3df94e, _0x1c76cf) {
        return _0x3df94e(_0x1c76cf);
      },
      'YYSCO': function _0x2211fc(_0x259dd2, _0x460a1b) {
        return _0x259dd2 === _0x460a1b;
      },
      'UeWMG': function _0x3951d3(_0x571ef6, _0x4a25e2) {
        return _0x571ef6 !== _0x4a25e2;
      },
      'HuMDa': _0x61fc('0x6f', ")!N)"),
      'oeORV': function _0x19e559(_0x26aaac, _0x560aad) {
        return _0x26aaac !== _0x560aad;
      },
      'PiHhM': _0x61fc('0x70', "IlpQ"),
      'PGRWd': _0x61fc('0x71', "*7)X"),
      'oEDyp': function _0x3f2852(_0x4274c8, _0x46ee1d) {
        return _0x4274c8 > _0x46ee1d;
      },
      'TtsBj': function _0x172b1a(_0x1d9dde, _0x502f48) {
        return _0x1d9dde === _0x502f48;
      },
      'jYOKX': _0x61fc('0x72', "kC0*"),
      'xjlsa': function _0x25bddd(_0x18ae04, _0x1b1b4a) {
        return _0x18ae04 === _0x1b1b4a;
      },
      'Tuofp': function _0x167f71(_0x1b9710, _0x5c5487) {
        return _0x1b9710(_0x5c5487);
      },
      'LvBAa': _0x61fc('0x73', "UjMy"),
      'KxApM': _0x61fc('0x74', "ru&a"),
      'sabXR': _0x61fc('0x75', "hH)4"),
      'lHRia': function _0x3c68be(_0x451cf3, _0x39b2c7) {
        return _0x451cf3(_0x39b2c7);
      }
    };
    const _0x174046 = {
      'url': _0x3a5e79[_0x61fc('0x76', "UjMy")],
      'headers': headers
    };
    const _0x2750f3 = _0x3a5e79[_0x61fc('0x77', "!CG4")];
    const _0x245171 = function (_0x479884) {
      var _0x520993 = {
        'WfFxH': function _0x2d4d36(_0xae7c53, _0x2757e0) {
          return _0xae7c53(_0x2757e0);
        },
        'mHiSU': function _0x4ce9bf(_0xebc09d, _0x45da41) {
          return _0x3a5e79[_0x61fc('0x78', "UjMy")](_0xebc09d, _0x45da41);
        },
        'eDDXD': _0x3a5e79[_0x61fc('0x79', "kC0*")],
        'jvEvW': _0x3a5e79[_0x61fc('0x7a', "6NM!")],
        'TgSpg': function _0x76f5ef(_0x3b69e2, _0x3263d0) {
          return _0x3a5e79[_0x61fc('0x7b', "0Zz)")](_0x3b69e2, _0x3263d0);
        },
        'Royxs': function _0x4c4ee2(_0x544b61, _0xd2559c) {
          return _0x3a5e79[_0x61fc('0x7c', "EDFr")](_0x544b61, _0xd2559c);
        },
        'AcwSN': function _0x1bbfde(_0x35d764, _0x2f573e) {
          return _0x3a5e79[_0x61fc('0x7d', "$Vt1")](_0x35d764, _0x2f573e);
        },
        'buGCn': _0x3a5e79[_0x61fc('0x7e', "0Zdo")],
        'yCCbF': function _0x2e46a7(_0x4f8e1b, _0x19250e) {
          return _0x3a5e79[_0x61fc('0x7f', "X%V^")](_0x4f8e1b, _0x19250e);
        },
        'bmKCL': _0x61fc('0x80', "kC0*"),
        'bUCCZ': function _0x461484(_0x4fe19e, _0x2eb46b) {
          return _0x3a5e79[_0x61fc('0x81', "f%Fr")](_0x4fe19e, _0x2eb46b);
        },
        'hNbRj': _0x61fc('0x82', "bc)Y"),
        'PBAyu': function _0x52d779(_0x42e6a8, _0x2c586f) {
          return _0x42e6a8 !== _0x2c586f;
        },
        'oHQwH': _0x3a5e79[_0x61fc('0x83', "IlpQ")],
        'aiTOy': _0x3a5e79[_0x61fc('0x84', "fn[H")],
        'eOiaQ': _0x61fc('0x85', "0hn^")
      };
      return new Promise((_0x3a5e80, _0xd68443) => {
        var _0x4c80c3 = {
          'xIbDJ': function _0x361173(_0x3d24f9, _0xc3a61f) {
            return _0x520993[_0x61fc('0x86', "nT@T")](_0x3d24f9, _0xc3a61f);
          },
          'uDoLv': function _0x267819(_0x4665d0, _0x422ea0) {
            return _0x520993[_0x61fc('0x87', "Buti")](_0x4665d0, _0x422ea0);
          },
          'IpdsP': _0x520993[_0x61fc('0x88', "#b3a")],
          'JiswU': _0x61fc('0x89', "!CG4"),
          'rRTzW': _0x520993[_0x61fc('0x8a', "WDQm")],
          'ybUUL': function _0x14250c(_0x41369c, _0x236891) {
            return _0x520993[_0x61fc('0x8b', "!CG4")](_0x41369c, _0x236891);
          },
          'WmLhj': function _0x32c5ed(_0x4ee2cd, _0x219ba8) {
            return _0x520993[_0x61fc('0x8c', "44Vo")](_0x4ee2cd, _0x219ba8);
          },
          'DRAtO': function _0x307fd4(_0x2c62a8, _0x4593bc) {
            return _0x2c62a8(_0x4593bc);
          },
          'oiSUE': function _0x493df4(_0x6c39bf, _0x3ed91a) {
            return _0x520993[_0x61fc('0x8d', "hhu1")](_0x6c39bf, _0x3ed91a);
          },
          'xyuPD': function _0xbcfe57(_0x314d14, _0x4cdd8c) {
            return _0x314d14(_0x4cdd8c);
          },
          'Hoztj': function _0x251117(_0x2e764d, _0x2ace5a) {
            return _0x520993[_0x61fc('0x8e', "!po[")](_0x2e764d, _0x2ace5a);
          },
          'kWCsR': _0x61fc('0x8f', "44Vo"),
          'SjTbK': _0x520993[_0x61fc('0x90', "BC6A")],
          'nHDWj': function _0x90dd9a(_0x3ce47b, _0x421108) {
            return _0x520993[_0x61fc('0x91', "QoC!")](_0x3ce47b, _0x421108);
          },
          'dMNLQ': _0x520993[_0x61fc('0x92', "(VIc")],
          'FrjPK': function _0x4a72c5(_0x4717a1, _0xc73b49) {
            return _0x520993[_0x61fc('0x93', "ObgZ")](_0x4717a1, _0xc73b49);
          },
          'gRSLS': function _0x4af1ea(_0x432c1a, _0x47a6f9) {
            return _0x432c1a === _0x47a6f9;
          },
          'iWzHz': _0x61fc('0x94', "FrUw"),
          'iLnFx': _0x61fc('0x95', "IlpQ")
        };
        const _0x279a1b = {
          'url': _0x479884,
          'headers': headers
        };
        if (_0x520993[_0x61fc('0x96', "BC6A")](typeof $task, _0x520993[_0x61fc('0x97', "feX]")])) {
          if (_0x520993[_0x61fc('0x98', "VHty")](_0x520993[_0x61fc('0x99', "44Vo")], _0x520993[_0x61fc('0x9a', "f%Fr")])) {
            _0x520993[_0x61fc('0x9b', "ru&a")](_0xd68443, _0x61fc('0x9c', "6NM!") + response[_0x61fc('0x9d', "X%V^")]);
          } else {
            $task[_0x61fc('0x9e', "44Vo")](_0x279a1b)[_0x61fc('0x9f', "0hn^")](_0x2c5372 => {
              var _0x595862 = {
                'ypGiG': function _0x56682a(_0x1fc423, _0x30ad87) {
                  return _0x1fc423 !== _0x30ad87;
                },
                'uzqfS': _0x61fc('0xa0', "0Zdo"),
                'lvRCo': function _0x23ee14(_0x199632, _0x49c016) {
                  return _0x199632 === _0x49c016;
                },
                'Qmwxb': _0x61fc('0xa1', "cZlY"),
                'Sxwqe': function _0x154c13(_0x590a0a, _0x4474de) {
                  return _0x590a0a(_0x4474de);
                },
                'tETiW': function _0x1625a8(_0x215055, _0x2ab5fd) {
                  return _0x215055 !== _0x2ab5fd;
                },
                'GFked': _0x61fc('0xa2', "wNA5"),
                'ZjpiK': function _0x4b2777(_0x2c15cb, _0x266bc5) {
                  return _0x2c15cb(_0x266bc5);
                },
                'jRiSz': _0x61fc('0xa3', "ObgZ")
              };
              if (_0x595862[_0x61fc('0xa4', "0hn^")](_0x595862[_0x61fc('0xa5', "!CG4")], _0x61fc('0xa6', "WDQm"))) {
                if (_0x595862[_0x61fc('0xa7', "WDQm")](_0x2c5372[_0x61fc('0xa8', "f%Fr")], 0xc8)) {
                  if (_0x595862[_0x61fc('0xa9', "cZlY")](_0x595862[_0x61fc('0xaa', "X)^m")], _0x61fc('0xab', "X%V^"))) {
                    _0x595862[_0x61fc('0xac', "#b3a")](_0x3a5e80, _0x2c5372);
                  } else {
                    _0x595862[_0x61fc('0xad', "!3uS")](_0xd68443, _0x61fc('0xae', "Buti") + error);
                  }
                } else {
                  if (_0x595862[_0x61fc('0xaf', "NU1!")](_0x595862[_0x61fc('0xb0', "feX]")], _0x595862[_0x61fc('0xb1', "NU1!")])) {
                    _0x3a5e80(Object[_0x61fc('0xb2', "nT@T")](_0x2c5372, {
                      'body': data
                    }));
                  } else {
                    _0x595862[_0x61fc('0xb3', "Buti")](_0xd68443, _0x61fc('0xb4', "0Zdo") + _0x2c5372[_0x61fc('0xb5', "nT@T")]);
                  }
                }
              } else {
                w[c](_0x595862[_0x61fc('0xb6', "p&Jf")]);
              }
            })[_0x61fc('0xb7', "kC0*")](_0x116383 => {
              var _0x150cc4 = {
                'qbjzV': _0x61fc('0xb8', "X%V^"),
                'jnZYs': _0x61fc('0xb9', "UjMy"),
                'mBZuL': function _0x48d0a5(_0x56d26f) {
                  return _0x56d26f();
                },
                'aGrgQ': function _0x3b2c0c(_0x25f826, _0x13c016) {
                  return _0x25f826(_0x13c016);
                }
              };
              if (_0x150cc4[_0x61fc('0xba', "0Zz)")] === _0x61fc('0xbb', "*#xo")) {
                console[_0x61fc('0xbc', "ru&a")](_0x150cc4[_0x61fc('0xbd', "Fr^T")], err);
                _0x150cc4[_0x61fc('0xbe', "p&Jf")](fallbackSolution);
              } else {
                _0x150cc4[_0x61fc('0xbf', "UjMy")](_0xd68443, _0x61fc('0xc0', "NU1!") + _0x116383);
              }
            });
          }
        } else if (_0x520993[_0x61fc('0xc1', "(VIc")](typeof $httpClient, _0x520993[_0x61fc('0x92', "(VIc")])) {
          $httpClient[_0x61fc('0xc2', "WDQm")](_0x279a1b, (_0x5ce08a, _0x583183, _0x338e1d) => {
            if (_0x5ce08a) {
              _0x4c80c3[_0x61fc('0xc3', "3DR3")](_0xd68443, _0x61fc('0xc4', "L#He") + _0x5ce08a);
            } else if (_0x4c80c3[_0x61fc('0xc5', "(VIc")](_0x583183[_0x61fc('0xc6', "cZlY")], 0xc8)) {
              if (_0x4c80c3[_0x61fc('0xc7', "3#x)")] === _0x4c80c3[_0x61fc('0xc8', "IlpQ")]) {
                _0x3a5e80(Object[_0x61fc('0xc9', "0Zz)")](_0x583183, {
                  'body': _0x338e1d
                }));
              } else {
                console[_0x61fc('0xca', "0Zz)")](_0x61fc('0xcb', "44Vo") + e[_0x61fc('0xcc', "p&Jf")]);
              }
            } else {
              if (_0x4c80c3[_0x61fc('0xcd', "Buti")] !== _0x4c80c3[_0x61fc('0xce', "X%V^")]) {
                _0xd68443(_0x61fc('0xcf', "Buti") + _0x583183[_0x61fc('0xd0', "IlpQ")]);
              } else {
                if (_0x5ce08a) {
                  _0x4c80c3[_0x61fc('0xd1', "F46t")](_0xd68443, _0x61fc('0xd2', "kC0*") + _0x5ce08a);
                } else if (_0x4c80c3[_0x61fc('0xd3', "Fr^T")](_0x583183[_0x61fc('0xd4', "6NM!")], 0xc8)) {
                  _0x3a5e80(Object[_0x61fc('0xd5', "FD6$")](_0x583183, {
                    'body': _0x338e1d
                  }));
                } else {
                  _0x4c80c3[_0x61fc('0xd6', "!CG4")](_0xd68443, _0x61fc('0xd7', "VHty") + _0x583183[_0x61fc('0xd8', "feX]")]);
                }
              }
            }
          });
        } else if (_0x520993[_0x61fc('0xd9', "cZlY")](typeof $https, _0x520993[_0x61fc('0xda', "*7)X")])) {
          $https[_0x61fc('0xdb', "$Vt1")](_0x279a1b, (_0x50efdd, _0x4d5aeb, _0x334d3c) => {
            if (_0x50efdd) {
              _0x4c80c3[_0x61fc('0xdc', "wNA5")](_0xd68443, _0x61fc('0xdd', "3DR3") + _0x50efdd);
            } else if (_0x4c80c3[_0x61fc('0xde', "0hn^")](_0x4d5aeb[_0x61fc('0xdf', "F46t")], 0xc8)) {
              _0x4c80c3[_0x61fc('0xe0', "3#x)")](_0x3a5e80, Object[_0x61fc('0xe1', "cZlY")](_0x4d5aeb, {
                'body': _0x334d3c
              }));
            } else {
              if (_0x4c80c3[_0x61fc('0xe2', "bc)Y")](_0x4c80c3[_0x61fc('0xe3', "cZlY")], _0x4c80c3[_0x61fc('0xe4', "!3uS")])) {
                _0x4c80c3[_0x61fc('0xe5', "!CG4")](_0xd68443, _0x61fc('0xe6', "fA%H") + _0x4d5aeb[_0x61fc('0xe7', "!po[")]);
              } else {
                if (_0x4c80c3[_0x61fc('0xe8', ")!N)")](typeof $persistentStore, _0x4c80c3[_0x61fc('0xe9', "wNA5")]) && _0x4c80c3[_0x61fc('0xea', "iW0R")](typeof $persistentStore[_0x61fc('0xeb', "0Zdo")], _0x61fc('0xec', "WDQm"))) {
                  const _0x583823 = $persistentStore[_0x61fc('0xed', "p&Jf")](key);
                  console[_0x61fc('0xee', "0Zdo")](_0x61fc('0xef', "#b3a") + key + _0x61fc('0xf0', "$Vt1") + _0x583823);
                  return _0x583823;
                } else if (typeof $prefs !== _0x61fc('0xf1', "!3uS") && _0x4c80c3[_0x61fc('0xf2', "!3uS")](typeof $prefs[_0x61fc('0xf3', "NU1!")], _0x4c80c3[_0x61fc('0xf4', "$Vt1")])) {
                  const _0x1f2c50 = $prefs[_0x61fc('0xf5', "hH)4")](key);
                  console[_0x61fc('0xf6', "X)^m")](_0x61fc('0x19', "VHty") + key + _0x61fc('0xf7', "0hn^") + _0x1f2c50);
                  return _0x1f2c50;
                } else {
                  console[_0x61fc('0xf8', "Re#z")](_0x4c80c3[_0x61fc('0xf9', "44Vo")]);
                }
              }
            }
          });
        } else if (_0x520993[_0x61fc('0xfa', "FD6$")](typeof $http, _0x520993[_0x61fc('0xfb', "Buti")])) {
          $http[_0x61fc('0xfc', "6NM!")](_0x279a1b, (_0x543b4d, _0x3e09f7, _0x439c68) => {
            var _0x1b2f8f = {
              'opdbX': function _0x4db13a(_0x14d00c, _0x574988) {
                return _0x14d00c !== _0x574988;
              },
              'nBveR': _0x61fc('0xfd', "VHty"),
              'EETMf': function _0x4d0ff6(_0x52ff60, _0x7a5087) {
                return _0x52ff60 > _0x7a5087;
              },
              'BoidT': function _0x4c2814(_0x476bb5, _0x273a7c) {
                return _0x476bb5(_0x273a7c);
              },
              'FJrwk': function _0x45eae4(_0x557873, _0x102057) {
                return _0x557873 === _0x102057;
              },
              'oyzVs': _0x61fc('0xfe', "!po["),
              'HEYHx': _0x61fc('0xff', "ObgZ"),
              'IeSXx': _0x61fc('0x100', "3#x)"),
              'ZLloT': function _0x1325d2(_0x496544, _0x4d285d) {
                return _0x496544(_0x4d285d);
              }
            };
            if (_0x1b2f8f[_0x61fc('0x101', "IlpQ")](_0x1b2f8f[_0x61fc('0x102', "EDFr")], _0x1b2f8f[_0x61fc('0x103', "(VIc")])) {
              const _0x576acc = JSON[_0x61fc('0x104', "feX]")](_0x3e09f7[_0x61fc('0x105', "cZlY")]);
              if (_0x576acc && _0x576acc[_0x61fc('0x106', "*7)X")] && _0x1b2f8f[_0x61fc('0x107', "!CG4")](Object[_0x61fc('0x108', "FD6$")](_0x576acc[_0x61fc('0x109', "ru&a")])[_0x61fc('0x10a', "ru&a")], 0x0)) {
                return _0x3e09f7;
              } else {
                return _0x245171(_0x2750f3);
              }
            } else {
              if (_0x543b4d) {
                _0x1b2f8f[_0x61fc('0x10b', "!3uS")](_0xd68443, _0x61fc('0x10c', "f%Fr") + _0x543b4d);
              } else if (_0x1b2f8f[_0x61fc('0x10d', "0Zdo")](_0x3e09f7[_0x61fc('0xd8', "feX]")], 0xc8)) {
                if (_0x1b2f8f[_0x61fc('0x10e', "f%Fr")](_0x1b2f8f[_0x61fc('0x10f', "0Zdo")], _0x1b2f8f[_0x61fc('0x110', "0Zz)")])) {
                  _0x1b2f8f[_0x61fc('0x111', "F46t")](_0x3a5e80, Object[_0x61fc('0x112', "!3uS")](_0x3e09f7, {
                    'body': _0x439c68
                  }));
                } else {
                  const _0x591c2a = $prefs[_0x61fc('0x113', "Buti")](key);
                  console[_0x61fc('0x114', "hhu1")](_0x61fc('0x115', "feX]") + key + _0x61fc('0x116', "kC0*") + _0x591c2a);
                  return _0x591c2a;
                }
              } else {
                if (_0x1b2f8f[_0x61fc('0x117', "p&Jf")](_0x1b2f8f[_0x61fc('0x118', "X)^m")], _0x1b2f8f[_0x61fc('0x119', "FD6$")])) {
                  console[_0x61fc('0x11a', "fA%H")](_0x1b2f8f[_0x61fc('0x11b', "UjMy")], err);
                  return _0x1b2f8f[_0x61fc('0x11c', "p&Jf")](_0x245171, _0x2750f3);
                } else {
                  _0xd68443(_0x61fc('0x11d', "kC0*") + _0x3e09f7[_0x61fc('0x11e', "3DR3")]);
                }
              }
            }
          });
        } else {
          if (_0x520993[_0x61fc('0x11f', "wKKU")](_0x520993[_0x61fc('0x120', "FD6$")], _0x520993[_0x61fc('0x121', "6NM!")])) {
            ddm[_0x61fc('0x122', "wKKU")][_0x61fc('0x123', "X%V^")] = Object[_0x61fc('0x50', "Buti")](ddm[_0x61fc('0x69', "Fr^T")][_0x61fc('0x124', "0hn^")] || {}, {
              [finalName]: Object[_0x61fc('0x4d', "*#xo")]({}, finalData, {
                'product_identifier': finalIds
              })
            });
          } else {
            _0xd68443(_0x520993[_0x61fc('0x125', "NU1!")]);
          }
        }
      });
    };
    return _0x3a5e79[_0x61fc('0x126', "6NM!")](_0x245171, _0x174046[_0x61fc('0x127', "*#xo")])[_0x61fc('0x128', "NU1!")](_0x2c6c7c => {
      const _0x358f5d = JSON[_0x61fc('0x129', "*#xo")](_0x2c6c7c[_0x61fc('0x105', "cZlY")]);
      if (_0x358f5d && _0x358f5d[_0x61fc('0x12a', "*#xo")] && _0x3a5e79[_0x61fc('0x12b', "f%Fr")](Object[_0x61fc('0x12c', "F46t")](_0x358f5d[_0x61fc('0x12d', "#b3a")])[_0x61fc('0x12e', "*7)X")], 0x0)) {
        return _0x2c6c7c;
      } else {
        if (_0x3a5e79[_0x61fc('0x12f', "nT@T")](_0x61fc('0x130', "bc)Y"), _0x3a5e79[_0x61fc('0x131', "FrUw")])) {
          if (error) {
            _0x3a5e79[_0x61fc('0x132', "BC6A")](reject, _0x61fc('0x133', "VHty") + error);
          } else if (_0x3a5e79[_0x61fc('0x134', "wNA5")](_0x2c6c7c[_0x61fc('0x135', "FrUw")], 0xc8)) {
            resolve(Object[_0x61fc('0x136', "*7)X")](_0x2c6c7c, {
              'body': data
            }));
          } else {
            reject(_0x61fc('0x137', "FrUw") + _0x2c6c7c[_0x61fc('0x138', "fA%H")]);
          }
        } else {
          return _0x3a5e79[_0x61fc('0x139', "6NM!")](_0x245171, _0x2750f3);
        }
      }
    })[_0x61fc('0x13a', "0hn^")](_0x3c877b => {
      console[_0x61fc('0x13b', ")!N)")](_0x3a5e79[_0x61fc('0x13c', "NU1!")], _0x3c877b);
      return _0x245171(_0x2750f3);
    });
  };
  const fallbackSolution = function () {
    var _0x23d6bd = {
      'NXeDi': _0x61fc('0x13d', "hhu1"),
      'PUKgh': function _0x16c689(_0x4996df, _0x6132df, _0x1a6787, _0x1ba05f) {
        return _0x4996df(_0x6132df, _0x1a6787, _0x1ba05f);
      },
      'lKGly': _0x61fc('0x13e', "feX]"),
      'zSgDD': _0x61fc('0x13f', "VHty")
    };
    console[_0x61fc('0x35', "EDFr")](_0x23d6bd[_0x61fc('0x140', "(VIc")]);
    _0x23d6bd[_0x61fc('0x141', "$Vt1")](updateEntitlements, _0x23d6bd[_0x61fc('0x142', "ObgZ")], _0x23d6bd[_0x61fc('0x143', "hH)4")], false);
    finalize(ddm);
  };
  if (localMatched) {
    console[_0x61fc('0x144', "QoC!")](_0x61fc('0x145', "UjMy"));
    updateEntitlements();
    finalize(ddm);
  } else {
    console[_0x61fc('0x1b', "!po[")](_0x61fc('0x146', "*7)X"));
    fetchProductEntitlements()[_0x61fc('0x128', "NU1!")](_0x507607 => {
      var _0x2abbec = {
        'uvUSG': function _0x286921(_0x244172, _0x3872ee) {
          return _0x244172 === _0x3872ee;
        },
        'jLjtN': function _0x5e50c9(_0x147b26) {
          return _0x147b26();
        },
        'HAHEa': function _0x3f30e3(_0x57427a, _0x4e9663) {
          return _0x57427a === _0x4e9663;
        },
        'fjJHo': function _0x4921dc(_0x2685c4, _0x52d475, _0x41d5f3, _0x55364f) {
          return _0x2685c4(_0x52d475, _0x41d5f3, _0x55364f);
        },
        'pFBdL': _0x61fc('0x147', "f%Fr"),
        'qgWDF': function _0x17085c(_0x14e621, _0x21052e) {
          return _0x14e621(_0x21052e);
        }
      };
      const _0x5be374 = JSON[_0x61fc('0x148', "WDQm")](_0x507607[_0x61fc('0x149', "f%Fr")]);
      const _0x542e83 = _0x5be374[_0x61fc('0x14a', "0hn^")] || {};
      if (!_0x542e83 || _0x2abbec[_0x61fc('0x14b', "iW0R")](Object[_0x61fc('0x14c', "X%V^")](_0x542e83)[_0x61fc('0x14d', "fn[H")], 0x0)) {
        console[_0x61fc('0x14e', "ObgZ")](_0x61fc('0x14f', "fn[H"));
        _0x2abbec[_0x61fc('0x150', "3DR3")](fallbackSolution);
        return;
      }
      for (const [_0x4a60ec, _0x5b014e] of Object[_0x61fc('0x151', "wNA5")](_0x542e83)) {
        const _0x143eea = _0x5b014e[_0x61fc('0x152', "!po[")];
        const _0x53e7f8 = _0x5b014e[_0x61fc('0x153', "cZlY")] || [];
        if (_0x2abbec[_0x61fc('0x154', "Fr^T")](_0x53e7f8[_0x61fc('0x155', ")!N)")], 0x0)) {
          _0x2abbec[_0x61fc('0x156', "44Vo")](updateEntitlements, '', _0x143eea, true);
        } else {
          if (_0x2abbec[_0x61fc('0x157', "fA%H")](_0x61fc('0x158', "!CG4"), _0x2abbec[_0x61fc('0x159', "VHty")])) {
            _0x2abbec[_0x61fc('0x15a', "X)^m")](reject, _0x61fc('0x15b', "ObgZ") + error);
          } else {
            for (const _0x377688 of _0x53e7f8) {
              updateEntitlements(_0x377688, _0x143eea, false);
            }
          }
        }
      }
      finalize(ddm);
    })[_0x61fc('0x15c', "Buti")](_0x4d4d71 => {
      var _0x519388 = {
        'drAKK': _0x61fc('0x15d', "Fmlp"),
        'ulYBc': function _0x5ea46f(_0xf0096e) {
          return _0xf0096e();
        }
      };
      console[_0x61fc('0x15e', "F46t")](_0x519388[_0x61fc('0x15f', "*7)X")], _0x4d4d71);
      _0x519388[_0x61fc('0x160', "0hn^")](fallbackSolution);
    });
  }
}
;
(function (_0xa0f45b, _0x45f6e1, _0x4205df) {
  var _0x50b84f = {
    'Azjbt': function _0x5b125a(_0x19d662, _0x3e2916) {
      return _0x19d662 !== _0x3e2916;
    },
    'XjrXY': _0x61fc('0x161', "!CG4"),
    'aPbPz': function _0x1aed98(_0x20823b, _0x2eac44) {
      return _0x20823b === _0x2eac44;
    },
    'jNZho': function _0x18550f(_0x19ed8c, _0x1c8c44) {
      return _0x19ed8c + _0x1c8c44;
    },
    'rIfHL': _0x61fc('0x162', "UjMy"),
    'TuWrH': _0x61fc('0x163', "Buti")
  };
  _0x4205df = "al";
  try {
    _0x4205df += _0x61fc('0x164', "ru&a");
    _0x45f6e1 = encode_version;
    if (!(_0x50b84f[_0x61fc('0x165', "f%Fr")](typeof _0x45f6e1, _0x50b84f[_0x61fc('0x166', "QoC!")]) && _0x50b84f[_0x61fc('0x167', "X%V^")](_0x45f6e1, _0x61fc('0x168', "kC0*")))) {
      _0xa0f45b[_0x4205df](_0x50b84f[_0x61fc('0x169', "Fr^T")]("删除", _0x50b84f[_0x61fc('0x16a', "QoC!")]));
    }
  } catch (_0xcfc3ea) {
    _0xa0f45b[_0x4205df](_0x50b84f[_0x61fc('0x16b', "ru&a")]);
  }
})(window);
;
encode_version = 'jsjiami.com.v5';