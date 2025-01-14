<template>
  <view id="home">
    <!-- 画板区域-->
    <Canvas type="2d" canvas-id="draw-canvas" class="draw-canvas" disable-scroll="true" @touchstart="onTouchStart"
      @touchmove="onTouchMove" @touchend="onTouchEnd" />

    <button style="margin: 20px;" @click="openDialog">点击弹窗</button>

    <custom-dialog v-model:show="cueVisible" />
  </view>
</template>

<script setup lang="ts">
import Taro from "@tarojs/taro";
import "./index.scss";
import { useDidShow } from "@tarojs/taro";
import { reactive, ref } from "vue";
import { Canvas } from "@tarojs/components";

let ctx = reactive<any>({});
let cueVisible = ref(false);

useDidShow(() => {
  Taro.nextTick(() => {
    const query = Taro.createSelectorQuery();
    query
      .select('.draw-canvas')
      .fields({ node: true, size: true, rect: true })
      .exec(initCanvas);
  });
});

const initCanvas = (res: any) => {
  const { width, height } = res[0];
  ctx = Taro.createCanvasContext("draw-canvas");
  drawRoundedRect(0, 0, width, height, 10)
};

const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y); // 从左上角的圆弧起点开始
  ctx.lineTo(x + width - radius, y); // 绘制顶部边线
  ctx.arc(x + width - radius, y + radius, radius, 1.5 * Math.PI, 0);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arc(x + width - radius, y + height - radius, radius, 0, 0.5 * Math.PI);
  ctx.lineTo(x + radius, y + height);
  ctx.arc(x + radius, y + height - radius, radius, 0.5 * Math.PI, Math.PI);
  ctx.lineTo(x, y + radius);
  ctx.arc(x + radius, y + radius, radius, Math.PI, 1.5 * Math.PI);
  ctx.closePath(); // 闭合路径
  ctx.setFillStyle('#ffffff') // 设置填充颜色
  ctx.fill(); // 填充颜色
  ctx.draw(true); // 绘制
}

const onTouchStart = (e: any) => {
  console.log("onTouchStart");
};

const onTouchMove = (e: any) => {
  console.log("onTouchMove");
};

const onTouchEnd = (e: any) => {
  console.log("onTouchEnd");
};

const openDialog = () => {
  cueVisible.value = true
}
</script>
