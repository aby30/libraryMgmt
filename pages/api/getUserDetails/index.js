import UserRepo from '../../../backend/repositories/userRepo';

export default async (req, res) => {
  const userData = JSON.parse(req.body);

  if (userData.userId) {
    const userDetails = await UserRepo.getUserDetails(userData.userId);
  
    if (res) {
      res.statusCode = 200;
      res.json({data: userDetails});
    } else {
      return userDetails;
    }
  } else {
    res.statusCode = 400;
  }

  
}
