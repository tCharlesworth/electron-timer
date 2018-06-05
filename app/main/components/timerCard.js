import React from 'react';
import moment from 'moment';
import { TextArea } from '../../Shared/Components';

const TimerCard = ({title, totalTime, startedAt, onAction, onCommentChange, commentValue}) => {
    let actionTitle = startedAt ? 'Stop' : 'Start';
    return (
        <div className="ui fluid card">
            <div className="content">
                <div className="header">{title}</div>
                <div className="ui statistic">
                    <div className="value">{MinutesToTime(totalTime)}</div>
                </div>
                <TextArea title="Comments" onChange={onCommentChange} value={commentValue}/>
                <br/>
                <div className="ui bottom attached button" onClick={()=>{onAction(title)}}>{actionTitle}</div>
            </div>
        </div>
    );
};

const MinutesToTime = (minutes) => {
    let hours = minutes / 60 | 0;
    minutes = minutes % 60 | 0;
    return moment.utc().hours(hours).minutes(minutes).format("HH:mm");
};

export { TimerCard };