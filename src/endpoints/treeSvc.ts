declare type node = {
  id: number,
  type: 'category' | 'product',
  name: string,
  children?: node[]
}

const data: node[] = [
  {
    id: 1,
    type: "category",
    name: "Category 1",
    children: [
      {
        id: 2,
        type: "category",
        name: "Category 2",
        children: [
          {
            id: 3,
            type: "product",
            name: "Product 3",
          },
          {
            id: 4,
            type: "product",
            name: "Product 4",
          },
        ]
      },
      {
        id: 5,
        type: "category",
        name: "Category 5",
        children: [
          {
            id: 6,
            type: "product",
            name: "Product 6",
          }
        ]
      },
    ]
  },
  {
    id: 7,
    type: "category",
    name: "Category 7",
    children: [
      {
        id: 8,
        type: "product",
        name: "Product 8",
      },
      {
        id: 9,
        type: "product",
        name: "Product 9",
      },
    ]
  },
];

export default function getTree(): node[] {
  return data;
};