import {
    _decorator,
    Component,
    Node,
    Prefab,
    instantiate,
    Vec3,
    Material,
    math,
    MeshRenderer
} from 'cc';


const { ccclass, property } = _decorator;

@ccclass('TowerBuilder')
export class TowerBuilder extends Component {

    @property({ type: Prefab })
    hexTilePrefab: Prefab = null;

    @property({ type: [Material] })
    colorMaterials: Material[] = [];

    @property
    stackHeight: number = 54;

    @property
    tileHeight: number = 0.3;

    @property
    outerRadius: number = 5.0;

    @property
    innerRadius: number = 4.35;

    @property
    outerColumns: number = 18;

    @property
    innerColumns: number = 12;

    start() {
        this.buildRing(this.outerRadius, this.outerColumns, 0);       // Outer ring
        this.buildRing(this.innerRadius, this.innerColumns, 15);      // Inner ring (offset)
    }

    buildRing(radius: number, columnCount: number, angleOffset: number) {
        for (let i = 0; i < columnCount; i++) {
            const angleDeg = angleOffset + (i * 360 / columnCount);
            const rad = math.toRadian(angleDeg);

            const x = Math.cos(rad) * radius;
            const z = Math.sin(rad) * radius;

            const columnNode = new Node(`Column_${i}`);
            columnNode.setPosition(x, 0, z);
            columnNode.setRotationFromEuler(0, -angleDeg, 0);
            this.node.addChild(columnNode);

            const colorStack = this.generateShuffledColorStack();

            for (let h = 0; h < this.stackHeight; h++) {
                const y = h * this.tileHeight;
                const tile = instantiate(this.hexTilePrefab);
                tile.setPosition(0, y, 0); // local to column node

                // Assign color
                const material = colorStack[h];
                const renderer = tile.getComponent(MeshRenderer);
                if (renderer) renderer.setMaterial(material, 0);

                columnNode.addChild(tile);
            }
        }
    }

    generateShuffledColorStack(): Material[] {
        const colors: Material[] = [];

        // 9 colors × 6 tiles = 54 stack
        for (let i = 0; i < this.colorMaterials.length; i++) {
            for (let j = 0; j < 6; j++) {
                colors.push(this.colorMaterials[i]);
            }
        }

        // Shuffle the color stack (Fisher-Yates)
        for (let i = colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [colors[i], colors[j]] = [colors[j], colors[i]];
        }

        return colors;
    }
}
