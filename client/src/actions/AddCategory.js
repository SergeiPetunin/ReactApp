import React,{useState} from "react";
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from "axios";

import { useNavigate } from 'react-router-dom';

export default function AddPost() {
    //-------------для данных таблицы posts
    const [name, setName] = useState('');
    //-------для создания redirect -переход по ссылке
    const navigate = useNavigate();


    //-------сохранение записи в БД и загрузка image на сервер
    const saveCategory = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/categories`, {
            name: name,
        });
        //------------------end upload
        navigate('/categorylist');
    };
    return (
        <Container className="mt-1">
            <h2 className="text-center">Add new Category</h2>
            <Row>
                <Col md={{ span: 7, offset: 2 }}>
                    <Form onSubmit={saveCategory}>
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
                            Save post
                        </Button>
                        <Button variant="primary" className="mt-3 ms-3" href="/postlist">
                            Posts List
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}