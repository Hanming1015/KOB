<template>
    <ContentField>
        bots
    </ContentField>
</template>

<script>
import ContentField from '@/components/ContentField.vue';
import $ from 'jquery';
import { useStore } from 'vuex';

export default {
    name: 'UserBotIndexView',
    components: {
        ContentField,
    },
    setup() {
        const store = useStore();
        
        // $.ajax({
        //     url: "http://localhost:3000/user/bot/add/",
        //     type: "POST",
        //     data: {
        //         title: "MyBot",
        //         description: "This is my bot.",
        //         content: "print('Hello, world!')",
        //     },
        //     headers: {
        //         Authorization: "Bearer " + store.state.user.token,
        //     },
        //     success(resp) {
        //         console.log(resp);
        //     },
        //     error(resp) {
        //         console.log(resp);
        //     }
        // })

        // $.ajax({
        //     url: "http://localhost:3000/user/bot/remove/",
        //     type: "POST",
        //     data: {
        //         bot_id: 1, 
        //     },
        //     headers: {
        //         Authorization: "Bearer " + store.state.user.token,
        //     },
        //     success(resp) {
        //         console.log(resp);
        //     },
        //     error(resp) {
        //         console.log(resp);
        //     }
        // })

        $.ajax({
            url: "http://localhost:3000/user/bot/update/",
            type: "POST",
            data: {
                bot_id: 2,
                title: "MyBot_updated",
                description: "This is my updated bot.",
                content: "print('updated successfully!')",
            },
            headers: {
                Authorization: "Bearer " + store.state.user.token,
            },
            success(resp) {
                console.log(resp);
            },
            error(resp) {
                console.log(resp);
            }
        })
    }
};
</script>

<style scoped>
</style>