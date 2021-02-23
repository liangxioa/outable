export const cellWidth = 106;
export const cellHeight = 24;
export const rowIndexWidth = 50;
export const colIndexList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// 绘制单元格
export function drawCell(ctx, ratio, colLength, rowLength) {
    ctx.strokeStyle = "#e2e4e8";
    ctx.lineWidth = 0.5;

    for (let col = 0; col < colLength; col++) {
        for (let row = 1; row < rowLength; row++) {
            let x = (col * cellWidth + rowIndexWidth + 0.5) * ratio,
                y = (row * cellHeight + 0.5) * ratio,
                w = cellWidth * ratio,
                h = cellHeight * ratio;
            ctx.strokeRect(x, y, w, h);
        }
    }
}

// 绘制行索引
export function drawRowIndex(ctx, ratio, rowLength) {
    ctx.strokeStyle = "#e2e4e8";
    ctx.lineWidth = 0.5;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#777777";

    for (let row = 1; row < rowLength; row++) {
        let x = 0.5 * ratio,
            y = row * cellHeight + 0.5;
        ctx.strokeRect(x, y, rowIndexWidth, cellHeight);
        if (row > 0) {
            ctx.fillText(row + '', x + 12, y + (cellHeight / 2));
        }
    }
}

// 绘制列索引
export function drawColIndex(ctx, ratio, colLength) {
    ctx.strokeStyle = "#e2e4e8";
    ctx.lineWidth = 0.5;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#777777";

    for (let col = 0; col < colLength; col++) {
        let x = col * cellWidth + rowIndexWidth + 0.5,
            y = 0.5;
        ctx.strokeRect(x, y, cellWidth, cellHeight);
        ctx.fillText(createCellPos(col), x + (cellWidth / 2), cellHeight / 2);
    }
}

// 将数字转为类似excel的'AA'类型
export function createCellPos(n) {
    let ordA = 'A'.charCodeAt(0),
        ordZ = 'Z'.charCodeAt(0),
        len = ordZ - ordA + 1,
        s = "";
    while (n >= 0) {
        s = String.fromCharCode(n % len + ordA) + s;
        n = Math.floor(n / len) - 1;
    }
    return s;
}

// 绘制单元格选中区域
let drawCellImageData = null;

export function drawCellContainer(dom, ctx, mouse, ratio) {
    if (!drawCellImageData) {
        drawCellImageData = ctx.getImageData(0, 0, dom.width, dom.height);
    } else {
        ctx.putImageData(drawCellImageData, 0, 0);
    }
    let startCell = getCellByPosition(mouse.start.offsetX, mouse.start.offsetY),
        endCell = getCellByPosition(mouse.end.offsetX, mouse.end.offsetY),
        minCell = {
            row: startCell.row > endCell.row ? endCell.row : startCell.row,
            col: startCell.col > endCell.col ? endCell.col : startCell.col,
        }, maxCell = {
            row: (startCell.row > endCell.row ? startCell.row : endCell.row) + 1,
            col: (startCell.col > endCell.col ? startCell.col : endCell.col) + 1,
        };
    minCell.row = minCell.row || 1;
    maxCell.row = maxCell.row || 1;

    ctx.globalCompositeOperation = "cell-container";
    ctx.strokeStyle = "#4b8cff";
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(75,140,255,0.1)";

    let x = (minCell.col * cellWidth + rowIndexWidth + 0.5) * ratio,
        y = (minCell.row * cellHeight + 0.5) * ratio,
        w = cellWidth * ((maxCell.col - minCell.col) || 1) * ratio,
        h = cellHeight * ((maxCell.row - minCell.row) || 1) * ratio;

    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, w, h);
}

// 根据坐标确定单元格
export function getCellByPosition(x, y) {
    return {
        row: parseInt(y / cellHeight),
        col: parseInt((x - rowIndexWidth) / cellWidth)
    }
}
