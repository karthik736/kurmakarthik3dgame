import { _decorator, Component, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BackgroundAnimator')
export class BackgroundAnimator extends Component {
    @property
    rotateSpeed: number = 5;

    update(deltaTime: number) {
        const rotation = this.node.eulerAngles;
        rotation.y += this.rotateSpeed * deltaTime;
        this.node.setRotationFromEuler(rotation);
    }
}
