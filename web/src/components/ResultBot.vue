<template>
    <div class="result-bot">
        <div class="result-bot-text" v-if="$store.state.pk.loser === 'all'">
            Draw
        </div>
        <div class="result-bot-text" v-else-if="$store.state.pk.loser === 'A' && $store.state.pk.a_id === parseInt($store.state.user.id)">
            You Lose
        </div>
        <div class="result-bot-text" v-else-if="$store.state.pk.loser === 'B' && $store.state.pk.b_id === parseInt($store.state.user.id)">
            You Lose
        </div>
        <div class="result-bot-text" v-else>
            You Win
        </div>
        <div class="result-bot-btn">
            <button type="button" class="btn btn-warning btn-lg" @click="restart">
                Restart
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";

export default {
    name: 'ResultBot',
    setup() {
        const store = useStore();

        const restart = () => {
            store.commit("updateStatus", "matching");
            store.commit("updateLoser", "none");
        }

        return {
            store,
            restart
        }

    },
};
</script>

<style scoped>
div.result-bot {
    height: 30vh;
    width: 30vw;
    background-color: rgba(50, 50, 50, 0.5);
    position: absolute;
    top: 30vh;
    left: 35vw;
}
div.result-bot-text {
    font-size: 4vh;
    color: white;
    text-align: center;
    margin-top: 4vh;
    font-weight: 600;
    font-style: italic;
    padding-top: 5vh;
}
div.result-bot-btn {
    padding-top: 5vh;
    text-align: center;

}
</style>