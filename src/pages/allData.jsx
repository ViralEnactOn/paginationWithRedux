/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";

function allData() {
  const data = useSelector((state) => state.apiData.data);
  console.log("data", data);
  return (
    <>
      <main className="flex justify-center min-w-max bg-gray-100 ">
        <div className="container">
          <div className="flex flex-col justify-evenly mt-12">
            {data === null && <Link to={"/"}></Link>}
            {data.length !== 0 &&
              data.map((data, index) => {
                return (
                  <div key={index} className="bg-white rounded-lg p-5 mt-10">
                    <div className="flex justify-center">{data.todo}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
}

export default allData;
