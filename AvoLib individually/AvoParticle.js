let Physics2DObjects = [];
let Physics2DGravity = new V2D(0,9.81);

class Particle2D{
  constructor(x,y,r,mass) {
    this.pos = new V2D(x,y);
    this.vel = new V2D();
    this.acc = new V2D();
    this.mass = mass || 1;
    this.force = new V2D();
    this.rad = r || 10;
    Physics2DObjects.push(this);
  }

  static render(speed) {
    for(let i in Physics2DObjects) {
      Physics2DObjects[i].calcForces(speed || 1);
      Physics2DObjects[i].draw();
      Physics2DObjects[i].acc = new V2D();
      Physics2DObjects[i].force = new V2D();
    }
  }

  calcGravity() {
    this.force = this.force.add(Physics2DGravity.mult(this.mass));
  }

  calcForces(speed) {
    this.calcGravity();
    this.checkGroundCollision();
    this.convertForces(speed);
  }

  convertForces(speed) {
    this.acc = this.force.div(this.mass);
    this.vel = this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel.mult(speed/60));
  }

  checkGroundCollision() {
    if(this.pos.y+this.rad>=Canvas.Element.height) {
      this.pos = new V2D(this.pos.x,Canvas.Element.height-this.rad);
      this.vel.y*=-1;
    }
    if(this.pos.y-this.rad<=0) {
      this.pos = new V2D(this.pos.x,0+this.rad);
      this.vel.y*=-1;
    }
    if(this.pos.x+this.rad>=Canvas.Element.width) {
      this.pos = new V2D(Canvas.Element.width-this.rad,this.pos.y);
      this.vel.x*=-1;
    }
    if(this.pos.x-this.rad<=0) {
      this.pos = new V2D(0+this.rad,this.pos.y);
      this.vel.x*=-1;
    }
  }

  draw() {
    this.pos.draw(this.r,"white");
  }

}
