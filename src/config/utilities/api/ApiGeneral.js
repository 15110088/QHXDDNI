
import axios from 'axios';

const key = "U29OaGFhamxrdW9pbjEyODVzZGZqazlMb25nVGhhbmg=" // in base64 format
const iv = "SVZzZGZzZGZnZGY0ODdMVA=="   // in base 64 format
const keysize128 = "128" 
const keysize256 = "256"

 const HUYEN=[
    {
        "maKvhc": "731",
        "ten": "TP.Biên Hòa",
        "maKvhcCha": "75",
        "ID": 0
      },
    {
      "maKvhc": "732",
      "ten": "TP.Long Khánh",
      "maKvhcCha": "75",
      "ID": 0
    },
    {
      "maKvhc": "734",
      "ten": "huyện Tân Phú",
      "maKvhcCha": "75",
      "ID": 0
    },
    {
        "maKvhc": "735",
        "ten": "huyện Vĩnh Cửu",
        "maKvhcCha": "75",
        "ID": 0
      },
    {
      "maKvhc": "736",
      "ten": "huyện Định Quán",
      "maKvhcCha": "75",
      "ID": 0
    },
    {
        "maKvhc": "737",
        "ten": "huyện Trảng Bom",
        "maKvhcCha": "75",
        "ID": 0
      },
    {
      "maKvhc": "738",
      "ten": "huyện Thống Nhất",
      "maKvhcCha": "75",
      "ID": 0
    },
    {
        "maKvhc": "739",
        "ten": "huyện Cẩm Mỹ",
        "maKvhcCha": "75",
        "ID": 0
      },
    {
      "maKvhc": "740",
      "ten": "huyện Long Thành",
      "maKvhcCha": "75",
      "ID": 0
    },
   
    
 
    {
      "maKvhc": "741",
      "ten": "huyện Xuân Lộc",
      "maKvhcCha": "75",
      "ID": 0
    },
    {
      "maKvhc": "742",
      "ten": "huyện Nhơn Trạch",
      "maKvhcCha": "75",
      "ID": 0
    }
    
  ]

 export const XA=[
  {
    "maKvhc": "25996",
    "ten": "phường Tân Phong",
    "maKvhcCha": "731",
    "ID": 28,
    "Lat":10.97623677,
    "Long":106.82750928
  },
  {
    "maKvhc": "26730",
    "ten": "TP Biên Hoà",
    "maKvhcCha": "731",
    "ID": 31,
    "Lat":10.97623677,
    "Long":106.82750928
  },
  {
    "maKvhc": "26002",
    "ten": "phường Hố Nai",
    "maKvhcCha": "731",
    "ID": 1,
    "Lat":10.97453031,
    "Long":106.87999665
  },
  {
    "maKvhc": "26011",
    "ten": "phường Bửu Long",
    "maKvhcCha": "731",
    "ID": 5,
    "Lat":10.96078468,
    "Long":106.79720763
  },
  {
    "maKvhc": "26017",
    "ten": "phường Tam Hiệp",
    "maKvhcCha": "731",
    "ID": 6,
    "Lat":10.94865569,
    "Long":106.85719077
  },
  {
    "maKvhc": "26026",
    "ten": "phường Tân Mai",
    "maKvhcCha": "731",
    "ID": 9,
    "Lat":10.95517611,
    "Long":106.84965453
  },
  {
    "maKvhc": "26032",
    "ten": "phường Trung Dũng",
    "maKvhcCha": "731",
    "ID": 11,
    "Lat":10.95447633,
    "Long":106.82316378
  },
  {
    "maKvhc": "26038",
    "ten": "phường Hòa Bình",
    "maKvhcCha": "731",
    "ID": 13,
    "Lat":10.94853159,
    "Long":106.81035240
  },
  {
    "maKvhc": "26047",
    "ten": "phường Bình Đa",
    "maKvhcCha": "731",
    "ID": 16,
    "Lat":10.93650127,
    "Long":106.86226122
  },
  {
    "maKvhc": "26053",
    "ten": "phường Bửu Hòa",
    "maKvhcCha": "731",
    "ID": 18,
    "Lat":10.92708446,
    "Long":106.81577748
  },
  {
    "maKvhc": "26059",
    "ten": "phường Tân Vạn",
    "maKvhcCha": "731",
    "ID": 20,
    "Lat":10.91132573,
    "Long":106.82650588
  },
  {
    "maKvhc": "26068",
    "ten": "phường Hóa An",
    "maKvhcCha": "731",
    "ID": 23,
    "Lat":10.93602656,
    "Long":106.79928332
  },
  {
    "maKvhc": "26371",
    "ten": "phường An Hoà",
    "maKvhcCha": "731",
    "ID": 24,
    "Lat":10.88529891,
    "Long":106.87478136
  },
  {
    "maKvhc": "26380",
    "ten": "xã Long Hưng",
    "maKvhcCha": "731",
    "ID": 27,
    "Lat":10.85723465,
    "Long":106.86260364
  },
  {
    "maKvhc": "26374",
    "ten": "phường Tam Phước",
    "maKvhcCha": "731",
    "ID": 25,
    "Lat":10.86141492,
    "Long":106.92935011


  },
  {
    "maKvhc": "26377",
    "ten": "phường Phước Tân",
    "maKvhcCha": "731",
    "ID": 26,
    "Lat":10.89460122,
    "Long":106.922180531
  },
  // {
  //   "maKvhc": "25993",
  //   "ten": "phường Trảng Dài",
  //   "maKvhcCha": "731",
  //   "ID": 0,
  //   "Lat":10.98909072,
  //   "Long":106.86809982
  // },
  {
    "maKvhc": "25999",
    "ten": "phường Tân Biên",
    "maKvhcCha": "731",
    "ID": 3,
    "Lat":10.97370334,
    "Long":106.89460695
  },
  {
    "maKvhc": "26005",
    "ten": "phường Tân Hòa",
    "maKvhcCha": "731",
    "ID": 4,
    "Lat":10.97341400,
    "Long":106.90870913
  },
  {
    "maKvhc": "26008",
    "ten": "phường Tân Hiệp",
    "maKvhcCha": "731",
    "ID": 2,
    "Lat":10.96174270,
    "Long":106.86681453
  },
  {
    "maKvhc": "26014",
    "ten": "phường Tân Tiến",
    "maKvhcCha": "731",
    "ID": 29,
    "Lat":10.96177800,
    "Long":106.84364578
  },
  {
    "maKvhc": "26020",
    "ten": "phường Long Bình",
    "maKvhcCha": "731",
    "ID": 7,
    "Lat":10.93598167,
    "Long":106.90337644
  },
  {
    "maKvhc": "26023",
    "ten": "phường Quang Vinh",
    "maKvhcCha": "731",
    "ID": 8,
    "Lat":10.95520962,
    "Long":106.81336738
  },
  {
    "maKvhc": "26029",
    "ten": "phường Thống Nhất",
    "maKvhcCha": "731",
    "ID": 10,
    "Lat":10.94922091,
    "Long":106.83462493
  },
  {
    "maKvhc": "26035",
    "ten": "phường Tam Hòa",
    "maKvhcCha": "731",
    "ID": 12,
    "Lat":10.94801285,
    "Long":106.86588395
  },
  {
    "maKvhc": "26041",
    "ten": "phường Quyết Thắng",
    "maKvhcCha": "731",
    "ID": 14,
    "Lat":10.94317178,
    "Long":106.82270141
  },
  {
    "maKvhc": "26044",
    "ten": "phường Thanh Bình",
    "maKvhcCha": "731",
    "ID": 15,
    "Lat":10.94667411,
    "Long":106.81677317
  },
  {
    "maKvhc": "26050",
    "ten": "phường An Bình",
    "maKvhcCha": "731",
    "ID": 17,
    "Lat":10.92122166,
    "Long":106.86021667
  },
  {
    "maKvhc": "26056",
    "ten": "phường Long Bình Tân",
    "maKvhcCha": "731",
    "ID": 19,
    "Lat":10.90142031,
    "Long":106.86396072
  },
  {
    "maKvhc": "26062",
    "ten": "phường Tân Hạnh",
    "maKvhcCha": "731",
    "ID": 21,
    "Lat":10.95128214,
    "Long":106.77812587
  },
  {
    "maKvhc": "26065",
    "ten": "phường Hiệp Hòa",
    "maKvhcCha": "731",
    "ID": 22,
    "Long":106.83820536,
    "Lat":10.93157935
  },
  {
    "maKvhc": "26098",
    "ten": "phường Bảo Vinh",
    "maKvhcCha": "732",
    "ID": 9,
    "Long":107.262417836,
    "Lat":10.95027389

  },
  {
    "maKvhc": "26107",
    "ten": "xã Bàu Trâm",
    "maKvhcCha": "732",
    "ID": 12,
    "Long":107.28346831,
    "Lat":10.92315048
  },
  {
    "maKvhc": "26074",
    "ten": "phường Xuân Thanh",
    "maKvhcCha": "732",
    "ID": 1,
    "Long":107.25602387,
    "Lat":10.93518179
  },
  {
    "maKvhc": "26083",
    "ten": "phường Xuân Hoà",
    "maKvhcCha": "732",
    "ID": 4,
    "Long":107.24847018,
    "Lat":10.92076703
  },
  {
    "maKvhc": "26089",
    "ten": "xã Bình Lộc",
    "maKvhcCha": "732",
    "ID": 6,
    "Long":107.23847834,
    "Lat":10.99321309
  },
  {
    "maKvhc": "26095",
    "ten": "phường Suối Tre",
    "maKvhcCha": "732",
    "ID": 8,
    "Long":107.20805670,
    "Lat":10.95192237
  },
  {
    "maKvhc": "26101",
    "ten": "phường Xuân Lập",
    "maKvhcCha": "732",
    "ID": 10,
    "Long":107.17748429,
    "Lat":10.91023068
  },
  {
    "maKvhc": "26104",
    "ten": "phường Bàu Sen",
    "maKvhcCha": "732",
    "ID": 11,
    "Long":107.20933532,
    "Lat":10.91851349
  },
  {
    "maKvhc": "26110",
    "ten": "phường Xuân Tân",
    "maKvhcCha": "732",
    "ID": 13,
    "Long":107.23024419,
    "Lat":10.90073332
  },
  {
    "maKvhc": "26113",
    "ten": "xã Hàng Gòn",
    "maKvhcCha": "732",
    "ID": 14,
    "Long":107.21347603,
    "Lat":10.87189620
  },
  {
    "maKvhc": "26071",
    "ten": "phường Xuân Trung",
    "maKvhcCha": "732",
    "ID": 0,
    "Long":107.24470738,
    "Lat":10.93825225
  },
  {
    "maKvhc": "26077",
    "ten": "phường Xuân Bình",
    "maKvhcCha": "732",
    "ID": 2,
    "Long":107.23903475,
    "Lat":10.93054218
  },
  {
    "maKvhc": "26080",
    "ten": "phường Xuân An",
    "maKvhcCha": "732",
    "ID": 3,
    "Long":107.25089742,
    "Lat":10.92868934
  },
  {
    "maKvhc": "26086",
    "ten": "phường Phú Bình",
    "maKvhcCha": "732",
    "ID": 5,
    "Long":107.23645269,
    "Lat":10.91382474
  },
  {
    "maKvhc": "26092",
    "ten": "xã Bảo Quang",
    "maKvhcCha": "732",
    "ID": 7,
    "Long":107.28494385,
    "Lat":10.97639737
  },
  {
    "maKvhc": "26116",
    "ten": "thị trấn Tân Phú",
    "maKvhcCha": "734",
    "ID": 0,
    "Long":107.42779115,
    "Lat":11.27027179
  },
  {
    "maKvhc": "26122",
    "ten": "xã Nam Cát Tiên",
    "maKvhcCha": "734",
    "ID": 2,
    "Long":107.44953572,
    "Lat":11.41223662
  },
  {
    "maKvhc": "26131",
    "ten": "xã Tà Lài",
    "maKvhcCha": "734",
    "ID": 5,
    "Long":107.36625954,
    "Lat":11.36509564
  },
  {
    "maKvhc": "26137",
    "ten": "xã Phú Sơn",
    "maKvhcCha": "734",
    "ID": 7,
    "Long":107.52481696,
    "Lat":11.33966208
  },
  {
    "maKvhc": "26149",
    "ten": "xã Phú Xuân",
    "maKvhcCha": "734",
    "ID": 11,
    "Long":107.45135048,
    "Lat":11.30574376
  },
  {
    "maKvhc": "26152",
    "ten": "xã Phú Lộc",
    "maKvhcCha": "734",
    "ID": 12,
    "Long":107.40916628,
    "Lat":11.29708624
  },
  {
    "maKvhc": "26155",
    "ten": "xã Phú Lâm",
    "maKvhcCha": "734",
    "ID": 13,
    "Long":107.49302970,
    "Lat":11.27469268
  },
  {
    "maKvhc": "26158",
    "ten": "xã Phú Bình",
    "maKvhcCha": "734",
    "ID": 14,
    "Long":107.50806050,
    "Lat":11.26848380
  },
  {
    "maKvhc": "26161",
    "ten": "xã Phú Thanh",
    "maKvhcCha": "734",
    "ID": 15,
    "Long":107.47320983,
    "Lat":11.24600608
  },
  {
    "maKvhc": "26164",
    "ten": "xã Trà Cổ",
    "maKvhcCha": "734",
    "ID": 17,
    "Long":107.43732971,
    "Lat":11.24642763
  },
  {
    "maKvhc": "26167",
    "ten": "xã Phú Điền",
    "maKvhcCha": "734",
    "ID": 16,
    "Long":107.45452986,
    "Lat":11.20195272
  },
  {
    "maKvhc": "26119",
    "ten": "xã Đắc Lua",
    "maKvhcCha": "734",
    "ID": 1,
    "Long":107.32022804,
    "Lat":11.46363907
  },
  {
    "maKvhc": "26125",
    "ten": "xã Phú An",
    "maKvhcCha": "734",
    "ID": 3,
    "Long":107.47685771,
    "Lat":11.37008735
  },
  {
    "maKvhc": "26128",
    "ten": "xã Núi Tượng",
    "maKvhcCha": "734",
    "ID": 4,
    "Long":107.42072822,
    "Lat":11.37607969
  },
  {
    "maKvhc": "26134",
    "ten": "xã Phú Lập",
    "maKvhcCha": "734",
    "ID": 6,
    "Long":107.39825857,
    "Lat":11.36486896
  },
  {
    "maKvhc": "26140",
    "ten": "xã Phú Thịnh",
    "maKvhcCha": "734",
    "ID": 8,
    "Long":107.38809907,
    "Lat":11.32683383
  },
  {
    "maKvhc": "26143",
    "ten": "xã Thanh Sơn",
    "maKvhcCha": "734",
    "ID": 9,
    "Long":107.47729871,
    "Lat":11.31857690
  },
  {
    "maKvhc": "26146",
    "ten": "xã Phú Trung",
    "maKvhcCha": "734",
    "ID": 10,
    "Long":107.50150812,
    "Lat":11.31865406
  },
  {
    "maKvhc": "26170",
    "ten": "thị trấn Vĩnh An",
    "maKvhcCha": "735",
    "ID": 0,
    "Long":107.02926213,
    "Lat":11.08086993
  },
  {
    "maKvhc": "26179",
    "ten": "xã Tân An",
    "maKvhcCha": "735",
    "ID": 3,
    "Long":106.95302323,
    "Lat":11.03351992
  },
  {
    "maKvhc": "26185",
    "ten": "xã Bình Lợi",
    "maKvhcCha": "735",
    "ID": 5,
    "Long":106.81979653,
    "Lat":11.04106417
  },
  {
    "maKvhc": "26194",
    "ten": "xã Tân Bình",
    "maKvhcCha": "735",
    "ID": 8,
    "Long":106.80301844,
    "Lat":11.00502917
  },
  {
    "maKvhc": "26200",
    "ten": "xã Mã Đà",
    "maKvhcCha": "735",
    "ID": 10,
    "Long":107.07895910,
    "Lat":11.23444550
  },
  {
    "maKvhc": "26173",
    "ten": "xã Phú Lý",
    "maKvhcCha": "735",
    "ID": 1,
    "Long":107.14563988,
    "Lat":11.40408571
  },
  {
    "maKvhc": "26176",
    "ten": "xã Trị An",
    "maKvhcCha": "735",
    "ID": 2,
    "Long":106.97172343,
    "Lat":11.08434767
  },
  {
    "maKvhc": "26182",
    "ten": "xã Vĩnh Tân",
    "maKvhcCha": "735",
    "ID": 4,
    "Long":107.01030263,
    "Lat":11.03825139
  },
  {
    "maKvhc": "26188",
    "ten": "xã Thạnh Phú",
    "maKvhcCha": "735",
    "ID": 6,
    "Long":106.83624179,
    "Lat":11.01378545
  },
  {
    "maKvhc": "26191",
    "ten": "xã Thiện Tân",
    "maKvhcCha": "735",
    "ID": 7,
    "Long":106.89223442,
    "Lat":11.01153942
  },
  {
    "maKvhc": "26197",
    "ten": "xã Bình Hòa",
    "maKvhcCha": "735",
    "ID": 9,
    "Long":106.79258374,
    "Lat":10.99044240
  },
  {
    "maKvhc": "26203",
    "ten": "xã Hiếu Liêm",
    "maKvhcCha": "735",
    "ID": 11,
    "Long":106.97626262,
    "Lat":11.21547990
  },
  {
    "maKvhc": "26209",
    "ten": "xã Thanh Sơn",
    "maKvhcCha": "736",
    "ID": 1,
    "Long":107.25631368,
    "Lat":11.29767006
  },
  {
    "maKvhc": "26215",
    "ten": "xã Phú Vinh",
    "maKvhcCha": "736",
    "ID": 3,
    "Long":107.34631606,
    "Lat":11.23865675
  },
  {
    "maKvhc": "26221",
    "ten": "xã Phú Hòa",
    "maKvhcCha": "736",
    "ID": 5,
    "Long":107.41610950,
    "Lat":11.20456487
  },
  {
    "maKvhc": "26230",
    "ten": "xã Gia Canh",
    "maKvhcCha": "736",
    "ID": 8,
    "Long":107.39060541,
    "Lat":11.12177482
  },
  {
    "maKvhc": "26239",
    "ten": "xã Túc Trưng",
    "maKvhcCha": "736",
    "ID": 11,
    "Long":107.22504339,
    "Lat":11.07769908
  },
  {
    "maKvhc": "26245",
    "ten": "xã Suối Nho",
    "maKvhcCha": "736",
    "ID": 13,
    "Long":107.27582438,
    "Lat":11.05995336
  },
  {
    "maKvhc": "26206",
    "ten": "thị trấn Định Quán",
    "maKvhcCha": "736",
    "ID": 0,
    "Long":107.34625113,
    "Lat":11.19512397
  },
  {
    "maKvhc": "26212",
    "ten": "xã Phú Tân",
    "maKvhcCha": "736",
    "ID": 2,
    "Long":107.36588062,
    "Lat":11.27090208
  },
  {
    "maKvhc": "26218",
    "ten": "xã Phú Lợi",
    "maKvhcCha": "736",
    "ID": 4,
    "Long":107.39326583,
    "Lat":11.21526724
  },
  {
    "maKvhc": "26224",
    "ten": "xã Ngọc Định",
    "maKvhcCha": "736",
    "ID": 6,
    "Long":107.30710732,
    "Lat":11.20588754
  },
  {
    "maKvhc": "26227",
    "ten": "xã La Ngà",
    "maKvhcCha": "736",
    "ID": 7,
    "Long":107.21199786,
    "Lat":11.17021870
  },
  {
    "maKvhc": "26233",
    "ten": "xã Phú Ngọc",
    "maKvhcCha": "736",
    "ID": 9,
    "Long":107.30448450,
    "Lat":11.13474948
  },
  {
    "maKvhc": "26236",
    "ten": "xã Phú Cường",
    "maKvhcCha": "736",
    "ID": 10,
    "Long":107.14982250,
    "Lat":11.12696683
  },
  {
    "maKvhc": "26242",
    "ten": "xã Phú Túc",
    "maKvhcCha": "736",
    "ID": 12,
    "Long":107.22289338,
    "Lat":11.11685844
  },
  {
    "maKvhc": "26251",
    "ten": "xã Thanh Bình",
    "maKvhcCha": "737",
    "ID": 1,
    "Long":107.08660001,
    "Lat":11.07066673
  },
  {
    "maKvhc": "26260",
    "ten": "xã Sông Thao",
    "maKvhcCha": "737",
    "ID": 4,
    "Long":107.08316270,
    "Lat":10.98561480
  },
  {
    "maKvhc": "26269",
    "ten": "xã Bắc Sơn",
    "maKvhcCha": "737",
    "ID": 7,
    "Long":106.96417323,
    "Lat":10.97341902
  },
  {
    "maKvhc": "26275",
    "ten": "xã Tây Hoà",
    "maKvhcCha": "737",
    "ID": 9,
    "Long":107.05069892,
    "Lat":10.95140307
  },
  {
    "maKvhc": "26284",
    "ten": "xã Đồi 61",
    "maKvhcCha": "737",
    "ID": 12,
    "Long":107.02290665,
    "Lat":10.91835277
  },
  {
    "maKvhc": "26290",
    "ten": "xã Quảng Tiến",
    "maKvhcCha": "737",
    "ID": 14,
    "Long":106.99385847,
    "Lat":10.93692249
  },
  {
    "maKvhc": "26296",
    "ten": "xã An Viễn",
    "maKvhcCha": "737",
    "ID": 16,
    "Long":107.00650532,
    "Lat":10.88064324
  },
  {
    "maKvhc": "26248",
    "ten": "thị trấn Trảng Bom",
    "maKvhcCha": "737",
    "ID": 0,
    "Long":106.99992964,
    "Lat":10.95850184
  },
  {
    "maKvhc": "26254",
    "ten": "xã Cây Gáo",
    "maKvhcCha": "737",
    "ID": 2,
    "Long":107.05953907,
    "Lat":11.03614396
  },
  {
    "maKvhc": "26257",
    "ten": "xã Bàu Hàm",
    "maKvhcCha": "737",
    "ID": 3,
    "Long":107.10353672,
    "Lat":11.00190300
  },
  {
    "maKvhc": "26263",
    "ten": "xã Sông Trầu",
    "maKvhcCha": "737",
    "ID": 5,
    "Long":107.02959853,
    "Lat":10.99327937
  },
  {
    "maKvhc": "26266",
    "ten": "xã Đông Hoà",
    "maKvhcCha": "737",
    "ID": 6,
    "Long":107.06793790,
    "Lat":10.90694524
  },
  {
    "maKvhc": "26272",
    "ten": "xã Hố Nai 3",
    "maKvhcCha": "737",
    "ID": 8,
    "Long":106.93120344,
    "Lat":10.97593527
  },
  {
    "maKvhc": "26278",
    "ten": "xã Bình Minh",
    "maKvhcCha": "737",
    "ID": 10,
    "Long":106.97976934,
    "Lat":10.96160148
  },
  {
    "maKvhc": "26281",
    "ten": "xã Trung Hoà",
    "maKvhcCha": "737",
    "ID": 11,
    "Long":107.054364744,
    "Lat":10.91808436
  },
  {
    "maKvhc": "26287",
    "ten": "xã Hưng Thịnh",
    "maKvhcCha": "737",
    "ID": 13,
    "Long":107.08487162,
    "Lat":10.91921834
  },
  {
    "maKvhc": "26293",
    "ten": "xã Giang Điền",
    "maKvhcCha": "737",
    "ID": 15,
    "Long":106.98302605,
    "Lat":10.91356906
  },
  {
    "maKvhc": "26305",
    "ten": "xã Gia Tân 3",
    "maKvhcCha": "738",
    "ID": 2,
    "Long":107.15958562,
    "Lat":11.04708858
  },
  {
    "maKvhc": "26314",
    "ten": "xã Bàu Hàm 2",
    "maKvhcCha": "738",
    "ID": 5,
    "Long":107.12993167,
    "Lat":10.93809125
  },
  {
    "maKvhc": "26320",
    "ten": "xã Lộ 25",
    "maKvhcCha": "738",
    "ID": 7,
    "Long":107.09156900,
    "Lat":10.86932550
  },
  {
    "maKvhc": "26326",
    "ten": "thị trấn Dầu Giây",
    "maKvhcCha": "738",
    "ID": 9,
    "Long":107.09156900,
    "Lat":10.86932550
  },
  {
    "maKvhc": "26299",
    "ten": "xã Gia Tân 1",
    "maKvhcCha": "738",
    "ID": 0,
    "Long":107.09156900,
    "Lat":10.86932550
  },
  {
    "maKvhc": "26302",
    "ten": "xã Gia Tân 2",
    "maKvhcCha": "738",
    "ID": 1,
    "Long":107.15769246,
    "Lat":11.06358864
  },
  {
    "maKvhc": "26308",
    "ten": "xã Gia Kiệm",
    "maKvhcCha": "738",
    "ID": 3,
    "Long":107.15696147,
    "Lat":11.02924479
  },
  {
    "maKvhc": "26311",
    "ten": "xã Quang Trung",
    "maKvhcCha": "738",
    "ID": 4,
    "Long":107.16158980,
    "Lat":10.99586113
  },
  {
    "maKvhc": "26317",
    "ten": "xã Hưng Lộc",
    "maKvhcCha": "738",
    "ID": 6,
    "Long":107.10991750,
    "Lat":10.92308500
  },
  {
    "maKvhc": "26323",
    "ten": "xã Xuân Thiện",
    "maKvhcCha": "738",
    "ID": 8,
    "Long":107.22328649,
    "Lat":11.01763558
  },
  {
    "maKvhc": "26335",
    "ten": "xã Nhân Nghĩa",
    "maKvhcCha": "739",
    "ID": 2,
    "Long":107.23897155,
    "Lat":10.84332574
  },
  {
    "maKvhc": "26341",
    "ten": "xã Long Giao",
    "maKvhcCha": "739",
    "ID": 4,
    "Long":107.23018923,
    "Lat":10.80466592
  },
  {
    "maKvhc": "26350",
    "ten": "xã Bảo Bình",
    "maKvhcCha": "739",
    "ID": 7,
    "Long":107.294005,
    "Lat":10.832122
  },
  {
    "maKvhc": "26356",
    "ten": "xã Xuân Tây",
    "maKvhcCha": "739",
    "ID": 9,
    "Long":107.33355842,
    "Lat":10.80491201
  },
  {
    "maKvhc": "26365",
    "ten": "xã Lâm San",
    "maKvhcCha": "739",
    "ID": 12,
    "Long":107.32626136,
    "Lat":10.70273602
  },
  {
    "maKvhc": "26329",
    "ten": "xã Sông Nhạn",
    "maKvhcCha": "739",
    "ID": 0,
    "Long":107.11504411,
    "Lat":10.83532633
  },
  {
    "maKvhc": "26332",
    "ten": "xã Xuân Quế",
    "maKvhcCha": "739",
    "ID": 1,
    "Long":107.16366343,
    "Lat":10.85180291
  },
  {
    "maKvhc": "26338",
    "ten": "xã Xuân Đường",
    "maKvhcCha": "739",
    "ID": 3,
    "Long":107.18006334,
    "Lat":10.79185993
  },
  {
    "maKvhc": "26344",
    "ten": "xã Xuân Mỹ",
    "maKvhcCha": "739",
    "ID": 5,
    "Long":107.25944545,
    "Lat":10.77296902
  },
  {
    "maKvhc": "26347",
    "ten": "xã Thừa Đức",
    "maKvhcCha": "739",
    "ID": 6,
    "Long":107.13082592,
    "Lat":10.77010977
  },
  {
    "maKvhc": "26353",
    "ten": "xã Xuân Bảo",
    "maKvhcCha": "739",
    "ID": 8,
    "Long":107.29597240,
    "Lat":10.85832878
  },
  {
    "maKvhc": "26359",
    "ten": "xã Xuân Đông",
    "maKvhcCha": "739",
    "ID": 10,
    "Long":107.38366885,
    "Lat":10.80589754
  },
  {
    "maKvhc": "26362",
    "ten": "xã Sông Ray",
    "maKvhcCha": "739",
    "ID": 11,
    "Long":107.34321628,
    "Lat":10.74639831
  },
  {
    "maKvhc": "26368",
    "ten": "thị trấn Long Thành",
    "maKvhcCha": "740",
    "ID": 0,
    "Long":106.94537239,
    "Lat":10.77770623
  },
  {
    "maKvhc": "26383",
    "ten": "xã An Phước",
    "maKvhcCha": "740",
    "ID": 1,
    "Long":106.94649955,
    "Lat":10.82786400
  },
  {
    "maKvhc": "26386",
    "ten": "xã Bình An",
    "maKvhcCha": "740",
    "ID": 2,
    "Long":106.94537239,
    "Lat":10.77770623
  },

  {
    "maKvhc": "26389",
    "ten": "xã Long Đức",
    "maKvhcCha": "740",
    "ID": 3,
    "Long":106.98624276,
    "Lat":10.83450608
  },
  {
    "maKvhc": "26392",
    "ten": "xã Lộc An",
    "maKvhcCha": "740",
    "ID": 4,
    "Long":106.98798326,
    "Lat":10.80642726
  },
  {
    "maKvhc": "26395",
    "ten": "xã Bình Sơn",
    "maKvhcCha": "740",
    "ID": 5,
    "Long":107.04054735,
    "Lat":10.79698710
  },
  {
    "maKvhc": "26398",
    "ten": "xã Tam An",
    "maKvhcCha": "740",
    "ID": 6,
    "Long":106.90017555,
    "Lat":10.80548091
  },

  {
    "maKvhc": "26401",
    "ten": "xã Cẩm Đường",
    "maKvhcCha": "740",
    "ID": 7,
    "Long":107.10450368,
    "Lat":10.78534448
  },
  {
    "maKvhc": "26404",
    "ten": "xã Long An",
    "maKvhcCha": "740",
    "ID": 8,
    "Long":106.99032329,
    "Lat":10.76165171
  },
  {
    "maKvhc": "26410",
    "ten": "xã Bàu Cạn",
    "maKvhcCha": "740",
    "ID": 9,
    "Long":107.08646525,
    "Lat":10.73433368
  },
  {
    "maKvhc": "26413",
    "ten": "xã Long Phước",
    "maKvhcCha": "740",
    "ID": 10,
    "Long":107.00098805,
    "Lat":10.71580205
  },
  {
    "maKvhc": "26416",
    "ten": "xã Phước Bình",
    "maKvhcCha": "740",
    "ID": 11,
    "Long":107.09441678,
    "Lat":10.68025229
  },

  {
    "maKvhc": "26419",
    "ten": "xã Tân Hiệp",
    "maKvhcCha": "740",
    "ID": 12,
    "Long":107.06305457,
    "Lat":10.69848438
  },
  {
    "maKvhc": "26422",
    "ten": "xã Phước Thái",
    "maKvhcCha": "740",
    "ID": 13,
    "Long":107.02103603,
    "Lat":10.67672329
  },
  {
    "maKvhc": "26425",
    "ten": "thị trấn Gia Ray",
    "maKvhcCha": "741",
    "ID": 0,
    "Long":107.41004561,
    "Lat":10.92707227
  },
  {
    "maKvhc": "26431",
    "ten": "xã Suối Cao",
    "maKvhcCha": "741",
    "ID": 2,
    "Long":107.37787276,
    "Lat":11.01010258
  },
  {
    "maKvhc": "26440",
    "ten": "xã Xuân Trường",
    "maKvhcCha": "741",
    "ID": 5,
    "Long":107.42732442,
    "Lat":10.95557560
  },
  {
    "maKvhc": "26449",
    "ten": "xã Xuân Tâm",
    "maKvhcCha": "741",
    "ID": 8,
    "Long":107.45005734,
    "Lat":10.87527745
  },
  {
    "maKvhc": "26455",
    "ten": "xã Xuân Hiệp",
    "maKvhcCha": "741",
    "ID": 10,
    "Long":107.39162348,
    "Lat":10.89250143
  },
  {
    "maKvhc": "26464",
    "ten": "xã Bảo Hoà",
    "maKvhcCha": "741",
    "ID": 13,
    "Long":107.29289206,
    "Lat":10.88875475
  },
  {
    "maKvhc": "26428",
    "ten": "xã Xuân Bắc",
    "maKvhcCha": "741",
    "ID": 1,
    "Long":107.31397891,
    "Lat":11.03006729
  },
  {
    "maKvhc": "26434",
    "ten": "xã Xuân Thành",
    "maKvhcCha": "741",
    "ID": 3,
    "Long":107.45995002,
    "Lat":10.99867560
  },
  {
    "maKvhc": "26437",
    "ten": "xã Xuân Thọ",
    "maKvhcCha": "741",
    "ID": 4,
    "Long":107.33690566,
    "Lat":10.95937596
  },
  {
    "maKvhc": "26443",
    "ten": "xã Xuân Hòa",
    "maKvhcCha": "741",
    "ID": 6,
    "Long":107.54375508,
    "Lat":10.87542648
  },
  {
    "maKvhc": "26446",
    "ten": "xã Xuân Hưng",
    "maKvhcCha": "741",
    "ID": 7,
    "Long":107.49988642,
    "Lat":10.84771605
  },
  {
    "maKvhc": "26452",
    "ten": "xã Suối Cát",
    "maKvhcCha": "741",
    "ID": 9,
    "Long":107.36243399,
    "Lat":10.91615169
  },
  {
    "maKvhc": "26458",
    "ten": "xã Xuân Phú",
    "maKvhcCha": "741",
    "ID": 11,
    "Long":107.33034904,
    "Lat":10.89790383
  },
  {
    "maKvhc": "26461",
    "ten": "xã Xuân Định",
    "maKvhcCha": "741",
    "ID": 12,
    "Long":107.25913210,
    "Lat":10.88938895
  },
  {
    "maKvhc": "26467",
    "ten": "xã Lang Minh",
    "maKvhcCha": "741",
    "ID": 14,
    "Long":107.37878807,
    "Lat":10.86067435
  },
  {
    "maKvhc": "26470",
    "ten": "xã Phước Thiền",
    "maKvhcCha": "742",
    "ID": 0,
    "Long":106.91907500,
    "Lat":10.76118342
  },
  {
    "maKvhc": "26479",
    "ten": "thị trấn Hiệp Phước",
    "maKvhcCha": "742",
    "ID": 3,
    "Long":106.93729538,
    "Lat":10.72672482
  },
  {
    "maKvhc": "26485",
    "ten": "xã Phú Hội",
    "maKvhcCha": "742",
    "ID": 5,
    "Long":106.90283146,
    "Lat":10.73227906
  },
  {
    "maKvhc": "26494",
    "ten": "xã Long Thọ",
    "maKvhcCha": "742",
    "ID": 8,
    "Long":106.95439450,
    "Lat":10.69671385
  },
  {
    "maKvhc": "26503",
    "ten": "xã Phước An",
    "maKvhcCha": "742",
    "ID": 11,
    "Long":106.94809819,
    "Lat":10.64191624
  },
  {
    "maKvhc": "26473",
    "ten": "xã Long Tân",
    "maKvhcCha": "742",
    "ID": 1,
    "Long":106.87162166,
    "Lat":10.74406697
  },
  {
    "maKvhc": "26476",
    "ten": "xã Đại Phước",
    "maKvhcCha": "742",
    "ID": 2,
    "Long":106.82104163,
    "Lat":10.74961657
  },
  {
    "maKvhc": "26482",
    "ten": "xã Phú Hữu",
    "maKvhcCha": "742",
    "ID": 4,
    "Long":106.77793220,
    "Lat":10.72886606
  },
  {
    "maKvhc": "26488",
    "ten": "xã Phú Thạnh",
    "maKvhcCha": "742",
    "ID": 6,
    "Long":106.85075348,
    "Lat":10.71543644
  },
  {
    "maKvhc": "26491",
    "ten": "xã Phú Đông",
    "maKvhcCha": "742",
    "ID": 7,
    "Long":106.79603465,
    "Lat":10.70864470
  },
  {
    "maKvhc": "26497",
    "ten": "xã Vĩnh Thanh",
    "maKvhcCha": "742",
    "ID": 9,
    "Long":106.86109647,
    "Lat":10.68139316
  },
  {
    "maKvhc": "26500",
    "ten": "xã Phước Khánh",
    "maKvhcCha": "742",
    "ID": 10,
    "Long":106.82033913,
    "Lat":10.66416976
  }
      


]


//var Host="https://ungdung.stnmt.dongnai.gov.vn"

//var Host="192.169.3.197"
const GetKVHC_Con=(ID)=>{
 

return XA.filter(n=>n.maKvhcCha==ID).sort(n=>n.maKvhc) 
   
}

const GetKVHC=()=>{
    //   var URL =Host+"/quanlydatwebservice/QuanLyDatWebService.svc/LayDonViHanhChinhCon?maKvhc=731"
    //    var URL="http://datdai.stnmt.dongnai.gov.vn:8080/QuanLyDatServiceNew/QuanLyDatWebService.svc/LayDonViHanhChinhCon?maKVHC=75"
    // console.log(URL)
    //    return axios.get(URL)
    //    .then(res => {
    //           //console.log(res)
    //            return res.data
    //        })
    return HUYEN
   
   }



export default {
    GetKVHC,
    GetKVHC_Con
}


