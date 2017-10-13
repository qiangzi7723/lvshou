<template>
    <div class='dialog'>
        <section class="trigger-tip" v-show='show'>{{this.title}}</section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: ['title','show']
    }

</script>

<style lang='scss'>
    @import '../../assets/scss/extend.scss';
    .dialog {
        .trigger-tip {
            display: inline-block;
            font-size: tr(34);
            font-weight: bold;
            padding: tr(28) tr(36);
            background-color: rgba(0, 0, 0, 0.9);
            position: absolute;
            transform: translate3d(-50%, -50%, 0);
            left: 50%;
            top: 50%;
            white-space: nowrap;
        }
    }

</style>
