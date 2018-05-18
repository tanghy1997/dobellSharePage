function share(){
	var disable = document.getElementById('disable');
	var content_img = document.getElementsByClassName('content_img')[0];
	var mask = document.getElementById('mask');
	console.log(content_img);

	var screen = window.screen;
	var width = screen.width || screen.availWidth || document.documentElement.clientWidth || window.innerWidth;
	mask.style.height = screen.height || screen.availHeight || document.documentElement.clientHeight || window.innerHeight;




	disable.onclick = function (e) {
		var e = window.event || event;
		var app = document.querySelector('.downapp');
		e.preventDefault();
		app.parentNode.removeChild(app);
	}
	mask.onclick = function (e) {
		var e = window.event || event;
		var mask_img = document.getElementsByClassName('mask_img')[0];
		e.preventDefault();
		if (e.target != mask_img) {
			mask.style.display = 'none';
		} else {
			
		}
		
	}
	content_img.onclick = function (e) {
		var e = window.event || event;
		e.preventDefault();
		if (e.target.nodeName == 'IMG') {
			var src = e.target.src;
			var oimg = '<div><img class="mask_img" src="'+src+'"></img></div>';			
			var width_img = (width - 80)+'px';			
			mask.style.display = 'block';
			mask.innerHTML = oimg;
			var mask_img = document.getElementsByClassName('mask_img')[0];
			mask_img.style.width = width_img;
		}
	}
}