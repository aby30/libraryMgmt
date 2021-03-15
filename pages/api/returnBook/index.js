import BookRepo from '../../../backend/repositories/bookRepo';
import UserRepo from '../../../backend/repositories/userRepo';
import UserDetails from '../getUserDetails';

export default async (req, res) => {
  const reqBody = JSON.parse(req.body);
  let bookIds = '';
  const userCurrentData = await UserDetails({body: JSON.stringify({ userId: reqBody.userId })});

  const bookIdsBorrowed = userCurrentData.bookIds.split(',')
  const currentBooks = bookIdsBorrowed.filter(id => parseInt(id) !== reqBody.cartData.bookId) || [];

  if (currentBooks.length < 2 && reqBody.cartData.bookId) {

    await BookRepo.update({
      bookId: reqBody.cartData.bookId,
      availableQty: reqBody.cartData.availableQty+1,
    });

    if (bookIds.length === 0)
        bookIds = reqBody.cartData.bookId.toString()
    else
        bookIds = bookIds.concat(`,${reqBody.cartData.bookId.toString()}`)

    await UserRepo.update({
      bookId: currentBooks[0] || '',
      userId: reqBody.userId,
    });

    res.statusCode = 200;
    res.json({ 
      data: 'Returned succesfully',
    });

  } else {
    res.json({ 
      data: 'Cannot be returned',
    });
  }

  
}
