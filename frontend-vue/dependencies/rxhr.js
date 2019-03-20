(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.rxhr = factory());
}(this, (function () {

  function symbolObservablePonyfill(root) {
    var result;
    var Symbol = root.Symbol;

    if (typeof Symbol === 'function') {
      if (Symbol.observable) {
        result = Symbol.observable;
      } else {
        result = Symbol('observable');
        Symbol.observable = result;
      }
    } else {
      result = '@@observable';
    }

    return result;
  }

  /* global window */
  var root;

  if (typeof self !== 'undefined') {
    root = self;
  } else if (typeof window !== 'undefined') {
    root = window;
  } else if (typeof global !== 'undefined') {
    root = global;
  } else if (typeof module !== 'undefined') {
    root = module;
  } else {
    root = Function('return this')();
  }

  var result = symbolObservablePonyfill(root);

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var encodeParams = function encodeParams(params) {
    return Object.keys(params).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');
  };

  var buildUrl = function buildUrl(url, params) {
    return params ? url + '?' + encodeParams(params) : url;
  };

  var fromResponseHeaderString = function fromResponseHeaderString(headersString) {
    var headers = {};
    headersString.split('\n').forEach(function (line) {
      var index = line.indexOf(':');
      if (index > 0) headers[line.slice(0, index)] = line.slice(index + 1).trim();
    });
    return headers;
  };

  var noop = function noop() { };

  var rxhr = function rxhr(options) {
    return _defineProperty({
      subscribe: function subscribe(onNext, onError, onComplete) {
        var observer = onNext;
        var request = new XMLHttpRequest();
        if (typeof onNext === 'function') {
          observer = {
            next: onNext,
            error: onError || noop,
            complete: onComplete || noop
          };
        }
        try {
          var buildResponse = function buildResponse(err) {
            var body = err || (!options.responseType || options.responseType === 'text' ? request.responseText : request.response);
            var response = {
              // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
              status: request.status === 1223 ? 204 : request.status,
              ok: request.status >= 200 && request.status < 300,
              type: err ? 'error' : 'default',
              statusText: err ? request.statusText : request.statusText || 'OK',
              headers: fromResponseHeaderString(request.getAllResponseHeaders()),
              url: request.responseURL,
              text: function text() {
                return (typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object' ? JSON.stringify(body) : body;
              },
              json: function json() {
                return typeof body === 'string' ? JSON.parse(body) : body;
              },
              blob: function blob() {
                return new Blob([body]);
              }
            };
            return response;
          };
          var onReqLoad = function onReqLoad() {
            var response = buildResponse();
            if (response.ok) {
              observer.next(response);
              observer.complete();
              return;
            }
            observer.error(response);
          };

          var onReqError = function onReqError() {
            var response = buildResponse(new Error('Network Error'));
            observer.error(response);
          };

          var onReqTimeout = function onReqTimeout() {
            var response = buildResponse(new Error('ECONNABORTED'));
            observer.error(response);
          };

          request.open(options.method.toUpperCase(), buildUrl(options.url, options.params));
          // response type
          options.responseType && (request.responseType = options.responseType);
          // with credentials
          request.withCredentials = options.withCredentials === true;
          // headers
          for (var i in options.headers) {
            request.setRequestHeader(i, options.headers[i]);
          } // timeout in ms
          request.timeout = options.timeout;

          request.send(options.body || null);

          request.onload = onReqLoad;
          request.onerror = onReqError;
          request.ontimeout = onReqTimeout;
        } catch (err) {
          observer.error(err);
        }
        return {
          unsubscribe: function unsubscribe() {
            request.abort();
          }
        };
      }
    }, result, function () {
      return this;
    });
  };

  return rxhr;

})));