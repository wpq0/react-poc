import { combineReducers } from 'redux';
import { routerReducer as routing, LOCATION_CHANGE, CALL_HISTORY_METHOD } from 'react-router-redux';
import { actionTypes } from './actions';
import { load, save } from './endpoints/dataSvc';
import getSchema from './endpoints/schemaSvc';
import getTree from './endpoints/treeSvc';
import getLanguages from './endpoints/languageSvc';
import { State, FieldsMetadata, CombinedSchema, Language, ContentNode } from './types';

const allLanguages = getLanguages();
const defaultLanguage = allLanguages[0].key;

function tree(state:ContentNode[] = getTree(), action) {
  return state;
}

function languages(state:Language[] = allLanguages, action) {
  return state;
}

function fields(state:FieldsMetadata = {}, action) {
  switch (action.type) {
    case actionTypes.ITEM_LOAD:
      const schema = getSchema(action.itemType);
      const data = load(action.itemId, action.itemType, action.itemLanguage);

      if (schema != null && data != null) {
        const fieldSchemas = schema.data.properties || {};
        return Object.keys(fieldSchemas)
        .reduce((res, prop) => ({ 
          ...res, 
          [prop]: {
            schema: fieldSchemas[prop],
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
    case actionTypes.ITEM_FIELD_TOGGLE_EDIT:
      return { 
        ...state, 
        [action.field]: { 
          ...state[action.field],
          editing: !state[action.field].editing
        }
      };
    case actionTypes.ITEM_FIELD_CHANGE_LANGUAGE:
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
  return combineReducers<State>({
    tree,
    languages,
    fields,
    routing
  });
}

