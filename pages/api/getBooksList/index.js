import BookRepo from '../../../backend/repositories/bookRepo';

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.statusCode=403;
  }

  const books = await BookRepo.getAll();

  res.statusCode = 200;
  res.json({data: books});
}
