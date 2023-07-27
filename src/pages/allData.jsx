/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

function allData() {
  const data = useSelector((state) => state.apiData.data);
  console.log("data", data);
  return (
    <>
      <div className="flex flex-col justify-evenly mt-12">
        {data.length !== 0 &&
          data.map((data, index) => {
            return (
              <div key={index} className="bg-cyan-100 rounded-lg p-5 mt-10">
                <div className="flex justify-center">{data.todo}</div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default allData;
