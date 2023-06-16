import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './CalendarioProperty.css'

export const CalendarioProperty = ({startdate, enddate}) => {
     
    const availableEvent = {
        title: 'Disponible',
        start: `${startdate}`,
        end: `${enddate}`
      };
  
    const events = [availableEvent];
  
    return (
      <div style={{ width: '400px', height: '400px' }}>
        <FullCalendar 
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
        />
      </div>
    );
  };
  
