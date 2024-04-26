<template>
    <div class="not-found">
        <h1>404</h1>
        <p>糟糕! 页面找不到了。</p>
        <router-link to="/">返回首页</router-link>
    </div>
</template>

<style scoped>
.not-found {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
    font-family: Arial, sans-serif;
    background-color: rgb(245, 245, 245);
}

h1 {
    margin-top: 24vh;
    font-size: 4em;
    margin-bottom: 10px;
    color: #333;
}

p {
    font-size: 1.2em;
    margin-bottom: 20px;
    color: #666;
}

a {
    font-size: 1em;
    text-decoration: none;
    color: #007bff;
    transition: color 0.3s ease;
}

a:hover {
    color: #0056b3;
}
</style>