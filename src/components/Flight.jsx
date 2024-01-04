import React from 'react';
import FlightInfo from './FlightInfo';

const Flight = ({ departureTicket, arrivalTicket, price, carrier }) => {
  return (
    <div className="flight_container">
      <div className="ticket_header">
        <h2>{carrier}</h2>
        <h2>{price}</h2>
      </div>

      <div className="departureTicket">
        <FlightInfo ticketInfo={departureTicket} />
      </div>
      <div className="arrivalTicket">
        <FlightInfo ticketInfo={arrivalTicket} />
      </div>
      <div className="price"> wtyf</div>
    </div>
  );
};

export default Flight;

//<h2>общее время полета{totalTravelTime}</h2>
