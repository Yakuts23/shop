import React from 'react';

const ProductItem = ({ product, addToCart }) => {
    return (
        <div className="product-item">
            {product.images.map((image, index) => (
                <img key={index} src={image} alt={`${product.name} ${index + 1}`} />
            ))}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductItem;
