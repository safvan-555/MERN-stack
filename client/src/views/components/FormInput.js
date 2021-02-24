import React from 'react';

const FormInput = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    children,
    label,
    ...props
}) => {

    return (
        <React.Fragment>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={className}
                class="form-control"
                style={error && { border: 'solid 1px red' }}
            />
        </React.Fragment>
    )
}

FormInput.defaultProps = {
    type: "text",
    className: ""
}

export default FormInput;

