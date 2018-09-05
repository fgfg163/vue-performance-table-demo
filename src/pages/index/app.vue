<template>
  <div id="app">
    <mt-field label="行" v-model="rowNum" />
    <mt-field label="列" v-model="colNum" />
    <div>
      <mt-button type="default" @click="handleOnLoadSyncClick">同步生成</mt-button>
      <mt-button type="default" @click="handleOnLoadAsyncClick">异步生成</mt-button>
      <mt-button type="default" @click="handleOnReloadClick">刷新页面</mt-button>
    </div>
    <div class="cmd">
      <div :key="cmdIndex" v-for="(cmd, cmdIndex) in cmdList">{{cmd}}</div>
    </div>
    <v-table :data-source="tableData" />
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import VTable from './components/v-table'
import sleep from '../../utils/sleep-promise'

export default {
  name: 'app',
  data () {
    return {
      cmdList: [],
      tableData: [],
      rowNum: 100,
      colNum: 100
    }
  },
  watch: {
    rowNum () {
      this.rowNumOnChangeDebounce()
    },
    colNum () {
      this.colNumOnChangeDebounce()
    }
  },
  methods: {
    cmdListPush (cmd) {
      this.cmdList.push(cmd)
      this.cmdList = this.cmdList
    },
    rowNumOnChangeDebounce: localStorage
      ? debounce(function () {
        localStorage.setItem('rowNum', this.rowNum)
      }, 100)
      : () => false,
    colNumOnChangeDebounce: localStorage
      ? debounce(function () {
        localStorage.setItem('colNum', this.colNum)
      }, 100)
      : () => false,
    handleOnLoadSyncClick () {
      (async () => {
        const startTime = Date.now()
        this.cmdList = []
        this.cmdListPush('clear data')
        this.tableData = []
        await sleep(100)
        console.log('start loading')
        this.cmdListPush('loading')
        this.cmdList = this.cmdList
        const tableData = []
        await sleep(0)
        for (let key = 0; key < this.rowNum; key++) {
          tableData.push(Array.from({ length: this.colNum }).map((e, i) => `${key},${i}`))
        }
        setTimeout(() => {
          const t = Date.now() - startTime
          console.log(`${t}ms`)
          console.log('loaded')
          this.cmdListPush(`${t}ms`)
          this.cmdList = this.cmdList
          this.cmdListPush('loaded')
          this.cmdList = this.cmdList
        }, 0)
        this.tableData = tableData
      })()
    },
    handleOnLoadAsyncClick () {
      (async () => {
        const startTime = Date.now()
        this.cmdList = []
        this.cmdListPush('clear data')
        this.tableData = []
        await sleep(100)
        console.log('start loading')
        this.cmdListPush('start loading')
        const tableData = []
        for (let key = 0; key < this.rowNum; key++) {
          tableData.push(Array.from({ length: this.colNum }).map((e, i) => `${key},${i}`))
          await sleep(0)
          this.tableData = tableData
        }
        setTimeout(() => {
          const t = Date.now() - startTime
          console.log(`${t}ms`)
          console.log('loaded')
          this.cmdListPush(`${t}ms`)
          this.cmdListPush('loaded')
        }, 0)
      })()
    },
    handleOnReloadClick () {
      window.location.reload()
    }
  },
  components: {
    'v-table': VTable
  },
  mounted () {
    if (localStorage) {
      const rowNum = localStorage.getItem('rowNum')
      this.rowNum = rowNum !== undefined && rowNum !== null ? rowNum : this.rowNum
      const colNum = localStorage.getItem('colNum')
      this.colNum = colNum !== undefined && colNum !== null ? colNum : this.colNum
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.cmd {
  border: 1px solid #ebedf0;
  border-radius: 2px;
  display: inline-block;
  width: 100%;
  position: relative;
  margin: 16px 0;
  -webkit-transition: all .2s;
  transition: all .2s;
  padding: 8px;
  color: rgba(0, 0, 0, 0.65);
}
</style>
