'use client';

import { useState, useEffect } from "react";
import Image from 'next/image';
import AddsImages from '../../public/images/AddsImages.jpg';
import { useRouter } from 'next/navigation';

export default function AdModal() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the modal has already been shown in this session
    const modalShown = sessionStorage.getItem('modalShown');
    if (!modalShown) {
      // Set a timer to show the modal after 2 seconds
      const showTimer = setTimeout(() => {
        setShowModal(true);
      }, 2000);

      // Set a timer to close the modal after 5 seconds
      const closeTimer = setTimeout(() => {
        setShowModal(false);
        sessionStorage.setItem('modalShown', 'true');
      }, 7000); // 2 seconds delay + 5 seconds display time

      // Clear timers if the component unmounts
      return () => {
        clearTimeout(showTimer);
        clearTimeout(closeTimer);
      };
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    sessionStorage.setItem('modalShown', 'true');
  };

  const handleProductClick = () => {
    closeModal();
    router.push(`/publicproducts`);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-1/3 h-3/4 bg-white shadow-lg  mt-5 ml-100">
        <button
          className="absolute top-2 right-2 text-3xl font-bold text-white z-10"

          onClick={closeModal}
        >
          &times;
        </button>
        <div className="relative w-full h-full">
          <Image
            src={AddsImages}
            alt="Advertisement"
            className="w-full h-full object-cover cursor-pointer"
            layout="fill"
            onClick={handleProductClick}
          />
        </div>
      </div>
    </div>
  );
}
