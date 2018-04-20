class Stochastics {
  constructor(InputArray) {
    this.values = Sort.Bubble(InputArray);
    this.amount = InputArray.length;
    this.CalculateDifferent();
    this.CalculateAbsolute();
    this.CalculateRelative();
    this.CalculateAverage();
    this.CalculateDeviation();
    this.CalculateInterval();
    this.CheckGaussian();
  }

  CalculateDifferent() {
    this.diff = [];
    let tempArr = AM.copyArray(this.values);
    let temp = tempArr[tempArr.length-1];
    while(tempArr.length>0) {
      this.diff.push(temp)
      for(let i = tempArr.length-1;i>=0;i--) {
        if(tempArr[i] == temp) {
          tempArr.pop();
        }
      }
      temp = tempArr[tempArr.length-1];
    }
    this.diff = Sort.Bubble(this.diff);
  }

  CalculateAbsolute() {
    this.abs = new Array(this.diff.length);
    for(let i in this.diff) {
      this.abs[i] = AM.countinArr(this.values,this.diff[i]);
    }
  }

  CalculateRelative() {
    this.rel = AM.copyArray(this.abs);
    this.rel = AM.ArrayDiv(this.rel,this.amount);
  }

  CalculateAverage() {
    this.average = 0;
    for(let i in this.abs) {
      this.average += this.diff[i]*this.rel[i];
    }
  }

  CalculateDeviation() {
    this.deviation = 0;
    for(let i in this.abs) {
      this.deviation += Math.pow(this.diff[i]-this.average,2) * this.rel[i];
    }
    this.deviation = Math.sqrt(this.deviation);
  }

  CalculateInterval() {
    this.Interval = {min:0,max:0};
    this.Interval.min = this.average-this.deviation;
    this.Interval.max = this.average+this.deviation;
  }

  CheckGaussian() {
    let result = 0;
    for(let i in this.values) {
      if(this.values[i]<this.Interval.min || this.values[i]>this.Interval.max) {
        result++;
      }
    }
    this.PartOfInterval = AM.smooth(1-result/this.amount);
  }

  createGraphic(x,y,w,h,color1,color2) {
    let width = w/this.diff.length-2;
    for(let i in this.diff) {
      const offset = (width+2)*i;
      const size = (h+w)/(4*1.2*this.diff.length);
      Canvas.Rectangle(x+offset,y+h,width,-AM.map(this.rel[i],0,1,0,h),"fill",color2 || "red");
      Canvas.Write(x+offset+width/2,y+h+size,this.diff[i],size,color1 || "white");
    }
    Canvas.Rectangle(x,y,w,h,"stroke",color1 || "white");
  }



}

function Bernoulli(n,p,a,b) {
	let result = 0;
	for(let i=a;i<=b;i++) {
		result += BernoulliSingleRun(n,i,p);
	}
	return result;
}


function BernoulliSingleRun(n,r,p) {
  let zaehler = 1;
  let nenner  = 1;
  for(let i=1;i<=r;i++) {nenner*=i}
  for(let i=(n-r)+1;i<=n;i++) {zaehler*=i}
  const Coeff = zaehler/nenner;
  return Coeff*Math.pow(p,r)*Math.pow(1-p,n-r);
}
