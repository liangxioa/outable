<template>
  <div class="formula-bar">
    <div class="bar-label">{{ activeCellName || '' }}</div>
    <input class="formula-input" type="text" placeholder="请输入">
  </div>
  <main class="main">
    <canvas id="table"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
            @dblclick="onDbClick"></canvas>
    <input class="table-input" type="text" autofocus v-show="tableInput.status"
           :style="{
      top:tableInput.y,
      left:tableInput.x,
      width: tableInput.w,
      height: tableInput.h
    }">
  </main>
</template>

<script>
import {
  drawCell,
  cellWidth,
  cellHeight,
  rowIndexWidth,
  drawRowIndex,
  drawColIndex,
  drawCellContainer,
  getCellByPosition, createCellPos
} from "../utils/canvas";

export default {
  name: "Table",
  data: () => ({
    rowLength: 40,
    colLength: 100,
    ratio: 1,
    isMouseDown: false,
    mouse: {
      start: {},
      end: {}
    },
    activeCell: null,
    tableInput: {
      status: false,
      x: 0,
      y: 0,
      w: '100px',
      h: '100px',
    },
    tableData: {
      'E9': '123'
    }
  }),
  mounted() {
    this.init();
  },
  computed: {
    $table() {
      return document.getElementById('table');
    },
    $canvas() {
      return this.$table.getContext("2d");
    },
    $canvasWidth() {
      return (this.colLength + 1) * cellWidth;
    },
    $canvasHeight() {
      return (this.rowLength + 1) * cellHeight;
    },
    activeCellName() {
      if (!this.activeCell) return '';
      return createCellPos(this.activeCell.col) + (this.activeCell.row);
    }
  },
  methods: {
    init() {
      this.initScale();
      drawColIndex(this.$canvas, this.ratio, this.colLength);
      drawRowIndex(this.$canvas, this.ratio, this.rowLength);
      drawCell(this.$canvas, this.ratio, this.colLength, this.rowLength);
    },
    // 初始化canvas比例
    initScale() {
      const backingStore = this.$canvas.backingStorePixelRatio ||
          this.$canvas.webkitBackingStorePixelRatio ||
          this.$canvas.mozBackingStorePixelRatio ||
          this.$canvas.msBackingStorePixelRatio ||
          this.$canvas.oBackingStorePixelRatio ||
          this.$canvas.backingStorePixelRatio || 1;
      this.ratio = (window.devicePixelRatio || 1) / backingStore;

      this.$table.width = this.$canvasWidth;
      this.$table.height = this.$canvasHeight;
    },
    onMouseDown(e) {
      this.tableInput = {
        status: false,
        x: 0,
        y: 0,
        w: 0,
        h: 0
      }
      this.isMouseDown = true;
      this.mouse.start = e;
      this.activeCell = getCellByPosition(e.offsetX, e.offsetY);
    },
    onMouseMove(e) {
      if (this.isMouseDown) {
        this.mouse.end = e;
        drawCellContainer(this.$table, this.$canvas, this.mouse, this.ratio);
      }
    },
    onMouseUp(e) {
      this.mouse.end = e;
      drawCellContainer(this.$table, this.$canvas, this.mouse, this.ratio);
      this.isMouseDown = false;
    },
    onDbClick(e) {
      const currentCell = getCellByPosition(e.offsetX, e.offsetY);

      this.tableInput = {
        status: true,
        x: (currentCell.col * cellWidth + rowIndexWidth) + 'px',
        y: (currentCell.row * cellHeight) + 'px',
        w: cellWidth + 'px',
        h: cellHeight + 'px'
      }
    }
  }
}
</script>

<style scoped lang="less">
@formula-bar-height: 25px;

.formula-bar {
  width: 100%;
  height: @formula-bar-height;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e2e4;

  .bar-label {
    display: inline-block;
    width: 50.5px;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid #e0e2e4;
    text-align: center;
    background-color: #fff;
    color: #777;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 4px;
    font-size: 14px;
    line-height: @formula-bar-height;
  }

  .formula-input {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 4px;
    font-size: 14px;
    line-height: 14px;
  }
}

.main {
  width: 100%;
  flex: 1;
  overflow: auto;
  position: relative;

  .table {
    width: 100%;
    height: 100%;
  }

  .table-input {
    position: absolute;
    border: none;
    outline: none;
    background: transparent;
    padding: 0 4px;
    box-sizing: border-box;
  }
}
</style>
