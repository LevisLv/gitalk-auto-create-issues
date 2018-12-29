## 一、个人博客配置
* 1、post、page的名字，或者说生成的文章链接，不要包含其他字符，例如空格、中文逗号等等，会有问题，不多解释，有疑问可以留言
* 1、Gitalk 插件的 id 改成: decodeURI(location.pathname)
* 2、Gitalk 插件的 createIssueManually 改成: true（建议，具体看 [官方文档](https://github.com/gitalk/gitalk/blob/master/readme-cn.md)）

## 二、使用步骤
### 1、clone脚本工程
> git clone https://github.com/LevisLv/gitalk-auto-create-issues.git

### 2、下载必要依赖
> cd gitalk-auto-create-issues && npm install

### 3、修改配置文件
修改 consts.js 的以下配置：
* 1、BLOG_BASE_URL // 博客地址，结尾不带斜杠'/'
* 2、GITHUB_ACCESS_TOKEN // 配置在环境变量里，在 [这里](https://github.com/settings/tokens) 生成
* 3、GITHUB_OWNER // github 用户名
* 4、GITHUB_REPO // 放置博客静态资源的仓库
* 5、LABEL_NAME_BLACK_LIST // 黑名单，哪些 title 不生成对应的 issue
* 6、LABEL_DEFAULT // 默认的 gitalk 标签，一般用默认值 'Gitalk'
* 7、LABEL_COLOR_DEFAULT // 默认标签的颜色
* 8、LABEL_COLOR_OTHER // 其他 title 标签的颜色

### 4、执行脚本
> node app

## 三、效果图
![effect_picture](https://github.com/LevisLv/LevisLv.github.io/blob/master/2018/12/28/hexo%E5%8D%9A%E5%AE%A2%E4%BD%BF%E7%94%A8gitalk%E8%AF%84%E8%AE%BA%E6%8F%92%E4%BB%B6%E8%87%AA%E5%8A%A8%E5%88%9B%E5%BB%BAissues/effect_picture.png)