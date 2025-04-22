import { _decorator, Component, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackgroundMusic')
export class BackgroundMusic extends Component {
    @property(AudioSource)
    audioSource: AudioSource = null;

    start() {
        if (this.audioSource) {
            this.audioSource.play();
        } else {
            console.warn("No AudioSource assigned!");
        }
    }
}
