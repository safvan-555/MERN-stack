import React from 'react';

import classNames from 'classnames'

function Button(props) {
    const btnClass = classNames('Button', props.btnType, 'marg')
    return <button
        className={btnClass}
        onClick={props.onClick}
    >
        {props.label}
    </button>
}
export default Button;