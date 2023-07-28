/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

function allData() {
  const data = useSelector((state) => state.apiData.responseData);
  return (
    <>
      <main className="flex justify-center min-w-max bg-gray-100 ">
        <div className="container">
          <div className="flex flex-col justify-evenly">
            {data !== null &&
              data.map((data, index) => {
                return (
                  <div key={index} className="bg-white rounded-lg p-5 mt-10">
                    <div className="flex justify-center">{data.todo}</div>
                  </div>
                );
              })}
          </div>
          {data === null && (
            <div className=" flex justify-center h-screen">
              <div className=" self-center text-3xl font-bold">
                No Record Found
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default allData;
