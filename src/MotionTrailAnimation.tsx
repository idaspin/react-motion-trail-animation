'use client'
import React, { MouseEvent, RefObject } from "react";
import { Root, createRoot } from "react-dom/client";
import { MotionTrailAnimationProps } from "./types";

export default function MotionTrailAnimation(props: MotionTrailAnimationProps) {

    const [ width, height ] = !props.imageWidth || !props.imageHeight ? [ 150, 225 ] : [ props.imageWidth, props.imageHeight ];

    const images = props.imagesSet ?? [];

    const container: RefObject<HTMLDivElement> = props.canvasRef;
    let root: Root | undefined;
    
    let [ last_i, last_x, last_y, last_time ] = [ 0, 0, 0, Date.now() ];

    const manageMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!container.current ) return;
        const { clientX, clientY } = event;
        const containerPosition = container.current.getBoundingClientRect();
        const x = clientX - containerPosition.x;
        const y = clientY - containerPosition.y;
        if (last_x == 0 && last_y == 0) [ last_x, last_y ] = [ x, y ];
        if ((Math.abs(last_x - x) < 100) && (Math.abs(last_y - y) < 100) || (Date.now() - last_time < 50)) return;
        if (Math.abs(last_x - x) < 200 && Math.abs(last_y - y) < 200) draw(x, y);
        [ last_x, last_y, last_time ] = [ x, y, Date.now() ];
    }
    
    const draw = (x: number, y: number) => {
        if (!container.current) return;
        if (!root) root = createRoot(container.current);

        const image = document.createElement("img");

        image.src = `${images[last_i]}`;
        image.width = width;
        image.height = height;
        image.style.cssText = `position: fixed; background-size: cover; border-radius: 7px; opacity: 0; width: ${width}px; height: ${height}px; top: ${y - height/2}px; left: ${x- width/2}px;`;

        container.current.append(image);

        const keyFrames = (oX: number, oY: number, nX: number, nY: number): Keyframe[] => [
            { transform: "scale(0)", "opacity": 0, "translate": `0px 0px` },
            { transform: "scale(0.5)", "opacity": 0.8 },
            { transform: "scale(1)", "opacity": 0.8 },
            { transform: "scale(1.1)", "opacity": 0.8 },
            { transform: "scale(1.2)", "opacity": 0, "translate": `${(oX - (oX + nX)/2) * -1.5}px ${(oY - (oY + nY)/2) * -1.5}px` },
        ];
        image.animate(keyFrames(last_x, last_y, x, y), { duration: 600, iterations: 1 });

        last_i = last_i < images.length - 1 ? last_i + 1 : 0;
    
        if (container.current.childNodes.length > images.length) {
            erase();
        } else{
            setTimeout(erase, 800);
        }
    }
  
    const erase = () => {
        if (container.current) container.current.removeChild(container.current.childNodes[0]);
    }

    return ( 
        <div    style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vw",
                    top: 0,
                    left: 0
                }} 
                ref={container} 
                onMouseMove={manageMouseMove} 
        />
    );
}