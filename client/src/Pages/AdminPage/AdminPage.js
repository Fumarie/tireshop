import React, { useEffect } from 'react';
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteDisc,
    getAllDiscs,
    setAdminModal,
    setAdminModalType,
    setEditItem,
    setModal
} from "../../redux/actions/products";
import Loader from "../../components/Loader/Loader";
import AdminModal from "../../components/AdminModal/AdminModal";

const AdminPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDiscs())
    }, []);

    const {discs, adminLoading, adminModal} = useSelector(state => state.products)

    const openModal = (type, idDisc) => {
        dispatch(setAdminModalType(type))
        dispatch(setEditItem(idDisc))
        dispatch(setAdminModal(true))
    }

    return (
        <>
            {adminModal && <AdminModal show={adminModal} onHide={() => dispatch(setAdminModal(false))} />}
            {!adminLoading ?
            <><Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    {/*<th>Id</th>*/}
                    <th>Страна</th>
                    <th>Производитель</th>
                    <th>Диаметр</th>
                    <th>Ширина</th>
                </tr>
                </thead>
                <tbody>
                {discs.map((elem, index) =>
                    <tr key={index}>
                        <td>
                            {elem.idDisc}
                            <Button size="sm" onClick={() => dispatch(deleteDisc(elem.idDisc))} style={{marginLeft: 7}} variant="danger">Delete</Button>
                            <Button onClick={() => openModal(1, elem.idDisc)} style={{marginLeft: 7}} size="sm" variant="success">Edit</Button>
                        </td>
                        {/*<td>{elem.idDisc}</td>*/}
                        <td>{elem.vendorCountry}</td>
                        <td>{elem.vendorName}</td>
                        <td>{elem.discDiametr}</td>
                        <td>{elem.discWidth}</td>
                    </tr>
                )}
                </tbody>
            </Table>
                <>
                    <Button onClick={() => openModal(0)} variant="success">Добавить</Button>
                </>
            </>
            :
                <Loader/>}</>
    );
};

export default AdminPage;
