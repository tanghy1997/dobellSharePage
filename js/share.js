// 有点骚的操作。。。为了避免图片加载获取是缓存问题判断了是否第一次进入页面，存了一个session。。
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
const appUrl = param.appLogoUrl;
const appName = param.appName;
// 用来判断对象是否为空
if(param.type == 1){
    getBlogs();
    $('.appButton').click(function() {
        location.href = param.homePageUrl;
    })
    libsimg = './images/libs/' + Math.ceil(Math.random()*9) + '.jpg';
    $('.topic-img').attr('src',libsimg);
}else {
    window.location.href = param.homePageUrl;
}
function getBlogs() {
    $.ajax({
        url: 'http://api.dobell.me/dos/ugc/BlogDetailGetFromWeb',
        type: 'post',
        dateType:'text/plain',
        data: {uid:10078,blogId:param.id}
    }).done(function(data){
        // 全局正则表达式来去掉一些分享时的表情
        data = JSON.parse(data);
        // console.log(data)
        const nickName = data.data.author.nickName;
        const depName = data.data.author.depName;
        const sex = data.data.author.sex;
        const headImg = data.data.author.headImage.imageUrl;
        const content = JSON.parse(data.data.content).string;
        const viewCount = data.data.browseCount;
        const commentCount = data.data.commentCount;
        const zanCount = data.data.zanCount;
        const time = getLocalTime(data.data.createtime);
        const imgArray = data.data.imageList;


        // 对前端页面进行数据渲染
        $('.title').text(appName);
        $('#appUrl').attr('src',appUrl);
        $('#appName').text(appName);
        $('.person-photo').attr('src',headImg);
        $('.nickname').text(nickName);
        $('.academy').text(depName);
        //replace(/\[e\][0-9]{4}\[\/e\]/g,"")正则去掉表情标签
        $('.share_content').text(content.replace(/\[e\][0-9]{4}\[\/e\]/g,""));
        if(sex === '男'){
            $('.pmale').css('display','inline-block');
            $('.pfemale').css('display','none');
        }else if(sex === '女'){
            $('.pfemale').css('display','inline-block');
            $('.pmale').css('display','none');
        }else {
            $('.pfemale').css('display','none');
            $('.pmale').css('display','none');
        }
        $('.footer-time').text(time);
        $('.blogView').text(viewCount);
        $('.blogComment').text(commentCount);
        $('.blogZan').text(zanCount);
        // 对图片的处理
        // 首先判断图片数是否大于1，大于1的话判断是否是定高还是定宽
        if(imgArray.length === 1) {
            //判断是否首次加载来解决图片缓存问题
            if(!sessionStorage.name){
                var onlyimgUrl = imgArray[0].imageUrl;
                sessionStorage.name = 'share';
                sessionStorage.onlyimgUrl = onlyimgUrl;
            }else{
                console.log('刷新操作')
            }
            $('.fiximg').removeClass('imgbox1');
            //获取屏幕的宽度
            const windowWidth = $(document).width()
            // 图片地址 后面加时间戳是为了避免缓存
            // var onlyimgUrl = imgArray[0].imageUrl;
            // 创建对象
            const img = new Image();
            // 改变图片的src
            img.src == sessionStorage.onlyimgUrl;
            console.log(sessionStorage.onlyimgUrl)
            // console.log(img.width)
            // 开始比较并且定宽定高 图片宽度大于视口宽度定宽100%
            if(img.width < windowWidth) {
                $('.fiximg').append("<img src="+ sessionStorage.onlyimgUrl +" />");
                $('.fiximg').find('img').addClass('img3');
            } else {
                $('.fiximg').append("<img src="+ sessionStorage.onlyimgUrl +" />");
                $('.fiximg').find('img').addClass('img1');
            }
        } else if(imgArray.length === 2) {
            $('.fiximg').removeClass('imgbox');
            $('.fiximg').removeClass('imgbox1');
            for(let i = 0;i<imgArray.length;i++){
                $('.fiximg').append("<img src="+ imgArray[i].imageUrl +" />");
                $('.fiximg').find('img').addClass('img4')
            }
        } else if(imgArray.length === 4) {
            $('.fiximg').removeClass('imgbox');
            $('.fiximg').removeClass('imgbox1');
            for(let i = 0;i<imgArray.length;i++){
                $('.fiximg').append("<img src="+ imgArray[i].imageUrl +" />");
                $('.fiximg').find('img').addClass('img4')
            }
        } else {
            $('.fiximg').removeClass('imgbox');
            $('.fiximg').removeClass('imgbox2');
            for(let i = 0;i<imgArray.length;i++){
                $('.fiximg').append("<img src="+ imgArray[i].imageUrl +" />");
                $('.fiximg').find('img').addClass('img2')
            }
        }
    }).fail(function() {
        console.log("error");
    }).always(function() {
        getComment(param.id);
        getHotBlogs();
    });
    function getComment(id){
        $.ajax({
            url: 'http://api.dobell.me/dos/ugc/BlogCommentListGetFromWeb',
            type: 'post',
            dateType:'text/plain',
            data: {uid:10078,blogId:id,lastId:0,objCount:1}
        }).done(function(data) {
            data = JSON.parse(data);
            if(data.data.length === 0) {
                $('.comment').css({
                    display: 'none'
                });
                $('.noContent').css({
                    display: 'block'
                });
            } else {
                const comment = data.data[0];
                const comUrl = comment.author.headImage.imageUrl;
                const comName = comment.author.nickName;
                const comTime = getLocalTime(comment.createtime);
                const comAcademy = comment.author.depName;
                const comSex = comment.author.sex;
                const comContent = JSON.parse(comment.content).string ;
                $('.pcomment').attr('src', comUrl);
                $('.comName').text(comName);
                if(comSex === '男'){
                    $('.pcmale').css('display','inline-block');
                    $('.pcfemale').css('display','none');
                }else if(comSex === '女'){
                    $('.pcfemale').css('display','inline-block');
                    $('.pcmale').css('display','none');
                }else {
                    $('.pcfemale').css('display','none');
                    $('.pcmale').css('display','none');
                }
                $('.comTime').text(comTime);
                $('.comAcademy').text(comAcademy);
                $('.comContent').text(comContent);
            }
        })
    }
}

// 获取热门话题
function getHotBlogs() {
    $.ajax({
        url: 'http://api.dobell.me/dos/ugc/BlogDetailGetFromWeb',
        type: 'post',
        dateType:'text/plain',
        data: {uid:10078,blogId:param.hotBlogId}
    }).done(data => {
        data = JSON.parse(data);
        const hotnickName = data.data.author.nickName;
        const hotdepName = data.data.author.depName;
        const hotsex = data.data.author.sex;
        const hotheadImg = data.data.author.headImage.imageUrl;
        const hotcontent = JSON.parse(data.data.content).string;
        const hotviewCount = data.data.browseCount;
        const hotcommentCount = data.data.commentCount;
        const hotzanCount = data.data.zanCount;
        const hottime = getLocalTime(data.data.createtime);
        const hotimgArray = data.data.imageList;
        console.log(hotimgArray)

        $('.hotImage').attr('src',hotheadImg);
        $('.hotname').text(hotnickName);
        if(hotsex === '男'){
            $('.hotmale').css('display','inline-block');
            $('.hotfemale').css('display','none');
        }else if(hotsex === '女'){
            $('.hotfemale').css('display','inline-block');
            $('.hotmale').css('display','none');
        }else {
            $('.hotfemale').css('display','none');
            $('.hotmale').css('display','none');
        }
        $('.hottime').text(hottime);
        $('.hotacademy').text(hotdepName);
        $('.hot-content').text(hotcontent.replace(/\[e\][0-9]{4}\[\/e\]/g,""));
        // 对图片的处理
        // 首先判断图片数是否大于1，大于1的话判断是否是定高还是定宽
        if(hotimgArray.length === 1) {
            if(!sessionStorage.name1){
                var onlyimgUrl1 = hotimgArray[0].imageUrl;
                sessionStorage.name1 = 'share1';
                sessionStorage.onlyimgUrl1 = onlyimgUrl1;
            }else{
                console.log('刷新操作')
            }
            $('.fixhotimg').removeClass('hot-imgbox1');
            //获取屏幕的宽度
            const windowWidth1 = $(document).width()
            // 创建对象
            var img1 = new Image();
            // 改变图片的src
            console.log(sessionStorage.onlyimgUrl1)
            img1.src == sessionStorage.onlyimgUrl1;
            // 开始比较并且定宽定高 图片宽度大于视口宽度定宽100%
            if(img1.width < windowWidth1) {
                $('.fixhotimg').append("<img src="+ sessionStorage.onlyimgUrl1 +" />");
                $('.fixhotimg').find('img').addClass('img3');
            } else {
                $('.fixhotimg').append("<img src="+ sessionStorage.onlyimgUrl1 +" />");
                $('.fixhotimg').find('img').addClass('img1');
            }
        } else if(hotimgArray.length === 2) {
            $('.fixhotimg').removeClass('hot-imgbox');
            $('.fixhotimg').removeClass('hot-imgbox1');
            for(let i = 0;i<hotimgArray.length;i++){
                $('.fixhotimg').append("<img src="+ hotimgArray[i].imageUrl +" />");
                $('.fixhotimg').find('img').addClass('img4')
            }
        } else if(hotimgArray.length === 4) {
            $('.fixhotimg').removeClass('hot-imgbox');
            $('.fixhotimg').removeClass('hot-imgbox1');
            for(let i = 0;i<hotimgArray.length;i++){
                $('.fixhotimg').append("<img src="+ hotimgArray[i].imageUrl +" />");
                $('.fixhotimg').find('img').addClass('img4')
            }
        } else {
            $('.fixhotimg').removeClass('hot-imgbox');
            $('.fixhotimg').removeClass('hot-imgbox');
            for(let i = 0;i<hotimgArray.length;i++){
                $('.fixhotimg').append("<img src="+ hotimgArray[i].imageUrl +" />");
                $('.fixhotimg').find('img').addClass('img2')
            }
        };
        $('.hotBlogView').text(hotviewCount);
        $('.hotCommentCount').text(hotcommentCount);
        $('.hotLike').text(hotzanCount);
    }).fail(function() {
        console.log("error");
    }).always(function() {
        getHotComment(param.hotBlogId);
    });

    function getHotComment(id) {
        $.ajax({
            url: 'http://api.dobell.me/dos/ugc/BlogCommentListGetFromWeb',
            type: 'post',
            dateType:'text/plain',
            data: {uid:10078,blogId:id,lastId:0,objCount:1}
        }).done(data => {
            data = JSON.parse(data);
            if(data.data.length === 0) {
                $('.hot-comment').css({
                    display: 'none'
                });
                $('.noHotContent').css({
                    display: 'block'
                });
            } else {
                const hotcomment = data.data[0];
                const hotcomUrl = hotcomment.author.headImage.imageUrl;
                const hotcomName = hotcomment.author.nickName;
                const hotcomTime = getLocalTime(hotcomment.createtime);
                const hotcomAcademy = hotcomment.author.depName;
                const hotcomSex = hotcomment.author.sex;
                const hotcomContent = JSON.parse(hotcomment.content).string ;
                $('.hotcomment').attr('src',hotcomUrl);
                $('.hotcomName').text(hotcomName);
                if(hotcomSex === '男'){
                    $('.hotmale').css('display','inline-block');
                    $('.hotfemale').css('display','none');
                }else if(hotcomSex === '女'){
                    $('.hotfemale').css('display','inline-block');
                    $('.hotmale').css('display','none');
                }else {
                    $('.hotfemale').css('display','none');
                    $('.hotmale').css('display','none');
                }
                $('.hotcomTime').text(hotcomTime);
                $('.hotcomAcademy').text(hotcomAcademy);
                $('.hotcomContent').text(hotcomContent);
                $('.hottopic').text(param.hotTopicName);
                }
        })
     }
}

//时间过滤器
function getLocalTime(jsondate) {
    jsondate=""+jsondate+"";//因为jsonDate是number型的indexOf会报错
    if (jsondate.indexOf("+") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("+"));
    }
    else if (jsondate.indexOf("-") > 0) {
        jsondate = jsondate.substring(0, jsondate.indexOf("-"));
    }
    var date = new Date(parseInt(jsondate, 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return  month + "-" + currentDate + " " + hours + ":" + minutes ;
}