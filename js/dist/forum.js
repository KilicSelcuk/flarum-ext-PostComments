/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('kilicselcuk/flarum-ext-postcomments', function () {
  console.log('[kilicselcuk/flarum-ext-postcomments] Hello, forum and admin!');
});

/***/ }),

/***/ "./src/forum/MakeTree.js":
/*!*******************************!*\
  !*** ./src/forum/MakeTree.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MakeTree)
/* harmony export */ });
/* harmony import */ var flarum_forum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/extend */ "flarum/forum/extend");
/* harmony import */ var flarum_forum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_components_Post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/components/Post */ "flarum/forum/components/Post");
/* harmony import */ var flarum_forum_components_Post__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_Post__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/Button */ "flarum/forum/components/Button");
/* harmony import */ var flarum_forum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_helpers_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/helpers/icon */ "flarum/forum/helpers/icon");
/* harmony import */ var flarum_forum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_helpers_icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/components/CommentPost */ "flarum/forum/components/CommentPost");
/* harmony import */ var flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_4__);





function MakeTree() {
  (0,flarum_forum_extend__WEBPACK_IMPORTED_MODULE_0__.override)((flarum_forum_components_Post__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'config', function () {
    var $actions = this.$('.Post-actions');
    var $controls = this.$('.Post-controls');
    $controls.on('click tap', function () {
      $(this).toggleClass('open');
    });
  });
  (0,flarum_forum_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_forum_components_Post__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'view', function (vdom) {
    var id = this.attrs.post.id();

    if (!app.cache.trees) {
      app.cache.trees = {};
      app.cache.pushTree = {};
    }

    if (!app.cache.trees[id]) {
      app.cache.trees[id] = [];
      app.cache.pushTree[id] = 0;
    }

    if (app.cache.trees[id].length > 0) {
      vdom.children.push(m("div", {
        className: "CommentTree",
        id: id
      }, flarum_forum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default()('fas fa-reply'), app.cache.trees[id].filter(function (thing, index, self) {
        return self.findIndex(function (t) {
          return t.id() === thing.id();
        }) === index;
      }).sort(function (a, b) {
        return a.createdAt() - b.createdAt();
      }).map(function (post) {
        return flarum_forum_components_CommentPost__WEBPACK_IMPORTED_MODULE_4___default().component({
          post: post
        });
      })));
    }

    console.log(this.attrs.post.data.attributes.replyCount);

    if (this.attrs.post.data.attributes.replyCount > app.cache.trees[id].length - app.cache.pushTree[id] || app.cache.trees[id].length === 0 && this.attrs.post.data.attributes.replyCount) {
      var count = this.attrs.post.data.attributes.replyCount - app.cache.trees[id].length + app.cache.pushTree[id];
      var include = 'discussion,user,user.groups,hiddenUser,editedUser,';

      if (app.initializers.has('fof-gamification')) {
        include += 'user.ranks,upvotes,';
      }

      if (app.initializers.has('fof/reactions')) {
        include += 'reactions';
      }

      vdom.children.push(flarum_forum_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
        className: 'Button Button--link KuazaPostComment--show',
        icon: 'fas fa-caret-down',
        onclick: function onclick() {
          app.store.find('trees', id, {
            include: include.replace(/,\s*$/, "")
          }).then(function (response) {
            delete response.payload;
            [].push.apply(app.cache.trees[id], response);
            m.redraw();
          });
        }
      }, app.translator.trans('kuaza-ext-hadilutfen.forum.post.show_' + (count > 1 ? 'replies' : 'reply'), {
        count: count
      })));
      app.store.find('trees', id, {
        include: include.replace(/,\s*$/, "")
      }).then(function (response) {
        delete response.payload;
        [].push.apply(app.cache.trees[id], response);
        m.redraw();
      });
    }
  });
}

function autoShowEvergreen() {
  var elems = document.getElementsByClassName("KuazaPostComment--show");

  for (var i = 0; i < elems.length; i++) {
    if (elems[i].tagName.toLowerCase() === "button") elems[i].click();
  }
}

window.onload = function () {
  setInterval(autoShowEvergreen(), 1500);
};

/***/ }),

/***/ "./src/forum/index.ts":
/*!****************************!*\
  !*** ./src/forum/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MakeTree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MakeTree */ "./src/forum/MakeTree.js");


flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('kilicselcuk/flarum-ext-postcomments', function () {
  (0,_MakeTree__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/Button":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['forum/components/Button']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/Button'];

/***/ }),

/***/ "flarum/forum/components/CommentPost":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['forum/components/CommentPost']" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/CommentPost'];

/***/ }),

/***/ "flarum/forum/components/Post":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['forum/components/Post']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/Post'];

/***/ }),

/***/ "flarum/forum/extend":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['forum/extend']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/extend'];

/***/ }),

/***/ "flarum/forum/helpers/icon":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['forum/helpers/icon']" ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/helpers/icon'];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.ts");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map