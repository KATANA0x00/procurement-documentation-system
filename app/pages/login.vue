<template>
    <div class="page">
        <img src="~/assets/logo.png" alt="KMITL-LOGO">

        <div class="container">
            <form @submit.prevent="onSubmit">
                <div>
                    <label for="email">Email (@kmitl.ac.th)</label>
                    <input id="email" v-model="state.email" type="email" placeholder="example.ex@kmitl.ac.th"
                        required />
                </div>
                <div>
                    <label for="password">Password</label>
                    <div
                        style="display: flex; flex-direction: row; width: 100%; align-items: center;position: relative;">
                        <input id="password" v-model="state.password" :type="showPassword ? 'text' : 'password'"
                            style="width: 100%;" required />
                        <button type="button" @click="showPassword = !showPassword">
                            <Icon :name="showPassword ? 'fluent:eye-hide-20-regular' : 'fluent:eye-show-20-regular'"
                                size="2em" />
                        </button>
                    </div>
                </div>

                <div>
                    <label :style="{
                        color: responseMessage && responseMessage !== '-' ? 'var(--color-red)' : 'transparent',
                        fontSize: '16px',
                        fontWeight: '400'
                    }">{{ responseMessage }}</label>
                    <button type="submit">
                        <Icon v-if="submitState" name="line-md:loading-twotone-loop" size="1.6em"
                            style="transform: translateY(4px);" />
                        <span v-else>Login</span>
                    </button>

                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
useHead({
  title: "PASADU : เข้าสู่ระบบ",
});

definePageMeta({
    layout: 'empty'
})

const responseMessage = ref('-')
const showPassword = ref(false)
const submitState = ref(false)
const state = reactive({
    email: '',
    password: ''
})

async function onSubmit() {
    submitState.value = true;

    const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: state
    })
    responseMessage.value = response.message

    if(response.isAuth) {
        navigateTo(response.redirect);
    }

    submitState.value = false;
}
</script>

<style scoped>
.page {
    background-color: var(--color-sub-light);
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 180px;
        transform: translateY(50%);
    }
}

.container {
    width: 500px;
    background-color: var(--color-theme);
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.25);
    padding: 120px 0;
    border-radius: 16px;

    div {
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: 10px auto;

        label {
            font-size: 20px;
            font-weight: 600;
            margin: 5px 0;
        }

        input {
            font-size: 16px;
            font-weight: 400;
            background-color: var(--color-sub-light);
            border: 1px solid var(--color-sub-mid);
            border-radius: 8px;
            padding: 15px 20px;
        }

        button[type='button'] {
            position: absolute;
            padding: 12px;
            padding-top: 16px;
            right: 0;
            border: none;
            border-radius: 0 8px 8px 0;
            background-color: transparent;
            cursor: pointer;
        }

        button[type='submit'] {
            width: 100%;
            padding: 12px 0;
            border: 2px solid var(--color-orange);
            border-radius: 16px;
            background-color: var(--color-orange);
            cursor: pointer;

            span {
                color: white;
                font-size: 22px;
                font-weight: 600;
            }
        }

        button[type='submit']:hover {
            background-color: #fff;

            span {
                color: var(--color-orange);
            }
        }
    }
}
</style>