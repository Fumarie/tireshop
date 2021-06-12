import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { editProduct, getDiscMakers, getProduct, getTireMakers } from "../../redux/actions/products";
import { Button, Form, Modal } from "react-bootstrap";

const EditModal = (props) => {
    const {id} = props
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTireMakers())
        dispatch(getDiscMakers())
    }, []);

    const {tireMakers, discMakers, products} = useSelector(state => state.products)

    console.log(discMakers)

    const editValidation = () => {
        return editData.price.length > 0 && editData.tire.length > 0 && editData.tire.length
    }

    const editSubmitHandler = event => {
        event.preventDefault()

        const tireMakerName = editData.tire
        const discMakerName = editData.disc
        const tireMakerId = tireMakers.find(maker => maker.tireMakerName === tireMakerName).tireMakerId
        const discMakerId = discMakers.find(maker => maker.discMakerName === discMakerName).discMakerId

        const tireId = products.find(product => product.tireMakerId === tireMakerId).tireId
        const discId = products.find(product => product.discMakerId === discMakerId).discId

        const data = {
            price: editData.price,
            description: editData.description.length > 0 ? editData.description : null,
            tireId,
            discId
        }

        console.log(data)

        dispatch(editProduct(id, data))
        props.onHide()
    }

    const [editData, setEditData] = useState({
        price: '', description: '', tire: '', disc: '', productId: id
    })

    const changeHandler = event => {
        setEditData({ ...editData, [event.target.name]: event.target.value})
        console.log(editData)
    }

    const onClose = () => {
        props.onHide()
        setEditData({price: '', description: '', tire: '', disc: '', productId: id})
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
                    Товар номер {id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Редактирование товара</h4>
                <Form onSubmit={editSubmitHandler} style={{
                    margin: '0 auto',
                    maxWidth: '400px'}}>
                    <Form.Group size="lg" controlId="price">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control name="price" type="number" value={editData.price} onChange={changeHandler}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control name="description" as="textarea" rows={3} value={editData.description} onChange={changeHandler} />
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
                    <Button variant="info" block size="lg" type="submit" disabled={!editValidation()}>
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

export default EditModal;
