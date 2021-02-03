'use strict';

function drawAllBars(ctx, data, barWidth, height) {
    ctx.save();
    const casesPerPixel = Math.max(...data) / (0.9 * height);
    ctx.translate(0, height);
    ctx.fillStyle = 'red';
    for (let i = 0, x = 0; i < data.length; i++, x += barWidth + 1) {
        const bar = Math.floor(data[i] / casesPerPixel);
        ctx.fillRect(x, -bar, barWidth, bar);
    }
    ctx.restore();
}  


function drawCurve(ctx, data, lineSegmentLength, height) {
    ctx.save();
    const casesPerPixel = Math.max(...data) / (0.9 * height);
    ctx.translate(0, height);
    ctx.scale(1, -1);
    ctx.moveTo(0, 0);
    ctx.strokeStyle = 'black';
    for (let i = 0, x = lineSegmentLength; i < data.length; i++, x += lineSegmentLength) {
        ctx.lineTo(x, Math.floor(data[i] / casesPerPixel));
    }
    ctx.stroke();
    ctx.restore();
}