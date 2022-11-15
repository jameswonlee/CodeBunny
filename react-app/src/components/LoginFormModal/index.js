// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import "./LoginFormModal.css"

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="modal-container">
      <div className="log-in-text" onClick={() => setShowModal(true)}>Log In</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
      </div>
    </>
  );
}

export default LoginFormModal;
