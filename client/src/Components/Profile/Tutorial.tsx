import React, {useLayoutEffect, useRef, useState} from 'react';
import {MaybeNull} from "../../helpers/productTypes";

const Tutorial = () => {
    const ref = useRef<MaybeNull<HTMLDivElement>>(null);
    const [width, setWidth] = useState<MaybeNull<number>>(0);

    useLayoutEffect(() => {
        if (ref.current) {
            const w:number = ref.current.offsetWidth;
            const h:number = ref.current.offsetHeight;
            const maxWidth = Math.min((w-100),(16/9*h-150));
            setWidth(maxWidth)
        }
    }, []);
    return (
        <div style={{height: '100%'}}>
            <h1>Tutorial</h1>
            <div ref={ref} style={{height: '100%'}}>
                <iframe src="https://www.youtube.com/embed/5vztBTlkKIE?si=fcAn3go7pkIvze8A"
                        title="Milino Tutorial" frameBorder="0"
                        style={{aspectRatio: '16/9', width: '100%', maxWidth: `${width}px`}}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
            </div>
        </div>
    );
};

export default Tutorial;