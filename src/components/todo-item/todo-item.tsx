import classNames from 'classnames';
import { ITodoItem } from 'components/todo-list/todo-list';
import React, { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';

import './todo-item.scss';

const xmlns = 'http://www.w3.org/2000/svg';

interface IProps {
    item: ITodoItem;
    setItem: (todo: ITodoItem) => void;
}

export const TodoItem: React.FC<IProps> = ({ item, setItem }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    const [currentElement, setCurrentElement] = useState<SVGElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        if (item._data.length && svgRef.current) {
            console.log(item._data);
            item._data.forEach((pathD) => {
                const el = createElement('path', {
                    'stroke-width': 1,
                    stroke: '#000',
                    fill: 'none',
                    d: pathD,
                });

                svgRef.current.appendChild(el);
                el.parentNode.appendChild(el);
            });
        }
    }, []);

    useEffect(() => {
        if (isDrawing) {
            svgRef.current.addEventListener('mousemove', move);
            svgRef.current.addEventListener('touchmove', move);
        }

        return () => {
            if (isDrawing) {
                svgRef.current.removeEventListener('mousemove', move);
                svgRef.current.removeEventListener('touchmove', move);
            }
        };
    }, [isDrawing]);

    const cursorPoint = (e: MouseEvent | TouchEvent) => {
        const point = svgRef.current.createSVGPoint();
        if (e instanceof MouseEvent) {
            point.x = e.clientX;
            point.y = e.clientY;
        } else {
            point.x = e.touches[0].clientX;
            point.y = e.touches[0].clientY;
        }

        return point.matrixTransform(svgRef.current.getScreenCTM().inverse());
    };

    const createElement = (element: string, properties: any) => {
        var el = document.createElementNS(xmlns, element);
        if (properties) {
            for (var attr in properties) {
                el.setAttribute(attr, properties[attr]);
            }
        }
        return el;
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
        const startPoint = cursorPoint(e);

        const el = createElement('path', {
            'stroke-width': 1,
            stroke: '#000',
            fill: 'none',
            d: `M${startPoint.x} ${startPoint.y} `,
        });
        svgRef.current.appendChild(el);
        el.parentNode.appendChild(el);

        setCurrentElement(el);

        setIsDrawing(true);
    };

    const stopDrawing = () => {
        if (isDrawing) {
            setHistory((history) => [...history, currentElement.getAttribute('d')]);
            countPixels();
            setIsDrawing(false);
        }
    };

    const move = (e: MouseEvent | TouchEvent) => {
        const current = cursorPoint(e);
        let d = currentElement.getAttribute('d');
        currentElement.setAttribute('d', (d += current.x + ',' + current.y + ' '));
    };

    const countPixels = () => {
        const { width, height } = svgRef.current.getBoundingClientRect();

        let clonedSvgElement = svgRef.current.cloneNode(true);
        let outerHTML = (clonedSvgElement as Element).outerHTML;
        let blob = new Blob([outerHTML], { type: 'image/svg+xml;charset=utf-8' });
        let blobURL = URL.createObjectURL(blob);
        let image = new Image();
        image.src = blobURL;

        image.onload = () => {
            let canvas = document.createElement('canvas');

            canvas.width = width;

            canvas.height = height;
            let context = canvas.getContext('2d');
            // draw image in canvas starting left-0 , top - 0
            context.drawImage(image, 0, 0, width, height);

            let count = 0;
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
            for (let i = 0, y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++, i += 4) {
                    if (imageData[i + 3]) {
                        count++;
                    }
                }
            }

            const allPixels = width * height;
            console.log(count, allPixels);
            if (count > allPixels * 0.1) {
                setItem({
                    ...item,
                    isCompleted: true,
                    _data: [...item._data, ...history],
                });
            }
        };
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            ref={svgRef}
            onMouseDown={(e) => startDrawing(e.nativeEvent)}
            onTouchStart={(e) => startDrawing(e.nativeEvent)}
            onTouchEnd={stopDrawing}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className={classNames('todo-item', {
                [`todo-item--${item.isCompleted ? 'completed' : 'not-completed'}`]: true,
            })}
        >
            <text x="20" y="35" className="todo-item__text">
                {item.text}
            </text>
        </svg>
    );
};
