##  开发注意事项


### 技术栈
+ 前端
  * sui  作为ui框架
  * zepto  操作dom
+ 后台
  * nginx 路由转发 监听80端口
  * express  服务器 路由
  * mongoodb  数据库存储
  * mongoose  数据库操作
+ 服务器
  + pm2 node进程管理   目前运行了两个进程 一个是express服务进程 一个是github的webhook  用来热更新代码


### 文件结构
  + /admin  后台管理 具体文档可以查看/admin/README.md
    + /data  几个实例数据文件
    + /dist  编译之后的资源文件  js css
    + /js  js源文件
    + /less  less源文件
    + /pages  html源文件
    + /vendor 依赖库
    + index.html  入口
    + gulpfile.js  编译任务
  + /bin
    + deploy-dev.sh  拉取代码脚本
    + prod.sh 部署脚本  之前是forever 现在用pm2之后就没用了
    + www  app入口
    +
  + /config  配置文件
    + db.config.js  数据库配置文件
    + db.js  数据库连接
    + qiniu.config.js  七牛配置
    + serverHost.config.js 域名配置
  + /doc  文档
  + /model  数据模型
  + /public  公共资源 js css images fonts之类
  + /routes
    + /fun.js  趣玩路由
    + /index.js 首页
    + /lost.js  失误招领
    + /play.js 去约
    + /secondHand.js  二手交易
    + /treehole.js  路由
    + /user.js  没有用
  + /src  源文件  js  less之类
  + /test  之前做测试的一个htm页面 没什么用
  + /upload  上传图片临时存储文件夹
  + /utils  工具函数
    + saveToLocal  几个操作localStorage的函数
    + serverUtil  两个服务器端的工具函数
  + /views  页面源代码文件  用的模板是pug(前身是jade)
  + webgook.js  接受webhok请求  执行deply-dev.sh  拉取代码



### 路由

比如树洞模块

+ /treehole  首页
+ /treehole/post  发布新的树洞
+ /treehole/self  个人中心
+ /treehole/detail/:id  详情页面
+ /treehole/comment 发布新的评论
+ /treehole/comment/:id  评论详情
+ /fav  点赞
+ /del  删除

其余模块类似  个人中心中操作的路由统一是/module_name/action

### 命名

比如树洞

+ treeholeIndex.pug/js/less  首页  treeholePost.pug/js/less  发布页面
+ treeholeDetails.pug/js/less 详情
+ treeholeSelf.pug/js/less  个人中心
+ treeholeCommentDetail.pug/js/less  评论详情

其余模块类似  可能有部分文件不符合命名规范

关于视图文件的组织
app首页继承layout.pug
模块首页继承和个人中心继承serviceLayout.pug
详情页继承detailLayout.pug


###  用到过的图标

+ iconfont-indexTabBar   课表   &#xe600 切换学校  &#xe602
+ iconfont-treeHoleTabsBar  主页  &#xe601  发布  &#xe603 个人中心  &#xe604
+ iconfont-treeholePost  &#xe605   添加图片的加号
+ 分享：iconfont-selfShare &#xe610
+ 点赞（实心）：iconfont-selfEnjoy &#xe611
+ 评论：iconfont-selfComment &#xe612
+ 点赞（空心）：iconfont-nullEnjoy &#xe614
+ 评论 (用于详情页面统计评论数量处) iconfont-detailsComment &#xe615
+ 时钟 (用户搜索页)： iconfont-clock &#xe617
+ 删除 (用于搜索页): iconfont-delete &#xe618
+ 定位 iconfont-position &#xe619
+ QQ头像 iconfont-qq &#xe621
+ 手机（用于手机联系方式） iconfont-phone &#xe620
+ 物品（用于失物招领的搜索页） iconfont-lostGoods &#xe622
+ 失主 （用于失物招领的搜索页）iconfont-loser &#xe623
+ 房屋 （用于去约首页）iconfont-shop &#xe624
+ 树 （用于去约首页）iconfont-shop &#xe625
+ 下拉 iconfont-dropDown &#xe626

### 待解决问题

+ 点击链接跳到qq对话框
+ iphone  发不了图的问题 目前发图采用的方案是用图片代理input标签的click事件  隐藏input标签 因为input不好美化
+ 点赞的功能 目前就只在树洞模块有 因为设计搞没有 后面可能会根据需求加
+ 搜索的功能  目前没必要
+ 搜索历史 目前没必要 用localstorage
+ 有时候发不了图的问题  暂时不清楚具体原因  可能是服务器的原因 响应太慢  也不排除是
  程序的原因....



###  注意事项

+ 如果出现前台get不到数据的情况， 检查后台取出的数据是否是一个？如果是一个 记住取出的数据永远是一个数组
+ 修改服务器端代码之后要手动重启pm2的进程  用脚本重启试了一下有问题...如果能解决更好...
+ 视图文件是两个人合作开发的  所以会存在结构不统一的情况 所以样式文件公用的少  如果有时间可以考虑重构一下...
+ mongoose部分代码没有用promise  有时间可以重构...
+ 如果在手机qq通过链接打开网站访问  可能会出现你修改了代码 但是就是看不到效果(前提是在qq浏览器打开是正常)
  可能是因为缓存的原因  所以建议用qq浏览器打开测试


### 开发流程(建议...)

+ cd到项目根目录 npm run dev(在自己机器上)
+ 打开putty  登陆到服务器 cd ~/app/aiyo-daxue;pm2 logs;
+ 本地修改..
+ git add;git commit;git push;
+ 查看log 看到已拉取代码之后 刷新浏览器看效果

本地修改的时候不用开服务器和数据库  因为也没办法在本地服务器看效果 只能push到远程上看效果
