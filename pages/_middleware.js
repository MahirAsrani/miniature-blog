import * as jose from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const URL = req.url;

  const protectedRoutes = ['/addnew', '/dashboard'];

  const check = protectedRoutes.some((val) => URL.includes(val));

  if (check) {
    try {
      const jwtToken = req.cookies.token;
      await jose.jwtVerify(
        jwtToken,
        new TextEncoder().encode(process.env.secret)
      );

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(`${process.env.baseURL}/login`);
    }
  }

  if (URL.includes('/login')) {
    try {
      const jwtToken = req.cookies.token;
      await jose.jwtVerify(
        jwtToken,
        new TextEncoder().encode(process.env.secret)
      );

      return NextResponse.redirect(`${process.env.baseURL}`);
    } catch (error) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
