# vue3-components
基于vue3+elementPlus的组件库


技术栈：
- Vue3
- TypeScript
- pnpm

目录结构：
```
│  .gitignore
│  .npmrc
│  package.json
│  pnpm-lock.yaml
│  pnpm-workspace.yaml
│  tsconfig.json
│  
├─build
│      gulpfile.ts
│      
├─node_modules           
├─packages
│  ├─components  // 业务组件
│  │  │  package.json
│  │  │  
│  │  ├─node_modules
│  │  └─v-form
│  │      │  index.ts
│  │      │  
│  │      └─src
│  │              README.md
│  │              v-form.ts
│  │              v-form.vue
│  │              
│  ├─theme-chalk // 公共样式
│  │  │  package.json
│  │  │  
│  │  └─src
│  │      │  form.scss
│  │      │  index.scss
│  │      │  
│  │      └─mixins
│  │              config.scss
│  │              mixins.scss
│  │              
│  └─utils // 公共方法
│          package.json
│          with-install.ts  
├─play // 实例代码
│  │  app.vue
│  │  index.html
│  │  main.ts
│  │  package.json
│  │  vite.config.ts
│  │  
│  └─node_modules            
└─typings
        vue-shim.d.ts
```
