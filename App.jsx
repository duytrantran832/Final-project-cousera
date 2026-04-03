import React, { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs.jsx';

function App() {
  // State quản lý việc hiển thị trang chủ hay trang danh sách sản phẩm
  const [showProductList, setShowProductList] = useState(false);

  // Hàm xử lý khi bấm nút Get Started
  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="App">
      {!showProductList ? (
        // Hiển thị Landing Page
        <div className="landing-page">
          <div className="landing-content">
            <h1>Welcome to Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            
            <button onClick={handleGetStarted} className="get-started-btn">
              Get Started
            </button>
            
            {/* Nhúng component AboutUs đã tạo ở Task 2 */}
            <AboutUs />
          </div>
        </div>
      ) : (
        // Hiển thị placeholder cho Product List (sẽ làm ở Task 6)
        <div className="product-list-container">
          <h2>Product List (Coming Soon in Task 6)</h2>
        </div>
      )}
    </div>
  );
}

export default App;