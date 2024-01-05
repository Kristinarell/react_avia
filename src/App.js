import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilteringPanel from './components/FilteringPanel';
import Flight from './components/Flight';
import jsonData from './flights.json';

import AeroflotLogo from './assets/airlines/Aeroflot.svg';
import AirFranceLogo from './assets/airlines/Air France.svg';
import AirBalticLogo from './assets/airlines/AirBaltic.svg';
import AlitaliaLogo from './assets/airlines/Alitalia.svg';
import BrusselsAirlinesLogo from './assets/airlines/Brussels Airlines.svg';
import KLMLogo from './assets/airlines/KLM.svg';
import LOTPolishAirlinesLogo from './assets/airlines/LOT Polish Airlines.svg';
import PegasusAirlinesLogo from './assets/airlines/Pegasus Airlines.svg';
import TurkishAirlinesLogo from './assets/airlines/Turkish Airlines.svg';

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
  const { sort, selectedAirlines, transfersQuantity, priceRange } = useSelector((state) => state.filter);

  const initialRender = useRef();
  const priviousFilter = useRef();
  const findLogoByCaption = (caption) => {
    const airline = airlinesCaptions.find((item) => item.name === caption);
    return airline ? airline.logo : undefined;
  };

  const [allFlights, setAllFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  const [airlinesCaptions, setAirlinesCaptions] = useState([]);

  useEffect(() => {
    const uniqueAirlines = Array.from(
      new Set(jsonData.result.flights.map((singleFlight) => singleFlight.flight.carrier.caption)),
    );

    const airlineLogos = {
      'Aeroflot - российские авиалинии': AeroflotLogo,
      'Air France': AirFranceLogo,
      'Air Baltic Corporation A/S': AirBalticLogo,
      'Alitalia Societa Aerea Italiana': AlitaliaLogo,
      'Brussels Airlines': BrusselsAirlinesLogo,
      'LOT Polish Airlines': LOTPolishAirlinesLogo,
      'Pegasus Hava Tasimaciligi A.S.': PegasusAirlinesLogo,
      'TURK HAVA YOLLARI A.O.': TurkishAirlinesLogo,
    };

    const airlinesWithLogo = uniqueAirlines.map((airline, index) => ({
      id: index,
      name: airline,
      logo: airlineLogos[airline],
    }));

    setAirlinesCaptions(airlinesWithLogo);
  }, []);

  // при превом запуске из json файла выгружаем все полеты и к каждому объекту добавляем свойство totalTravelTime
  useEffect(() => {
    const flightsWithTotalTravelTime = jsonData.result.flights.map((singleFlight) => ({
      ...singleFlight,
      totalTravelTime: singleFlight.flight.legs[0].duration + singleFlight.flight.legs[1].duration,
      // общее количество пересадок - количество сегментов минус один для каждой части полета.
      transfersQuantity:
        singleFlight.flight.legs[0].segments.length - 1 + singleFlight.flight.legs[1].segments.length - 1,
    }));
    setAllFlights(flightsWithTotalTravelTime);
    setFilteredFlights(flightsWithTotalTravelTime);
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (selectedAirlines.length === 0) {
      priviousFilter.current = allFlights;
      setFilteredFlights(allFlights); // Если нет выбранных авиакомпаний, показываем все билеты
    } else {
      const result = allFlights.filter((singleFlight) =>
        selectedAirlines.some((option) => singleFlight.flight.carrier.caption === option.name),
      );
      priviousFilter.current = result;
      setFilteredFlights(result);
    }

    if (transfersQuantity.length !== 0) {
      console.log(`применена фильтрация по пересадкам`);
      console.log(priviousFilter.current);
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

    if (priceRange[0] !== 0 || priceRange[1] !== 200000) {
      console.log(`применена фильтрация по цене`);
      console.log(priviousFilter.current);
      const result = priviousFilter.current.filter(
        (singleFlight) =>
          singleFlight.flight.price.total.amount >= priceRange[0] &&
          singleFlight.flight.price.total.amount <= priceRange[1],
      );
      priviousFilter.current = result;
      setFilteredFlights(result);
    }

    if (Object.keys(sort).length !== 0) {
      setFilteredFlights((prevFilteredFlights) =>
        [...prevFilteredFlights].sort((a, b) => compareFunction(a, b, sort)),
      );
    }
  }, [selectedAirlines, sort, allFlights, transfersQuantity, priceRange]);

  return (
    <div className="App">
      <FilteringPanel airlinesCaptions={airlinesCaptions} />
      <p>Найдено рейсов: {filteredFlights.length}</p>
      {filteredFlights?.map((singleFlight) => (
        <Flight
          key={singleFlight.flightToken}
          departureTicket={singleFlight.flight.legs[0]}
          arrivalTicket={singleFlight.flight.legs[1]}
          price={singleFlight.flight.price.total.amount}
          carrier={singleFlight.flight.carrier.caption}
          totalTravelTime={singleFlight.totalTravelTime}
          baggage={singleFlight.flight.servicesStatuses.baggage}
          logo={findLogoByCaption(singleFlight.flight.carrier.caption)}
        />
      ))}
    </div>
  );
}

export default App;
