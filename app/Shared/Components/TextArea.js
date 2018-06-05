import React from 'react';

const TextArea = function({title, placeholder, value, onChange}) {
    return (
        <div className="ui form">
            <div className="field" style={{width: '100%'}} >
                <label>{title}</label>
                <textarea placeholder={placeholder} value={value} onChange={onChange} rows={4}></textarea>
            </div>
        </div>
    );
}

export { TextArea };