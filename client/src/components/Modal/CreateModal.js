import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getDiscMakers, getTireMakers } from "../../redux/actions/products";

const CreateModal = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTireMakers())
        dispatch(getDiscMakers())
    }, []);

    const {tireMakers, discMakers, products} = useSelector(state => state.products)

    const SubmitHandler = event => {
        event.preventDefault()

        const tireMakerName = data.tire
        const discMakerName = data.disc

        const tireMakerId = tireMakers.find(maker => maker.tireMakerName === tireMakerName).tireMakerId
        const discMakerId = discMakers.find(maker => maker.discMakerName === discMakerName).discMakerId

        const tireId = products.find(product => product.tireMakerId === tireMakerId).tireId
        const discId = products.find(product => product.discMakerId === discMakerId).discId

        const finishData = {
            price: data.price,
            description: data.description.length > 0 ? data.description : null,
            tireId,
            discId
        }

        console.log(data)

        dispatch(createProduct(finishData))
        props.onHide()
    }


    const [data, setData] = useState({
        price: '', description: '', tire: '', disc: ''
    })

    const changeHandler = event => {
        setData({ ...data, [event.target.name]: event.target.value})
        console.log(data)
    }

    const onClose = () => {
        props.onHide()
    }

    const Validation = () => {
        return data.price.length > 0 && data.tire.length > 0 && data.tire.length
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создание нового товара
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={SubmitHandler} style={{
                    margin: '0 auto',
                    maxWidth: '400px'}}>
                    <Form.Group size="lg" controlId="price">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control name="price" type="number" value={data.price} onChange={changeHandler} />
                    </Form.Group>
                    <Form.Group size="lg" controlId="description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control name="description" as="textarea" rows={3} value={data.description} onChange={changeHandler}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="tire">
                        <Form.Label>Покрышка</Form.Label>
                        <Form.Control
                            as="select"
                            name="tire"
                            autoFocus
                            type="text"
                            onChange={changeHandler}
                        >
                            <option></option>
                            {tireMakers.map((elem, index) => <option key={index}>{elem.tireMakerName}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group size="lg" controlId="disc">
                        <Form.Label>Диск</Form.Label>
                        <Form.Control
                            as="select"
                            name="disc"
                            type="text"
                            onChange={changeHandler}
                        >
                            <option></option>
                            {discMakers.map((elem, index) => <option key={index}>{elem.discMakerName}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="info" block size="lg" type="submit" disabled={!Validation()}>
                        Изменить
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateModal;
