import { _decorator, Component, Material, Sprite, instantiate, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ColumnBehavior')
export class ColumnBehavior extends Component {

    @property({ type: [Material] })
    materials: Material[] = [];

    @property({ type: Prefab })
    tilePrefab: Prefab = null;

    @property
    tileCount: number = 20;

    start() {
        const spacing = 1.2;

        for (let i = 0; i < this.tileCount; i++) {
            const tile = instantiate(this.tilePrefab);
            tile.setParent(this.node);

            tile.setPosition(0, i * spacing, 0);

            const sprite = tile.getComponent(Sprite);

            // Random material from list
            const index = Math.floor(Math.random() * this.materials.length);
            sprite.material = this.materials[index];
        }
    }
}
