# Shiny-Console

https://console.kotori.moe/#/dashboard/overview

## 权限

该网站是开放的，只有部分操作，例如服务器配置调整等功能需要管理员权限。

## 项目结构说明

* 本项目存在两种技术栈
    - 旧技术栈使用 Redux 做状态管理，该部分页面主要位于 `components` 目录下，另有 `actions` 和 `reducers` 为 Redux 相关状态逻辑，`constants` 中为 TypeScript 适配用常量，此外每一子页面通过 `containers` 下的封装组件组合状态和组件本身。
    - 由于旧结构存在大量模板代码，且状态更新十分繁琐，因此决定新增功能使用新技术栈。新技术栈不使用 `Redux` 管理状态，状态尽量在组件内解决；新页面以直接使用 React Hooks 为主，并大量使用 Functional Component。这部分组件位于 `pages` 下，基本上一个文件夹为一个子页面。此外，少部分自定义 Hooks 位于 `hooks` 文件夹下。
    - 无论新旧技术栈，TypeScript 相关的类型定义均位于 `types` 文件夹下。

## 技术栈说明

* 本项目是基于 React + antd 的单页应用，使用 Create-React-App 作为脚手架。全项目使用 TypeScript。
* 作为一个管理后台，各页面逻辑较为独立，因此大部分组件都使用懒加载载入。
* 由于是个管理后台所以并没有特别对移动端进行适配，但是保证了大部分页面可以正常在移动端浏览。
