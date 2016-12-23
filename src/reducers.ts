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
    // case actions.ITEM_LANGUAGE_LOAD:
    //   return action.itemLanguage;
    case actions.LANGUAGE_CHANGE:
      return action.language;
    default:
      return state;
  }
}

function currentItem(state = {}, action) {
  switch (action.type) {
    case actions.ITEM_LOAD:
      const schema = getSchema(action.itemType);
      const data = load(action.itemId, action.itemType, action.itemLanguage);

      if (schema != null && data != null) {
        return Object.keys(schema.data.properties)
        .reduce((res, prop) => ({ 
          ...res, 
          [prop]: {
            schema: schema.data.properties[prop],
            uiSchema: schema.ui[prop],
            language: defaultLanguage,
            data: data[prop],
            editing: false
          } 
        })
        , {});
      }
      else {
        return state;
      }
    case actions.ITEM_FIELD_TOGGLE_EDIT:
      return { 
        ...state, 
        [action.field]: { 
          ...state[action.field],
          editing: !state[action.field].editing
        }
      };
    case actions.ITEM_FIELD_CHANGE_LANGUAGE:
      return {
        ...state, 
        [action.field]: { 
          ...state[action.field],
          language: action.language
        }
      };
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

