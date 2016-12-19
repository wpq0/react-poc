export const LANGUAGE_CHANGE = 'LANGUAGE_CHANGE';
export const ITEM_LOAD = 'ITEM_LOAD';
export const ITEM_LANGUAGE_LOAD = 'ITEM_LANGUAGE_LOAD';
export const ITEM_SAVE = 'ITEM_SAVE';

export const changeLanguage = (language) => ({ 
    type: LANGUAGE_CHANGE, language 
});

export const loadItem = (itemType, itemId, itemLanguage) =>({
    type: ITEM_LOAD, itemId, itemLanguage, itemType
});

export const loadLanguage = (itemLanguage) => ({
    type: ITEM_LANGUAGE_LOAD, itemLanguage
});

export const saveItem = (itemId, itemType, itemLanguage, itemData) => ({
    type: ITEM_SAVE, itemId, itemType, itemLanguage, itemData
});
