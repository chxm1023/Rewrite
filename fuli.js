#************************************#
#           福利App解锁合集
#************************************#
# 欲漫涩解锁会员漫画&视频
; 下载地址：https://shrtm.nu/ymse
; hostname = zjgeo.eqobc.com, xnour.xonap.com, opzzy.kefsww.com, tqrbq.mpckv.com
^https?:\/\/.*\.(eqobc|xonap|kefsww|mpckv)\.com\/api\/app\/user\/info$ url script-response-body https://raw.githubusercontent.com/yqc007/QuantumultX/master/PornComicsCrack.js
^https?:\/\/.*\.(eqobc|xonap|kefsww|mpckv)\.com\/api\/app\/media url script-request-header https://raw.githubusercontent.com/yqc007/QuantumultX/master/PornVideosCrack.js

#************************************#
# 涩蕉视频解锁会员
# 下载地址：https://shrtm.nu/sjcm
; hostname = sjapi.juqianpu.com
^https?:\/\/sjapi\.juqianpu\.com\/api\/(video|app\/play_page) url script-request-body https://raw.githubusercontent.com/yqc007/QuantumultX/master/PainedBashoCrack.js
^https?:\/\/sjapi\.juqianpu\.com\/api\/member\/info$ url response-body .+ response-body XUxzDgEDZV15WQ4RL3V6RFYKV1F5UC9GBUx+EnAMMFBccnwNLF9EWFFrMwoBZXkGUEF+CVduNFkrX3oWdAsFT3VxfB0uSEBYaWQNDSpcX0p5e35PV240WStfehZ0NQlCdl9wEy5yQFhTdAkQAVtlWXpRfQp4Qw4FKU9cVHclOwl2THAXKlwCQWkBEg8sX3p5bGBiQmx9J0k+WG4IdSIoCllteA0sW1xCeV07FgBwCVxQcHZIVVQwWStfehh3JQkJdnFaVi5lZgR8cCsMAQRcRXxSWw15bQ4FK2FcEnAPME5ccn8XOwJ1WVVgKFAudUdZUX8NSmxuUVkrXH0MYDUrDHVPdwwtW3lYf3cvDi5MfQV7bG0Je1MjWj1PUFB0CytAdlh/CTpifkJ5XSMOBmAJR2xgekJSC1xJPnMODFsmJFZxX1YQLmJAWFFrLwA5BWZcVgtlUXlTJEMtWFsbYVMkUlxyVVY5Yn4HfWAWDwcEdgBsClxeUn4JRD5mfld0IhVRWwdREgBfZVdUASdWOgRYVlF/WExsaiwGKXZACFpSMFBcfW8eKltYSXxwKxE6blxWbG9MS39TClkpdgMWdCIrS3Fbcwg5AmVBUmQ0DyxcdQJ7bFcKe20GSStxbhJwDyRPYAZvFDlyfgd9cBYPAG5yVmwKDUhUUCwGLV9cVHY1CQ13Zg0TKlhAWFNrIwABYQlFb2BfUXlQLAUrYVxUdjUJTXV2cBcqX1NeamQ3FTsEaklvb2JeVFczRC1fWBl1IihTYm1jFDlyfgd5WSRULWJTAnhsV0F5fSRIKl9uUnc1Jwh1X3wNBWkGCA==

#************************************#
# 香蕉视频解锁无限次数
; 下载地址：https://ee6.tv
; hostname = o0o0plpl11.xinai99.com
^https?:\/\/.+\/(index|ucp\/index|vod\/(show|reqplay\/)|getGlobalData).+ url script-response-body https://raw.githubusercontent.com/yqc007/QuantumultX/master/BananaVideoCrack.js

#************************************#
# 涩涩视频—去除所有广告
; 下载地址：https://48478.xyz
; 网页播放1：https://files.yuchenglw.com
; 网页播放2：https://files.honghufly.com
; hostname = files.*.com
^https:\/\/files\.(yuchenglw|honghufly)\.com url script-response-body https://raw.githubusercontent.com/chxm1023/Rewrite/main/sssp.js






hostname = files.*.com, o0o0plpl11.xinai99.com, sjapi.juqianpu.com, zjgeo.eqobc.com, xnour.xonap.com, opzzy.kefsww.com, tqrbq.mpckv.com
