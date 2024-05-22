import React from 'react';

const Overlay = ({ text,onConfirm, onCancel }) => {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='z-10 bg-white rounded-md gap-5 w-[300px] p-2 flex flex-col items-center justify-center'>
                <p>{text}</p>
                <div className='w-[50%] flex justify-between'>
                    <button className='text-red-400' onClick={onCancel}>No</button>
                    <button className='hover:text-blue-400' onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    );
}

export default Overlay;
