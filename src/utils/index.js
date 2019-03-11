export const isInStore = (name, store) => {
  const contain = store.find(city => city.cityName === name);
  if (contain !== undefined) return true;
  return false;
};

export const getCurrentIndexCity = (key, obj) => {
  const keys = Object.keys(obj);
  return keys.indexOf(key);
};

export const getNextCity = (key, obj, way) => {
  const keys = Object.keys(obj);
  return keys[(keys.indexOf(key) + way) % keys.length];
};
