import React from 'react';

const Tutorial = () => {
    return (
        <div>
            <h1>Tutorial</h1>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/5vztBTlkKIE?si=fcAn3go7pkIvze8A"
                    title="Milino Tutorial" frameBorder="0"
                    style={{aspectRatio: '16/9', maxWidth: 'calc(100vw - 300px)'}}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
        </div>
    );
};

export default Tutorial;