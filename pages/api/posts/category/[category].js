/* eslint-disable import/no-anonymous-default-export */
import Post from '../../../../models/Post';

export default async (req, res) => {
  if (req.method === 'GET') {
    let data = await Post.find({}).populate([
      { path: 'author', select: 'name image' },
      { path: 'category' },
    ]);

    data = data.filter(({ category }) => category.slug === req.query.category);

    return res.status(200).json({
      success: true,
      message: 'Posts',
      data: data,
    });
  }
};
