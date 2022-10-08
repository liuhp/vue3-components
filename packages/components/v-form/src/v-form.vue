<template>
  <el-form
    class="z-form"
    :model="state.form"
    ref="form"
    :label-width="labelWidth"
    @submit.prevent
  >
    <el-row :gutter="20">
      <el-col
        v-bind="item.layout || layout"
        v-for="(item, index) in elements"
        :key="index"
      >
        <el-form-item
          :prop="item.prop"
          :label="item.label"
          :label-width="item.labelWidth ? item.labelWidth + 'px' : ''"
        >
          <!-- el-input -->
          <el-input
            v-if="item.type === 'input' || item.type === undefined"
            v-model="state.form[item.prop]"
            :size="item.size ? item.size : size"
            :disabled="item.disabled"
            :placeholder="item.placeholder"
            :suffix-icon="item.suffixIcon"
            clearable
          />
          <!-- el-select -->
          <el-select
            v-if="item.type === 'select'"
            v-model="state.form[item.prop]"
            :size="item.size ? item.size : size"
            :disabled="item.disabled"
            :placeholder="item.placeholder"
            :filterable="item.filterable"
            :multiple="item.multiple || false"
            :collapse-tags="item.collapseTags"
            :style="item.style"
            clearable
          >
            <template v-if="item.optionGroup">
              <el-option-group
                v-for="group in item.options"
                :key="group.groupName"
                :label="group.groupName"
              >
                <el-option
                  v-for="item in group.dataList"
                  :key="item.productCode"
                  :label="item.productName"
                  :value="item.productCode"
                >
                </el-option>
              </el-option-group>
            </template>
            <template v-else>
              <el-option
                v-for="(option, optionIndex) in item.options"
                :key="optionIndex + '_local'"
                :value="
                  typeof option === 'object'
                    ? option[item.valueKey || 'value']
                    : option
                "
                :label="
                  typeof option === 'object'
                    ? option[item.labelKey || 'label']
                    : option
                "
              />
            </template>
          </el-select>

          <el-date-picker
            v-if="item.type === 'datetimerange'"
            v-model="state.form[item.prop]"
            type="datetimerange"
            :disabled="item.disabled"
            :start-placeholder="item.startPlaceholder"
            :end-placeholder="item.endPlaceholder"
            :value-format="item.valueFormat"
            :filterable="item.filterable || true"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="btns-wrapper" v-bind="layout" v-if="!hideBtns">
        <el-button
          type="primary"
          :size="size"
          @click="searchHandler"
          style="margin-left: 16px; margin-bottom: 16px"
          :icon="Search"
        >
          查询</el-button
        >
        <el-button
          :size="size"
          @click="resetForm"
          style="margin-left: 16px; margin-bottom: 16px"
          :icon="RefreshLeft"
        >
          重置</el-button
        >
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, watch, PropType } from "vue"
import { Search, RefreshLeft } from "@element-plus/icons-vue"

type elementItem = {
  prop: string
  label: string
  type?: string
  size?: string
  disabled?: boolean
  placeholder?: string
  suffixIcon?: string
  filterable?: boolean
  multiple?: boolean
  style?: object
  optionGroup?: boolean
  options?: Array<any>
  layout?: object
  labelWidth?: number | string
  startPlaceholder?: string
  endPlaceholder?: string
  valueFormat?: any
  valueKey?: any
  labelKey?: any
  collapseTags?: any
  defaultValue?: any
  formatter?: any
}
const emits = defineEmits(["search"])
const props = defineProps({
  // layout
  layout: {
    type: Object,
    default: () => ({
      lg: {
        span: 6,
      },
      md: {
        span: 8,
      },
      sm: {
        span: 12,
      },
      xs: {
        span: 24,
      },
    }),
  },
  // 表单label宽度
  labelWidth: {
    type: [String, Number],
    default: "auto",
  },
  // 表单元素大小 默认 meidum
  size: {
    type: String,
    default: "default",
    // validator: sizeValidator,
  },
  // 表单元素
  elements: {
    type: Array<elementItem>,
    required: true,
  },
  // 是否展示搜索、重置按钮
  hideBtns: {
    type: Boolean,
    default: false,
  },
})
interface stateInterface {
  form: any
  formatters: any
}

const form = ref()
const state = reactive<stateInterface>({
  form: {},
  formatters: {},
})

watch(
  () => props.elements,
  (val) => {
    // 更新defaultValue
    val.forEach((item) => {
      const { prop, defaultValue } = item
      state.form[prop] = defaultValue
    })
  }
)

props.elements.forEach((item) => {
  const { prop, defaultValue, formatter } = item
  // 处理form数据
  if (defaultValue) {
    state.form[prop] = defaultValue
  } else {
    state.form[prop] = ""
  }
  // 处理formatter
  if (typeof formatter === "function") {
    state.formatters[prop] = formatter
  }
})

const searchHandler = () => {
  const params: any = {}
  Object.entries(state.form).forEach(([key, value]) => {
    const formatter = state.formatters[key]

    if (key.indexOf(",") !== -1) {
      const attributes = key.split(",")
      attributes.forEach((item, index) => (params[item] = value[index]))
    } else if (formatter) {
      params[key] = formatter(value)
    } else {
      params[key] = value
    }
  })
  emits("search", params)
}
const resetForm = () => {
  form.value.resetFields()
  searchHandler()
}
</script>
