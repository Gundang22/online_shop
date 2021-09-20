import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classes } from "istanbul-lib-coverage";
import {updateItem, deleteItem} from '../../../actions/itemAction';
import {addCart} from '../../../actions/cartAction';
import { useHistory } from 'react-router';
import axios from 'axios';

import EditItem from './EditItem';
import { Card, Button, Col, Toast} from 'react-bootstrap';

const Item = ({item}) => {
    const user = JSON.parse(localStorage.getItem('profile'))?.result;
    const history = useHistory();
    const dispatch = useDispatch();
    const {message} = useSelector((state) => state.cartItem);
    const [showMessage, setShowMessage] = useState(false);
    useEffect(() => {
        setShowMessage(true);
    }, [message]);

    const [itemData, setItemData] = useState({
        name: '',
        price: '',
        description: '',
        imageURL: '',
        imagePublic_id: '',
    });

    const [edit, setEdit] = useState(false);
    const [showDelete, setDelete] = useState(false);
    const [toast, setToast] = useState(false);
    const [addItemWarning, setAddItemWarning] = useState(false);

    const onDelete = (e) => {
        e.preventDefault();
        try{
            dispatch(deleteItem(item._id))
        } catch(err){
            console.log(err.message);
        }
    }

    const addItem = () => {
        if(localStorage.getItem('profile') === null){
            setAddItemWarning(true);
            return;
        }
        dispatch(addCart(item));
    }

    const dropDown = () => setToast(!toast);

    const handleEdit = () => setEdit(true);
    const handleDelete = () => setDelete(!showDelete);

    const showDetail = () => {
        history.push(`/items/${item._id}`);
    };

    return (
        <>  
            {
                message && 
                <Toast className="text-center bg-success" style={{position:"fixed", width:"180px", top:'30px', right:'30px', color:'#FF090960000', zIndex:'10'}} onClose={() => setShowMessage(false)} show={showMessage} delay = {3000} autohide>
                    <Toast.Body>
                        <strong>{message}</strong>
                    </Toast.Body>
                </Toast>
            }
            <EditItem item={item} edit={edit} setEdit={setEdit} />

            <Col sm={6} md={6} lg={4} xl={3} className="py-3">
                {/*Delete Item*/}
                <Toast onClose={() => handleDelete()} show={showDelete} style={{backgroundColor:'#FFA300', textAlign:'center'}}>
                    <h6>Are you sure you want to delete this item?</h6>
                    <Button variant='outline-danger' size='sm' onClick={onDelete}>delete</Button>
                    <Button variant='outline-success' size='sm' onClick={handleDelete}>cancel</Button>
                </Toast>
                <Toast onClose={() => setAddItemWarning(false)} show={addItemWarning} delay = {2000} autohide style={{backgroundColor:'#FFA300', textAlign:'center'}}>
                    <Toast.Body>
                        <strong>You must be logged in to add items to cart!</strong>
                    </Toast.Body>
                </Toast>

                <Card>
                    <a onClick={showDetail} style={{cursor:'pointer'}}>
                        <Card.Img src={item.imageURL} style={{height:'240px'}} />
                    </a>

                    {
                        user?.admin === 'true' && 
                        <a style={{position:'absolute', right:'10px'}} onClick={dropDown}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="yellow" class="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                            </svg>
                        </a>
                    }
                    <Toast onClose={() => setToast(true)} show={toast} style={{position:'absolute'}}>
                        <div style={{position:'absolute', marginTop:'25px', minWidth:'75px', right:'0', border:'1px solid', borderRadius:'7%', borderColor:'#008783', backgroundColor:'#009102', textAlign:'center'}}>
                            <a style={{cursor:'pointer'}} onClick={handleEdit}>Edit</a>
                            <br />
                            <a style={{cursor:'pointer'}} onClick={handleDelete}>Delete</a>
                        </div>
                    </Toast>
                        
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Text className="text-danger">
                            ${item.price}
                            <Button key={item.id}
                                variant="success" 
                                style={{float: "right"}}
                                onClick={addItem}
                            >Add Item</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}

export default Item;