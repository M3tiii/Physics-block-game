function stardraw(timer, goal){
	goal = Math.round(goal-V.MenuHeight);
	ctx.clearRect(20,goal+V.H/10-1,V.W-60,3);
	ctx.fillStyle = "grey";
	ctx.fillRect(20,goal,V.W-45,1);

	ctx.clearRect(V.W-40,goal-20,40,40);
	ctx.drawImage(
		stars,
		135,
		100,
		40,
		40,
		V.W-40,
		goal-20,
		40,
		40
	);
	tmpTimer = timer/10;
	ctx.drawImage(
		stars,
		25,
		100,
		40,
		2*tmpTimer,
		V.W-40,
		goal-20,
		40,
		tmpTimer*2
	);
}
function prepare(actualLevel){

	level = V.level[actualPack][actualLevel];
	blockCount = [];
	for(var i=0; i<V.level[actualPack][actualLevel].shape.length; i++){
		blockCount[i] = V.level[actualPack][actualLevel].shape[i].count;
	}
	var tmpLength = blockCount.length;
	var tmpBlockCount = 0;
	for(var i=0; i<tmpLength; i++){
		tmpBlockCount += blockCount[i];
	}
	blockCount[tmpLength] = tmpBlockCount;
	
	//Draw retry button
	ctx.drawImage(
		retry,
		0,
		0,
		retry.width,
		retry.height,
		V.W-retry.width,
		V.H-V.MenuHeight*1.7,
		retry.width,
		retry.height
	);

	//Draw exit button
	ctx.drawImage(
		exit,
		0,
		0,
		exit.width,
		exit.height,
		0,
		V.H-V.MenuHeight*1.7,
		exit.width,
		exit.height
	);

	// //First drawing star
	// if(actualPack == 0)
	// 	ctx.drawImage(
	// 		stars,
	// 		135,
	// 		100,
	// 		40,
	// 		40,
	// 		V.W-40,
	// 		level.goal.y-20-V.MenuHeight,
	// 		40,
	// 		40
	// 	);
	// ctx.fillStyle = "grey";
	// ctx.fillRect(20,level.goal.y-V.MenuHeight,V.W-60,1);

	//SOLID MANAGE
	for(var i=0; i<level.solid.length; i++){
		switch(level.solid[i].type){
			case "rect":
				var tmpBody = Bodies.rectangle(level.solid[i].x, level.solid[i].y, level.solid[i].xs, level.solid[i].ys, { 
					  spike: level.solid[i].spike,
				      isStatic: true, 
				      frictionStatic: 10,
				      friction: 10,
				      render: { 
				        visible: true,
				        fillStyle: '#4E4E49',
				        lineWidth : 4,
				        strokeStyle : 'black',
				        
				      }  
				    })
			    break;
			case "circle": 
				var tmpBody = Bodies.circle(level.solid[i].x, level.solid[i].y, level.solid[i].rs, { 
					  spike: level.solid[i].spike,
				      isStatic: true, 
				      frictionStatic: 10,
				      friction: 10,
				      render: { 
				        visible: true,
				        fillStyle: '#4E4E49',
				        lineWidth : 4,
				        strokeStyle : 'black',
				        
				      }  
				    }, [20])
			    break;
			case "triangle":
				var tmpBody = Bodies.trapezoid(level.solid[i].x, level.solid[i].y, level.solid[i].xs, level.solid[i].ys, level.solid[i].slope, { 
					  spike: level.solid[i].spike,
					  angle: level.solid[i].angle,
				      isStatic: true, 
				      frictionStatic: 10,
				      friction: 10,
				      render: { 
				        visible: true,
				        fillStyle: '#4E4E49',
				        lineWidth : 4,
				        strokeStyle : 'black',
				        
				      }  
				    })
			    break;
			case "extra":
				level.solid[i].make();
				break;
		}
		if(tmpBody.spike){
			tmpBody.render.fillStyle= "red";
		}
		World.add(engine.world, [tmpBody]);
	}
	//MENU MANAGE
	for(var i=0; i<level.shape.length; i++){
		switch(level.shape[i].type){
			case "rect":
				tmp = Bodies.rectangle(V.W/4*(i+1), V.MenuHeight/1.5, level.shape[i].xs ,level.shape[i].ys, level.shape[i].options);
				tmp.shapeId = i;
			    tmp.menu = true;
			  	tmp.text = level.shape[i].count;
			    tmp.render.sprite.xScale = V.MenuHeight/140;
    			tmp.render.sprite.yScale = V.MenuHeight/140;
    			//tmp.render.context.fillRect(0,0,100,100);
    			tmp2 = Constraint.create({
				  pointA: { x: V.W/4*(i+1), y: -V.MenuHeight/1.5},
				  bodyB: tmp
				});
			    World.add(engine.world, [tmp, tmp2]);
			    //console.log(tmp);
			    break;
			case "circle": 
				tmp = Bodies.circle(V.W/4*(i+1), V.MenuHeight/1.5, level.shape[i].rs, level.shape[i].options, [10]);
				tmp.shapeId = i;
				//tmp.density = 1;
			    tmp.menu = true;
			    tmp.text = level.shape[i].count;
			    tmp.render.sprite.xScale = V.MenuHeight/100;
    			tmp.render.sprite.yScale = V.MenuHeight/100;
    			tmp2 = Constraint.create({
				  pointA: { x: V.W/4*(i+1), y: -V.MenuHeight/1.5},
				  bodyB: tmp
				});
			    World.add(engine.world, [tmp, tmp2]);
			    break;
			case "triangle":
				tmp = Bodies.trapezoid(V.W/4*(i+1), V.MenuHeight/1.5, level.shape[i].xs, level.shape[i].ys, level.shape[i].slope , level.shape[i].options);
				tmp.shapeId = i;
			    tmp.menu = true;
			    tmp.text = level.shape[i].count;
			    tmp.render.sprite.xScale = V.MenuHeight/100;
    			tmp.render.sprite.yScale = V.MenuHeight/100;
    			tmp2 = Constraint.create({
				  pointA: { x: V.W/4*(i+1), y: -V.MenuHeight/1.5},
				  bodyB: tmp
				});
			    World.add(engine.world, [tmp, tmp2]);
			    break;
		}
	}
	//EXTRA
	if(level.extra){
		level.extra();
	}
}

