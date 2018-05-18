var getUrl = function () {
    var url = window.location.toString();
    var type = url.match(/type=\d+/g);
    type = type.toString().match(/\d+/g).toString();
    url = url.match(/id=\d+/g);
    url = url.toString();

    Id = url.match(/\d+/g).toString();
    // console.log(type);
    // if (type == '1') {
    //     load(Id);
    // }else {
    //     window.location.href = 'http://www.loveahu.com';
    // }
    getPhoto(Id)
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