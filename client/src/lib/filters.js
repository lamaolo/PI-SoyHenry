export const filterActivity = (array, activity) => {
  const filteredActivities = [];

  array.forEach((country) => {
    country.activities.forEach((a) => {
      if (a.name === activity) filteredActivities.push(country);
    });
  });

  return filteredActivities;
};

export const filterAlphabetically = (array, order) => {
  if (order === 'Asc') {
    return array.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    return array.sort((a, b) => a.name.localeCompare(b.name));
  }
};

export const filterPopulation = (array, order) => {
  if (order === 'Asc') {
    return array.sort((a, b) => (a.population > b.population ? 1 : -1));
  } else {
    return array.sort((a, b) => (a.population < b.population ? 1 : -1));
  }
};
