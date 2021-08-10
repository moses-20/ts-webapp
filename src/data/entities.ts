export type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
};

export class Orderline {
  constructor(public product: Product, public quantity: number) {}

  getTotal(): number {
    return this.product.price * this.quantity;
  }
}

export class Order {
  private lines = new Map<number, Orderline>();
  constructor(initialLines?: Orderline[]) {
    if (initialLines) {
      initialLines.forEach((ol) => {
        this.lines.set(ol.product.id, ol);
      });
    }
  }

  public addProduct(prod: Product, quantity: number) {
    if (this.lines.has(prod.id)) {
      if (quantity === 0) {
        this.removeProduct(prod.id);
      } else {
        this.lines.get(prod.id)!.quantity += quantity;
      }
    } else {
      this.lines.set(prod.id, new Orderline(prod, quantity));
    }
  }

  public removeProduct(id: number) {
    this.lines.delete(id);
  }

  get orderLines(): Orderline[] {
    return [...this.lines.values()];
  }

  get productCount(): number {
    return [...this.lines.values()].reduce(
      (total, ol) => (total += ol.quantity),
      0
    );
  }

  get total(): number {
    return [...this.lines.values()].reduce(
      (total, ol) => (total += ol.getTotal()),
      0
    );
  }
}
