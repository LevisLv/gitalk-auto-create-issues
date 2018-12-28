## 使用步骤
### 1、clone脚本工程
> git clone https://github.com/LevisLv/gitalk-auto-create-issues.git

### 2、下载必要依赖
> cd gitalk-auto-create-issues && npm install

### 3、修改配置文件
修改consts.js的以下配置：
* 1、BLOG_BASE_URL // 博客地址，结尾不带斜杠'/'
* 2、GITHUB_ACCESS_TOKEN // 配置在环境变量里，在 [这里](https://github.com/settings/tokens) 生成
* 3、GITHUB_OWNER // github用户名
* 4、GITHUB_REPO // 放置博客静态资源的仓库
* 5、LABEL_NAME_BLACK_LIST // 黑名单，哪些title不生成对应的issue
* 6、LABEL_DEFAULT // 默认的gitalk标签，一般用默认值'Gitalk'
* 7、LABEL_COLOR_DEFAULT // 默认标签的颜色
* 8、LABEL_COLOR_OTHER // 其他title标签的颜色

### 4、执行脚本
> node app

## 效果图
![effect_picture](https://github.com/LevisLv/LevisLv.github.io/blob/master/2018/12/28/hexo%E5%8D%9A%E5%AE%A2%E4%BD%BF%E7%94%A8gitalk%E8%AF%84%E8%AE%BA%E6%8F%92%E4%BB%B6%EF%BC%8C%E8%87%AA%E5%8A%A8%E5%88%9B%E5%BB%BAissues/effect_picture.png)