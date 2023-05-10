import React from "react";
import s from "./Pagination.module.css";
// import { useState } from "react";
import { useEffect } from "react";

export const Pagination = ({

  setCurrentPage,
  currentPage,
  pageNumbers,
  arr
}) => {
  // const pageNumbers = [];

  // for (let i = 1; i <= Math.ceil(totalEmoji / emojiPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  // const [arr, setArr] = useState([]);
  // useEffect(() => {
  //   let newArr = [...pageNumbers];

  //   let dostInitial = " ...";
  //   let dotsLeft = "...";
  //   let dotsEnd = "... ";
  //   let dotsRight = " ... ";

  //   if (pageNumbers.length > 3) {
      
  //     if (currentPage >= 1 && currentPage <= 3) {
  //       newArr = [1, 2, 3, 4, dotsEnd, pageNumbers.length];
  //     } else if (currentPage === 4) {
  //       const sliced = pageNumbers.slice(0, 5);
  //       newArr = [...sliced, dostInitial, pageNumbers.length];
  //     } else if (currentPage > 4 && currentPage < pageNumbers.length - 2) {
  //       const sliced1 = pageNumbers.slice(currentPage - 2, currentPage);
  //       const sliced2 = pageNumbers.slice(currentPage, currentPage + 1);
  //       newArr = [
  //         1,
  //         dotsLeft,
  //         ...sliced1,
  //         ...sliced2,
  //         dotsRight,
  //         pageNumbers.length,
  //       ];
  //     } else if (currentPage > pageNumbers.length - 3) {
  //       const sliced3 = pageNumbers.slice(pageNumbers.length - 4);
  //       newArr = [1, dostInitial, ...sliced3];
  //     } else if (currentPage === dostInitial) {
  //       setCurrentPage(newArr[3] - 3);
  //     } else if (currentPage === dotsEnd) {
  //       setCurrentPage(newArr[newArr.length - 3] + 1);
  //     } else if (currentPage === dotsLeft) {
  //       setCurrentPage(arr[3] - 2);
  //     } else if (currentPage === dotsRight) {
  //       setCurrentPage(arr[3] + 2);
  //     }
  //   }

  //   // setInterval(function () {
  //   //   window.scrollTo(0, document.body.scrollHeight);
  //   // }, 500);
  //   window.scrollTo(0, document.body.scrollHeight);

  //   setArr(newArr);
  // }, [setCurrentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [currentPage]);

  return (
    <div className={s.pagination_cont}>
      <button
        onClick={() => setCurrentPage((prev) => (prev === 1 ? prev : prev - 1))}
        className={currentPage === 1 ? s.disabled : null}
      >
        Prev
      </button>
      {arr.map((page, index) => (
        <button
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? s.active : null}
          key={index}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() =>
          setCurrentPage((prev) => (prev === pageNumbers.length ? prev : prev + 1))
        }
        className={currentPage === pageNumbers.length ? s.disabled : null}
      >
        Next
      </button>
    </div>
  );
};
