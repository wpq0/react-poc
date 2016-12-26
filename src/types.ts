export type Content = Category | Product;
export type ContentTypes = 'category' | 'product';
export type LanguageKeys = 'en' | 'sv';
export type Localized<T> = { [lang in LanguageKeys]:T };

export type Product = {
  type: 'product',
  id: string,
  name: Localized<string>,
  description: Localized<string>,
  colors: Localized<[string]>,
} 

export type Category = {
  type: 'category',
  id: string,
  description: Localized<string>,
};

export type JsonSchema = {
  type: string,
  title: string,
  properties?: { [k:string]: JsonSchema; }
  items?: JsonSchema
}

export type CombinedSchema = { 
  data: JsonSchema, 
  ui: {} 
};

export type ContentNode = {
  id: number,
  type: 'category' | 'product',
  name: string,
  children?: ContentNode[]
}

export type Language = { key:LanguageKeys, title: string }

export type FieldMetadata = {
  schema: JsonSchema,
  uiSchema: {},
  language: LanguageKeys,
  data: Content,
  editing: boolean
}

export type FieldsMetadata = {
  [fieldName:string]: FieldMetadata
}

export type State = {
  tree: ContentNode[],
  languages: Language[],
  currentLanguage: LanguageKeys,
  fields: FieldsMetadata,
  routing: {}
}