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
  checkParams: (title: string) => KoaCtx;
  params: any;
  notEmpty: () => void;
  errors: any;
}

export type EventData = {
  title: string,
  description: string,
  longitude: number,
  latitude: number,
  host_id: number
}