
<template>
 
  <div class="menu-parameter" :class=" open ? 'open' : '' " >
    <div class="arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
    </div>
    <label class="volume">
        <input type="checkbox">
        <svg viewBox="0 0 108 96">
            <path d="M7,28 L35,28 L35,28 L59,8 L59,88 L35,68 L7,68 C4.790861,68 3,66.209139 3,64 L3,32 C3,29.790861 4.790861,28 7,28 Z"></path>
            <path d="M79,62 C83,57.3333333 85,52.6666667 85,48 C85,43.3333333 83,38.6666667 79,34 L49,3"></path>
            <path d="M95,69 C101.666667,61.6666667 105,54.3333333 105,47 C105,39.6666667 101.666667,32.3333333 95,25 L75.5,6 L49,33"></path>
        </svg>
        Music
    </label>

  </div>

</template>

<script>
export default {
    data: function (){
        return{
            open : false,
        }
    }
}
</script>

<style lang="scss">
    .menu-parameter{
        display: flex;
        background-color: brown;
        position: absolute;
        top: 30px;
        left: 0;
        width: 300px;
        padding: 20px;
        .arrow{
            position: absolute;
            right: -24px;
            top: 0;
            background-color: brown;
        }
    }

    label.volume {
    --line: #FFF;
    --line-width: 6px;
    --duration: .5s;
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    input {
        display: none;
        & + svg {
            display: block;
            fill: none;
            stroke: var(--line);
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: var(--line-width);
            width: 70px;
            height: 65px;
            path {
                animation: var(--name) var(--duration) ease forwards;
                &:nth-child(2) {
                    stroke-dashoffset: 1px;
                }
                &:nth-child(3) {
                    stroke-dashoffset: 1px;
                }
            }
        }
        &:checked {
            & + svg {
                path {
                    &:nth-child(1) {
                        --name: shape;
                    }
                    &:nth-child(2) {
                        --name: small;
                    }
                    &:nth-child(3) {
                        --name: large;
                    }
                }
            }
        }
        &:not(:checked) {
            & + svg {
                path {
                    &:nth-child(1) {
                        --name: shape-r;
                    }
                    &:nth-child(2) {
                        --name: small-r;
                    }
                    &:nth-child(3) {
                        --name: large-r;
                    }
                }
            }
        }
    }
}

@keyframes small {
    0%,
    30% {
        stroke-dasharray: 0 0 30px 64px;
    }
    40% {
        stroke-dashoffset: 16px;
    }
    80%,
    100% {
        stroke-dashoffset: 1px;
    }
    70% {
        stroke-dasharray: 0 43px 30px 64px;
    }
    100% {
        stroke-dasharray: 0 39px 30px 64px;
    }
}

@keyframes small-r {
    0% {
        stroke-dasharray: 0 39px 30px 64px;
    }
    0%,
    40% {
        stroke-dashoffset: 1px;
    }
    70% {
        stroke-dashoffset: 16px;
    }
    70%,
    100% {
        stroke-dasharray: 0 0 30px 64px;
    }
}

@keyframes large {
    0%,
    30% {
        stroke-dasharray: 0 0 50px 84px;
    }
    40% {
        stroke-dashoffset: 16px;
    }
    80%,
    100% {
        stroke-dashoffset: 1px;
    }
    70% {
        stroke-dasharray: 0 82px 32px 84px;
    }
    100% {
        stroke-dasharray: 0 78px 32px 84px;
    }
}

@keyframes large-r {
    0% {
        stroke-dasharray: 0 78px 32px 84px;
    }
    0%,
    40% {
        stroke-dashoffset: 1px;
    }
    70% {
        stroke-dashoffset: 16px;
    }
    70%,
    100% {
        stroke-dasharray: 0 0 50px 84px;
    }
}

@keyframes shape {
    0% {
        stroke-dasharray: 60px 0 184px;
        stroke-dashoffset: 0;
    }
    70% {
        stroke-dasharray: 63px 51px 184px;
        stroke-dashoffset: 21px;
    }
    100% {
        stroke-dasharray: 59px 47px 184px;
        stroke-dashoffset: 17px;
    }
}

@keyframes shape-r {
    0% {
        stroke-dasharray: 59px 47px 184px;
        stroke-dashoffset: 17px;
    }
    100% {
        stroke-dasharray: 60px 0 184px;
        stroke-dashoffset: 0;
    }
}

html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}

* {
    box-sizing: inherit;
    &:before,
    &:after {
        box-sizing: inherit;
    }
}

</style>