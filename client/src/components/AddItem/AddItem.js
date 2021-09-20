import React, { useEffect, useState } from "react";
import { Toast, Button, Modal, Form, Row } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import axios from 'axios';
import {postItem} from '../../actions/itemAction';
import { ChipInput } from 'material-ui-chip-input';


export const AddItem = () => {
    const dispatch = useDispatch();
    const [itemImage, setItemImage] = useState(null);
    const [readyDispatch, setReadyDispatch] = useState(false);
    const [tags, setTags] = useState([]);
    const [itemData, setItemData] = useState({
        name: '',
        price: '',
        description: '',
        imageURL: '',
        imagePublic_id: '',
    });

    useEffect(() => {
        if(readyDispatch){
            dispatch(postItem(itemData));
            handleClose();
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
    }

    const [showToast, setShowToast] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setClear();
        setShow(false);
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
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);

    return (
        <div>
            <a onClick={handleShow} style={{"cursor":"pointer","position":"fixed","bottom":"20px","right":"20px", zIndex:'10'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg>
            </a>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={Submit}>
                        <Row className="mb-3">
                            <Form controlId="validationCustom01">
                                <Form.Label>Item Name:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Item Name"
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
                                    onChange={e => setItemData({...itemData, description: e.target.value})}
                                />
                            </Form>

                            <Form controlId="validationCustom03">
                                <Form.Label>Item Image:</Form.Label>
                                <br/>
                                <Form.Control
                                    required
                                    type="file"
                                    placeholder="Image"
                                    onChange={(e) => {setItemImage(e.target.files[0])}}
                                />
                            <Form.Control.Feedback type="invalid">
                                Please Select a Item Image!
                            </Form.Control.Feedback>
                            </Form>
                        </Row>
                        <Button type="submit" className="mt-3">Add Item</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}