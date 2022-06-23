import Post from '../../../models/Post';
import * as jose from 'jose';

const postHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const jwtToken = req.cookies.token;

      const jwt = await jose.jwtVerify(
        jwtToken,
        new TextEncoder().encode(process.env.secret)
      );

      const data = await Post.find({ author: jwt.payload._id }).populate([
        { path: 'author', select: 'name image' },
        { path: 'category' },
      ]);

      return res.status(200).json({
        success: true,
        message: 'Posts',
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(200).json({
        success: true,
        message: 'Posts',
        data: [],
      });
    }
  }
};

export default postHandler;
