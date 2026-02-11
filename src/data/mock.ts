// Mock Product Data for Inrama Demo

export interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    category: string;
    tags?: string[];
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'SASKIA BIKINI TOP',
        price: '$65.00 AUD',
        image: '/photos/KEHLANI1_2048x2048.webp',
        category: 'SWIM',
        tags: ['NEW', 'SUMMER ESSENTIALS']
    },
    {
        id: '2',
        name: 'SASKIA BIKINI BOTTOMS',
        price: '$65.00 AUD',
        image: '/photos/Facetune_01-12-2025-21-50-05_COLOURTONE_9de8bbc9-6791-4721-9290-668cd3acb488_2048x2048.webp',
        category: 'SWIM',
        tags: ['NEW']
    },
    {
        id: '3',
        name: 'SASKIA HOT SHORT',
        price: '$75.00 AUD',
        image: '/photos/Facetune_30-11-2025-21-56-23_COLOURTONE_2048x2048.webp',
        category: 'BOTTOMS',
        tags: ['TRENDING']
    },
    {
        id: '4',
        name: 'INRAMA LAYERED TEE',
        price: '$130.00 AUD',
        image: '/photos/Screenshot 2026-02-11 104501.png',
        category: 'TOPS',
        tags: ['BESTSELLER']
    },
    {
        id: '5',
        name: 'INRAMA RIB TANK - BEIGE',
        price: '$60.00 AUD',
        image: '/photos/Screenshot 2026-02-11 104232.png',
        category: 'TOPS',
        tags: ['ESSENTIALS']
    },
    {
        id: '6',
        name: 'INRAMA RIB TANK - BLACK',
        price: '$60.00 AUD',
        image: '/photos/Screenshot 2026-02-11 104304.png',
        category: 'TOPS',
        tags: ['ESSENTIALS']
    },
    {
        id: '7',
        name: 'JADE LEATHER CORSET',
        price: '$110.00 AUD',
        image: '/photos/Screenshot 2026-02-11 104217.png',
        category: 'TOPS',
        tags: ['STATEMENT']
    },
    {
        id: '8',
        name: 'JAYDA DENIM JEANS',
        price: '$190.00 AUD',
        image: '/photos/Screenshot 2026-02-11 104331.png',
        category: 'BOTTOMS',
        tags: ['DENIM']
    },
    {
        id: '9',
        name: 'JERSEY SHORTS',
        price: '$100.00 AUD',
        image: '/photos/jesey_2048x2048.webp',
        category: 'BOTTOMS',
        tags: ['NEW']
    }
];

export const DROPS = [
    {
        id: 'drop_1',
        name: 'THE MIDNIGHT COLLECTION',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days from now
        image: '/photos/Facetune_30-11-2025-22-16-08_COLOURTONE_2048x2048.webp',
        pieceCount: 12
    }
];

export const USER_PROFILE = {
    name: 'Amarni Skaf',
    tier: 'Platinum',
    points: 2450,
    nextTierPoints: 5000,
    email: 'amarni@inrama.com.au'
};
