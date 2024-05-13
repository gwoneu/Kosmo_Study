import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ImageModal = ({box, setBox}) => {
    const handleClose = () => setBox({...box, show:false});
    return (
        <>
            <Modal
                show={box.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className='p-3'>
                        <img src={box.url} width="100%"/>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ImageModal