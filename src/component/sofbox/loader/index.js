import React, { useEffect } from 'react';

const Index = () => {

    useEffect(() => {
        window.$('#loading').delay(1000).fadeOut('slow');
    })
    return (
        <div id="loading">
            <div id="loading-center">
                <div className="loader">
                    <div className="cube">
                        <div className="sides">
                            <div className="top"/>
                            <div className="right"/>
                            <div className="bottom"/>
                            <div className="left"/>
                            <div className="front"/>
                            <div className="back"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
