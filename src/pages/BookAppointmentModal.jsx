import React from "react";
import BookAppointmentForm from "./BookAppointmentForm";

const BookAppointmentModal = ({closeform}) => {

  return (
    <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ">
          <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[98vh] overflow-y-auto shadow-2xl overflow-auto hide-scrollbar">
            {/* Close Button */}
            <button
              onClick={closeform}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            {/* Appointment Form */}
            <BookAppointmentForm />
          </div>
        </div>
    </>
  );
};

export default BookAppointmentModal;
