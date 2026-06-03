import { Product } from '@/domain/entities/product';
import ProductCard from '@/components/ProductCard';

interface ProductGridProps {
  readonly products: ReadonlyArray<Product>;
}

export default function ProductGrid({ products }: ProductGridProps) {
  const displayProducts = products.slice(0, 20);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {displayProducts.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          thumbnail={product.thumbnail}
          sku={product.sku}
        />
      ))}
    </div>
  );
}
