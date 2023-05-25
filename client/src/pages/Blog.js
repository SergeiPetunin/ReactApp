import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import Categories from './Categories';
import BlogPost from './BlogPost';

export default function Blog() {
  const [activeIndex, setActiveIndex] = React.useState(0); //сотояние для Categories
  return (
    <Container className='mt-1'>
      <h2>Blog</h2>
      <Row>
        <Col md="9">
          <h5>POST LIST</h5>
          <BlogPost categoryId={activeIndex}/>
        </Col>

        <Col md="3">
          <Categories catId={activeIndex} onClickCategory={(id) => setActiveIndex(id)}/>
        </Col>
      </Row>
    </Container>
  )
}
