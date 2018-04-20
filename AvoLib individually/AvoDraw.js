class CanDraw {
  constructor(Width,Height,BackgroundColor,BorderWidth,Id) {
    this.Element = document.createElement("canvas");
    this.Element.id = (Id) ? Id : "canvas";
    document.body.appendChild(this.Element);
    this.Element.width = (Width) ? Width : (window.innerWidth - this.Element.offsetLeft*4);
    this.Element.height = (Height) ? Height : (window.innerHeight - this.Element.offsetTop*4);
    this.Element.style.border = (BorderWidth) ? BorderWidth+"px solid black" : undefined;
    this.Element.style.backgroundColor = (BackgroundColor) ? BackgroundColor : "white";
    this.ctx = this.Element.getContext("2d");
    this.translate = {x:0,y:0};
    this.Translate(this.Element.width/2,this.Element.height/2);
    this.style = "fill";
    this.gradient = this.ctx.createLinearGradient(0,0,50,50);
    this.Pictures = [];
    this.ctx.textAlign = "center";
  }

  Clear() {
    this.ctx.clearRect(-this.translate.x,-this.translate.y,this.Element.width,this.Element.height);
  }

  Gradient(Element,color) {
    const amount = 1/arguments.length;
    for(let i=0,n=arguments.length;i<n;i++) {
      this.gradient.addColorStop(amount*i,arguments[i]);
    }
    this.ctx.fillStyle = this.gradient;
  }

  StartDraw(color) {
      if(color) {this.ctx.fillStyle = color;this.ctx.strokeStyle = color;}
      this.ctx.beginPath();
  }

  EndDraw(style) {
    this.ctx.closePath();
    switch(style) {
      case "fill":
      this.ctx.fill();
      break;
      case "stroke":
      this.ctx.stroke();
      break;
    }
  }

  alpha(alpha) {
    this.ctx.globalAlpha = alpha || 1;
  }

  adaptSize() {
    this.Element.width = window.innerWidth - this.Element.offsetLeft*2;
    this.Element.height = window.innerHeight - this.Element.offsetTop;
  }

  Translate(x_,y_) {
    this.ctx.translate(-this.translate.x,-this.translate.y);
    this.ctx.translate(x_,y_);
    this.translate = {x:x_,y:y_};
  }

  Circle(x,y,r,style,color) {
    this.StartDraw(color || this.ctx.fillStyle);
    this.ctx.arc(x,y,r,0,Math.PI*2);
    this.EndDraw(style || this.style);
  }

  Dot(x,y,color,style) {
    this.StartDraw(color || this.ctx.fillStyle);
    this.ctx.arc(x,y,2,0,Math.PI*2);
    this.EndDraw(style || this.style);
  }

  Rectangle(x,y,w,h,style,color) {
    this.StartDraw(color || this.ctx.fillStyle);
    switch(style || this.style) {
      case "fill":
      this.ctx.fillRect(x,y,w,h);
      break;
      case "stroke":
      this.ctx.strokeRect(x,y,w,h);
      break;
    }
  }

  Write(x,y,text,size,color,style) {
    this.ctx.font = (size || 30)+"px Arial";
    this.ctx.fillStyle = color || this.ctx.fillStyle;
    this.ctx.strokeStyle = color || this.ctx.strokeStyle;
    if(style && style=="stroke")this.ctx.strokeText(text,x,y);
    if(style && style=="fill")this.ctx.fillText(text,x,y);
    if(!style && this.style=="stroke")this.ctx.strokeText(text,x,y);
    if(!style && this.style=="fill")this.ctx.fillText(text,x,y);
  }

  Line(x,y,x2,y2,color) {
    this.StartDraw(color || this.ctx.fillStyle);
    this.ctx.moveTo(x,y);
    this.ctx.lineTo(x2,y2);
    this.EndDraw("stroke");
  }

  SymPolygon(x_,y_,corners,length,style,color) {
    this.StartDraw(color || this.ctx.fillStyle);
    let angleAdd = Math.PI*2/corners;
    let angle = 0;
    let num = (corners%2==0) ? 2 : 4;
    this.ctx.moveTo(length * Math.cos(angle-angleAdd/num) + x_,Math.sin(angle-angleAdd/num) + y_);
    let x,y;
    for(let i=0;i<corners+1;i++) {
      x = length * Math.cos(angle-angleAdd/num) + x_;
      y = length * Math.sin(angle-angleAdd/num) + y_;
      angle+=angleAdd;
      this.ctx.lineTo(x,y);
  }
    this.EndDraw(style || this.style);
}

  Picture(src,Id) {
    let Img = document.createElement("image");
              document.body.appendChild(Img);
              Img.Id = Id;
              Img.src = src;
              console.log(Img);
    this.Pictures.push(Img);
  }

}
