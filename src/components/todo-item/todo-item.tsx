import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import "./todo.scss";
import { ITodoItem } from "components/todo-list/todo-list";

const CANVAS_HEIGHT = 40;
const CANVAS_WIDTH = 200;

interface IProps {
  todo: ITodoItem;
  setTodo: (todo: ITodoItem) => void;
}

export const ToDoItem = ({ todo, setTodo }: IProps) => {
  const canvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lineHistory, setLineHistory] = useState<{ x: number; y: number }[]>(
    []
  );

  const [canvas, setCanvas] = useState(null);
  const [canvasCtx, setCanvasCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.height = CANVAS_HEIGHT;
    canvas.width = CANVAS_WIDTH;

    setCanvas(canvas);
    setCanvasCtx(ctx);
  }, []);

  useEffect(() => {
    if (!canvasCtx) {
      return;
    }

    if (todo._data.length) {
      todo._data.forEach((dot: { x: number; y: number }) =>
        canvasCtx.lineTo(dot.x, dot.y)
      );
      canvasCtx.stroke();
    }

    canvasCtx.fillStyle = "black";
    canvasCtx.font = "18px Arial";
    // ctx.textAlign = "center";
    canvasCtx.fillText(todo.text, 20, 25);
  }, [canvasCtx]);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    canvas.addEventListener("mousemove", draw);
    return () => {
      canvas.removeEventListener("mousemove", draw);
    };
  }, [canvas, isDrawing]);

  const startDrawing = (
    event:
      | React.MouseEvent<HTMLCanvasElement, MouseEvent>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    canvasCtx.beginPath();
    countPixels();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing || !canvasCtx) {
      return;
    }

    canvasCtx.lineWidth = 5;
    canvasCtx.lineCap = "round";
    canvasCtx.strokeStyle = "rgba(0, 0, 155, 0.1)";
    canvasCtx.globalAlpha = 0.2;

    const mousePosition = getMousePosition(e);

    setLineHistory((lineHistory) => [
      ...lineHistory,
      { x: mousePosition.x, y: mousePosition.y },
    ]);

    canvasCtx.lineTo(mousePosition.x, mousePosition.y);
    canvasCtx.stroke();
  };

  const getMousePosition = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const countPixels = () => {
    let count = 0;
    const imageData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height)
      .data;
    for (let i = 0, y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++, i += 4) {
        if (imageData[i + 3]) {
          count++;
        }
      }
    }

    const allPixels = CANVAS_HEIGHT * CANVAS_WIDTH;
    console.log(count);
    if (count > allPixels * 0.3) {
      setTodo({ ...todo, isCompleted: true, _data: lineHistory });
    }
  };

  return (
    <div className="todo-item">
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => startDrawing(e)}
        onMouseUp={stopDrawing}
        onTouchStart={(e) => startDrawing(e)}
        onTouchEnd={stopDrawing}
        className={classNames("todo-item__canvas", {
          [`todo-item__canvas--${
            todo.isCompleted ? "completed" : "not-completed"
          }`]: true,
        })}
      ></canvas>
    </div>
  );
};
