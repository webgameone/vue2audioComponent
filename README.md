# vue2audioComponent
这个音频组件项目是vue2.x的一个功能非常简单的音频组件插件,可以自定义播放器样式,也可以很方便的进行功能扩展<br>
<br>
在做vue2.x的项目的时候,发现没有合适的音频播放器的插件可以使用,而且h5自带的音频控制器没办法修改样式.<br>
<br>
vue2里面的全家桶UI库也没有音频组件可以很好的使用.虽然muse-ui全家桶里面的slider可以作为音频的时间线进行使用,但是和我项目的UI库貌似有冲突.<br>
<br>
所以自己封装了一个简单版本的,我自己的项目是足够使用了<br>  
<br>
控件里面上一首和下一首没有做事件,我的项目这两个按键是上一页和下一页.所以就没写了<br>
<br>
播放器的滑动条参考了别人的代码,然后自己修改了点点,使用上可以点击位置调到音频时间点,也可以拖动位置调到音频时间点.


可以看下预览图:<br>
![](http://au-smart.cn/auscience/static/img/微信图片_20170531145922.png)

```
使用方式:
1.安装插件

npm install vue2audiocomponent --save-dev

2.使用插件

import audioCompName from 'audioPlayerComponent'
Vue.use(audioCompName);

3.在组件中使用方式
<template>
  <div>
    <audioCompName :audioList = 'audioList'></audioCompName>
  </div>
</template>

4.插件需要传递的参数

 data() {
      return { 
        audioList:{
            //音频组件地址,只能传递一个,如果需要传递多个,可以自己修改源码  换成数组或者json
            url:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            //这个音频文件的长度,因为一般都是异步获取到音频地址才能初始化audio的,所以这个参数父传递给子合适点
            totalTime:null,
        }
    }
}
```

