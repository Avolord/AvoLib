class Matrix{
  constructor() { //When inp to integers it`ll be handeld as collums and rows filled with 0
    this.Matrix = [];
    for(let i=0;i<arguments.length;i++) {
      arguments[i].splice
      this.Matrix.push(arguments[i]);
    }
    if(arguments.length==2 && typeof arguments[0] != Array && typeof arguments[1] != Array) {
      this.Matrix = [];
      let TempRow = [];
      for(let z=0;z<arguments[1];z++) {
        for(let i=0;i<arguments[0];i++) {
          TempRow.push(0);
        }
        this.Matrix.push(TempRow);
        TempRow = [];
      }
    }
  }

  MatrixAdd(Ma2) {
    let EArr = [0,0,0];
    let result = [];
    const length = (this.Matrix.length>Ma2.length) ? this.Matrix.length : Ma2.length;
    for(let i=0;i<length;i++) {
      if(Ma1.Matrix[i]==undefined) {
        result.push(Matrix.ArrayAdd(Ma2[i],EArr));
        continue;
      }
      if(Ma2[i]==undefined) {
        result.push(Matrix.ArrayAdd(this.Matrix[i],EArr));
        continue;
      }
      result.push(Matrix.ArrayAdd(this.Matrix[i],Ma2[i]));
    }
    return result;
  }

  MatrixSub(Ma2) {
    let EArr = [0,0,0];
    let result = [];
    const length = (this.Matrix.length>Ma2.length) ? this.Matrix.length : Ma2.length;
    for(let i=0;i<length;i++) {
      if(Ma1.Matrix[i]==undefined) {
        result.push(Matrix.ArraySub(Ma2[i],EArr));
        continue;
      }
      if(Ma2[i]==undefined) {
        result.push(Matrix.ArraySub(this.Matrix[i],EArr));
        continue;
      }
      result.push(Matrix.ArraySub(this.Matrix[i],Ma2[i]));
    }
    return result;
  }

  MatrixMult(number) {
    let result = [];
    for(let i=0,n=this.Matrix.length;i<n;i++) {
      result.push(Matrix.ArrayMult(this.Matrix[i],number));
    }
    return result;
  }

  MatrixDiv(number) {
    let result = [];
    for(let i=0,n=this.Matrix.length;i<n;i++) {
      result.push(Matrix.ArrayDiv(this.Matrix[i],number));
    }
    return result;
  }

  static ArrayAdd (A1,A2) {
    let result = [];
    let length = (A1.length>A2.length) ? A1.length : A2.length;
    for(let i=0;i<length;i++) {
      const val1 = (A1[i]==undefined)? 0 : A1[i];
      const val2 = (A2[i]==undefined)? 0 : A2[i];
      result.push(val1+val2);
    }
    return result;
  }

  static ArraySub(A1,A2) {
    let result = [];
    let length = (A1.length>A2.length) ? A1.length : A2.length;
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

  Gaussian() {
    var n = this.Matrix.length;
      for (var i=0; i<n; i++) {
          var maxEl = Math.abs(this.Matrix[i][i]);
          var maxRow = i;
          for(var k=i+1; k<n; k++) {
              if (Math.abs(this.Matrix[k][i]) > maxEl) {
                  maxEl = Math.abs(this.Matrix[k][i]);
                  maxRow = k;
              }
          }
          for (var k=i; k<n+1; k++) {
              var tmp = this.Matrix[maxRow][k];
              this.Matrix[maxRow][k] = this.Matrix[i][k];
              this.Matrix[i][k] = tmp;
          }
          for (k=i+1; k<n; k++) {
              var c = -this.Matrix[k][i]/this.Matrix[i][i];
              for(var j=i; j<n+1; j++) {
                  if (i==j) {
                      this.Matrix[k][j] = 0;
                  } else {
                      this.Matrix[k][j] += c * this.Matrix[i][j];
                  }
              }
          }
      }
      var x= new Array(n);
      for (var i=n-1; i>-1; i--) {
          x[i] = this.Matrix[i][n]/this.Matrix[i][i];
          for (var k=i-1; k>-1; k--) {
              this.Matrix[k][n] -= this.Matrix[k][i] * x[i];
          }
      }
      return x;
  }

  MatrixProd(Ma2) {
    if(this.Matrix.length!=Ma2.Matrix.length) {return "has to be the same type"}
    let result;
    if(Ma2.Matrix.length==3 && Ma2.Matrix[0].length==3) {
      result = new Matrix([0,0,0],[0,0,0],[0,0,0]);
      for(let i=0;i<3;i++) {
          result.Matrix[i][0] = this.Matrix[i][0]*Ma2.Matrix[0][0]+this.Matrix[i][1]*Ma2.Matrix[1][0]+this.Matrix[i][2]*Ma2.Matrix[2][0];
          result.Matrix[i][1] = this.Matrix[i][0]*Ma2.Matrix[0][1]+this.Matrix[i][1]*Ma2.Matrix[1][1]+this.Matrix[i][2]*Ma2.Matrix[2][1];
          result.Matrix[i][2] = this.Matrix[i][0]*Ma2.Matrix[0][2]+this.Matrix[i][1]*Ma2.Matrix[1][2]+this.Matrix[i][2]*Ma2.Matrix[2][2];
      }
    }
    else {
      result = new Matrix(Ma2.Matrix.length,Ma2.Matrix[0].length);
      for(let i=0,c=Ma2.Matrix.length;i<c;i++) {
        for(let z=0,r=Ma2.Matrix[0].length;z<r;z++) {
          let  res = 0;
          for(let d=0;d<r;d++) {
            res += this.Matrix[i][d]*Ma2.Matrix[d][z];
          }
          result.Matrix[i][z] = res;
        }
      }
    }
    return result;
  }

}
