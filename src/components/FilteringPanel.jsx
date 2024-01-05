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
  { id: 1, name: 'без пересадок', maxValue: 0 },
  { id: 2, name: 'одна пересадка', maxValue: 2 },
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
