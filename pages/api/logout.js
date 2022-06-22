/* eslint-disable import/no-anonymous-default-export */

import cookie from 'cookie';

export default (req, res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: false,
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })
  );

  return res.status(200).json({ success: true, message: 'logged out' });
};
