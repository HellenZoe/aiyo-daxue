##  开发注意事项

### 关于ajax请求url

目前是把app部署herokuapp上  所以到时候换正式服务器之后会涉及到改url. 有三种方案

+ 把url写到一个js文件中, 在需要ajax调用的地方引入.  url采用拼接的方式
+ 获取当前location.host  然后拼接
+ 手动替换

目前就采用第三种.虽然第一种和第二种看上去更可行.  因为涉及到需要改动的地方也不是很多.

目前需要替换的页面有(及时补充)
+ treeholePost 传送用户发布的数据处
+ signin qq登陆的redirectUrl
