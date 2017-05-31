/*
* @Author: Marte
* @Date:   2017-05-31 10:36:45
* @Last Modified by:   Marte
* @Last Modified time: 2017-05-31 11:28:48
*/

// 'use strict';
import audioPlayerComponent from './audio.vue'

const audioPlayerComp={
    install:function(Vue){
        Vue.component('audioPlayerCustom',audioPlayerComponent)
    }  //'audioPlayerCustom'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default audioPlayerComp;