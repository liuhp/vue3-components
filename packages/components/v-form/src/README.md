## AppSearchForm
### 组件介绍
`AppSearchForm` 是一个简单搜索form组件，当前支持input、select、datepicker组件，配合`AppTable`可快速开发CURD页面

### 组件使用
```javascript
<template>
<div class="main">
  <app-search-form :elements="forms" @search="search"></app-search-form>
</div>
</template>

<script>
import AppSearchForm from './src';

export default {
  components: {
    AppSearchForm,
  },
  data() {
    return {
      forms: [
        {
          label: '角色标识',
          prop: 'roleCode',
          placeholder: '角色标识',
        },
        {
          label: '角色名称',
          prop: 'roleName',
          placeholder: '分组名称',
        },
        {
          label: '产品',
          prop: 'productCode',
          placeholder: '产品',
          type: 'select',
          optionGroup: true,
          options: [],
          style: 'width:100%;',
        },
        {
          label: '创建时间',
          prop: 'create_at_start,create_at_end',
          type: 'datetimerange',
          defaultValue: [],
          startPlaceholder: '选择开始时间',
          endPlaceholder: '选择结束时间',
          valueFormat: 'yyyy-MM-dd HH:mm:ss',
          layout: {
            lg: {
              span: 8,
            },
            md: {
              span: 12,
            },
            sm: {
              span: 24,
            },
            xs: {
              span: 24,
            },
          },
        },
      ],
    };
  },
  methods:{
    search(params){
      console.log(params)
    }
  }
};
</script>
```
### 组件API
**参数**
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| -| -| -| -| -|
| layout|搜索条件自适应布局|Object|--|{"lg":{"span":6},"md":{"span":8},"sm":{"span":12},"xs":{"span":24}}|
|labelWidth|搜索条件label长度，默认'auto'|String|--|'auto'|
|size|搜索form组件大小|String|['large','medium','smal']|'medium'|
|hideBtns|是否展示搜索、重置按钮，默认为false|Boolean|[true,false]|false|
|elements|搜索组件信息数据，必须参数,|Array|--|--|
**elements组件参数详情**
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| -| -| -| -| -|
| type|组件类型，默认为`input`|String|['input','select','datetimerange']|'input'|
|prop|参数key值，点击搜索返回用户输入数据的key,当`type`为`datetimerange`时，为逗号分隔的两个key，第一个为开始时间，第二个为结束时间|String|--|
|placeholder|组件输入提示|String|--|--|
|disabled|组件是否可用|Boolean|[true,false]|false|
* 组件特有的属性可参考[finD官网](http://find.jdfmgt.com/assembly/)

**事件**
| 事件名 | 说明 | 参数
| -| -| -|
|search|点击搜索回调事件|params为当前form用户输入的数据|