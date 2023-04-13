let cvs = document.getElementById("myCanvas");
let ctx = cvs.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.fillText("Press Enter to Start Game",90,50);

let pipes = [];
const pipeUp1Image = new Image();
const pipeDown1Image = new Image();
const birdImage = new Image();

let pipeUp1Ready = false;
let pipeDown1Ready = false;
let birdReady = false;

pipeUp1Image.onload=function(){
    pipeUp1Ready = true;
};

pipeDown1Image.onload=function(){
    pipeDown1Ready = true;
};

birdImage.onload = function(){
    birdReady = true;
}

pipeUp1Image.src = "pipeup.jpeg";
pipeDown1Image.src = "pipedown.png";
birdImage.src = "bird.png";

let flappyBird = {
    img:birdImage,
    x:100,
    y:40,
    speedY:0
}


function createPipeSet(){
    let pipeSet = {
        pipeUp1 : {
            img:pipeUp1Image,
            x:300,
            y:Math.floor(Math.random()*30)+80,
            htup:Math.floor(Math.random()*100)+80
        },
        pipeDown1 : {
            img:pipeDown1Image,
            x:300,
            y:Math.floor(Math.random()*70)-85,
            htdn:85
        },
    }
    return pipeSet;
}








pipes.push(createPipeSet());

pipes.push(createPipeSet());

pipes.push(createPipeSet());

window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        flappyBird.speedY = -1; // Move Flappy Bird up
    }
});

window.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowUp') {
        flappyBird.speedY = 1; // Move Flappy Bird down
    }
});
timeList=[]
let timeOut;
function play(){
let score=0;
let collided = false;

for(let i=0;i<180000;i++){
    timeList.push(setTimeout(() => {
        if(collided === false){
            ctx.clearRect(0,0,300,300);
            for(j=0;j<pipes.length;j++){
                if(pipes[j].pipeUp1.x-i<(300-j*80)){               
                    index=j;
                    ctx.drawImage(pipes[j].pipeUp1.img,pipes[j].pipeUp1.x-i+j*80,pipes[j].pipeUp1.y,20,pipes[j].pipeUp1.htup);
                    ctx.drawImage(pipes[j].pipeDown1.img,pipes[j].pipeDown1.x-i+j*80,pipes[j].pipeDown1.y,20,pipes[j].pipeDown1.htdn);
                    ctx.fillText("Score:"+score.toString(),10,10);
                } 
                if(pipes[j].pipeUp1.x-i+j*80===80){
                    score+=1;
                } 
        
                if(flappyBird.x+10>=pipes[j].pipeUp1.x-i+j*80 && flappyBird.x+10<=pipes[j].pipeUp1.x-i+j*80+20){
                    if(flappyBird.y>=pipes[j].pipeUp1.y || flappyBird.y<=pipes[j].pipeDown1.y+pipes[j].pipeDown1.htdn){
                        collided=true
                        ctx.clearRect(0,0,300,300);
                        ctx.fillText("Final Score:"+score.toString(),115,60);
                        ctx.fillText("Press Enter to Play Again",90,80);
                        clearTime();
                        return;
                        
                    }
                }
            }
            flappyBird.y += flappyBird.speedY;
            ctx.drawImage(flappyBird.img,flappyBird.x,flappyBird.y,10,10);
            pipes.push(createPipeSet());
        }
    }, 20*i));
    
}

} 
function clearTime(){
    timeList.forEach(time => {
        clearTimeout(time);
    });
}  
  

$(document).on("keydown",function(event){
    if(event.which === 13){
        flappyBird.x=100;
        flappyBird.y=40;
        play();    
    }
});

