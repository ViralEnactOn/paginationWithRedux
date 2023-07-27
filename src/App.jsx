/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAddNewPostMutation } from "./services/apiSlice";
import ReactPaginate from "react-paginate";
import { ThreeCircles } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { addData } from "./services/dataStore";
import { useNavigate } from "react-router-dom";
function App() {
  const data = useSelector((state) => state.apiData.data);
  const [addNewPost, response] = useAddNewPostMutation();
  const [allData, setAllData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState("");
  const pageCount = Math.ceil(count / itemsPerPage);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async (pageNo) => {
    setLoader(true);
    let formData = {
      limit: itemsPerPage,
      skip: pageNo,
    };
    await addNewPost(formData)
      .unwrap()
      .then((res) => {
        setCount(res.total);
        setAllData([...allData, ...res.todos]);
        dispatch(addData(res.todos));
        setLoader(false);
      })
      .then((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (allData.length === 0) {
      fetchData(0);
    }
  }, []);

  // Pagination logic
  const handlePageClick = ({ selected }) => {
    let skip = (selected - 1) * itemsPerPage;
    setCurrentPage(selected);
    fetchData(skip);
  };

  const handleNavigate = () => {
    navigate("/all");
  };
  return (
    <>
      <main className="flex justify-center min-w-max ">
        <div className="container">
          <div className=" flex justify-center ">
            <button
              className="bg-cyan-500 mt-10 p-2 rounded-lg"
              onClick={() => handleNavigate()}
            >
              Show All Records
            </button>
          </div>
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
          <div className="flex flex-col justify-evenly mt-12">
            {loader === false &&
              allData.length !== 0 &&
              allData.map((data, index) => {
                return (
                  <div key={index} className="bg-cyan-100 rounded-lg p-5 mt-10">
                    <div className="flex justify-center">{data.todo}</div>
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
