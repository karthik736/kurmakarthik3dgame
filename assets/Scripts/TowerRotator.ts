import { _decorator, Component, EventMouse, EventTouch, input, Input, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('TowerRotator')
export class TowerRotator extends Component {
    public static blockTowerRotation: boolean = false;

    private lastX: number = 0;
    private isDragging: boolean = false;

    onLoad() {
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onDestroy() {
        input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);

        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    // Mouse handlers
    onMouseDown(event: EventMouse) {
        this.isDragging = true;
        this.lastX = event.getLocationX();
    }

    onMouseMove(event: EventMouse) {
        if (!this.isDragging || TowerRotator.blockTowerRotation) return;

        const currentX = event.getLocationX();
        const deltaX = currentX - this.lastX;
        this.lastX = currentX;

        this.rotateTower(deltaX);
    }

    onMouseUp(event: EventMouse) {
        this.isDragging = false;
    }

    // Touch handlers
    onTouchStart(event: EventTouch) {
        this.isDragging = true;
        this.lastX = event.getLocationX();
    }

    onTouchMove(event: EventTouch) {
        if (!this.isDragging || TowerRotator.blockTowerRotation) return;

        const currentX = event.getLocationX();
        const deltaX = currentX - this.lastX;
        this.lastX = currentX;

        this.rotateTower(deltaX);
    }

    onTouchEnd(event: EventTouch) {
        this.isDragging = false;
    }

    private rotateTower(deltaX: number) {
        const rotation = this.node.eulerAngles;
        rotation.y += deltaX * 0.5;
        this.node.setRotationFromEuler(rotation);
    }
}
