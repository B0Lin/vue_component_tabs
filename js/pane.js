Vue.component('pane', {
    name: 'pane',
    template: '\
        <div class="pane" v-show="show">\
            <slot></slot>\
        </div>',
    data() {
        return {
            show: true
        }
    },
    props: {
        name: {
            type: String
        },
        //标签页标题
        label: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateNav(){
            this.$parent.updateNav();
        }
    },
    watch: {
        label(){
            this.updateNav();
        }
    },
    mounted() {
        this.updateNav();
    },
})