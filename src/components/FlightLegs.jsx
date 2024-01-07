import React from 'react';
import FlightInfo from './FlightInfo';
import TicketDetailsSidebar from './TicketDetailsSidebar';

// Компонент, объединяющий данные о билетах на вылет и возвращение, включая общую информацию по авиакомпании и цене.
const FlightLegs = ({ departureTicket, arrivalTicket, price, carrier, baggage, logo }) => {
  const classOfService = departureTicket.segments[0].classOfService.caption;
  const baggageStatus = baggage?.uid === 'FREE' ? 'Багаж включен' : 'Без багажа';
  return (
    <div className="flight_container">
      <div className="ticket_header">
        {logo && <img src={logo} alt={`Логотип ${carrier}`}></img>}
        <h3>{carrier}</h3>
      </div>

      <div className="departureTicket">
        <FlightInfo ticketInfo={departureTicket} />
      </div>
      <div className="arrivalTicket">
        <FlightInfo ticketInfo={arrivalTicket} />
      </div>
      <TicketDetailsSidebar {...{ baggage, price, classOfService, baggageStatus }} />
    </div>
  );
};

export default FlightLegs;
