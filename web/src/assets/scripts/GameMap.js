import { AcGameObject } from "./AcGameObjects";
import { Wall } from "./Wall";
import { Snake } from "./Snake";

export class GameMap extends AcGameObject {
    constructor(ctx, parent, store) {
        super();
        this.ctx = ctx;
        this.parent = parent;
        this.store = store;
        this.L = 0;

        this.row = 13;
        this.col = 14;

        this.inner_walls_count = 20;
        this.walls = [];

        this.snakes = [
            new Snake({id: 0, color: "#4876EC", r: this.row - 2, c: 1}, this),
            new Snake({id: 1, color: "#F94848", r: 1, c: this.col - 2}, this),
        ];
    }

    create_walls() {
        const g = this.store.state.pk.gamemap;
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                if (g[r][c]) {
                    this.walls.push(new Wall(this, r, c));
                }
            }
        }
        return true;
    }

    add_listening_events() {
        this.ctx.canvas.focus();

        this.ctx.canvas.addEventListener("keydown", e => {
            let d = -1;
            if (e.key === "w") d = 0;
            else if (e.key === "d") d = 1;
            else if (e.key === "s") d = 2;
            else if (e.key === "a") d = 3;

            if (d >= 0) {
                this.store.state.pk.socket.send(JSON.stringify({
                    event: "move",
                    direction: d,
                }));
            }
        });
    }

    start(){
        this.create_walls();
        this.add_listening_events();
    }

    update_size() {
        this.L = parseInt(Math.min(this.parent.clientWidth / this.col, this.parent.clientHeight / this.row));
        this.ctx.canvas.width = this.L * this.col;
        this.ctx.canvas.height = this.L * this.row;
    }

    check_ready() {
        for (const snake of this.snakes) {
            if (snake.status !== "idle") return false;
            if (snake.direction === -1) return false;
        }
        return true;
    }

    next_step() { // 让两条蛇进入下一回合
        for (const snake of this.snakes) {
                snake.next_step();  //sknake.js里的方法
        }
    }

    check_valid(cell) { // 检测目标位置是否合法：没有撞到墙，没有撞到蛇身
        for (const wall of this.walls) {
            if (wall. r === cell.r && wall.c === cell.c) return false;
        }

        for (const snake of this.snakes) {
            let k = snake.cells.length;
            if (!snake.check_tail_increasing()) { //当蛇尾会前进的时候，蛇尾不会增加，最后一个位置会消失
                k -- ;
            }
            for (let i = 0; i < k; i++) {
                if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c) return false;
            }
        }

        return true;
    }

    update() {
        this.update_size();
        if (this.check_ready()) {
            this.next_step();
        }
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