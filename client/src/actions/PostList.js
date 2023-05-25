import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from 'axios';

export default function PostList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts();
    },[])

    //список новостей из БД
    const getPosts = async () => {
        const response = await axios.get(`http://localhost:5000/posts`);
        setPosts(response.data)
    };

    //удалить новость
    const deletePost = async (id) => {
        if(window.confirm('Delete record #' + id + ' ?')) {
            await axios.delete(`http://localhost:5000/posts/${id}`)
            getPosts();
        }
    };

    return (
        <Container className="mt-1">
            <h2 className="text-center mt-3">Posts List Manage</h2>
            <Row>
                <Col md={{ span: 9, offset: 2 }}>
                    <p className="text-end">
                        <Link to="/addpost">
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
                                <th>Category</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, index) => (
                                <tr key={post.id}>
                                    <td>{index + 1}. #{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.createdAt}</td>
                                    <td>{post.category.name}</td>
                                    <td className="text-center">

                                        <Link to={`/detailpost/${post.id}`} className="me-1">
                                            <Button variant="success" size="sm">
                                                Detail
                                            </Button>
                                        </Link>

                                        <Link to={`/editpost/${post.id}`} className="me-1">
                                            <Button variant="primary" size="sm">
                                                Edit
                                            </Button>
                                        </Link>

                                        <Button onClick={() => deletePost(post.id)} variant="danger" size="sm">
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