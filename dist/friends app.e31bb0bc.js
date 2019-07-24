// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/fetch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPeople = void 0;

var getJson = function getJson(url) {
  return fetch(url).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    throw new Error(response.status);
  });
};

var fetchPeople = function fetchPeople() {
  return getJson('https://randomuser.me/api/?results=25&nat=fr').then(function (_ref) {
    var results = _ref.results;
    return results;
  });
};

exports.fetchPeople = fetchPeople;
},{}],"src/createHtmlList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHtmlList = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserProfile = function UserProfile(img, firstName, lastName, city, gender, age, date) {
  _classCallCheck(this, UserProfile);

  this.img = img;
  this.firstName = firstName.capitalize();
  this.lastName = lastName.capitalize();
  this.city = city.capitalize();
  this.gender = gender;
  this.age = age;
  this.dateOfRegistration = date;
  this.textHtml = "<li class='userLi'>\n            <p> <img class='photo' src=".concat(this.img, "> </p>\n            <h2 class='userName'>").concat(this.firstName, " ").concat(this.lastName, "</h2>\n            <p>").concat(this.age, "</p>\n            <p>").concat(this.city, "</p>           \n        </li>");
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var createHtmlList = function createHtmlList(list) {
  var users = list.map(function (e) {
    var name = e.name,
        gender = e.gender,
        dob = e.dob,
        picture = e.picture,
        location = e.location;
    return new UserProfile(picture['large'], name["first"], name["last"], location["city"], gender, dob["age"], dob["date"]);
  });
  return users;
};

exports.createHtmlList = createHtmlList;
},{}],"src/sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sort = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var sort = function sort(_ref, list, render) {
  var currentTarget = _ref.currentTarget;
  var elements = currentTarget.elements;
  state = {
    filterGenderBy: elements.gender.value,
    sortAlphabetically: elements.sortAlphabetically.value,
    filterMinAge: elements.minAge.value,
    filterMaxAge: elements.maxAge.value,
    filterCityBy: elements.city.value,
    filterNameBy: elements.name.value
  };
  list = sortPeoplesByName(list);
  list = filterByGender(list);
  list = filterByAge(list, state.filterMinAge, state.filterMaxAge);
  list = filterByCity(list, state.filterCityBy);
  list = filterByName(list, state.filterNameBy);
  render(list);
};

exports.sort = sort;
var state;

var sortPeoplesByName = function sortPeoplesByName(peoples) {
  var sliced = _toConsumableArray(peoples);

  var runSorting = function runSorting(a, b) {
    if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
      return -1;
    }

    if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
      return 1;
    }

    return 0;
  };

  if (state.sortAlphabetically === 'ascending') {
    sliced.sort(runSorting);
  }

  if (state.sortAlphabetically === 'descending') {
    sliced.sort(function (a, b) {
      return runSorting(b, a);
    });
  }

  return sliced;
};

var filterByGender = function filterByGender(peoples) {
  return state.filterGenderBy && state.filterGenderBy !== 'all' ? peoples.filter(function (_ref2) {
    var gender = _ref2.gender;
    return gender === state.filterGenderBy;
  }) : peoples;
};

var filterByAge = function filterByAge(list, minAge, maxAge) {
  minAge ? list = list.filter(function (_ref3) {
    var age = _ref3.age;
    return age >= minAge;
  }) : {};
  maxAge ? list = list.filter(function (_ref4) {
    var age = _ref4.age;
    return age <= maxAge;
  }) : {};
  return list;
};

var filterByCity = function filterByCity(list, city) {
  var search = new RegExp(city, "ig");
  list = list.filter(function (_ref5) {
    var city = _ref5.city;
    return city.match(search) || city.match(search);
  });
  return list;
};

var filterByName = function filterByName(list, name) {
  var search = new RegExp(name, "ig");
  list = list.filter(function (e) {
    return e.firstName.toLowerCase().match(search) || e.lastName.toLowerCase().match(search);
  });
  return list;
};
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _fetch = require("./src/fetch.js");

var _createHtmlList = require("./src/createHtmlList");

var _sort = require("./src/sort.js");

var usersOnPage = 20;
var filterForm = document.querySelector('form');
var resetButton = document.querySelector('.button');
var main = document.querySelector('.main');
(0, _fetch.fetchPeople)().then(function (list) {
  return (0, _createHtmlList.createHtmlList)(list);
}).then(function (html) {
  render(html);
  filterForm.addEventListener('change', function (e) {
    (0, _sort.sort)(e, html, render);
  });
  filterForm.addEventListener('keyup', function (e) {
    (0, _sort.sort)(e, html, render);
  });
  resetButton.addEventListener('click', function () {
    reset();
    render(html);
  });
});

function reset() {
  var items = filterForm.elements;

  for (var i in items) {
    if (items[i].type === 'select-one' || items[i].type === 'text') {
      items[i].value = "";
    }
  }

  ;
}

;

function render(usersHtml) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var pagesHtml = paginate(usersHtml, usersOnPage);

  if (pagesHtml.length === 0) {
    pagesHtml.push("<div class='emptyList'>Not found</div>");
  }

  main.innerHTML = pagesHtml[page - 1];

  if (pagesHtml.length > 1) {
    var pages = document.createElement('div');
    pages.className = 'pages';

    for (var i = 1; i <= pagesHtml.length; i++) {
      if (Number(page) === i) {
        pages.innerHTML += "<button class='active' value=".concat(i, ">").concat(i, "</a>");
      } else {
        pages.innerHTML += "<button value=".concat(i, ">").concat(i, "</a>");
      }
    }

    main.insertAdjacentElement('beforeend', pages);
    pages.addEventListener('click', function (e) {
      render(usersHtml, e.target.value);
    });
  }
}

function paginate(array, itemsOnPage) {
  var sets = {};
  var set = [];
  var setCounter = 0;

  for (var i = 0; i < array.length; i++) {
    set.push(array[i]);

    if ((i + 1) % itemsOnPage === 0 || i + 1 >= array.length) {
      setCounter++;
      sets['' + setCounter] = set;
      set = [];
    }
  }

  var pagesHtml = Object.values(sets).map(function (arr) {
    return arr.map(function (e) {
      return e.textHtml;
    }).join('');
  });
  return pagesHtml;
}
},{"./src/fetch.js":"src/fetch.js","./src/createHtmlList":"src/createHtmlList.js","./src/sort.js":"src/sort.js"}],"../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56055" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/friends%20app.e31bb0bc.js.map