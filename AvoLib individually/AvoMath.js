class AM {
static Pythag(Arr) {
let sum = Arr.map(x => x*x);
    sum = sum.reduce((a,b) => a + b , 0);
    return Math.sqrt(sum)
}


static radians  (a) {return a*(Math.PI/180)};

static cos  (a)  {return Math.cos(a)};
static sin  (a)  {return Math.sin(a)};
static tan  (a)  {return Math.tan(a)};
static acos  (a) {return Math.acos(a)};
static asin  (a) {return Math.asin(a)};
static atan  (a) {return Math.atan(a)};


static root (a,b)  {return Math.pow(a,1/b)};
static pow  (a,b)   {return Math.pow(a,b)};

static fak  (a)  {
  let n = (a!=0) ? 1 : 1;
  for(let i=1;i<=a;i++) {
    n*=i;
  }
  return n
}

static PQ  (p,q)  {
  const a = (-p/2);
  const b = AM.root( AM.pow( (p/2) , 2) -q,2);
  return [a+b,a-b];
}

static round  (num,didgets)  {return Math.round(num*AM.pow(10,didgets))/AM.pow(10,didgets)};

static map  (input,start,stop,min,max)  {return (input-start)*((max-min)/(stop-start))+min};

static RandInt  (start,stop)  {return Math.round(Math.random()*stop+start)};

static smooth(a) {return Math.round(a*100000)/100000}

static calcDist  (x,y,x2,y2)  {
  const dx = x-x2;
  const dy = y-y2;
  return AM.Pythag([dy,dx]);
}

static calcDist2  (x,y,x2,y2)  {
  const dx = x-x2;
  const dy = y-y2;
  return AM.Pythag2([dy,dx]);
}

//Physics
static Force  (m,a)  {return m*a};
static Work  (F,s,alpha)  {return F*s*AM.cos(alpha)};
static constacc  (v,t)  {return v/t};
static contacc  (a,t)  {return 0.5*a*AM.pow(t,2)};
static vel  (s,t)  {return s/t};
static weight  (mass)  {return mass*World.Grav};
static GravConst()  {return 6.672*AM.pow(10,-11)};
static vLight()  {return 299792458};
static GravForce  (mass1,mass2,distance)  {return (GravConst*mass1*mass2)/AM.pow(distance,2)}
//Physics End

//Waves
static WaveEquation(ymax,t,T,x,Lambda) {return ymax*MA.sin(2*PI)*(t/T-x/Lambda)}
static Reflexion(alpha) {return alpha};
//Waves End

static Matrix() {
  let result = [];
  for(let i=0;i<arguments.length;i++) {
    arguments[i].splice
    result.push(arguments[i]);
  }
  return result;
}

static ArrayAdd (A1,A2) {
  let result = [];
  length = (A1.length>A2.length) ? A1.length : A2.length;
  for(let i=0;i<length;i++) {
    const val1 = (A1[i]==undefined)? 0 : A1[i];
    const val2 = (A2[i]==undefined)? 0 : A2[i];
    result.push(val1+val2);
  }
  return result;
}

static ArraySub  (A1,A2) {
  let result = [];
  length = (A1.length>A2.length) ? A1.length : A2.length;
  for(let i=0;i<length;i++) {
    const val1 = (A1[i]==undefined)? 0 : A1[i];
    const val2 = (A2[i]==undefined)? 0 : A2[i];
    result.push(val1-val2);
  }
  return result;
}

static ArrayMult(Arr,number) {
  let result = [];
  for(let i=0,n=Arr.length;i<n;i++) {
    result.push(Arr[i]*number);
  }
  return result;
}

static ArrayDiv(Arr,number) {
  let result = [];
  for(let i=0,n=Arr.length;i<n;i++) {
    result.push(Arr[i]/number);
  }
  return result;
}

static Vvalue(V) {
  return AM.Pythag(V);
}

static Vnorm(V) {
  return AM.ArrayDiv(V,AM.Vvalue(V));
}

static Vangle(V1,V2) {
  const angle = AM.acos(AM.DotProduct(V1,V2)/(AM.Vvalue(V1)*AM.Vvalue(V2)));
  return AM.radians(angle);
}

static DotProduct(A1,A2) {
  let result = 0;
  length = (A1.length>A2.length) ? A1.length : A2.length;
  for(let i=0;i<length;i++) {
    const val1 = (A1[i]==undefined)? 0 : A1[i];
    const val2 = (A2[i]==undefined)? 0 : A2[i];
    result+=(val1*val2);
  }
  return result;
}

static randomArray(start,end,length) {
  let Arr = new Array(length || 1);
  for(let i= 0;i<length;i++) {
    Arr[i] = AM.RandInt(start,end);
  }
  return Arr;
}

static countinArr(Arr,entity) {
  let result = 0;
  for(let i in Arr) {
    result = (Arr[i]==entity) ? result+1 : result;
  }
  return result;
}

static copyArray(A) {
  let Arr = new Array(A.length);
  for(let i in A) {
    Arr[i] = A[i];
  }
  return Arr;
}

static TransformLinEqu(A1,A2){
  let Arr1 = A1;
  let Arr2 = A2;
  for(let i=0,n=Arr1.length;i<n;i++) {
    if(Arr2[i][1] != undefined && Arr2[i][1]!=0) {
    Arr1[i].push(-Arr2[i][1]);
    Arr2[i].splice(1,2);
  }
    Arr2[i][0]-=Arr1[i][0];
    Arr1[i].splice(0,1)
    Arr1[i].push(Arr2[i][0])
  }
  return Arr1;
}

static MatrixAdd(Ma1,Ma2) {
  let EArr = [0,0,0];
  let result = [];
  const length = (Ma1.length>Ma2.length) ? Ma1.length : Ma2.length;
  for(let i=0;i<length;i++) {
    if(Ma1[i]==undefined) {
      result.push(AM.ArrayAdd(Ma2[i],EArr));
      continue;
    }
    if(Ma2[i]==undefined) {
      result.push(AM.ArrayAdd(Ma1[i],EArr));
      continue;
    }
    result.push(AM.ArrayAdd(Ma1[i],Ma2[i]));
  }
  return result;
}

static MatrixSub(Ma1,Ma2){
  let EArr = [0,0,0];
  let result = [];
  const length = (Ma1.length>Ma2.length) ? Ma1.length : Ma2.length;
  for(let i=0;i<length;i++) {
    if(Ma1[i]==undefined) {
      result.push(AM.ArraySub(Ma2[i],EArr));
      continue;
    }
    if(Ma2[i]==undefined) {
      result.push(AM.ArraySub(Ma1[i],EArr));
      continue;
    }
    result.push(AM.ArraySub(Ma1[i],Ma2[i]));
  }
  return result;
}

static MatrixMult(Matrix,number) {
  let result = [];
  for(let i=0,n=Matrix.length;i<n;i++) {
    result.push(AM.ArrayMult(Matrix[i],number));
  }
  return result;
}

static MatrixDiv(Matrix,number) {
  let result = [];
  for(let i=0,n=Matrix.length;i<n;i++) {
    result.push(AM.ArrayDiv(Matrix[i],number));
  }
  return result;
}

static Gaussian(A) {
  var n = A.length;
    for (var i=0; i<n; i++) {
        var maxEl = Math.abs(A[i][i]);
        var maxRow = i;
        for(var k=i+1; k<n; k++) {
            if (Math.abs(A[k][i]) > maxEl) {
                maxEl = Math.abs(A[k][i]);
                maxRow = k;
            }
        }
        for (var k=i; k<n+1; k++) {
            var tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }
        for (k=i+1; k<n; k++) {
            var c = -A[k][i]/A[i][i];
            for(var j=i; j<n+1; j++) {
                if (i==j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
        }
    }
    var x= new Array(n);
    for (var i=n-1; i>-1; i--) {
        x[i] = A[i][n]/A[i][i];
        for (var k=i-1; k>-1; k--) {
            A[k][n] -= A[k][i] * x[i];
        }
    }
    return x;
}

static CheckOrthog(V1,V2) {
  if(AM.DotProduct(V1,V2)==0)
    return "Die Vektoren sind Orthogonal!";
  else {
    return "Die Vektoren sind nicht Orthogonal!";
  }
}

static convertFunc(funcArr,start) {
  let x = (start) ? start : "x";
  let func = "f("+x+")=";
      x = (start) ? "*"+start : "x";
      console.log(funcArr);
  for(let i=funcArr.length-1;i>=0;i--) {
    if(funcArr[i]==0) {continue}
    let curr = (i>1) ? funcArr[i]+x+AM.AsciiExp(i)+"+" : funcArr[i]+x+"+";
        curr = (i==1) ? funcArr[i]+"x+" : curr;
        curr = (i==0) ? funcArr[i] : curr;
        curr = (i==1 && funcArr[i-1]==0) ? funcArr[i]+"x" : curr
    func = func.concat(curr);
  }
  return func;
}

static calcFunc(Func,x,show) {
  let result = 0;
  for(let i=Func.length-1;i>0;i--) {
    const curr = AM.pow(x,i);
    result+=Func[i]*curr;
  }
    result+=Func[0];
    if (show==true) {console.log (AM.convertFunc(Func,x)+" = "+result);}
    return result;
}

static derive(Func,amount,show) {
  let result = Func;
  const am = (amount) ? amount : 1;
  for(let z=0;z<am;z++) {
  for(let i=Func.length-1;i>0;i--) {
    result[i]*=i;
  }
  result.splice(0,1);
}
  if (show==true) {console.log (AM.convertFunc(result))}
  return result;
}

static primitive(Func,amount,show) {
  let result = Func;
  const am = (amount) ? amount : 1;
  for(let z=0;z<am;z++) {
  for(let i=Func.length-1;i>0;i--) {
    result[i]/=(i+1);
  }
  result.unshift(0);
}
  if (show==true) {console.log (AM.convertFunc(result))}
  return result;
}

static Integral(upper,lower,Func) {
  let result;
  const CurrFunc = AM.primitive(Func);
  return AM.calcFunc(CurrFunc,upper)-AM.calcFunc(CurrFunc,lower)
}

static calcZero(Func) {
  if(Func.length==3) {
    return AM.PQ(Func[1],Func[0]);
  }
  if(Func.length==2) {
    return -Func[0]/Func[1];
  }
}

static FuncAreaX(Func) {
  const Zeros = AM.calcZero(Func);
  const upper = (Zeros[0]>Zeros[1]) ? Zeros[0] : Zeros[1];
  const lower = (Zeros[0]<Zeros[1]) ? Zeros[0] : Zeros[1];
  return Math.abs(AM.Integral(upper,lower,Func));
}

static AsciiExp(exp) {
  let exponent;
  switch(exp) {
    case 0:
    exponent = "\u2070";
    break;
    case 1:
    exponent = "\u00B9";
    break;
    case 2:
    exponent = "\u00B2";
    break;
    case 3:
    exponent = "\u00B3";
    break;
    case 4:
    exponent = "\u2074"
    break;
    case 5:
    exponent = "\u2075"
    break;
    case 6:
    exponent = "\u2076"
    break;
    case 7:
    exponent = "\u2077"
    break;
    case 8:
    exponent = "\u2078"
    break;
    case 9:
    exponent = "\u2079"
    break;
    default:
    exponent = AM.AsciiExp((exp-exp%10)/10)+AM.AsciiExp(exp%10);
    break;
  }
  return exponent
}

static renderHarmonic(type,stepsize) {
  cclear();
  AM.CoordSys();
  stepsize = (stepsize) ? stepsize : 10;
  ctx.translate(c.width/2,c.height/2);
  ctx.beginPath();

    switch(type) {
      case "cos":
      ctx.moveTo(-c.width/2,-AM.cos(-c.width/2)*stepsize);
      break;
      case "sin":
      ctx.moveTo(-c.width/2,-AM.sin(-c.width/2)*stepsize);
      break;
      case "tan":
      ctx.moveTo(-c.width/2,-AM.tan(-c.width/2)*stepsize);
      break;
      case "acos":
      ctx.moveTo(-c.width/2,-AM.acos(-c.width/2)*stepsize);
      break;
      case "asin":
      ctx.moveTo(-c.width/2,-AM.asin(-c.width/2)*stepsize);
      break;
      case "atan":
      ctx.moveTo(-c.width/2,-AM.atan(-c.width/2)*stepsize);
      break;
    }
  for(let i=-c.width/2;i<c.width;i++) {
    switch(type) {
      case "cos":
      ctx.lineTo(i,-AM.cos(i/stepsize)*stepsize);
      break;
      case "sin":
      ctx.lineTo(i,-AM.sin(i/stepsize)*stepsize);;
      break;
      case "tan":
      ctx.lineTo(i,-AM.tan(i/stepsize)*stepsize);
      break;
      case "acos":
      ctx.lineTo(i,-AM.acos(i/stepsize)*stepsize);
      break;
      case "asin":
      ctx.lineTo(i,-AM.asin(i/stepsize)*stepsize);
      break;
      case "atan":
      ctx.lineTo(i,-AM.atan(i/stepsize)*stepsize);
      break;
    }
  }
  ctx.stroke();
  ctx.translate(-c.width/2,-c.height/2);
}

static renderFunc(Func,stepsize) {
  cclear();
  AM.CoordSys();
  stepsize = (stepsize) ? stepsize : 10;
  ctx.translate(c.width/2,c.height/2);
  ctx.beginPath();
  ctx.moveTo(-c.width/2,-AM.calcFunc(Func,-c.width/2));
for(let i=-c.width/2;i<c.width;i+=stepsize) {
  ctx.lineTo(i,-AM.calcFunc(Func,i/stepsize));
}
ctx.stroke();
  ctx.translate(-c.width/2,-c.height/2);
}

static CoordSys() {
  ctx.beginPath();
  ctx.moveTo(0,c.height/2);
  ctx.lineTo(c.width,c.height/2);
  ctx.moveTo(c.width/2,0);
  ctx.lineTo(c.width/2,c.height);
  ctx.stroke();
}

}
