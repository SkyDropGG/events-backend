const koaRouter = require('koa-router');

const api = require('./api');

const router = koaRouter({
  prefix: '/auth'
});

/**
 * @api {post} /admin/login Admin login
 * @apiName Login
 * @apiGroup Admin
 *
 * @apiParam {String} email Email.
 * @apiParam {String} password Password.
 *
 * @apiSuccess {String} token Auth token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "***"
 *     }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "reason": "User not found."
 *     }
 */
router.post('/admin/login', api.adminLogin);

/**
 * @api {post} /admin/isAuth Admin test
 * @apiName AdminTest
 * @apiGroup Admin
 *
 * @apiParam {Object} user User data.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *       "user": {
 *        "id": 0,
 *        "email": "..."
 *       }
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "reason": "Auth fail."
 *     }
 */
router.post('/admin/isAuth', api.isAuthAdmin);

module.exports = router;
