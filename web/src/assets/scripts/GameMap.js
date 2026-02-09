import { AcGameObject } from "./AcGameObjects";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;

        this.row = 13;
        this.col = 13;

        this.inner_walls_count = 20;
        this.walls = [];
    }

    check_connnectivity(g, sx, sy, tx, ty) {
        if (sx === tx && sy === ty) return true;

        g[sx][sy] = true;
        const dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i++) {
            const x = sx + dx[i], y = sy + dy[i];
            if (x < 0 || x >= this.row || y < 0 || y >= this.col) continue;
            if (g[x][y]) continue;
            if (this.check_connnectivity(g, x, y, tx, ty)) return true;
        }
        return false;
    }

    createWalls() {
        const g = [];
        for (let r = 0; r < this.row; r++) {
            g[r] = [];
            for (let c = 0; c < this.col; c++) {
                g[r][c] = false;
            }
        }

        for (let r = 0; r < this.row; r++) {
            g[r][0] = g[r][this.col - 1] = true;
        }

        for (let c = 0; c < this.col; c++) {
            g[0][c] = g[this.row - 1][c] = true;
        }

        for (let i = 0; i < this.inner_walls_count / 2; i++) {
            for (let j = 0; j < 1000; j++) {
                let r = parseInt(Math.random() * this.row);
                let c = parseInt(Math.random() * this.col);
                if (g[r][c] || g[c][r]) continue;
                g[r][c] = g[c][r] = true;
                if (r == this.row - 2 && c == 1 || r == 1 && c == this.col - 2) 
                    continue;
                break;
            }
        }

        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_connnectivity(copy_g, this.row - 2, 1, 1, this.col - 2)) {
            return false;
        }

        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                if (g[r][c]) {
                    this.walls.push(new Wall(this, r, c));
                }
            }
        }

        return true;
    }

    // start(){
    //     for (let i = 0; i < 1000; i++) {
    //         if (this.createWalls()) break;
    //     }
    // }

    start() {
    for (let i = 0; i < 1000; i++) {
        // 打印尝试次数
        console.log(`第 ${i+1} 次尝试生成地图...`);
        
        if (this.createWalls()) {
            console.log("地图生成成功！");
            console.log("总共生成的墙数量:", this.walls.length);
            break;
        } else {
            console.log("生成失败（不连通），重试中...");
        }
    }
}
    update_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.col, this.parent.clientHeight / this.row));
        this.ctx.canvas.width = this.L * this.col;
        this.ctx.canvas.height = this.L * this.row;
    }

    update() {
        this.update_size();
        this.render();
    }

    render() {
        const color_even = "#AAD751", color_odd = "#A2D149";
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                if ((r + c) % 2 === 0) {
                    this.ctx.fillStyle = color_even;
                }   else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }

}