<template>
    <div>
        <div class="guangdongMap">
            <!-- 地图 -->
            <div class="svgC">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="953" height="640"
                    style="user-select: none; position: absolute; left: 0px; top: 0px;margin-left: -10vw;margin-top: -2vh;">
                    <g  @click="handleCityClick('广东省')">
                        <rect width="953" height="640" x="0" y="0" id="0" style="fill: transparent;"></rect>
                    </g>
                    <g>
                        <path id="中山市" @click="handleCityClick('中山市')"
                            d="M 585.5372 395.6545 L 561.6609 391.1981 L 544.3913 398.8758 L 540.2769 394.1512 L 530.4246 400.0565 L 529.9611 412.2995 L 523.7022 417.5615 L 527.0059 430.9328 L 525.3832 442.1041 L 528.4548 453.9741 L 526.252 467.4028 L 529.6132 468.4776 L 536.6835 484.0025 L 528.5122 490.3423 L 520.6888 489.5367 L 511.2426 498.0261 L 518.7764 504.5806 L 530.8307 526.3979 L 537.1471 541.7685 L 544.4495 547.2503 L 543.232 558.9146 L 517.5597 570.6868 L 523.2387 581.9761 L 505.3316 590.3102 L 502.086 595.4179 L 481.0499 607.9998 L 469.8652 606.3866 L 451.0886 577.192 L 446.8003 578.6973 L 421.9393 559.7747 L 416.4336 550.2609 L 410.0008 528.5475 L 398.4108 496.1991 L 397.7151 478.684 L 387.7472 461.6014 L 362.5384 423.0393 L 354.0775 415.6822 L 349.3257 396.7817 L 349.3832 369.5633 L 340.8648 349.9167 L 337.0401 330.8651 L 325.6815 309.7223 L 325.6815 309.7223 L 318.3216 293.6257 L 296.9368 266.5878 L 298.1543 253.6077 L 295.4305 231.9396 L 288.8238 216.0669 L 274.2197 191.6716 L 274.3362 173.7128 L 278.8558 154.2014 L 284.4773 154.2014 L 277.0599 140.0528 L 277.5235 131.6924 L 285.5208 124.6731 L 298.6753 131.5321 L 307.484 129.4421 L 306.1516 122.7978 L 309.9182 107.901 L 323.537 92.846 L 334.1424 64.0799 L 339.2421 59.4743 L 347.5873 64.0265 L 352.7444 74.6322 L 360.0468 78.4897 L 370.8836 66.0087 L 383.4014 68.6331 L 404.3219 63.598 L 404.4958 55.7781 L 414.4055 46.4589 L 426.7494 39.7652 L 431.5587 31.9998 L 467.1415 61.9908 L 477.6887 66.8657 L 494.0887 69.0616 L 509.3302 76.454 L 506.9543 84.0602 L 527.4112 105.3834 L 551.2294 126.0665 L 564.3264 139.2492 L 558.5893 149.1642 L 561.4287 158.1144 L 580.1472 198.4268 L 592.9546 201.3759 L 601.5894 210.8664 L 608.8918 211.67 L 624.8866 226.6313 L 638.9107 258.167 L 648.1829 290.9962 L 678.781 291.5871 L 660.9321 326.571 L 632.9996 331.0788 L 616.831 361.5649 L 589.3038 395.8693 L 585.5372 395.6545 Z"
                            fill="#FFF" fill-opacity="1" stroke="#666" stroke-width="1" paint-order="fill"
                            stroke-opacity="1" stroke-dasharray="" stroke-linecap="butt" stroke-linejoin="miter"
                            stroke-miterlimit="10" transform="matrix(1,0,0,1,0,0)" clip-path="none">
                            <title>中山市</title>
                        </path>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import store from '../../store';


function getdata() {
    let list = store.state.mapList
    list.forEach(item => {
        maps(item.mapName, item.color)
        if(item.children){
            item.children.forEach(child => {
                maps(child.mapName, child.color)
            });
        }
    })
}

function maps(mapName, rgbS) {
    const path = document.getElementById(mapName);
    if (path) {
        if (path.style.fill != rgbS)
            path.style.fill = rgbS
        else
            path.style.fill = ''
    }
};

function handleCityClick(cityName) {
    store.state.selectedMapComponent = cityName
}

onMounted(() => {
    getdata()
})

</script>

<style scoped>
.guangdongMap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.svgC {
    width: 780px;
    height: 640px;
    position: relative;
    margin-right: -8vw;
}
</style>