class Door extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.scene = scene;
        this.closing = false;
    }

    startClosing() {
        this.scene.doorSFX.play();
        this.scene.particles.doorPebbles.start();

        // wait until the camera pans, then start closing quickly while the camera is looking
        // wait 3.8 seconds, close quickly for 6.2 seconds (10 overall)
        this.scene.time.addEvent({
            callback: () => {
                
                this.scene.tweens.add({
                    targets:  this,
                    y:   18 * 0,
                    duration: 6000
                });

                this.scene.tweens.add({
                    targets:  this.body,
                    y:   18 * -14,
                    duration: 6000
                });

            },
            callbackContext: this,
            duration: 4000
        });

        // after first ten seconds, set door to move the rest of the way shut for 80 seconds
        this.scene.time.addEvent({
            callback: () => {
                
                this.scene.tweens.add({
                    targets:  this,
                    y:   18 * 20,
                    duration: 80000
                });

                this.scene.tweens.add({
                    targets:  this.body,
                    y:   18 * 6,
                    duration: 80000
                });

            },
            callbackContext: this,
            delay: 10000
        });

        this.closing = true;
    }

    update() {
        if (this.closing && this.y >= 359) {
            this.scene.doorSFX.stop();
            this.scene.rockslide.stop();
            this.scene.alarm.stop();
            this.scene.particles.pebbles.stop();
            this.scene.particles.doorPebbles.stop();
            this.scene.doorCloseSFX.play();
            this.closing = false;
        }
    }
}