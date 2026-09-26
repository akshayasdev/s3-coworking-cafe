import { useState } from "react";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import { useCart } from "../../context/useCart.js";

import "./Cart.css";

function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    cartItems,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const tax = cartTotal * 0.05;
  const finalTotal = cartTotal + tax;

  return (
    <>
      {/* Floating Cart Button */}
      <button
        className="floating-cart-button"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingBag size={22} />

        {cartCount > 0 && (
          <span className="cart-count">
            {cartCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="cart-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Cart Drawer */}
      <div
        className={`cart-drawer ${
          isOpen ? "cart-drawer-open" : ""
        }`}
      >
        {/* Header */}
        <div className="cart-header">
          <div>
            <h2>Your Order</h2>
            <p>{cartCount} item(s)</p>
          </div>

          <button
            className="cart-close-button"
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-items">

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={45} />

              <h3>Your cart is empty</h3>

              <p>
                Add your favourite coffee or food
                to your order.
              </p>

              <button
                onClick={() => setIsOpen(false)}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >
                {/* Item Image */}
                <img
                  src={item.image}
                  alt={item.name}
                />

                {/* Item Details */}
                <div className="cart-item-details">
                  <h3>{item.name}</h3>

                  <p>
                    ₹{item.price}
                  </p>

                  {/* Quantity */}
                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      <Minus size={14} />
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      <Plus size={14} />
                    </button>

                  </div>
                </div>

                {/* Remove */}
                <button
                  className="remove-item"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))
          )}

        </div>

        {/* Summary */}
        {cartItems.length > 0 && (
          <div className="cart-summary">

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>
                ₹{finalTotal.toFixed(2)}
              </strong>
            </div>

            <button className="checkout-button">
              Proceed to Checkout
            </button>

            <button
              className="clear-cart-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          </div>
        )}
      </div>
    </>
  );
}

export default Cart;