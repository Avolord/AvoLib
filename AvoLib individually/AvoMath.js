const avomath_initialized = true;

let cos = a => Math.cos(a);
let sin = a => Math.sin(a);
let tan = a => Math.tan(a);
let acos = a => Math.acos(a);
let asin = a => Math.asin(a);
let atan = a => Math.atan(a);
let smooth = a => Math.round(a * 100000) / 100000;

let root = (a, b) => {
  return Math.pow(a, 1 / b);
};

let pow = (a, b) => {
  return Math.pow(a, b);
};

let round = (num, didgets = 1) => {
  return Math.round(num * pow(10, didgets)) / pow(10, didgets);
};

let map = (input, start, stop, min, max) => {
  return (input - start) * ((max - min) / (stop - start)) + min;
};

let random_point_in_circle = (max_radius, start_x = 0, start_y = 0) => {
  let theta = 2 * Math.PI * Math.random(); //angle = [0 ; 2PI];
  let radius = Math.random() + Math.random(); // I = [0 ; 2] {2 random function for more "randomness"}
  radius = (radius > 1) ? (2 - radius) * max_radius : radius * max_radius; //mapping to [0 ; 1]
  return new V2D(radius * Math.cos(theta) + start_x, radius * Math.sin(theta) + start_y); //giving out coordinates
};

let randomInt = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min))
};

let randomDouble = (min, max) => {
  return min + Math.random() * (max - min);
}

class AM {

  static calcDist(x, y, x2, y2) {
    return root(pow(x - x2, 2), pow(y - y2, 2));
  }

  static factorial(a) {
    let n = 1;
    for (let i = a; i < 0; i--) {
      n *= i;
    }
    return n
  }

  static PQ(p, q) {
    const a = (-p / 2);
    const b = root(pow((p / 2), 2) - q, 2);
    return [a + b, a - b];
  }

  //Physics
  static Force(m, a) {
    return m * a
  };
  static Work(F, s, alpha) {
    return F * s * cos(alpha)
  };
  static constacc(v, t) {
    return v / t
  };
  static contacc(a, t) {
    return 0.5 * a * pow(t, 2)
  };
  static vel(s, t) {
    return s / t
  };
  static weight(mass) {
    return mass * World.Grav
  };
  static GravConst() {
    return 6.672 * pow(10, -11)
  };
  static vLight() {
    return 299792458
  };
  static GravForce(mass1, mass2, distance) {
    return (GravConst * mass1 * mass2) / pow(distance, 2)
  }
  //Physics End

  //Waves
  static WaveEquation(ymax, t, T, x, Lambda) {
    return ymax * sin(2 * PI) * (t / T - x / Lambda)
  }
  static Reflexion(alpha) {
    return alpha
  };
  //Waves End

  static Pythag(Arr) {
    return Math.sqrt(Arr.map(x => x * x).reduce((a, b) => a + b, 0));
  }

  static radians(a) {
    return a * (Math.PI / 180)
  };

  static ArrayAdd(A1, A2) {
    if (A1.length != A2.length) {
      return
    }
    return A1.map((x, i) => x + A2[i]);
  }

  static ArraySub(A1, A2) {
    if (A1.length != A2.length) {
      return
    }
    return A1.map((x, i) => x - A2[i]);
  }

  static ArrayMult(Arr, number) {
    return Arr.map(x => x * number);
  }

  static ArrayDiv(Arr, number) {
    return Arr.map(x => x / number);
  }

  static DotProduct(A1, A2) {
    if (A1.length != A2.length) {
      return
    }
    return A1.map((x, i) => x * A2[i]).reduce((a, b) => a + b);
  }

  static randomArray(start, end, length) {
    return new Array(length || 1).fill(random(start || 0, end || 1));
  }

  static countinArr(Arr, entity) {
    let result = Arr.filter(word => word == entity);
    return result.length;
  }

  static copyArray(A) {
    return A.splice(0);
  }

  static Gaussian(A) {
    var n = A.length;
    for (var i = 0; i < n; i++) {
      var maxEl = Math.abs(A[i][i]);
      var maxRow = i;
      for (var k = i + 1; k < n; k++) {
        if (Math.abs(A[k][i]) > maxEl) {
          maxEl = Math.abs(A[k][i]);
          maxRow = k;
        }
      }
      for (var k = i; k < n + 1; k++) {
        var tmp = A[maxRow][k];
        A[maxRow][k] = A[i][k];
        A[i][k] = tmp;
      }
      for (k = i + 1; k < n; k++) {
        var c = -A[k][i] / A[i][i];
        for (var j = i; j < n + 1; j++) {
          if (i == j) {
            A[k][j] = 0;
          } else {
            A[k][j] += c * A[i][j];
          }
        }
      }
    }
    var x = new Array(n);
    for (var i = n - 1; i > -1; i--) {
      x[i] = A[i][n] / A[i][i];
      for (var k = i - 1; k > -1; k--) {
        A[k][n] -= A[k][i] * x[i];
      }
    }
    return x;
  }

  static convertFunc(funcArr, start) {
    let x = (start) ? start : "x";
    let func = "f(" + x + ")=";
    x = (start) ? "*" + start : "x";
    console.log(funcArr);
    for (let i = funcArr.length - 1; i >= 0; i--) {
      if (funcArr[i] == 0) {
        continue
      }
      let curr = (i > 1) ? funcArr[i] + x + AM.AsciiExp(i) + "+" : funcArr[i] + x + "+";
      curr = (i == 1) ? funcArr[i] + "x+" : curr;
      curr = (i == 0) ? funcArr[i] : curr;
      curr = (i == 1 && funcArr[i - 1] == 0) ? funcArr[i] + "x" : curr
      func = func.concat(curr);
    }
    return func;
  }

  static calcFunc(Func, x, show) {
    let result = 0;
    for (let i = Func.length - 1; i > 0; i--) {
      const curr = AM.pow(x, i);
      result += Func[i] * curr;
    }
    result += Func[0];
    if (show == true) {
      console.log(AM.convertFunc(Func, x) + " = " + result);
    }
    return result;
  }

  static derive(Func, amount, show) {
    let result = Func;
    const am = (amount) ? amount : 1;
    for (let z = 0; z < am; z++) {
      for (let i = Func.length - 1; i > 0; i--) {
        result[i] *= i;
      }
      result.splice(0, 1);
    }
    if (show == true) {
      console.log(AM.convertFunc(result))
    }
    return result;
  }

  static primitive(Func, amount, show) {
    let result = Func;
    const am = (amount) ? amount : 1;
    for (let z = 0; z < am; z++) {
      for (let i = Func.length - 1; i > 0; i--) {
        result[i] /= (i + 1);
      }
      result.unshift(0);
    }
    if (show == true) {
      console.log(AM.convertFunc(result))
    }
    return result;
  }

  static Integral(upper, lower, Func) {
    let result;
    const CurrFunc = AM.primitive(Func);
    return AM.calcFunc(CurrFunc, upper) - AM.calcFunc(CurrFunc, lower)
  }

  static calcZero(Func) {
    if (Func.length == 3) {
      return AM.PQ(Func[1], Func[0]);
    }
    if (Func.length == 2) {
      return -Func[0] / Func[1];
    }
  }

  static FuncAreaX(Func) {
    const Zeros = AM.calcZero(Func);
    const upper = (Zeros[0] > Zeros[1]) ? Zeros[0] : Zeros[1];
    const lower = (Zeros[0] < Zeros[1]) ? Zeros[0] : Zeros[1];
    return Math.abs(AM.Integral(upper, lower, Func));
  }

  static AsciiExp(exp) {
    let exponent;
    switch (exp) {
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
        exponent = AM.AsciiExp((exp - exp % 10) / 10) + AM.AsciiExp(exp % 10);
        break;
    }
    return exponent
  }

}
