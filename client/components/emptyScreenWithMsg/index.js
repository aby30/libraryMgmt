import React from "react";
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const EmptyScreenWithMsg = ({
    textToShow = 'No results found',
}) => {
    return (
        <div className={styles.noResult}>
            <div className={styles.noResult__inner}>
                {textToShow}
            </div>
        </div>
    )
};

EmptyScreenWithMsg.propTypes = {
    textToShow: PropTypes.string,
};

export default EmptyScreenWithMsg