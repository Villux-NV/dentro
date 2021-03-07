import { AnimatePresence, motion } from 'framer-motion';

import MemberCardMenu from './member-card-menu';

const MemberChildren = ({ member, onSubmit, handleChangeFirstName, handleChangeLastName, firstName, lastName, addMemberId, handleDelete }) => {
  const nestedMembers = (member.Children || []).map((member, index) => {
    return (
      <AnimatePresence>
        <MemberChildren
          key={member.id+member.firstName}
          member={member}
          onSubmit={onSubmit}
          handleChangeFirstName={handleChangeFirstName}
          handleChangeLastName={handleChangeLastName}
          firstName={firstName}
          lastName={lastName}
          addMemberId={addMemberId}
          handleDelete={handleDelete}
          type='child'
        /> 
      </AnimatePresence>
    )
  })

  return (
    <motion.div className='family__groups'>
        <motion.div layout className='family__children'>
          <motion.div layout initial={{ borderRadius: 25 }} className='family__members'>
            <motion.div layout className='family__members__avatar'/>
            <motion.div layout className='family__members__names'>{ member.firstName } { member.lastName }</motion.div>
            <MemberCardMenu
              member={member}
              onSubmit={onSubmit}
              handleChangeFirstName={handleChangeFirstName}
              handleChangeLastName={handleChangeLastName}
              firstName={firstName}
              lastName={lastName}
              addMemberId={addMemberId}
              handleDelete={handleDelete}
            />
          </motion.div>
          <motion.div className='family__nested'>
            { nestedMembers }
          </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default MemberChildren;