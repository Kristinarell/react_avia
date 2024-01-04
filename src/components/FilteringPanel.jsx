import React from 'react';
import OptionsSelector from './OptionsSelector';
import PriceRangeSlider from './PriceRangeSlider';
import { setActiveSort, setSelectedAirline, setTransfersQuantity } from '../redux/filterSlice';

const sorts = [
  { id: 1, name: 'по возрастанию цены', sortProperty: 'flight.price.total.amount', order: 'asc' },
  { id: 2, name: 'по убыванию цены', sortProperty: 'flight.price.total.amount', order: 'desc' },
  { id: 3, name: 'по времени в пути', sortProperty: 'totalTravelTime', order: 'asc' },
];
const transfers = [
  { id: 1, name: 'без пересадок', sortProperty: 'price' },
  { id: 2, name: 'одна пересадка', sortProperty: 'price' },
];
const myAirlines = [
  { id: 1, name: 'Air France' },
  { id: 2, name: 'LOT Polish Airlines' },
  { id: 3, name: 'Air Baltic Corporation A/S' },
  { id: 4, name: 'Finnair Oyj' },
  { id: 5, name: 'KLM' },
  { id: 6, name: 'TURK HAVA YOLLARI A.O.' },
  { id: 7, name: 'Pegasus Hava Tasimaciligi A.S.' },
  { id: 8, name: 'LOT Polish Airlines' },
  { id: 9, name: 'Air Baltic Corporation A/S' },
];
const FilteringPanel = ({ airlinesCaptions }) => {
  return (
    <div className="filteringPanel">
      <OptionsSelector
        optionsArray={sorts}
        dispatchFunction={setActiveSort}
        filterProperty={'sort'}
        placeholder={'Сортировка'}
        radio
      />
      <OptionsSelector
        optionsArray={transfers}
        dispatchFunction={setTransfersQuantity}
        filterProperty={'transfersQuantity'}
        placeholder={'Пересадки'}
      />
      <OptionsSelector
        optionsArray={airlinesCaptions}
        dispatchFunction={setSelectedAirline}
        filterProperty={'selectedAirlines'}
        placeholder={'Авиакопании'}
      />
      <PriceRangeSlider />
    </div>
  );
};

export default FilteringPanel;
