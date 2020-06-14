import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/userAction';
import {
  saveProducts,
  listProducts,
  deleteProduct,
} from '../actions/productAction';

const ProductsScreen = (props) => {
  const [modalVisiable, setModalVisiable] = useState(false);
  const [id, setid] = useState('');
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [catagory, setCatagory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [countQty, setCountQty] = useState('');
  const [rating, setRating] = useState('');
  const [numReviews, setNumReviews] = useState('');
  const [description, setDescription] = useState('');

  const productSave = useSelector((store) => store.productSave);
  const {
    loading: loadingSave,
    error: errorSave,
    success: successSave,
  } = productSave;

  const productDelete = useSelector((store) => store.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productList = useSelector((store) => store.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisiable(false);
    }
    dispatch(listProducts());
  }, [successSave, successDelete]);

  const handelSubmit = (e) => {
    e.preventDefault();
    // console.log(name, brand, price, countQty, description, catagory, image);

    dispatch(
      saveProducts({
        _id: id,
        name,
        brand,
        price,
        countQty,
        description,
        catagory,
        image,
        rating,
        numReviews,
      }),
    );
  };

  const hadelDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const openModal = (product) => {
    setModalVisiable(true);
    setid(product._id);
    setName(product.name);
    setBrand(product.brand);
    setPrice(product.price);
    setCountQty(product.countQty);
    setDescription(product.description);
    setCatagory(product.catagory);
    setImage(product.image);
    setRating(product.rating);
    setNumReviews(product.numReviews);
  };

  return (
    <div className='content content-margined'>
      <div className='product-header'>
        <h3>Products</h3>
        <button className='button-primary' onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      {modalVisiable && (
        <div className='form'>
          <form onSubmit={handelSubmit}>
            <ul className='from-container'>
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={name}
                  id='name'
                  onChange={(e) => setName(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='price'>Price</label>
                <input
                  type='text'
                  name='price'
                  value={price}
                  id='price'
                  onChange={(e) => setPrice(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='image'>Image</label>
                <input
                  type='text'
                  name='image'
                  value={image}
                  id='image'
                  onChange={(e) => setImage(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='brand'>Brand</label>
                <input
                  type='text'
                  name='brand'
                  value={brand}
                  id='brand'
                  onChange={(e) => setBrand(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='countInStock'>CountInStock</label>
                <input
                  type='text'
                  name='countInStock'
                  value={countQty}
                  id='countInStock'
                  onChange={(e) => setCountQty(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='name'>Category</label>
                <input
                  type='text'
                  name='category'
                  value={catagory}
                  id='category'
                  onChange={(e) => setCatagory(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='name'>Rating</label>
                <input
                  type='text'
                  name='category'
                  value={rating}
                  id='category'
                  onChange={(e) => setRating(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='name'>Number of Reviews</label>
                <input
                  type='text'
                  name='category'
                  value={numReviews}
                  id='category'
                  onChange={(e) => setNumReviews(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor='description'>Description</label>
                <textarea
                  name='description'
                  value={description}
                  id='description'
                  onChange={(e) => setDescription(e.target.value)}></textarea>
              </li>
              <li>
                <button type='submit' className='button-primary'>
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button
                  type='button'
                  onClick={() => setModalVisiable(false)}
                  className='button-secondary'>
                  Back
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div className='product-list'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className='button-ed'
                    onClick={() => openModal(product)}>
                    Edit
                  </button>{' '}
                  <button
                    className='button-ed'
                    onClick={() => hadelDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductsScreen;
