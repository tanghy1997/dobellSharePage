function load(Id){
  var share_data = {};
function comment (data) {
    this.name = data.author.nickName;
    this.headImage = data.author.headImage.imageUrl;
    this.comment = $.parseJSON(data.content).string;
    this.objname = data.objUser.nickName;
}
 $.ajax({
      url: 'http://api.dobell.me/dos/ugc/BlogDetailGetFromWeb',
      type: 'post',
      dateType:'text/plain',
      data: {uid:10078,blogId:Id}
    })
    .done(function(data) {
      data = JSON.parse(data);
      data = data.data;
      var nickName = data.author.nickName;
      var headUrl = data.author.headImage.imageUrl;
      var content = $.parseJSON(data.content).string;
      var time =new Date(data.createtime).getMonth() + '月' + new Date(data.createtime).getDate() + '日' +" "+ new Date(data.createtime).getHours() + ':' + new Date(data.createtime).getMinutes();
      var views = data.browseCount;
      var imageList = data.imageList;
      var commentCount = data.commentCount;
      var zan = data.zanCount;
      var transCount = data.transCount;
      share_data['content'] = content;
      share_data['time'] = time;
      share_data['views'] = views;
      share_data['imageList'] = imageList;
      share_data['commentCount'] = commentCount;
      share_data['zan'] = zan;
      share_data['transCount'] = transCount;
      share_data['nickName'] = nickName;
      share_data['headUrl'] = headUrl;
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      getComment(Id);
    });
   
   function getComment (Id) {
        $.ajax({
           url: 'http://api.dobell.me/dos/ugc/BlogCommentListGetFromWeb',
           type: 'post',
            dateType:'text/plain',
           data: {uid:10078,blogId:Id,lastId:0,objCount:10}
       })
       .done(function(data) {
           data = JSON.parse(data);
            data = data.data;
            var commentArray = [];
            data.forEach( function(el, index) {
                var come = new comment(el);
                commentArray.push(come);
            });
            share_data.commentList = commentArray;
            //console.log(commentArray);
       })
       .fail(function() {
           console.log("error");
       })
       .always(function() {
            console.log(share_data);
            var html = template('test', share_data);
            document.getElementsByClassName('wraper')[0].innerHTML = html;
            share();
       });
   }
}
