import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import classes from "./ProductList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faEye
} from "@fortawesome/free-solid-svg-icons";
const ProductList = () => {
  const { items, deleteProduct } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://dummyjson.com/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            deleteProduct(id);
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          })
          .catch((error) => {
            console.log("Error deleting product:", error);
            Swal.fire(
              "Error!",
              "There was an error deleting the product.",
              "error"
            );
          });
      }
    });
  };

  if (!items || items.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={classes.header}>

        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={classes.input}
        />

        <Link to="/product/add">
          <button className={classes.but}>Add Product</button>
        </Link>
      </div>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Brand</th>
            <th>Rating</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{`#${item.id}`}</td>
              <td>{item.title}</td>
              <td>
                {item.description.length > 20
                  ? `${item.description.slice(0, 20)}...`
                  : item.description}
              </td>
              <td>{item.brand}</td>
              <td>{`$${parseFloat(item.rating).toFixed(2)}`}</td>
              <td>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </td>
              <td>
                {item.stock > 0 && item.stock <= 100
                  ? "Available"
                  : item.stock <= 0
                  ? "Not available"
                  : "Sale"}
              </td>
              <td>
                <div>
                  <button onClick={() => handleDeleteProduct(item.id)}>
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                  </button>
                  <Link to={`/product/edit/${item.id}`}>
                    <FontAwesomeIcon icon={faEdit} className="icon" />
                  </Link>
                  <Link to={`/product/${item.id}`}>
                    <FontAwesomeIcon icon={faEye} className="icon" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={classes.pagination}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={classes.prev}
        >
          Previous
        </button>
        <span className={classes.page}>{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={classes.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
