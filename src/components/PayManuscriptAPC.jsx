import React from "react";
import PaystackPop from "@paystack/inline-js";
import Swal from "sweetalert2";

const PayManuscriptAPC = ({ manuscriptId, amount, authorEmail , setActivePage}) => {
  // Replace with an actual exchange rate (fetch dynamically if needed)
//   const exchangeRate = 1600; // Example rate for USD to NGN conversion
//   const amountInNGN = (amount * exchangeRate).toFixed(2); // Convert USD to NGN

  const payWithPaystack = () => {
    Swal.fire({
      title: "Confirm Payment",
      text: `You are about to pay ₦${Number(amount).toLocaleString()} APC. Do you want to proceed?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "No, cancel",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const paystack = new PaystackPop();
        paystack.newTransaction({
          key: "pk_test_60e1f53bba7c80b60029bf611a26a66a9a22d4e4",
          amount: amount * 100, // Convert NGN to kobo (Paystack requirement)
          email: authorEmail,
        //   fullname: authorName.split(" ")[0], // Extract first name
        //   lastname: authorName.split(" ")[1] || "", // Extract last name (if available)
          onSuccess: async (transaction) => {
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: "Updating payment status...",
              showConfirmButton: false,
              timer: 2000,
            });

            // Call backend to update APC status
            try {
              const response = await fetch(
                "https://www.fuprecosjournals.org/api/update_payment_status.php",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    manuscript_id: manuscriptId,
                    transaction_reference: transaction.reference, // Send Paystack reference
                  }),
                }
              );

              const data = await response.json();
              if (data.success) {
                Swal.fire("Success!", "Your APC payment status has been updated.", "success");
                setActivePage('profile')
                
              } else {
                Swal.fire("Error", "Failed to update payment status.", "error");
              }
            } catch (error) {
              Swal.fire("Error", "Something went wrong!", "error");
              console.error("Error updating payment status:", error);
            }
          },
          onCancel: () => {
            Swal.fire({ icon: "error", text: "Payment cancelled.", showConfirmButton: true });
          },
          onError: (error) => {
            Swal.fire({ icon: "error", text: `Payment failed: ${error.message}`, showConfirmButton: true });
          },
        });
      }
    });
  };

  return (
    <button
      onClick={payWithPaystack}
      style={{
        padding: "8px 10px",
        background: "#28a745",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        marginLeft: "5px",
      }}
    >
      Pay APC Fee (NAIRA)
    </button>
  );
};

export default PayManuscriptAPC;
