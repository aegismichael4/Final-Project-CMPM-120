class Timer extends Phaser.Scene {

    constructor() {
        super('timer');

    }

    init(scene) {
        this.scene = scene;
    }

    create() {
        
        this.scoreText = this.scene.add.text(20, 10, "", {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#000000',
        });

        this.scoreText.setScrollFactor(0);

        this.elapsedTime = 0;
    }

    update(delta) {

        this.elapsedTime += delta;

        let elapsedSeconds = (this.elapsedTime / 1000);
        let elapsedMinutes = Math.floor(elapsedSeconds / 60);

        elapsedSeconds -= 60 * elapsedMinutes;
        elapsedSeconds = Math.trunc(elapsedSeconds * 100) / 100

        let outputSeconds;
        if (elapsedSeconds < 10) outputSeconds = "0" + String(elapsedSeconds);
        else outputSeconds = String(elapsedSeconds);

        let outputMinutes;
        if (elapsedMinutes < 10) outputMinutes = "0" + String(elapsedMinutes);
        else outputMinutes = String(elapsedMinutes);

        this.scoreText.text = outputMinutes + ":" + outputSeconds;

    }
}