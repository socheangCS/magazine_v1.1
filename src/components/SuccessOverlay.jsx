import React from 'react';

const SuccessOverlay = ({ text, onClose }) => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='z-10 bg-white rounded-md gap-5 w-[300px] p-2 flex flex-col items-center justify-center'>
                <p className='p-2'>{text}</p>
                <div className='w-[50%] flex justify-center'>
                    <button className='text-red-400' onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default SuccessOverlay;
