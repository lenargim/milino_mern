import React, {FC, useEffect, useRef} from 'react';

declare global {
    interface Window {
        prodboard: any;
    }
}

const Iframe: FC<{ customer_token:string }> = ({customer_token}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const boardRef = useRef<any>(null);

    useEffect(() => {
        const initProdboard = () => {
            if (!containerRef.current) return;

            const board = window.prodboard(containerRef.current, {
                company: 'milino',
                instance: process.env.REACT_APP_CONSTRUCTOR_INSTANCE,
                environment: process.env.REACT_APP_CONSTRUCTOR_URL,
            });

            boardRef.current = board;

            board.onInitCompleted(() => {
                board.signIn(customer_token);
            });
        };

        if (window.prodboard) {
            initProdboard();
            return;
        }

        const script = document.createElement('script');
        script.src = '/prodboard.js';

        script.onload = initProdboard;

        document.body.appendChild(script);

        return () => {
            boardRef.current?.signOut();
        };
    }, [customer_token]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default Iframe;