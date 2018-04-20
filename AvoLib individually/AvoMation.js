//Easy Animation / Loop

let AnimationLoopVariable;
let ClearCanvasOnLoop = true;

function Animation(active) {
  if(active) {
    AnimationLoopVariable = requestAnimationFrame(AnimationLoop);
  } else {
    cancelAnimationFrame(AnimationLoopVariable);
  }
}

function AnimationLoop() {
  if (typeof draw == 'function') {
    if(ClearCanvasOnLoop) {
      Canvas.Clear();
    }
    draw();
  }
  AnimationLoopVariable = requestAnimationFrame(AnimationLoop);
}

//Dunnso
