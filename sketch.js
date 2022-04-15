// properties of player
let x = 100;
let y = 20;
let vx = 0;
let vy = 0;
let speed = 0;
// used to toggle direction of player
let direction = true;
// flag indicating wheter player win in each level
let win = false;
let level = 1; // 
let roundFailed = false;
let lifes = 2;

// tracing points that player passed
let path = [];

// holding postions of treess
let trees = []; // position of trees


let levelStarts = {};

let tree1, tree2, player_left, player_right, current_player;
let l1, l2, l0;

function preload() {
  tree1 = loadImage("images/tree1.png");
  tree2 = loadImage("images/tree2.png");
  player_left = loadImage("images/player_left.png");
  player_right = loadImage("images/player_right.png");
  l2 = loadImage("images/life2.png")
  l1 = loadImage("images/life1.png")
  l0 = loadImage("images/life0.png")

}

function setup() {
  createCanvas(600, 800);
  textSize(40)
  current_player = player_left;
  // initillize posiotns of trees
  for (let i = 0; i < level * 2; i++) {
    let x = Math.random() * 600;
    let y = Math.random() * 700;
    let h = Math.random() * 20 + 30;
    let w = Math.random() * 10 + 10;
    let flag = Math.random();
    let t;
    if (flag > 0.5) {
      t = tree1
    } else {
      t = tree2;
    }
    trees.push([x, y, h, w, t])

  }
}

function draw() {
  background(240);
  text("level " + level + " lifies " + lifes, 20, 30)
  // if reach end line, player wins
  if (y > 690 || roundFailed) {
    win = true; // if win toggle flag win to true

  }

  // draw lives
  if (lifes == 2) {
    image(l2, 250, 15, 100, 50)
  }
  else if (lifes == 1) {
    image(l1, 250, 15, 100, 50)
  }
  else if (lifes == 0) {
    image(l0, 250, 15, 100, 50)
  }

  // if not win, update postion of player
  if (!win) {
    x += vx;
    y += vy
  } else {
    // if player win show message
    if (roundFailed) {
      text("round failed", 200, 400);
    } else {
      text("level passed", 200, 400);
    }

  }
  for (let key in levelStarts) {
    text(levelStarts[key], 500, 30 * key)
  }

  // add postion to array each movement
  path.push([x, y, x + 6, y]);
  // loop using to draw path of skier
 
  // draw trees
  for (let i = 0; i < trees.length; i++) {
    let treeX = trees[i][0];
    let treeY = trees[i][1];

    fill("red")
    // rect(treeX, treeY, 10, 20) 
    push();
    translate(treeX, treeY);
    // triangle(-trees[i][3], 0, trees[i][3], 0, 0, -trees[i][2])
    image(trees[i][4], 0, 0, 40, 60)
    pop();

    // collide
    let distance = Math.sqrt(Math.pow(x - treeX, 2) + Math.pow(y - treeY, 2));
    if (distance < 10) {
      roundFailed = true;

      break;
    }
  }
  // draw player
  // ellipse(x, y, 20, 20)
  // player
  image(current_player, x, y, 60, 60)
  fill("black")
  // draw end line
  rect(0, 750, 700, 20);
}

function keyPressed() {
  // if win re-init game
  if (lifes == 0) {
    levelStarts[level] = 0;
    win = true;
  }
  if (win) {
    if (roundFailed) {
      lifes -= 1;
      x = 100; // init postion
      y = 20;
      win = false; // set win flag to false;
      direction = true; // init dir
      path = []; // make path empty
      roundFailed = false;

    } else {

      x = 100; // init postion
      y = 20;
      lifes = 2;
      level += 1; // update level
      win = false; // set win flag to false;
      direction = true; // init dir
      roundFailed = false;
      path = []; // make path empty
      trees = []; // re-create trees
      // num of tree according level
      for (let i = 0; i < level * 2; i++) {
        let x = Math.random() * 600;
        let y = Math.random() * 700;
        let h = Math.random() * 20 + 30;
        let w = Math.random() * 10 + 10;
        let flag = Math.random();
        let t;
        if (flag > 0.5) {
          t = tree1
        } else {
          t = tree2;
        }
        trees.push([x, y, h, w, t])
      }
    }
    levelStarts[level] = lifes;

  }
  speed = 2; // set speed

  if (direction) // move left 
  {
    vx = speed;
    vy = speed;
    current_player = player_right;
  } else // move right 
  {
    vx = -speed;
    vy = speed;
    current_player = player_left;
  }
  // if key pressed, toggle direction
  direction = !direction;
}
