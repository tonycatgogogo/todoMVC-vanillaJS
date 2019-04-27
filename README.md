# TodoMVC by vanillaJS

## 技术栈

+ webpack打包

+ babel编译

+ 原生JS

+ css未使用bootstrap

  ## 需求分析

  ![9c1fe6a9dfe5e20b6233b4799081ecd](C:\Users\USER\Desktop\9c1fe6a9dfe5e20b6233b4799081ecd.jpg)

  - 监听回车键，若输入不为空，则取出输入内容，并创建li加入到下方list中
  - li前端放置勾选按钮 checkbox 若被选中，li变灰并被划除
  - list监听鼠标经过事件，显示x按钮，点击则删除该li
  - 列表内容存储进浏览器缓存中，onload之前先查询cookie，若存在li信息，则渲染到页面上
  - 输入框前方三角形按钮，若点击变为active状态，同时所有的li变为选中，
  - 下方计数模块，显示li的个数
  - all为默认选中，显示所有li
  - active显示未被勾选的li
  - completed 显示被勾选的li
  - 当有checkbox被选中时，显示clear completed按钮