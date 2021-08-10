/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data/abtractDataSource.ts":
/*!***************************************!*\
  !*** ./src/data/abtractDataSource.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractDataSource": () => (/* binding */ AbstractDataSource)
/* harmony export */ });
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entities */ "./src/data/entities.ts");

class AbstractDataSource {
    constructor() {
        this._products = [];
        this._categories = new Set();
        this.order = new _entities__WEBPACK_IMPORTED_MODULE_0__.Order();
        this.loading = this.getData();
    }
    async getProducts(sortProp = "id", category) {
        await this.loading;
        return this.selectProducts(this._products, sortProp, category);
    }
    async getData() {
        this._products = [];
        this._categories.clear();
        const rawData = await this.loadProducts();
        rawData.forEach((p) => {
            this._products.push(p);
            this._categories.add(p.category);
        });
    }
    selectProducts(prods, sortProp, category) {
        return prods
            .filter((p) => category === undefined || p.category === category)
            .sort((p1, p2) => (p1[sortProp] < p2[sortProp] ? 1 : 0));
    }
    async getCategories() {
        await this.loading;
        return [...this._categories.values()];
    }
}


/***/ }),

/***/ "./src/data/entities.ts":
/*!******************************!*\
  !*** ./src/data/entities.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Orderline": () => (/* binding */ Orderline),
/* harmony export */   "Order": () => (/* binding */ Order)
/* harmony export */ });
class Orderline {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    getTotal() {
        return this.product.price * this.quantity;
    }
}
class Order {
    constructor(initialLines) {
        this.lines = new Map();
        if (initialLines) {
            initialLines.forEach((ol) => {
                this.lines.set(ol.product.id, ol);
            });
        }
    }
    addProduct(prod, quantity) {
        if (this.lines.has(prod.id)) {
            if (quantity === 0) {
                this.removeProduct(prod.id);
            }
            else {
                this.lines.get(prod.id).quantity += quantity;
            }
        }
        else {
            this.lines.set(prod.id, new Orderline(prod, quantity));
        }
    }
    removeProduct(id) {
        this.lines.delete(id);
    }
    get orderLines() {
        return [...this.lines.values()];
    }
    get productCount() {
        return [...this.lines.values()].reduce((total, ol) => (total += ol.quantity), 0);
    }
    get total() {
        return [...this.lines.values()].reduce((total, ol) => (total += ol.quantity), 0);
    }
}


/***/ }),

/***/ "./src/data/localDataSource.ts":
/*!*************************************!*\
  !*** ./src/data/localDataSource.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalDataSource": () => (/* binding */ LocalDataSource)
/* harmony export */ });
/* harmony import */ var _abtractDataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abtractDataSource */ "./src/data/abtractDataSource.ts");

class LocalDataSource extends _abtractDataSource__WEBPACK_IMPORTED_MODULE_0__.AbstractDataSource {
    loadProducts() {
        return Promise.resolve([
            {
                id: 1,
                name: "P1",
                category: "Watersports",
                description: "P1 (Watersports)",
                price: 3,
            },
            {
                id: 2,
                name: "P2",
                category: "Watersports",
                description: "P2 (Watersports)",
                price: 4,
            },
            {
                id: 3,
                name: "P3",
                category: "Running",
                description: "P3 (Running)",
                price: 5,
            },
            {
                id: 4,
                name: "P4",
                category: "Chess",
                description: "P4 (Chess)",
                price: 6,
            },
            {
                id: 5,
                name: "P5",
                category: "Chess",
                description: "P6 (Chess)",
                price: 7,
            },
        ]);
    }
    storeOrder() {
        console.log("Store Order");
        console.log(JSON.stringify(this.order));
        return Promise.resolve(1);
    }
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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_localDataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/localDataSource */ "./src/data/localDataSource.ts");

async function displayData() {
    let ds = new _data_localDataSource__WEBPACK_IMPORTED_MODULE_0__.LocalDataSource();
    let allProducts = await ds.getProducts("name");
    let categories = await ds.getCategories();
    let chessProducts = await ds.getProducts("name", "chess");
    let result = "";
    allProducts.forEach((p) => (result += `Product: ${p.name}, ${p.category}\n`));
    categories.forEach((c) => (result += `Category: ${c}\n`));
    chessProducts.forEach((p) => ds.order.addProduct(p, 1));
    result += `Order total: $${ds.order.total.toFixed(2)}`;
    return result;
}
displayData().then((res) => console.log(res));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFtQztBQUM1QjtBQUNQO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qiw0Q0FBSztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUJPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzNDeUQ7QUFDbEQsOEJBQThCLGtFQUFrQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDOUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUQ7QUFDekQ7QUFDQSxpQkFBaUIsa0VBQWU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsT0FBTyxJQUFJLFdBQVc7QUFDNUUsc0RBQXNELEVBQUU7QUFDeEQ7QUFDQSwrQkFBK0IsMEJBQTBCO0FBQ3pEO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYmFwcC8uL3NyYy9kYXRhL2FidHJhY3REYXRhU291cmNlLnRzIiwid2VicGFjazovL3dlYmFwcC8uL3NyYy9kYXRhL2VudGl0aWVzLnRzIiwid2VicGFjazovL3dlYmFwcC8uL3NyYy9kYXRhL2xvY2FsRGF0YVNvdXJjZS50cyIsIndlYnBhY2s6Ly93ZWJhcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2ViYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJhcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJhcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJhcHAvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3JkZXIgfSBmcm9tIFwiLi9lbnRpdGllc1wiO1xuZXhwb3J0IGNsYXNzIEFic3RyYWN0RGF0YVNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3Byb2R1Y3RzID0gW107XG4gICAgICAgIHRoaXMuX2NhdGVnb3JpZXMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMub3JkZXIgPSBuZXcgT3JkZXIoKTtcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdGhpcy5nZXREYXRhKCk7XG4gICAgfVxuICAgIGFzeW5jIGdldFByb2R1Y3RzKHNvcnRQcm9wID0gXCJpZFwiLCBjYXRlZ29yeSkge1xuICAgICAgICBhd2FpdCB0aGlzLmxvYWRpbmc7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdFByb2R1Y3RzKHRoaXMuX3Byb2R1Y3RzLCBzb3J0UHJvcCwgY2F0ZWdvcnkpO1xuICAgIH1cbiAgICBhc3luYyBnZXREYXRhKCkge1xuICAgICAgICB0aGlzLl9wcm9kdWN0cyA9IFtdO1xuICAgICAgICB0aGlzLl9jYXRlZ29yaWVzLmNsZWFyKCk7XG4gICAgICAgIGNvbnN0IHJhd0RhdGEgPSBhd2FpdCB0aGlzLmxvYWRQcm9kdWN0cygpO1xuICAgICAgICByYXdEYXRhLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2R1Y3RzLnB1c2gocCk7XG4gICAgICAgICAgICB0aGlzLl9jYXRlZ29yaWVzLmFkZChwLmNhdGVnb3J5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNlbGVjdFByb2R1Y3RzKHByb2RzLCBzb3J0UHJvcCwgY2F0ZWdvcnkpIHtcbiAgICAgICAgcmV0dXJuIHByb2RzXG4gICAgICAgICAgICAuZmlsdGVyKChwKSA9PiBjYXRlZ29yeSA9PT0gdW5kZWZpbmVkIHx8IHAuY2F0ZWdvcnkgPT09IGNhdGVnb3J5KVxuICAgICAgICAgICAgLnNvcnQoKHAxLCBwMikgPT4gKHAxW3NvcnRQcm9wXSA8IHAyW3NvcnRQcm9wXSA/IDEgOiAwKSk7XG4gICAgfVxuICAgIGFzeW5jIGdldENhdGVnb3JpZXMoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubG9hZGluZztcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLl9jYXRlZ29yaWVzLnZhbHVlcygpXTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgT3JkZXJsaW5lIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9kdWN0LCBxdWFudGl0eSkge1xuICAgICAgICB0aGlzLnByb2R1Y3QgPSBwcm9kdWN0O1xuICAgICAgICB0aGlzLnF1YW50aXR5ID0gcXVhbnRpdHk7XG4gICAgfVxuICAgIGdldFRvdGFsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0LnByaWNlICogdGhpcy5xdWFudGl0eTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgT3JkZXIge1xuICAgIGNvbnN0cnVjdG9yKGluaXRpYWxMaW5lcykge1xuICAgICAgICB0aGlzLmxpbmVzID0gbmV3IE1hcCgpO1xuICAgICAgICBpZiAoaW5pdGlhbExpbmVzKSB7XG4gICAgICAgICAgICBpbml0aWFsTGluZXMuZm9yRWFjaCgob2wpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmVzLnNldChvbC5wcm9kdWN0LmlkLCBvbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhZGRQcm9kdWN0KHByb2QsIHF1YW50aXR5KSB7XG4gICAgICAgIGlmICh0aGlzLmxpbmVzLmhhcyhwcm9kLmlkKSkge1xuICAgICAgICAgICAgaWYgKHF1YW50aXR5ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVQcm9kdWN0KHByb2QuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5lcy5nZXQocHJvZC5pZCkucXVhbnRpdHkgKz0gcXVhbnRpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVzLnNldChwcm9kLmlkLCBuZXcgT3JkZXJsaW5lKHByb2QsIHF1YW50aXR5KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlUHJvZHVjdChpZCkge1xuICAgICAgICB0aGlzLmxpbmVzLmRlbGV0ZShpZCk7XG4gICAgfVxuICAgIGdldCBvcmRlckxpbmVzKCkge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMubGluZXMudmFsdWVzKCldO1xuICAgIH1cbiAgICBnZXQgcHJvZHVjdENvdW50KCkge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMubGluZXMudmFsdWVzKCldLnJlZHVjZSgodG90YWwsIG9sKSA9PiAodG90YWwgKz0gb2wucXVhbnRpdHkpLCAwKTtcbiAgICB9XG4gICAgZ2V0IHRvdGFsKCkge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMubGluZXMudmFsdWVzKCldLnJlZHVjZSgodG90YWwsIG9sKSA9PiAodG90YWwgKz0gb2wucXVhbnRpdHkpLCAwKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBYnN0cmFjdERhdGFTb3VyY2UgfSBmcm9tIFwiLi9hYnRyYWN0RGF0YVNvdXJjZVwiO1xuZXhwb3J0IGNsYXNzIExvY2FsRGF0YVNvdXJjZSBleHRlbmRzIEFic3RyYWN0RGF0YVNvdXJjZSB7XG4gICAgbG9hZFByb2R1Y3RzKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlAxXCIsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IFwiV2F0ZXJzcG9ydHNcIixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQMSAoV2F0ZXJzcG9ydHMpXCIsXG4gICAgICAgICAgICAgICAgcHJpY2U6IDMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgICAgIG5hbWU6IFwiUDJcIixcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogXCJXYXRlcnNwb3J0c1wiLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlAyIChXYXRlcnNwb3J0cylcIixcbiAgICAgICAgICAgICAgICBwcmljZTogNCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgICAgICAgbmFtZTogXCJQM1wiLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBcIlJ1bm5pbmdcIixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQMyAoUnVubmluZylcIixcbiAgICAgICAgICAgICAgICBwcmljZTogNSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDQsXG4gICAgICAgICAgICAgICAgbmFtZTogXCJQNFwiLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiBcIkNoZXNzXCIsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUDQgKENoZXNzKVwiLFxuICAgICAgICAgICAgICAgIHByaWNlOiA2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogNSxcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlA1XCIsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6IFwiQ2hlc3NcIixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQNiAoQ2hlc3MpXCIsXG4gICAgICAgICAgICAgICAgcHJpY2U6IDcsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG4gICAgc3RvcmVPcmRlcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJTdG9yZSBPcmRlclwiKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5vcmRlcikpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKDEpO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgTG9jYWxEYXRhU291cmNlIH0gZnJvbSBcIi4vZGF0YS9sb2NhbERhdGFTb3VyY2VcIjtcbmFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlEYXRhKCkge1xuICAgIGxldCBkcyA9IG5ldyBMb2NhbERhdGFTb3VyY2UoKTtcbiAgICBsZXQgYWxsUHJvZHVjdHMgPSBhd2FpdCBkcy5nZXRQcm9kdWN0cyhcIm5hbWVcIik7XG4gICAgbGV0IGNhdGVnb3JpZXMgPSBhd2FpdCBkcy5nZXRDYXRlZ29yaWVzKCk7XG4gICAgbGV0IGNoZXNzUHJvZHVjdHMgPSBhd2FpdCBkcy5nZXRQcm9kdWN0cyhcIm5hbWVcIiwgXCJjaGVzc1wiKTtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBhbGxQcm9kdWN0cy5mb3JFYWNoKChwKSA9PiAocmVzdWx0ICs9IGBQcm9kdWN0OiAke3AubmFtZX0sICR7cC5jYXRlZ29yeX1cXG5gKSk7XG4gICAgY2F0ZWdvcmllcy5mb3JFYWNoKChjKSA9PiAocmVzdWx0ICs9IGBDYXRlZ29yeTogJHtjfVxcbmApKTtcbiAgICBjaGVzc1Byb2R1Y3RzLmZvckVhY2goKHApID0+IGRzLm9yZGVyLmFkZFByb2R1Y3QocCwgMSkpO1xuICAgIHJlc3VsdCArPSBgT3JkZXIgdG90YWw6ICQke2RzLm9yZGVyLnRvdGFsLnRvRml4ZWQoMil9YDtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZGlzcGxheURhdGEoKS50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKHJlcykpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9