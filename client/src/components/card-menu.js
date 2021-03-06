import { Dropdown, DropdownButton } from "react-bootstrap";

const CardMenu = () => {
  return (
    <div className='memberchildren-button-container'>
      <DropdownButton id='dropdown-basic-button' title='Edit' className='memberchildren-button'>
        <Dropdown.Item>Add Child</Dropdown.Item>
        <Dropdown.Item>Edit Information</Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default CardMenu;