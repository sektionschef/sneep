const MODE=1,NOISESEED=hashFnv32a(fxhash);let canvas,rescaling_width,rescaling_height,PALETTE,PALETTE_LABEL,DOMINANTSIDE,ALLDONE=!1,RESCALINGCONSTANT=948,FRAMEDWIDTH=800,FRAMED=!1,TITLE="Landstreicherin",ARTIST="Stefan Schwaha, @sektionschef",DESCRIPTION="Javascript on pixel",URL="https://digitalitility.com",YEAR="2022",PRICE="ꜩ 3",EDITIONS="100 editions",NUMBER_OF_GRIDS=getRandomFromList([2,3]),BRUSHSIZEMIN=getRandomFromList([.3,.4,.5,.6,.7]),BRUSHSIZEMAX=getRandomFromList([1,1.25,1.5,1.75,2,2.25,2.5]),BRUSHSIZELABEL=BRUSHSIZEMIN+"-"+BRUSHSIZEMAX,BRUSHFULLSPEEDMIN=2,BRUSHFULLSPEEDMAX=6,BRUSHFULLSPEED=Math.round(100*getRandomFromInterval(BRUSHFULLSPEEDMIN,BRUSHFULLSPEEDMAX))/100,BRUSHFULLSPEEDLABEL=label_feature(BRUSHFULLSPEED,BRUSHFULLSPEEDMIN,BRUSHFULLSPEEDMAX),BRUSHFIBRESIZE=Math.round(100*getRandomFromInterval(.2,.4))/100,BRUSHFIBRECOLORNOISE=Math.round(100*getRandomFromInterval(3,10))/100,BRUSHCOLORDISTORT=Math.round(100*getRandomFromInterval(5,10))/100,DISTANCE_BETWEEN_LINES=Math.round(getRandomFromInterval(6,16)),DISTANCE_BETWEEN_LINES_LABEL=label_feature(DISTANCE_BETWEEN_LINES,6,16),ROTHKOSTROKEOPACITY=Math.round(100*getRandomFromInterval(5,30))/100,ROTHKOSTROKEOPACITYLABEL=label_feature(ROTHKOSTROKEOPACITY,5,30),BRUSHSHAPE=getRandomFromList(["Line","Ellipse","Triangle"]),HATCHOFFSET=2,CURRENTPIXELDENS=1;const PALETTESYSTEM={Devcon5:{background:"#030708",primaries:["#9EC5AB","#104F55"],hatches:["#166168","#9EC5AB"],rothkoStroke:"#1b1818",dirtline:"#504f4f",dirtCircles:"#32746D"},Feinstaub:{background:"#3d0909",primaries:["#ff993a","#F52F57"],hatches:["#cf6426","#8d0a24"],rothkoStroke:"#1b1818",dirtline:"#a58b8b",dirtCircles:"#747474"},Pfaffstätten:{background:"#09324b",primaries:["#82b1ce","#F3A712"],hatches:["#56a6d8","#F3A712"],rothkoStroke:"#1b1818",dirtline:"#9c9c9c",dirtCircles:"#3180b1"},Suzy:{background:"#490f00ff",primaries:["#eb4a00ff","#4793c2ff"],hatches:["#bd460fff","#30729bff"],rothkoStroke:"#1b1818",dirtline:"#858080",dirtCircles:"#64331cff"},Aneignung:{background:"#3b1628",primaries:["#ca1246","#da4e78"],hatches:["#fa608e","#6e0221"],rothkoStroke:"#1b1818",dirtline:"#7a1f1f",dirtCircles:"#7a3656"},MoltoVolto:{background:"#cccdcd",primaries:["#68a1a1","#815353"],hatches:["#8ab9b9","#633d3d"],rothkoStroke:"#1b1818",dirtline:"#5e5252",dirtCircles:"#797979"},Molto:{background:"#b9b9b9",primaries:["#20cccc","#da4d4d"],hatches:["#3895ac","#a82f2f"],rothkoStroke:"#1b1818",dirtline:"#919191",dirtCircles:"#555454"},"Das Zeitliche":{background:"#1b1818",primaries:["#524747","#687980"],hatches:["#423c3cff","#556266ff"],rothkoStroke:"#272525",dirtline:"#413939",dirtCircles:"#424242"},Frischkäse:{background:"#c9c8ce",primaries:["#d6a076","#6e6f85"],hatches:["#b18563","#43477e"],rothkoStroke:"#3b3939",dirtline:"#707070",dirtCircles:"#5e5e5e"},October:{background:"#c9c8ce",primaries:["#FF6D24","#663c28"],hatches:["#FF6D24","#663c28"],rothkoStroke:"#666666",dirtline:"#707070",dirtCircles:"#777777"},Sebastian:{background:"#c9c8ce",primaries:["#272343","#c5c5c5"],hatches:["#272343","#c5c5c5"],rothkoStroke:"#666666",dirtline:"#707070",dirtCircles:"#777777"},"Kill or die":{background:"#929292",primaries:["#363636","#dfdfdf"],hatches:["#363636","#dfdfdf"],rothkoStroke:"#666666",dirtline:"#707070",dirtCircles:"#777777"}};function preload(){font=loadFont("OpenSans-Regular.ttf");const e=window.location.search,r=new URLSearchParams(e);r.has("highres")&&(CURRENTPIXELDENS=parseInt(r.get("highres"))),r.has("framed")&&"true"===r.get("framed")&&(FRAMED=!0),FRAMED?(setFrameHTML(),setLabelHTML()):setPlainHTML(),setTagsHTML()}function setup(){setAttributes("alpha",!0),noiseSeed(NOISESEED),randomSeed(NOISESEED),scaleDynamically(),canvas=createCanvas(rescaling_width,rescaling_height),canvas.id("badAssCanvas"),FRAMED?canvas.parent("canvasHolderFrame"):canvas.parent("canvasHolderPlain"),BRUSHSIZEMIN=Math.round(BRUSHSIZEMIN/RESCALINGCONSTANT*DOMINANTSIDE*100)/100,BRUSHSIZEMAX=Math.round(BRUSHSIZEMAX/RESCALINGCONSTANT*DOMINANTSIDE*100)/100,BRUSHFIBRESIZE=Math.round(BRUSHFIBRESIZE/RESCALINGCONSTANT*DOMINANTSIDE*100)/100,HATCHOFFSET=Math.round(HATCHOFFSET/RESCALINGCONSTANT*DOMINANTSIDE*100)/100,DISTANCE_BETWEEN_LINES=Math.round(DISTANCE_BETWEEN_LINES/RESCALINGCONSTANT*DOMINANTSIDE*100)/100,HATCHOFFSET=Math.round(HATCHOFFSET/RESCALINGCONSTANT*DOMINANTSIDE*100)/100,backgroundDirtCircles=new dirtCircles({custom_width:width,custom_height:height,margin:0,posX:0,posY:0,fillColor:color(PALETTE.background),fillColorNoise:10,numberQuantisizer:2e3,radiusBase:.75,radiusNoise:.25}),corroded=new Corroded({custom_width:width,custom_height:height,posX:0,posY:0,fillColor:color(PALETTE.background)}),grid=new Grid,NUMBER_OF_GRIDS>=2&&(grid2=new Grid),NUMBER_OF_GRIDS>=3&&(grid3=new Grid)}function draw(){1==frameCount&&(pixelDensity(CURRENTPIXELDENS),background(color(PALETTE.background))),10==frameCount&&(corroded.show(),backgroundDirtCircles.show()),frameCount>=20&&grid.show(20),NUMBER_OF_GRIDS>=2&&grid.boxes_completely_run&&grid2.show(grid.frameCountFinished,!1),NUMBER_OF_GRIDS>=3&&grid.boxes_completely_run&&grid2.boxes_completely_run&&grid3.show(grid2.frameCountFinished,!1),1==NUMBER_OF_GRIDS&&grid.boxes_completely_run&&(ALLDONE=!0),2==NUMBER_OF_GRIDS&&grid.boxes_completely_run&&grid2.boxes_completely_run&&(ALLDONE=!0),3==NUMBER_OF_GRIDS&&grid.boxes_completely_run&&grid2.boxes_completely_run&&grid3.boxes_completely_run&&(ALLDONE=!0),1==ALLDONE&&(console.log("All done"),noLoop(),fxpreview())}function mousePressed(){}choosePalette();