import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Bookingscreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);
  const { roomid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:5000/api/rooms/getroombyid", { roomid });
        if (response && response.data) { // Check if response and response.data are defined
          setRoom(response.data);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]);

  return (
    <div className='m-5'>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error: Failed to fetch room data.</h1>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
          <h1>{room.name}</h1>
          <img src={room.imageurls[0]} className='bigimg'/>
          {/* Render other room details here */}
          </div>
          <div className="col-md-6">
            <div className='m-5'>
            <h1>Booking Details</h1>
            <hr/>
            <b>
            <p>Name:</p>
            <p>From Date :</p>
            <p>To Date :</p>
            <p>Max count : {room.maxcount}</p>
            </b>
            </div>
            <div className='m-5' >
            <b>
             <h1>Amount</h1> 
             <hr/>
             <p>Total days :</p>
             <p>Rent per day : {room.rentperday}</p>
             <p>Total Amount :</p>
             </b>
            </div>
            <div style={{float:'right'}}>
             <button className='btn btn-primary'>Pay Now</button>
            </div>


          </div>

          </div>
        </div>
      ) : (
        <h1>No room data found.</h1>
      )}
    </div>
  );
}

export default Bookingscreen;
