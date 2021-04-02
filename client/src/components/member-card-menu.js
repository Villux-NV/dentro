import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FaEllipsisH } from 'react-icons/fa';

import ModalCard from './member-card-modal';

const MemberCardMenu = ({ member, handleSubmit, handleFirstName, handleLastName, handleBirthday, handleValue, handleDeleteMember, firstName, lastName, birthday, addMemberId, value }) => {
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
      drop='up'
    >
      <Dropdown.Item type='button' style={{ transform: 'translateX(-10)'}} onClick={() => onClick('Child')}>Add Child</Dropdown.Item>
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
        handleFirstName={handleFirstName}
        handleLastName={handleLastName}
        handleBirthday={handleBirthday}
        firstName={firstName}
        lastName={lastName}
        birthday={birthday}
        addMemberId={addMemberId}
      />
      <ModalCard
        showDelete={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
        member={member}
        handleDeleteMember={handleDeleteMember}
      />
    </DropdownButton>
  );
};

export default MemberCardMenu;