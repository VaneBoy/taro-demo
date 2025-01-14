<template>
  <c-dialog :show="show">
    <view class="normal-dialog c-flex-column-center">
      <text class="normal-dialog-title font-bold font-36">{{ title }}</text>
      <view class="normal-dialog-btn c-flex-row-center">
        <view class="normal-dialog-btn-cancel font-bold font-32 c-flex-row-center" @tap="show = false">取消</view>
        <view class="normal-dialog-btn-confirm font-bold font-32 c-flex-row-center" @tap="handleConfirm">确定</view>
      </view>
    </view>
  </c-dialog>
</template>

<script setup lang="ts">
import "./index.scss";
const emits = defineEmits(["update:show", "confirm"]);

const props = withDefaults(
  defineProps<{ show: boolean; title: string }>(),
  {
    show: false,
    title: "标题"
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

function handleConfirm() {
  show.value = false;
  emits("confirm");
}
</script>
