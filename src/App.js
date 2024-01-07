import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import FilteringPanel from './components/FilteringPanel';
import FlightLegs from './components/FlightLegs';
import { airlineLogos, findLogoByCaption } from './utils/airlineLogos';
import jsonData from './flights.json';

const compareFunction = (a, b, activeSort) => {
  const props = activeSort.sortProperty.split('.');

  // последовательное обращение к вложенным свойствам объекта
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
  const { sort, selectedAirlines, transfersQuantity, priceRange } = useSelector((state) => state.filter);

  const initialRender = useRef(true);
  const priviousFilter = useRef([]);

  const [allFlights, setAllFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [flightCarriersList, setFlightCarriersList] = useState([]);

  // формирование списка уникальных авиакомпаний из данных о полетах
  useEffect(() => {
    const uniqueAirlines = Array.from(
      new Set(jsonData.result.flights.map((singleFlight) => singleFlight.flight.carrier.caption)),
    );
    const airlinesData = uniqueAirlines.map((airline, index) => ({
      id: index,
      name: airline,
      logo: airlineLogos[airline],
    }));
    setFlightCarriersList(airlinesData);
  }, []);

  // добавление к каждому объкту свойства totalTravelTime, transfersQuantity для сортировки/фильтрации
  useEffect(() => {
    const flightsWithProperties = jsonData.result.flights.map((flightObj) => ({
      ...flightObj,
      totalTravelTime: flightObj.flight.legs[0].duration + flightObj.flight.legs[1].duration,
      transfersQuantity:
        flightObj.flight.legs[0].segments.length - 1 + flightObj.flight.legs[1].segments.length - 1,
    }));
    setAllFlights(flightsWithProperties);
    setFilteredFlights(flightsWithProperties);
  }, []);

  //  фильтрации и сортировки списка полетов в зависимости от параметров
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // по выбранным авиакомпаниям
    if (selectedAirlines.length === 0) {
      priviousFilter.current = allFlights;
      setFilteredFlights(allFlights);
    } else {
      const result = allFlights.filter((singleFlight) =>
        selectedAirlines.some((option) => singleFlight.flight.carrier.caption === option.name),
      );
      priviousFilter.current = result;
      setFilteredFlights(result);
    }

    // по количеству пересадок
    if (transfersQuantity.length !== 0) {
      const result = priviousFilter.current.filter((singleFlight) =>
        transfersQuantity.some(
          (option) =>
            (option.maxValue === 0 && singleFlight.transfersQuantity === 0) ||
            (singleFlight.transfersQuantity !== 0 && singleFlight.transfersQuantity <= option.maxValue),
        ),
      );
      priviousFilter.current = result;
      setFilteredFlights(result);
    }

    // по ценовому диапозону
    if (priceRange[0] !== 0 || priceRange[1] !== 200000) {
      const result = priviousFilter.current.filter(
        (singleFlight) =>
          singleFlight.flight.price.total.amount >= priceRange[0] &&
          singleFlight.flight.price.total.amount <= priceRange[1],
      );
      priviousFilter.current = result;
      setFilteredFlights(result);
    }

    // сортировка
    if (Object.keys(sort).length !== 0) {
      setFilteredFlights((prevFilteredFlights) =>
        [...prevFilteredFlights].sort((a, b) => compareFunction(a, b, sort)),
      );
    }
  }, [selectedAirlines, sort, transfersQuantity, priceRange]);

  return (
    <div className="App">
      <FilteringPanel airlinesCaptions={flightCarriersList} />
      <p className="flightsNumber">Найдено рейсов: {filteredFlights.length}</p>
      {filteredFlights?.map((singleFlight) => (
        <FlightLegs
          key={singleFlight.flightToken}
          departureTicket={singleFlight.flight.legs[0]}
          arrivalTicket={singleFlight.flight.legs[1]}
          price={singleFlight.flight.price.total.amount}
          carrier={singleFlight.flight.carrier.caption}
          totalTravelTime={singleFlight.totalTravelTime}
          baggage={singleFlight.flight.servicesStatuses.baggage}
          logo={findLogoByCaption(singleFlight.flight.carrier.caption, flightCarriersList)}
        />
      ))}
    </div>
  );
}

export default App;
