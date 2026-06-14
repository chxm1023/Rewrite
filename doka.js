/*************************************

应用名称：Doka相机
脚本功能：解锁Pro
下载地址：https://shm.to/doka
更新日期：2026-06-14
脚本作者：@ddm1023
电报频道：https://t.me/ddm1023
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/www\.yindoka\.com\/apple\/(vip-detail|check-subscription-status|validate-receipt) url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/doka.js

[mitm]
hostname = www.yindoka.com

*************************************/


var ddm = JSON.parse($response.body);
const url = $request.url;

if (/vip-detail/.test(url)) {
  Object.assign(ddm.data, {
    vip_type: "lifetime",
    is_vip: true,
    expire_time: "2099-09-09 09:09:09",
    remaining_count: 99999,
    remaining_filter_count: 99999,
    remaining_compose_count: 99999
  });
  ddm.data.benefits = [
    {
      title: "永久会员",
      second_title: "Lifetime VIP",
      description: "已解锁全部高级功能"
    },
    {
      title: "无限AI构图",
      second_title: "Unlimited AI Compose",
      description: "无限次数使用"
    },
    {
      title: "无限AI滤镜",
      second_title: "Unlimited AI Filter",
      description: "解锁全部滤镜"
    },
    {
      title: "永久有效",
      second_title: "",
      description: "2099-09-09 到期"
    }
  ];
}

if (/check-subscription-status/.test(url)) {
  Object.assign(ddm.data, {
    is_vip: true,
    status: "vip",
    product_id: "com.ydgn.dokacamera.lifetime",
    expires_date: "2099-09-09T09:09:09Z",
    environment: "Production",
    auto_renew_status: true,
    is_trial_period: false
  });

}

if(/validate-receipt/.test(url)){
  ddm = {
    "receipt" : {
      "receipt_type" : "Production",
      "app_item_id" : 6751240418,
      "receipt_creation_date" : "2026-06-14 01:37:15 Etc/GMT",
      "bundle_id" : "com.ydgn.dokacamera",
      "original_purchase_date" : "2026-06-14 01:21:27 Etc/GMT",
      "in_app" : [
        {
          "quantity" : "1",
          "purchase_date_ms" : "1757408949000",
          "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
          "is_in_intro_offer_period" : "false",
          "expires_date_pst" : "2099-09-09 02:09:09 America/Los_Angeles",
          "transaction_id" : "490000461194237",
          "is_trial_period" : "false",
          "original_transaction_id" : "490000461194237",
          "purchase_date" : "2025-09-09 09:09:09 Etc/GMT",
          "product_id" : "com.ydgn.dokacamera.lifetime",
          "in_app_ownership_type" : "PURCHASED",
          "original_purchase_date_pst" : "2025-09-09 02:09:08 America/Los_Angeles",
          "web_order_line_item_id" : "490002349352247",
          "original_purchase_date_ms" : "1757408948000",
          "expires_date_ms" : "4092628149000",
          "purchase_date_pst" : "2025-09-09 02:09:09 America/Los_Angeles",
          "original_purchase_date" : "2025-09-09 09:09:08 Etc/GMT"
        }
      ],
      "adam_id" : 6751240418,
      "receipt_creation_date_pst" : "2026-06-13 18:37:15 America/Los_Angeles",
      "request_date" : "2026-06-14 01:37:27 Etc/GMT",
      "request_date_pst" : "2026-06-13 18:37:27 America/Los_Angeles",
      "version_external_identifier" : 886790236,
      "request_date_ms" : "1781401047474",
      "original_purchase_date_pst" : "2026-06-13 18:21:27 America/Los_Angeles",
      "application_version" : "3",
      "original_purchase_date_ms" : "1781400087000",
      "receipt_creation_date_ms" : "1781401035000",
      "original_application_version" : "3",
      "download_id" : 505622241166391500
    },
    "environment" : "Production",
    "status" : 0,
    "latest_receipt_info" : [
      {
        "quantity" : "1",
        "purchase_date_ms" : "1757408949000",
        "expires_date" : "2099-09-09 09:09:09 Etc/GMT",
        "is_in_intro_offer_period" : "false",
        "expires_date_pst" : "2099-09-09 02:09:09 America/Los_Angeles",
        "transaction_id" : "490000461194237",
        "is_trial_period" : "false",
        "original_transaction_id" : "490000461194237",
        "purchase_date" : "2025-09-09 09:09:09 Etc/GMT",
        "product_id" : "com.ydgn.dokacamera.lifetime",
        "in_app_ownership_type" : "PURCHASED",
        "original_purchase_date_pst" : "2025-09-09 02:09:08 America/Los_Angeles",
        "web_order_line_item_id" : "490002349352247",
        "original_purchase_date_ms" : "1757408948000",
        "expires_date_ms" : "4092628149000",
        "purchase_date_pst" : "2025-09-09 02:09:09 America/Los_Angeles",
        "original_purchase_date" : "2025-09-09 09:09:08 Etc/GMT"
      }
    ],
    "pending_renewal_info" : [
      {
        "product_id" : "com.ydgn.dokacamera.lifetime",
        "original_transaction_id" : "490000461194237",
        "auto_renew_product_id" : "com.ydgn.dokacamera.lifetime",
        "auto_renew_status" : "1"
      }
    ]
  };
}


$done({ body: JSON.stringify(ddm) });