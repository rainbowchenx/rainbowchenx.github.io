import{_ as s,o as a,c as n,R as l}from"./chunks/framework.LBXiIpgL.js";const d=JSON.parse('{"title":"VUE 源码解析","description":"","frontmatter":{},"headers":[],"relativePath":"zhaowa/vue源码解析.md","filePath":"zhaowa/vue源码解析.md"}'),p={name:"zhaowa/vue源码解析.md"},o=l(`<h1 id="vue-源码解析" tabindex="-1">VUE 源码解析 <a class="header-anchor" href="#vue-源码解析" aria-label="Permalink to &quot;VUE 源码解析&quot;">​</a></h1><h2 id="_2-大纲" tabindex="-1">2. 大纲 <a class="header-anchor" href="#_2-大纲" aria-label="Permalink to &quot;2. 大纲&quot;">​</a></h2><ol><li>vue2 和 vue3 的响应式的对比</li><li>vue3 新特性</li></ol><h2 id="_3-vue2、3-响应式的对比" tabindex="-1">3. vue2、3 响应式的对比 <a class="header-anchor" href="#_3-vue2、3-响应式的对比" aria-label="Permalink to &quot;3. vue2、3 响应式的对比&quot;">​</a></h2><p>vue2： Object.defineProperty 对数组的操作无法监听 对 vue3: Proxy</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vue2中实现响应式数据</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">initData</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  value: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {};</span></span>
<span class="line"><span style="color:#E1E4E8;">Object.</span><span style="color:#B392F0;">keys</span><span style="color:#E1E4E8;">(initData).</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  Object.</span><span style="color:#B392F0;">defineProperty</span><span style="color:#E1E4E8;">(data, key, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> initData[key];</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">newVal</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      initData[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newVal;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 通知更新</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;更新数据&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(data.value); </span><span style="color:#6A737D;">// 1 响应式实现,监听访问</span></span>
<span class="line"><span style="color:#E1E4E8;">data.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(data.value); </span><span style="color:#6A737D;">// 1 响应式实现,监听修改</span></span>
<span class="line"><span style="color:#E1E4E8;">initData.value2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(initData);</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(data.value2); </span><span style="color:#6A737D;">// 无法对新增的属性进行响应式</span></span>
<span class="line"><span style="color:#6A737D;">// 在vue2中可以通过Vue.set 或者this.$set实现</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vue2中实现响应式数据</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">initData</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  value: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {};</span></span>
<span class="line"><span style="color:#24292E;">Object.</span><span style="color:#6F42C1;">keys</span><span style="color:#24292E;">(initData).</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((</span><span style="color:#E36209;">key</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  Object.</span><span style="color:#6F42C1;">defineProperty</span><span style="color:#24292E;">(data, key, {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> initData[key];</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">newVal</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      initData[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newVal;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 通知更新</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;更新数据&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(data.value); </span><span style="color:#6A737D;">// 1 响应式实现,监听访问</span></span>
<span class="line"><span style="color:#24292E;">data.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(data.value); </span><span style="color:#6A737D;">// 1 响应式实现,监听修改</span></span>
<span class="line"><span style="color:#24292E;">initData.value2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(initData);</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(data.value2); </span><span style="color:#6A737D;">// 无法对新增的属性进行响应式</span></span>
<span class="line"><span style="color:#6A737D;">// 在vue2中可以通过Vue.set 或者this.$set实现</span></span></code></pre></div><h3 id="this-set-target-key-value-针对响应式数据-target-修改其中的-key-对应的位置的值为-value" tabindex="-1">this.$set(target, key, value) - 针对响应式数据 target，修改其中的 key 对应的位置的值为 value <a class="header-anchor" href="#this-set-target-key-value-针对响应式数据-target-修改其中的-key-对应的位置的值为-value" aria-label="Permalink to &quot;this.$set(target, key, value) - 针对响应式数据 target，修改其中的 key 对应的位置的值为 value&quot;">​</a></h3><p>实现原理步骤：target 进行数据校验（类型判断）并进行响应操作</p><ul><li>undefined | null | 基本数据类型 =&gt; 报错</li><li>数组：max(target.length, key)作为新的数组长度，使用 splice(key, 1, value)会自动百年城响应式的</li><li>对象：key 是否在对象里 =&gt; 如果在，直接进行替换，如果不在，直接判断 target 是不是响应式对象； =&gt; 判断是不是 vue 实例或者根数据对象，=&gt; 是的话警告;不是直接给 target 的 key 复制 =&gt; 如果 target 是响应式的，使用 definedReactive 将新的属性添加到 target，进行依赖收集,更新数据</li></ul><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Array</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Object</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">val</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// isUndef 是判断 target 是不是等于 undefined 或者 null 。</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// isPrimitive 是判断 target 的数据类型是不是 string、number、symbol、boolean 中的一种</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    process.env.</span><span style="color:#79B8FF;">NODE_ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;production&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">    (</span><span style="color:#B392F0;">isUndef</span><span style="color:#E1E4E8;">(target) </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isPrimitive</span><span style="color:#E1E4E8;">(target))</span></span>
<span class="line"><span style="color:#E1E4E8;">  ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;Cannot set reactive property on undefined, null, or primitive value:&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 数组的处理</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (Array.</span><span style="color:#B392F0;">isArray</span><span style="color:#E1E4E8;">(target) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isValidArrayIndex</span><span style="color:#E1E4E8;">(key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    target.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">max</span><span style="color:#E1E4E8;">(target.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">, key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    target.</span><span style="color:#B392F0;">splice</span><span style="color:#E1E4E8;">(key, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, val);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> val;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 对象，并且该属性原来已存在于对象中，则直接更新</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (key </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> target </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">(key </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Object</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">prototype</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    target[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> val;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> val;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// vue给响应式对象(比如 data 里定义的对象)都加了一个 __ob__ 属性，</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果一个对象有这个 __ob__ 属性，那么就说明这个对象是响应式对象，修改对象已有属性的时候就会触发页面渲染</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 非 data 里定义的就不是响应式对象。</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ob</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">target</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;">).__ob__;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  if (target._isVue || (</span><span style="color:#FFAB70;">ob</span><span style="color:#E1E4E8;"> &amp;&amp; ob.vmCount)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    process.env.NODE_ENV !== </span><span style="color:#9ECBFF;">&quot;production&quot;</span><span style="color:#E1E4E8;"> &amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      warn(</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;Avoid adding reactive properties to a Vue instance or its root $data &quot;</span><span style="color:#E1E4E8;"> +</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&quot;at runtime - declare it upfront in the data option.&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      );</span></span>
<span class="line"><span style="color:#E1E4E8;">    return val;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 不是响应式对象</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (!ob) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    target[key] = val;</span></span>
<span class="line"><span style="color:#E1E4E8;">    return val;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 是响应式对象，进行依赖收集</span></span>
<span class="line"><span style="color:#E1E4E8;">  defineReactive(ob.value, key, val);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 触发更新视图</span></span>
<span class="line"><span style="color:#E1E4E8;">  ob.dep.notify();</span></span>
<span class="line"><span style="color:#E1E4E8;">  return val;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Array</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">any</span><span style="color:#24292E;">&gt; </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Object</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">, </span><span style="color:#E36209;">val</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// isUndef 是判断 target 是不是等于 undefined 或者 null 。</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// isPrimitive 是判断 target 的数据类型是不是 string、number、symbol、boolean 中的一种</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    process.env.</span><span style="color:#005CC5;">NODE_ENV</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;production&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">    (</span><span style="color:#6F42C1;">isUndef</span><span style="color:#24292E;">(target) </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isPrimitive</span><span style="color:#24292E;">(target))</span></span>
<span class="line"><span style="color:#24292E;">  ) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;Cannot set reactive property on undefined, null, or primitive value:&#39;</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 数组的处理</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (Array.</span><span style="color:#6F42C1;">isArray</span><span style="color:#24292E;">(target) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isValidArrayIndex</span><span style="color:#24292E;">(key)) {</span></span>
<span class="line"><span style="color:#24292E;">    target.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">max</span><span style="color:#24292E;">(target.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">, key);</span></span>
<span class="line"><span style="color:#24292E;">    target.</span><span style="color:#6F42C1;">splice</span><span style="color:#24292E;">(key, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, val);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> val;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 对象，并且该属性原来已存在于对象中，则直接更新</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (key </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> target </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">(key </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Object</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">prototype</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">    target[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> val;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> val;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// vue给响应式对象(比如 data 里定义的对象)都加了一个 __ob__ 属性，</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果一个对象有这个 __ob__ 属性，那么就说明这个对象是响应式对象，修改对象已有属性的时候就会触发页面渲染</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 非 data 里定义的就不是响应式对象。</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ob</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">target</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;">).__ob__;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  if (target._isVue || (</span><span style="color:#E36209;">ob</span><span style="color:#24292E;"> &amp;&amp; ob.vmCount)) {</span></span>
<span class="line"><span style="color:#24292E;">    process.env.NODE_ENV !== </span><span style="color:#032F62;">&quot;production&quot;</span><span style="color:#24292E;"> &amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      warn(</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;Avoid adding reactive properties to a Vue instance or its root $data &quot;</span><span style="color:#24292E;"> +</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&quot;at runtime - declare it upfront in the data option.&quot;</span></span>
<span class="line"><span style="color:#24292E;">      );</span></span>
<span class="line"><span style="color:#24292E;">    return val;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 不是响应式对象</span></span>
<span class="line"><span style="color:#24292E;">  if (!ob) {</span></span>
<span class="line"><span style="color:#24292E;">    target[key] = val;</span></span>
<span class="line"><span style="color:#24292E;">    return val;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 是响应式对象，进行依赖收集</span></span>
<span class="line"><span style="color:#24292E;">  defineReactive(ob.value, key, val);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 触发更新视图</span></span>
<span class="line"><span style="color:#24292E;">  ob.dep.notify();</span></span>
<span class="line"><span style="color:#24292E;">  return val;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>vue3 =&gt; Proxy 拦截</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 数据响应式的实现,使用proxy</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">data</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: </span><span style="color:#9ECBFF;">&quot;zhaowa&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  age: </span><span style="color:#79B8FF;">18</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  info: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    address: </span><span style="color:#9ECBFF;">&quot;beijing&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">observe</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> data </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;object&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> data </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(data, {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">receiver</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (key </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> target) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Reflect.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target, key, receiver);</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;不存在该属性&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">receiver</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;set&quot;</span><span style="color:#E1E4E8;">, key, value);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Reflect.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(target, key, value, receiver);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">deleteProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;delete&quot;</span><span style="color:#E1E4E8;">, key);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Reflect.</span><span style="color:#B392F0;">deleteProperty</span><span style="color:#E1E4E8;">(target, key);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res;</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 数据响应式的实现,使用proxy</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">data</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  name: </span><span style="color:#032F62;">&quot;zhaowa&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  age: </span><span style="color:#005CC5;">18</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  info: {</span></span>
<span class="line"><span style="color:#24292E;">    address: </span><span style="color:#032F62;">&quot;beijing&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">observe</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">data</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> data </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;object&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> data </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(data, {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#E36209;">receiver</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (key </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> target) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Reflect.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target, key, receiver);</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;不存在该属性&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, </span><span style="color:#E36209;">value</span><span style="color:#24292E;">, </span><span style="color:#E36209;">receiver</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;set&quot;</span><span style="color:#24292E;">, key, value);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Reflect.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(target, key, value, receiver);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">deleteProperty</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;delete&quot;</span><span style="color:#24292E;">, key);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Reflect.</span><span style="color:#6F42C1;">deleteProperty</span><span style="color:#24292E;">(target, key);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res;</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="vue-3-的新的特性" tabindex="-1">vue 3 的新的特性 <a class="header-anchor" href="#vue-3-的新的特性" aria-label="Permalink to &quot;vue 3 的新的特性&quot;">​</a></h2><h3 id="composition-api-组合式-api" tabindex="-1">composition api - 组合式 api <a class="header-anchor" href="#composition-api-组合式-api" aria-label="Permalink to &quot;composition api - 组合式 api&quot;">​</a></h3><ul><li>setup - vue3 中组件的新特性 - 作为组件统一的入口 在 beforeCreate 和 created 之前执行的 使用解构会丢失响应式，可以使用 toRefs 保持响应性</li></ul><h3 id="reactive-shallowreactive" tabindex="-1">reactive() || shallowReactive() <a class="header-anchor" href="#reactive-shallowreactive" aria-label="Permalink to &quot;reactive() || shallowReactive()&quot;">​</a></h3><ul><li>reactive ：使用 proxy 添加响应式。等同于 vue2.observable();响应式是深层的，会影响所有的嵌套</li><li>shallowReactive:浅层的响应式转换，内层嵌套的不会存在响应式</li></ul><h3 id="ref-isref-torefs" tabindex="-1">ref() isRef() toRefs() <a class="header-anchor" href="#ref-isref-torefs" aria-label="Permalink to &quot;ref() isRef() toRefs()&quot;">​</a></h3><ul><li>ref() -</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">count</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">obj</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  a: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  count,</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(count.value </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> obj.count); </span><span style="color:#6A737D;">// value</span></span>
<span class="line"><span style="color:#6A737D;">// 修改count或者obj, count都会触发响应式;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">count</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">obj</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  a: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  count,</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(count.value </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> obj.count); </span><span style="color:#6A737D;">// value</span></span>
<span class="line"><span style="color:#6A737D;">// 修改count或者obj, count都会触发响应式;</span></span></code></pre></div><ul><li><p>isRef() - 是不是 ref 创建出来的</p></li><li><p>toRefs() - 将 reactive 响应式对象转换成 ref 类型的对象</p></li><li><p>readonly isReadOnly shallowReadonly</p></li></ul><p>readonly - 只读,强行修改不生效但是会有 warn isReadOnly - 是否只读 shallowReadonly - 表面一层只读</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// vue2中</span></span>
<span class="line"><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">a</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// vue3中</span></span>
<span class="line"><span style="color:#B392F0;">data2</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    a: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  };</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// vue2中</span></span>
<span class="line"><span style="color:#6F42C1;">data</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">a</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// vue3中</span></span>
<span class="line"><span style="color:#6F42C1;">data2</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    a: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  };</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="为什么-data-不能直接返回对象-而是返回一个-return-的匿名函数" tabindex="-1">为什么 data 不能直接返回对象，而是返回一个 return 的匿名函数? <a class="header-anchor" href="#为什么-data-不能直接返回对象-而是返回一个-return-的匿名函数" aria-label="Permalink to &quot;为什么 data 不能直接返回对象，而是返回一个 return 的匿名函数?&quot;">​</a></h2><p>前者是返回一个引用地址，后者是返回一个对象 前者中其实是共用一个内存的，指向同一个地址；后者返回匿名函数的话会新开辟一个地址</p>`,25),e=[o];function t(c,r,E,y,i,F){return a(),n("div",null,e)}const v=s(p,[["render",t]]);export{d as __pageData,v as default};
