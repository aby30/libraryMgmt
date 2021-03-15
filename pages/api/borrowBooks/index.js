import BookRepo from '../../../backend/repositories/bookRepo';
import UserRepo from '../../../backend/repositories/userRepo';
import UserDetails from '../getUserDetails';

export default async (req, res) => {
  const reqBody = JSON.parse(req.body);
  const userCurrentData = await UserDetails({body: JSON.stringify({ userId: reqBody.userId })});
  let bookIds = userCurrentData.bookIds || '';

  const currentBooks = userCurrentData.bookIds.length > 0 ? userCurrentData.bookIds.split(',') : '';

  if (reqBody.cartData.length === 1 
      && currentBooks.length == 1 
      && currentBooks.includes(reqBody.cartData[0].bookId.toString())) {
        res.statusCode = 200;
        res.json({ 
          data: 'Book already borrowed',
          maxLimit: false,
          existInBorrow: true,
        });
        return;
      }

  if ((currentBooks.length + reqBody.cartData.length) < 3 && reqBody.cartData.length > 0) {

    for (let index = 0; index < reqBody.cartData.length; index++) {
        await BookRepo.update({
          bookId: reqBody.cartData[index].bookId,
          availableQty: reqBody.cartData[index].availableQty-1,
        });
        if (bookIds.length === 0)
            bookIds = reqBody.cartData[index].bookId.toString();
        else
            bookIds = bookIds.concat(`,${reqBody.cartData[index].bookId.toString()}`);
    }

    await UserRepo.update({
      bookId: bookIds,
      userId: reqBody.userId,
    });

    res.statusCode = 200;
    res.json({ 
      data: 'Borrowed succesfully',
      maxLimit: false,
    });

  } else {
    res.json({ 
      data: 'Max limit of books already borrowed',
      maxLimit: true,
    });
  }

  
}
