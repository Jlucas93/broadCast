'use client';
import { useState } from 'react';
import { CustomTable } from '../../components/ui';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'email', label: 'Email' },
];

const data = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { name: 'Alice Johnson', age: 35, email: 'alice@example.com' },
];

export function ContactTable() {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {};

  const handleConfirm = () => {
    console.log('Confirmed!');
  };

  return (
    <div className="w-full p-6 flex flex-row justify-between items-center gap-4 text-black  ">
      <h1>Example Table</h1>
      <CustomTable columns={columns} data={data} />
    </div>
  );
}
