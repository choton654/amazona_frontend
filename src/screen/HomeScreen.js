import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productAction';

const HomeScreen = () => {
  const productList = useSelector((store) => store.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return loading ? (
    <div> loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <ul className='products'>
        {products.map((product) => (
          <li>
            <div className='product'>
              <Link to={`/products/${product._id}`}>
                {' '}
                <img
                  className='product-img'
                  src={product.image}
                  alt={product.name}
                />
              </Link>

              <div className='product-name'>
                <Link to={`/products/${product._id}`}>{product.name}</Link>
              </div>
              <div className='product-brand'>{product.brand}</div>
              <div className='price'>${product.price}</div>
              <div className='product-rating'>
                {product.rating} Stars ({product.numReviews} reviews)
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomeScreen;
