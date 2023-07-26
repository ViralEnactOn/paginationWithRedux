/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAddNewPostMutation } from "./services/apiSlice";
import ReactPaginate from "react-paginate";
import { ThreeCircles } from "react-loader-spinner";
function App() {
  const [addNewPost, response] = useAddNewPostMutation();
  const [allData, setAllData] = useState([]);
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState("");
  const pageCount = Math.ceil(count / itemsPerPage);
  const [loader, setLoader] = useState(true);

  const fetchData = (pageNo) => {
    setLoader(true);
    let formData = {
      perPage: itemsPerPage,
      page: pageNo,
    };
    addNewPost(formData)
      .unwrap()
      .then((res) => {
        console.log("Response", res.data.total);
        setCount(res.data.total);
        setAllData(res.data.deals);
        setLoader(false);
      })
      .then((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  // Pagination logic
  const handlePageClick = ({ selected }) => {
    console.log("selected", selected);
    setCurrentPage(selected);
    fetchData(selected);
  };

  return (
    <>
      <main className="flex justify-center min-w-max ">
        <div className="container">
          {loader && (
            <>
              <div className="flex justify-center h-screen items-center">
                <ThreeCircles
                  height="100"
                  width="100"
                  color="#4d94a9"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor=""
                  innerCircleColor=""
                  middleCircleColor=""
                />
              </div>
            </>
          )}
          <div className="flex  justify-evenly mt-12">
            {loader === false &&
              allData.length !== 0 &&
              allData.map((data, index) => {
                return (
                  <div key={index} className="bg-cyan-100 rounded-lg  r p-5">
                    <div className="flex justify-center">
                      <img
                        src={data.image}
                        alt={`Image ${index}`}
                        className="h-36 w-36 bg-cyan-200 rounded-lg "
                      />
                    </div>
                    <div className="mt-5 flex justify-center w-36">
                      {data.title}
                    </div>
                  </div>
                );
              })}
          </div>
          {loader === false && (
            <div className="flex justify-center mt-5">
              <ReactPaginate
                className="flex justify-evenly w-40"
                // breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                // previousLabel="< previous"
                forcePage={currentPage}
                // containerClassName="pagination"
                // activeClassName="active"
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
export default App;
