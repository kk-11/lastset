// http://www.javascriptkit.com/javatutors/touchevents2.shtml
function swipedetect(el, callback){
	let swipedir;
	let startX;
	let startY;
	let distX;
	let distY;
	let threshold = 15;
	let restraint = 1000;
	let allowedTime = 500;
	let elapsedTime;
	let startTime;
	let handleswipe = callback || function(swipedir){}
	el.addEventListener('touchstart', (e) => {
		const touchobj = e.changedTouches[0];
		swipedir = 'none';
		startX = touchobj.pageX;
		startY = touchobj.pageY;
		startTime = new Date().getTime();
	}, false)
	el.addEventListener('touchend', function(e){
		var touchobj = e.changedTouches[0];
		distX = touchobj.pageX - startX;
		distY = touchobj.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime) {
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				swipedir = (distX < 0)? 'left' : 'right';
			}
			else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){
				swipedir = (distY < 0)? 'up' : 'down';
			}
		}
		handleswipe(swipedir);

	}, false);
	callback(swipedir);
}

module.exports = swipedetect;
