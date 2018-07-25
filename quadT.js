class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point){
        return(point.x > this.x - this.w &&
        point.x < this.x + this.w &&
        point.y > this.y - this.h &&
        point.y < this.y + this.h
        );
    }

    intersects(range){
        return !(range.x - range.w > this.x + this.w ||
        range.x + range.w < this.x - this.w ||
        range.y - range.h > this.y + this.h ||
        range.y + range.h < this.y - this.h
        );
    }
}

class QuadTree{
    constructor(boundary, capacity){
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.forBigDot = [];
        this.devided = false;
    }

    subdevide(){
        this.northWest = new QuadTree(new Rectangle(
            this.boundary.x - (this.boundary.w / 2),
            this.boundary.y - (this.boundary.h / 2),
            this.boundary.w / 2,
            this.boundary.h / 2
        ),this.capacity);
        this.northEast = new QuadTree(new Rectangle(
            this.boundary.x + (this.boundary.w / 2),
            this.boundary.y - (this.boundary.h / 2),
            this.boundary.w / 2,
            this.boundary.h / 2
        ),this.capacity);
        this.southWest = new QuadTree(new Rectangle(
            this.boundary.x - (this.boundary.w / 2),
            this.boundary.y + (this.boundary.h / 2),
            this.boundary.w / 2,
            this.boundary.h / 2
        ),this.capacity);
        this.southEast = new QuadTree(new Rectangle(
            this.boundary.x + (this.boundary.w / 2),
            this.boundary.y + (this.boundary.h / 2),
            this.boundary.w / 2,
            this.boundary.h / 2
        ),this.capacity);
        this.devided = true;
    }

    fakeDistanceCalc(pointFrom,pointTo){
        return Math.sqrt(Math.pow(pointFrom.x - pointTo.x,2) + Math.pow(pointFrom.y - pointTo.y,2));
    }

    insert(point,allocateTo){
        if(!this.boundary.contains(point)){
            return;
        }

        if(!this.devided){
            if(this.points.length < this.capacity){
                this.points.push(point);
                if(allocateTo == -1){
                    // Allocate to the closest big Dot.
                    allocateTo = 9; // Not Allocated
                    let distanceCalc = 99999999999999999999999999999999999999999999; // Silly Number
                    for(let o = 0; o < bigDot.length; o++){
                        if(this.fakeDistanceCalc(point,bigDot[o]) <= distanceCalc){
                            allocateTo = o;
                            distanceCalc = this.fakeDistanceCalc(point,bigDot[o]);
                        }
                    }
                    this.forBigDot.push(allocateTo);
                }else{
                    this.forBigDot.push(allocateTo);
                }
                return;
            }else{
                this.subdevide();
                for(let p = 0; p <this.points.length; p++){
                    this.insert(this.points[p],this.forBigDot[p]);
                }
                this.points = [];
                this.insert(point,allocateTo);
            }
        }else{
            this.northEast.insert(point,allocateTo);
            this.northWest.insert(point,allocateTo);
            this.southEast.insert(point,allocateTo);
            this.southWest.insert(point,allocateTo);
        }
    }

    query(range,found){
        if(!found){
            found = [];
        }
        if(!this.boundary.intersects(range)){
            return;
        }else{
            // Check Points
            for(let p of this.points){
                if(range.contains(p)){
                    found.push(p);
                }
            }
        }
        // Recursion eeek
        if(this.devided){
            this.northEast.query(range,found);
            this.northWest.query(range,found);
            this.southEast.query(range,found);
            this.southWest.query(range,found);
        }
        // Return
        return found;
    }

    /* P5 Dependant */
    show(){
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        
        strokeWeight(4);
        for(let p = 0; p <this.points.length; p++){
            if(this.forBigDot[p] == 0){stroke(0,255,255);}
            if(this.forBigDot[p] == 1){stroke(255,0,255);}
            if(this.forBigDot[p] == 2){stroke(255,255,0);}
            point(this.points[p].x,this.points[p].y);
        }

        if(this.devided){
            this.northEast.show();
            this.northWest.show();
            this.southEast.show();
            this.southWest.show();
        }

    }
}