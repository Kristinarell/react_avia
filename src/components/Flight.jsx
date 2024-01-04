import React from 'react';
import FlightInfo from './FlightInfo';
import passanger from '../assets/passanger.svg';
import luggage from '../assets/luggage.svg';
import noLuggage from '../assets/noLuggage.svg';
import legroom from '../assets/legroom.svg';

const Flight = ({ departureTicket, arrivalTicket, price, carrier, baggage, logo }) => {
  const classOfService = departureTicket.segments[0].classOfService.caption;
  const baggageStatus = baggage?.uid === 'FREE' ? 'Багаж включен' : 'Без багажа';
  return (
    <div className="flight_container">
      <div className="ticket_header">
        {logo && <img src={logo} alt={`Логотип ${carrier}`}></img>}
        <h2>{carrier}</h2>
      </div>

      <div className="departureTicket">
        <FlightInfo ticketInfo={departureTicket} />
      </div>
      <div className="arrivalTicket">
        <FlightInfo ticketInfo={arrivalTicket} />
      </div>
      <div className="price">
        <div className="price_container">
          <svg width="1" height="150" viewBox="0 0 1 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.6" y1="150" x2="0.6" stroke="#8B8484" stroke-width="0.8" />
          </svg>
          <div className="svg_container">
            <div className="pair">
              <img src={passanger} alt="Описание изображения"></img> <span>1 пассажир</span>
            </div>
            <div className="pair">
              <img src={baggage?.uid === 'FREE' ? luggage : noLuggage} alt="Описание изображения"></img>{' '}
              <span>{baggageStatus}</span>
            </div>
            <div className="pair">
              <img src={legroom} alt="Описание изображения"></img> <span>{classOfService}</span>
            </div>
            <h2>{price}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flight;

//<h2>общее время полета{totalTravelTime}</h2>
