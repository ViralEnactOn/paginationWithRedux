/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAddNewPostMutation } from "./services/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { addData, skipData } from "./services/dataStore";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeCircles } from "react-loader-spinner";

function App() {
  let { limit, skip, responseData } = useSelector((state) => state.apiData);
  const [addNewPost] = useAddNewPostMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(
  //   "Reudx Data",
  //   useSelector((state) => state.apiData)
  // );

  const fetchData = async (skipValue) => {
    await addNewPost({ limit: limit, skip: skipValue })
      .unwrap()
      .then((res) => {
        dispatch(addData(res.todos));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (responseData === null) {
      fetchData(0);
    }
  }, []);

  // Pagination logic
  const handlePageClick = () => {
    let nextPage = currentPage + 1;
    let newSkip = skip + limit;
    dispatch(skipData(newSkip));
    setCurrentPage(nextPage);
    fetchData(newSkip);
  };

  const handleNavigate = () => {
    navigate("/all");
  };
  return (
    <>
      <main className="flex justify-center min-w-max bg-gray-100">
        <div className="container">
          <div className=" flex justify-center ">
            <button
              className="bg-cyan-500 mt-10 p-2 rounded-lg"
              onClick={() => handleNavigate()}
            >
              Show All Records
            </button>
          </div>
          <InfiniteScroll
            dataLength={responseData ? responseData.length : 10}
            next={handlePageClick}
            hasMore={responseData ? (responseData.length === 150 ? false : true) : true}
            loader={
              <div className="flex justify-center mt-10 mb-10">
                <ThreeCircles
                  height="50"
                  width="50"
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
            }
          >
            <div className="flex flex-col justify-evenly mt-12">
              {responseData !== null &&
                responseData.map((data, index) => {
                  return (
                    <div key={index} className="bg-white rounded-lg p-5 mt-10">
                      <div className="flex justify-center">{data.todo}</div>
                    </div>
                  );
                })}
            </div>
          </InfiniteScroll>
        </div>
      </main>
    </>
  );
}
export default App;
