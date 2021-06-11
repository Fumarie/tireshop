import React from 'react';
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import classes from './Product.module.css'
import { ListGroup } from "react-bootstrap";

const urls = [
    'https://kolesa-asb.ru/upload/robotyre/65784_800.jpg',
    'https://kolesa-asb.ru/upload/robotyre/section_4683_800.jpg',
    'https://kolesa-asb.ru/upload/robotyre/section_4950_800.jpg'
]

const Product = ({id, price, description, tire, disc}) => {
    return (
        <Link to={{pathname: `/product/${id}`}}>
            <Card className={classes.card} >
                <Card.Img style={{width: 220, height: 220, margin: '0 auto', paddingTop: 10}} variant="top"
                          src={urls[Math.round(Math.random()*2)]}/>
                <Card.Body>
                    <Card.Title>Комплект:</Card.Title>
                    <ListGroup variant="flush" >
                        <ListGroup.Item style={{paddingLeft: 0}}><b>Диск:</b> {disc.name}, {disc.country}</ListGroup.Item>
                        <ListGroup.Item style={{paddingLeft: 0}}><b>Покрышка:</b> {tire.name}, {tire.country}</ListGroup.Item>
                        <ListGroup.Item style={{paddingLeft: 0}}></ListGroup.Item>
                    </ListGroup>
                    <Card.Text>
                        {description ? description : 'Описание к данному товару отсутствует.'}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Цена: {price} ₽</small>
                </Card.Footer>
            </Card>
        </Link>
    );
};

export default Product;
