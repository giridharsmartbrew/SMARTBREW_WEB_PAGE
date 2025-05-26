import React from 'react';
import ProductsHero from '../components/products/ProductsHero';
import ProductGrid from '../components/products/ProductGrid';
import ProductFeatures from '../components/products/ProductFeatures';
import ProductTestimonial from '../components/products/ProductTestimonial';

const ProductsPage: React.FC = () => {
  return (
    <div>
      <ProductsHero />
      <ProductGrid />
      <ProductFeatures />
      <ProductTestimonial />
    </div>
  );
};

export default ProductsPage;