import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import BannerBox from '../components/BannerBox'
import AccordionBox from '../components/AccordionBox'
import CardBox from '../components/CardBox'


import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../components/Header';

export default function Home() {
  const navigate = useNavigate();
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    if(searchValue) {
      navigate('/blog');
    }
  })

  return (
    <div>
      <BannerBox />

      <Container className="mt-3">
            <h2>Home page</h2>
      </Container>

      <AccordionBox />
      
      <CardBox />
    </div>
  )
}
