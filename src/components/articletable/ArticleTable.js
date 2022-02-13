import "./ArticleTable.css";
import React, { useState, useEffect } from "react";
import { ReactComponent as Arrowright } from "../../icons/Arrowright.svg";
import CSSProps from "../../data/constants/CSSProps";

const ArticleTable = ({
  data,
  RenderComponent,
  title,
  pageLimit,
  dataLimit,
}) => {
  const [datasource, setDatasource] = useState(data);
  const [pages, setPages] = useState(Math.ceil(datasource.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    setDatasource(data);
    setPages(Math.ceil(datasource.length / dataLimit));
    if (currentPage > pages) setCurrentPage(1);
  }, [data, currentPage, pages, dataLimit, datasource.length]);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return datasource.slice(startIndex, endIndex);
  };
  const getPaginationGroup = () => {
    if (pages === 0) setPages(1);
    let x = Math.floor(pageLimit / 2);

    if (pages <= pageLimit || currentPage <= x) {
      return Array.from(Array(pages).keys()).map((idx) => idx + 1);
    } else {
      var y = pages - Math.ceil(pageLimit / 2);
      if (currentPage >= y) {
        return Array.from(Array(pages).keys()).map((idx) => pages - idx);
      } else {
        return Array.from(Array(pageLimit).keys()).map(
          (idx) => currentPage - x + idx
        );
      }
    }
  };

  if (datasource.length === 0)
 {
    return (
      <div className={CSSProps.ArticleTable.Area + CSSProps.Body.PaddingLR}>
        
        Geen data beschikbaar
      </div>
    );
    }
  return (
    <>
      <div className={CSSProps.Body.TRow + CSSProps.Body.THeader}>
        <h2>{title}</h2>
      </div>
      <div className={CSSProps.Body.TRow + CSSProps.Body.TBody}>
        {getPaginatedData().map((d, idx) => (
          <RenderComponent key={idx} datasource={d} />
        ))}
      </div>
      <div className={CSSProps.Body.TRow + CSSProps.Body.TFooter}>
        <div className={CSSProps.ArticleTable.Pagination}>
          {/* previous button */}
          <button
            onClick={goToPreviousPage}
            className={
              CSSProps.ArticleTable.Prev +
              `${
                currentPage === 1
                  ? CSSProps.ArticleTable.Disabled
                  : CSSProps.Empty
              }`
            }
          >
            <p className={CSSProps.Body.Rotate180 + CSSProps.Body.Logo}>
              <Arrowright />
            </p>
          </button>

          {/* show page numbers */}
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={
                CSSProps.ArticleTable.PaginationItem +
                ` ${currentPage === item ? CSSProps.ArticleTable.Active : null}`
              }
            >
              <span>{item}</span>
            </button>
          ))}

          {/* next button */}
          <button
            onClick={goToNextPage}
            className={
              CSSProps.ArticleTable.Next +
              ` ${
                currentPage === pages
                  ? CSSProps.ArticleTable.Disabled
                  : CSSProps.Empty
              }`
            }
          >
            <p className={CSSProps.Body.Logo}>
              <Arrowright />
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default ArticleTable;
