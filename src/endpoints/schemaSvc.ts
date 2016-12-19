function getSchema(type: 'category' | 'product') {
    if (type === 'category') {
        const schema = {
            type: 'object',
            properties: {
                id: { type: 'string', title: 'Id' },
                name: { type: 'string', title: 'Name' },
                description: { type: 'string', title: 'Description' },
            }
        };
        const uiSchema = {
            id: {"ui:widget": "hidden"},
            description: { 'ui:widget': 'html' }
        };
        return { schema, uiSchema };
    }
    else if (type === 'product') {
        const schema = {
            type: 'object',
            properties: {
                id: { type: 'string', title: 'Id' },
                name: { type: 'string', title: 'Name' },
                description: { type: 'string', title: 'Description' },
                colors: {
                    type: 'array',
                    title: 'Available colors',
                    items: { type: 'string' }
                },
                extendedAttributes: {
                    type: 'array',
                    title: 'Attributes',
                    items: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', title: 'Name' },
                            value: { type: 'string', title: 'Value' }
                        }
                    }
                }
            }
        }
        const uiSchema = {
            description: { 'ui:widget': 'html' },
            id: {"ui:widget": "hidden"}
        };
        return { schema, uiSchema };
    }
    else {
        return null;
    }
}

export default getSchema;