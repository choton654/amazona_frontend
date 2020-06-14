import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProducts } from '../actions/productAction';

const ProductScreen = (props) => {
  const [Qty, setQty] = useState(1);
  const productDetails = useSelector((store) => store.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProducts(props.match.params.id));
  }, []);

  function handelAddToCart() {
    props.history.push(`/cart/${props.match.params.id}?qty=${Qty}`);
  }
  return (
    <div>
      <div className='back-to-home'>
        <Link to='/'>Back to home page</Link>
      </div>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='product-details'>
          <div className='product-image'>
            <img src={product.image} alt='pro-img' />
          </div>
          <div className='product-info'>
            <ul>
              <li>
                <div className='productName'>
                  <b>{product.name}</b>
                </div>
              </li>
              <li>
                <div className='productReviews'>
                  {product.rating} Stars {product.numReviews}
                </div>
              </li>
              <li>
                <div className='productPrice'>
                  Price: <b>${product.price}</b>
                </div>
              </li>
              <li>
                <div className='productDecription'>Description:</div>
              </li>
            </ul>
          </div>
          <div className='product-action'>
            <ul>
              <li>Price: {product.price}</li>
              <li>
                Status: {product.countQty > 0 ? 'In Stock' : 'Out of Stock'}
              </li>
              <li>
                Qty:{' '}
                <select value={Qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countQty).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countQty > 0 && (
                  <button onClick={handelAddToCart} className='cart-button'>
                    Add to cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductScreen;
