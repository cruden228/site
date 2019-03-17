const elem = document.getElementById("elem");

const tooltip = document.createElement("div");
tooltip.innerHTML  = "tooltip";
tooltip.id = "tooltip";

let checkObject = {};

elem.addEventListener("mouseover", (event) => {

	checkCoordinates = setInterval( () => {

	    if( checkObject.eventClientX-10 < event.clientX || checkObject.eventClientX+10 > event.clientX){
	    	if(checkObject.eventClientY-10 < event.clientY || checkObject.eventClientY+10 > event.clientY){

	    		checkObject.checkIntoElement = setInterval( () => { 
	    			document.body.appendChild(tooltip); 
	    			console.log("add");
	    		}, 400);
	    	}
	    }

	    checkObject.eventClientX = event.clientX;
	    checkObject.eventClientY = event.clientY;

	}, 500);

});

elem.addEventListener("mouseout", (event) => {
	if(document.getElementById("tooltip")){
		clearInterval(checkObject.checkIntoElement);
		clearInterval(checkObject.checkCoordinates);
		document.body.removeChild(tooltip);
		console.log("remove");
	}
});

// elem.addEventListener("mousemove", (event)=>{
// 	if(checkObject.eventClientX == event.clientX || checkObject.eventClientY == event.clientY){
//         checkObject.chackIntoElement = setInterval( () => {
// 		document.body.appendChild(tooltip);
// 		switchTooltip = true;
// 	},100);
//     elem.addEventListener("mouseout", (event) => {
// 			       	 		setInterval( () => {
// 				       	 		if(switchTooltip){
// 				       	 			clearInterval(checkObject.chackIntoElement);
// 			    					clearInterval(checkObject.chackCoordinates);
// 				       	 			document.body.removeChild(tooltip);
// 				       	 			switchTooltip = false;
// 				       	 		}
// 				       	 	},100);


// 				        });
//             		}
//         		});






// checkObject.chackCoordinates = setInterval( () => {
//     checkObject.eventClientX = event.clientX;
//     checkObject.eventClientY = event.clientY;
// },10);






//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function moveXAtSlider (element , event) {
	if(event.pageX-25 > 0 && event.pageX-25 < slider.offsetWidth){
		element.style.left = event.pageX - 30 + 'px';
	}else if(event.pageX-25 < 0){
		element.style.left = 0 + 'px';
	}else{
		element.style.left = slider.offsetWidth-5 + 'px';
	}
}


const slider = document.getElementById('slider');
const thumb = document.getElementById('thumb');

thumb.ondragstart = ()=>{
 return false;
}

thumb.addEventListener("mousedown",()=>{
	thumb.style.position = 'absolute';

	document.addEventListener("mousemove", mouseMoveXAt, false);
});

thumb.addEventListener("mouseup", ()=>{
	thumb.style.position = 'relative';
	
	document.removeEventListener("mousemove", mouseMoveXAt, false);
}, false);

document.addEventListener("mouseup", ()=>{
	document.removeEventListener("mousemove", mouseMoveXAt, false);
});

function mouseMoveXAt (e) {
	moveXAtSlider(thumb, e);
}


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



//var 1

// const body = document.getElementById('body');

// document.addEventListener("mousedown", (e)=>{
// 	if(e.target.classList.contains('draggable')){
// 		console.log(e.target.getBoundingClientRect().top);
// 		console.log(e.clientY);
// 		e.target.style.position = 'absolute';
//     	e.target.style.zIndex = 20;

//     	function mouseMoveAt (e) {
//     		let elementTop = e.pageY + e.target.offsetHeight / 2;
//     		let elementLeftRight = e.pageX + e.target.offsetWidth / 2;
// 			let elementBottom = e.pageY + e.target.offsetHeight / 2;
//     		// console.log(elementBottom);
//     		// console.log(document.documentElement.clientWidth);
//     		// console.log(body.clientHeight);  вся страница
// 	    	if(elementTop > 100 && elementLeftRight > 100 && elementLeftRight < body.clientWidth){
// 				e.target.style.top = e.pageY - e.target.offsetHeight / 2 + 'px';
// 				e.target.style.left = e.pageX - e.target.offsetWidth / 2 + 'px';
// 			}else if(elementTop < 100){
// 				e.target.style.top = 0 + 'px';
// 				// window.scrollBy(0,10);
// 			}else if(elementLeftRight < 100){
// 				e.target.style.left = 0 + 'px';
// 			}else if(elementLeftRight > body.clientWidth){
// 				e.target.style.left = body.clientWidth - e.target.offsetWidth + 'px';
// 			}
// 		}

// 		document.addEventListener("mousemove", mouseMoveAt, false);

// 		document.addEventListener("mouseup", ()=>{
// 			e.target.style.zIndex = 0;
			
// 			document.removeEventListener("mousemove", mouseMoveAt, false);
// 		}, false);
// 	}
// });


//var2

const body = document.getElementById('body');

document.addEventListener("mousedown", (event) => {

	const ourElement = event.target;

	if(!ourElement.classList.contains("draggable")) return;

	const shiftX = event.clientX - ourElement.getBoundingClientRect().left; 
	const shiftY = event.clientY - ourElement.getBoundingClientRect().top;

	ourElement.style.position = "absolute";

	document.body.appendChild(ourElement);

	muveAt(event.clientX, event.clientY);

	function muveAt (clientX, clientY) {
		const newX =  clientX - shiftX;
		let newY =  clientY - shiftY;
		// console.log(newX);
		// console.log(newY);
		const newBottom = newY + ourElement.offsetHeight;

		if (newBottom > document.documentElement.clientHeight){
			const docBotton = document.documentElement.getBoundingClientRect().bottom;
			let scrollY = Math.min(docBotton - newBottom, 10);

			if(scrollY < 0) scrollY = 0;

			window.scrollBy(0, scrollY);
			newY = Math.min(newY, document.documentElement.clientHeight - ourElement.offsetHeight);
		}
		
	}


	return false;
});





//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


const field = document.getElementById("field");
const ball = document.getElementById("ball");


field.addEventListener("mousedown",(e)=>{

	fieldInnerCoords={
		left: field.getBoundingClientRect().left - field.clientLeft,
		top: field.getBoundingClientRect().top - field.clientTop,
	};
	console.log(ball.clientWidth / 2);
	console.log(fieldInnerCoords.left);

	ballCoords = {
		left: e.clientX - fieldInnerCoords.left - ball.clientWidth,
		top: e.clientY - fieldInnerCoords.top - ball.clientHeight,
	};

	if(ballCoords.left < 0) ballCoords.left = 0;
	if(ballCoords.top < 0) ballCoords.top = 0;
	if(ballCoords.left + ball.clientWidth > field.clientWidth) ballCoords.left = field.clientWidth - ball.clientWidth;
	if(ballCoords.top + ball.clientHeight > field.clientHeight) ballCoords.top = field.clientHeight - ball.clientHeight;

	ball.style.left = ballCoords.left +'px';
	ball.style.top = ballCoords.top +'px';

}, false);


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



const removePost = document.getElementById("removePost");

removePost.addEventListener("click", (e)=>{
	if(!e.target.classList.contains("remove-button")) return;
	if(!e.target.parentNode.classList.contains("pane")) return;
	e.target.parentNode.style.display = 'none';
}, false);


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////



const grid = document.getElementById("grid");


grid.addEventListener("click", (e)=>{
	if(!e.target.getAttribute('data-type')) return;
	const arrNotSort = [];
	switch(e.target.getAttribute('data-type')){
		case 'number':
			console.log(e.target.cellIndex);
			arrNotSort
			break;
	}
}, false);