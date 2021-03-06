<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<title>口袋小安</title>
	<link rel="stylesheet" href="main.css">
	<script src="jquery-1.11.1.js"></script>
	<script src="artTemplate.js"></script>
</head>
<body>
	<div class="wraper">
		
	</div>
	<script id="test" type="text/html">
		
			<div class="banner">口袋小安</div>
			<div id="header">
				<div id="header_img">
					<img src="{{headUrl}}" alt="头像">
				</div>
				<div class="header_message">
					<div class="header_name">{{nickName}}</div>
					<div class="header_time">{{time}}&nbsp浏览量{{views}}次</div>
				</div>
			</div>
			<div id="content">
				<p>{{content}}</p>
				<div class="content_img">
					{{each imageList}}
						<img src="{{$value.imageUrl}}" alt="">
					{{/each}}
				</div>
			</div>
			<div class="download">
				<a href="javascript:viod;"><img src="./images/icon_comment.png"></img>{{commentCount}}</a>
				<a href="javascript:viod;"><img src="./images/icon_like.png"></img>{{zan}}</a>
				<a href="javascript:viod;"><img src="./images/icon_share.png"></img>{{transCount}}</a>
			</div>
			<div id="comment">
				<ul>
				{{each commentList}}
					<li class="comment">
						<div class="comment_header">
							<div class="comment_header_img">						
								<img src="{{$value.headImage}}" alt="头像">
							</div>
							<div class="comment_header_name"><span class="landlord">{{$value.name}}&nbsp</span>回复了<span>&nbsp{{$value.objname}}</span></div>
						</div>
						<p>{{$value.comment}}</p>
					</li>
				{{/each}}
				</ul>
			</div>
			
			<a class="downapp" href="http://www.loveahu.com/">
				<img src="app.png" alt="" class="animated swing">
				<p>下载口袋小安</p>
				<img src="disable.svg" id="disable" alt="">
			</a>
		
	</script>
	<script id="come" type="text/html">
					
	</script>
	<div id="mask">
			
	</div>
	<script src="model.js"></script>
	<script>
		var getUrl = function () {
			 var url = window.location.toString();
			 var type = url.match(/type=\d+/g);
			 type = type.toString().match(/\d+/g).toString();
			 url = url.match(/id=\d+/g);
			 url = url.toString();

			 Id = url.match(/\d+/g).toString();
			 console.log(type);
			 if (type == '1') {
			 	load(Id);
			 }else {
			 	window.location.href = 'http://www.loveahu.com';
			 }
		}
		getUrl();
	</script>
	<script src="share.js"></script>
</body>
</html>