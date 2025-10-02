import { useState, useRef, useEffect } from 'react';

const size = 300;
const padding = 10;
const opacityLevels = ['opacity-35', 'opacity-10', 'opacity-0'];


function Button({children, onClick, toggled}) {
  const style = toggled ? 'bg-gray-500 text-white' : 'bg-gray-300 text-black';
  return (
    <button
      className={`${style} p-2 cursor-pointer active:bg-gray-400 active:text-white rounded`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}


export function Panel({entry}) {
  const selfRef = useRef(null);
  const [practice, setPractice] = useState(false);
  const [level, setLevel] = useState(0);

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
    // e.preventDefault();
    e.stopPropagation();
    isDrawing = true;
    const coords = getCoords(e);
    [lastX, lastY] = [coords.x, coords.y];
    const ctx = getContext();
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e) => {
    if (!isDrawing) return;
    // e.preventDefault();
    e.stopPropagation();
    const coords = getCoords(e);
    const ctx = getContext();
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    [lastX, lastY] = [coords.x, coords.y];
  };

  const stopDrawing = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    isDrawing = false;
  };

  const reset = (newLevel) => {
    const ctx = getContext();

    ctx.clearRect(0, 0, size, size);

    let [tone, alpha] = [220, 0.8];
    ctx.fillStyle = `rgb(${tone} ${tone} ${tone} / ${alpha.toPrecision(2)})`;
    ctx.fillRect(0, 0, size, size);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.moveTo(0, 0);
    ctx.lineTo(size, size);
    ctx.moveTo(size, 0);
    ctx.lineTo(0, size);
    ctx.moveTo(0, size / 2);
    ctx.lineTo(size, size / 2);
    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size / 2, size);
    ctx.strokeStyle = '#eee';
    ctx.stroke();

    if (newLevel !== undefined) setLevel(newLevel);
  };

  useEffect(() => {
    reset(0);
  }, [entry]);

  return (
    <div className="flex flex-col gap-2 items-center touch-none">
      <div className="grid grid-cols-4 gap-2 text-sm w-[300px]">
        <Button key="clear" onClick={() => reset()}>Clear</Button>
        {opacityLevels.map((v, i) => (
          <Button key={`level-${i}`} onClick={() => reset(i)} toggled={level === i}>
            Level {i+1}
          </Button>
        ))}
      </div>
      <div className="relative h-[300px] w-[300px] touch-none" ref={selfRef}>
        <div className={`${opacityLevels[level]} absolute top-0 left-0 w-full h-full flex items-center justify-center -z-1`}>
          <span className="no-select font-light text-[250px]">{entry.key}</span>
        </div>
        <canvas
          className="absolute top-0 left-0 cursor-pointer touch-none"
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
    </div>
  )
}
