/*************************************

项目名称：ELSA Speak
下载地址：https://t.cn/A6nBWQxQ
更新日期：2024-11-16
脚本作者：chxm1023
电报频道：https://t.me/chxm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/pool\.elsanow\.io\/(user\/api\/v\d\/purchase|entitlement\/api\/v\d\/user\/entitlements) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/elsa.js

[mitm]
hostname = pool.elsanow.io

*************************************/


var chxm1023 = JSON.parse($response.body);
const fixedExpireAt = 4092599349;
const startAt = Math.floor(Date.now() / 1000);
const ownerId = chxm1023.tier?.owner_id || "1Aaa2Bbb3Ccc4Ddd5Eee6Fff7Ggg8Hhh";

//计算剩余天数
function calculateDaysToEnd(expireTimestamp) {
  const now = Date.now() / 1000; // 当前时间戳（秒）
  return Math.ceil((expireTimestamp - now) / (60 * 60 * 24));
}

function createProduct(contentObjectId) {
  return {
    "created_at": "20240909090909",
    "expire_at": fixedExpireAt,
    "content_object_id": contentObjectId,
    "store": "default",
    "content_object_type": "topic"
  };
}

function generateContents(additionalFields = {}) {
  const template = {
    "expire_at": fixedExpireAt,
    "owner_id": ownerId,
    "application": "elsa_speak",
    "owner_type": "individual",
    "start_at": startAt,
    ...additionalFields
  };
  const topics = [
    "eiken",
    "english_for_ground_crew",
    "get_ready_for_ielts_by_harpercollins",
    "ielts_band_6",
    "ielts_band_7",
    "ielts_band_9",
    "oxford_advanced",
    "oxford_elementary",
    "oxford_intermediate",
    "oxford_pre_intermediate",
    "oxford_starter",
    "oxford_university_press_english_for_aviation_pilots_and_atc",
    "oxford_university_press_english_for_cabin_crew",
    "oxford_upper_intermediate",
    "pearson_pte_prep_b1",
    "pearson_pte_prep_b2",
    "speaking_for_ielts_by_harpercollins",
    "toefl_by_harpercollins",
    "toeic_by_harpercollins",
    "us_citizenship"
  ];

  return topics.map(topic => ({
    ...template,
    "code": `elsa_speak.topic.${topic}`
  }));
}

if (/purchase/.test($request.url)) {
  chxm1023.subscriptions = [
    {
      "expire_at": "20990909",
      "store": "ios",
      "subscription": "one_year_dc_premium_membership",
      "days_to_end": calculateDaysToEnd(fixedExpireAt),
      "created_at": "20240909090909"
    }
  ];
  chxm1023.one_time_products = [
    "273", "92", "323", "329", "330", "331", "263", "253", "260", "259", 
    "251", "80", "334", "261", "328", "321", "326", "322", "319", "344"
  ].map(createProduct);
}

if (/entitlement\/api\/v\d\/user\/entitlements/.test($request.url)) {
  chxm1023.entitlements.memberships = [
    {
      "credit_total": null,
      "start_at": startAt,
      "expire_at": fixedExpireAt,
      "code": "elsa_speak.membership.elsa_speak",
      "owner_type": "individual",
      "application": "elsa_speak",
      "owner_id": ownerId
    },
    {
      "credit_total": null,
      "start_at": startAt,
      "expire_at": fixedExpireAt,
      "code": "speech_analyzer.membership.speech_analyzer",
      "owner_type": "individual",
      "application": "speech_analyzer",
      "owner_id": ownerId
    }
  ];
  if (Array.isArray(chxm1023.entitlements.features)) {
    chxm1023.entitlements.features.forEach(item => {
      if ('credit_total' in item && 'start_at' in item && 'owner_id' in item) {
        item.credit_total = 999;
        item.start_at = startAt;
        item.owner_id = ownerId;
      }
    });
  }
  chxm1023.entitlements.contents = generateContents();
  chxm1023.tier = {
    "code": "premium",
    "expire_at": fixedExpireAt,
    "owner_id": ownerId,
    "owner_type": "individual",
    "start_at": startAt
  };
  chxm1023.transactions = [
    {
      "store": "ios",
      "order_id": "GPA.3381-5386-9184-26994",
      "interval": "subscription",
      "status": "granted",
      "created_at": startAt,
      "rf_id": "GPA.3381-5386-9184-26994",
      "duration": "one_year",
      "owner_type": "individual",
      "updated_at": startAt,
      "owner_id": ownerId,
      "catalog": "premium"
    }
  ];
  chxm1023.tiers = [
    {
      "code": "premium",
      "expire_at": fixedExpireAt,
      "owner_id": ownerId,
      "owner_type": "individual",
      "start_at": startAt
    }
  ];
}

$done({ body: JSON.stringify(chxm1023) });