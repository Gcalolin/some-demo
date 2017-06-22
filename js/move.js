//获取不在行内样式的属性值
function getStyle(obj, attr) {
	//IE兼容
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

//控制元素移动
//move(hover,{height:hover.maxheight})
function move(obj, json, func, time) {
	//如果time未定义，为默认为30毫秒
	if(time == undefined) {
		time = 30;
	}

	clearInterval(obj.timer);

	obj.timer = setInterval(function() {
		var flag = true;//标记
		for(var attr in json) {
			var current = 0;
			if(attr == 'opacity') {
				current = parseInt(parseFloat(getStyle(obj, attr) * 100));
			} else {
				current = parseInt(getStyle(obj, attr));
			}

			var speed = (json[attr] - current) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(current != json[attr]) {
				flag = false;
			}
			
			if(attr == 'opacity') {
				obj.style.filter = 'alpha(opacity: ' + (current + speed) + ')';
				obj.style.opacity = (current + speed) / 100;
			} else {
				obj.style[attr] = current + speed + 'px';
			}
		}
		if(flag) {
			clearInterval(obj.timer);
			if(func instanceof Function) {
				func();
			}
		}
	}, time);
}

//设置矩阵
function setMatrix(obj, deg, translateX, translateY) {
	if(translateX == undefined) {
		translateX = getArgInMatrix(obj, 4);
	}
	if(translateY == undefined) {
		translateY = getArgInMatrix(obj, 5);
	}
	console.log(deg);
	deg = -deg * Math.PI / 180;
	var a = Math.cos(deg);
	var b = Math.sin(deg);
	var c = -Math.sin(deg);
	var d = Math.cos(deg);

	obj.style.transform = 'matrix(' + a + ', ' + b + ', ' + c + ', ' + d + ', ' + 0 + ', ' + translateY + ')';
	//				return 'matrix(' + a + ', ' + b + ', ' + c + ', ' + d + ', ' + 0 + ', ' + translateY + ')';
}

//获取矩阵中第index个参数
function getArgInMatrix(obj, index) {
	var args = getStyle(obj, 'transform').split(',');
//	console.log(args);
	var pattern = /\s/g;
	var arg;
	if(index == 0) {
		arg = args[0].slice(args[0].indexOf('(') + 1);
	} else if(index == 5) {
		arg = args[5].slice(0, args[5].indexOf(')'));
	} else {
		arg = args[index];
	}
	return arg.replace(pattern, '');
}

//获取一个余弦值的度数
function getDegByCos(cos) {
	var deg = 180 * Math.acos(cos) / Math.PI;
	return Math.round(deg);
}

function getDegInMatrix(obj){
	var arg = getArgInMatrix(obj, 0);
	return getDegByCos(arg);
}
