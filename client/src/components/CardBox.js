import { React, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

export default function CardBox() {
    const [ service, setService ] = useState([])

    useEffect(() => {
        fetch(`https://641c001c9b82ded29d5d8666.mockapi.io/services`)
        .then((res) => {
            return res.json();
        })
        .then((arr) => {
            setService(arr);
        })
    })
  return (
    <Container fluid className="mt-5 bg-light">
        <Row>
            <Col md={{ span:8, offset: 2 }}>

                <h2 className="mt-5 text-center">
                    CardBox
                </h2>

                <Row xs={1} md={2} className="g-4">
                    {service.map((data) => (
                        <Col>
                        <Card className="m-2" key={data.id}>
                            <Card.Img variant="top" src={data.image} style={{ height: 204 }} />
                            <Card.Body>
                                <Card.Title>{data.name}</Card.Title>
                                <Card.Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}
                    
                </Row>

            </Col>
        </Row>
    </Container>
  )
}
