/* eslint-disable import/no-anonymous-default-export */

import Category from '../../../models/Category';

// dbConnect();

export default async (req, res) => {
  if (req.method === 'PUT')
    try {
      const { title } = req.body;
      const { id } = req.query;

      const slug = title.toLowerCase().replaceAll(' ', '-').trim();

      const doc = await Category.findById(id);
      doc.title = title;
      doc.slug = slug;
      await doc.save();

      return res.status(200).json({ success: true, message: 'Updated' });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: 'slug already in use or invalid ID' });
    }

  if (req.method === 'DELETE')
    try {
      const { id } = req.query;

      await Category.findByIdAndDelete(id);

      return res.status(200).json({ success: true, message: 'Deleted' });
    } catch (error) {
      return res.status(400).json({ success: false, message: 'invalid ID' });
    }
};
