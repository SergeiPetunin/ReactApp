import React from 'react'
import programsList from '../data/program.json'

import { Container, Row, Col } from 'react-bootstrap'
import  Accordion  from 'react-bootstrap/Accordion'

export default function AccordionBox() {
  return (
    <Container className="mt-5">
        <Row>
            <Col md={{ span: 7, offset: 2}}>
                <h2>AccordionBox</h2>
                <Accordion defaultActiveKey="1">
                    {programsList.map((data) => (
                        <Accordion.Item eventKey={data.id} key={data.id}>
                            <Accordion.Header>
                                {data.name} #{data.id}
                            </Accordion.Header>
                            <Accordion.Body>{data.description}</Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Col>
        </Row>
    </Container>
  )
}
