// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"gameSnake.js":[function(require,module,exports) {
var canvas = document.getElementById('snakeCanvas');
var ctx = canvas.getContext('2d');
var colorList = ['whitesmoke', 'green', 'blue', 'burlywood', 'violet', 'pink', 'crimson', 'cadetblue', 'rosybrown', 'royalblue', 'red', 'rebeccapurple', 'yellowgreen', 'yellow', 'palevioletred', 'palegreen', 'salmon', 'aqua'];
var snake = {
  grid: [],
  width: 20,
  dir: 'right',
  speed: 20,
  border: 2,
  length: 5,
  tail: [{
    x: 0,
    y: 200
  }, {
    x: 20,
    y: 200
  }, {
    x: 40,
    y: 200
  }, {
    x: 60,
    y: 200
  }, {
    x: 80,
    y: 200
  }],
  color: 'green',
  food: {
    x: 580,
    y: 580
  },
  hd: function hd() {
    return this.tail[this.length - 1];
  },
  move: function move() {
    var change;
    var spd = this.speed;

    switch (this.dir) {
      case 'right':
        change = [spd, 0];
        break;

      case 'left':
        change = [-spd, 0];
        break;

      case 'up':
        change = [0, -spd];
        break;

      case 'down':
        change = [0, spd];
        break;

      default:
        console.error('error with snake dir', new Error());
        break;
    }

    var hd = snake.tail[snake.length - 1];
    snake.tail.shift();
    snake.tail.push({
      x: hd.x + change[0],
      y: hd.y + change[1]
    });
  }
};

window.onload = function () {
  initCanvas();
  initArrowControls();
  funkTitle();

  for (var i = 0; i <= 580; i += 20) {
    snake.grid.push(i);
  }

  genRandFood();
  changeSnakeColor();
};

function isPhone() {
  var flag = document.querySelector('#isPhone');
  var computedStyle = window.getComputedStyle(flag, null);
  var color = computedStyle.getPropertyValue('color');
  return Number(color.toString().slice(4, 7)) === 255;
}

function initArrowControls() {
  var myEvent = isPhone() ? 'touchstart' : 'click';
  var ctrl = document.querySelector('#controls');
  var arrows = ctrl.children;
  var falseMove = {
    'up': 'down',
    'down': 'up',
    'left': 'right',
    'right': 'left'
  };

  for (var i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener(myEvent, function (x) {
      if (falseMove[x.target.id] !== snake.dir) {
        snake.dir = x.target.id;
      }
    });
  } // need to add falseMove to this function too, cause you can make a u turn with out the u


  document.addEventListener('keydown', function (x) {
    var dirKeys = {
      'w': 'up',
      'a': 'left',
      's': 'down',
      'd': 'right'
    };

    if (dirKeys[x.key] !== undefined && falseMove[dirKeys[x.key]] !== snake.dir) {
      snake.dir = dirKeys[x.key];
    } else {
      console.log('na');
    }
  });
  return 0;
}

function switchThisColor(me) {
  var xs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : colorList;
  me.style.color = randChoice(xs);
  return 0;
}

function funkTitle() {
  document.querySelector('#h-one').addEventListener('click', function (x) {
    window.setInterval(function () {
      switchThisColor(x.srcElement);
    }, 1000 / 3);
    return 0;
  }); // switchThisColor(, undefined)

  return 0;
}

function initCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // console.log(canvas.clientWidth)

  ctx.fillStyle = 'black'; // ctx.rotate(Math.PI / 180 * 10)

  ctx.fillRect(500, 500, 100, 100);
  ctx.stroke(); // console.log(new Date())
  // window.requestAnimationFrame(draw)

  window.setInterval(draw, 1000 / 10); // Main Loop!
}

function randRange(l, h) {
  return Math.floor(Math.random() * (h - l));
}

function randChoice(xs) {
  return xs[randRange(0, xs.length)];
}

function draw() {
  ctx.fillStyle = 'black';
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear prev paint

  for (var i = 0; i < snake.length; i++) {
    // paint all the new (and old) snake points
    var xy = snake.tail[i];
    drawAllWithBorder([xy.x, xy.y]);
  }

  snake.move(); // move to the next block

  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(snake.food.x + 10, snake.food.y + 10, snake.width / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath(); // draw the food

  if (snake.food.x === snake.hd().x && snake.food.y === snake.hd().y) {
    snake.tail.unshift(snake.tail[0]);
    snake.length += 1;
    genRandFood();
    changeSnakeColor();
    document.querySelector('#score').innerText = snake.length - 5;
  } // check if food is eaten, inc snake if does and draw new food


  snake.tail.slice(0, snake.length - 1).forEach(function (block) {
    if (eqJson(block, snake.hd())) {
      deathSequence();
    }
  });
}

function drawAllWithBorder(xy) {
  var br = snake.border;
  var wd = snake.width;
  ctx.fillStyle = 'black';
  ctx.fillRect(xy[0], xy[1], wd, wd);
  ctx.fillStyle = snake.color;
  ctx.fillRect(xy[0] + br / 2, xy[1] + br / 2, wd - br, wd - br);
}

function genRandFood() {
  snake.food = {
    x: randChoice(snake.grid),
    y: randChoice(snake.grid)
  };
}

function changeSnakeColor() {
  snake.color = randChoice(colorList);
  return 0;
}

function eqJson(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function deathSequence() {
  alert('dead! refresh 4 now');
}
},{}],"../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45959" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","gameSnake.js"], null)
//# sourceMappingURL=/gameSnake.map