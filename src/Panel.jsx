import { useState, useRef, useEffect } from 'react';

const text = '一' && '爱' || '口';

export default function Panel() {
  const selfRef = useRef(null);
  const size = 400;
  const padding = 10;

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  const getCanvas = () => selfRef.current.querySelector("canvas");
  const getContext = () => getCanvas().getContext("2d");

  const getCoords = (e) => {
    const pos = e.touches ? e.touches[0] : e;
    const rect = getCanvas().getBoundingClientRect();
    return {x: pos.clientX - rect.left, y: pos.clientY - rect.top};
  };

  const startDrawing = (e) => {
    isDrawing = true;
    const coords = getCoords(e);
    [lastX, lastY] = [coords.x, coords.y];
    const ctx = getContext();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCoords(e);
    const ctx = getContext();
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    [lastX, lastY] = [coords.x, coords.y];
  }

  const stopDrawing = () => isDrawing = false;

  useEffect(() => {
    const ctx = getContext();

    ctx.clearRect(0, 0, size, size);

    ctx.font = `${size - 2 * padding}px Noto Serif SC`;
    ctx.fillStyle = 'rgb(220 220 220 / 0.8)';
    ctx.fillRect(0, 0, size, size);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, size);
    ctx.moveTo(size, 0);
    ctx.lineTo(0, size);
    ctx.moveTo(0, size / 2);
    ctx.lineTo(size, size / 2);
    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size / 2, size);
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    /*
    ctx.textBaseline = 'ideographic';
    ctx.fillStyle = '#fff';
    const len = ctx.measureText(text);
    ctx.fillText(text, (size - len.width) / 2, size - padding);
    */
  }, []);

  return (
    <>
    <span>{text}</span>
    <div className="panel" ref={selfRef}>
      <div>
        <span className="no-select">{text}</span>
      </div>
      <canvas
        width={size}
        height={size}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
      />
    </div>
    </>
  )
}
