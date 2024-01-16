import { Request } from 'express';

export function authFinder(req: Request) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    console.log('Found "Authorization" header');
    return req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    console.log('Found "__session" cookie');
    return req.cookies.__session as string;
  } else {
    return null;
  }
}
