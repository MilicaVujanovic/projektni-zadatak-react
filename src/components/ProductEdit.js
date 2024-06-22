import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from './ProductEdit.module.css';
import { ProductContext } from "../context/ProductContext";

const ProductEdit = () => {
  const {id} = useParams();
  const { items, updateProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    const item = items.find((item) => item.id === parseInt(id));
    if (item) {
      setProduct(item);
      setTitle(item.title);
      setDescription(item.description);
      setCategory(item.category);
      setRating(item.rating);
      setStock(item.stock);
    }
  }, [id, items]);

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: parseInt(id),
      title: title,
      description: description,
      category: category,
      rating: rating,
      stock: parseInt(stock),
    };

    fetch(`https://dummyjson.com/products/${id}`, { //Put metod prilikom postavljanja editovanog producta ne radi kako bi trebalo
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        updateProduct(data);
        navigate("/");
      })
      .catch((error) => console.log("Error updating product", error));
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className={classes.editForm}>
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdateProduct}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Rating</label>
        <input
          type="text"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <label>Stock</label>
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProductEdit;
