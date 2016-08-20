##  开发注意事项

### 关于ajax请求url

目前是把app部署herokuapp上  所以到时候换正式服务器之后会涉及到改url. 有三种方案

+ 把url写到一个js文件中, 在需要ajax调用的地方引入.  url采用拼接的方式
+ 获取当前location.host  然后拼接
+ 手动替换

目前采用第二种

##  treehole 路由
'/treehole/comment/:id'  查看对话页面   比如本地开发在浏览器输入http://localhost:3000/treehole/comment/1   即可访问

##  用到过的图标

+ iconfont-indexTabBar   课表   &#xe600 切换学校  &#xe602
+ iconfont-treeHoleTabsBar  主页  &#xe601  发布  &#xe603 个人中心  &#xe604
+ iconfont-treeholePost  &#xe605   添加图片的加号
