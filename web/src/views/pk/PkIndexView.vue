<template>
    <PlayGround v-if="$store.state.pk.status === 'playing'" />
    <MatchGround v-else-if="$store.state.pk.status === 'matching'" />
    <ResultBot v-if="$store.state.pk.loser !== 'none'" />
</template>

<script>
import PlayGround from '@/components/PlayGround.vue';
import MatchGround from '@/components/MatchGround.vue';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import ResultBot from '@/components/ResultBot.vue';

export default {
    name: 'PkIndexView',
    components: {
        PlayGround,
        MatchGround,
        ResultBot,
    },
    setup() {
        const store = useStore();
        const socketUrl = `ws://localhost:3000/websocket/${store.state.user.token}/`;

        let socket = null;

        onMounted(() => {
            store.commit("updateOpponent", {
                username: "my opponent", 
                photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
            });
            socket = new WebSocket(socketUrl);

            socket.onopen = () => {
                console.log('WebSocket connection established');
                store.commit("updateSocket", socket);
            }

            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if (data.event === "start-matching") {
                    store.commit("updateOpponent", {
                        username: data.opponent_username,
                        photo: data.opponent_photo
                    });
                    setTimeout(() => {
                        store.commit("updateStatus", "playing");
                    }, 300);
                    store.commit("updateGame", data.game);
                } else if (data.event === "move") {
                    //console.log("Received move event:", data);
                    const game = store.state.pk.gameObject;
                    const [snake0, snake1] = game.snakes;
                    snake0.set_direction(data.a_direction);
                    snake1.set_direction(data.b_direction);
                } else if (data.event === "result") {
                    //console.log("Game result:", data);
                    const game = store.state.pk.gameObject;
                    const [snake0, snake1] = game.snakes;

                    if (Date.loser === "all" || data.loser === "A") {
                        snake0.status = "die";
                    }
                    if (data.loser === "all" || data.loser === "B") {
                        snake1.status = "die";
                    }
                    store.commit("updateLoser", data.loser);
                }
            }

            socket.onclose = () => {
                console.log('WebSocket connection closed');
            }
        });

        onUnmounted(() => {
            socket.close();
            store.commit("updateStatus", "matching");
        });
    }
};

</script>

<style scoped></style>