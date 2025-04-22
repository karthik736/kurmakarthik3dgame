import { _decorator, Component, EventTouch, Input, Vec2, Vec3, tween } from 'cc';
import { TowerRotator } from './TowerRotator'; // ✅ Make sure path is correct

const { ccclass } = _decorator;

@ccclass('ColorGroupRotator')
export class ColorGroupRotator extends Component {
    private rotating = false;
    private lastTouchPos: Vec2 = new Vec2();
    private currentAngle = 0;

    onLoad() {
        this.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this, true);
        this.node.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        this.node.on(Input.EventType.TOUCH_END, this.onTouchEnd, this, true);
    }

    onTouchStart(event: EventTouch) {
        this.rotating = true;
        this.lastTouchPos = event.getUILocation();

        TowerRotator.blockTowerRotation = true; // ✅ Lock tower
        event.propagationStopped = true;
    }

    onTouchMove(event: EventTouch) {
        if (!this.rotating) return;

        const currentPos = event.getUILocation();
        const deltaX = currentPos.x - this.lastTouchPos.x;
        this.lastTouchPos = currentPos;

        this.currentAngle += deltaX * 0.5;
        this.node.setRotationFromEuler(new Vec3(0, this.currentAngle, 0));

        event.propagationStopped = true;
    }

    onTouchEnd(event: EventTouch) {
        this.rotating = false;
        TowerRotator.blockTowerRotation = false; // ✅ Unlock tower

        const snapped = Math.round(this.currentAngle / 60) * 60;
        this.currentAngle = snapped;

        tween(this.node)
            .to(0.2, { eulerAngles: new Vec3(0, snapped, 0) })
            .start();

        event.propagationStopped = true;
    }
}
