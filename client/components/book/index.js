import React from "react";
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import Button from '../button';

const BookComp = ({
    bookDetails = {},
    addToCart = () => {},
    removeFromCart = () => {},
}) => {
    return (
        <div className={styles.book}>
            <div className={styles.book__inner}>
                <img src={bookDetails.imageUrl} />
                <div className={styles.book__actionWrap}>
                    {bookDetails.isSelected === 1 ? (
                        <Button buttonClick={() => removeFromCart(bookDetails)}>Remove</Button>
                    ) : 
                        <Button buttonClick={() => addToCart(bookDetails)}>Add to cart</Button>   
                    }
                </div>
                {bookDetails.isSelected === 1 && (
                    <div className={styles.book__selected}>
                        <img src="https://res.cloudinary.com/abyy30/image/upload/v1608320518/Tick-circle_r3tqlo.png" />
                    </div>
                )}
            </div>
        </div>
    )
};

BookComp.propTypes = {
    bookDetails: PropTypes.object,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
};


export default BookComp