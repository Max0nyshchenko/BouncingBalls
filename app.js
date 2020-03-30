// VARS
let canvas = document.querySelector('#canvas');
let c = canvas.getContext('2d');
let tx = window.innerWidth;
let ty = window.innerHeight;

let mousex = 0;
let mousey = 0;

// CANVS
canvas.width = tx;
canvas.height = ty;


document.addEventListener('mousemove', function(event){
    mousex = event.clientX;
    mousey = event.clientY;
})

let grav = 0.99;
c.strokeWidth = 5;

// BALLS
function randomColor(){
    return(
        'rgba('+
        Math.round(Math.random() * 250) +
        ',' +
        Math.round(Math.random() * 250) +
        ',' +
        Math.round(Math.random() * 250) +
        ',' +
        Math.ceil(Math.random() * 10)/10 +
        ')'
    );
}
// ANIMATE BG
const bg  = document.querySelector('body');


function animBG(){
    let r  = Math.round(Math.random() * 250);
    let g  = Math.round(Math.random() * 250);
    let b  = Math.round(Math.random() * 250);
    let n = 2;
    bg.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}


animBG();

function ball(){
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = Math.random() * (tx - this.radius * 2) + this.radius;
    this.y = Math.random() * (ty - this.radius);
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.dy = Math.random() * 2;
    this.vel = Math.random()/5;
    this.update = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    } 
}

let BALL = [];
for (let i = 0; i < 50; i++) {
    BALL.push(new ball());
}

function animate(){
    if (tx != window.innerWidth || ty != window.innerHeight) {
        tx = window.innerWidth;
        ty = window.innerHeight;
        canvas.width = tx;
        canvas.height = ty;
    }
    requestAnimationFrame(animate);
    c.clearRect(0,0,tx,ty);
    for (let i = 0; i < BALL.length; i++) {
        BALL[i].update();
        BALL[i].x += BALL[i].dx;
        BALL[i].y += BALL[i].dy;
        if(BALL[i].y + BALL[i].radius >= ty ) {
            BALL[i].dy = -BALL[i].dy * grav;
        } else{
            BALL[i].dy += BALL[i].vel;
        }
        if(BALL[i].x + BALL[i].radius > tx || BALL[i].x - BALL[i].radius < 0){
            BALL[i].dx = -BALL[i].dx;
        }
        if(mousex > BALL[i].x - 20 &&
            mousex < BALL[i].x + 20 &&
            mousey > BALL[i].y - 50 &&
            mousey < BALL[i].y + 50 &&
            BALL[i].radius < 70) {
                BALL[i].radius += 5;
            } else {
                if(BALL[i].radius > BALL[i].startradius) {
                    BALL[i].radius += -5;
                }
            }
    }
}


animate();

setInterval(function(){
    BALL.push(new ball());
    BALL.splice(0,1);
}, 400);