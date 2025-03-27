import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory } from '../storeSlice';

function CategoriesList() {

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

  const categories = useSelector((state) => {
    return state.store.categories;
  });

  const dispatch = useDispatch();

  const handleSelectCategory = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'left', marginBottom: '20px', textTransform: 'uppercase', fontSize: '24px' }}>featured categories</h2>
      <Row xs={1} md={3} lg={6} className="g-3">
        {categories.map((category, index) => (
          <Col key={index}>
            <Card
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('img').style.opacity = '0.7'; // Reduce opacity on hover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('img').style.opacity = '1'; // Restore opacity on hover out
              }}
              onClick={() => handleSelectCategory(category)}
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