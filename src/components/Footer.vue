<template>
    <div id="myfooter">
        <div style="display: flex;padding: 0 100px;">
            <div class="footer_text">
                <h2>联系我们</h2>
                <p>微信：xxxxxxxxx</p>
                <p>邮箱：xxxxx@xx.com</p>
                <p>办公室：xxxxxxxxxxxxxx</p>
            </div>
            <div class="footer_text">
                <h2>xxxxx</h2>
            </div>
            <div class="footer_text">
                <h2>xxxxxxxx</h2>
            </div>
            <div class="footer_text">
                <h2>xxxxxxxx</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
#myfooter {
    background-color: rgb(159, 64, 58);
    margin: 0;
    padding: 50px;
    display: flex;
    color: white;
    flex-wrap: wrap;
}

.footer_text {
    text-align: left;
    margin-right: 50px;
}
</style>