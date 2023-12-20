import { RefObject } from "react";

export type MotionTrailAnimationProps = {
    imagesSet: string[];
    imageWidth: number;
    imageHeight: number;
    canvasRef: RefObject<HTMLDivElement>;
}