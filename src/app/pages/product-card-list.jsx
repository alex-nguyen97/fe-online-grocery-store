import { React } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import VegetablesImage from '../../assets/vegetables.jpg';
import { defaultSubCategory, setSelectedSubCategory } from "../storeSlice";
const products = [
    { id: 1, name: "Product 1", price: "$10", image: VegetablesImage },
    { id: 2, name: "Product 2", price: "$20", image: VegetablesImage },
    { id: 3, name: "Product 3", price: "$30", image: VegetablesImage },
    { id: 4, name: "Product 4", price: "$40", image: VegetablesImage },
    { id: 5, name: "Product 5", price: "$50", image: VegetablesImage },
    { id: 6, name: "Product 6", price: "$60", image: VegetablesImage },
    { id: 7, name: "Product 7", price: "$70", image: VegetablesImage },
    { id: 8, name: "Product 8", price: "$80", image: VegetablesImage },
];

const ProductCardList = () => {

    // Add all as a default subcategory
    const subCategories = useSelector((state) => {
        const selectedCategory = state.store.selectedCategory;
        const subCategoryList = selectedCategory ? selectedCategory.subcategories : [];
        return selectedCategory ? [defaultSubCategory, ...subCategoryList] : [defaultSubCategory];
    });

    const selectedSubCategory = useSelector((state) => {
        return state.store.selectedSubcategory;
    });

    const dispatch = useDispatch();

    const handleSelectSubCategory = (subCategory) => {
        dispatch(setSelectedSubCategory(subCategory));
    };

    return (
        <div style={{ padding: '20px' }}>
            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px' }}>
                <h2 style={{ textAlign: 'left', textTransform: 'uppercase', fontSize: '24px', margin: 0 }}>
                    Products
                </h2>
                <div>
                    {subCategories?.map((subCategory) => {
                        return (
                            <span
                                key={subCategory.name}
                                onClick={() => handleSelectSubCategory(subCategory)}
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "15px",
                                    fontSize: "16px",
                                    color: selectedSubCategory?.name === subCategory.name ? "green" : "black",
                                }}
                            >
                                {subCategory.name}
                            </span>
                        )
                    })}
                </div>
            </div>
            <Row xs={2} md={3} lg={5} className="g-3">
                {products.map((product) => (
                    <Col key={product.id} className="d-flex justify-content-center">
                        <Card style={{ width: "100%", maxWidth: "350px" }}>
                            <Card.Img
                                variant="top"
                                src={product.image}
                                style={{ height: "350px", objectFit: "cover" }}
                            />
                            <Card.Body className="p-2">
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.price}</Card.Text>
                                <Button variant="primary" size="sm">Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div >
    );
};

export default ProductCardList;
