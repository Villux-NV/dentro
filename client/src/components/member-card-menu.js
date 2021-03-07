import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { FaEllipsisH } from 'react-icons/fa';

import ModalCard from './member-card-modal';

const MemberCardMenu = ({ member, onSubmit, handleChangeFirstName, handleChangeLastName, firstName, lastName, addMemberId, handleDelete }) => {
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);

  const onClickAdd = () => {
    setModalShowAdd(true);
    addMemberId(member.id);
  }

  const onClickEdit = () => {
    setModalShowEdit(true);
  }

  const onClickDelete = () => {
    setModalShowDelete(true);
    addMemberId(member.id);
  }

  return (
    <DropdownButton
      id='dropdown-basic-button'
      title={<FaEllipsisH />}
      className='family__members__button'
      variant='lig'
      drop='right'
    >
      <Dropdown.Item type='button' onClick={onClickAdd}>Add Child</Dropdown.Item>
      <Dropdown.Item type='button' onClick={onClickEdit}>Edit Information</Dropdown.Item>
      <Dropdown.Item type='button' onClick={onClickDelete}>Delete Member</Dropdown.Item>
      <ModalCard
        showAdd={modalShowAdd}
        onHide={() => setModalShowAdd(false)}
        member={member}
        onSubmit={onSubmit}
        handleChangeFirstName={handleChangeFirstName}
        handleChangeLastName={handleChangeLastName}
        firstName={firstName}
        lastName={lastName}
        addMemberId={addMemberId}
      />
      <ModalCard
        showEdit={modalShowEdit}
        onHide={() => setModalShowEdit(false)}
        member={member}
      />
      <ModalCard
        showDelete={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
        member={member}
        handleDelete={handleDelete}
      />
    </DropdownButton>
  )
}

export default MemberCardMenu;