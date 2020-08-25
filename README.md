![elecctron_rtmp.png](https://i.loli.net/2020/08/25/6YrBvNDpjtOKnCQ.png)

当前示例是使用 `electron-vue` 模板生成的。

```bash
# 如果你没有vue-cli的话需要全局安装
npm install -g vue-cli
# 然后使用vue-cli来安装electron-vue的模板
vue init simulatedgreg/electron-vue my-project
```

## Usage

``` bash
# 安装依赖
cd my-project
npm install

# 开发模式
npm run dev

# 生产模式打包 可兼容 32位与 64位 win 系统
npm run win32
```

## 注意事项

依赖安装需要使用 `npm install`，使用其他工具可能会出现找不到 `videojs-flash` 包的情况。