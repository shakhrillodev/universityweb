/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/components/itemObserver.js":
/*!********************************************!*\
  !*** ./scripts/components/itemObserver.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function itemObserver(target){
    let observer = new IntersectionObserver( entries =>{
        entries.forEach(entry=>{
            if (entry.isIntersecting) {
                entry.target.classList.add('shown')
                observer.unobserve(entry.target)
            }
        })
    },{
        threshold: 0.9
    })

    target.forEach(obj => {
        obj.forEach((item, i)=>{
            observer.observe(item)
            item.style.transitionDelay = `${i*200}ms`;
        })
        
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (itemObserver);

/***/ }),

/***/ "./scripts/components/observer.js":
/*!****************************************!*\
  !*** ./scripts/components/observer.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function iObserve(target){
    let observer = new IntersectionObserver( entries =>{
        entries.forEach(entry=>{
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('hide')) {
                    entry.target.classList.add('show')
                    observer.unobserve(entry.target)        
                }
                else{
                    entry.target.classList.add('shown')
                    observer.unobserve(entry.target)
                }
            }
        })
    },{
        threshold: 0.9
    })

    target.forEach(obj => {
        observer.observe(obj)
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (iObserve);

/***/ }),

/***/ "./scripts/components/sidebar.js":
/*!***************************************!*\
  !*** ./scripts/components/sidebar.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function sidebar(){
    let sidebar = document.querySelector('.ham');
    let menu = document.querySelector('.good')
    let cover = document.querySelector('.cover')
    sidebar.addEventListener('click', ()=>{
        menu.style.transform = 'translateX(0%)';
        cover.style.display = 'block'
    })
    cover.addEventListener('click', ()=>{
        cover.style.display = 'none'
        menu.style.transform = 'translateX(-100%)';
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sidebar);

/***/ }),

/***/ "./scripts/components/slider.js":
/*!**************************************!*\
  !*** ./scripts/components/slider.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Slider{
    constructor({ slides, slidesContainer, prevBtn, nextBtn, sliderBox, wait }) {
        this.sliderBox = document.querySelector(`.${sliderBox}`);
        this.slides = this.sliderBox.querySelectorAll(`.${slides}`);
        this.wait = wait
        this.slidesContainer = this.sliderBox.querySelector(`.${slidesContainer}`);
        this.prevBtn = this.sliderBox.querySelector(`.${prevBtn}`);
        this.nextBtn = this.sliderBox.querySelector(`.${nextBtn}`);
        this.maxWidth = this.slidesContainer.clientWidth;
        this.width = this.slides[0].clientWidth;
        this.push = 0;
        this.index = 0;
        this.roller = setInterval(this.toNext.bind(this), this.wait);
        this.isDragging = false;
        this.start = 0;
        this.end = 0;
        this.lastCo = 0;
        this.wasDown = false;
      }

    getPlus=()=>{
        this.index++
        if (this.index>this.slides.length-Math.trunc(window.innerWidth/this.width)) {
            this.index=0;
        }
        return this.index;
    }

    getMinus=()=>{
        this.index--
        if (this.index<0) {
            this.index=this.slides.length-Math.trunc(window.innerWidth/this.width)
        }
        return this.index;
    }

    toPrev(){
        this.push = this.getMinus() * this.width;
        this.lastCo = -this.push
        this.slidesContainer.style.transform = `translateX(-${this.push}px)`
    }
    
    toNext() {
        this.push = this.getPlus() * this.width;
        this.lastCo = -this.push
        this.slidesContainer.style.transform = `translateX(-${this.push}px)`
    }

    attacher(items) {
        items.forEach((item)=>{
            item.addEventListener('mouseenter', ()=>{
                clearInterval(this.roller)
            })
            item.addEventListener('mouseleave', ()=>{
                this.roller = setInterval(this.toNext.bind(this), this.wait);
            })
        })        
    }
    
    

    run(){
    this.attacher([this.slidesContainer, this.prevBtn, this.nextBtn])
     
    this.nextBtn.addEventListener('click', ()=>{this.toNext()})
    this.prevBtn.addEventListener('click', ()=>{this.toPrev()})
        
    this.sliderBox.addEventListener('mousedown', (e)=>{
        this.slidesContainer.classList.remove('addTransition')
        this.start = e.clientX
        this.isDragging = true
        this.wasDown = true
    })

    this.sliderBox.addEventListener('mousemove', (e)=>{
        if (this.isDragging) {
            this.end = this.lastCo + e.clientX-this.start
            
            if (this.end <= -this.maxWidth) {
                this.end = -this.maxWidth
            }
            else if (this.end>0) {
                this.end = 0
            }
            this.slidesContainer.style.transform = `translateX(${this.end}px)`
        }
    })

    this.sliderBox.addEventListener('mouseup', (e)=>{
        this.slidesContainer.classList.add('addTransition')
        this.isDragging = false
        this.lastCo = this.end
        if (this.lastCo!==0) {
            this.index = Math.round(-Math.round(this.lastCo)/Math.round(this.width));
        }
        this.wasDown = false
    })

    this.sliderBox.addEventListener('mouseleave', (e)=>{
        this.slidesContainer.classList.add('addTransition')
        this.isDragging = false
        this.lastCo = this.end
        if (this.wasDown) {
            if (this.lastCo!==0) {
                this.index = Math.round(-Math.round(this.lastCo)/Math.round(this.width));
            }
            this.wasDown = false
        }
    })
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Slider);

/***/ }),

/***/ "./scripts/components/topper.js":
/*!**************************************!*\
  !*** ./scripts/components/topper.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function topper(){
    let top = document.querySelector('.to-top')
    top.addEventListener('click', ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (topper);

/***/ }),

/***/ "./scripts/components/window.js":
/*!**************************************!*\
  !*** ./scripts/components/window.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function show() {
    let more = document.querySelector('.btntofollow')
    if (more) {
        window.addEventListener('scroll', ()=>{
            if (window.scrollY > 10) {
                more.style.opacity = '0'
            }else{
                more.style.opacity = '1'
            }
        })
        more.addEventListener('click', ()=>{
            window.scrollTo({
                top: window.innerHeight-100,
                behavior: "smooth"
            })
        })
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (show);

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/observer */ "./scripts/components/observer.js");
/* harmony import */ var _components_itemObserver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/itemObserver */ "./scripts/components/itemObserver.js");
/* harmony import */ var _components_sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/sidebar */ "./scripts/components/sidebar.js");
/* harmony import */ var _components_window__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/window */ "./scripts/components/window.js");
/* harmony import */ var _components_topper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/topper */ "./scripts/components/topper.js");
/* harmony import */ var _components_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/slider */ "./scripts/components/slider.js");







try {
    (0,_components_window__WEBPACK_IMPORTED_MODULE_3__["default"])()
    ;(0,_components_topper__WEBPACK_IMPORTED_MODULE_4__["default"])()
} catch (error) {
    
}

(0,_components_itemObserver__WEBPACK_IMPORTED_MODULE_1__["default"])([[...document.querySelectorAll('.home0 .item')], [...document.querySelectorAll('.home1 .item')]])
;(0,_components_observer__WEBPACK_IMPORTED_MODULE_0__["default"])([...document.querySelectorAll('.hidden')]);
(0,_components_observer__WEBPACK_IMPORTED_MODULE_0__["default"])([...document.querySelectorAll('.organisations .box div')])
;(0,_components_sidebar__WEBPACK_IMPORTED_MODULE_2__["default"])()

let perfect = new _components_slider__WEBPACK_IMPORTED_MODULE_5__["default"](
    {slides: 'slide', 
    slidesContainer: 'slides', 
    prevBtn: 'btn-prev', 
    nextBtn: 'btn-next', 
    sliderBox: 'slider',
    wait: 2000}
)

perfect.run()

let perfect2 = new _components_slider__WEBPACK_IMPORTED_MODULE_5__["default"](
    {slides: 'item', 
    slidesContainer: 'slides', 
    prevBtn: 'btn-prev', 
    nextBtn: 'btn-next', 
    sliderBox: 'slider2',
    wait: 3000}
)

perfect2.run()


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map