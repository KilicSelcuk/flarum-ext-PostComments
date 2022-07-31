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
/* harmony import */ var flarum_forum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/helpers/icon */ "flarum/forum/helpers/icon");
/* harmony import */ var flarum_forum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_helpers_icon__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _component_CommentPostCopy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/CommentPostCopy */ "./src/forum/component/CommentPostCopy.js");


 //import CommentPost from 'flarum/components/CommentPost';
//import CommentPostCopy from './component/CommentPostCopyOriginal';


function MakeTree() {
  (0,flarum_forum_extend__WEBPACK_IMPORTED_MODULE_0__.extend)((flarum_forum_components_Post__WEBPACK_IMPORTED_MODULE_1___default().prototype), 'view', function (vdom) {
    var id = this.attrs.post.id();

    if (!app.cache.trees) {
      app.cache.trees = {};
      app.cache.pushTree = {};
    }

    if (!app.cache.trees[id]) {
      app.cache.trees[id] = [];
      app.cache.pushTree[id] = 0;
    } // cevap a yapilan yorumlarin ust katmanini yukler container


    if (app.cache.trees[id].length > 0) {
      var count = this.attrs.post.data.attributes.replyCount;
      vdom.children.push(m("div", {
        className: "CommentTree topreply",
        id: id
      }, m("h4", {
        className: "postcommentstitle"
      }, flarum_forum_helpers_icon__WEBPACK_IMPORTED_MODULE_2___default()('fas fa-comments'), " ", app.translator.trans('kilicselcuk-postcomments.forum.post.show_' + (count > 1 ? 'replies' : 'reply'), {
        count: count
      })), app.cache.trees[id].filter(function (thing, index, self) {
        return self.findIndex(function (t) {
          return t.id() === thing.id();
        }) === index;
      }).sort(function (a, b) {
        return a.createdAt() - b.createdAt();
      }).map(function (post) {
        //console.dir(post);
        return _component_CommentPostCopy__WEBPACK_IMPORTED_MODULE_3__["default"].component({
          post: post
        });
      })));
    }

    if (this.attrs.post.data.attributes.replyCount > app.cache.trees[id].length - app.cache.pushTree[id] || app.cache.trees[id].length === 0 && this.attrs.post.data.attributes.replyCount) {
      app.store.find('trees', id).then(function (response) {
        delete response.payload;
        [].push.apply(app.cache.trees[id], response);
        m.redraw();
      });
    }
  });
}

/***/ }),

/***/ "./src/forum/component/CommentPostCopy.js":
/*!************************************************!*\
  !*** ./src/forum/component/CommentPostCopy.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CommentPostCopy)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Post */ "flarum/components/Post");
/* harmony import */ var flarum_components_Post__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Post__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/utils/classList */ "flarum/common/utils/classList");
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_PostUser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/PostUser */ "flarum/components/PostUser");
/* harmony import */ var flarum_components_PostUser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_PostUser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_components_PostMeta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/components/PostMeta */ "flarum/components/PostMeta");
/* harmony import */ var flarum_components_PostMeta__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_components_PostMeta__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_components_PostEdited__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/components/PostEdited */ "flarum/components/PostEdited");
/* harmony import */ var flarum_components_PostEdited__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_components_PostEdited__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_components_EditPostComposer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/components/EditPostComposer */ "flarum/components/EditPostComposer");
/* harmony import */ var flarum_components_EditPostComposer__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_components_EditPostComposer__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/common/helpers/listItems */ "flarum/common/helpers/listItems");
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var flarum_components_ComposerPostPreview__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/components/ComposerPostPreview */ "flarum/components/ComposerPostPreview");
/* harmony import */ var flarum_components_ComposerPostPreview__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_components_ComposerPostPreview__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! flarum/common/helpers/humanTime */ "flarum/common/helpers/humanTime");
/* harmony import */ var flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! flarum/common/helpers/username */ "flarum/common/helpers/username");
/* harmony import */ var flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var flarum_common_helpers_avatar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! flarum/common/helpers/avatar */ "flarum/common/helpers/avatar");
/* harmony import */ var flarum_common_helpers_avatar__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_avatar__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var flarum_forum_helpers_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! flarum/forum/helpers/icon */ "flarum/forum/helpers/icon");
/* harmony import */ var flarum_forum_helpers_icon__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_helpers_icon__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! flarum/common/components/Link */ "flarum/common/components/Link");
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_16__);

















/**
 * The `CommentPost` component displays a standard `comment`-typed post. This
 * includes a number of item lists (controls, header, and footer) surrounding
 * the post's HTML content.
 *
 * ### Attrs
 *
 * - `post`
 */

var CommentPostCopy = /*#__PURE__*/function (_Post) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(CommentPostCopy, _Post);

  function CommentPostCopy() {
    return _Post.apply(this, arguments) || this;
  }

  var _proto = CommentPostCopy.prototype;

  _proto.oninit = function oninit(vnode) {
    var _this = this;

    _Post.prototype.oninit.call(this, vnode);
    /**
     * If the post has been hidden, then this flag determines whether or not its
     * content has been expanded.
     *
     * @type {Boolean}
     */


    this.revealContent = false;
    /**
     * Whether or not the user hover card inside of PostUser is visible.
     * The property must be managed in CommentPost to be able to use it in the subtree check
     *
     * @type {Boolean}
     */

    this.cardVisible = false;
    this.subtree.check(function () {
      return _this.cardVisible;
    }, function () {
      return _this.isEditing();
    }, function () {
      return _this.revealContent;
    });
  };

  _proto.content = function content() {
    var user = this.attrs.post.user(); //console.dir(humanTime(this.attrs.post.createdAt()));

    var posthtmlclear = this.attrs.post.contentHtml().replace(/(<p>|<\/p>|<br>)/gi, "");
    return _Post.prototype.content.call(this).concat([m("div", {
      className: "postcommentsDIV"
    }, this.isEditing() ? m((flarum_components_ComposerPostPreview__WEBPACK_IMPORTED_MODULE_11___default()), {
      className: "Post-preview",
      composer: (flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().composer)
    }) : m.trust(posthtmlclear), " -", m((flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_16___default()), {
      className: "postcommentslink",
      href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().route.user(user)
    }, flarum_common_helpers_avatar__WEBPACK_IMPORTED_MODULE_14___default()(user || null, {
      className: "postcommentsavatar"
    }), " ", flarum_common_helpers_username__WEBPACK_IMPORTED_MODULE_13___default()(user)), " ", flarum_common_helpers_humanTime__WEBPACK_IMPORTED_MODULE_12___default()(this.attrs.post.createdAt()))]);
  };

  _proto.refreshContent = function refreshContent() {
    var contentHtml = this.isEditing() ? '' : this.attrs.post.contentHtml(); // If the post content has changed since the last render, we'll run through
    // all of the <script> tags in the content and evaluate them. This is
    // necessary because TextFormatter outputs them for e.g. syntax highlighting.

    if (this.contentHtml !== contentHtml) {
      this.$('.Post-body script').each(function () {
        var script = document.createElement('script');
        script.textContent = this.textContent;
        Array.from(this.attributes).forEach(function (attr) {
          return script.setAttribute(attr.name, attr.value);
        });
        this.parentNode.replaceChild(script, this);
      });
    }

    this.contentHtml = contentHtml;
  };

  _proto.oncreate = function oncreate(vnode) {
    _Post.prototype.oncreate.call(this, vnode);

    this.refreshContent();
  };

  _proto.onupdate = function onupdate(vnode) {
    _Post.prototype.onupdate.call(this, vnode);

    this.refreshContent();
  };

  _proto.isEditing = function isEditing() {
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().composer.bodyMatches((flarum_components_EditPostComposer__WEBPACK_IMPORTED_MODULE_7___default()), {
      post: this.attrs.post
    });
  };

  _proto.elementAttrs = function elementAttrs() {
    var post = this.attrs.post;

    var attrs = _Post.prototype.elementAttrs.call(this);

    attrs.className = (attrs.className || '') + ' ' + flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_3___default()({
      CommentPostReply: true,
      topreply: true,
      'Post--renderFailed': post.renderFailed(),
      'Post--hidden': post.isHidden(),
      'Post--edited': post.isEdited(),
      revealContent: this.revealContent,
      editing: this.isEditing()
    });
    if (this.isEditing()) attrs['aria-busy'] = 'true'; //console.log(attrs);

    return attrs;
  }
  /**
   * Toggle the visibility of a hidden post's content.
   */
  ;

  _proto.toggleContent = function toggleContent() {
    this.revealContent = !this.revealContent;
  };

  return CommentPostCopy;
}((flarum_components_Post__WEBPACK_IMPORTED_MODULE_2___default()));



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

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/Link":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/components/Link']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Link'];

/***/ }),

/***/ "flarum/common/helpers/avatar":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/avatar']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/avatar'];

/***/ }),

/***/ "flarum/common/helpers/humanTime":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/humanTime']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/humanTime'];

/***/ }),

/***/ "flarum/common/helpers/listItems":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/listItems']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/listItems'];

/***/ }),

/***/ "flarum/common/helpers/username":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/username']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/username'];

/***/ }),

/***/ "flarum/common/utils/ItemList":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['common/utils/ItemList']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/ItemList'];

/***/ }),

/***/ "flarum/common/utils/classList":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/utils/classList']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/classList'];

/***/ }),

/***/ "flarum/components/ComposerPostPreview":
/*!***********************************************************************!*\
  !*** external "flarum.core.compat['components/ComposerPostPreview']" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/ComposerPostPreview'];

/***/ }),

/***/ "flarum/components/EditPostComposer":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/EditPostComposer']" ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/EditPostComposer'];

/***/ }),

/***/ "flarum/components/Post":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Post']" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/Post'];

/***/ }),

/***/ "flarum/components/PostEdited":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/PostEdited']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/PostEdited'];

/***/ }),

/***/ "flarum/components/PostMeta":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/PostMeta']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/PostMeta'];

/***/ }),

/***/ "flarum/components/PostUser":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/PostUser']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['components/PostUser'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

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

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

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