<template>
    <div class="matchground">
        <div class="row">
            <div class="col-4">
                <div class="user-photo">
                    <img :src="$store.state.user.photo" alt="User Photo">
                </div>
                <div class="username">
                    {{ $store.state.user.username }}
                </div>
            </div>
            <div class="col-4">
                <div class="user-select-bot">
                    <select class="form-select" aria-label="Default select example" v-model="selected_bot">
                        <option selected value="-1">Player</option>
                        <option v-for="bot in bots" :key="bot.id" :value="bot.id">
                            {{ bot.title }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="col-4">
                <div class="user-photo">
                    <img :src="$store.state.pk.opponent_photo" alt="Opponent Photo">
                </div>
                <div class="username">
                    {{ $store.state.pk.opponent_username }}
                </div>
            </div>
            <div class="col-12" style="text-align: center; padding-top: 15vh;">
                <button @click="click_match_btn" type="button" class="btn btn-warning btn-lg">{{ match_btn_info
                    }}</button>
            </div>
        </div>
    </div>

</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';

export default {
    name: 'MatchGround',

    setup() {
        const store = useStore();
        let match_btn_info = ref("Start Matching");
        let bots = ref([]);
        let selected_bot = ref("-1");

        const click_match_btn = () => {
            if (match_btn_info.value === "Start Matching") {
                match_btn_info.value = "Cancel Matching";
                store.state.pk.socket.send(JSON.stringify({
                    event: "start-matching",
                    bot_id: selected_bot.value
                }));
            } else {
                match_btn_info.value = "Start Matching";
                store.state.pk.socket.send(JSON.stringify({
                    event: "stop-matching",
                }));
            }
        }

        const refresh_bots = () => {
            $.ajax({
                url: 'http://localhost:3000/user/bot/getlist/',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                },
                success: (resp) => {
                    //console.log(resp);
                    bots.value = resp;
                }
            });
        };

        refresh_bots();

        return {
            match_btn_info,
            click_match_btn,
            bots,
            selected_bot

        }
    }
};
</script>

<style scoped>
div.matchground {
    width: 60vw;
    height: 70vh;
    margin: 5vh auto;
    background-color: rgba(50, 50, 50, 0.5);
}

div.user-photo {
    text-align: center;
    padding-top: 10vh;
}

div.user-photo>img {
    width: 20vh;
    border-radius: 50%;
    object-fit: cover;
}

div.username {
    text-align: center;
    margin-top: 10px;
    font-size: 1.5em;
    font-weight: bold;
    color: white;
    padding-top: 2vh;
}

div.user-select-bot {
    padding-top: 15vh;
}

div.user-select-bot > select {
    width: 70%;
    margin: 0 auto;
}
</style>