<template>
  <div class="v-table-wrapper" ref="wrapper" :style="{ height: `${tableWrapperHeight}px` }">
    <div class="v-table" ref="vTable">
      <table>
        <thead class="v-table-thead" ref="thead">
          <tr>
            <!--<th-->
            <!--:key="0"-->
            <!--v-if="showCol[0] > 0"-->
            <!--:colspan="showCol[0]"-->
            <!--:style="{width: `${(showCol[0]) * cellWidth}px`}"-->
            <!--&gt;<span></span></th>-->
            <!--<th-->
            <!--:key="cellIndex"-->
            <!--v-for="(cell, cellIndex) in (dataSource[0] || []).slice(showCol[0], showCol[1])"-->
            <!--&gt;-->
            <!--<span>title{{cell}}</span>-->
            <!--</th>-->
            <!--<th-->
            <!--:key="cellIndex + showCol[1]"-->
            <!--:colspan="(dataSource[0] || []).length - showCol[1]"-->
            <!--:style="{width: `${((dataSource[0] || []).length - showCol[1]) * cellWidth}px`}"-->
            <!--&gt;-->
            <!--<span></span>-->
            <!--</th>-->
            <th
                :key="cellIndex"
                v-for="(cell, cellIndex) in (dataSource[0] || [])"
            >
              <span>title{{cell}}</span>
            </th>
          </tr>
        </thead>
        <tbody class="v-table-tbody" ref="tbody">
          <tr
              :key="rowKey"
              v-if="showRow[0] > 0"
              v-for="(row, rowKey) in dataSource.slice(0, showRow[0])"
          >
            <td :key="0"><span>{{rowKey}},{{rowKey}}</span></td>
            <td
                :key="1"
                :colspan="dataSource.length - 1"
            ><span>{{rowKey}},{{rowKey}}</span></td>
          </tr>
          <tr
              :key="rowKey + showRow[0]"
              v-for="(row, rowKey) in dataSource.slice(showRow[0], showRow[0] + 1)"
          >
            <td :key="0"><span>{{rowKey + showRow[0]}},{{0}}</span></td>
            <td
                :key="1"
                v-if="showCol[0] > 1 && showRow[1] - showRow[0] > 0"
                :rowspan="showRow[1] - showRow[0]"
                :colspan="showCol[0] - 1"
            ><span>{{rowKey + showRow[0]}},{{1}}</span></td>
            <td
                :key="cellKey + Math.max(showCol[0], 1)"
                v-for="(cell, cellKey) in row.slice(Math.max(showCol[0], 1), showCol[1])"
            >
              <span>{{rowKey + showRow[0]}},{{cellKey + Math.max(showCol[0], 1)}}</span>
            </td>
          </tr>
          <tr :key="rowKey + showRow[0] + 1" v-for="(row, rowKey) in dataSource.slice(showRow[0] + 1, showRow[1])">
            <td :key="0"><span>{{rowKey + showRow[0] + 1}},{{0}}</span></td>
            <td
                :key="cellKey + Math.max(showCol[0] - 1, 1)"
                v-for="(cell, cellKey) in row.slice(Math.max(showCol[0] - 1, 1), showCol[1])"
            >
              <span>{{rowKey + showRow[0] + 1}},{{cellKey + Math.max(showCol[0] - 1, 1)}}</span>
            </td>
          </tr>
          <tr :key="rowKey + showRow[1]">
            <td
                :key="0"
                :rowspan="dataSource.length - showRow[1]"
                :colspan="(dataSource[0] || []).length - 1"
                :style="{height: `${(dataSource.length - showRow[1]) * cellHeight}px`, width: `${((dataSource[0] || []).length - 1) * cellWidth}px`}"
            ><span>{{rowKey + showRow[1]}},{{0}}</span></td>
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
      showCol: [0, 0],
      cellHeight: 0,
      cellWidth: 0
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
      const theadJQ = $(this.$refs.thead)
      await sleep(0)
      const firstCellJQ = $(this.$refs.tbody.querySelector('tr td:not([rolspan]):not([colspan])'))
      if (!firstCellJQ.length) {
        return
      }
      const cellWidth = firstCellJQ.outerWidth()
      const cellHeight = firstCellJQ.outerHeight()
      console.log(cellWidth, cellHeight)
      this.cellWidth = cellWidth
      this.cellHeight = cellHeight

      const theadHeight = theadJQ.height()
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
  tr > th,
  tr > td {
    padding: 0;
    margin: 0;
  }
  tr > th > span,
  tr > td > span {
    line-height: 32px;
    display: inline-block;
    width: 100px;
    height: 32px;
  }
}
</style>
