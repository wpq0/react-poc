import {ContentTypes, Content, LanguageKeys} from './../types';

function getFakeData(id: string, type: ContentTypes):Content|null {
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
    }
  }
  else {
    return null;
  }
}

function load(id: string, type: ContentTypes, language: LanguageKeys):Content|null {
  const data = getFakeData(id, type);
  return data;
}

function save(id: string, type: string, language: LanguageKeys, data: Content) {
  console.log(data);
}

export { load, save };