import { useEffect, useState } from 'react';
import React from 'react';

function Members () {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function getMembers () {
      await fetch('http://localhost:3500/members')
      .then(res => res.json())
      .then(data => setMembers(data));
    }

    getMembers();
  }, []);

  return (
    <div>
      { 
        members.map((member) => {
          return (
            <MemberChildren key={member.id} member={member} />
          )
        })
      }
    </div>
  )

}

function MemberChildren ({ member }) {
  const nestedMembers = (member.Children || []).map(member => {
    return (
      <MemberChildren
        key={member.id}
        member={member}
        type='child'
      />
    )
  })

  return (
    <div style={{ 'marginLeft': '25px', 'marginTop': '10px' }}>
      <div className='row'>
        <div>{ member.firstName } { member.lastName }</div>
      </div>
      { nestedMembers }
    </div>
  )
}

export default Members;


// const wrappedChildren = members.map(
//   members => {
//     if (members.Children) {
//       return (
//         <RecursiveWrapper>
//           { members.Children }
//         </RecursiveWrapper>
//       )
//     }
//     return (
//       <div>
//         { 'children: 0' }
//       </div>
//     )
//   }
// )
