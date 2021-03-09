import { motion } from 'framer-motion';

import MemberCardMenu from './member-card-menu';

const MemberChildren = ({ member, index, handleSubmit, handleFirstName, handleLastName, handleBirthday, handleValue, handleDelete, memberInput, addMemberId, firstName, lastName, birthday, value }) => {
  const nestedMembers = (member.Children || []).map((member) => {
    return (
        <MemberChildren
          member={member}
          handleSubmit={handleSubmit}
          handleFirstName={handleFirstName}
          handleLastName={handleLastName}
          handleBirthday={handleBirthday}
          handleValue={handleValue}
          handleDelete={handleDelete}
          addMemberId={addMemberId}
          firstName={firstName}
          lastName={lastName}
          birthday={birthday}
          value={value}
          type='child'
        /> 
    )
  })

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
            <div className='family__members__avatar'/>
            <div className='family__members__names'>{member.firstName} {member.lastName}</div>
            <MemberCardMenu
              member={member}
              handleSubmit={handleSubmit}
              handleFirstName={handleFirstName}
              handleLastName={handleLastName}
              handleBirthday={handleBirthday}
              handleValue={handleValue}
              handleDelete={handleDelete}
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