import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AutoTowerRotator')
export class AutoTowerRotator extends Component {
    @property
    speed: number = 10; // Degrees per second

    update(deltaTime: number) {
        const currentRotation = this.node.eulerAngles;
        currentRotation.y += this.speed * deltaTime;
        this.node.setRotationFromEuler(currentRotation);
    }
}
