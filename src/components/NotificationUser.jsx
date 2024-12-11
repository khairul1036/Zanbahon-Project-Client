import React from 'react';

const NotificationUser = () => {
  const requestCar = async (driver_id, user_id) => {
    const sentNotification = { action: "request_car", driver_id, user_id };

    try {
      const response = await fetch("http://localhost/zanbahon-server/notification_system.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentNotification),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        alert("Car request sent!");
      } else {
        alert(`Failed to send car request: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error while requesting a car:", error);
      alert(`An unexpected error occurred: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={() => requestCar(30, 50)} className="btn">
        Request Car
      </button>
    </div>
  );
};

export default NotificationUser;
