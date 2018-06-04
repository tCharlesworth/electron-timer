import React from 'react';

const TimerCard = ({title, totalTime, startedAt, onAction}) => {
    let actionTitle = startedAt ? 'Stop' : 'Start';
    return (
        <div className="ui fluid card">
            <div className="content">
                <div className="header">{title}</div>
                <div className="ui statistic">
                    <div className="value">{totalTime || "0"}</div>
                </div>
                <div className="ui bottom attached button" onClick={()=>{onAction(title)}}>{actionTitle}</div>
            </div>
        </div>
    );
};

export { TimerCard };