<template>
  <div class="customPositionDiv"> 
      <div
        @mousedown="mousedown"
        @mousemove="mousemove"
        @mouseup="mouseup"
        @Mouseleave="Mouseleave"
        :style="imgstyle"
      >
        <img :src="imgSrc" :style="imgstyle" />
        <canvas
          ref="table"
          :width="canvasWidth"
          :height="canvasHeight"
          :class="isHandleCorp ? 'isCorp' : ''"
          :style="canvasstyle"
        ></canvas>
      </div>
  </div>
</template>
<style >
</style>
<script>
import vue from "vue";
import { corpImgsBase64 } from './corpImg'
export default {
  data() {
    return {
      //  customPositionShow:false, //自定义位置
      //   showclose:false,
      startX: "", //画画开始的X坐标
      startY: "", //画画开始的Y坐标
      endX: "", //画画结束的X坐标
      endY: "", //画画结束的Y坐标
      isMouseDownInCanvas: "", //鼠标是否按下
      customcxt: "", // cxt
      customRwidth: "", //原图与展示图片的宽度比
      customRheight: "", //原图与展示图片的高度比
      imgstyle: "", //根据图片大小自适应样式
      canvasstyle: "", //根据图片大小canvas自适应样式 居中显示
      canvasWidth: "", //根据图片大小自适应canvas宽
      canvasHeight: "", //根据图片大小自适应canvas高
      DivWidth: 700, //最大宽度
      DivHeight: 540, //最大高度
			// imgSrc: require("../../assets/1.png"),
			imgSrc:'http://106.14.19.121/713601.jpg',
			isHandleCorp: false,
			corpImgSrc:'',
    };
  },
  watch: {
    imgSrc: function () {
      this.show();
    },
  },
  mounted() {
    this.show();
  },

  methods: {
    //取消时返回组件调用处所需的数据
    customClose() {
      this.customcxt.clearRect(0, 0, this.DivWidth, this.DivHeight);
      this.$emit("custom", { type: 1, data: "" });
    },
    //确定时返回组件调用处所需的数据
    customQuery() {
      this.customcxt.clearRect(0, 0, this.DivWidth, this.DivHeight);
      //根据绘制进行图片裁剪

      //获取矩形框Left，Width'
      let cLeft = 0;
      let cWidth = 0;
      if (this.startX > this.endX) {
        cLeft = this.endX;
        cWidth = this.startX - this.endX;
      } else {
        cLeft = this.startX;
        cWidth = this.endX - this.startX;
      }

      //获取矩形框Top，Height
      let cTop = 0;
      let cHeight = 0;
      if (this.startY > this.endY) {
        cTop = this.endY;
        cHeight = this.startY - this.endY;
      } else {
        cTop = this.startY;
        cHeight = this.endY - this.startY;
      }

      var oMark = [];
      oMark["offsetLeft"] = parseInt(cLeft / this.customRwidth);
      oMark["offsetTop"] = parseInt(cTop / this.customRheight);
      oMark["offsetWidth"] = parseInt(cWidth / this.customRwidth);
      oMark["offsetHeight"] = parseInt(cHeight / this.customRheight);

			this.$emit("custom", { type: 2, data: oMark });
			
			corpImgsBase64(this.imgSrc,oMark).then(res=>{
				console.log(res)
				this.corpImgSrc = res
			})
      console.log(oMark);
    },

    // dialog展示自定义矩形框画板，
    // 计算img与canvas标签自适应图片的大小
    show() {
      vue.nextTick((_) => {
        let customCanvas = this.$refs.table; // canvas显示层
        this.customcxt = customCanvas.getContext("2d");
        let img = new Image();
        img.setAttribute("crossOrigin", "Anonymous");
        img.src = this.imgSrc;
        let that = this;
        img.onload = function () {
          let canvasleft = 0;
          let canvastop = 0;
          let WrH = img.width / img.height; //图片宽高比
          let RWrH = that.DivWidth / that.DivHeight; //放置图片DIV的宽高比
          let aa = 0;
          // 根据宽高比大小判断确定自适应的宽和高
          if (RWrH > WrH) {
            aa = that.DivHeight / img.height;
            that.canvasHeight = that.DivHeight;
            that.canvasWidth = img.width * aa;
            canvasleft = (that.DivWidth - that.canvasWidth) / 2;
            canvastop = 0;
          } else {
            aa = that.DivWidth / img.width;
            that.canvasHeight = img.height * aa;
            that.canvasWidth = that.DivWidth;
            canvastop = (that.DivHeight - that.canvasHeight) / 2;
            canvasleft = 0;
          }
          that.imgstyle =
            " position: relative;  width:" +
            that.canvasWidth +
            " px; height:" +
            that.canvasHeight +
            "px"; //img浮动定位居中显示
          that.customRwidth = that.canvasWidth / img.width; //原图与展示图片的宽高比
          that.customRheight = that.canvasHeight / img.height;
          console.log(canvasleft, canvastop);
          that.canvasstyle =
            "position: absolute;left: " +
            canvasleft +
            "; top: " +
            canvastop +
            ";"; //canvas浮动定位
        };
      });
    },
    //鼠标按下时执行
    mousedown(e) {
      this.isMouseDownInCanvas = true;
      // 鼠标按下时开始位置与结束位置相同
      // 防止鼠标在画完矩形后 点击图画形成第二个图形
      this.endX = e.offsetX;
      this.endY = e.offsetY;
      this.startX = e.offsetX;
      this.startY = e.offsetY;
      this.mousemove(e);
      this.isHandleCorp = true;
    },
    //鼠标移动式时执行
    mousemove(e) {
      if (this.isMouseDownInCanvas) {
        // 当鼠标有按下操作时执行

        this.endX = e.offsetX;
        this.endY = e.offsetY;
        let wwidth = this.endX - this.startX;
        let wheigth = this.endY - this.startY;

        // 清除指定区域的所有像素
        this.customcxt.clearRect(0, 0, this.DivWidth, this.DivHeight);
        this.customcxt.strokeStyle = " #00ff00"; //矩形框颜色
        this.customcxt.lineWidth = "2"; //矩形框宽度
        this.customcxt.strokeRect(this.startX, this.startY, wwidth, wheigth); //绘制矩形
      }
    },
    //鼠标松开时执行
    mouseup(e) {
      this.isMouseDownInCanvas = false;
      this.isHandleCorp = false;
      this.customQuery();
    },

    Mouseleave(e) {
      this.isMouseDownInCanvas = false;
    },
  },
};
</script>
<style lang="stylus" scoped>
.customPositionDiv
	width 100%
	height 100%
	background rgba(0,0,0,0.4)
  display flex
  justify-content center
  align-items center
</style>
<style>
.isCorp {
  background: rgba(0, 0, 0, 0.5);
}
</style>