class Particles extends Phaser.Scene {

    constructor() {
        super('particle');
    }

    init(sceneRef, playerRef) {
        this.scene = sceneRef;
        this.player = playerRef;

        this.minPlayerShineTime = 0.2 * 1000;
        this.maxPlayerShineTime = 0.4 * 1000;
        this.playerShineTimer = 0;

        this.shards = [];

        this.playerRunning = false;

        this.playerAlive = true;
    }

    create() {

        // pebble effects (while the door is closing)
        this.pebbles = this.scene.add.particles(0, 0, "pebble_particle", {

            x: { min: 0, max: 4320},
            y: 36,

            speedX: { min: -150, max: 150 },
            gravityY: 1000,

      //      alpha: { start: 1, end: 0 },
            scale: { start: 3, end: 0 , ease: "Sine.easeInOut"},

            lifespan: 900,
            frequency: 8
        }).stop();
        this.doorPebbles = this.scene.add.particles(0, 0, "pebble_particle", {

            x: { min: 36, max: 108},
            y: 72,

            speedX: { min: -150, max: 150 },
            gravityY: 1000,

      //      alpha: { start: 1, end: 0 },
            scale: { start: 2, end: 0 , ease: "Sine.easeInOut"},

            lifespan: 800,
            frequency: 30
        }).stop();

        this.pebbles.setDepth(-8);
        this.doorPebbles.setDepth(-8);

        // player sparkle thingy to convey glass lol
        this.playerShine = this.scene.add.particles(0, 0, "plus_particle", {

            follow: this.player,
            lifespan: 250,
            scale: { start: 2.5, end: 0 },
            maxAliveParticles: 1,
            stopAfter: 1,
            alpha: { min: 0.4, max: 0.8 }

        }).stop();

        // running
        this.runningLeft = this.scene.add.particles(0, 0, "dust_particle", {

            follow: this.player,
            followOffset: {x: 18, y: 36},

            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedX: { min: 20, max: 60 },
            accelerationX: -75,
            speedY: { min: -80, max: -20 },
            accelerationY: -80,

            lifespan: 350,
            frequency: 100,

        }).stop();
        this.runningRight = this.scene.add.particles(0, 0, "dust_particle", {

            follow: this.player,
            followOffset: {x: -18, y: 36},

            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedX: { min: -60, max: -20 },
            accelerationX: 75,
            speedY: { min: -80, max: -20 },
            accelerationY: -80,

            lifespan: 350,
            frequency: 100,

        }).stop();
        this.runningLeftFlipped = this.scene.add.particles(0, 0, "dust_particle", {

            follow: this.player,
            followOffset: {x: 36, y: 0},
            
            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedY: { min: -60, max: -20 },
            accelerationY: 75,
            speedX: { min: -80, max: -20 },
            accelerationX: -80,

            lifespan: 350,
            frequency: 100,

        }).stop();
        this.runningRightFlipped = this.scene.add.particles(0, 0, "dust_particle", {

            follow: this.player,
            followOffset: {x: 36, y: 0},
            
            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedY: { min: 20, max: 60 },
            accelerationY: -75,
            speedX: { min: -80, max: -20 },
            accelerationX: -80,

            lifespan: 350,
            frequency: 100,

        }).stop();

        // thud
        this.thud = this.scene.add.particles(0, 0, "dust_particle", {

            follow: this.player,
            followOffset: {x: 0, y: 36},
            
            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedX: { min: -200, max: 200},
            speedY: { min: 75, max: 150 },
            accelerationY: -800,

            lifespan: 350,
            quantity: 10,
            stopAfter: 10,

        }).stop();
        this.thudFlipped = this.scene.add.particles(0, 0, "dust_particle", {

            follow: this.player,
            followOffset: {x: 36, y: 0},
            
            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedY: { min: -200, max: 200},
            speedX: { min: 75, max: 150 },
            accelerationX: -800,

            lifespan: 350,
            quantity: 10,
            stopAfter: 10,

        }).stop();

        // slide
        this.slidingLeft = this.scene.add.particles(0, 0, "dust_particle", {

            follow: this.player,
            followOffset: {x: 36, y: 0},

            scale: { start: 5, end: 3 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedX: { min: 100, max: 200 },
            accelerationX: -200,
            speedY: { min: -80, max: -20 },
            accelerationY: -400,

            lifespan: 450,
            frequency: 15,

        }).stop();
        this.slidingRight = this.scene.add.particles(0, 0, "dust_particle", {

            follow: this.player,
            followOffset: {x: -36, y: 0},

            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedX: { min: -100, max: -200 },
            accelerationX: 200,
            speedY: { min: -80, max: -20 },
            accelerationY: -400,

            lifespan: 450,
            frequency: 15,

        }).stop();
        this.slidingLeftFlipped = this.scene.add.particles(0, 0, "dust_particle", {

            follow: this.player,
            followOffset: {x: 0, y: -36},

            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedY: { min: -100, max: -200 },
            accelerationY: 200,
            speedX: { min: -80, max: -20 },
            accelerationX: -400,

            lifespan: 450,
            frequency: 15,

        }).stop();
        this.slidingRightFlipped = this.scene.add.particles(0, 0, "dust_particle", {

            follow: this.player,
            followOffset: {x: 0, y: 36},

            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedY: { min: 100, max: 200 },
            accelerationY: -200,
            speedX: { min: -80, max: -20 },
            accelerationX: -400,

            lifespan: 450,
            frequency: 15,

        }).stop();

        // wall jump
        this.wallJump = this.scene.add.particles(0, 0, "dust_particle", {
            follow: this.player,
            followOffset: {x: 0, y: 36},
            
            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedY: { min: -200, max: -100 },

            lifespan: 350,
            quantity: 3,
            stopAfter: 3,
        }).stop();
        this.wallJumpFlipped = this.scene.add.particles(0, 0, "dust_particle", {
            follow: this.player,
            followOffset: {x: 36, y: 0},
            
            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedX: { min: -200, max: -100 },

            lifespan: 350,
            quantity: 3,
            stopAfter: 3,
        }).stop();
        
        // jump
        this.jump = this.scene.add.particles(0, 0, "dust_particle", {
            follow: this.player,
            followOffset: {x: 0, y: 36},
            
            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedY: { min: -200, max: -100 },

            lifespan: 350,
            quantity: 3,
            stopAfter: 3,
        }).stop();
        this.jumpFlipped = this.scene.add.particles(0, 0, "dust_particle", {
            follow: this.player,
            followOffset: {x: 0, y: 36},
            
            scale: { start: 5, end: 2 },
            alpha: { start: 1, end: 0 },
            rotate: { min: 0, max: 180 },

            speedX: { min: -200, max: -100 },

            lifespan: 350,
            quantity: 3,
            stopAfter: 3,
        }).stop();

    }

    updateRunParticles(running, right, flipped, velocityX, velocityY) {

        // stop all run particles
        if (!running || (!flipped && velocityX == 0) || (flipped && velocityY == 0)) {
            this.runningRight.stop();
            this.runningLeft.stop();
            this.runningRightFlipped.stop();
            this.runningLeftFlipped.stop();

        } else { // check particle type
            if (!flipped) {
                if (right && !this.runningRight.emitting) {
                    this.runningRight.start();
                    this.runningLeft.stop();
                } else if (!right && !this.runningLeft.emitting) {
                    this.runningRight.stop();
                    this.runningLeft.start();
                }
            } else {
                if (right && !this.runningRightFlipped.emitting) {
                    this.runningRightFlipped.start();
                    this.runningLeftFlipped.stop();
                } else if (!right && !this.runningLeftFlipped.emitting) {
                    this.runningRightFlipped.stop();
                    this.runningLeftFlipped.start();
                }
            }
        }
    }

    thudParticles(velocityY, flipped) {

        if (!flipped) {

            this.thud.speedX = { min: (-150 - velocityY / 30), max: (150 + velocityY / 30)};
            this.thud.speedY = { min: (20 + velocityY / 10), max: (80 + velocityY / 10)};

            this.thud.quantity = velocityY / 100;
            this.thud.stopAfter = velocityY / 100;
            this.thud.lifespan = 150 + velocityY / 5;

            this.thud.start();

        }
        else {

            this.thudFlipped.speedY = { min: (-150 - velocityY / 30), max: (150 + velocityY / 30)};
            this.thudFlipped.speedX = { min: (20 + velocityY / 10), max: (80 + velocityY / 10)};

            this.thudFlipped.quantity = velocityY / 100;
            this.thudFlipped.stopAfter = velocityY / 100;
            this.thudFlipped.lifespan = 150 + velocityY / 5;

            this.thudFlipped.start();
            
        }
    }

    updateSlideParticles(sliding, right, flipped, grounded) {

        // stop all slide particles
        if (!sliding || !grounded) {
            this.slidingRight.stop();
            this.slidingLeft.stop();
            this.slidingRightFlipped.stop();
            this.slidingLeftFlipped.stop();

        } else { // check particle type
            if (!flipped) {
                if (right && !this.slidingRight.emitting) {
                    this.slidingRight.start();
                    this.slidingLeft.stop();
                } else if (!right && !this.slidingLeft.emitting) {
                    this.slidingRight.stop();
                    this.slidingLeft.start();
                }
            } else {
                if (right && !this.slidingRightFlipped.emitting) {
                    this.slidingRightFlipped.start();
                    this.slidingLeftFlipped.stop();
                } else if (!right && !this.slidingLeftFlipped.emitting) {
                    this.slidingRightFlipped.stop();
                    this.slidingLeftFlipped.start();
                }
            }
        }
    }

    wallJumpParticles(right, flipped) {

        if (!flipped) {

            if (right) {
                this.wallJump.speedX = 100;
                this.wallJump.start();
            } else {
                this.wallJump.speedX = -100;
                this.wallJump.start();
            }
        } else {
            if (right) {
                this.wallJumpFlipped.speedY = 100;
                this.wallJumpFlipped.start();
            } else {
                this.wallJumpFlipped.speedY = -100;
                this.wallJumpFlipped.start();
            }
        }
    }

    jumpParticles(flipped, velocityX, velocityY) {

        if (!flipped) {

            this.jump.speedX = velocityX / 2;
            this.jump.start();
        } else {
            this.jumpFlipped.speedY = velocityY / 2;
            this.jumpFlipped.start();
        }

    }

    update(delta) {

        if (this.playerAlive) {
            this.playerShineTimer -= delta;
            if (this.playerShineTimer <= 0) {

                this.playerShineTimer = Phaser.Math.Between(this.minPlayerShineTime, this.maxPlayerShineTime);
                this.playerShine.setPosition(0,0);
                this.playerShine.x += Phaser.Math.Between(-14, 14);
                this.playerShine.y += Phaser.Math.Between(-36, 36);
                this.playerShine.start();

            }
        }
    }

    playerDied(shatter, velocityX, velocityY) {

        this.playerAlive = false;
        this.updateSlideParticles(false, false, false);

        // if the player hits something that would make them shatter
        if (shatter) {

            this.scene.sound.play("shatter3", { volume: 0.08 });

            for (let i = 0; i < Phaser.Math.Between(3, 4); i++) {

            this.shards.push( this.scene.add.particles(0,0, "glass_particle", {

                follow: this.player,
                lifespan: 2000,
                stopAfter: 1,
                scale: { min: 2, max: 4 },
                gravityY: 1800,
                bounce: 1,
                rotate: { onEmit: initShardRotation, onUpdate: updateShardRotation },

                speedX: { start: (velocityX * 0.75) + Phaser.Math.Between(-200, 200), end: 0 },
                speedY: (velocityY * 0.75) + Phaser.Math.Between(-400, -100),
            }));

            this.shards[this.shards.length - 1].setPosition(0,0);
            this.shards[this.shards.length - 1].x += Phaser.Math.Between(-16, 16);
            this.shards[this.shards.length - 1].y += Phaser.Math.Between(-25, 25);

            }

        } else { // player hits something that makes them melt

            this.scene.sound.play("melt", { volume: 0.2 });

            for (let i = 0; i < Phaser.Math.Between(2, 3); i++) {

                this.shards.push( this.scene.add.particles(0, 0, "molten_glass_particle", {

                    follow: this.player,
                    lifespan: 5000,
                    stopAfter: 1,
                    scale: { min: 2, max: 3 },
                    gravityY: 600,
                    bounce: 1,
                    speedX: { start: (velocityX * 0.5) + Phaser.Math.Between(-80, 80), end: 0 },
                    speedY: (velocityY * 0.5) + Phaser.Math.Between(-200, -50),
                    rotate: { onEmit: updateMoltenGlassRotation, onUpdate: updateMoltenGlassRotation},
                }));

                this.shards[this.shards.length - 1].setPosition(0,0);
                this.shards[this.shards.length - 1].x += Phaser.Math.Between(-16, 16);
                this.shards[this.shards.length - 1].y += Phaser.Math.Between(-25, 25);
            }
        }
    }

    

    playerGotArtifact() {
        
        this.scene.add.particles(0,0, "glass_particle", {

            follow: this.player,
            lifespan: 2000,
            scale: { min: 2, max: 4 },
            gravityY: 1800,
            bounce: 1,
            speedX: {min: -500, max: 500},
            speedY: {min: -800, max: -100},
            stopAfter: 50,

            rotate: { onEmit: initShardRotation, onUpdate: updateShardRotation },
        });
        
    }
}

function initShardRotation () {
    return Phaser.Math.Between(0, 180);
}

function updateShardRotation (p) {
    return p.angle + p.velocityX / 80;
}

function updateMoltenGlassRotation (p) {
  return Phaser.Math.RadToDeg(Math.atan2(p.velocityY, p.velocityX));
}