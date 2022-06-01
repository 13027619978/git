const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var regionList = [
	{
        value: "北京",
        key: "11"
    },
    {
        value: "天津",
        key: "12"
    },
    {
        value: "河北",
        key: "13"
    },
    {
        value: "山西",
        key: "14"
    },
    {
        value: "内蒙古",
        key: "15"
    },
	{
	    value: "辽宁",
	    key: "21"
	},
	{
	    value: "吉林",
	    key: "22"
	},
	{
	    value: "黑龙江",
	    key: "23"
	},
	{
	    value: "上海",
	    key: "31"
	},
	{
	    value: "江苏",
	    key: "32"
	},
	{
	    value: "浙江",
	    key: "33"
	},
	{
	    value: "安徽",
	    key: "34"
	},
	{
	    value: "福建",
	    key: "35"
	},
	{
	    value: "江西",
	    key: "36"
	},
	{
	    value: "山东",
	    key: "37"
	},
	{
	    value: "河南",
	    key: "41"
	},
	{
	    value: "湖北",
	    key: "42"
	},
	{
	    value: "湖南",
	    key: "43"
	},
	{
	    value: "广东",
	    key: "44"
	},
	{
	    value: "广西",
	    key: "45"
	},
	{
	    value: "海南",
	    key: "46"
	},
	{
	    value: "重庆",
	    key: "50"
	},
	{
	    value: "四川",
	    key: "51"
	},
	{
	    value: "贵州",
	    key: "52"
	},
	{
	    value: "云南",
	    key: "53"
	},
	{
	    value: "西藏",
	    key: "54"
	},
	{
	    value: "陕西",
	    key: "61"
	},
	{
	    value: "甘肃",
	    key: "62"
	},
	{
	    value: "青海",
	    key: "63"
	},
	{
	    value: "宁夏",
	    key: "64"
	},
	{
	    value: "新疆",
	    key: "65"
	},
	{
	    value: "台湾",
	    key: "71"
	},
	{
	    value: "香港",
	    key: "81"
	},
	{
	    value: "澳门",
	    key: "82"
	},
	{
	    value: "国外",
	    key: "91"
	}
];

module.exports = {
  formatTime: formatTime,
  regionList: regionList
}
