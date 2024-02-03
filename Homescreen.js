import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from '../components/Error';

import moment from "moment";
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/rooms/getallrooms");
        const data = response.data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates){
    if (dates && dates.length === 2) {
        console.log(moment(dates[0]).format('DD-MM-YYYY'));
        console.log(moment(dates[1]).format('DD-MM-YYYY'));
    } else {
        // Handle the case when no date is selected or when the selection is cleared
        console.log("No date selected");
    }
}


  return (
    <div className='container '>
      <div className="row mt-5">
        <div className="col-md-3">
        <RangePicker  format="DD-MM-YYYY" onChange={filterByDate}/>

        </div>
      </div>

      <div className="row justify-content-center mt-6">
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>Error</h1>
        ) : (
          rooms.map((room) => (
            <div className="col-md-9 mt-5 " key={room._id}>
              <Room room={room} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;