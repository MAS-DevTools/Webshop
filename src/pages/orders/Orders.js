import React, { useMemo, useState, useEffect } from "react";
import { Base } from "../../components/Base";
import CSSProps from "../../data/constants/CSSProps";
import Table from "../../components/table/Table";
import ApiEndpoints from "../../data/constants/ApiEndpoints";

const Orders = () => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    Base.prototype.getToken().then((result) => {
      if (token === null || (token && !result)) {
        setToken(result);
      }
    });
  }, [token, setToken]);

  useEffect(() => {
    setTimeout(() => {
      Base.prototype.SwitchPage(CSSProps.ID.Orders);
    }, 500);
  });

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "Cart",
        // First group columns
        columns: [
          {
            Header: "id",
            accessor: "id",
            id: "id",
          },
          {
            Header: "userId",
            accessor: "userId",
            id: "userId",
          },
          {
            Header: "date",
            accessor: "date",
            id: "date",
          },
          {
            Header: "orderDiscount",
            accessor: "orderDiscount",
            id: "orderDiscount",
          },
          {
            Header: "subDiscount",
            accessor: "subDiscount",
            id: "subDiscount",
          },
          {
            Header: "shipTo",
            accessor: "shipTo",
            id: "shipTo",
          },
          {
            Header: "subTotal",
            accessor: "subTotal",
            id: "subTotal",
          },
        ],
      },
      {
        // Second group - Details
        Header: "Products",
        // Second group columns
        columns: [
          {
            Header: "products",
            accessor: (data) =>
              data.products.map((item) => (
                <div key={item.productId}>
                  <span className="tableitems ">
                    Barcode : {item.productId}{" "}
                  </span>
                  <span className="tableitems ">Total : {item.quantity} </span>
                  <span className="tableitems ">Price : {item.price} </span>
                  <span className="tableitems ">
                    Discount : {item.productDiscount}{" "}
                  </span>
                  <span className="tableitems ">
                    Sub : {item.productSubTotal}{" "}
                  </span>
                  <span className="tableitems ">
                    Name : {item.productName}{" "}
                  </span>
                </div>
              )),
            id: "products",
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    if (token) {
      fetch(ApiEndpoints.GetUserCart + token.email, {
        method: ApiEndpoints.Methods.GET,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          email: token.email,
          token: token.token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setData(json);
        });
    }
  }, [token]);

  
  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Orders;
