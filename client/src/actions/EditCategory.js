import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';

import { useNavigate, useParams } from "react-router-dom";

export default function EditCategory() {
    //-------category select для добавления категории в список
    const [name, setName] = useState([]);
    
   
    //-------для создания redirect -переход по ссылке
    const navigate = useNavigate();
    const { id } = useParams();

    //выбор записи для редактирования по id
    useEffect(() => {
        // post by ID
        const  getCategoryById = async () => {
            const response = await axios.get(`http://localhost:5000/categories/${id}`);
            setName(response.data.name);
            
        };
        getCategoryById();
    },[id])

    //сохоанение записи в БД 
    const updateCategory = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/categories/${id}`, {
            name: name,
        });
        
        // end upload
        navigate('/categorylist');
    }

    return (
        <Container className="mt-1">
            <h2 className="text-center">Edit category id = {id} </h2>
            <Row>
                <Col md={{ span: 7, offset: 2 }}>
                    <Form onSubmit={updateCategory}>
                        <Form.Group controlId="formControlText">
                            <Form.Label>Title for the Category</Form.Label>
                            <Form.Control
                                className="input"
                                type="text"
                                placeholder="title"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit" className="mt-3">
                            Update category
                        </Button>
                        <Button variant="primary" className="mt-3 ms-3" href="/categorylist">
                            Posts category
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}