import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Form, Modal } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa';

const MemberStart = ({ handleSubmit, handleFirstName, handleLastName, handleBirthday, handleValue, firstName, lastName, birthday }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleClick = () => {
    setModalShow(true);
    handleValue('Start');
  };

  return (
    <div className='family__children'>
      <motion.div layout initial={{ borderRadius: 25 }} className='family__members'>
        <div className='family__members__names'>Add Starting Family Member</div>
        <div>
          <Button
            id='dropdown-basic-button'
            className='family__members__button'
            variant='light-outline'
            onClick={handleClick}
          >
            <FaPlus />
          </Button>
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id='contained-modal-title-vcenter'>
                Add Family Member
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className='form__container__modal' onSubmit={handleSubmit}>
                <Form.Group controlId='formFirstName'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type='text' value={firstName} onChange={handleFirstName} />
                </Form.Group>

                <Form.Group controlId='formLastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type='text' value={lastName} onChange={handleLastName} />
                </Form.Group>

                <Form.Group controlId='formBirthday'>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control type='date' value={birthday} onChange={handleBirthday} placeholder='MM-DD' />
                </Form.Group>

                <Button variant='outline-dark' size='sm' type='submit' value='Submit' onClick={() => setModalShow(false)}>
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberStart;