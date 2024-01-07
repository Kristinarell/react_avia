export function separateDateAndTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const daysOfWeekShort = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const dayOfWeek = daysOfWeekShort[dateTime.getDay()];

  const month = formatMonth(dateTime.getMonth());
  const day = dateTime.getDate();
  const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return { date: `${day} ${month}, ${dayOfWeek}`, time };
}

export function convertToFlightTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} ч ${remainingMinutes} мин`;
}

export function formatMonth(month) {
  const monthNamesShort = [
    'янв',
    'фев',
    'мар',
    'апр',
    'мая',
    'июнь',
    'июль',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];
  return monthNamesShort[month];
}
