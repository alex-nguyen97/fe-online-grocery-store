import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VegetablesImage from '../../assets/vegetables.jpg';
import FruitsImage from '../../assets/fruits.jpg';
import MeatsImage from '../../assets/meats.jpg';
import FishesImage from '../../assets/fish.jpg';

import SearchBar from './search-bar';

function CategoriesList() {
  const categories = [
    { name: 'Vegetables', image: VegetablesImage },
    { name: 'Fruits', image: FruitsImage },
    { name: 'Meats', image: MeatsImage },
    { name: 'Fishes', image: FishesImage },
  ];

  const cardStyle = {
    width: '100%',
    height: '200px',
    position: 'relative',
    overflow: 'hidden', // Ensure the image doesn't overflow
    cursor: 'pointer', // Change cursor to pointer on hover
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease', // Smooth transition for opacity
  };

  const overlayStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  const cardTitleStyle = {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    transition: 'opacity 0.3s ease',
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', textTransform: 'uppercase' }}>categories</h2>
      <Row className="g-4">
        {categories.map((category, index) => (
          <Col key={index} xs={12} sm={6} md={3}>
            <Card
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('img').style.opacity = '0.7'; // Reduce opacity on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('img').style.opacity = '1'; // Restore opacity on hover out
              }}
            >
              <Card.Img variant="top" src={category.image} style={imageStyle} />
              <Card.ImgOverlay style={overlayStyle}>
                <Card.Title style={cardTitleStyle}>
                  {category.name}
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CategoriesList;