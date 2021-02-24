
import React from 'react';
import './index.css'
const Widget = ({ children, style }) => (
    <div style={style} className='Wideget'>
        {children}
    </div>
);
export default Widget;