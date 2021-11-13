import React from 'react';


function Button({onClick,children,id, name}) {


    return (

                <button className={id === name  ? "underline" : ""}
                        type="button" onClick={onClick}>
                {children}
                </button>
    );
}

export default Button;