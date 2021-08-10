export class Orderline {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    getTotal() {
        return this.product.price * this.quantity;
    }
}
export class Order {
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
