import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Container } from 'react-bootstrap';
import Item from './Item/Item';
import {AddItem} from '../AddItem/AddItem.js';
import { CircularProgress, Button } from '@material-ui/core';
import { Toast } from 'react-bootstrap';
import { getItemsPage } from '../../actions/itemAction';

export const Items = () => {
    const user = JSON.parse(localStorage.getItem('profile'))?.result;
    getItemsPage();
    const { items, message } = useSelector((state) => state.items);
    const [showToast, setShowToast] = useState(false);
    useEffect(() => {
        setShowToast(true);
    }, [message]);

    return (
        <div>
            {user?.admin === 'true' && <AddItem />}
            {
                message && 
                <Toast className="text-center bg-success" style={{position:"fixed", width:"180px", top:'30px', right:'30px', color:'#FF090960000', zIndex:'10'}} onClose={() => setShowToast(false)} show={showToast} delay = {3000} autohide>
                    <Toast.Body>
                        <strong>{message}</strong>
                    </Toast.Body>
                </Toast>
            }
            
            <Container className='py-4'>
                <Row style={{width:'auto'}}>
                    {
                        !items?.length ?
                        (
                            <CircularProgress />
                        ) : (
                            items.map(item => <Item item={item} key={item._id} />)
                        )
                    }
                </Row>
            </Container>
        </div>
    );
}

export default Items;