import { React, useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import axios from 'axios'

export default function Categories({ catId, onClickCategory }) {
    const [categories, setCategory] = useState([])

    useEffect(() => {
        const getCategory = async () => {
            const response = await axios.get(`http://localhost:5000/categories`);
            setCategory(response.data)
        };
        getCategory()
    }, []);

    return (
        <>
            <h5 className='text-center mt-3'>Categories</h5>
            <Card>
                <ListGroup variant="flush">
                    <ListGroupItem 
                        style={{ cursor: 'pointer' }}
                        onClick={() => onClickCategory(0)}
                        className={catId === 0 ? 'active' : ''}
                        key={0}
                    >
                        All
                    </ListGroupItem>
                    {categories.map((data) => (
                        <ListGroupItem 
                            style={{ cursor: 'pointer' }}
                            onClick={() => onClickCategory(data.id)}
                            className={catId === data.id ? 'active' : ''}
                            key={data.id}
                        >
                            {data.name}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Card>
        </>
    )
}