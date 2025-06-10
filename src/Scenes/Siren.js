class Siren extends Phaser.Scene {

    constructor() {
        super('siren');
    }

    init(scene) {

        this.scene = scene;

        // sorry jim
        // i know my project and this is much faster i promise
        this.sirenLocations = [
            26, 3,
            40, 3,
            53, 12,
            67, 3,
            85, 3,
            97, 1,
        ];

        this.sirens = [];
        this.lights = [];
    }

    create() {

        this.scene.lights.enable();

        for (let i = 0; i < 11; i+=2) {

            let x = this.sirenLocations[i] * 36 + 18;
            let y = this.sirenLocations[i+1] * 36 + 18;

            // sirens
            let newSiren = this.scene.add.sprite(x, y, "siren");
            newSiren.anims.play('siren-idle');
            newSiren.setScale(2);
            this.sirens.push(newSiren);

            //lights
            let light = this.scene.add.sprite(x, y, "siren_light");
            light.setDepth(-8);
            light.setScale(2);
            light.alpha = 0;

            

            this.lights.push(light);

        }
    }

    activateSirens() {

        for (let siren in this.sirens) {
            this.sirens[siren].anims.play('siren-active');
        }

        for (let light in this.lights) {

            this.scene.tweens.add({
                targets: this.lights[light],
                alpha: 0.75,
                duration: 500,
            });

            this.scene.time.addEvent({
                callback: () => {
                    this.scene.tweens.add({
                        targets: this.lights[light],
                        alpha: 0.25,
                        yoyo: true,
                        repeat: -1,
                        ease: 'Sine.easeInOut',
                        duration: 500
                    });
                },
                delay: 500
            });
        }
    }
}