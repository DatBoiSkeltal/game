var canvas = document.getElementById('spel');
var c = canvas.getContext('2d');
var cwidth = window.innerWidth;
var cheight = window.innerHeight;
var x;
var y;
var frames = 60;
var stars = [];
var keyLog = {
  up:false,
  down:false,
  right:false,
  left:false
};
var player = {
  x: cwidth/2,
  y: cheight/1.5,
  speed: 4.9,
  playerHealth: 5,
  width: 20,
  height: 20,
  score: 0,
  Update: function() {
   if(keyLog.up && this.y > 0) this.y -= this.speed;
   if(keyLog.down && this.y < cheight-this.height) this.y += this.speed;
   if(keyLog.right && this.x < cwidth-this.width) this.x += this.speed;
   if(keyLog.left && this.x > 0) this.x -= this.speed;
  },
  Render: function() {
    c.fillStyle = 'lime';
    c.fillRect(this.x, this.y, this.width, this.height);
  }
};


addEventListener ("keydown", function (e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.which;
  switch(keyCode) {
    case 87: //W
    keyLog.up = true;
    break;
    case 83: // S
    keyLog.down = true;
    break;
    case 68: // D
    keyLog.right = true;
    break;
    case 65: // A
    keyLog.left = true;
    break;
  }
}, false);
addEventListener ("keyup", function (e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.which;
  switch(keyCode) {
    case 87: //W
    keyLog.up = false;
    break;
    case 83: // S
    keyLog.down = false;
    break;
    case 68: // D
    keyLog.right = false;
    break;
    case 65: // A
    keyLog.left = false;
    break;
  }
}, false);


function Star(x, y) {
  this.x = x;
  this.y = y;
  this.width = 8;
  this.height = 8;
  this.Render = function() {
    c.fillStyle = 'white';
    c.fillRect(this.x, this.y, this.width, this.height);
  };
  this.Update = function() {
    if(Collision(this, player)){
      player.score ++;
      BreakStar();
    }
  };
}
function BreakStar(Star) {
  var index = stars.indexOf(Star);
  stars.splice(index, 1);
}
function CreateStars(amount) {
  for(i = 0; i < amount; i++){
    stars.push(new Star(Math.random()*cwidth, Math.random()*cheight));
  }
}
function RenderStars() {
  for(i in stars) {
    stars[i].Render();
  }
}
function UpdateStars() {
  for(i in stars) {
    stars[i].Update();
  }
}


function Collision(obj1, obj2) {
    return (obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
}


function Render() {
  c.clearRect(0,0,window.innerWidth,window.innerHeight);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  c.fillStyle = 'lime';
  c.font = "bold 18px monospace";
  c.fillText('Score:' + player.score, 10, 20);
  player.Render();
  RenderStars();
}


function Update() {
  player.Update();
  UpdateStars();
}

function Init() {
 CreateStars(20);
}


Init();
setInterval (function () {
  Update();
  Render();
}, 1000/frames)
