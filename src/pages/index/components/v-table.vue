<template>
  <div class="v-table-wrapper" ref="wrapper" :style="{ height: `${tableWrapperHeight}px` }">
    <div class="v-table" ref="vTable">
      <table>
        <thead class="v-table-thead" ref="thead">
          <tr>
            <th :key="cellIndex" v-for="(cell, cellIndex) in (dataSource[0] || [])">title{{cell}}</th>
          </tr>
        </thead>
        <tbody class="v-table-tbody" ref="tbody">
          <tr :key="rowKey" v-for="(row, rowKey) in dataSource.slice(0, showRow[0])">
            <td :key="0">{{row[0]}}</td>
          </tr>
          <tr :key="rowKey + showRow[0]" v-for="(row, rowKey) in dataSource.slice(showRow[0], showRow[0] + 1)">
            <td :key="0">{{row[0]}}</td>
            <template v-if="showCol[0] > 0">
              <td :key="1"
                  :rowspan="showRow[1] - showRow[0]"
                  :colspan="showCol[0]"
              />
            </template>
            <td :key="cellKey + showCol[0]" v-for="(cell, cellKey) in row.slice(showCol[0], showCol[1])">
              {{cell}}
            </td>
          </tr>
          <tr :key="rowKey + showRow[0] + 1" v-for="(row, rowKey) in dataSource.slice(showRow[0] + 1, showRow[1])">
            <td :key="0">{{row[0]}}</td>
            <td :key="cellKey + showCol[0]" v-for="(cell, cellKey) in row.slice(showCol[0], showCol[1])">{{cell}} </td>
          </tr>
          <tr :key="rowKey + showRow[1]" v-for="(row, rowKey) in dataSource.slice(showRow[1])">
            <td :key="0">{{row[0]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash.throttle'
import $ from 'jquery'
import sleep from '../../../utils/sleep-promise'

export default {
  name: 'v-table',
  data: function () {
    return {
      tableWrapperHeight: 0,
      showRow: [0, 0],
      showCol: [0, 0]
    }
  },
  props: {
    dataSource: {
      type: Array,
      default () {
        return undefined
      }
    }
  },
  watch: {
    dataSource () {
      this.handleWrapperHeightChange()
    }
  },
  methods: {
    async handleWrapperHeightChange () {
      const windowJQ = $(window)
      const docJQ = $(document)
      const eleJQ = $(this.$refs.wrapper)
      const vTableJQ = $(this.$refs.vTable)
      await sleep(0)
      this.tableWrapperHeight = Math.min(windowJQ.height() + docJQ.scrollTop() - eleJQ.offset().top, vTableJQ.height())
    },
    handleOnResize () {
      this.handleWrapperHeightChangeThrottle()
    },
    handleOnScroll () {
      const wrapperJQ = $(this.$refs.wrapper)
      const vTableJQ = $(this.$refs.vTable)
      const theadJQ = $(this.$refs.thead)
      const vTableWidth = vTableJQ.width()
      const vTableHeight = vTableJQ.height()
      const theadHeight = theadJQ.height()
      const cellWidth = vTableWidth / (this.dataSource[0] || []).length
      const cellHeight = (vTableHeight - theadHeight) / (this.dataSource || []).length
      const wrapperScrollTop = wrapperJQ.scrollTop()
      const wrapperScrollLeft = wrapperJQ.scrollLeft()

      const showRowTop = Math.max(Math.floor((wrapperScrollTop - theadHeight) / cellHeight), 0)
      const showCellLeft = Math.max(Math.floor(wrapperScrollLeft / cellWidth), 0)

      const showRowBottom = Math.min(Math.ceil((wrapperJQ.height() + wrapperScrollTop) / cellHeight), this.dataSource.length)
      const showRowRight = Math.min(Math.ceil((wrapperJQ.width() + wrapperScrollLeft) / cellWidth), (this.dataSource[0] || []).length)
      console.log(showCellLeft, showRowRight, showRowTop, showRowBottom)
      this.showRow = [showRowTop + 1, showRowBottom - 1]
      this.showCol = [showCellLeft + 1, showRowRight - 1]
    }
  },
  created () {
    this.handleWrapperHeightChangeThrottle = throttle(this.handleWrapperHeightChange, 100)
  },
  mounted () {
    this.$refs.wrapper.addEventListener('scroll', this.handleOnScroll, false)
    this.handleOnResize()
    window.addEventListener('resize', this.handleOnResize, false)
  },
  beforeDestroy () {
    this.$refs.wrapper.removeEventListener('scroll', this.handleOnScroll)
    window.removeEventListener('scroll', this.handleOnResize)
  }
}
</script>

<style lang="less">
@import './v-table.less';

.v-table-wrapper {
  width: 100%;
  overflow: auto;
}

.v-table {
  display: inline-block;
}
</style>
