<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600&display=swap');

:root {
    --color-theme: #FFF;
    --color-orange: #E35205;
    --color-sub-light: #FBFBFB;
    --color-sub-mid: #E5E7E8;
    --color-sub-dark: #888888;

    --color-red: #FB4141;
}

* {
    font-family: "Prompt", sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: black;

    box-sizing: border-box;
}

html {
    overflow: hidden;
    height: 100%;
}

body {
    margin: 0;
    padding: 0;

    overflow: auto;
    height: 100%;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

body::-webkit-scrollbar {
    display: none;
}
</style>