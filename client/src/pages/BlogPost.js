import React, {useState, useEffect, useContext} from 'react'
import { Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SearchContext } from '../components/Header'

//categoryId передаём кк параметр при выборе ссылки из списка категорийй

export default function BlogPost({ categoryId }) {
    const { searchValue } = useContext(SearchContext);

    const [posts, setPosts ] = useState([])

    useEffect(() => {
        //маршруты, если выбранаили не выбрана категория
        const category_id = categoryId > 0 ? `/category/${categoryId}` : ''
        const getPosts = async () => {
            const response = await axios.get(`http://localhost:5000/posts${category_id}`)
            setPosts(response.data);
        }
        getPosts()
    }, [categoryId])

    return (
        <>
            {posts
                .filter((data) => {
                    if(data.title.toLowerCase().includes(searchValue.toLowerCase())) {
                        return true;
                    }
                    return false;
                })
                .map((data) => (
                <Row className="m-2" key={data.id}>
                    <Col md="3">
                        <img className="mr-3 img-thumbnail" src={'/images/' + data.image} alt="Logo" />
                    </Col>
                    <Col md="9">
                        <h5>{data.title}</h5>
                        <p>{data.description}</p>
                        <p>
                            <span className="fst-italic">Category:</span> {data.category.name}
                        </p>
                        <p>
                            <span className="fst-italic">Date publisch:</span> {data.createdAt}
                        </p>
                        <Link to={`/detailpost/${data.id}`} className="me-1">
                            Detail
                        </Link>
                    </Col>
                    <hr/>
                </Row>
            ))}
        </>
    )
}