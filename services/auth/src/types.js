// @flow
import {KoaContext} from 'koa-flow-declarations/KoaContext';

class UserData {
  id: number;
  email: string;
}

export class KoaCtx extends KoaContext {
  user: UserData;
  checkBody: (title: string) => KoaCtx;
  checkHeader: (title: string) => KoaCtx;
  notEmpty: () => void;
}