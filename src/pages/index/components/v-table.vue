<template>
  <div class="v-table-wrapper" ref="wrapper" :style="{ height: `${tableWrapperHeight}px` }">
    <div class="v-table" ref="vTable">
      <table>
        <thead class="v-table-thead" ref="thead">
          <tr>
            <th :key="-1" v-if="showCol[0] > 0" :colspan="showCol[0]"><span></span></th>
            <th :key="cellIndex + showRow[0]"
                v-for="(cell, cellIndex) in (dataSource[0] || []).slice(showRow[0], showRow[1])">
              <span>title{{cell}}</span>
            </th>
            <th :key="-2" v-if="showCol[1] < (dataSource[0] || []).length" :colspan="showCol[1] - showCol[0]">
              <span></span></th>
          </tr>
        </thead>
        <tbody class="v-table-tbody" ref="tbody">
          <tr
            :key="rowKey"
            v-if="showRow[0] > 0"
            v-for="(row, rowKey) in dataSource.slice(0, showRow[0])"
          >
            <td :key="0" v-if="showRow[0] > 0"><span>{{row[0]}}</span></td>
          </tr>
          <tr
            :key="rowKey + showRow[0]"
            v-for="(row, rowKey) in dataSource.slice(showRow[0], showRow[0] + 1)"
          >
            <td :key="0"><span>{{row[0]}}</span></td>
            <td :key="1"
                v-if="showCol[0] > 1 && showRow[1] - showRow[0] > 0"
                :rowspan="showRow[1] - showRow[0]"
                :colspan="showCol[0]"
            />
            <td
              :key="cellKey + Math.max(showCol[0], 1)"
              v-for="(cell, cellKey) in row.slice(Math.max(showCol[0], 1), showCol[1])"
            >
              <span>{{cell}}</span>
            </td>
          </tr>
          <tr :key="rowKey + showRow[0] + 1" v-for="(row, rowKey) in dataSource.slice(showRow[0] + 1, showRow[1])">
            <td :key="-1"><span>{{row[0]}}</span></td>
            <td :key="cellKey + showCol[0]" v-for="(cell, cellKey) in row.slice(showCol[0], showCol[1])">
              <span>{{cell}}</span></td>
          </tr>
          <tr :key="rowKey + showRow[1]" v-for="(row, rowKey) in dataSource.slice(showRow[1])">
            <td :key="-1"><span>{{row[0]}}</span></td>
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
      this.handleTableShowAreaChange()
      this.handleWrapperHeightChange()
    }
  },
  methods: {
    async handleWrapperHeightChange () {
      await sleep(0)
      const windowJQ = $(window)
      const docJQ = $(document)
      const eleJQ = $(this.$refs.wrapper)
      const vTableJQ = $(this.$refs.vTable)
      this.tableWrapperHeight = Math.min(windowJQ.height() + docJQ.scrollTop() - eleJQ.offset().top, vTableJQ.height())
    },
    handleOnResize () {
      this.handleWrapperHeightChangeThrottle()
    },
    async handleTableShowAreaChange () {
      await sleep(0)
      const wrapperJQ = $(this.$refs.wrapper)
      const vTableJQ = $(this.$refs.vTable)
      const theadJQ = $(this.$refs.thead)
      await sleep(0)
      const firstCellJQ = $(this.$refs.tbody.querySelector('tr:first-of-type > td:first-of-type'))
      const vTableWidth = vTableJQ.width()
      const vTableHeight = vTableJQ.height()
      const theadHeight = theadJQ.height()
      const cellWidth = firstCellJQ.outerWidth()
      const cellHeight = firstCellJQ.outerHeight()
      console.log(cellWidth, cellHeight)
      const wrapperScrollTop = wrapperJQ.scrollTop()
      const wrapperScrollLeft = wrapperJQ.scrollLeft()

      const showRowTop = Math.max(Math.floor((wrapperScrollTop - theadHeight) / cellHeight), 0)
      const showCellLeft = Math.max(Math.floor(wrapperScrollLeft / cellWidth), 0)

      const showRowBottom = Math.min(Math.ceil((wrapperJQ.height() + wrapperScrollTop) / cellHeight), this.dataSource.length)
      const showRowRight = Math.min(Math.ceil((wrapperJQ.width() + wrapperScrollLeft) / cellWidth), (this.dataSource[0] || []).length)
      console.log(showCellLeft, showRowRight, showRowTop, showRowBottom)
      this.showRow = [showRowTop, showRowBottom]
      this.showCol = [showCellLeft, showRowRight]
    },
    handleOnScroll () {
      this.handleTableShowAreaChange()
    }
  },
  created () {
    this.handleWrapperHeightChangeThrottle = throttle(this.handleWrapperHeightChange, 100)
  },
  mounted () {
    this.handleOnScroll()
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

  tr > th > span,
  tr > td > span {
    line-height: 32px;
    display: inline-block;
    width: 100px;
    height: 32px;
  }
}
</style>
