import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import cookie from 'cookie';

dbConnect();

const authHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      try {
        const token = req.cookies.token;
        const { payload: jwtData } = await jose.jwtVerify(
          token,
          new TextEncoder().encode(process.env.secret)
        );

        const foundUser = await User.findOne(
          { _id: jwtData._id },
          { password: 0 }
        );

        return res.status(200).json({
          success: true,
          message: 'Authenticated',
          data: foundUser,
        });
      } catch (error) {
        return res
          .status(401)
          .json({ success: false, message: 'Not Authorized' });
      }

    case 'POST':
      const { pass, email } = req.body;
      if (!pass || !email)
        return res
          .status(401)
          .json({ success: false, message: 'Email or Password is incorrect' });

      const gotUser = await User.findOne({ email });
      if (gotUser?.email) {
        if (!bcrypt.compareSync(pass, gotUser.password))
          return res.status(401).json({
            success: false,
            message: 'Email or Password is incorrect',
          });

        const jwtToken = await new jose.SignJWT({ _id: gotUser._id })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('1hr')
          .sign(new TextEncoder().encode(process.env.secret));

        res.setHeader(
          'Set-Cookie',
          cookie.serialize('token', jwtToken, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60,
            sameSite: 'strict',
            path: '/',
          })
        );

        return res.status(200).json({
          success: true,
          message: 'Authenticated',
          data: [],
        });
      }

      const hash = bcrypt.hashSync(pass, 8);

      const newUser = new User({
        email,
        password: hash,
      });

      await newUser.save();

      return res
        .status(200)
        .json({ success: true, message: 'Account Created' });

    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default authHandler;
