function getFakeData(id: string, type: 'category' | 'product') {
  if (type === 'category') {
    return {
      id,
      type,
      name: { en: `Category ${id} EN`, sv: `Category ${id} SV` },
      description: { en: `Description for category ${id} EN`, sv: `Description for category ${id} SV` }
    }
  }
  else if (type === 'product') {
    return {
      id,
      type,
      name: { en: `Product ${id} EN`, sv: `Product ${id} SV` },
      description: { en: `Description for product ${id} EN`, sv: `Description for product ${id} SV` },
      colors: { en: ['red', 'cyan'], sv: ['röd', 'grön'] },
      extendedAttributes: []
    }
  }
  else {
    return null;
  }
}

function load(id: string, type: 'category' | 'product', language: string) {
  // [ { schema, uiSchema, data } ]
  const data = getFakeData(id, type);
  return data;
}

function save(id: string, type: string, language: string, data) {
  console.log(data);
}

export function delocalize(data, language: string) {
  // assume just 1 level of nesting
  return Object.keys(data).reduce((acc, key) => {
    var prop = data[key];
    if(typeof(prop) === 'object') {
      acc[key] = prop[language];
    }
    else {
      acc[key] = prop;
    }
    return acc;
  }, {});
}

export function localize(data, language: string) {
  // assume just 1 level of nesting
  return Object.keys(data).reduce((res, key) => {
    res[key] = { [language]: data[key] };
    return res;
  }, {});
}

export { load, save };