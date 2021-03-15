import BorrowBook from '../../pages/api/borrowBooks';
import UserRepo from '../../backend/repositories/userRepo';
import BookRepo from '../../backend/repositories/bookRepo';
import { createMocks } from 'node-mocks-http';

BookRepo.getAll = jest.fn();
UserRepo.getUserDetails = jest.fn();
UserRepo.update = jest.fn();

describe('Borrow Book Api', () => {

    it('If book already borrowed then book is not borrowed and user informed with message', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: JSON.stringify({
                cartData: [{
                    bookId: 2,
                    availableQty: 3,
                    bookName: "BookName 2",
                    imageUrl: "https://res.cloudinary.com/abyy30/image/upload/v1608652381/bookImages/harry.jpg",
                    isSelected: 1
                }],
                userId: 808,
            })
          });
          UserRepo.getUserDetails.mockResolvedValue({
            userId: 808,
            userName: 'abhipray',
            bookIds: '2'
        });

        await BorrowBook(req, res);
        const existInBorrowFlag = JSON.parse(res._getData()).existInBorrow;
        expect(existInBorrowFlag).toBeTruthy();
    });

    it('If max borrow limit of 2 reached and data in borrow request then intimate with message', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: JSON.stringify({
                cartData: [{
                    bookId: 3,
                    availableQty: 3,
                    bookName: "BookName 3",
                    imageUrl: "https://res.cloudinary.com/abyy30/image/upload/v1608652381/bookImages/sapiens.jpg",
                    isSelected: 1
                },
                {
                    bookId: 4,
                    availableQty: 3,
                    bookName: "BookName 4",
                    imageUrl: "https://res.cloudinary.com/abyy30/image/upload/v1608652381/bookImages/mind.jpg",
                    isSelected: 1
                }
            ],
                userId: 808,
            })
          });
        UserRepo.getUserDetails.mockResolvedValue({
            userId: 808,
            userName: 'abhipray',
            bookIds: '1,2'
        });

        await BorrowBook(req, res);
        const ResDetails = JSON.parse(res._getData());
        expect(ResDetails.maxLimit).toBeTruthy();
        expect(ResDetails.data).toBe('Max limit of books already borrowed');
    });

    it('If max borrow limit not reached and data in borrow request then get success borrow message and update user record', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: JSON.stringify({
                cartData: [{
                    bookId: 3,
                    availableQty: 3,
                    bookName: "BookName 3",
                    imageUrl: "https://res.cloudinary.com/abyy30/image/upload/v1608652381/bookImages/sapiens.jpg",
                    isSelected: 1
                }],
                userId: 808,
            })
          });
        UserRepo.getUserDetails.mockResolvedValue({
            userId: 808,
            userName: 'abhipray',
            bookIds: '2'
        });

        UserRepo.update.mockResolvedValue({
            bookId: 2,
            userId: 808,
        });
        await BorrowBook(req, res);
        const Message = JSON.parse(res._getData()).data;
        expect(Message).toBe('Borrowed succesfully');
    });

})