import React, { Component } from 'react';
import BookComp from '../../components/book'
import EmptyScreenWithMsg from '../../components/emptyScreenWithMsg';
import Slider from '../../components/Slider';
import styles from './styles.module.scss';

class ListingModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            bookList: [],
            showCart: false,
            showReturn: false,
            userDetails: {
                userId: 808,
                userName: '',
                bookIds: '',
            },
            borrowMsg: '',
            returnMsg: '',
            loadingState: false,
        }
    }

    componentDidMount() {
        this.getBooksList();
        this.getUserDetails();
    }

    getBooksList = () => {
        this.setState({
            loadingState: true,
        })
        const apiUrl = '/api/getBooksList';
        fetch(apiUrl).then(res => res.json())
          .then(response => {
            this.setState({
                bookList: response.data,
                loadingState: false,
            })
          })
    }

    getUserDetails = () => {
        const { userDetails } = this.state;
        const apiUrl = '/api/getUserDetails';

        const fetchData = {
            method: 'POST',
            body: JSON.stringify({userId: userDetails.userId}),
            headers: new Headers()
          }
        fetch(apiUrl, fetchData).then(res => res.json())
          .then(response => {
            this.setState({
                userDetails: response.data,
            })
          })
    }
    
    addToCart = bookDetails => {
        const { bookList, cart } = this.state;
        if (cart.length < 2 && bookDetails.availableQty > 0) {
            if (cart.length === 0 || 
                (cart.length > 0 && 
                    cart.some(bookInCart => bookInCart.bookId !== bookDetails.bookId))) {
                const updatedBookList = bookList.map(book => {
                    if (book.bookId === bookDetails.bookId) {
                        book.isSelected = 1
                    }
                    return book
                })
                this.setState({
                    bookList: updatedBookList,
                    cart: [...cart, bookDetails],
                })
            }
        }
    };

    removeFromCart = bookDetails => {
        const { bookList, cart } = this.state;
        if (cart.length > 0) {
            const updatedBookList = bookList.map(book => {
                if (book.bookId === bookDetails.bookId)
                    book.isSelected = 0
                return book
            })
            const updatedCart = cart.filter(item => item.bookId !== bookDetails.bookId)
            this.setState({
                bookList: updatedBookList,
                cart: updatedCart,
            })
        }
    };

    borrowBook = () => {
        const { cart, userDetails } = this.state;
        const borrowApiUrl = '/api/borrowBooks';
        const fetchData = {
            method: 'PUT',
            body: JSON.stringify({cartData: cart, userId: userDetails.userId}),
            headers: new Headers()
          }
        fetch(borrowApiUrl, fetchData).then(res => res.json())
          .then(response => {
            if (response.maxLimit || response.existInBorrow) {
                this.setState({
                    borrowMsg: response.data,
                })
            } else {
                this.getBooksList();
                this.getUserDetails();
                this.setState({
                    cart: [],
                    borrowMsg: response.data,
                })
            }
          })
    };

    returnBook = (returnBook) => {
        const { cart, userDetails } = this.state;
        const borrowApiUrl = '/api/returnBook';
        if (returnBook.bookId) {
            const fetchData = {
                method: 'PUT',
                body: JSON.stringify({cartData: returnBook, userId: userDetails.userId}),
                headers: new Headers()
              }
            fetch(borrowApiUrl, fetchData).then(res => res.json())
              .then(response => {
                this.getBooksList();
                this.getUserDetails();
                this.setState({
                    returnMsg: response.data,
                })
              })
        }
    };

    toggleCart = () => {
        const { showCart } = this.state;
        this.setState({
            showCart: !showCart,
            borrowMsg: '',
        })
    };

    toggleReturn = () => {
        const { showReturn } = this.state;
        this.setState({
            showReturn: !showReturn,
            returnMsg: '',
        })
    };

    render() {
        const { 
            bookList = [],
            cart = [],
            showCart,
            showReturn,
            userDetails,
            returnMsg,
            borrowMsg,
            loadingState
        } = this.state;

        let userBookIdList = [];
        if (userDetails && userDetails.bookIds.length > 0)
            userBookIdList = userDetails.bookIds.includes(',') ? userDetails.bookIds.split(',') : [userDetails.bookIds];

        const returnItemToShow = (userBookIdList.length > 0 && bookList.length > 0) ? bookList.filter(book => (book.bookId === parseInt(userBookIdList[0]) || book.bookId === parseInt(userBookIdList[1]))) : [];

        return (
            <div className={styles.listing}>
                {showCart && 
                    <Slider 
                        sliderItems={cart}
                        removeFromSlider={this.removeFromCart}
                        borrowBook={this.borrowBook}
                        hideSlider={this.toggleCart}
                        showCustomMsg={borrowMsg} 
                    />
                }
                {showReturn &&
                    <Slider
                        sliderTitleText='Return List'
                        sliderItems={returnItemToShow}
                        removeFromSlider={this.returnBook}
                        borrowBook={this.borrowBook}
                        hideSlider={this.toggleReturn}
                        hideMainCta
                        showCustomMsg={returnMsg}
                    />
                }
                <div className={styles.listing__title}>
                    Book Listing
                </div>
                <div className={styles.listing__cartReturn}>
                    <span className={styles.listing__actionIcon}>
                        <img src="https://res.cloudinary.com/abyy30/image/upload/v1608744183/bookReturn_rdtuxi.svg" onClick={() => this.toggleReturn()} />
                        {returnItemToShow.length > 0 && <div>{returnItemToShow.length}</div>}
                    </span>
                    <span className={styles.listing__actionIcon}>
                        <img src="https://res.cloudinary.com/abyy30/image/upload/v1608742866/cartOutline_oewduu.svg" onClick={() => this.toggleCart()} />
                        {cart.length > 0 && <div>{cart.length}</div>}
                    </span>
                </div>
                <div className={styles.listing__subTitle}>
                    Hover or Tap to select your desired book
                </div>
                <div className={styles.listing__bookListWrap}>
                    {bookList.length > 0 ? 
                        bookList.map(book => 
                            {
                                if (book.availableQty > 0) {
                                    return (
                                        <div className={styles.listing__bookWrap} key={book.bookId}>
                                            <BookComp bookDetails={book} addToCart={this.addToCart} removeFromCart={this.removeFromCart} />
                                        </div>
                                    )
                                }
                            }
                        )
                    : loadingState ? <EmptyScreenWithMsg textToShow='Loading...' /> : <EmptyScreenWithMsg textToShow='No book found' />
                    }
                </div>
            </div>
        );
    }
}

export default ListingModule;