// @flow
import type {KoaCtx} from './type';

const fetch = require('isomorphic-fetch');
const config = require('./config');

class Util {
  public static async isAdmin(ctx: KoaCtx, next: () => void) {
    ctx.checkHeader('x-auth-token').notEmpty();

    if (ctx.errors) {
      return Util.errorResValidate(ctx);
    }

    const token = ctx.headers['x-auth-token'];

    try {
      const resAuth = await fetch(`${config.services.auth}/auth/admin/isAuth`, {
        method: 'post',
        body: JSON.stringify({token})
      });

      if (resAuth.status === 200) {
        ctx.user = await resAuth.json();
        return next();
      }
      return Util.errorRes(ctx, 'Auth fail');
    } catch (e) {
      return Util.errorRes(ctx, 'Auth fail');
    }
  }

  public static errorRes(ctx: KoaCtx, msg: string = 'Database error.', status: number = 400): void {
    ctx.status = status;
    ctx.body = {reason: msg};
  }

  public static errorResValidate(ctx: KoaCtx): void {
    ctx.status = 400;
    ctx.body = ctx.errors;
  }
}

module.exports = Util;
