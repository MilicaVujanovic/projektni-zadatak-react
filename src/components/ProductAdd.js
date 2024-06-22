import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import classes from "./ProductAdd.module.css";
const ProductAdd = () => {
  const { addProduct } = useContext(ProductContext);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();
  const handleAddProduct = (e) => {
    e.preventDefault();
    //Unosim nove podatke sa ogranicenjima
    const formattedId = `#${id}`;
    const formattedDesctiption =
      description.length > 20 ? `${description.slice(0, 20)}...` : description;
    const formattedRating = `$${parseFloat(rating).toFixed(2)}`;
    const formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1);
    let formattedStock = "";
    if (stock > 0 && stock <= 100) {
      formattedStock = "Available";
    } else if (stock <= 0) {
      formattedStock = "Not available";
    } else {
      formattedStock = "Sale";
    }
    const newProduct = {
      id: formattedId,
      title: title,
      description: formattedDesctiption,
      category: formattedCategory,
      rating: formattedRating,
      stock: formattedStock,
    };
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Product added successfully", data);
        addProduct(newProduct);
        navigate("/");
      })
      .catch((error) => console.log("Error adding product:", error));
  };

  return (
    <div className={classes.back}>
      
      <form onSubmit={handleAddProduct} className={classes.formContainer}>
        <label>ID:</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />

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
          onChange={(e) => setStock(e.target.value)
          }
          className={classes.stock}
        />
        <button type="submit" className={classes.btn}>Add Product</button>
      </form>
    </div>
  );
};

export default ProductAdd;
