// frontend/src/components/SignupFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm'
import "./SignupFormModal.css"

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="Signup-Container"></div>
      <div className="sign-up-text" onClick={() => setShowModal(true)}>Sign up</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
