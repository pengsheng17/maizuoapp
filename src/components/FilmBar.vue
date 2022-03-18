<template>
    <div>
        <ul>
            <router-link to="/film/nowplaying" tag="li" activeClass="filmbar">正在热映</router-link>
            <router-link to="/film/Comingsoon" tag="li" activeClass="filmbar">即将上映</router-link>
        </ul>
    </div>
</template>
<style scoped lang="scss">
.filmbar{
    color: orangered;
}
div{
    height: 49px;
    width: 100%;
    background: #fff;
    ul{
        display: flex;
        li{
            line-height: 49px;
            text-align: center;
            flex: 1;
        }
    }
}
</style>
