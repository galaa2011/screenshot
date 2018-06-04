# 截图服务
http://deer.applinzi.com/screenshot [?参数]
### 参数说明：
  - url \<string> **required** 截图页面
  - width \<number> 视窗宽度(与left、top使用时为裁剪宽度)，此参数需与height同时使用
  - height \<number> 视窗高度(与left、top使用时为裁剪高度)，此参数需与width同时使用
  - left \<number> 裁剪x坐标
  - top \<number> 裁剪y坐标
  - selector \<selector> 元素选择器，截取selector选中的元素
  - sleep \<number> 睡多久，等待资源加载、页面渲染
  - platform \<string> pc|wap 默认wap，对应不同的userAgent

> width/height 不设置时，默认截取fullPage

#### Demo
`http://deer.applinzi.com/screenshot?url=http://sinaluming.com/z/2814/&width=320&height=520&sleep=3000`

`http://deer.applinzi.com/screenshot?url=http://sinaluming.com/z/2814/&selector=[data-uid="4"]`
