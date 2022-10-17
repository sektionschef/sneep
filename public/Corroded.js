// CORRODED - bubbles that hide background
class Corroded {
    constructor(data) {

        this.custom_width = data.custom_width;
        this.custom_height = data.custom_height;
        this.posX = data.posX;
        this.posY = data.posY;
        this.fillColor = data.fillColor

        this.cellSize = 3;
        this.radius = 15;
        this.maxCell = 100;
        this.cell = this.maxCell * this.cellSize;

        this.scl = this.custom_width / this.cell;
    }

    show() {

        push();
        translate(this.posX, this.posY);
        // background(this.background_color);
        // background(0, 0);
        for (let x = 0; x < this.custom_width; x += this.scl) {
            for (let y = 0; y < this.custom_height; y += this.scl) {
                stroke(200, 20);
                strokeWeight(0.1);
                // noStroke();

                fill(distortColorNew(color(red(this.fillColor), green(this.fillColor), blue(this.fillColor), 2), 20));
                // noFill();
                var r = getRandomFromInterval(this.radius * 0.8, this.radius * 1.2);
                var x_ = getRandomFromInterval(x * 0.8, x * 1.2);
                var y_ = getRandomFromInterval(y * 0.8, y * 1.2);
                rect(x_, y_, r, r);
                // rect(x, y, this.radius);

                // circle(x, y, r);
            }
        }
        pop();

        // return this.buffer;
    }

}