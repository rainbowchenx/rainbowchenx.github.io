import{_ as e,o as t,c as a,R as o}from"./chunks/framework.LBXiIpgL.js";const h=JSON.parse('{"title":"vue 基础","description":"","frontmatter":{},"headers":[],"relativePath":"zhaowa/VUE基础.md","filePath":"zhaowa/VUE基础.md"}'),d={name:"zhaowa/VUE基础.md"},r=o('<h1 id="vue-基础" tabindex="-1">vue 基础 <a class="header-anchor" href="#vue-基础" aria-label="Permalink to &quot;vue 基础&quot;">​</a></h1><h3 id="数据双向绑定" tabindex="-1">数据双向绑定 <a class="header-anchor" href="#数据双向绑定" aria-label="Permalink to &quot;数据双向绑定&quot;">​</a></h3><p>组件间的事件传递属性</p><ol><li>利用花括号，构筑了数据和 vm 的绑定关系 =&gt;buildTemplate</li><li>利用视图绑定事件，来处理数据 =&gt; v-model === :value + @input =&gt; 子组件中通过 model :input</li></ol><p>render 函数是 template 的下一级 =&gt;buildTemplate=&gt;render() template 是 viewmodel 层 组件渲染出来的整体是 view 层 vue 中有个 mergeOptions，</p><h4 id="vue-生命周期" tabindex="-1">vue 生命周期: <a class="header-anchor" href="#vue-生命周期" aria-label="Permalink to &quot;vue 生命周期:&quot;">​</a></h4><p>创建阶段: beforeCreate =&gt; created =&gt; beforeMount =&gt; mounted 更新阶段： beforeUpdated =&gt; updated 销毁阶段： beforeDestroy =&gt;destroyed</p><p>beforeCreate:new Vue() - 实例创建阶段 created：data| props | computed | method - 数据操作 =&gt; 不涉及 vdom（用数据或者对象来表示 dom）和 dom</p><p>beforeMount：vdom - 数据操作可以进行了，但是不可以涉及 dom（vdom 已经组装完成，但是 dom 还没有更新） mounted： dom 阶段可以进行任何操作</p><p>beforeUpdated:vdom 已经完成了更新，但是 dom 还没有更新（在次数进行数据操作） updated：dom 已经更新了 - 谨慎地更新数据操作（有可能会导致死循环）</p><p>beforeDestroy：实例 vm 尚未被销毁 - 清空当前实例涉及的 eventbus， reset store ，清空计时器等 destroyed：实例已经销毁 - 收尾工作</p><p>keepalive：</p>',12),p=[r];function l(n,i,m,s,u,_){return t(),a("div",null,p)}const v=e(d,[["render",l]]);export{h as __pageData,v as default};
