##  开发注意事项

### 关于ajax请求url

目前是把app部署herokuapp上  所以到时候换正式服务器之后会涉及到改url. 有三种方案

+ 把url写到一个js文件中, 在需要ajax调用的地方引入.  url采用拼接的方式
+ 获取当前location.host  然后拼接
+ 手动替换

目前采用第二种

##  treehole 路由
'/treehole/comment/:id'  查看对话页面   比如本地开发在浏览器输入http://localhost:3000/treehole/comment/1   即可访问

##  失物招领路由

'/lost'  首页路由

## 去约路由
'/play'  去约首页  '/play/post'  发布   '/play/self'  个人中心
'/fun'   趣玩路由  '/fun/post'  发布   '/fun/self'  个人中心

##  用到过的图标

+ iconfont-indexTabBar   课表   &#xe600 切换学校  &#xe602
+ iconfont-treeHoleTabsBar  主页  &#xe601  发布  &#xe603 个人中心  &#xe604
+ iconfont-treeholePost  &#xe605   添加图片的加号
分享：iconfont-selfShare &#xe610
点赞（实心）：iconfont-selfEnjoy &#xe611
评论：iconfont-selfComment &#xe612
点赞（空心）：iconfont-nullEnjoy &#xe614
评论 (用于详情页面统计评论数量处)： iconfont-detailsComment &#xe615
时钟 (用户搜索页)： iconfont-clock &#xe617
删除 (用于搜索页): iconfont-delete &#xe618
定位 iconfont-position &#xe619
QQ头像 iconfont-qq &#xe621
手机（用于手机联系方式） iconfont-phone &#xe620
物品（用于失物招领的搜索页） iconfont-lostGoods &#xe622
失主 （用于失物招领的搜索页）iconfont-loser &#xe623
房屋 （用于去约首页）iconfont-shop &#xe624
树 （用于去约首页）iconfont-shop &#xe625
## 待解决问题

+ 点击链接跳到qq对话框
+ 多标签不能滑动问题


失物招领状态改变


##  注意事项

如果出现前台get不到数据的情况， 检查后台取出的数据是否是一个？如果是一个 记住取出的数据永远是一个数组
