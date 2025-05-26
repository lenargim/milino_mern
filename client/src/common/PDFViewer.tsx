import React, {FC, useLayoutEffect, useRef, useState} from 'react';
import {MaybeNull} from "../helpers/productTypes";

const MyPDFViewer: FC<{ link: string }> = ({link}) => {
    const ref = useRef<MaybeNull<HTMLDivElement>>(null);
    const [maxWidth, setMaxWidth] = useState<MaybeNull<number>>(0);

    useLayoutEffect(() => {
        if (ref.current) {
            const w: number = ref.current.offsetWidth;
            const h: number = ref.current.offsetHeight;
            const maxWidth = Math.min((w - 100), (16 / 9 * h - 150));
            setMaxWidth(maxWidth)
        }
    }, []);
    return (
        <div ref={ref} style={{maxHeight: '80vh', height: '100%'}}>
        <iframe src={link}
                style={{aspectRatio: '16/9', width: '100%', maxWidth: `${maxWidth}px`}}
                frameBorder="0"/>
        </div>
    )
};

export default MyPDFViewer;