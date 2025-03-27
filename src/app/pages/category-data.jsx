import VegetablesImage from '../../assets/vegetables.jpg';
import FruitsImage from '../../assets/fruits.jpg';
import MeatsImage from '../../assets/meats.jpg';
import FishesImage from '../../assets/fish.jpg';

export const categories = [
    {
        name: 'Vegetables',
        image: VegetablesImage,
        subcategories: [
            { name: 'Leafy Greens', image: VegetablesImage },
            { name: 'Root Vegetables', image: VegetablesImage },
            { name: 'Cruciferous', image: VegetablesImage },
            { name: 'Mushrooms', image: VegetablesImage }
        ]
    },
    {
        name: 'Fruits',
        image: VegetablesImage,
        subcategories: [
            { name: 'Citrus', image: VegetablesImage },
            { name: 'Berries', image: VegetablesImage },
            { name: 'Tropical Fruits', image: VegetablesImage },
            { name: 'Stone Fruits', image: VegetablesImage }
        ]
    },
    {
        name: 'Meats',
        image: VegetablesImage,
        subcategories: [
            { name: 'Beef', image: VegetablesImage },
            { name: 'Pork', image: VegetablesImage },
            { name: 'Poultry', image: VegetablesImage },
            { name: 'Lamb', image: VegetablesImage }
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