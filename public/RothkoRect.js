class RothkoRect {

    constructor(data) {

        if (typeof data === 'undefined') {
            data = {
                custom_width: width,
                custom_height: height,
                posX: 0,
                posY: 0,
                elementSizeMin: 10,
                elementSizeMax: 50,
                colorObject: color(PRIMARYCOLOR),
                margin: 50,
                fillColorNoise: 10,
                fillColorOpacity: 10,
                noStroke: true,
                strokeColor: color(50),
                strokeWeight: 10,
                strokeColorNoise: 20,
                strokeOpacity: 50,
                numberQuantisizer: 20,
            }
        }


        this.custom_width = data.custom_width;
        this.custom_height = data.custom_height;
        this.posX = data.posX;
        this.posY = data.posY;
        this.elementSizeMin = data.elementSizeMin;
        this.elementSizeMax = data.elementSizeMax;
        this.margin = data.margin;
        this.fillColor = data.fillColor;
        this.fillColorNoise = data.fillColorNoise;
        this.fillColorOpacity = data.fillColorOpacity;
        this.noStroke = data.noStroke;
        this.strokeColor = data.strokeColor;
        this.strokeWeight = data.strokeWeight;
        this.strokeColorNoise = data.strokeColorNoise;
        this.strokeOpacity = data.strokeOpacity;
        this.numberQuantisizer = data.numberQuantisizer;

        this.area = this.custom_width * this.custom_height;
        this.shapeNumber = this.area / 1000 * this.numberQuantisizer;  // relative to size

        this.elements = []
        color(this.fillColor).setAlpha(this.fillColorOpacity);
        color(this.strokeColor).setAlpha(this.strokeOpacity);

        for (var i = 0; i < this.shapeNumber; i++) {

            let widthShape = getRandomFromInterval(this.elementSizeMin, this.elementSizeMax);
            let heightShape = getRandomFromInterval(this.elementSizeMin, this.elementSizeMax);

            this.elements.push({
                strokeColor: this.strokeColor,
                fillColor: distortColorNew(this.fillColor, this.fillColorNoise),
                widthShape: widthShape,
                heightShape: heightShape,
                strokeSize: this.strokeWeight,
                strokeColor: distortColorNew(this.strokeColor, this.strokeColorNoise),
                posXEl: getRandomFromInterval(this.margin, this.custom_width - this.margin),
                posYEl: getRandomFromInterval(this.margin, this.custom_height - this.margin),
                posXRe: getRandomFromInterval(this.margin, this.custom_width - this.margin),
                posYRe: getRandomFromInterval(this.margin, this.custom_height - this.margin),
            })
        }
    }

    show() {


        for (var element of this.elements) {
            push();
            fill(element.fillColor);
            rectMode(CENTER);
            ellipseMode(CENTER);
            translate((this.posX), (this.posY));
            if (this.noStroke == true) {
                noStroke();
            } else {
                strokeWeight(strokeWeight);
                stroke(element.strokeColor);
            }

            ellipse(element.posXEl, element.posYEl, element.widthShape, element.heightShape);
            rect(element.posXRe, element.posYRe, element.widthShape, element.heightShape);
            pop();
        }

        if (MODE >= 5) {
            push();
            noFill();
            strokeWeight(2);
            stroke("#000000");
            // translate((this.posX + this.custom_width / 2) / exportRatio, (this.posY + this.custom_height / 2) / exportRatio);
            // translate((this.posX + this.custom_width / 2), (this.posY + this.custom_height / 2));
            rectMode(CENTER);
            translate(this.custom_width / 2, this.custom_height / 2, 0);
            // translate(this.margin, this.margin, 0);
            // rect(0, 0, this.custom_width / exportRatio, this.custom_height / exportRatio);
            rect(0, 0, this.custom_width - this.margin * 2, this.custom_height - this.margin * 2);
            pop();
        }
    }

}