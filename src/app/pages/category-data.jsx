import VegetablesImage from '../../assets/vegetables.jpg';

export const categories = [
    {
        name: 'Vegetables',
        image: VegetablesImage,
        subcategories: [
            { name: 'Leafy Greens' },
            { name: 'Root Vegetables' },
            { name: 'Cruciferous' },
            { name: 'Mushrooms' }
        ]
    },
    {
        name: 'Fruits',
        image: VegetablesImage,
        subcategories: [
            { name: 'Citrus' },
            { name: 'Berries' },
            { name: 'Tropical Fruits' },
            { name: 'Stone Fruits' }
        ]
    },
    {
        name: 'Meats',
        image: VegetablesImage,
        subcategories: [
            { name: 'Beef' },
            { name: 'Pork' },
            { name: 'Poultry' },
            { name: 'Lamb' }
        ]
    },
    {
        name: 'Fishes',
        image: VegetablesImage,
        subcategories: [
            { name: 'Saltwater Fish', image: VegetablesImage },
            { name: 'Freshwater Fish', image: VegetablesImage },
            { name: 'Shellfish', image: VegetablesImage }
        ]
    }
];