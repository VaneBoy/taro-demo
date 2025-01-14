<template>
  <c-dialog :show="show">
    <div class="custom-dialog c-flex-row-center">
      <image class="custom-dialog-bg" :src="dialogBgIcon" mode="widthFix" />
      <image class="custom-dialog-close" :src="closeIcon" mode="widthFix" @tap="handleClose" />
      <div class="custom-dialog-body c-flex-column-center">
        <image class="robot" :src="robotIcon" mode="widthFix" />
        <view class="cue-word c-flex-column-center">
          <c-loading v-if="isLoading" />
          <text v-else class="cue-word-text font-light font-28">你画了</text>
          <text v-else class="cue-word-cue font-bold font-32">{{ cueWord }}</text>
        </view>
        <view class="btn c-flex-row-center">
          <view class="btn-item c-flex-column-center">
            <c-btn :class="{ 'disabled': isLoading }" :icon="thinkIcon" :btn-icon="thinkBtn" :btn-width="288" text="在想想"
              @click="handleThink" />
            <text class="btn-item-text font-light font-24">猜测有误？</text>
          </view>
          <view class="btn-item c-flex-column-center" @tap="handleConfirm">
            <c-btn :class="{ 'disabled': isLoading || isError }" :icon="okIcon" :btn-icon="okBtn" :btn-width="288"
              text="太棒了" />
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
import robotIcon from "@/assets/images/common/robot.png";
import thinkIcon from "@/assets/images/dialog/think-icon.png";
import thinkBtn from "@/assets/images/dialog/think-btn.png";
import okIcon from "@/assets/images/dialog/ok-icon.png";
import okBtn from "@/assets/images/dialog/ok-btn.png";
import { useGenerate } from "@/hook/useGenerate";

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

const drawStore = useDrawStore();
const { getImagePrompt, transformImagePrompt } = useGenerate();
const [isLoading, setIsLoading] = useToggle(false); // 是否开启加载中

const cueWord = ref('')
const isError = ref(false)

watch(() => props.show, (newVal) => {
  if (newVal) {
    handleThink()
  }
})

function handleThink() {
  setIsLoading(true)
  getImagePrompt(drawStore.beforeDrawUrl).then((res: any) => {
    console.log(res)
    if (res) {
      transformImagePrompt(res).then((res: any) => {
        cueWord.value = res.chinese
        isError.value = false
      }).catch(() => {
        cueWord.value = '哎呀，我猜了好久都没猜对呢，就像捉迷藏时怎么也找不到小伙伴一样！'
        isError.value = true
      })
    } else {
      cueWord.value = '哎呀，我猜了好久都没猜对呢，就像捉迷藏时怎么也找不到小伙伴一样！'
      isError.value = true
    }
    setIsLoading(false)
  }).catch(() => {
    cueWord.value = '哎呀，我猜了好久都没猜对呢，就像捉迷藏时怎么也找不到小伙伴一样！'
    setIsLoading(false)
    isError.value = true
  })
}

function handleClose() {
  if (isLoading.value) {
    return
  }
  show.value = false;
}

function handleConfirm() {
  if (isLoading.value || isError.value) {
    return
  }
  show.value = false;
  emits("confirm");
}
</script>