import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FaEllipsisH } from 'react-icons/fa';

import ModalCard from './member-card-modal';

const MemberCardMenu = ({ member, handleSubmit, handleChangeFirstName, handleChangeLastName, handleValue, handleDelete, firstName, lastName, addMemberId, value }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);

  const onClick = (val) => {
    setModalShow(true);
    addMemberId(member.id);

    if (val === 'Child') {
      handleValue('Child');
    } else if (val === 'Parent') {
      handleValue('Parent');
    } else {
      handleValue('Edit');
    }
  };

  const onClickDelete = () => {
    setModalShowDelete(true);
    addMemberId(member.id);
  };

  return (
    <DropdownButton
      id='dropdown-basic-button'
      title={<FaEllipsisH />}
      className='family__members__button'
      variant='lig'
      drop='right'
    >
      <Dropdown.Item type='button' onClick={() => onClick('Child')}>Add Child</Dropdown.Item>
      { member.Parent < 1 &&
        <Dropdown.Item type='button' onClick={() => onClick('Parent')}>Add Parent</Dropdown.Item>
      }
      <Dropdown.Item type='button' onClick={() => onClick('Edit')}>Edit Information</Dropdown.Item>
      <Dropdown.Item type='button' onClick={onClickDelete}>Delete Member</Dropdown.Item>
      <ModalCard
        showAdd={modalShow}
        onHide={() => setModalShow(false)}
        member={member}
        value={value}
        handleSubmit={handleSubmit}
        handleChangeFirstName={handleChangeFirstName}
        handleChangeLastName={handleChangeLastName}
        firstName={firstName}
        lastName={lastName}
        addMemberId={addMemberId}
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