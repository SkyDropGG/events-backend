// @flow
import type {KoaCtx, EventData} from './type';

const config = require('./config');
const db = require('./db');
const Util = require('./util');

class Events {
  public static async add(ctx: KoaCtx): any {
    ctx.checkBody('title').notEmpty();
    ctx.checkBody('description').notEmpty();
    ctx.checkBody('longitude').notEmpty();
    ctx.checkBody('latitude').notEmpty();

    if (ctx.errors) {
      return Util.errorResValidate(ctx);
    }

    let body: EventData = ctx.request.body;
    body.host_id = 0;

    try {
      const event = await db.Events.create(body);
      return ctx.body = {event};
    } catch (e) {
      return Util.errorRes(ctx);
    }
  }

  public static async gets(ctx: KoaCtx): any {
    const where: { limit: number, offset: number } = {
      limit: ctx.query.limit || 30,
      offset: ctx.query.offset || 0
    };

    try {
      const events = await db.Events.findAll(where);

      if (events.length === 0) {
        return Util.errorRes(ctx, 'Events not found.', 404);
      }

      return ctx.body = {events};
    } catch (e) {
      return Util.errorRes(ctx);
    }
  }

  public static async deleteOnce(ctx: KoaCtx): any {
    ctx.checkParams('id').notEmpty();

    if (ctx.errors) {
      return Util.errorResValidate(ctx);
    }

    const id: number = ctx.params.id;

    try {
      const deleted: number = await db.Events.destroy({
        where: {
          id
        }
      });

      if (deleted === 0) {
        return Util.errorRes(ctx, 'Event not found', 404);
      }

      return ctx.status = 204;
    }  catch(e) {
      return Util.errorRes(ctx);
    }
  }
}

module.exports = Events;
