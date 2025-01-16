import axios from "axios";
function ProductTemplate(props) {

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        alert('You need to log in first!');
        return;
    }

    try {
        const profileResponse = await axios.get('http://localhost:3001/api/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
        }); 
        const currentCardDetails = profileResponse.data.cardDetails || { items: [], total: 0 };

        currentCardDetails.items.push({
            name: product.name,
            price: product.price,
        });
        let sumOfPrices =0;
        currentCardDetails.items.map((el)=>sumOfPrices+=el.price)
        currentCardDetails.total=sumOfPrices
        currentCardDetails.total += parseFloat(product.price);


        const updateResponse = await axios.put(
            'http://localhost:3001/api/user/addToCard',
            { cardDetails: currentCardDetails },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (updateResponse.status === 200) {
            alert('Product added to cart successfully!');
            console.log('Updated cart:', updateResponse.data.cardDetails);
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart. Please try again.');
    }
};
  return (
    <div className="products-container">
        <img src={props.imageUrl} alt="pc Image" className="product-image" />
        <h1 className="product-name">{props.name}</h1>
        <p className="product-description">{props.price}</p>
        <p className="product-stock">{props.stock}</p>
        <input type="button" className="btn-add" value="add to card" onClick={handleAddToCart}/>
        
    </div>
  )
}

export default ProductTemplate

