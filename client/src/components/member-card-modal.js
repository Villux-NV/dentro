import { Modal, Form, Button } from "react-bootstrap";

const ModalCard = ({ value, onHide, handleSubmit, handleChangeFirstName, handleChangeLastName, firstName, lastName, showAdd, showDelete, handleDelete }) => {
  
  const checkValue = () => {
    if (value === 'Child') {
      return 'Add Child';
    } else if (value === 'Parent') {
      return 'Add Parent';
    } else {
      return 'Edit Member';
    }
  }

  return (
    <div>
      <Modal
        show={showAdd}
        onHide={onHide}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {checkValue()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='form__container' onSubmit={handleSubmit}>
            <Form.Group controlId='formFirstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type='text' onChange={handleChangeFirstName} value={firstName} />
            </Form.Group>

            <Form.Group controlId='formLastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type='text' onChange={handleChangeLastName} value={lastName} />
            </Form.Group>

            <Button variant='outline-dark' size='sm' type='submit' value='Submit' onClick={onHide}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showDelete}
        onHide={onHide}
        aria-labelledby='contained-modal-title-vcenter'
        size='sm'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Delete Member
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal__body'>
          <div className='modal__body__buttons'>
            <Button onClick={onHide} variant='outline-primary'>Cancel</Button>
          </div>
          <div className='modal__body__buttons'>
            <Button onClick={function () {handleDelete(); onHide()}} variant='outline-danger'>Confirm</Button>
          </div>
        </Modal.Body>
        <Modal.Footer className='dflex justify-content-center'>
          This will disconnect all children!
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalCard;