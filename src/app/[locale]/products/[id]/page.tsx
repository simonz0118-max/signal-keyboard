import { products } from "@/lib/products";
import ProductDetailClient from "./client";

export const dynamic = "force-static";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}
