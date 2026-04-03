import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Sub Question 1 & 2: Tính tổng tiền của toàn bộ giỏ hàng
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      // Đảm bảo lấy đúng giá trị cost (hoặc price) và loại bỏ dấu $ để tính toán
      const itemCost = item.cost || item.price || "$0";
      const costNumber = parseFloat(itemCost.toString().replace('$', ''));
      total += costNumber * item.quantity;
    });
    return total;
  };

  // Sub Question 2: Tính tổng tiền cho từng loại cây (dựa theo số lượng)
  const calculateTotalCost = (item) => {
    const itemCost = item.cost || item.price || "$0";
    const costNumber = parseFloat(itemCost.toString().replace('$', ''));
    return costNumber * item.quantity;
  };

  // Sub Question 4: Hàm xử lý nút "+"
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Sub Question 5: Hàm xử lý nút "-"
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Nếu số lượng là 1 mà bấm trừ thì xóa luôn khỏi giỏ hàng
      dispatch(removeItem(item.name));
    }
  };

  // Sub Question 6: Hàm xử lý nút "Delete"
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Sub Question 7: Hàm xử lý nút "Checkout"
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference. Coming Soon!');
  };

  // Sub Question 8: Hàm xử lý nút "Continue Shopping"
  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping(e);
    } else {
      // Điều hướng về trang danh sách sản phẩm nếu không truyền prop
      window.location.href = '/'; 
    }
  };

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      {/* Hiển thị tổng tiền giỏ hàng */}
      <h2 style={{ textAlign: 'center' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div className="cart-items-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {cart.map(item => (
          <div className="cart-item" key={item.name} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '8px', width: '80%', maxWidth: '600px' }}>
            {/* Sub Question 3: Hiển thị hình ảnh, tên và giá gốc */}
            <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px', marginRight: '20px' }} />
            
            <div className="cart-item-details" style={{ flex: 1 }}>
              <h3 className="cart-item-name" style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
              <div className="cart-item-cost" style={{ color: '#555', marginBottom: '10px' }}>Unit Price: {item.cost || item.price}</div>
              
              <div className="cart-item-quantity" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', fontSize: '16px' }}>-</button>
                <span className="cart-item-quantity-value" style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', fontSize: '16px' }}>+</button>
              </div>
              
              <div className="cart-item-total" style={{ fontWeight: 'bold', marginBottom: '10px' }}>Total: ${calculateTotalCost(item)}</div>
              
              <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="continue_shopping_btn" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <button className="get-started-btn" onClick={(e) => handleContinueShopping(e)} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button className="get-started-btn1" onClick={(e) => handleCheckoutShopping(e)} style={{ padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;