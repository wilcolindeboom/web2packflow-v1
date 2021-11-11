import React from 'react';


function Button({onClick,children,id}) {


    return (

                <button className={id === children.toLowerCase()  ? "underline" : ""}
                        type="button" onClick={onClick}>
                {children}
                </button>
    );
}

export default Button;