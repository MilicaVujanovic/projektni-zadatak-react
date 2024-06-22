import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import classes from "./ProductDetails.module.css";
const ProductDetails = () => {
  const { id } = useParams();
  const { items } = useContext(ProductContext);

  const product = items.find((item) => item.id === parseInt(id));
  if (!product) {
    <div>Loading...</div>;
  }
  return (
    <>
      <div className={classes.back}>
        <h2 className={classes.title}>Product Details</h2>
        <ul key={product.id} className={classes.detail}>
          <li>Title: {product.title}</li>
          <li>Description: {product.description}</li>
          <li>Category: {product.category}</li>
          <li>Rating: {product.rating}</li>
          <li>Stock: {product.stock} </li>
        </ul>
      </div>
    </>
  );
};

export default ProductDetails;
