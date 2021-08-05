export const filterActivity = (array, activity) => {
  const filteredActivities = [];

  array.forEach((country) => {
    country.activities.forEach((a) => {
      if (a.name === activity) filteredActivities.push(country);
    });
  });

  return filteredActivities;
};

export const sort = (array, { order, property }) => {
  if (property === 'population') {
    order === 'Asc' ? (order = 'Desc') : (order = 'Asc');
  }

  if (order === 'Asc') {
    return array.sort((a, b) =>
      b[property].toString().localeCompare(a[property].toString(), 0, {
        numeric: typeof a[property] === 'number',
      })
    );
  } else {
    return array.sort((a, b) =>
      a[property].toString().localeCompare(b[property].toString(), 0, {
        numeric: typeof a[property] === 'number',
      })
    );
  }
};
