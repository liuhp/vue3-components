<template>
  <div>测试</div>
  <v-form :elements="forms" @search="search"></v-form>
</template>
<script lang="ts" setup>
const forms = [
  {
    label: "角色标识",
    prop: "roleCode",
    placeholder: "角色标识",
  },
  {
    label: "角色名称",
    prop: "roleName",
    placeholder: "分组名称",
  },
  {
    label: "产品",
    prop: "productCode",
    placeholder: "产品",
    type: "select",
    optionGroup: true,
    options: [],
    style: "width:100%;",
  },
  {
    label: "创建时间",
    prop: "create_at_start,create_at_end",
    type: "datetimerange",
    defaultValue: [],
    startPlaceholder: "选择开始时间",
    endPlaceholder: "选择结束时间",
    valueFormat: "yyyy-MM-dd HH:mm:ss",
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
]

const search = (params) => {
  console.log(params)
}
</script>
