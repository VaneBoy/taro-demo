<template>
  <c-dialog :show="show">
    <div class="custom-dialog c-flex-row-center">
      <image class="custom-dialog-bg" :src="dialogBgIcon" mode="widthFix" />
      <image class="custom-dialog-close" :src="closeIcon" mode="widthFix" @tap="handleClose" />
      <div class="custom-dialog-body c-flex-column-center">
        <image class="robot" :src="robotIcon" mode="widthFix" />
        <view class="cue-word c-flex-column-center">
          <text class="cue-word-text font-light font-28">你画了</text>
          <text class="cue-word-cue font-bold font-32"></text>
        </view>
        <view class="btn c-flex-row-center">
          <view class="btn-item c-flex-column-center">
            <text class="btn-item-text font-light font-24">猜测有误？</text>
          </view>
          <view class="btn-item c-flex-column-center" @tap="handleConfirm">
            <text class="btn-item-text font-light font-24">点击生成画作~</text>
          </view>
        </view>
      </div>
    </div>
  </c-dialog>
</template>

<script setup lang="ts">
import "./index.scss";
import dialogBgIcon from "@/assets/images/dialog/dialog-bg.png";
import closeIcon from "@/assets/images/dialog/close.png";
import robotIcon from "@/assets/images/dialog/robot.png";

const emits = defineEmits(["update:show", "confirm"]);

const props = withDefaults(
  defineProps<{ show: boolean }>(),
  {
    show: false,
  }
);

const show = computed({
  get() {
    return unref(props.show);
  },
  set(val) {
    emits("update:show", val);
  },
});


function handleClose() {
  show.value = false;
}

function handleConfirm() {
  show.value = false;
  emits("confirm");
}
</script>