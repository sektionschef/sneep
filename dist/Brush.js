class Brush{constructor(t,s,i){this.fullspeed=BRUSHFULLSPEED,this.radiusMin=BRUSHSIZEMIN,this.radiusMax=BRUSHSIZEMAX,this.brushShape=BRUSHSHAPE,this.distanceBoost=4,this.OkLevel=8,this.fillColor=i,this.strokeColor=i,this.strokeSize=BRUSHFIBRESIZE,this.strokeColorDistort=BRUSHFIBRECOLORNOISE,this.start=t,this.end=s,this.alive=!0,this.passedA=!1,this.passedB=!1,this.pos=this.start.copy(),this.vel=createVector(0,0,0),this.acc=createVector(0,0,0),this.Distance=p5.Vector.sub(this.end,this.start),this.DistanceLength=this.Distance.mag(),this.distAccSlo=this.DistanceLength/this.distanceBoost,this.boost=this.fullspeed/this.distAccSlo,this.checkpointA=p5.Vector.add(this.start,p5.Vector.div(this.Distance,this.distanceBoost)),this.checkpointB=p5.Vector.sub(this.end,p5.Vector.div(this.Distance,this.distanceBoost)),this.accBoost=p5.Vector.mult(p5.Vector.normalize(this.Distance),this.boost),this.sloBoost=p5.Vector.mult(this.accBoost,-1),this.get_orientation()}get_orientation(){this.acceptanceLevel=PI/12,this.angle=p5.Vector.sub(this.end,this.start).heading(),this.angle>-this.acceptanceLevel&&this.angle<this.acceptanceLevel?this.orientation="left-right":this.angle>PI/4-this.acceptanceLevel&&this.angle<PI/4+this.acceptanceLevel?this.orientation="top/left-bottom/right":this.angle>PI/2-this.acceptanceLevel&&this.angle<PI/2+this.acceptanceLevel?this.orientation="top-bottom":this.angle<-(PI/4-this.acceptanceLevel)&&this.angle>-(PI/4+this.acceptanceLevel)?this.orientation="left/bottom-top/right":(console.log("some noise with this.angle: "+this.angle),this.alive=!1)}get_status(){"left-right"==this.orientation?(this.pos.x>this.end.x-this.OkLevel&&(this.alive=!1),this.pos.x>this.checkpointA.x&&(this.passedA=!0),this.pos.x>this.checkpointB.x&&(this.passedB=!0)):"top/left-bottom/right"==this.orientation?(this.pos.x>this.end.x-this.OkLevel&&this.pos.y>this.end.y-this.OkLevel&&(this.alive=!1),this.pos.x>this.checkpointA.x&&this.pos.y>this.checkpointA.y&&(this.passedA=!0),this.pos.x>this.checkpointB.x&&this.pos.y>this.checkpointB.y&&(this.passedB=!0)):"top-bottom"==this.orientation?(this.pos.y>this.end.y-this.OkLevel&&(this.alive=!1),this.pos.y>this.checkpointA.y&&(this.passedA=!0),this.pos.y>this.checkpointB.y&&(this.passedB=!0)):"left/bottom-top/right"==this.orientation&&(this.pos.x>this.end.x-this.OkLevel&&this.pos.y<this.end.y+this.OkLevel&&(this.alive=!1),this.pos.x>this.checkpointA.x&&this.pos.y<this.checkpointA.y&&(this.passedA=!0),this.pos.x>this.checkpointB.x&&this.pos.y<this.checkpointB.y&&(this.passedB=!0))}move(){this.get_status(),0==this.passedA?this.acc=this.accBoost:1==this.passedA&&0==this.passedB?this.acc=createVector(0,0,0):1==this.passedA&&1==this.passedB?this.acc=this.sloBoost:0==this.alive&&(this.acc=createVector(0,0,0),this.vel=createVector(0,0,0)),this.vel.add(this.acc),this.pos.add(this.vel)}update(){this.alive&&(this.move(),this.vel.x>0?this.radius=map(this.vel.x,BRUSHFULLSPEEDMIN,BRUSHFULLSPEEDMAX,this.radiusMax,this.radiusMin):this.vel.y>0&&(this.radius=map(this.vel.y,BRUSHFULLSPEEDMIN,BRUSHFULLSPEEDMAX,this.radiusMax,this.radiusMin)))}display(){MODE>=5&&(push(),translate(this.start),noStroke(),fill("blue"),ellipse(0,0,10),pop(),push(),translate(this.checkpointA),noStroke(),fill("red"),ellipse(0,0,5),stroke(5),pop(),push(),translate(this.checkpointB),noStroke(),fill("red"),ellipse(0,0,5),pop(),push(),translate(this.end),noStroke(),fill("purple"),ellipse(0,0,10),pop()),this.alive&&(push(),translate(this.pos),MODE>=5?(noStroke(),fill("black"),ellipse(0,0,3*this.radius,3*this.radius)):this.drawBrush(),pop())}drawBrush(){this.brushSize=this.radius,strokeWeight(this.strokeSize);for(var t=0;t<=5;t++)stroke(distortColorNew(this.strokeColor,this.strokeColorDistort)),"Line"==BRUSHSHAPE?line(getRandomFromInterval(-this.brushSize,this.brushSize),getRandomFromInterval(-this.brushSize,this.brushSize),getRandomFromInterval(-this.brushSize,this.brushSize),getRandomFromInterval(-this.brushSize,this.brushSize)):"Ellipse"==BRUSHSHAPE?(noFill(),ellipse(getRandomFromInterval(-this.brushSize,this.brushSize),getRandomFromInterval(-this.brushSize,this.brushSize),getRandomFromInterval(0,this.brushSize/2),getRandomFromInterval(0,this.brushSize/2))):"Triangle"==BRUSHSHAPE?(noFill(),triangle(getRandomFromInterval(-this.brushSize,this.brushSize),getRandomFromInterval(-this.brushSize,this.brushSize),getRandomFromInterval(-this.brushSize,this.brushSize),getRandomFromInterval(-this.brushSize,this.brushSize),getRandomFromInterval(-this.brushSize,this.brushSize),getRandomFromInterval(-this.brushSize,this.brushSize))):console.warn("No brush shape specified, oida!")}}