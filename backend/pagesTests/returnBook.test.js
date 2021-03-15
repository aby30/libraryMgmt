import ReturnBook from '../../pages/api/returnBook'
import UserRepo from '../../backend/repositories/userRepo';
import BookRepo from '../../backend/repositories/bookRepo';
import { createMocks } from 'node-mocks-http';

UserRepo.getUserDetails = jest.fn();
UserRepo.update = jest.fn();
BookRepo.update = jest.fn();

describe('Return Book Api', () => {

    it('Return successful if book currently owned', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: JSON.stringify({
                cartData: {
                    bookId: 3,
                    availableQty: 3,
                    bookName: "BookName 3",
                    imageUrl: "https://res.cloudinary.com/abyy30/image/upload/v1608652381/bookImages/sapiens.jpg",
                    isSelected: 1
                },
                userId: 808,
            })
          });
        UserRepo.getUserDetails.mockResolvedValue({
            userId: 808,
            userName: 'abhipray',
            bookIds: '1,3'
        });

        BookRepo.update.mockResolvedValue({
            bookId: 3,
            availableQty: 4
        });

        UserRepo.update.mockResolvedValue({
            bookId: 1,
            userId: 808,
        });

        
        await ReturnBook(req, res);
        const Message = JSON.parse(res._getData()).data;
        expect(Message).toBe('Returned succesfully');
    });

    it('If no book in return request', async () => {
        const { req, res } = createMocks({
            method: 'POST',
            body: JSON.stringify({
                cartData: {},
                userId: 808,
            })
          });
        UserRepo.getUserDetails.mockResolvedValue({
            userId: 808,
            userName: 'abhipray',
            bookIds: '1,2'
        });

        await ReturnBook(req, res);
        const ResDetails = JSON.parse(res._getData());
        expect(ResDetails.data).toBe('Cannot be returned');
    });

})