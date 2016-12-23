export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE';
export const ITEM_LOAD = 'ITEM_LOAD';
export const ITEM_LANGUAGE_LOAD = 'ITEM_LANGUAGE_LOAD';
export const ITEM_SAVE = 'ITEM_SAVE';

export const ITEM_FIELD_TOGGLE_EDIT = 'ITEM_FIELD_TOGGLE_EDIT';
export const ITEM_FIELD_CHANGE_LANGUAGE = 'ITEM_FIELD_CHANGE_LANGUAGE';

export const changeLanguage = (language) => ({
  type: LANGUAGE_CHANGE, language
});

export const loadItem = (itemType, itemId) => ({
  type: ITEM_LOAD, itemId, itemType
});

export const loadLanguage = (itemType, itemId, itemLanguage) => ({
  type: ITEM_LANGUAGE_LOAD, itemType, itemId, itemLanguage
});

export const saveItem = (itemId, itemType, itemLanguage, itemData) => ({
  type: ITEM_SAVE, itemId, itemType, itemLanguage, itemData
});

export const toggleFieldEdit = (field) => ({
  type: ITEM_FIELD_TOGGLE_EDIT, field
});

export const changeFieldLanguage = (language, field) => ({
  type: ITEM_FIELD_CHANGE_LANGUAGE, language, field
});