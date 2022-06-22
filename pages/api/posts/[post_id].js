import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/Post';
import { saveFile } from '.';
import formidable from 'formidable';

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const postHandler = async (req, res) => {
  if (req.method === 'GET') {
    const { post_id } = req.query;

    const data = await Post.findById(post_id).populate([
      { path: 'author', select: 'name' },
      { path: 'category' },
    ]);

    return res.status(200).json({
      success: true,
      message: 'Posts',
      data: data,
    });
  }

  if (req.method === 'POST') {
    try {
      const { post_id } = req.query;

      const form = new formidable.IncomingForm();
      form.keepExtensions = true;
      form.parse(req, async (err, fields, files) => {
        if (err) throw err;

        const UpdatedPost = await Post.findById(post_id);

        const { title, category, description, content } = fields;

        UpdatedPost.title = title;
        UpdatedPost.category = category;
        UpdatedPost.description = description;
        UpdatedPost.content = content;

        console.log(UpdatedPost);

        if (files?.image) {
          const image = await saveFile(files, UpdatedPost._id);
          UpdatedPost.featureImage = image;
        }

        await UpdatedPost.save();
        return res.status(200).json({ success: true, message: 'Post Updated' });
      });
    } catch (error) {
      console.log(error.message);
      return res.status(404).json({
        success: false,
        message: 'Error when updating check if logged in or incorrect post id',
      });
    }
  }
};

export default postHandler;
