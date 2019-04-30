Vue.component('tabs', {
    template: '\
    <div class="tabs">\
        <div class="tabs-bar">\
            <!-- 标签页标题 -->\
            <div\
                v-for="(item, index) in navList"\
                :class="tabCls(item)"\
                @click="handleChange(index)">\
            {{item.label}}\
            </div>\
        </div>\
        <div class="tabs-content">\
            <!-- 这里的slot就是嵌套的pane -->\
            <slot></slot>\
        </div>\
    </div>',
    props: {
        value: {
            type: [String, Number]
        }
    },
    data() {
        return {
            //用来渲染tabs的标题
            navList: [],
            currentValue: this.value
        }
    },
    methods: {
        getTabs(){
            //tabs组件上的标题应该由pane组件来定义，因为slot是卸载pane里的
            //获取tabs子组件数组中name为pane的组件
            return this.$children.filter(function(item){
                return item.$options.name === 'pane';
            });
        },
        updateNav(){
            //this.navList = [];
            var _this = this;
            this.getTabs().forEach(function(pane, index){
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index
                });
                if(!pane.name) pane.name = index;
                if(index === 0){
                    if(!_this.currentValue){
                        _this.currentValue = pane.name || name;
                    }
                }
            });
        },
        updateStatus(){
            var tabs = this.getTabs();
            var _this = this;
            tabs.forEach(function(tab){
                return tab.show = (tab.name === _this.currentValue) ;
            });
        },
        tabCls(item){
            return [
                //基本样式
                'tabs-tab',
                {
                    //选中变色
                    'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        handleChange(index){
            var nav = this.navList[index];
            var name = nav.name;
            this.currentValue = name;
            //绑定父组件的v-model 把name传给activeKey
            //this.$emit('input', name);
            //绑定原生事件 点击
            //this.$emit('on-click', name);
        }
    },
    watch: {
        value(val){
            this.currentValue = val;
        },
        currentValue(){
            this.updateStatus();
        }
    },
})