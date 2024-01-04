import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilteringPanel from './components/FilteringPanel';
import Flight from './components/Flight';
import jsonData from './flights.json';

const compareFunction = (a, b, activeSort) => {
  const props = activeSort.sortProperty.split('.');

  const valueA = props.reduce(function (acc, prop) {
    return acc[prop];
  }, a);
  const valueB = props.reduce(function (acc, prop) {
    return acc[prop];
  }, b);

  if (activeSort?.order === 'asc') {
    return valueA - valueB;
  } else {
    return valueB - valueA;
  }
};

function App() {
  const { sort, airline, transfersQuantity, priceRange } = useSelector((state) => state.filter);
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([jsonData.result.flights]);
  useEffect(() => {
    // Создание массива авиакомпаний при загрузке компонента
    const allAirlines = jsonData.result.flights.map((singleFlight) => singleFlight.flight.carrier.caption);
    setAirlines(Array.from(new Set(allAirlines))); // Используем Set для уникальных значений
  }, []);

  useEffect(() => {
    const flightsWithTotalTravelTime = jsonData.result.flights.map((singleFlight) => ({
      ...singleFlight,
      totalTravelTime: singleFlight.flight.legs[0].duration + singleFlight.flight.legs[1].duration,
    }));
    setFlights(flightsWithTotalTravelTime);
  }, [jsonData.result.flights]);

  useEffect(() => {
    if (Object.keys(sort).length !== 0) {
      setFlights([...flights].sort((a, b) => compareFunction(a, b, sort)));
    }
    // сделать чтобы при повторном нажатии на радио сортировка снималась и возвращалось изначальное значение
    // else {
    //   setFlights([...jsonData.result.flights]);
    // }
  }, [sort]);

  useEffect(() => {}, [airline, transfersQuantity, priceRange]);

  console.log(flights);
  return (
    <div className="App">
      <FilteringPanel />
      {flights?.map((singleFlight) => (
        <Flight
          key={singleFlight.flightToken}
          departureTicket={singleFlight.flight.legs[0]}
          arrivalTicket={singleFlight.flight.legs[1]}
          price={singleFlight.flight.price.total.amount}
          carrier={singleFlight.flight.carrier.caption}
          totalTravelTime={singleFlight.totalTravelTime}
        />
      ))}
    </div>
  );
}

export default App;
