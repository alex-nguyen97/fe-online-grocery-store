import { React, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import VegetablesImage from '../../assets/vegetables.jpg';

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

    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Meats", "Milk", "Vegetables"];

    return (
        <div style={{ padding: '20px' }}>
            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px' }}>
                <h2 style={{ textAlign: 'left', textTransform: 'uppercase', fontSize: '24px', margin: 0 }}>
                    Products
                </h2>
                <div>
                    {categories.map((category) => (
                        <span
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            style={{
                                cursor: "pointer",
                                marginLeft: "15px",
                                fontSize: "16px",
                                color: selectedCategory === category ? "green" : "black",
                            }}
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>
            <Row xs={2} md={3} lg={5} className="g-3">
                {products.map((product) => (
                    <Col key={product.id} className="d-flex justify-content-center">
                        <Card style={{ width: "100%", maxWidth: "350px" }}> {/* Set max width */}
                            <Card.Img
                                variant="top"
                                src={product.image}
                                style={{ height: "350px", objectFit: "cover" }}
                            /> {/* Reduce image size */}
                            <Card.Body className="p-2"> {/* Reduce padding */}
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.price}</Card.Text>
                                <Button variant="primary" size="sm">Add to Cart</Button> {/* Smaller button */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div >
    );
};

export default ProductCardList;
