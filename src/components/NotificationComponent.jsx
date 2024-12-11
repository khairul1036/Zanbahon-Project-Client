import React, { useEffect, useState } from 'react';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost/zanbahon-server/notification_system.php');

    eventSource.onmessage = (event) => {
      try {
        const newNotification = JSON.parse(event.data);
        setNotifications((prev) => [...prev, newNotification]);
      } catch (error) {
        console.error('Error parsing SSE message:', error);
      }
    };

    eventSource.onerror = () => {
      console.error("Error occurred with the SSE connection.");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <div>
      <h2>Driver Notifications</h2>
      {notifications.length === 0 && <p>No notifications yet.</p>}
      {notifications.map((note, index) => (
        <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid black' }}>
          <p>{note.message}</p>
          <small>Received at: {new Date(note.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default NotificationComponent;
