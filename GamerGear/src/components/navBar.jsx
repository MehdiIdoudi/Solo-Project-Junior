import { useState, useEffect } from "react";
import Options from "./options.jsx";
import Join from "./joinUs.jsx";
import axios from "axios";
import ProductTemplate from "./productTemplate.jsx";
// import { useNavigate } from "react-router-dom";

function NavBar() {
  const [buttonValue, setButtonValue] = useState("Sign In");
  const [options, setOptions] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [joinUsToggle, setJoinUsToggle] = useState(false);
  const [searchContent, setSearchContent] = useState(""); 

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products/getAllProducts");
        setAllProducts(response.data);
        console.log("Fetched products:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setButtonValue("Options");
    } else {
      setButtonValue("Sign In");
    }
  }, []);

  const handleOptions = () => {
    if (buttonValue === "Options") {
      setOptions(!options);
    }
  };

  const handelClick = () => {
    if (buttonValue === "Options") {
      handleOptions();
    } else if (buttonValue === "Sign In") {
      setJoinUsToggle(!joinUsToggle);
    }
  };


  const filteredProducts = allProducts.filter((e) =>
    e.name.toLowerCase().includes(searchContent.toLowerCase())
  );

  return (
    <>
      <div className="NavBar">
        <div className="logo-Holder">
          <img id="logo-image" src="/images/logo.png" alt="Logo" />
          <input
            type="text"
            placeholder="Search..."
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)} 
          />
          <input
            id="options"
            type="button"
            value={buttonValue}
            onClick={handelClick}
          />
        </div>
      </div>
      {options && <Options />}
      {joinUsToggle && <Join />}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductTemplate
            key={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </div>
    </>
  );
}

export default NavBar;