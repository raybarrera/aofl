/**
 * @summary middleware
 * @version 1.0.0
 * @author Arian Khosravi <arian.khosravi@aofl.com>
 * @memberof module:aofl-js/middleware-package
 */
class Middleware {
  /**
   * Creates an instance of Middleware.
   *
   * @param {Object} middleware
   */
  constructor(...hooks) {
    this.middleware = {};
    for (let i = 0; i < hooks.length; i++) {
      this.middleware[hooks[i]] = [];
    }
  }

  /**
   * @param {Function} callback
   * @param {String} hook
   */
  use(callback, hook) {
    if (typeof callback !== 'function') throw new Error('callback must be a function');
    if (typeof this.middleware[hook] === 'undefined') throw new Error(`Only ${Object.keys(this.middleware)} hooks are supported.`);
    this.middleware[hook].push({
      callback,
      hook
    });
  }

  /**
   * @param {String} hook
   * @return {Iterator}
   */
  getMiddlewareIterator(hook) {
    const collection = this.middleware[hook];
    let nextIndex = 0;

    return {
      next() {
        if (nextIndex < collection.length) {
          return {
            value: collection[nextIndex++],
            done: false
          };
        }

        return {
          done: true
        };
      }
    };
  }

  /**
   * @param {*} request
   * @param {String} hook
   * @param {*} response
   * @return {Promise}
   */
  iterateMiddleware(request, hook, response = null) {
    return new Promise((resolve, reject) => {
      const iterator = this.getMiddlewareIterator(hook);
      let mw = null;
      const next = (/* istanbul ignore next */response = null) => {
        mw = iterator.next();
        if (mw.done !== true) {
          mw.value.callback(request, response, next);
        } else {
          resolve(response);
        }
      };
      next(response);
    });
  }
}

export default Middleware;
