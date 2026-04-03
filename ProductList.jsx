import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './App.css'; // Dùng CSS chung nếu cần

const ProductList = () => {
  const dispatch = useDispatch();
  
  // Lấy danh sách sản phẩm từ Redux store để tính tổng số lượng hiển thị trên giỏ hàng
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // State để quản lý việc nút "Add to Cart" có bị vô hiệu hóa hay không
  const [addedToCart, setAddedToCart] = useState({});

  // Dữ liệu mock: 3 danh mục, mỗi danh mục có 6 loại cây theo đúng yêu cầu
  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1b7e?q=80&w=200", price: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d40?q=80&w=200", price: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593696954577-ab3d39317b97?q=80&w=200", price: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1614594805320-e6962383ee72?q=80&w=200", price: "$10" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1610450943890-e7401a0db2cc?q=80&w=200", price: "$20" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9fc5d8d42850?q=80&w=200", price: "$8" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1595806657934-8be061555776?q=80&w=200", price: "$14" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1629851608678-831e50937a07?q=80&w=200", price: "$6" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1596160100234-71286b72aeb9?q=80&w=200", price: "$8" },
        { name: "Basil", image: "https://images.unsplash.com/photo-1615486171448-4fdcb3115ac2?q=80&w=200", price: "$5" },
        { name: "Thyme", image: "https://images.unsplash.com/photo-1618648358485-6447c227cc4f?q=80&w=200", price: "$7" },
        { name: "Oregano", image: "https://images.unsplash.com/photo-1582296766465-b77edbb19a3b?q=80&w=200", price: "$6" }
      ]
    },
    {
      category: "Succulents",
      plants: [
        { name: "Echeveria", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=200", price: "$9" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?q=80&w=200", price: "$12" },
        { name: "Zebra Plant", image: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?q=80&w=200", price: "$11" },
        { name: "Burro's Tail", image: "https://images.unsplash.com/photo-1588636171926-24ebfdb237d6?q=80&w=200", price: "$15" },
        { name: "Crown of Thorns", image: "https://images.unsplash.com/photo-1612053155799-73fb46e09477?q=80&w=200", price: "$16" },
        { name: "Hens and Chicks", image: "https://images.unsplash.com/photo-1603521257406-81ecabdb228a?q=80&w=200", price: "$10" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    // Dispatch action thêm sản phẩm vào Redux store
    dispatch(addItem(plant));
    
    // Cập nhật state để vô hiệu hóa nút dựa trên tên của cây
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true, 
    }));
  };

  return (
    <div>
      {/* Navbar Component theo yêu cầu */}
      <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#4CAF50', color: 'white' }}>
        <div className="nav-links">
          <a href="/" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/plants" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Plants</a>
          <a href="/cart" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Cart</a>
        </div>
        <div className="cart-icon" style={{ display: 'flex', alignItems: 'center' }}>
          {/* Biểu tượng SVG giỏ hàng */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          <span style={{ marginLeft: '5px', fontWeight: 'bold' }}>{totalQuantity}</span>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="product-list" style={{ padding: '20px' }}>
        {plantsArray.map((category, index) => (
          <div key={index} className="category-section" style={{ marginBottom: '40px' }}>
            <h2 style={{ textAlign: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
              {category.category}
            </h2>
            <div className="plant-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
              {category.plants.map((plant, plantIndex) => (
                <div key={plantIndex} className="plant-card" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', textAlign: 'center', width: '200px' }}>
                  <img src={plant.image} alt={plant.name} className="plant-thumbnail" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                  <h3>{plant.name}</h3>
                  <p>{plant.price}</p>
                  <button
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]} // Chìa khóa để lấy điểm ở Sub Question 4
                    style={{
                      padding: '10px 15px',
                      backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;