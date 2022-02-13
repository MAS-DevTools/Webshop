import CSSProps from "../data/constants/CSSProps";
import LocalStorageProps from "../data/constants/LocalStorageProps";
import { Validator } from "../tools/Validator";
import DictionaryProps from "../data/constants/DictionaryProps.js";
import ApiEndpoints from "../data/constants/ApiEndpoints";

const minStock = 4;

export class Base {
  SwitchPage(selectedPage) {
    this.SetSelectedPageButton(CSSProps.ID.Home, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Servivedesk, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Cart, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Orders, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.LogOut, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Settings, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Login, selectedPage);
    this.SetSelectedPageButton(CSSProps.ID.Products, selectedPage);
  }

  SetSelectedPageButton(id, selectedPage) {
    const button = document.getElementById(id);
    if (button) {
      button.style.cssText = CSSProps.Style.NavDeselected;
    }

    if (selectedPage === id && button) {
      button.style.cssText = CSSProps.Style.NavSelected;

      let cachedVolumeValue = localStorage.getItem(LocalStorageProps.Volume);
      let playSound = false;
      if (Validator.prototype.isEmpty(cachedVolumeValue)) {
        localStorage.setItem(
          LocalStorageProps.Volume,
          CSSProps.UserControl.VolumeOn
        );
        playSound = true;
      }

      playSound =
        localStorage.getItem(LocalStorageProps.Volume) ===
        CSSProps.UserControl.VolumeOn
          ? true
          : false;

      if (playSound) {
        var promise = document.getElementById(id + CSSProps.ID.Audio).play();

        if (promise !== undefined) {
          promise
            .then((_) => {
              // Autoplay started!
            })
            .catch((error) => {
              // Autoplay was prevented.
            });
          return;
        } else {
          console.log("promise undefined");
        }
      }
    }
  }

  GetStockInfoColor(stock) {
    if (stock === undefined) return CSSProps.Warning.Red;
    else if (stock === 0) return CSSProps.Warning.Red;
    else if (stock < minStock) return CSSProps.Warning.Orange;
    else if (stock >= minStock) return CSSProps.Warning.Green;
  }

  GetProductsEndpoint(category) {
    if (category === undefined || category === null || category === "")
      return ApiEndpoints.GetAllProducts;
    else return ApiEndpoints.GetCategory + category;
  }

  GetStockInfo(stock) {
    if (stock === undefined) return DictionaryProps.NoStockInfo;
    else if (stock === 0) return DictionaryProps.NotInStock;
    else if (stock < 5) return DictionaryProps.StockAlmostEmpty;
    else if (stock >= 5) return DictionaryProps.InStock;
  }

  CanOrder(stock) {
    if (stock === undefined || stock === 0) return CSSProps.Article.Disabled;
    else return "";
  }

  setToken(userToken) {
    if (userToken !== undefined && userToken !== null && userToken !== "") {
      sessionStorage.setItem("token", JSON.stringify(userToken));
    } else {
      sessionStorage.removeItem("token");
    }
  }

  getToken() {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);

    return new Promise((resolve) => {
      if (userToken) {
        this.validateToken(userToken).then((result) => {

          if (result) {
            resolve(userToken);
            return;
          }
          this.setToken(null);
          window.location.reload();
        });
        return;
      }
      resolve(null);
    });
  }

  addToCart(product) {
    try {
      
      if (!product) {
        return;
      }

      if (!product["quantity"] || product["quantity"] === 0) {
        product["quantity"] = 1;
      }

      let cachedCartString = localStorage.getItem("cart");
      let cachedCart = JSON.parse(cachedCartString);

      if (!cachedCart || cachedCart.length === 0) {
        
        var newCart = [];
        newCart.push(product);
        
        localStorage.setItem("cart", JSON.stringify(newCart));
        return;
      }
      
      const objIndex = cachedCart.findIndex((obj) => obj.id === product.id);
      
      if (
        objIndex === -1 ||
        objIndex === undefined ||
        objIndex === null ||
        objIndex === ""
      ) {
        //Update object's name property.
        cachedCart.push(product);
        localStorage.setItem("cart", JSON.stringify(cachedCart));
        return;
      }
     
      cachedCart[objIndex]["quantity"] += product["quantity"];
     
      localStorage.setItem("cart", JSON.stringify(cachedCart));
    } catch (err) {
      //localStorage.setItem("cart", JSON.stringify([product]));

    }
  }

  getCartCount() {
    const cachedCartString = localStorage.getItem("cart");
    const cachedCart = JSON.parse(cachedCartString);
    return cachedCart === undefined ? 0 : cachedCart?.length;
  }

  getCart() {
    const cachedCartString = localStorage.getItem("cart");
    const cachedCart = JSON.parse(cachedCartString);
    return cachedCart;
  }

  validateToken(token) {
    return new Promise((resolve) => {
      var isValid = false;
      fetch(ApiEndpoints.Validatetoken, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          token: token?.token,
          email: token?.email,
        },
      })
        .then((res) => res.json())
        .then((json) => {
         
          isValid = json;
        })
        .finally(() => {
          resolve(isValid);
        })
        .catch((err) => {
          resolve(isValid);
        });
    });
  }
}
