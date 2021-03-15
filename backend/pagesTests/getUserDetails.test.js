import getUserDetails from '../../pages/api/getUserDetails';
import UserRepo from '../../backend/repositories/userRepo';
import { createMocks } from 'node-mocks-http';

UserRepo.getUserDetails = jest.fn();

describe('User(s) Details Api', () => {

    it('If userId not provided then status 400 is returned', async () => {

        const { req, res } = createMocks({
            method: 'POST',
            body: JSON.stringify({
                userId: ''
            })
          });

        await getUserDetails(req, res);
        expect(res.statusCode).toBe(400);
    })

    it('On sending correct userId, respond with User details', async () => {

        const { req, res } = createMocks({
            method: 'POST',
            body: JSON.stringify({
                userId: 808
            })
          });

        UserRepo.getUserDetails.mockResolvedValue({
            data: { test: 'UserDetails' }
        });
        await getUserDetails(req, res);
        const yo = JSON.parse(res._getData()).data.data.test;
        expect(JSON.parse(res._getData()).data.data.test).toBe('UserDetails');
    })

})