import React from "react";
import Swal from "sweetalert2";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const PayManuscriptAPCFlutterwave = ({ manuscriptId, amount, authorEmail, setActivePage }) => {
  const config = {
    public_key: "FLWPUBK_TEST-eb2ed1a82d82e722495c220f0b3d81b9-X", // Replace with your Flutterwave Public Key
    tx_ref: `AJGA_${Date.now()}`,
    amount: amount,
    currency: "USD",
    payment_options: "card,banktransfer,ussd",
    customer: {
      email: authorEmail,
      phonenumber: "0000000000", // Optionally pass the phone number
    },
    customizations: {
      title: "Article Processing Charge (APC)",
      description: `Payment of $${amount} APC Fee`,
      logo: "https://www.fuprecosjournals.org/logo.png", // URL to your logo (optional)
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const initiatePayment = () => {
    Swal.fire({
      title: "Confirm Payment",
      text: `You are about to pay $${Number(amount).toFixed(2)} APC. Do you want to proceed?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "No, cancel",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        handleFlutterPayment({
          callback: async (response) => {
            if (response.status === "successful") {
              Swal.fire({
                icon: "success",
                title: "Payment Successful!",
                text: "Updating payment status...",
                showConfirmButton: false,
                timer: 2000,
              });

              // Call backend to update APC status
              try {
                const apiResponse = await fetch(
                  "https://www.fuprecosjournals.org/api/update_payment_status.php",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      manuscript_id: manuscriptId,
                      transaction_reference: response.transaction_id, // Send Flutterwave reference
                    }),
                  }
                );

                const data = await apiResponse.json();
                if (data.success) {
                  Swal.fire("Success!", "Your APC payment status has been updated.", "success");
                  setActivePage("profile");
                } else {
                  Swal.fire("Error", "Failed to update payment status.", "error");
                }
              } catch (error) {
                Swal.fire("Error", "Something went wrong!", "error");
                console.error("Error updating payment status:", error);
              }
            } else {
              Swal.fire({
                icon: "error",
                text: "Payment failed.",
                showConfirmButton: true,
              });
            }
            closePaymentModal(); // Close the modal programmatically
          },
          onClose: () => {
            Swal.fire({
              icon: "info",
              text: "Payment closed.",
              showConfirmButton: true,
            });
          },
        });
      }
    });
  };

  return (
    <button
      onClick={initiatePayment}
      style={{
        padding: "8px 10px",
        background: "#007bff",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        marginLeft: "5px",
      }}
    >
      Pay APC Fee (USD)
    </button>
  );
};

export default PayManuscriptAPCFlutterwave;
