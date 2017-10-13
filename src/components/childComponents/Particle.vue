<template>
	<div v-show="isParticle == true" style="position: absolute; width: 100%;height:100%;bottom: 0;">
		<canvas id="canvas" :height="canHeight" :width="canWidth" style="background-color: transparent; height: 100%; width: 100%;"></canvas>
	</div>
</template>

<script>

export default{
	data() {
		return {
			colorArr: ['yellow', 'green', 'orange', 'pink', 'blue'],
			textArr: ['Happy', 'Birthday', 'one', 'Date', 'Cake'],
			GAP: 50,
			canHeight: window.innerWidth*2,
			canWidth: window.innerHeight*2,
		}
	},
	props: ['isParticle'],
	mounted() {
		let self = this
		;(function() {
			self.ps = self.ps || {};

			// this.requestAnimationFrame = window.requestAnimationFrame ||
			// 	window.mozRequestAnimationFrame ||
			// 	window.webkitRequestAnimationFrame ||
			// 	window.msRequestAnimationFrame ||
			// 	window.oRequestAnimationFrame || function(callback) {
			// 	window.setTimeout(callback, 1 / 60 * 1000);
			// };

			var particles = [];
			var lastTimestamp;
			var canvas;
			var context;
            var startingPosition;
            var imgs=[];
            for(let i=0,len=3;i<len;i++){
                imgs[i]=new Image();
                imgs[i].src=require('@/assets/imgs/heart'+i+'.png');
            }

			function coinFlip() {
				return Math.random() > .5 ? 1 : -1;
			}

			self.ps.toRad = function(degrees) {
				return degrees * Math.PI / 180;
			};

			function onSingleClick() {
				var angle = 90 + Math.random() * 20 * coinFlip();
				var speed = Math.random() * 170 + 20;
				var color = self.colorArr[Math.floor(Math.random() * self.colorArr.length)]
				var size = Math.random() * 6 + 4;
                var life = Math.random() + 2;
                var imgIndex=Math.floor(Math.random()*3);
				particles.push(new self.ps.Particle(startingPosition, angle, speed, life, imgIndex));
			}

			function onManyAtOnceClick() {
				for (var i = 0; i < 100; ++i) {
					onSingleClick();
				}
			}

			function onManyInSequenceClick() {
				function releaseOne() {
					if(self.isParticle == true) {
						onSingleClick()
					}
					setTimeout(releaseOne, self.GAP);
				}
				releaseOne();
			}

			function draw() {

				context.clearRect(0,0,context.canvas.width, context.canvas.height)

				particles.forEach(function(particle) {
					if (particle.life > 0) {
						context.fillStyle = particle.color;
						context.font = '10px Arial'
						context.globalAlpha = (particle.life / particle.startingLife) * 0.8;
                        context.drawImage(imgs[particle.imgIndex],particle.pos.x, particle.pos.y,50,50);
					}
				});

			}

			function play(timestamp) {
				var delta = timestamp - (lastTimestamp || timestamp);
				lastTimestamp = timestamp;

				delta /= 1000;

				for(var i = 0, l = particles.length; i < l; ++i) {
					particles[i].update(delta);
				}

				draw();
				window.requestAnimationFrame(play);
			}

			self.ps.sandbox = {
				init: function() {
					canvas = document.getElementById('canvas');
					context = document.getElementById('canvas').getContext('2d');
					startingPosition = {
						x: canvas.width / 1.12,
						y: canvas.height - innerHeight*0.15
					};

					// var singleButton = document.getElementById('single');
					// singleButton.addEventListener('click', onSingleClick, false);

					// var manyAtOnceButton = document.getElementById('manyAtOnce');
					// manyAtOnceButton.addEventListener('click', onManyAtOnceClick, false);

					// var manyInSequenceButton = document.getElementById('manyInSequence');
					// manyInSequenceButton.addEventListener('click', onManyInSequenceClick, false);
                    onManyInSequenceClick()
				},

				go: function() {
                    play(new Date().getTime());
				}
			};
		})();

		self.ps = self.ps || {};

		self.ps.Particle = function(pos, angle, speed, life, imgIndex) {
			this.pos = {
				x: pos.x,
				y: pos.y
			};

			this.vel = {
				x: speed * Math.cos(self.ps.toRad(angle)),
				y: -speed * Math.sin(self.ps.toRad(angle))
			};

            this.life = this.startingLife = life;
            this.imgIndex=imgIndex;
		};

		self.ps.Particle.prototype.update = function(dt) {
			this.life -= dt;

			if(this.life > 0) {
				this.pos.x += this.vel.x * dt;
				this.pos.y += this.vel.y * dt;
			}
		};

		this.init()
	},
	methods: {
		init(){
			this.ps.sandbox.init();
			this.ps.sandbox.go();
		}
	}
}


</script>

<style scoped>
	
</style>