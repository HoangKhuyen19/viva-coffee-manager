export interface ProductData{
    id: string;
    name: string;
    type?: string;
    price: number;
    description: string;
}

export const productDataPattern: ProductData = {
    id: "",
    name: "",
    type: "",
    price: 0,
    description: ""
}