import AeroflotLogo from '../assets/airlines/Aeroflot.svg';
import AirFranceLogo from '../assets/airlines/Air France.svg';
import AirBalticLogo from '../assets/airlines/AirBaltic.svg';
import AlitaliaLogo from '../assets/airlines/Alitalia.svg';
import BrusselsAirlinesLogo from '../assets/airlines/Brussels Airlines.svg';
import KLMLogo from '../assets/airlines/KLM.svg';
import FinnairLogo from '../assets/airlines/Finnair.svg';
import LOTPolishAirlinesLogo from '../assets/airlines/LOT Polish Airlines.svg';
import PegasusAirlinesLogo from '../assets/airlines/Pegasus Airlines.svg';
import TurkishAirlinesLogo from '../assets/airlines/Turkish Airlines.svg';

export const airlineLogos = {
  'Аэрофлот - российские авиалинии': AeroflotLogo,
  'Air France': AirFranceLogo,
  'KLM ': KLMLogo,
  'Air Baltic Corporation A/S': AirBalticLogo,
  'Alitalia Societa Aerea Italiana': AlitaliaLogo,
  'Brussels Airlines': BrusselsAirlinesLogo,
  'LOT Polish Airlines': LOTPolishAirlinesLogo,
  'Pegasus Hava Tasimaciligi A.S.': PegasusAirlinesLogo,
  'TURK HAVA YOLLARI A.O.': TurkishAirlinesLogo,
  'Finnair Oyj': FinnairLogo,
  KLM: KLMLogo,
};

export const findLogoByCaption = (caption, flightCarriersList) => {
  const airline = flightCarriersList.find((item) => item.name === caption);
  return airline ? airline.logo : undefined;
};
