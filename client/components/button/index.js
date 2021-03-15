import React from "react";
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const ButtonComp = ({
    children = 'Button text',
    type = 'primary',
    size = 'medium',
    buttonClick = () => {},
}) => {
    return (
        <button className={`${styles.button} ${styles[type]} ${styles[size]}`} onClick={buttonClick}>
            {children}
        </button>
    )
};

ButtonComp.propTypes = {
    type: PropTypes.string,
    size: PropTypes.string,
    buttonClick: PropTypes.func,
};

export default ButtonComp