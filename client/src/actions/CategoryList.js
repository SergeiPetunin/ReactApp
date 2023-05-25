import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export default function CategoriesList() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories();
    },[])

    //список категорий из БД
    const getCategories = async () => {
        const response = await axios.get(`http://localhost:5000/categories`);
        setCategories(response.data)
    };

    //удалить категорию
    const deleteCategory = async (id) => {
        if(window.confirm('Delete record #' + id + ' ?')) {
            await axios.delete(`http://localhost:5000/categories/${id}`)
            getCategories();
        }
    };

    return (
        <Container className="mt-1">
            <h2 className="text-center mt-3">Category List Manage</h2>
            <Row>
                <Col md={{ span: 9, offset: 2 }}>
                    <p className="text-end">
                        <Link to="/addcategory">
                            <Button variant="primary" size="sm">
                                Add New
                            </Button>
                        </Link>
                    </p>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>No#</th>
                                <th>Title</th>
                                <th>Created date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((categories, index) => (
                                <tr key={categories.id}>
                                    <td>{index + 1}. #{categories.id}</td>
                                    <td>{categories.name}</td>
                                    <td>{categories.createdAt}</td>
                                    <td className="text-center">

                                        <Link to={`/editcategory/${categories.id}`} className="me-1">
                                            <Button variant="primary" size="sm">
                                                Edit
                                            </Button>
                                        </Link>

                                        <Button onClick={() => deleteCategory(categories.id)} variant="danger" size="sm">
                                            Delete
                                        </Button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
} 