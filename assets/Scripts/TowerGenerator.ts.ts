import { _decorator, Component, Node, Prefab, instantiate, Material, MeshRenderer, Vec3, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TowerGenerator')
export class TowerGenerator extends Component {

    @property({ type: Node })
innerParent: Node = null;

@property({ type: Node })
outerParent: Node = null;


    @property({ type: Prefab })
    tilePrefab: Prefab = null;

    @property({ type: [Material] })
    materials: Material[] = [];

    @property
    innerColumnCount: number = 9;

    @property
    outerColumnCount: number = 18;

    @property
    innerRadius: number = 3;

    @property
    outerRadius: number = 5;

    @property
    tileHeight: number = 1.2;

    start() {
        this.createRotatingColorRing(this.innerColumnCount, this.innerRadius, 'Inner', this.in);
this.createRotatingColorRing(this.outerColumnCount, this.outerRadius, 'Outer', this.outerParent);

    }

    createRotatingColorRing(columnCount: number, radius: number, label: string) {
        const angleStep = (Math.PI * 2) / columnCount;

        for (let col = 0; col < columnCount; col++) {
            const angle = angleStep * col;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;

            const columnNode = new Node(`${label}_Column_${col}`);
            columnNode.setParent(this.node);
            columnNode.setPosition(new Vec3(x, 0, z));
            columnNode.setRotationFromEuler(0, -math.toDegree(angle), 0);

            this.buildColumnWithColorOffset(columnNode, col);
        }
    }

    buildColumnWithColorOffset(columnNode: Node, offset: number) {
        const colorsPerColumn = this.materials.length; // 9
        const repeatsPerColor = 6; // Each color appears 6 times
        const totalTiles = colorsPerColumn * repeatsPerColor;

        let tileIndex = 0;

        for (let i = 0; i < colorsPerColumn; i++) {
            const colorIndex = (i + offset) % colorsPerColumn;
            const mat = this.materials[colorIndex];

            for (let j = 0; j < repeatsPerColor; j++) {
                const tile = instantiate(this.tilePrefab);
                tile.setParent(columnNode);
                tile.setPosition(new Vec3(0, tileIndex * this.tileHeight, 0));

                const hex = tile.getChildByName("hexa_03"); // Adjust if your mesh is named differently
                if (hex) {
                    const mesh = hex.getComponent(MeshRenderer);
                    if (mesh) {
                        mesh.setMaterial(mat, 0);
                    }
                }

                tileIndex++;
            }
        }
    }
}
