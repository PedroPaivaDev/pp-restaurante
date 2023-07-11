import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import timestampToDate from '@/helper/timestampToDate';

const DivProfileData = styled.div`
  .headerProfile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    img {
      border: 2px solid ${props => props.theme.colors.primaryColor};
      border-radius: 40px;
      box-shadow: 0px 1px 5px 0px ${props => props.theme.colors.dark};
      transition: 0.3s;
    }
    .userData {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }
    p {
      font-size: ${props => props.theme.font.size.xsmall};
    }
  }
  .bgPaper {
    width: 100%;
  }  
`;

interface PropsProfileData {
  userDB: UserDB;
}

const ProfileData = ({userDB}:PropsProfileData) => {
  return (
    <DivProfileData>
      <div className='headerProfile'>
        {userDB && <Image src={userDB.userData.photoURL} width={80} height={80} alt="FotoUsuario" />}
        <div className='userData'>
          <h1>{userDB?.userData.displayName}</h1>
          <p>{userDB?.userData.email}</p>
          <small>
            cadastro: {timestampToDate(userDB?.userData.createdAt as number)}
          </small>
          <small>último login: {timestampToDate(userDB?.userData.lastLoginAt as number)}</small>
        </div>
      </div>
    </DivProfileData>
  )
}

export default ProfileData;