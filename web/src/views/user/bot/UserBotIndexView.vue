<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <img :src="$store.state.user.photo" alt="User Avatar" style="width: 100%;">
                    </div>
                </div>
            </div>

            <div class="col-9">
                <div class="card">
                    <div class="card-header">
                        <span style="font-size: 130%;">My Bots</span>

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-dark float-end" data-bs-toggle="modal"
                            data-bs-target="#add-bot-btn">
                            Create Bot
                        </button>

                        <!-- Modal Add -->
                        <div class="modal fade" id="add-bot-btn" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-xl">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5">Create Bot</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="mb-3">
                                                <label for="add-bot-title" class="form-label">Bot Title</label>
                                                <input v-model="botadd.title" type="text" class="form-control"
                                                    id="add-bot-title" placeholder="Enter bot title">
                                            </div>
                                            <div class="mb-3">
                                                <label for="add-bot-description" class="form-label">Description</label>
                                                <input v-model="botadd.description" type="text" class="form-control"
                                                    id="add-bot-description" placeholder="Enter bot description">
                                            </div>
                                            <div class="mb-3">
                                                <label for="add-bot-code" class="form-label">Code</label>
                                                <VAceEditor v-model:value="botadd.content" @init="editorInit" lang="c_cpp"
                                                theme="textmate" style="height: 300px" :options="{
                                                    enableBasicAutocompletion: true, //启用基本自动完成
                                                    enableSnippets: true, // 启用代码段
                                                    enableLiveAutocompletion: true, // 启用实时自动完成
                                                    fontSize: 18, //设置字号
                                                    tabSize: 4, // 标签大小
                                                    showPrintMargin: false, //去除编辑器里的竖线
                                                    highlightActiveLine: true,
                                                }" />  
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <div class="error-message">{{ botadd.error_message }}</div>
                                        <button type="button" class="btn btn-danger"
                                            data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-primary" @click="add_bot"
                                            data-bs-dismiss="modal">Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card-body">
                        <table class="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Create Time</th>
                                    <th scope="col">Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="bot in bots" :key="bot.id">
                                    <td>{{ bot.title }}</td>
                                    <td>{{ bot.createTime }}</td>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-outline-secondary"
                                            style="margin-right: 10px;" data-bs-dismiss="modal" data-bs-toggle="modal"
                                            :data-bs-target="'#update-bot-modal-' + bot.id">Edit</button>
                                        <button type="button" class="btn btn-sm btn-outline-danger"
                                            @click="remove_bot(bot)">Delete</button>

                                        <!-- Modal Update -->
                                        <div class="modal fade" :id="'update-bot-modal-' + bot.id" tabindex="-1"
                                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-xl">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5">Update Bot
                                                        </h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form>
                                                            <div class="mb-3">
                                                                <label for="add-bot-title" class="form-label">Bot
                                                                    Title</label>
                                                                <input v-model="bot.title" type="text"
                                                                    class="form-control" id="add-bot-title"
                                                                    placeholder="Enter bot title">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="add-bot-description"
                                                                    class="form-label">Description</label>
                                                                <input v-model="bot.description" type="text"
                                                                    class="form-control" id="add-bot-description"
                                                                    placeholder="Enter bot description">
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="add-bot-code"
                                                                    class="form-label">Code</label>
                                                                <VAceEditor v-model:value="bot.content" @init="editorInit"
                                                                lang="c_cpp" theme="textmate" style="height: 300px"
                                                                :options="{
                                                                    enableBasicAutocompletion: true, //启用基本自动完成
                                                                    enableSnippets: true, // 启用代码段
                                                                    enableLiveAutocompletion: true, // 启用实时自动完成
                                                                    fontSize: 18, //设置字号
                                                                    tabSize: 4, // 标签大小
                                                                    showPrintMargin: false, //去除编辑器里的竖线
                                                                    highlightActiveLine: true,
                                                                }" />
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <div class="error-message">{{ bot.error_message }}</div>
                                                        <button type="button" class="btn btn-danger"
                                                            data-bs-dismiss="modal">Cancel</button>
                                                        <button type="button" class="btn btn-primary"
                                                            data-bs-dismiss="modal"
                                                            @click="update_bot(bot)">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/ext-language_tools';

export default {
    name: 'UserBotIndexView',
    components: {
        VAceEditor
    },

    setup() {
        //ACEeditor
        ace.config.set(
            "basePath",
            "https://cdn.jsdelivr.net/npm/ace-builds@" +
            require("ace-builds").version +
            "/src-noconflict/");

        const store = useStore();
        let bots = ref([]);

        const botadd = reactive({
            title: '',
            description: '',
            content: '',
            error_message: '',
        });

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

        const add_bot = () => {
            botadd.error_message = '';
            $.ajax({
                url: 'http://localhost:3000/user/bot/add/',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                },
                data: {
                    title: botadd.title,
                    description: botadd.description,
                    content: botadd.content
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        //botadd.error_message = '';
                        botadd.title = '';
                        botadd.description = '';
                        botadd.content = '';
                        refresh_bots();
                    } else {
                        botadd.error_message = resp.error_message;
                    }
                }
            });
        };

        const remove_bot = (bot) => {
            $.ajax({
                url: 'http://localhost:3000/user/bot/remove/',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                },
                data: {
                    bot_id: bot.id
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        refresh_bots();
                    }
                }
            });
        };

        const update_bot = (bot) => {
            bot.error_message = '';
            $.ajax({
                url: 'http://localhost:3000/user/bot/update/',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + store.state.user.token
                },
                data: {
                    title: bot.title,
                    description: bot.description,
                    content: bot.content,
                    bot_id: bot.id
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        refresh_bots();
                    } else {
                        bot.error_message = resp.error_message;
                    }
                }
            });
        };

        return {
            bots,
            botadd,
            add_bot,
            remove_bot,
            update_bot,
            editorInit(editor) {
                editor.setOptions({
                    enableBasicAutocompletion: true, //启用基本自动完成
                    enableSnippets: true, // 启用代码段
                    enableLiveAutocompletion: true, // 启用实时自动完成
                    fontSize: 18, //设置字号
                    tabSize: 4, // 标签大小
                    showPrintMargin: false, //去除编辑器里的竖线
                    highlightActiveLine: true,
                });
            }
        }
    }
};
</script>

<style scoped>
.card {
    margin-top: 20px;
}

div.error-message {
    color: red;
    float: left;
    margin-top: 5px;
}
</style>