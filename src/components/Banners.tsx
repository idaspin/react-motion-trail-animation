import styles from "@/styles/Banners.module.scss";
import { MouseEvent, useRef } from "react";
import { Root } from 'react-dom/client';

export default function Banners() {

    const [ width, height ] = [ 267, 150 ];

    const images = [
        "/images/banners/1.jpg",
        "/images/banners/2.jpg",
        "/images/banners/3.jpg",
        "/images/banners/4.jpg",
        "/images/banners/5.jpg",
        "/images/banners/6.jpg",
        "/images/banners/7.jpg",
        "/images/banners/8.jpg",
        "/images/banners/9.jpg"
    ];

    const container = useRef<HTMLDivElement>(null);
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

        const image = document.createElement("img");

        image.classList.add(styles.banners__img);
        image.src = `${images[last_i]}`;
        image.width = width;
        image.height = height;
        image.style.width = `${width}px`;
        image.style.height = `${height}px`;
        image.style.top = `${y - height/2}px`;
        image.style.left = `${x- width/2}px`;

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

    return ( <div className={styles.banners} ref={container} onMouseMove={manageMouseMove} /> );
}