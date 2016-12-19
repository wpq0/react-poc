import { combineReducers } from 'redux';
import { routerReducer as routing, LOCATION_CHANGE } from 'react-router-redux';
import * as actions from './actions';
import { load, save } from './endpoints/dataSvc';
import getSchema from './endpoints/schemaSvc';
import getTree from './endpoints/treeSvc';
import getLanguages from './endpoints/languageSvc';

const allLanguages = getLanguages();
const defaultLanguage = allLanguages[0].key;

function tree(state = getTree(), action) {
  return state;
}

function languages(state = allLanguages, action) {
  return state;
}

function currentLanguage(state = defaultLanguage, action) {
  switch (action.type) {
    case actions.LANGUAGE_CHANGE:
      return action.language;
    case actions.ITEM_LANGUAGE_LOAD:
      return action.itemLanguage;
    default:
      return state;
  }
}

function currentItem(state = { schema:null, data:null, language:defaultLanguage }, action) {
  switch (action.type) {
    case actions.ITEM_LOAD:
      const schema = getSchema(action.itemType);
      const data = load(action.itemId, action.itemType, action.itemLanguage);
      return {
        schema, data, language: action.itemLanguage
      };
    case actions.ITEM_SAVE:
      if (state.schema != null) {
        save(action.itemId, action.itemType, action.itemLanguage, action.itemData);
        return {
          ...state,
          data: action.itemData
        };
      }
      else {
        return state;
      }

    case actions.ITEM_LANGUAGE_LOAD:
      if (state.schema != null) {
        const data = load(action.itemId, action.itemType, action.itemLanguage);
        return {
          ...state,
          data: action.itemData
        };
      }
      else {
        return state;
      }
    default:
      return state;
  }
}

export default function createRootReducer() {
  return combineReducers({
    tree,
    languages,
    currentLanguage,
    currentItem,
    routing
  });
}

