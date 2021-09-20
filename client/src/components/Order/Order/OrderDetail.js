import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {Modal, Form, Row, DropdownButton, Dropdown, Button, InputGroup, FormControl} from 'react-bootstrap';
import {Paper} from '@material-ui/core';
import {updateOrder} from '../../../actions/orderAction';

export const OrderDetail = ({order, show, setShow, color, setColor}) => {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [orderData, setOrderData] = useState({
        orderNumber: order.orderNumber,
        user: order.user,
        items: order.items,
        orderData: order.orderDate,
        status: order.status,
        comment: order.comment,
    })

    const handleClose = () => {
        setShow(false);
    };

    const Submit = (e) => {
        e.preventDefault();
        dispatch(updateOrder(order._id, orderData));
        if(orderData.status === 'pending'){
            setColor('yellow');
        } else if (orderData.status === 'shipped'){
            setColor('green');
        } else setColor('red');
        handleClose();
    }

    const setPending = (e) => {
        e.preventDefault();
        setOrderData({...orderData, status: 'pending'});
    }
    const setShipped = (e) => {
        e.preventDefault();
        setOrderData({...orderData, status: 'shipped'});
    }
    const setCanceled = (e) => {
        e.preventDefault();
        setOrderData({...orderData, status: 'canceled'});
    }

    const itemList = 
        orderData.items.map((item) => 
            <Paper elevation={6} style={{backgroundColor:'#EDEDED', cursor:'pointer', marginBottom:'10px'}}>
                <a key={item._id}>Item ID: {item._id}</a><br/>
                <a key={item._id}>Item name: {item.name}</a><br/>
                <a key={item._id}>Item quantity: {item.quantity}</a>
            </Paper>
        );

    const ss = () => {
        console.log(color);
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Order Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button onClick={ss}>123</Button>
                <Form noValidate validated={validated} onSubmit={Submit}>
                    <Row className='mb-3'>
                        <Form.Label>Order Number: #{orderData.orderNumber}</Form.Label>
                        <Form.Label>User ID: {orderData.user._id}</Form.Label>
                        <Form.Label>User Name: {orderData.user.name}</Form.Label>
                        <Form.Label>User Email: {orderData.user.email}</Form.Label>
                        <Form.Label>Items: </Form.Label>
                        {itemList}
                        <Form.Label style={{paddingTop: '10px'}}>Order Date: {orderData.orderDate}</Form.Label>
                        <Form.Label>Order Status: 
                            <DropdownButton variant='info' title={orderData.status} style={{display:'inline', paddingLeft:'10px'}}>
                                <Dropdown.Item onClick={setPending}>Pending</Dropdown.Item>
                                <Dropdown.Item onClick={setShipped}>Shipped</Dropdown.Item>
                                <Dropdown.Item onClick={setCanceled}>Canceled</Dropdown.Item>
                            </DropdownButton>
                        </Form.Label>
                        <Form.Label>Comment:</Form.Label>
                        <FormControl onChange={(e) => setOrderData({...orderData, comment: e.target.value})} as='textarea' value={orderData.comment} />
                    </Row>
                    <Button type='submit'>Update</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default OrderDetail;