/* eslint-disable import/no-anonymous-default-export */
import formidable from 'formidable';
import * as jose from 'jose';
import fs from 'fs';
import User from '../../../models/User';

export const saveFile = async (file, name) => {
  const data = fs.readFileSync(file.image.filepath);
  name = `${name}.${file.image.originalFilename.split('.').pop()}`;
  fs.writeFileSync(`./public/uploads/profile/${name}`, data);
  await fs.unlinkSync(file.image.filepath);
  return `/uploads/profile/${name}`;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const jwt = await jose.jwtVerify(
        req.cookies.token,
        new TextEncoder().encode(process.env.secret)
      );

      const id = jwt.payload._id;
      const data = await User.findById(id, { password: 0 });

      return res.status(200).json({
        success: true,
        message: 'Posts',
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const jwt = await jose.jwtVerify(
        req.cookies.token,
        new TextEncoder().encode(process.env.secret)
      );

      const id = jwt.payload._id;

      const Me = await User.findById(id);

      const form = new formidable.IncomingForm();
      form.uploadDir = './';
      form.keepExtensions = true;

      form.parse(req, async (err, fields, files) => {
        if (err) throw err;

        const { name } = fields;
        Me.name = name;

        if (files?.image) {
          const image = await saveFile(files, Me._id);
          Me.image = image;
        }

        await Me.save();
        return res
          .status(200)
          .json({ success: true, message: 'Sucessfully updated!' });
      });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ success: false, message: error.message });
    }
  }
};
