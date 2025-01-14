export default defineAppConfig({
  pages: [
    "pages/home/index",
  ],
  window: {
    navigationBarBackgroundColor: "#fff",
    backgroundTextStyle: "light",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  lazyCodeLoading: "requiredComponents",
});
