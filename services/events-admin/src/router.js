const koaRouter = require('koa-router');

const api = require('./api');
const Util = require('./util');

const router = koaRouter({
  prefix: '/admin-events'
});

/**
 * @api {post} /admin-events Add event
 * @apiName AddEvent
 * @apiGroup Admin
 *
 * @apiHeader {String} x-auth-token Auth token.
 *
 * @apiParam {String} title Event title.
 * @apiParam {String} description Description.
 * @apiParam {Number} latitude Latitude
 * @apiParam {Number} longitude Latitude
 *
 * @apiSuccess {String} token Auth token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "reason": "Events already exists."
 *     }
 */
router.post('/', Util.isAdmin, api.add);

/**
 * @api {get} /admin-events Get events
 * @apiName GetEvents
 * @apiGroup Admin
 *
 * @apiHeader {String} x-auth-token Auth token.
 *
 * @apiParam {Number} offset=0 Start index of the results array.
 * @apiParam {Number} limit=30 Limit count. Max 100.
 *
 * @apiSuccess {Array} events
 * @apiSuccess {Object} event
 * @apiSuccess {Number} event.id
 * @apiSuccess {String} event.title
 * @apiSuccess {String} event.description
 * @apiSuccess {Number} event.latitude
 * @apiSuccess {Number} event.longitude
 * @apiSuccess {Number} event.host_id
 *
 * * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "events" [event]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "reason": "Events not found."
 *     }
 */
router.get('/', Util.isAdmin, api.gets);

/**
 * @api {delete} /admin-events/:id Delete event
 * @apiName DeleteEvent
 * @apiGroup Admin
 *
 * @apiHeader {String} x-auth-token Auth token.
 *
 * @apiParam {Number} id Id.
 *
 * * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 OK
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "reason": "Events not found."
 *     }
 */
router.get('/', Util.isAdmin, api.deleteOnce);

module.exports = router;
