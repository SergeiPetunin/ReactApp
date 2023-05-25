import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';

import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
    //-------category select для добавления категории в список
    const [categories, setCategory] = useState([]);
    useEffect(() => {
        const getCategory = async () => {
            const response = await axios.get(`http://localhost:5000/categories`);
            setCategory(response.data);
        };
        getCategory();
    }, []);
    //-------------для данных таблицы posts
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [oldImage, setOldImage] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    //-------для preview выбранной с диска картинки -image
    const [image, setImage] = useState({ preview: '', data: '' });
    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setImage(img); //for upload
        setFile(img.data.name); //for record DB
    };
    //-------для создания redirect -переход по ссылке
    const navigate = useNavigate();
    const { id } = useParams();

    //выбор записи для редактирования по id
    useEffect(() => {
        // post by ID
        const  getPostById = async () => {
            const response = await axios.get(`http://localhost:5000/posts/${id}`);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setFile(response.data.image);
            setOldImage(response.data.image);
            setCategoryId(response.data.categoryId);
        };
        getPostById();
    },[id])

    //сохоанение записи в БД и загрузка image на сервер
    const updatePost = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/posts/${id}`, {
            title: title,
            description: description,
            categoryId: categoryId,
            image: file,
        });
        //upload image server
        let formData = new FormData()
        formData.append(`file`, image.data)
        await fetch(`http://localhost:5000/image`, {
            method: 'POST',
            body: formData,
        });
        // end upload
        navigate('/postlist');
    }

    return (
        <Container className="mt-1">
            <h2 className="text-center">Edit post id = {id} </h2>
            <Row>
                <Col md={{ span: 7, offset: 2 }}>
                    <Form onSubmit={updatePost}>
                        <Form.Group controlId="formControlText">
                            <Form.Label>Title for the Post</Form.Label>
                            <Form.Control
                                className="input"
                                type="text"
                                placeholder="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formControlText">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className="input"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formControlText">
                            <Form.Label>Post category</Form.Label>
                            <Form.Select 
                                name="categoryId" 
                                onChange={(e) => setCategoryId(e.target.value)}
                                value={categoryId}
                            >
                                <option key={0} value={0}>Select Category</option>
                                {categories.map((data) => (
                                    <option key={data.id} value={data.id}>
                                        {data.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        {image.preview && <img src={image.preview} width="100" height="100" alt="Logo" />}
                        <hr />
                        <Form.Group controlId="formControlText">
                            <Form.Label>Choice file</Form.Label>
                            <Form.Control
                                className="input"
                                type="file"
                                filename={file}
                                onChange={handleFileChange}
                            />
                            <hr/>
                            <Form.Label>Old Image</Form.Label>
                            <img
                                className="mr-3 img-thumbnail"
                                src={'/images/' + oldImage}
                                alt="Logo"
                                width={100}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Update post
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