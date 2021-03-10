import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

import MemberCardMenu from './member-card-menu';

const MemberChildren = ({ member, index, handleSubmit, handleFirstName, handleLastName, handleBirthday, handleValue, handleDeleteMember, handleImage, uploadImageFirebase, uploadImageMember, addMemberId, firstName, lastName, birthday, value, image, url }) => {
  const nestedMembers = (member.Children || []).map((member) => {
    return (
        <MemberChildren
          member={member}
          handleSubmit={handleSubmit}
          handleFirstName={handleFirstName}
          handleLastName={handleLastName}
          handleBirthday={handleBirthday}
          handleValue={handleValue}
          handleDeleteMember={handleDeleteMember}
          handleImage={handleImage}
          uploadImageFirebase={uploadImageFirebase}
          uploadImageMember={uploadImageMember}
          addMemberId={addMemberId}
          firstName={firstName}
          lastName={lastName}
          birthday={birthday}
          value={value}
          image={image}
          url={url}
          type='child'
        /> 
    )
  })

  const getBirthday = (day) => {
    if (!day) {
      return 'Add Birthday!'
    } else {
      return day.slice(5, 10);
    }
  };



  return (
    <motion.div
      layout
      variants={{
        hidden: { opacity: 0, x: 0, y: -100 },
        visible: { opacity: 1, x: 0, y: 0, transition: { delay: index * 0.05, duration: .8 } },
        removed: { opacity: 0 }
      }}
      initial='hidden'
      animate='visible'
      exit='removed'
      className='family__groups'
    >
        <motion.div layout className='family__children'>
          <motion.div layout initial={{ borderRadius: 25 }} className='family__members'>
            <div className='family__members__avatar__container'>
              {/* htmlFor='upload-button' */}
              <label>
                { image ? (
                    <img className='member__picture' />
                ) : (
                  <>
                    <img className='member__picture' />
                  </>
                )}
              </label>
              <input id='upload-button' type='file' style={{ display: 'none' }} onChange={handleImage} addMemberId={addMemberId(member.id)} />
              {/* <Button variant='lig' onClick={uploadImageFirebase}>
                <FaPlus />
              </Button> */}
            </div>

            <div className='family__members__details'>
              <div className='family__members__names'>{member.firstName} {member.lastName}</div>
              <p className='family__members__birthday'>{getBirthday(member.birthday)}</p>
            </div>

            <MemberCardMenu
              member={member}
              handleSubmit={handleSubmit}
              handleFirstName={handleFirstName}
              handleLastName={handleLastName}
              handleBirthday={handleBirthday}
              handleValue={handleValue}
              handleDeleteMember={handleDeleteMember}
              firstName={firstName}
              lastName={lastName}
              birthday={birthday}
              addMemberId={addMemberId}
              value={value}
            />
          </motion.div>
          <motion.div
            className='family__nested'
          >
            { nestedMembers }
          </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MemberChildren;