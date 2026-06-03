export interface Product {
  readonly id: number;
  readonly sku: string;
  readonly title: string;
  readonly description: string;
  readonly category: string;
  readonly price: number;
  readonly thumbnail: string;
}

export interface Category {
  readonly slug: string;
  readonly name: string;
  readonly url: string;
}

export interface SearchResult {
  readonly products: ReadonlyArray<Product>;
  readonly total: number;
  readonly skip: number;
  readonly limit: number;
}
