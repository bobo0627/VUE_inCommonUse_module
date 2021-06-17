export function corpImgsBase64(imgSrc,mark){
	// imgSrc:图片地址,注意图片跨越问题,后端需要支持
	// mark:指定区域基于图片的坐标
	var img = new Image();
	img.setAttribute('crossOrigin','Anonymous')
	img.src = imgSrc
	var res = null;
	return new Promise ((resolve, reject)=>{
		img.onload = function(){
			var c = document.createElement('canvas')
			c.width = mark['offsetWidth']
			c.height = mark['offsetHeight']
			var customcxt = c.getContext("2d");

			let _width = mark['offsetWidth']//需要抠图 的宽度
			let _height = mark['offsetHeight']//需要抠图 的高度
			let x1 = mark['offsetLeft']//需要抠的图 左上角x
			let y1 = mark['offsetTop']//需要抠的图 左上角y
			customcxt.drawImage(img,x1,y1,_width,_height,0,0,_width,_height)//图片、开始剪切的X、Y、剪切的宽度、高度、在画面上的位置X、Y、设置剪切出来图片的宽度、高度
			res = c.toDataURL('image/jpeg');
			//console.log(res)

			if(c.width>0&&c.height>0){//排除点位坐标都为0或者错误的情况
				resolve(res)
			}else{
				resolve(imgSrc)
			}
			customcxt.clearRect(0,0,_width,_height)
		}

		img.onerror = function(){
			console.log('error')
			reject(imgSrc);
			//img.src =null
		}
	})
}