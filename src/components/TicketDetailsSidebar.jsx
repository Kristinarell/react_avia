import React from 'react';
import passanger from '../assets/passanger.svg';
import luggage from '../assets/luggage.svg';
import noLuggage from '../assets/noLuggage.svg';
import legroom from '../assets/legroom.svg';

const TicketDetailsSidebar = ({ baggage, price, classOfService, baggageStatus }) => {
  return (
    <div className="price">
      <div className="price_container">
        <svg width="1" height="150" viewBox="0 0 1 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.6" y1="150" x2="0.6" stroke="#8B8484" stroke-width="0.8" />
        </svg>
        <div className="svg_container">
          <div className="info-row">
            <img src={passanger} alt="passanger"></img> <span>1 пассажир</span>
          </div>
          <div className="info-row">
            <img src={baggage?.uid === 'FREE' ? luggage : noLuggage} alt="baggage"></img>{' '}
            <span>{baggageStatus}</span>
          </div>
          <div className="info-row">
            <img src={legroom} alt="legroom"></img> <span>{classOfService}</span>
          </div>
          <button className="priceBtn">{price}</button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsSidebar;
