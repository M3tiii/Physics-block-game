function levelData1(){
	tmp = [];
	//LEVEL 0
	tmp.push({});
	//LEVEL 1
	tmp.push({
		solid : [
				{type:"rect", x:V.W/2, y:V.H-V.H/5, xs:V.W/2, ys:V.H/15},
				],

		shape : [
				{type:"rect", count: 9, xs:V.H/20, ys:V.H/20, options: {
					render: { 
						fillStyle: '#00b9d2',
						strokeStyle: '#10100F',
						lineWidth: 2,
					}
				}},
				],

		goal :  {
				y: V.H/2,
				},
		extra: function(){
			if(!window.localStorage.getItem(1))
			var timerTutorial = setInterval(function () {tutorial()}, 200);
			var timerCounter = 0;
		    function tutorial() {
		    	ctx.clearRect(0,0,V.W,V.H/3);
		    	ctx.fillStyle = "#383838";
		    	ctx.font=V.W/20+"px Arial"; 
    			if(timerCounter < 1){
    				ctx.fillText('Hello !', V.W/3, V.H/8);
    				timerCounter+=0.2;
    			}
    			else if(timerCounter < 2){
    				ctx.fillText('Do you know,', V.W/3, V.H/8);
    				ctx.fillText('how to play ?', V.W/2.8, V.H/8+V.W/18);
    				timerCounter+=0.05;	
    			}
    			else if(timerCounter < 3){
    				ctx.fillText('No ?', V.W/3, V.H/8);
    				ctx.fillText("I'll teach you.", V.W/2.8, V.H/8+V.W/18);
    				timerCounter+=0.05;	
    			}
    			else if(timerCounter < 4){
    				ctx.fillText('Pull down block', V.W/10, V.H/7);
    				ctx.fillText('to select it', V.W/9, V.H/7+V.W/18);
    				if(V.actualBox.label)
    					timerCounter+=0.2
    			}
    			else if(timerCounter < 5){
    				ctx.fillText('Good', V.W/10, V.H/7);
    				timerCounter+=0.2;	
    			}
    			else if(timerCounter < 6){
    				ctx.fillText('Now, drag your finger', V.W/10, V.H/7);
    				ctx.fillText('and move the block to the platform', V.W/9, V.H/7+V.W/18);
    				if(V.Blocklist.length)
    					timerCounter+=0.2;	
    			}
    			else if(timerCounter < 7){
    				ctx.fillText('Build the tower', V.W/10, V.H/7);
    				ctx.fillText('to cross the line', V.W/9, V.H/7+V.W/18);
    				timerCounter+=0.05;	
    			}
    			else if(timerCounter < 8){
    				ctx.fillText('Good luck !', V.W/10, V.H/7);
    				timerCounter+=0.1;	
    			}
    			else if(timerCounter < 9){
    				window.clearTimeout(timerTutorial)
    			}
		    }
		}
		});
	//LEVEL 2
	tmp.push({
		solid : [
				{type:"rect", x:V.W/3, y:V.H-V.H/5, xs:V.H/12, ys:V.H/12},
				{type:"rect", x:V.W-V.W/3, y:V.H-V.H/5, xs:V.H/12, ys:V.H/12},
				],

		shape : [
				{type:"rect", count: 5, xs:V.H/20, ys:V.H/20, options: {
					render: { 
						fillStyle: '#00b9d2',
						strokeStyle: '#10100F',
						lineWidth: 2,
					}
				}},
				{type:"triangle", count: 1, xs:V.H/6, ys:V.H/14, slope:0.99, options: {
				angle: Math.PI,
				render: {
					fillStyle: '#00b9d2',
					strokeStyle: '#10100F',
					lineWidth: 2, 
				}
			}},
				],

		goal: {
			y: V.H/2,
		}	});
	//LEVEL 3
	tmp.push({
		solid : [
				{type:"rect", x:V.W/3, y:V.H-V.H/8, xs:V.W/40, ys:V.W/25},
				{type:"rect", x:V.W-V.W/3, y:V.H-V.H/8, xs:V.W/40, ys:V.W/25},
				],
		shape : [
			{type:"rect", count: 6, xs:V.H/5, ys:V.H/40, options: {
				render: {
					fillStyle: '#00b9d2',
					strokeStyle: '#10100F',
					lineWidth: 2, 
				}
			}},
			{type:"circle", count: 10, rs:V.H/40, options: {
				render: { 
		        	fillStyle: '#25CF66',
					strokeStyle: '#10100F',
					lineWidth: 2,
				}
			}},
			],
		goal : {
			y: V.H/2,
		}	});
	//LEVEL 4
	tmp.push({
		solid : [
				{type:"rect", x:V.W/3, y:V.H-V.H/8, xs:V.W/40, ys:V.W/25},
				{type:"rect", x:V.W-V.W/3, y:V.H-V.H/8, xs:V.W/40, ys:V.W/25},
				],
		shape : [
			{type:"rect", count: 11, xs:V.H/20, ys:V.H/20, options: {
				//sleepThreshold: 10,
				//mass: 0.2,
				//restitution: 0.2,
				//timescale: 0.2,
				//friction: 1,
				//frictionStatic: 10,
				render: {
					fillStyle: '#00b9d2',
					strokeStyle: '#10100F',
					lineWidth: 2, 
				}
			}},
			{type:"rect", count: 3, xs:V.H/7, ys:V.H/30, options: {
				render: { 
		        	fillStyle: '#4E1111',
					strokeStyle: '#10100F',
					lineWidth: 2,
				}
			}},
			],
		goal : {
			y: V.H/2,
		}	});
	//LEVEL 5
	tmp.push({
		solid : [
				{type:"triangle", x:V.W/4, y:V.H-V.H/6, xs:V.H/4, ys:V.W/3, slope:0.99, angle:Math.PI/2},
				{type:"triangle", x:V.W-V.W/4, y:V.H-V.H/6, xs:V.H/4, ys:V.W/3, slope:0.99, angle:-Math.PI/2},
				],
		shape : [
			{type:"circle", count: 50, rs:V.H/40, options: {
				render: { 
		        	fillStyle: '#25CF66',
					strokeStyle: '#10100F',
					lineWidth: 2,
				}
			}},
			{type:"rect", count: 2, xs:V.H/5, ys:V.H/30, options: {
				render: {
					fillStyle: '#00b9d2',
					strokeStyle: '#10100F',
					lineWidth: 2, 
				}
			}},
			],
		goal : {
			y: V.H/2,
		}	});
	//LEVEL 6
	tmp.push({
		solid : [
				{type:"circle", x:V.W/6, y:V.H-V.H/7, rs:V.W/40},
				{type:"circle", x:V.W-V.W/6, y:V.H-V.H/7, rs:V.W/40},
				{type:"circle", x:V.W-V.W/2, y:V.H-V.H/10, rs:V.W/40},
				//{type:"polygon", x:V.W/2, y:V.H-V.H/7, rs:V.W/20, slope:3},
				],
		shape : [
			{type:"triangle", count: 16, xs:V.H/5, ys:V.H/20, slope:0.99, options: {
				angle: Math.PI,
				friction: 0.5,
				render: {
					fillStyle: '#00b9d2',
					strokeStyle: '#10100F',
					lineWidth: 2, 
				}
			}},
			],
		goal : {
			y: V.H/2,
		}	});
	//LEVEL 7
	tmp.push({
		solid : [
				{type:"rect", x:V.W/2, y:V.H-V.H/8, xs:V.H/10, ys:V.H/20},
				],
		shape : [
			{type:"rect", count: 20, xs:V.H/20, ys:V.H/20, options: {
				render: {
					fillStyle: '#00b9d2',
					strokeStyle: '#10100F',
					lineWidth: 2, 
				}
			}},
			],
		goal : {
			y: V.H/3.8,
		}	});
	//LEVEL 8
	tmp.push({
		solid : [
				{type:"rect", x:V.W/3.6, y:V.H-V.H/8, xs:V.W/40, ys:V.W/25},
				{type:"rect", x:V.W-V.W/3.6, y:V.H-V.H/8, xs:V.W/40, ys:V.W/25},
				{type:"rect", x:V.W/2.75, y:V.H-V.H/8, xs:V.W/40, ys:V.W/25},
				{type:"rect", x:V.W-V.W/2.75, y:V.H-V.H/8, xs:V.W/40, ys:V.W/25},
				{type:"rect", x:V.W/2.2, y:V.H-V.H/8, xs:V.W/40, ys:V.W/25},
				{type:"rect", x:V.W-V.W/2.2, y:V.H-V.H/8, xs:V.W/40, ys:V.W/25},
				],
		shape : [
			{type:"circle", count: 3, rs:V.H/30, options: {
				render: { 
		        	fillStyle: '#25CF66',
					strokeStyle: '#10100F',
					lineWidth: 2,
				}
			}},
			{type:"triangle", count: 3, xs:V.H/15, ys:V.H/10, slope:0.99, options: {
				angle: 0,
				friction: 0.5,
				render: {
					fillStyle: '#00b9d2',
					strokeStyle: '#10100F',
					lineWidth: 2, 
				}
			}},
			{type:"rect", count: 3, xs:V.H/8, ys:V.H/40, options: {
				render: {
					fillStyle: '#00b9d2',
					strokeStyle: '#10100F',
					lineWidth: 2, 
				}
			}},
			],
		goal : {
			y: V.H/1.7,
		}	});
	//LEVEL 9
	tmp.push({
		solid : [
				{type:"rect", x:V.W/2, y:V.H-V.H/8, xs:V.H/20, ys:V.H/20},
				{type:"rect", x:V.W/2, y:V.H-V.H/3, xs:V.H/20, ys:V.H/20, spike:true},
				],
		shape : [
			{type:"rect", count: 8, xs:V.H/20, ys:V.H/20, options: {
				render: {
					fillStyle: '#00b9d2',
					strokeStyle: '#10100F',
					lineWidth: 2, 
				}
			}},
			{type:"rect", count: 2, xs:V.H/5, ys:V.H/25, options: {
				render: {
					fillStyle: '#00b9d2',
					strokeStyle: '#10100F',
					lineWidth: 2, 
				}
			}},
			],
		goal : {
			y: V.H/2,
		},
		extra: function(){
			if(!window.localStorage.getItem(9))
			var timerTutorial = setInterval(function () {tutorial()}, 200);
			var timerCounter = 0;
		    function tutorial() {
		    	ctx.clearRect(0,0,V.W,V.H/3);
		    	ctx.fillStyle = "#383838";
		    	ctx.font=V.W/20+"px Arial"; 
    			if(timerCounter < 1){
    				ctx.fillText("It's me again.", V.W/3, V.H/8);
    				timerCounter+=0.05;
    			}
    			else if(timerCounter < 2){
    				ctx.fillText('It was too easy?', V.W/3, V.H/8);
    				timerCounter+=0.05;	
    			}
    			else if(timerCounter < 3){
    				ctx.fillText("Now you can't touch", V.W/4, V.H/8);
    				ctx.fillText("the red blocks.", V.W/3, V.H/8+V.W/18);
    				timerCounter+=0.02;	
    			}
    			else if(timerCounter < 4){
    				ctx.fillText("Good luck !", V.W/3, V.H/8);
    				timerCounter+=0.1;	
    			}
    			else if(timerCounter < 5){
    				window.clearTimeout(timerTutorial)
    			}
		    }
		}	});
	//LEVEL 10
	tmp.push({
		solid : [
				{type:"rect", x:V.W/2, y:V.H-V.H/8, xs:V.H/15, ys:V.H/40},
				{type:"rect", x:V.W/2, y:V.H-V.H/6, xs:V.H/15, ys:V.H/40},
				{type:"rect", x:V.W/3, y:V.H-V.H/4, xs:V.W/2, ys:V.H/30, spike:true},
				{type:"rect", x:V.W-V.W/3, y:V.H-V.H/2.5, xs:V.W/2, ys:V.H/30, spike:true},
				],
		shape : [
			{type:"rect", count: 20, xs:V.H/20, ys:V.H/20, options: {
				render: {
					fillStyle: '#00b9d2',
					strokeStyle: '#10100F',
					lineWidth: 2, 
				}
			}},
			],
		goal : {
			y: V.H,
		}	});
	//LEVEL BLOCK
	tmp.push({
		solid : [

				],

		shape : [

				],

		goal: {
			y: V.H/2,
		}	});
	return tmp;
}


function levelData2(){
	tmp = [];
	//LEVEL 0
	tmp.push({});
	
	return tmp;
}