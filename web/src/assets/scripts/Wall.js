import { AcGameObject } from "./AcGameObjects";

export class Wall extends AcGameObject {
    constructor(game_map, r, c) {
        super();
        this.game_map = game_map;
        this.r = r;
        this.c = c;
        this.color = "#554A3C";
    }

    update() {
        this.render();
    }

    render() {
        const L = this.game_map.L;
        const ctx = this.game_map.ctx;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.c * L, this.r * L, L, L);
    }
}