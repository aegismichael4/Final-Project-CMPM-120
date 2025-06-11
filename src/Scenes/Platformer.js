class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
    }

    init() {
        this.physics.world.gravity.y = 1800;
        this.physics.world.TILE_BIAS = 36;
    }

    preload() {
        // print controls to screen
        document.getElementById('description').innerHTML = '<h2>Controls:<br>A - Move Left // D - Move right<br>S - Slide // Space - Jump';

        // animated lava tiles
        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }

    create() {

        this.map = this.add.tilemap("heist_json", 18, 18, 120, 20);

        // tilesets
        this.industrial_tileset = this.map.addTilesetImage("pixel_industrial", "industrial_tiles");
        this.block_tileset = this.map.addTilesetImage("block_tiles", "marble_tiles");

        // tilemap layers
        this.groundBTLayer = this.map.createLayer("Ground - bt", this.block_tileset, 0, 0);
        this.groundPILayer = this.map.createLayer("Ground - pi", this.industrial_tileset, 0, 0);
        this.dangerLayer = this.map.createLayer("Danger", this.industrial_tileset, 0, 0);
        this.groundBTLayer.setScale(2); 
        this.groundPILayer.setScale(2);
        this.dangerLayer.setScale(2);

        // Make layers collidable
        this.groundBTLayer.setCollisionByProperty({
            collides: true
        });
        this.groundPILayer.setCollisionByProperty({
            collides: true
        });

        //parallax background
        this.background = this.add.sprite(2875, 360, "background");
        this.background.setScale(2);
        this.background.setScrollFactor(0.85);
        this.background.setDepth(-10);
        

        // set up player
        // default: 125, 550
        // test artifact: 4000, 300
        this.player = new Player(this, 125, 550, "glass-test");
//        this.player = new Player(this, 4000, 300, "glass-test");
        this.player.setScale(2);
        this.freezePlayer = false;

        // buttons
        this.physics.world.drawDebug = false;
        /*
        // debug key listener (assigned to J key)
        this.input.keyboard.on('keydown-J', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);
        */

        this.input.keyboard.on('keydown-R', () => {
            this.slide.volume = 0;
            this.doorSFX.stop();
            this.rockslide.stop();
            this.alarm.stop();
            this.scene.restart();
        });

        // audio
        this.initAudio();

        // camera
        this.camera = this.cameras.main;
        this.camera.setBounds(0, 0, 4320, this.game.config.height);
        this.camera.setRoundPixels(true);
        this.resumeCamera();

        // artifact
        this.artifact = new Artifact(this, 4068, 360, "artifact");
        this.artifactVisible = true;
        this.physics.add.sprite(this.artifact);
        this.artifact.arcadeBody = this.physics.add.existing(this.artifact, true);
        this.artifactCollider = null;

        // door
        this.door = new Door(this, 18*4, -18 * 3, "door");
        this.door.setScale(2);
        this.door.setDepth(-10);
        this.physics.add.sprite(this.door).setScale(2);
        this.physics.add.collider(this.door, this.player);
        this.door.arcadeBody = this.physics.add.existing(this.door, true);

        // sirens
        this.sirens = new Siren();
        this.sirens.init(this);
        this.sirens.create();

        // invisible wall
        this.invisibleWall = this.add.rectangle(0, 0, 40, 1440);
        this.physics.add.sprite(this.invisibleWall);
        this.physics.add.collider(this.invisibleWall, this.player, this.complete, null, this);
        this.invisibleWall.arcadeBody = this.physics.add.existing(this.invisibleWall, true);

        // particles
        this.particles = new Particles();
        this.particles.init(this, this.player);
        this.particles.create();

        // timer
        this.timer = new Timer();
        this.timer.init(this);
        this.timer.create();
        this.runTimer = true;

        // set up arcade physics
        this.player.initPhysics(this.groundBTLayer, this.groundPILayer, this.door, this.artifact);

        // animate tiles
        this.animatedTiles.init(this.map);
                
    }

    initAudio() {

        // player sounds
        this.footstep1 = this.sound.add("footstep1", {
            volume: 1
        });

        this.footstep2 = this.sound.add("footstep2", {
            volume: 1
        });

        this.playFootstep1 = true;
        this.timeBetweenFootsteps = 0.3 * 1000;
        this.footstepTimer = this.timeBetweenFootsteps;

        this.thud = this.sound.add("thud");

        this.slide = this.sound.add("slide", {
            volume: 0,
            loop: true
        });
        this.slide.play();

        this.jump = this.sound.add("jump", {
            volume: 1.6
        });

        this.longJump = this.sound.add("long_jump", {
            volume: 1.6
        });

        this.wallJump = this.sound.add("wall_jump", {
            volume: 1.6
        });

        this.dive = this.sound.add("dive", {
            volume: 1.6
        });

        this.skid = this.sound.add("skid", {
            volume: 0.5
        });


        // world sfx
        this.doorSFX = this.sound.add("door", {
            volume: 1.6,
            loop: true
        });

        this.doorCloseSFX = this.sound.add("door_close", {
            volume: 2
        });

        this.rockslide = this.sound.add("rockslide", {
            volume: 0.5,
            loop: true
        });

        this.alarm = this.sound.add("alarm", {
            volume: 0.2,
            loop: true
        });

    }

    complete() {
        if (this.player.flipped) {

            this.runTimer = false;
            this.slide.volume = 0;
            this.freezeCamera();
            this.player.exitLevel();
            this.freezePlayer = true;

            this.tweens.add({
                targets: this.player,
                x: -50,
                duration: 100
            })

        }
    }

    setArtifactCollider(collider) {
        this.artifactCollider = collider;
    }

    killPlayer(shatter, velocityX, velocityY) {
        this.slide.volume = 0;
        this.particles.playerDied(shatter, velocityX, velocityY);
        this.freezeCamera();
        delete this.player;
    }

    freezeCamera() {
        this.camera.stopFollow();
    }

    resumeCamera() {
        this.camera.startFollow(this.player, false, 1, 1, -200, 0);

    }

    flipGravity() {

        this.artifactVisible = false;
        this.artifactCollider.destroy();
        this.artifact.destroy();

        this.sirens.activateSirens();
        this.alarm.play();

        this.physics.world.gravity.y = 0;
        this.physics.world.gravity.x = 0;
        this.player.flip();

        this.sound.play("power_up", {
            volume: 0.7
        });
        this.particles.playerGotArtifact();

        this.rockslide.volume = 0;
        this.rockslide.play();
        this.tweens.add({
            targets: this.rockslide,
            volume: 0.25,
            duration: 500
        });

        this.particles.pebbles.start();

        // set initial camera shake
        this.camera.shake(8000, 0.003);

        // set final camera shake
        // pan camera right
        this.time.addEvent({
            callback: () => this.camera.shake(82000, 0.0005),
            callbackContext: this,
            delay: 8000
        });


        
        //pan camera left
        this.camera.stopFollow();
        this.time.addEvent({
            callback: () => this.camera.pan(0, 0, 2000),
            callbackContext: this,
            delay: 2000
        });

        

        // pan camera right
        this.time.addEvent({
            callback: () => this.camera.pan(4000, 0, 2000),
            callbackContext: this,
            delay: 6000
        });

        this.time.addEvent({
            callback: () => this.resumeCamera,
            callbackContext: this,
            delay: 8000
        });
        

        // freeze player
        this.setFreezePlayer(true);
        this.time.addEvent({
            callback: () => this.setFreezePlayer(false),
            callbackContext: this,
            delay: 8500
        });

        this.time.addEvent({
            callback: () => this.player.rotateSprite(),
            callbackContext: this,
            delay: 8500
        });

        this.time.addEvent({
            callback: () => this.physics.world.gravity.x = 1800,
            callbackContext: this,
            delay: 8500
        });

        
        

        this.door.startClosing();

        //setTimeout(this.player.flip, 1);
    }

    adjustRunSFX(delta) {

        if (this.player.running) {

            this.footstepTimer -= delta;
            if (this.footstepTimer <= 0) {

                this.footstepTimer = this.timeBetweenFootsteps;

                this.playFootstep1 ? this.footstep1.play() : this.footstep2.play();
                this.playFootstep1 = !this.playFootstep1;
            }

        } else {
            this.footstepTimer = 0;
        }

    }

    thudFX(velocityY, flipped) {

        // dust particles
        this.particles.thudParticles(velocityY, flipped);

        // sound effect
        this.thud.volume = 0.5 + velocityY / 700;
        this.thud.detune = -velocityY / 3.5;
        this.thud.play();

        // screen shake
        if (velocityY > 1000) this.camera.shake(100, (velocityY / 600000));
    }

    slideSFX(play) {

        if (play) {
            this.slide.volume = 1.6;
        } else {
            this.tweens.add({
                targets:  this.slide,
                volume:   0,
                duration: 200
            });
        }
    }

    setFreezePlayer(freeze) {
        this.freezePlayer = freeze;
    }

    update(time, delta) {

        if (this.runTimer) this.timer.update(delta);
        this.artifact.update(this.artifactVisible);
        this.door.update();
        this.particles.update(delta);  

        if (this.player && !this.freezePlayer) {
            this.adjustRunSFX(delta);
            this.player.update(delta);
        }
    }
}