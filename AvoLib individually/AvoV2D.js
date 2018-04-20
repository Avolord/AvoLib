class V2D {
  constructor(x,y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  value() {
    return AM.Pythag([this.x,this.y]);
  }

  valueSq() {
    return this.x*this.x+this.y*this.y;
  }

  norm(length) {
    if(length) {
      return this.div(this.value()).mult(length || 1)
    } else {
      return this.div(this.value());
    }
  }

  invert() {
    return new V2D(-this.x,-this.y);
  }

  invertX() {
    return new V2D(-this.x,this.y);
  }

  invertY() {
    return new V2D(this.x,-this.y);
  }

  mix(V2, amount) {
    return this.add(V2.sub(this).mult(amount || 1));
  }

  mixX(V2, amount) {
    return new V2D(this.x+(V2.x-this.x)*(amount || 1),this.y);
  }

  mixY(V2, amount) {
    return new V2D(this.x,this.y+(V2.y-this.y)*(amount || 1));
  }

  limit(value, amount) {
    const x = (this.x>value) ? this.x*amount : this.x;
    const y = (this.y>value) ? this.y*amount : this.y;
    return new V2D(x,y);
  }


  div(v) {
    if(v instanceof V2D) {
      return new V2D(this.x/v.x,this.y/v.y);
    } else {
      return new V2D(this.x/v,this.y/v);
    }
  }

  divX(v) {
    if(v instanceof V2D) {
      return new V2D(this.x/v.x,this.y);
    } else {
      return new V2D(this.x/v,this.y);
    }
  }

  divY(v) {
    if(v instanceof V2D) {
      return new V2D(this.x,this.y/v.y);
    } else {
      return new V2D(this.x,this.y/v);
    }
  }

  mult(v) {
    if(v instanceof V2D) {
      return new V2D(this.x*v.x,this.y*v.y);
    } else {
      return new V2D(this.x*v,this.y*v);
    }
  }

  multX(v) {
    if(v instanceof V2D) {
      return new V2D(this.x*v.x,this.y);
    } else {
      return new V2D(this.x*v,this.y);
    }
  }

  multY(v) {
    if(v instanceof V2D) {
      return new V2D(this.x,this.y*v.y);
    } else {
      return new V2D(this.x,this.y*v);
    }
  }

  add(v) {
    if(v instanceof V2D) {
      return new V2D(this.x+v.x,this.y+v.y);
    } else {
      return new V2D(this.x+v,this.y+v);
    }
  }

  addX(v) {
    if(v instanceof V2D) {
      return new V2D(this.x+v.x,this.y);
    } else {
      return new V2D(this.x+v,this.y);
    }
  }

  addY(v) {
    if(v instanceof V2D) {
      return new V2D(this.x,this.y+v.y);
    } else {
      return new V2D(this.x,this.y+v);
    }
  }

  sub(v) {
    if(v instanceof V2D) {
      return new V2D(this.x-v.x,this.y-v.y);
    } else {
      return new V2D(this.x-v,this.y-v);
    }
  }

  subX(v) {
    if(v instanceof V2D) {
      return new V2D(this.x-v.x,this.y);
    } else {
      return new V2D(this.x-v,this.y);
    }
  }

  subY(v) {
    if(v instanceof V2D) {
      return new V2D(this.x,this.y-v.y);
    } else {
      return new V2D(this.x,this.y-v);
    }
  }

  absDiff(V2) {
    return new V2D(Math.abs(this.x-V2.x),Math.abs(this.y-V2.y));
  }

  dotP(V2) {
    return this.x*V2.x+this.y*V2.y;
  }

  crossP(V2) {
    return this.x*V2.x-this.y*V2.y;
  }

  Vangle(V2) {
    return AM.radians( AM.acos( this.dotP(V2) / ( this.value() * V2.value() )));
  }

  dist(V2) {
    return this.absDiff(V2).value();
  }

  distSq(V2) {
    return (this.x-V2.x)*(this.x-V2.x)+(this.y-V2.y)*(this.y-V2.y);
  }

  distX(V2) {
    return this.x-V2.x;
  }

  distY(V2) {
    return this.y-V2.y;
  }

  absDistX(V2) {
    return Math.abs(this.x-V2.x);
  }

  absDistY(V2) {
    return Math.abs(this.y-V2.y);
  }

  clone() {
    return new V2D(this.x,this.y);
  }

  copy(V2) {
    this.x = V2.x;
    this.y = V2.y;
  }

  copyX(V2) {
    this.x = V2.x;
  }

  copyY(V2) {
    this.x = V2.x;
  }

  show() {
    Canvas.Dot(this.x,this.y);
  }

  toString() {
    return "=> x:"+this.x+" , y:"+this.y;
  }

  toArray() {
    return [this.x,this.y]
  }

  toObject() {
    return {x:this.x,y:this.y}
  }

  unfloat() {
    return new V2D(Math.round(this.x),Math.round(this.y));
  }

  max() {
    return new V2D(Math.ceil(this.x),Math.ceil(this.y));
  }

  min() {
    return new V2D(Math.floor(this.x),Math.floor(this.y));
  }

  randomize(topLeft, bottomRight) {
    return new V2D(AM.RandInt(topLeft.x,bottomRight.x-topLeft.x),AM.RandInt(topLeft.y,bottomRight.y-topLeft.y))
  }

  randomizeX(topLeft, bottomRight) {
    return new V2D(this.x,AM.RandInt(topLeft.y,bottomRight.y-topLeft.y))
  }

  randomizeY(topLeft, bottomRight) {
    return new V2D(AM.RandInt(topLeft.x,bottomRight.x-topLeft.x),this.y)
  }

  Rectangle(Corner2,color,style) {
    Canvas.Rectangle(this.x,this.y,Corner2.distX(this),Corner2.distY(this),style,color);
  }

  CircleCENTER(Corner2,color,style) {
    Canvas.Circle(this.x,this.y,this.dist(Corner2),style,color);
  }

  Circle(Corner2,color,style) {
    let x = this.x+Corner2.distX(this)/2,
        y = this.y+Corner2.distY(this)/2,
        r = this.dist(Corner2)/2;
    Canvas.Circle(x,y,r,style,color);
  }

  draw(size,color) {
    Canvas.Circle(this.x,this.y,size || 5,"",color || "white");
  }

  Connect(V2,color) {
    Canvas.Line(this.x,this.y,V2.x,V2.y,color || "white");
  }

  Orthogonal() {
    return new V2D(-this.y,this.x);
  }

  CheckOrthog(V2) {
    if(this.dotP(V2)==0)
    return true
    else
    return false
  }

  rotate(angle,length) {
    return new V2D(AM.cos(angle)*(length || 100),AM.sin(angle)*(length || 100));
  }

  rotateAround(V2,angle,length) {
    return new V2D(AM.cos(angle)*(length || 100)+V2.x,AM.sin(angle)*(length || 100)+V2.y);
  }

  SCHNITT(P1,P2,P3) {
    let rv2 = P1.sub(this);
    let rv1 = P3.sub(P2);
    const dx = this.x-P2.x;
    const dy = this.y-P2.y;
    let sol1 =  (dy*rv1.x-dx*rv1.y)/((-rv2.y)*rv1.x+rv2.x*rv1.y);
    let sol2 =  ((-rv2.x)*dy+rv2.y*dx)/((-rv2.x)*rv1.y+rv2.y*rv1.x);
    //Canvas.Dot(this.x+rv2.x*sol1,this.y+rv2.y*sol1,"blue");
    if(!sol1 || !sol2 || sol2<0 || sol2>1) {sol1=1.1}
    return sol1
  }

}

class randVec2D extends V2D {
  constructor(topLeft, bottomRight) {
    super();
    this.x = AM.RandInt(topLeft.x,bottomRight.x-topLeft.x);
    this.y = AM.RandInt(topLeft.y,bottomRight.y-topLeft.y);
  }
}
