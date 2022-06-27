/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/Post';
import * as jose from 'jose';
import formidable from 'formidable';
import fs from 'fs';
import slugify from '../../../utils/slugify';

dbConnect();

export const saveFile = async (file, name) => {
  const data = fs.readFileSync(file.image.filepath);
  name = `${name}.${file.image.originalFilename.split('.').pop()}`;
  fs.writeFileSync(`./public/uploads/${name}`, data);
  await fs.unlinkSync(file.image.filepath);
  return `/uploads/${name}`;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === 'GET') {
    const data = await Post.find({})
      .populate([
        { path: 'author', select: 'name image' },
        { path: 'category' },
      ])
      .sort({ createdAt: 'desc' });

    return res.status(200).json({
      success: true,
      message: 'Posts',
      data: data,
    });
  }

  if (req.method === 'POST') {
    try {
      const jwt = await jose.jwtVerify(
        req.cookies.token,
        new TextEncoder().encode(process.env.secret)
      );

      const author = jwt.payload._id;

      const form = new formidable.IncomingForm();
      form.uploadDir = './';
      form.keepExtensions = true;
      form.parse(req, async (err, fields, files) => {
        if (err) throw err;
        const { title, category, description, content } = fields;

        const slug = slugify(title);

        const checkSlug = await Post.findOne({ slug: slug });
        if (checkSlug)
          return res
            .status(200)
            .json({
              success: false,
              message: 'Title already in use, please change the title',
            });

        const newPost = await new Post({
          slug,
          title,
          category,
          description,
          content,
          author,
        });

        if (files?.image) {
          const image = await saveFile(files, newPost._id);
          newPost.featureImage = image;
        }

        await newPost.save();

        return res.status(200).json({ success: true, message: 'Post Posted' });
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
};
