import React, {useState, useEffect} from 'react';
import { classes } from "istanbul-lib-coverage";
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import {updateItem, deleteItem} from '../../../actions/itemAction';
import { Card, Button, Col, Toast, Form, Modal, Row } from 'react-bootstrap';

const EditItem = ({item, edit, setEdit}) => {
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [itemImage, setItemImage] = useState(null);
    const [readyDispatch, setReadyDispatch] = useState(false);
    const [itemData, setItemData] = useState({
        name: item.name,
        price: item.price,
        description: item.description,
        imageURL: item.imageURL,
        imagePublic_id: item.imagePublic_id,
    });

    useEffect(() => {
        if(readyDispatch){
            dispatch(updateItem(item._id, itemData));
            setCloseEdit();
        }
    }, [readyDispatch]);

    const Submit = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);

        if(itemData.name !== '' && itemData.price !== '' && itemImage !== ''){
            if(itemImage?.size > 10485760){
                console.log('file size too large');
                return;
            }
            const formData = new FormData();
            formData.append('file', itemImage);
            formData.append('upload_preset', 'rauikwqt');
            try{
                const result = await axios.post("https://api.cloudinary.com/v1_1/dzdb5v1iq/image/upload", formData);
                const public_id = result.data.public_id;
                const imagePath = result.data.secure_url;
                setItemData({...itemData, imageURL: imagePath, imagePublic_id: public_id});

                setReadyDispatch(true);
            } catch(err){
                console.log(err.message);
            }
        } else{
            console.log('missing field');
        }
    };

    const setCloseEdit = () => {
        setClear();
        setEdit(false);
    };

    const setClear = () => {
        setItemImage('');
        setValidated(false);
        setItemData({
            name: '',
            price: '',
            description: '',
            imageURL: '',
            imagePublic_id: '',
        });
        setReadyDispatch(false);
    };

    return (
        <>
            <Modal show={edit} onHide={setEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Item Id: {item._id}</p>
                    <Form noValidate validated={validated} onSubmit={Submit}>
                        <Row className="mb-3">
                            <Form controlId="validationCustom01">
                                <Form.Label>Item Name:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Item Name"
                                    defaultValue={item.name}
                                    onChange={e => setItemData({...itemData, name: e.target.value})}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please Enter Item name!
                                </Form.Control.Feedback>
                            </Form>
                            <Form controlId="validationCustom02">
                                <Form.Label>Item Price:</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    defaultValue={item.price}
                                    placeholder="Price"
                                    onChange={e => setItemData({...itemData, price: e.target.value})}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Item Price!
                            </Form.Control.Feedback>
                            </Form>
                            
                            <Form>
                                <Form.Label>Item Description:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Item Description"
                                    defaultValue={item.description}
                                    onChange={e => setItemData({...itemData, description: e.target.value})}
                                />
                            </Form>

                            <Form controlId="validationCustom03">
                                <Form.Label>Item Image:</Form.Label>
                                <br/>
                                <Form.Control
                                    required
                                    type="file"
                                    onChange={(e) => {setItemImage(e.target.files[0])}}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please Select an Image File!
                            </Form.Control.Feedback>
                            </Form>
                        </Row>
                        <Button type="submit" className="mt-3">Add Item</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditItem;
