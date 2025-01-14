import AutoImport from "unplugin-auto-import/webpack";
import ComponentsPlugin from "unplugin-vue-components/webpack";
import NutUIResolver from "@nutui/nutui-taro/dist/resolver";
const path = require("path");

const config = {
  projectName: "test-demo",
  date: "2025-1-8",
  designWidth(input) {
    if (input?.file?.replace(/\\+/g, "/").indexOf("@nutui") > -1) {
      return 375;
    }
    return 750;
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  alias: {
    "@": path.resolve(__dirname, "..", "src"),
  },
  sourceRoot: "src",
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: ["@tarojs/plugin-html"],
  sass: {
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "vue3",
  compiler: {
    type: "webpack5",
    prebundle: { enable: false },
  },
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    // prerender: {
    //   match: 'pages/square/**', // 所有以 `pages/shop/` 开头的页面都参与 prerender
    //   include: ['pages/clickMe/index'], // `pages/any/way/index` 也会参与 prerender
    // },
    optimizeMainPackage: {
      enable: true,
    },
    webpackChain(chain, webpack) {
      chain.resolve.mainFields.clear();
      chain.merge({
        resolve: {
          mainFields: ["main:h5", "browser", "module", "main", "jsnext:main"],
        },
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/pinia/],
              use: {
                babelLoader: {
                  loader: require.resolve("babel-loader"),
                },
              },
            },
          },
        },
      });
      chain.plugin("unplugin-vue-components").use(
        ComponentsPlugin({
          resolvers: [NutUIResolver({ taro: true })],
        })
      );
      chain.plugin('unplugin-auto-import').use(
        AutoImport({
          imports: [
            'vue',
            '@vueuse/core',
          ],
          // 自动导入方法所在的文件目录- 这里添加 utils 和 store
          dirs: ['src/utils', 'src/stores', 'src/api'],
          vueTemplate: true,
        }),
      );
      // 去除语言包
      chain.plugin("ignoreMomentLocale").use(webpack.IgnorePlugin, [
        {
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        },
      ]);
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          onePxTransform: true, //设置 1px 是否需要被转换
          unitPrecision: 5, //REM 单位允许的小数位。
          propList: ["*"], //允许转换的属性。
          selectorBlackList: [], //黑名单里的选择器将会被忽略。
          replace: true, //直接替换而不是追加一条进行覆盖。
          mediaQuery: false, //允许媒体查询里的 px 单位转换
          minPixelValue: 0, //设置一个可被转换的最小 px 值
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: ["nutui-taro", "icons-vue-taro"],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          onePxTransform: true,
          unitPrecision: 5,
          propList: ["*"],
          selectorBlackList: [],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0,
          baseFontSize: 20, //H5 字体尺寸大小基准值，开发者可以自行调整单位换算的基准值。
          maxRootSize: 40, //H5 根节点 font-size 的最大值。
          minRootSize: 20, //H5 根节点 font-size 的最小值。
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    router: {
      mode: "browser",
    },
    devServer: {
      port: "5001",
      proxy: {
        "/api": {
          target: "",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "",
          },
        },
      },
    },
    webpackChain(chain) {
      chain.plugin("unplugin-vue-components").use(
        ComponentsPlugin({
          resolvers: [NutUIResolver({ taro: true })],
        })
      );
      chain.plugin('unplugin-auto-import').use(
        AutoImport({
          imports: [
            'vue',
            '@vueuse/core',
          ],
          // 自动导入方法所在的文件目录- 这里添加 utils 和 store
          dirs: ['src/utils', 'src/stores', 'src/api'],
          vueTemplate: true,
        }),
      );
      chain.resolve.mainFields.clear();
      chain.merge({
        resolve: {
          mainFields: ["main:h5", "browser", "module", "main", "jsnext:main"],
        },
      });
    },
  },
};

module.exports = function (merge) {
  let envConfig;
  if (process.env.NODE_ENV === "development") {
    envConfig = require("./dev");
  } else {
    envConfig = require("./prod");
  }
  const mergeConfig = Object.assign({}, config, envConfig);
  const { defineConstants = {} } = mergeConfig || {};
  console.log("================ build configs ================");
  console.log("-]  ENVIROMENT", "\t", process.env.NODE_ENV);
  Object.keys(defineConstants).forEach((k) => {
    console.log("-] ", k, "\t", defineConstants[k]);
  });
  console.log("================ build configs ================");
  return merge({}, config, envConfig);
};
