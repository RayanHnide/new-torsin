import React from 'react';
import ChangePassword from './ChangePassword';
import styles from '../../stylesheet/profile.module.scss';

export default function Settings() {
  return (
    <>
      <ChangePassword
        styles={styles}
      />
    </>
  )
}