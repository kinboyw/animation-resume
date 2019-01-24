var css1 = `/* 
 * 面试官你好，我是XXX
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */

*{
  transition: all 1s;
}
html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}

/* 我需要一点代码高亮 */

.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 加一个呼吸效果 */

#code{
  animation: breath 0.5s infinite alternate-reverse;
}

/* 现在正式开始 */

/* 我需要一张白纸 */

#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}

#paper > .content {
 display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`

var css2 = `
/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */



`
var md = `
# 自我介绍

我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`
let css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`
WriteCode('',css1)
.then(()=>{return createPaper()})
.then(()=>{return writeMarkdown(md)})
.then(()=>{return WriteCode(css1,css2)})
.then(()=>{return convertMarkdownToHtml()})
.then(()=>{return WriteCode(css1+css2,css3)})
.then(()=>{
    console.log('完成')
})

function WriteCode(prefix,codeTxt){
    return new Promise((resolve,reject)=>{
    let n = 0;
    console.log(codeTxt)
    let it = setInterval(() => {
       n++;
       code.innerHTML = Prism.highlight(prefix+codeTxt.substring(0,n),Prism.languages.css);
       styleTag.innerHTML = prefix+codeTxt.substring(0,n);
       code.scrollTop = code.scrollHeight; 
       if(n>codeTxt.length){
           clearInterval(it);
           resolve();
       }
    }, 50);
    });
    
}
function createPaper(){
    return new Promise((resolve,reject)=>{
        var paper = document.createElement('div') 
        paper.id = 'paper'
        var content = document.createElement('pre')
        content.className = 'content'
        paper.appendChild(content)
        document.body.appendChild(paper)
        resolve();
    })
  
}

function convertMarkdownToHtml(){
    return new Promise((resolve,reject)=>{
        var div = document.createElement('div')  
        div.className = 'html markdown-body'
        div.innerHTML = marked(md)
        let markdownContainer = document.querySelector('#paper > .content')
        markdownContainer.replaceWith(div)
        resolve();
    })

}
function writeMarkdown(markdown){
    return new Promise((resolve,reject)=>{
        let domPaper = document.querySelector('#paper>.content')
        let n = 0
        let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            resolve();
            }
        }, 35)
    })
}