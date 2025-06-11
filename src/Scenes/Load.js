class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");
        this.load.spritesheet("glass", "glass_packed.png", { frameWidth: 36, frameHeight: 36});

        // Load tilemap information
        this.load.image("industrial_tiles", "tilemap_packed.png");                         // Packed tilemap
        this.load.image("marble_tiles", "marble_packed.png");
        this.load.image("marble_tiles_extruded", "marble_extruded.png");
        this.load.tilemapTiledJSON("heist_json", "heist.json");             // Tilemap in JSON
        this.load.image("background", "heist_background.png");

        // extra sprites
        this.load.spritesheet("artifact", "artifact.png", { frameWidth: 32, frameHeight: 32});
        this.load.image("door", "door.png");
        this.load.spritesheet("siren", "siren_packed.png", { frameWidth: 18, frameHeight: 18});
        this.load.image("siren_light", "siren_light.png");

        // particle effects
        this.load.image("plus_particle", "plus_particle.png");
        this.load.image("glass_particle", "glass_particle.png");
        this.load.image("dust_particle", "dust_particle.png");
        this.load.image("pebble_particle", "pebble.png");
        this.load.image("molten_glass_particle", "molten_glass_particle.png");


        //audio
        this.load.audio("sparkle", "sparkle.wav");
        this.load.audio("ding", "ding.wav");
        this.load.audio("shatter", "shatter.wav");
        this.load.audio("shatter2", "shatter2.mp3");
        this.load.audio("shatter3", "shatter3.wav");
        this.load.audio("footstep1", "footstep1.wav");
        this.load.audio("footstep2", "footstep2.wav");
        this.load.audio("thud", "thud.wav");
        this.load.audio("slide", "slide.wav");
        this.load.audio("jump", "jump.wav");
        this.load.audio("long_jump", "long_jump.wav");
        this.load.audio("wall_jump", "wall_jump.wav");
        this.load.audio("dive", "dive.wav");
        this.load.audio("door", "door.wav");
        this.load.audio("door_close", "door_close.wav");
        this.load.audio("power_up", "power_up.wav");
        this.load.audio("rockslide", "rockslide.wav");
        this.load.audio("alarm", "alarm.wav");
        this.load.audio("melt", "melt.wav");
        this.load.audio("skid", "skid.wav");
        this.load.audio("hum_Master", "hum_Master.wav");
        this.load.audio("music", "The_Artifact-fixed.wav");
        this.load.audio("music_alarm", "music_alarm.wav");

        //font
 //       this.load.bitmapFont('pixel_font', 'megaman_font_1.png', 'megaman_font_1.fnt');
    }

    create() {

        // player anims
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('glass', { start: 0, end: 0}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('glass', { start: 1, end: 8}),
            frameRate: 14,
            repeat: -1
        });
        this.anims.create({
            key: 'wall_stick',
            frames: this.anims.generateFrameNumbers('glass', { start: 9, end: 9}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'jump_1',
            frames: this.anims.generateFrameNumbers('glass', { start: 10, end: 10}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'jump_2',
            frames: this.anims.generateFrameNumbers('glass', { start: 11, end: 11}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'jump_3',
            frames: this.anims.generateFrameNumbers('glass', { start: 12, end: 12}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'jump_4',
            frames: this.anims.generateFrameNumbers('glass', { start: 13, end: 13}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'slide',
            frames: this.anims.generateFrameNumbers('glass', { start: 14, end: 14}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'turnaround',
            frames: this.anims.generateFrameNumbers('glass', { start: 15, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        // artifact anims
        this.anims.create({
            key: 'artifact-idle',
            frames: this.anims.generateFrameNumbers('artifact', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // siren anims
        this.anims.create({
            key: 'siren-idle',
            frames: this.anims.generateFrameNumbers('siren', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'siren-active',
            frames: this.anims.generateFrameNumbers('siren', { start: 1, end: 6 }),
            frameRate: 10,
            repeat: -1
        });


         this.scene.start("platformerScene");

        


    }

    // Never get here since a new scene is started in create()
    update() {
    }
}