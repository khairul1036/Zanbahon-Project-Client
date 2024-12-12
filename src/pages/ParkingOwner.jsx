import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const ParkingOwner = () => {
  const [parkingData, setParkingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost/zanbahon-server/DriverParking/getByParkingStatus.php?status=Available"
    )
      .then((response) => response.json())
      .then((data) => {
        setParkingData(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parking data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(
      "http://localhost/zanbahon-server/DriverParking/updateParkingStatus.php"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBooking(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parking data:", error);
        setLoading(false);
      });
  }, []);



  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Request Parking</h1>
        <Link to={"/view-parking"}>View Parking</Link>
      </div>
    </div>
  );
};

export default ParkingOwner;
