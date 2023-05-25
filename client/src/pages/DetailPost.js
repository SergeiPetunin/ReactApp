import React,{useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


export default function DetailPost() {
    const [post, setPost] = useState('');
    const [category, setCategory] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const getPostById = async () => {
            const response = await axios.get(`http://localhost:5000/posts/${id}`);
            setPost(response.data);
            setCategory(response.data.category);
        };
        getPostById();
    }, [id]);
  return (
    <Container className="mt-1">
        <h2 className="text-center m-4">Post{post.id}</h2>
        <Row className="m-2" key={post.id}>
            <Col md="3">
                <img className="me-3 img-thumbnail" src={'/images/' + post.image} alt="Logo"></img>
            </Col>
            <Col md="9">
                <h5>{post.title}</h5>
                <p>{post.description}</p>
                <p>Category: {category.name}</p>
                <p>Date publisch: {post.createdAt}</p>
                <Link to={`/blog`} className="me-1">
                    Blog news List
                </Link>
            </Col>
        </Row>
    </Container>
  )
}
