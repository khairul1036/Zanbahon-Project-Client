import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const SentNotification = ({ serviceName }) => {
  const { dbUserEmail, dbUserName } = useContext(AuthContext);
  const [notificationSent, setNotificationSent] = useState(false);

  const sendNotification = async () => {
    if (notificationSent) return; // Prevent sending twice

    const notificationData = {
      email: dbUserEmail,
      name: "Zanbahon",
      Body: `
        <h1>Welcome to ${serviceName}!</h1>
        <p>Dear ${dbUserName},</p>
        <p>We are excited to have you on board. At ${serviceName}, we aim to provide you with the best services tailored to your needs.</p>
        <p>If you have any questions, feel free to reach out to us at any time. We're here to help you every step of the way.</p>
        <p>Best regards,</p>
        <p>The Zanbahon Team</p>
      `,
      Subject: `Notification to Zanbahon!`,
    };

    try {
      const response = await fetch(
        "http://localhost/zanbahon-server/notification/sentNotification.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Notification sent successfully:", result);
      setNotificationSent(true); // Update the state after successful send
    } catch (error) {
      console.error("Error sending notification:", error.message);
    }
  };

  useEffect(() => {
    sendNotification();
  }, [serviceName]);

  return <div></div>;
};

export default SentNotification;
