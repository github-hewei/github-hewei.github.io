"use strict";(self.webpackChunkhwdoc=self.webpackChunkhwdoc||[]).push([[1924],{8520:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>$,contentTitle:()=>a,default:()=>o,frontMatter:()=>s,metadata:()=>u,toc:()=>c});var t=r(4848),i=r(8453);const s={},a="PHP\u6587\u4ef6\u7f13\u5b58\u793a\u4f8b",u={id:"PHP/PHP\u6587\u4ef6\u7f13\u5b58\u793a\u4f8b",title:"PHP\u6587\u4ef6\u7f13\u5b58\u793a\u4f8b",description:"\u7b80\u4ecb",source:"@site/docs/PHP/PHP\u6587\u4ef6\u7f13\u5b58\u793a\u4f8b.md",sourceDirName:"PHP",slug:"/PHP/PHP\u6587\u4ef6\u7f13\u5b58\u793a\u4f8b",permalink:"/docs/PHP/PHP\u6587\u4ef6\u7f13\u5b58\u793a\u4f8b",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/PHP/PHP\u6587\u4ef6\u7f13\u5b58\u793a\u4f8b.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"PHP\u5e8f\u5217\u5316\u6570\u636e\u4fee\u590d",permalink:"/docs/PHP/PHP\u5e8f\u5217\u5316\u6570\u636e\u4fee\u590d"},next:{title:"Yii2\u6846\u67b6IN\u67e5\u8be2\u91cd\u70b9",permalink:"/docs/PHP/Yii2\u6846\u67b6IN\u67e5\u8be2\u91cd\u70b9"}},$={},c=[{value:"\u7b80\u4ecb",id:"\u7b80\u4ecb",level:2},{value:"\u4ee3\u7801",id:"\u4ee3\u7801",level:2}];function l(e){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"php\u6587\u4ef6\u7f13\u5b58\u793a\u4f8b",children:"PHP\u6587\u4ef6\u7f13\u5b58\u793a\u4f8b"}),"\n",(0,t.jsx)(n.h2,{id:"\u7b80\u4ecb",children:"\u7b80\u4ecb"}),"\n",(0,t.jsx)(n.p,{children:"\u5728php\u7a0b\u5e8f\u4e2d\uff0c\u7f13\u5b58\u53ef\u4ee5\u5b58\u50a8\u5230Redis\u6216\u8005Memcache\u4e2d\uff0c\u5982\u679c\u6ca1\u6709\u8fd9\u4e9b\u6761\u4ef6\uff0c\u6216\u8005\u670d\u52a1\u5668\u5185\u5b58\u975e\u5e38\u6709\u9650\u600e\u4e48\u529e\uff1f\u53ef\u4ee5\u5c06\u7f13\u5b58\u5185\u5bb9\u5199\u5165\u5230\u786c\u76d8\uff0c\u5199\u5165\u5230\u6587\u4ef6\u7cfb\u7edf\u4e2d\uff0c\u4e5f\u662f\u4e00\u4e2a\u601d\u8def\u3002\u4e0b\u9762\u662f\u793a\u4f8b\u4ee3\u7801\uff1a"}),"\n",(0,t.jsx)(n.h2,{id:"\u4ee3\u7801",children:"\u4ee3\u7801"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-php",children:"<?php\r\nnamespace common\\library;\r\n\r\nuse Psr\\SimpleCache\\CacheInterface;\r\n\r\nclass FileCache implements CacheInterface\r\n{\r\n    protected $filename;\r\n\r\n    protected $handle;\r\n\r\n    protected $keys = [];\r\n\r\n    protected $spaceSize;\r\n\r\n    protected $startTimestamp;\r\n\r\n    public function __construct($filename, $spaceSize = 1024)\r\n    {\r\n        $this->startTimestamp = time();\r\n        $this->filename = $filename;\r\n        $this->spaceSize = $spaceSize;\r\n\r\n        !is_dir(dirname($this->filename)) && mkdir(dirname($this->filename), 0755, true);\r\n        $this->handle = fopen($this->filename, 'w+');\r\n    }\r\n\r\n    public function __destruct()\r\n    {\r\n        fclose($this->handle);\r\n        unlink($this->filename);\r\n    }\r\n\r\n    public function get($key, $default = null)\r\n    {\r\n        $key = substr(md5($key), 0, 20);\r\n\r\n        if (!isset($this->keys[$key])) {\r\n            return $default;\r\n        }\r\n\r\n        $item = $this->parseId($this->keys[$key]);\r\n\r\n        if ($item[1] != 0 && (time() - $this->startTimestamp) > $item[1]) {\r\n            return $default;\r\n        }\r\n\r\n        fseek($this->handle, $item[0] * $this->spaceSize);\r\n        $value = fread($this->handle, $this->spaceSize);\r\n        return unserialize(rtrim($value));\r\n    }\r\n\r\n    public function set($key, $value, $ttl = null)\r\n    {\r\n        $key = substr(md5($key), 0, 20);\r\n        $value = serialize($value);\r\n\r\n        if (strlen($value) > $this->spaceSize - 1) {\r\n            throw new \\RuntimeException('not enough space');\r\n        }\r\n\r\n        if (!is_null($ttl) && $ttl > 1048575) {\r\n            throw new \\RuntimeException('Ttl out of range');\r\n        }\r\n\r\n        $value = str_pad($value, $this->spaceSize - 1, \" \") . \"\\n\";\r\n\r\n        if (isset($this->keys[$key])) {\r\n            $item = $this->parseId($this->keys[$key]);\r\n            $start = $item[0] * $this->spaceSize;\r\n            $index = $item[0];\r\n\r\n        } else {\r\n            $count = count($this->keys);\r\n            $start = $count * $this->spaceSize;\r\n            $index = $count;\r\n        }\r\n\r\n        fseek($this->handle, $start, SEEK_SET);\r\n        fwrite($this->handle, $value);\r\n        fflush($this->handle);\r\n\r\n        $this->keys[$key] = $this->getId($ttl ? (time() - $this->startTimestamp) + $ttl : 0, $index);\r\n        return true;\r\n    }\r\n\r\n    public function delete($key)\r\n    {\r\n        $key = substr(md5($key), 0, 20);\r\n        unset($this->keys[$key]);\r\n        return true;\r\n    }\r\n\r\n    public function clear()\r\n    {\r\n        ftruncate($this->handle, 0);\r\n        fflush($this->handle);\r\n        return true;\r\n    }\r\n\r\n    public function getMultiple($keys, $default = null)\r\n    {\r\n        $values = [];\r\n\r\n        foreach ($keys as $key) {\r\n            $values[$key] = $this->get($key, $default);\r\n        }\r\n\r\n        return $values;\r\n    }\r\n\r\n    public function setMultiple($values, $ttl = null)\r\n    {\r\n        foreach ($values as $key => $value) {\r\n            $this->set($key, $value, $ttl);\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n    public function deleteMultiple($keys)\r\n    {\r\n        foreach ($keys as $key) {\r\n            $this->delete($key);\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n    public function has($key)\r\n    {\r\n        return isset($this->keys[md5($key)]);\r\n    }\r\n\r\n    protected function getId($time, $count)\r\n    {\r\n        return $time << 20 | $count;\r\n    }\r\n\r\n    protected function parseId($id)\r\n    {\r\n        $id = str_pad(decbin($id), 40, '0', STR_PAD_LEFT);\r\n        return [bindec(substr($id, 21)), bindec(substr($id, 0, 20))];\r\n    }\r\n}\n"})})]})}function o(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>a,x:()=>u});var t=r(6540);const i={},s=t.createContext(i);function a(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function u(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);