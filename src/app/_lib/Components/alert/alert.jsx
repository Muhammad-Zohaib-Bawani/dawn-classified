import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import './alert.css'; 

export default function Alert({ showAlert , alertWord}) {
  useEffect(() => {
    if (showAlert) {
      Swal.fire({
        icon: "error",
        text: `${alertWord}`,
        showCloseButton: true,
        customClass: {
          popup: 'custom-swal2-popup',       
          confirmButton: 'custom-ok-button-className',
          container: 'custom-swal2-overlay'
        }
      });
    }
  }, [showAlert,alertWord]);

  return null;
}
