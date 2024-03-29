import React from 'react';
import { separateDateAndTime, convertToFlightTime } from '../utils/formattingUtils';

// Компонент для отображения подробной информации о перелете, включая вылет, прилет, длительность и другие детали.
export const FlightInfo = ({ ticketInfo }) => {
  const transfersQuantityText =
    ticketInfo.segments.length === 1 ? 'без пересадок' : `${ticketInfo.segments.length - 1} пересадка`;

  const totalDuration = ticketInfo.duration; // время в пути
  const initialSegment = ticketInfo.segments[0];
  const finalSegment = ticketInfo.segments[1] ?? ticketInfo.segments[0];

  const { departureAirport, departureCity, departureDate } = initialSegment; // данные о начальной точке перелета
  const { arrivalAirport, arrivalCity, arrivalDate } = finalSegment; // данные о конечной точке перелета

  const { date: departureTimestamp, time: departureTime } = separateDateAndTime(departureDate);
  const { date: arrivalTimestamp, time: arrivalTime } = separateDateAndTime(arrivalDate);
  return (
    <div className="flight_wrapper">
      <div className="departure-date">
        <h3>{departureTimestamp}</h3>
        <svg width="2" height="70" viewBox="0 0 2 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="1.38589" y1="100.747" x2="1.38589" y2="0.74707" stroke="#8B8484" strokeWidth="1.22822" />
        </svg>
      </div>

      <div className="flight-info">
        <div className="departureSide">
          <h3>
            {departureCity?.caption} {departureAirport?.caption}
          </h3>
          <h2>{departureTime}</h2>
          <h2>{departureAirport.uid}</h2>
        </div>

        <div className="duration">
          <h3 className="duration_time">{convertToFlightTime(totalDuration)}</h3>
          <svg width="230" height="30" viewBox="0 0 381 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.666667 16.4067C0.666667 19.3523 3.05448 21.7401 6 21.7401C8.94552 21.7401 11.3333 19.3523 11.3333 16.4067C11.3333 13.4612 8.94552 11.0734 6 11.0734C3.05448 11.0734 0.666667 13.4612 0.666667 16.4067ZM6 17.4067H175.494V15.4067H6V17.4067ZM175.494 17.4067H344.988V15.4067H175.494V17.4067Z"
              fill="#1F1A1F"
            />
            <path
              d="M374.797 12.1875C374.638 12.1875 373.954 12.1922 373.707 12.2057L370.335 12.2947L362.56 2.8125H358.894L363.247 12.4576L357.568 12.542L354.984 9.375H351.942L353.145 14.8934C353.154 14.925 353.164 14.9561 353.176 14.9865C353.177 14.9894 353.177 14.9924 353.176 14.9953C353.164 15.0256 353.154 15.0565 353.145 15.0879L351.926 20.625H354.948L357.601 17.4023L363.249 17.5295L358.893 27.1875H362.57L370.333 17.71L373.705 17.8002C373.955 17.8137 374.638 17.8184 374.794 17.8184C376.215 17.8184 377.378 17.6227 378.25 17.2359C379.728 16.582 379.949 15.5543 379.949 15C379.949 13.2387 378.023 12.1875 374.797 12.1875Z"
              fill="#1F1A1F"
            />
          </svg>
          <p className="duration_transfers">{transfersQuantityText}</p>
        </div>

        <div className="arravalSide">
          <h3>
            {arrivalCity?.caption} {arrivalAirport?.caption}
          </h3>
          <h2>
            {arrivalTime} <span>{arrivalTimestamp}</span>
          </h2>
          <h2>{arrivalAirport.uid}</h2>
        </div>
      </div>
    </div>
  );
};

export default FlightInfo;
