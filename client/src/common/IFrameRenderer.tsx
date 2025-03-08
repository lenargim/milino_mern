import {FC, RefObject} from "react";

export const IFrameRenderer: FC<{
    src: string;
    iframeRef?: RefObject<HTMLIFrameElement>;
}> = ({ src, iframeRef }): JSX.Element => {
    return (
        <iframe
            ref={iframeRef}
            src={src}
            title="iframe-preview"
            style={{width: '100%', height: '100%',padding:0,margin:0}}
        ></iframe>
    );
};