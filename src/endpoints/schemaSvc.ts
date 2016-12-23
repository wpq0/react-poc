declare type CombinedSchema = { data: { type: string, properties: {} }, ui: {} };

export default function getSchema(type: 'category' | 'product'): CombinedSchema|null {
  if (type === 'category') {
    const data = {
      type: 'object',
      properties: {
        id: { type: 'string', title: 'Id' },
        name: { type: 'string', title: 'Name' },
        description: { type: 'string', title: 'Description' },
      }
    };
    const ui = {
      id: { "ui:widget": "hidden" },
      description: { 'ui:widget': 'html' }
    };
    return { data, ui };
  }
  else if (type === 'product') {
    const data = {
      type: 'object',
      properties: {
        id: { type: 'string', title: 'Id' },
        name: { type: 'string', title: 'Name' },
        description: { type: 'string', title: 'Description' },
        colors: {
          type: 'array',
          title: 'Available colors',
          items: { type: 'string' }
        }
      }
    }
    const ui = {
      description: { 'ui:widget': 'html' },
      id: { "ui:widget": "hidden" }
    };
    return { data, ui };
  }
  else {
    return null;
  }
}