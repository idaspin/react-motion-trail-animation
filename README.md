# Motion Trail Animation Component for React

A library to make animations where images are shown along the path of the user motion.

Inspired by *Manoela Ilic in Playground on October 18, 2023*
[![Ideas for Image Motion Trail Animations](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2023/10/classic.2023-10-18-11_16_37-1.gif?x45784)](https://tympanus.net/codrops/2023/10/18/ideas-for-image-motion-trail-animations/)

### Installation

Install the base package

```sh
npm install --save react-motion-trail-animation
```

### Example

```tsx
import React from "react"
import { MotionTrailAnimation } from "react-motion-trail-animation"

function App() {
    return (
        <main>
            <header />
            { loading ? 
                    <LoadingOverlay />
                : 
                    <Component {...pageProps} />
            }
            <MotionTrailAnimation
                imageHeight={255}
                imageWidth={150}
                imagesSet={[
                    "/images/banners/31.jpg",
                    "/images/banners/32.jpg",
                    "/images/banners/33.jpg",
                    "/images/banners/34.jpg",
                    "/images/banners/35.jpg",
                    "/images/banners/36.jpg",
                    "/images/banners/37.jpg",
                    "/images/banners/38.jpg",
                    "/images/banners/39.jpg",
                    "/images/banners/40.jpg"
                ]}
                canvasRef={useRef<HTMLDivElement>(null)}
            />
        </main>
    );
}
```

## Result

Prepare a background, a list of images and place it under page content.

![Motion Trail Animations](./assets/result.gif)

## Problems

- Developed for private use. I wanted to get rid of unnecessary code (gsap, etc.), so there were no local problems in the project. However, when loading the component as a module, an error occurs that complains about useRef. A temporary fix is to transmit it from outside.
