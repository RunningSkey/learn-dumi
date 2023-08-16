---
nav: 组件
group: React组件
mobile: false
---

关键字 @、#、.

# Codemirror

<code src="./demos/demo.tsx"></code>

自定义语法

1. 编写 demo.grammar
2. 然后 npx lezer-generator demo.grammar 生成自定义 parser
3. 设置对应语法的高亮颜色
4. 设置关键字补全和提示
5. 使用组件 可选择自定义提示样式
