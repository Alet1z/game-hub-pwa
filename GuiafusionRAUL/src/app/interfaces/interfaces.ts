export interface Interfaces {
}

export interface Product{
    id: number|null;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string|null;
    rating_rate: number|null;
    rating_count: number|null;
}