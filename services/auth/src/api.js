// @flow
import type {KoaCtx} from './types';

const jwt = require('jsonwebtoken');
const md5 = require('md5');

const config = require('./config');
const db = require('./db');
const Util = require('./util');

class Auth {
  static async adminLogin(ctx: KoaCtx) {
    ctx.checkBody('email').notEmpty();
    ctx.checkBody('password').notEmpty();

    if (ctx.errors) {
      return ctx.body = ctx.errors;
    }

    const body: {email: string, password: string} = ctx.request.body;

    try {
      const md5Password = md5(body.password);
      const user = await db.AdminUsers.find({
        where: {
          email: body.email,
          password: md5Password
        }
      });

      if (!user) {
        ctx.status = 400;
        return ctx.body = {reason: 'User not found.'}
      }

      const token = jwt.sign({
        email: user.email, id: user.id
      }, config.secretKey);

      return ctx.body = {token};
    } catch (e) {
      ctx.status = 400;
      return ctx.body = {reason: 'Database error.'}
    }
  }

  static async isAuthAdmin(ctx: KoaCtx) {
    ctx.checkBody('token').notEmpty();
    if (ctx.errors) {
      return ctx.body = ctx.errors;
    }

    try {
      const userData = await Util.jwtPromisify(ctx.request.body.token);
      const user = await db.AdminUsers.find({
        where: {
          id: userData.id,
          email: userData.email
        }
      });

      if (!user) {
        ctx.status = 400;
        return ctx.body = {reason: 'User not found.'}
      }

      ctx.status = 200;
      return ctx.body = {
        user: {
          id: user.id,
          email: user.email
        }
      };
    } catch (e) {
      ctx.status = 400;
      return ctx.body = {reason: 'Auth fail.'}
    }
  }
}

module.exports = Auth;
