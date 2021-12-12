import React from "react";
import CustomTable from "../../components/customtable/CustomTable";
import CSSProps from "../../data/constants/CSSProps";
import { ReactComponent as Arrowright } from "../../icons/Arrowright.svg";
import { useParams } from "react-router-dom";
import CategoryNavbar from "../../components/categorynavbar/CategoryNavbar";

const Products = () => {
  
  let { category } = useParams();

  function GetCurrentCategory() {
    if (category === undefined) return "";
    else return category;
  }

  return (
    <div className={CSSProps.Body.Pages}>
      <CategoryNavbar />
      <div className={CSSProps.Products.SearchHeader + CSSProps.Body.PaddingLR}>
        <h1>Zoekopties</h1>
        <h2>
          {" "}
          <p className={CSSProps.Products.Logo}>
            Products
            <Arrowright /> {GetCurrentCategory()}
          </p>{" "}
        </h2>
      </div>

      <CustomTable
        category={GetCurrentCategory()}
      />
    </div>
  );
};

export default Products;
