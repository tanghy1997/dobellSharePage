var getUrl = function () {
    var url = window.location.toString();
    var type = url.match(/type=\d+/g);
    type = type.toString().match(/\d+/g).toString();
    // var id = url.match(/id=\d+/g);
    // Id = url.match(/\d+/g).toString();
    // console.log(type);
    // if (type == '1') {
    //     load(Id);
    // }else {
    //     window.location.href = 'http://www.loveahu.com';
    // }
    if(type === '1'){
        url = url.match(/id=\d+/g);
        url = url.toString();

        Id = url.match(/\d+/g).toString();
        getPhoto(Id)
    }else if(type === '4'){
        var id = url.split("id=");
        var id1 = id[1].split("&userId=")
        id1 = id1[0].toString();
        window.location.href = id1;
    }else {
        function GetRequest() {
            var url1 = decodeURI(location.search);
            // var url = location.search;
            var theRequest = new Object();
            if (url1.indexOf("?") != -1) {
                var str = url1.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);//字符串分割，存入对象
                }
            }
            return theRequest;
        }
        var param = GetRequest();
        window.location.href = param.homePageUrl;
    }

}
function getPhoto (Id){
    $.ajax({
        url: 'http://api.dobell.me/dos/ugc/BlogDetailGetFromWeb',
        type: 'post',
        dateType:'text/plain',
        data: {uid:10078,blogId:Id} //这里的uid可以是任何数，但是必须要有
    }).done(function(data){
        data = JSON.parse(data);
        data = data.data;
        var headUrl = data.author.headImage.imageUrl;
        $('.photo').attr('src', headUrl)
    })
}