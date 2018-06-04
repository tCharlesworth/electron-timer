import React from 'react';

const TextField = function({title, placeholder, value, onChange, disabled}) {
    return (
        <div className="ui form">
            <div style={styles.container} className="field">
                <label style={styles.label}>{title}</label>
                <input disabled={disabled} style={styles.input} type="text" placeholder={placeholder} value={value} onChange={onChange} />
            </div>
        </div>
    );
}

const styles = {
    container: {
        width: '100%'
    },
    input: {
        border: 'none',
        borderBottom: 'thin solid #9e9e9e',
        outline: 'none',
        height: '2rem',
        width: '100%',
        margin: '0px 0px 8px 0px',
        lineHeight: 1.15,
        padding: 0,
        borderRadius: 0
    },
    label: {
        marginLeft: '.75 rem',
        fontSize: '1 rem'
    }
}
export { TextField };