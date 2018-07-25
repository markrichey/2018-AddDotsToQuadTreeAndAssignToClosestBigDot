function setup(){     
    // Canvas and build Qt
    createCanvas(1024,500);
    background(0);
    let boundary = new Rectangle(width/2,height/2,width/2,height/2);
    qt = new QuadTree(boundary, 4);

    // 3 Big Dots
    bigDot = [];
    bigDot.push(new Point(random(width),random(height)));
    bigDot.push(new Point(random(width),random(height)));
    bigDot.push(new Point(random(width),random(height)));

    // Draw for the 3 Big Dots
    stroke(0,255,255);
    strokeWeight(10);
    point(bigDot[0].x,bigDot[0].y);
    stroke(255,0,255);
    point(bigDot[1].x,bigDot[1].y);
    stroke(255,255,0);
    point(bigDot[2].x,bigDot[2].y);

    // Random Points ******************************************
    /*for(let i = 0; i < 500; i++){
        let p = new Point(random(width),random(height));
        qt.insert(p,-1);
    }
    qt.show();*/
    // Random Points ******************************************
}

// Add Point to Qt and Draw It
function mousePressed(){ 
    let p = new Point(mouseX,mouseY);
    qt.insert(p,-1); // -1 so that we allocate it.
    qt.show();
}