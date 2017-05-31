<!-- 这个是音频播放器的组件 -->

<template>
    <div>
        <div class="audioClassBG">
                <div class="playBack">
                     <audio v-on:play="audioPlayEvent" @timeupdate='updateTime' v-on:pause="audioPauseEvent"  v-on:ended="audioEndedEvent" ref="audioPlayer"  :src="audioList.url?audioList.url:null" autobuffer ></audio>

                    <span ref="audioTimer" class="currentTime">00:00</span>

                    <div class="schedule" @click='leapsFn' @touchmove='test'>
                        <div class="currentProgress" @touchstart='volume'>
                        </div>
                    </div>

                    <span class="totalTime">{{audioList.totalTime|formatFilter}}</span>
                </div>


                <!-- 音频的按钮 -->
                <div class="audioBtnBox">
                    <div class="btnBox">
                        <a class="audioPreBtn"></a>
                        <a :class="!isplay?'audioPlayBtn':'audioPauseBtn'" @click="playCurrentAudioFn"></a>
                        <a class="audioNextBtn"></a>
                    </div>
                </div>
                <!-- 音频的按钮end -->
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    //过滤器
    Vue.filter('formatFilter', function(value) {
        if(!value)
        {
            return '00:00';
        }
        var time = Math.floor(value);
        var m = Math.floor(time / 60).toString();
        m = m.length < 2 ? '0' + m : m;
        var s = (time - parseInt(m) * 60).toString();
        s = s.length < 2 ? '0' + s : s;
        return `${m}:${s}`;
    })

    export default {
        data(){
            return{
                //是否正在播放中
                isplay:false,
                //上次的音频码
                lastTime:null,
                //循环的time
                timer:null,
                //滑动条按钮的x位置
                spaceX: 0,
                //音频的总时长
                // totalTime:null,
            }
        },
        props: {
            /*
            *url  -- 音频路径
            *
            */
            audioList:null,
        },
        computed:{
            // 获得播放器时间码对象
            playTimer(){
                //返回对象
                return this.$refs.audioTimer
            },

            // 获得播放器对象
            player(){
                //返回对象
                return this.$refs.audioPlayer
            }
        },
        activated: function(){
            // var that = this;
            // setTimeout(function(){
            //      that.totalTime = that.formatTime(document.querySelector('audio').duration);
            // },10);
        },
        methods:{
            leapsFn(ev){
                //获取滚动条的宽度
                var widthmax = $('.schedule').width();
                //获取滚动条上点击的x轴的位置
                var point = ev.offsetX;
                //通过点击点的位置改变当前音频的播放位置
                document.querySelector('audio').currentTime = point / widthmax * document.querySelector('audio').duration;
                //更新播放时间码的显示
                this.playTimer.innerText = this.getCurrentTime(this.player.currentTime);
            },
            //播放器更新时间
            updateTime(){
                $('.currentProgress').css('width', document.querySelector('audio').currentTime * $('.schedule').width() / document.querySelector('audio').duration)
            },
            //滑动条按钮的拖拽移动开始
            volume(ev){
                this.spaceX = $('.currentProgress').offset().left;
            },
            //滑动条按钮的拖拽移动过程
            test(ev){
                var left = ev.targetTouches[0].clientX - this.spaceX
                left = left > $('.schedule').width() ? $('.schedule').width() : left;
                $('.currentProgress').css('width', left);
                document.querySelector('audio').currentTime = left / $('.schedule').width() * document.querySelector('audio').duration;
                //更新播放时间码的显示
                this.playTimer.innerText = this.getCurrentTime(this.player.currentTime);
            },
            //点击按钮播放音频
            playCurrentAudioFn(ev){

                //如果不在播放中
                if(!this.isplay)
                {
                    this.player.play();
                    this.isplay = true;
                }
                else
                {
                    this.player.pause();
                    this.isplay = false;
                }
            },
            //更新播放时间
            getCurrentTime(mtime)
            {
                var t = mtime;
                return this.formatTime(t);
            },
            //格式化时间
            formatTime(time){
                time = Math.floor(time);
                var m = Math.floor(time / 60).toString();
                m = m.length < 2 ? '0' + m : m;

                var s = (time - parseInt(m) * 60).toString();
                s = s.length < 2 ? '0' + s : s;

                return `${m}:${s}`;
            },
            //音频播放事件
            audioPlayEvent(event){
                // clearInterval(this.timer);
                var that = this;

                //更新播放码的时间
                this.timer = setInterval(function(){
                    //更新播放时间码的显示
                    that.playTimer.innerText = that.getCurrentTime(that.player.currentTime);
                },1000);
            },
            //音频暂停事件
            audioPauseEvent(event){
                clearInterval(this.timer);
            },
            //音频播放完事件
            audioEndedEvent(event){
                this.isplay = false;
            }
        },
    }
</script>

<style scoped>
        .audioClassBG{
            position: relative;
            width: 100%;
            height: 2.12rem;
            margin-top: 0.15rem;
            margin-bottom: 0.15rem;
            background: url('http://au-smart.cn/auscience/static/img/audioBG.jpg') no-repeat;
            background-size: 100% 100%;
        }
        .playBack {
            display: flex;
        }
        .playBack span{
            font-size:0.18rem;
            color:#ffffff;
            margin-top:0.32rem;
            padding: 0 0.42rem;
        }
        .playBack .schedule {
            margin-top: 0.42rem;
            width: 100%;
            height: .05rem;
            background-color: #cef8f8;
        }
        .playBack .currentProgress {
            height: 100%;
            width: 0;
            background-color: #86b2ad;
            position: relative;
            z-index: 201;
        }
        .playBack .currentProgress::before {
            content: '';
            width: .4rem;
            height: .4rem;
            display: block;
            background-color: #fff;
            border-radius: 50%;
            position: absolute;
            right: -0.2rem;
            top: -0.17rem;
        }
        /* 音频按钮 */
        .audioBtnBox{
            margin-top:0.3rem;
            width:100%;
        }
        .audioBtnBox .btnBox{
            display: flex;
            flex-direction: row;
            flex-wrap:wrap;
            justify-content: space-between;
            align-items:center;
            padding:0 1.88rem;
        }
        .audioBtnBox .audioPlayBtn{
            display: block;
            width:1.05rem;
            height:1.07rem;
            background: url('http://au-smart.cn/auscience/static/img/audioPlayBtn.png') no-repeat;
            background-size: 100% 100%;
        }
        .audioBtnBox .audioPauseBtn{
            display: block;
            width:1.05rem;
            height:1.07rem;
            background: url('http://au-smart.cn/auscience/static/img/audioPsuseBtn.png') no-repeat;
            background-size: 100% 100%;
        }
        .audioBtnBox .audioPreBtn{
            display: block;
            width:0.79rem;
            height:0.81rem;
            background: url('http://au-smart.cn/auscience/static/img/audioPreBtn.png') no-repeat;
            background-size: 100% 100%;
        }
        .audioBtnBox .audioNextBtn{
            display: block;
            width:0.79rem;
            height:0.81rem;
            background: url('http://au-smart.cn/auscience/static/img/audioNextBtn.png') no-repeat;
            background-size: 100% 100%;
        }
</style>