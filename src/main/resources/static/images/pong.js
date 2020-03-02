/**
 * This file is part of Canvas Game Engine (CGE).
 *
 * CGE is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CGE is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CGE.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Last commit by:
 * @author: akless
 * @date:   Fr, 25.06.2010
 * @rev:    32
 *
 * Authors:
 * Andre Kless, 2010
 * Daniel Wirtz, 2010
 */

var maxScore = 10;

function load() {
  // Assign scene
  var scene = new CGE_Scene('canvas', 640, 480);
  scene.setSpeed(60);

/*
  // Load ressources
  scene.preloadImage("img/pong_ball.png");
  scene.preloadImage("img/pong_bg.jpg");
  scene.preloadImage("img/pong_blue.png");
  scene.preloadImage("img/pong_red.png");
  scene.preloadSound("snd/pong_bg.ogg");
  scene.preloadSound("snd/ballout.wav");
  scene.preloadSound("snd/boing.wav");
  scene.preloadSound("snd/trumpet.wav");
*/

  // Set background and scores
  scene.setBackground("url(img/pong_bg.jpg)");
  var score_red = 0;
  var score_blue = 0;

  // Set sounds
  var snd_collide = new CGE_Sound("snd/boing.wav");
  var snd_ballout = new CGE_Sound("snd/ballout.wav");
  var snd_win = new CGE_Sound("snd/trumpet.wav");
  var snd_bg = new CGE_Sound("snd/pong_bg.ogg");
  snd_bg.loop = true;
  snd_bg.play(0.25);
  scene.onStop = function() {
    snd_bg.stop();
  };

  // Set Keys
  var pressed_up = false;
  var pressed_down = false;
  var pressed_w = false;
  var pressed_s = false;
  scene.onKeyDown = function(key) {
    if (key == CGE_KEYBOARD.UP)
      pressed_up = true;
    else if (key == CGE_KEYBOARD.DOWN)
      pressed_down = true;
    else if (key == CGE_KEYBOARD.W)
      pressed_w = true;
    else if (key == CGE_KEYBOARD.S)
      pressed_s = true;
  };
  scene.onKeyUp = function(key) {
    if (key == CGE_KEYBOARD.UP)
      pressed_up = false;
    else if (key == CGE_KEYBOARD.DOWN)
      pressed_down = false;
    else if (key == CGE_KEYBOARD.W)
      pressed_w = false;
    else if (key == CGE_KEYBOARD.S)
      pressed_s = false;
  };

  // Create first player
  var player_red = new CGE_Sprite("img/pong_red.png", 100, scene.height/2, 10, 60);
  player_red.dir = 0;
  player_red.onBeforeMove = function() {
    if (pressed_w)
      this.dir -= 1;
    else if (this.dir < 0) {
      this.dir += 2;
      if (this.dir > 0) this.dir = 0;
    }
    if (pressed_s)
      this.dir += 1;
    else if (this.dir > 0) {
      this.dir -= 2;
      if (this.dir < 0) this.dir = 0;
    }
    this.y += this.dir;
    if (this.y > 455) {this.y = 455;this.dir = -this.dir;}
    if (this.y < 25) {this.y = 25;this.dir = -this.dir;}
  };
  player_red.solid = true;
  scene.addObject(player_red);

  // Create second player
  var player_blue = new CGE_Sprite("img/pong_blue.png", scene.width - 100, scene.height/2, 10, 60);
  player_blue.dir = 0;
  player_blue.onBeforeMove = function() {
    if (pressed_up)
      this.dir -= 1;
    else if (this.dir < 0) {
      this.dir += 2;
      if (this.dir > 0) this.dir = 0;
    }
    if (pressed_down)
      this.dir += 1;
    else if (this.dir > 0) {
      this.dir -= 2;
      if (this.dir < 0) this.dir = 0;
    }
    this.y += this.dir;
    if (this.y > 455) {this.y = 455;this.dir = -this.dir;}
    if (this.y < 25) {this.y = 25;this.dir = -this.dir;}
  };
  player_blue.solid = true;
  scene.addObject(player_blue);

  // Create ball
  var ball = new CGE_Sprite("img/pong_ball.png", scene.width/2, scene.height/2, 10, 10);
  ball.collisionObject = new CGE_Circle(0, 0, ball.width/2);
  ball.solid = true;
  ball.speed = 3;
  ball.onBeforeMove = function() {
    if (this.x - this.width/2 <= 0) {
      score_blue++;
      snd_ballout.play();
      document.getElementById('score').innerHTML = score_red+' : '+score_blue;
      if (score_blue >= maxScore) {
        document.getElementById('score').innerHTML = "Sieg für Blau!";
        snd_win.play();
        scene.stop();
      } else {
        this.setPosition(scene.width/2, scene.height/2);
        this.setMotion(3, 180);
      }
    }
    if (this.x + this.width/2 >= scene.width) {
      snd_ballout.play();
      score_red++;
      document.getElementById('score').innerHTML = score_red+' : '+score_blue;
      if (score_red >= maxScore) {
        document.getElementById('score').innerHTML = "Sieg für Rot!";
        snd_win.play();
        scene.stop();
      } else {
        this.setPosition(scene.width/2, scene.height/2);
        this.setMotion(3, 0);
      }
    }
    if (this.y - this.height/2 <= 0 || this.y + this.height/2 >= scene.height) {
      this.setYSpeed(-this.getYSpeed());
      snd_collide.play();
    }
  }
  ball.onCollide = function(object) {
    var current_speed = this.speed;
    this.setYSpeed((this.y - object.y)/5);
    if (object == player_red) {
      this.sprite_index = 2;
    } else if (object == player_blue) {
      this.sprite_index = 1;
    }
    this.setXSpeed(-this.getXSpeed());
    if (this.speed < 20)
      this.speed = current_speed + 1;
    if (object == player_red || object == player_blue)
      snd_collide.play();
  }
  scene.addObject(ball);

  // Start the scene
  scene.start();
}