(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {},
    };
    factory(mod.exports);
    global.singleSpaAngular1 = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true,
  });
  exports.default = singleSpaAngular1;

  var _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  var _typeof =
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
      ? function (obj) {
          return typeof obj;
        }
      : function (obj) {
          return obj &&
            typeof Symbol === 'function' &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? 'symbol'
            : typeof obj;
        };

  var defaultOpts = {
    // required opts
    angular: null,
    domElementGetter: null,
    mainAngularModule: null,

    // optional opts
    preserveGlobal: false,
    template: undefined,
  };

  function singleSpaAngular1(userOpts) {
    if (
      (typeof userOpts === 'undefined' ? 'undefined' : _typeof(userOpts)) !==
      'object'
    ) {
      throw new Error('single-spa-angular1 requires a configuration object');
    }

    var opts = _extends({}, defaultOpts, userOpts);

    if (!opts.angular) {
      throw new Error('single-spa-angular1 must be passed opts.angular');
    }

    if (!opts.domElementGetter) {
      throw new Error(
        'single-spa-angular1 must be passed opts.domElementGetter function',
      );
    }

    if (!opts.mainAngularModule) {
      throw new Error(
        'single-spa-angular1 must be passed opts.mainAngularModule string',
      );
    }

    // A shared object to store mounted object state
    var mountedInstances = {};

    return {
      bootstrap: bootstrap.bind(null, opts, mountedInstances),
      mount: mount.bind(null, opts, mountedInstances),
      unmount: unmount.bind(null, opts, mountedInstances),
    };
  }

  function bootstrap(opts) {
    return Promise.resolve();
  }

  function mount(opts, mountedInstances) {
    return Promise.resolve().then(function () {
      window.angular = opts.angular;

      var containerEl = getContainerEl(opts);

      if (opts.template) {
        containerEl.innerHTML = opts.template;
      }
      mountedInstances.instance = opts.angular.bootstrap(containerEl, [
        opts.mainAngularModule,
      ]);
    });
  }

  function unmount(opts, mountedInstances) {
    return new Promise(function (resolve, reject) {
      mountedInstances.instance.get('$rootScope').$destroy();
      getContainerEl(opts).innerHTML = '';

      if (opts.angular === window.angular && !opts.preserveGlobal)
        delete window.angular;

      setTimeout(resolve);
    });
  }

  function getContainerEl(opts) {
    var element = opts.domElementGetter();
    if (!element) {
      throw new Error('domElementGetter did not return a valid dom element');
    }

    return element;
  }
});
//# sourceMappingURL=single-spa-angular1.js.map
