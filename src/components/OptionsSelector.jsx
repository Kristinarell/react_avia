import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OptionsSelector = ({ optionsArray, dispatchFunction, filterProperty, radio, placeholder }) => {
  const dispatch = useDispatch();
  const selectedOptions = useSelector((state) => state.filter[filterProperty]);

  const [isPopUp, setIsPopUp] = useState(false);
  const popUpRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target)) {
      setIsPopUp(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isSelected = (option) => {
    return radio
      ? selectedOptions.id === option.id
      : selectedOptions.some((selectedOption) => selectedOption.id === option.id);
  };

  return (
    <div className="optionsContainer">
      <button
        className="popUpButton"
        onClick={() => {
          setIsPopUp(!isPopUp);
        }}>
        {placeholder}
      </button>

      {isPopUp && (
        <div className="popUp" ref={popUpRef}>
          <ul>
            {optionsArray.map((option) => (
              <li key={option.id} className={isSelected(option) ? 'active' : ''}>
                <label>
                  <input
                    type={radio ? 'radio' : 'checkbox'}
                    onChange={() => {
                      dispatch(dispatchFunction(option));
                    }}
                    value={option.id}
                    name={radio ? 'sort-group' : 'checkbox-group'}
                    checked={isSelected(option)}
                  />
                  {option.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OptionsSelector;
