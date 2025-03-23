import React from "react";
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
    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', textTransform: 'uppercase' }}>Products</h2>
            <Row xs={1} md={2} lg={4}
                className="g-4">
                {products.map((product) => (
                    <Col key={product.id}>
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.price}</Card.Text>
                                <Button variant="primary">Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductCardList;
