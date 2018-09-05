<template>
  <div class="v-table-wrapper">
    <mt-button type="default" ref="thead">测试</mt-button>
    <div class="v-table">
      <table>
        <thead class="v-table-thead">
          <tr>
            <th :key="ceilIndex" v-for="(ceil, ceilIndex) in (dataSource[0] || [])">title{{ceil}}</th>
          </tr>
        </thead>
        <tbody class="v-table-tbody">
          <tr :key="rowKey" v-for="(row, rowKey) in dataSource">
            <td :key="ceilKey" v-for="(ceil, ceilKey) in row">{{ceil}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-table',
  data: function () {
    return {}
  },
  props: {
    dataSource: {
      type: Array,
      default () {
        return undefined
      }
    }
  },
  watch: {},
  methods: {
    handleOnScroll () {
      let element = this.$refs.thead
      element = element.$el || element
      const { top, left } = this.getElementTopLeft(element)
      if (top + element.clientHeight > window.pageYOffset &&
        window.pageYOffset + window.innerHeight > top &&
        left + element.clientWidth > window.pageXOffset &&
        window.pageXOffset + window.innerWidth > left) {
        console.log('可见')
      } else {
        console.log('不可见')
      }
    },
    getElementTopLeft (obj) {
      var top = 0
      var left = 0
      while (obj) {
        top += obj.offsetTop
        left += obj.offsetLeft
        obj = obj.offsetParent
      }
      return { top: top, left: left }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleOnScroll, false)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleOnScroll)
  }
}
</script>

<style lang="less">
@import './v-table.less';
</style>
