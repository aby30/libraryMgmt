import getBookList from '../../pages/api/getBooksList';
import BookRepo from '../repositories/bookRepo';
import { createMocks } from 'node-mocks-http';

BookRepo.getAll = jest.fn();

describe('Get Book list Api', () => {

    it('If request method not GET respond with 403', async () => {

        const { req, res } = createMocks({
            method: 'POST',
          });

        const response = await getBookList(req, res);
        expect(response).toBe(403);
    })

    it('On successfull response, respond with List of Books', async () => {

        const { req, res } = createMocks({
            method: 'GET',
          });

        BookRepo.getAll.mockResolvedValue({
            data: { test: 'BookList' }
        });
        await getBookList(req, res);
        expect(JSON.parse(res._getData()).data.data.test).toBe('BookList');
    })

})