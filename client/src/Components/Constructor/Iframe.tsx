import React, {
    FC,
    useEffect,
    useRef,
    useState
} from 'react';

import s from './styles.module.sass';

declare global {
    interface Window {
        prodboard: any;
    }
}

interface IframeProps {
    customer_token: string;
}

const Iframe: FC<IframeProps> = ({customer_token}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const boardRef = useRef<any>(null);
    const isInitializedRef = useRef(false);
    const isUnmountedRef = useRef(false);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = async () => {
        if (!wrapperRef.current) return;

        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await wrapperRef.current.requestFullscreen();
            }
        } catch (error) {
            console.error('Fullscreen error:', error);
        }
    };

    // Prodboard
    useEffect(() => {
        isUnmountedRef.current = false;
        isInitializedRef.current = false;

        const initProdboard = () => {
            if (
                isUnmountedRef.current ||
                !containerRef.current ||
                !window.prodboard ||
                boardRef.current
            ) {
                return;
            }

            const board = window.prodboard(
                containerRef.current,
                {
                    company:
                    process.env.REACT_APP_CONSTRUCTOR_PRODBOARD_COMPANY,
                    instance:
                    process.env.REACT_APP_CONSTRUCTOR_INSTANCE,
                    host:
                    process.env.REACT_APP_CONSTRUCTOR_HOST,
                    environment:
                    process.env.REACT_APP_CONSTRUCTOR_URL,
                }
            );

            boardRef.current = board;

            board.onInitCompleted(() => {
                if (isUnmountedRef.current) {
                    return;
                }

                isInitializedRef.current = true;

                board.signIn(customer_token);
            });
        };

        if (window.prodboard) {
            initProdboard();
        } else {
            const script = document.createElement('script');

            script.src = '/prodboard.js';
            script.onload = initProdboard;

            document.body.appendChild(script);
        }

        return () => {
            isUnmountedRef.current = true;

            const board = boardRef.current;

            boardRef.current = null;
            isInitializedRef.current = false;

            if (board) {
                try {
                    board.signOut();
                } catch (error) {
                    console.error(
                        'Prodboard sign-out error:',
                        error
                    );
                }
            }
        };
    }, []);

    // Fullscreen
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(
                document.fullscreenElement === wrapperRef.current
            );
        };

        document.addEventListener(
            'fullscreenchange',
            handleFullscreenChange
        );

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange
            );
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={s.wrapper}
        >
            <button
                type="button"
                onClick={toggleFullscreen}
                className={[
                    s.button,
                    isFullscreen ? s.full : ''
                ].join(' ')}
            />

            <div
                ref={containerRef}
                className={s.container}
            />
        </div>
    );
};

export default Iframe;