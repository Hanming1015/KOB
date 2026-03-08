<template>
    <PlayGround v-if="$store.state.pk.status === 'playing'" />
    <MatchGround v-else-if="$store.state.pk.status === 'matching'" />
</template>

<script>
import PlayGround from '@/components/PlayGround.vue';
import MatchGround from '@/components/MatchGround.vue';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'PkIndexView',
    components: {
        PlayGround,
        MatchGround,
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
                    }, 3000);
                    store.commit("updateGamemap", data.gamemap);
                }
            }

            socket.onclose = () => {
                console.log('WebSocket connection closed');
            }
        });

        onUnmounted(() => {
            socket.close();
            store.commit("updateStatus", "playing");
        });
    }
};

</script>

<style scoped></style>