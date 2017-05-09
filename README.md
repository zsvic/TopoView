# TopoView
## 使用d3.js做的一个拓扑展示的js工具

### 示例：
    TopoView.html是一个已经写好的实例，直接在浏览器打开即可

### TopoView.js使用方法:

#### 1 html中需要一个容器，如下：
```html
<div id="topoView">
	<svg>
	</svg>
</div>
```
#### 2 引入d3库（v4版本）和TopoView.js
```html
	<script src="./d3.min.js"></script>
	<script src="./topoView.js"></script>
```	
#### 3 提供拓扑数据
```javascript
var snodes = [{
     "id": "1"
    }, {
     "id": "2"
    }, {
        "id": "3"
    }];
var hnodes = [{
        "id": "5"
    }, {
        "id": "6"
    }];
var links = [{
        "source": "1",
        "target": "2"
    }, {
        "source": "2",
        "target": "3"
    }, {
        "source": "5",
        "target": "1"
    }, {
        "source": "6",
        "target": "3"
    }]
```	
#### 4 创建TopoView对象，构造方法参数为html容器ID
```javascript
var topoView = new TopoView("topoView"); 
```
#### 5 设置拓扑数据并更新视图
```javascript
topoView.setTopoInfo(snodes, hnodes, links);
topoView.updateTopoView();
```
	

