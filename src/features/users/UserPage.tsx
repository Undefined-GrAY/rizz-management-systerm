import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../ui/Header';
import CreateUser from './CreateUser';

export default function UsersPage() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    // Redirect or show success message
    setTimeout(() => {
      navigate('/users');
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <>
      <Header title="Create a new user" description='Register a new staff member to manage bookings and cabin settings.' />
      <div className="md:p-8 flex-1">
        <CreateUser 
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </>
  );
}