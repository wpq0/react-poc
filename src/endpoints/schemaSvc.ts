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
            id: { 'ui:readonly': true },
            description: { 'ui:widget': 'textarea' }
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
            id: { 'ui:readonly': true },
            description: { 'ui:widget': 'textarea' }
        };
        return { schema, uiSchema };
    }
    else {
        return null;
    }
}

export default getSchema;