import React from 'react';

const Button = function({title, onClick, type}) {
    return (<button style={styles} onClick={onClick} type={type} className="ui button basic">{title}</button>);
}

const styles = {
    width: '100%'
}

export { Button };