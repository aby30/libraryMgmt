import React from "react";
import PropTypes from 'prop-types';
import Button from '../button'
import styles from './styles.module.scss';

const Slider = ({
    sliderTitleText = 'Cart',
    sliderItems = [],
    removeFromSlider = () => {},
    borrowBook = () => {},
    hideSlider = () => {},
    hideItemCta = false,
    hideMainCta = false,
    showCustomMsg = '',
}) => {
    return (
        <div className={styles.slider}>
            <div className={styles.slider__title}>
                {sliderTitleText}
                <img src="https://res.cloudinary.com/abyy30/image/upload/v1608744290/cross_vho0yd.svg" onClick={hideSlider} />
            </div>
            <div className={styles.slider__inner}>
                <div>
                    {sliderItems.map(item => 
                        <div className={styles.slider__item} key={item.bookId}>
                            <img src={item.imageUrl} />
                            {!hideItemCta && <div><Button buttonClick={() => removeFromSlider(item)} type='secondary' size='small'>Remove</Button></div>}
                        </div>
                    )}
                </div>
                {showCustomMsg.length > 0 && <div className={`${styles.slider__limitMsg} ${styles.alert}`}>{showCustomMsg}</div>}
                {!hideMainCta && sliderItems.length > 0 && (
                    <div className={styles.slider__actions}>
                        {sliderItems.length === 2 && <div className={styles.slider__limitMsg}>You can borrow max 2 books at a time</div>}
                        <Button buttonClick={() => borrowBook()}>Borrow</Button>
                    </div>
                )}
            </div>
        </div>
    )
};

Slider.propTypes = {
    sliderTitleText: PropTypes.string,
    removeFromSlider: PropTypes.func,
    borrowBook: PropTypes.func,
    hideSlider: PropTypes.func,
    hideItemCta: PropTypes.bool,
    hideMainCta: PropTypes.bool,
    showCustomMsg: PropTypes.string,
    sliderItems: PropTypes.array,
};

export default Slider