class dirtLines{constructor(t){this.custom_width=t.custom_width,this.custom_height=t.custom_height,this.margin=t.margin,this.pos=createVector(t.posX,t.posY),this.strokeColor=t.strokeColor,this.strokeWeight=t.strokeWeight,this.strokeColorNoise=t.strokeColorNoise,this.numberQuantisizer=t.numberQuantisizer,this.length=t.length,this.area=this.custom_width*this.custom_height,this.shapeNumber=Math.round(Math.round(this.custom_width/width*100)*Math.round(this.custom_height/height*100))/100*this.numberQuantisizer,console.error(this.shapeNumber),this.elements=[];for(var s=0;s<this.shapeNumber;s++)this.start=createVector(getP5RandomFromInterval(0+this.margin,this.custom_width-this.margin),getP5RandomFromInterval(0+this.margin,this.custom_height-this.margin)),this.end=p5.Vector.add(this.start,createVector(getP5RandomFromInterval(-this.length,this.length),getP5RandomFromInterval(-this.length,this.length))),this.elements.push({strokeColor:distortColorNew(this.strokeColor,this.strokeColorNoise,!1),strokeWeight:this.strokeWeight,start:this.start,end:this.end})}show(){for(var t of(push(),translate(this.pos.x,this.pos.y),this.elements))stroke(t.strokeColor),strokeWeight(t.strokeWeight),line(t.start.x,t.start.y,t.end.x,t.end.y);pop(),MODE>=5&&(push(),noFill(),strokeWeight(2),stroke("#000000"),rectMode(CENTER),rect(0,0,this.custom_width-2*this.margin,this.custom_height-2*this.margin),pop())}}