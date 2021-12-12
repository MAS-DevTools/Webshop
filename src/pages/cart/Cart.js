import "./Cart.css";
import React, { useEffect, useState } from "react";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";
import Paths from "../../data/constants/Paths";

const Cart = () => {
  let [products, setProducts] = useState([]);
  console.log("reloaded cart");
  useEffect(() => {
    Base.prototype.SwitchPage(CSSProps.ID.Cart);
  });

  useEffect(() => {
    setProducts(Base.prototype.getCart());
  }, []);

  function getSubtotal() {
    let subtotal = 0;

    for (let i = 0; i < products.length; i++) {
      subtotal +=
        products[i].quantity * (products[i].price - products[i].discount);
    }
    return subtotal.toFixed(2);
  }

  function getTotalDiscount() {
    let discount = 0;

    for (let i = 0; i < products.length; i++) {
      discount += products[i].quantity * products[i].discount;
    }
    return discount.toFixed(2);
  }

  function handleAmountChange(product) {
    console.log("handleAmountChange");
    console.log(product);

    for (let i = 0; i < products.length; i++) {
      console.log(products[i].id);
      console.log(product.id);
      if (products[i].id === product.id) {
        if (product.quantity === 0) {
          console.log("found artikel");
          products.splice(i, 1);
        } else {
          console.log("found artikel amount " + product.quantity);
          products[i].quantity = product.quantity;
        }
        localStorage.setItem("cart", JSON.stringify(products));
        setProducts(Base.prototype.getCart());
        if (product.quantity === 0) {
          window.location.reload(false);
        }
        return;
      }
    }
  }

  if(products === undefined || products?.length ===0 ||products === null){
    return (
      <section aria-hidden="true" className="PQw8h"><center>Cart is empty</center></section>
    );
  }

  return (
    <div>
      <div className={CSSProps.Body.Pages.Cart.Area}>
        <table border="2">
          <thead>
            <tr>
              <th>Cart</th>
              <th>Product id</th>
              <th>Quantity</th>
              <th>Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>
                    <figure className="cartFigure">
                      <img
                        className="cartImage"
                        src={product.image}
                        alt={Paths.None}
                      />
                    </figure>
                  </td>
                  <td>{product.id}</td>
                  <td>
                    <div
                      className={CSSProps.Counter.Button}
                      onClick={() => {
                        product.quantity =
                          product.quantity >= 999
                            ? 999
                            : parseInt(product.quantity) + 1;
                        handleAmountChange(product);
                      }}
                    >
                      +
                    </div>

                    <input
                      className={CSSProps.Counter.Count}
                      type="text"
                      name={CSSProps.Counter.Area}
                      value={product.quantity}
                      maxLength={3}
                      onChange={(evt) => {
                        const rx_live = /^\d/;
                        if (rx_live.test(evt.target.value)) {
                          var amount = evt.target.value;
                          if (amount <= 999 && amount >= 0)
                            product.quantity = amount;
                        }
                        handleAmountChange(product);
                      }}
                    />
                    <div
                      className={CSSProps.Counter.Button}
                      onClick={() => {
                        product.quantity =
                          product.quantity <= 0
                            ? 0
                            : parseInt(product.quantity) - 1;
                        handleAmountChange(product);
                      }}
                    >
                      -
                    </div>
                  </td>
                  <td>{product.title}</td>
                  <td>{product.price.toFixed(2)}</td>
                  <td>{(product.quantity * product.discount).toFixed(2)}</td>
                  <td>
                    {(
                      product.quantity *
                      (product.price - product.discount)
                    ).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="cartTotal">Subtotal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getSubtotal()}</div>
        <div className="cartTotal">Total discount&nbsp;&nbsp;&nbsp;{getTotalDiscount()}</div>
      </div>
    </div>
  );
};

export default Cart;
