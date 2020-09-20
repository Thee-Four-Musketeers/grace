import React from 'react';
import Card from 'react-bootstrap/Card'


const ProductCard = ({title, description, image, type}) => {
return (
<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={image} />
  <Card.Body>
    <Card.Title>{title}</Card.Title>
    <Card.Text>{type}</Card.Text>
    <Card.Text>
      {description}
    </Card.Text>
    <Button variant="primary">Add to Cart</Button>
  </Card.Body>
</Card>
)
}


export default ProductCard