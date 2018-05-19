function GetRequest() {
    var url = decodeURI(location.search);
    // var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);//字符串分割，存入对象
        }
    }
    return theRequest;
}
var param = GetRequest();
var schoolName = param.schoolName;
var appName = param.appName;
var type = param.type;

if(type == 1){
    const str = [
        "我在" + appName + "发布了一条神秘了一条的动态,快来看看吧~",
        "Ta在" + appName + "分享了一条让人忍不住双击666的动态,速度点击。",
        "这个大学生拥有令人惊叹的才华,快看Ta在干什么?",
        "天啦噜,我和我的小伙伴都惊呆了," + appName + "上竟然出现了不可描述的东西。",
        "快看Ta在" + appName + "上令人窒息的骚操作,引来上万人围观!",
        "实力围观戏精们的评论,笑出猪叫。",

    ];
    const num =  Math.ceil(Math.random()*6)
    $('.p').text(str[num - 1])
} else if(type == 4) {
    const str1 = [
        "特别的服务给特别的你！",
        appName + "各类校园服务，各种便利超乎你的想象！",
        schoolName + "的你，还没有使用自己的校园APP吗?",
    ];
    const num1 =  Math.ceil(Math.random()*3)
    $('.p').text(str1[num1 - 1])
} else if(type == 5) {
    const str2 = [
        "这里是"+ schoolName +"自己的校园APP，为你带来最新的\"图书馆/成绩/浴室\"消息,轻松做学霸,奖学金悄咪咪脱单,点击下载,体验从这一秒开始！",
        "有趣好玩的生活服务,绝对实用的教务查询,现在的你离便利只差一步！",
        "查教室、查课表、查成绩、查排名,听说还能找对象、赚礼品、听八卦,全校卧谈夜聊,芥末刺激！！！"
    ];
    const num2 =  Math.ceil(Math.random()*3)
    $('.p').text(str2[num2 - 1])
}




