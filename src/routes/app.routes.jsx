import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

import { Home } from '../pages/Home';
import { Users } from '../pages/Users';
import { Domains } from '../pages/Domains';
import { NewBidding } from '../pages/NewBidding';
import { EditBidding } from '../pages/EditBidding';
import { Details } from '../pages/Details';

export function LoggRoutes() {

    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/create-bidding" element={<NewBidding />} />
            <Route path="/edit-bidding/:id" element={<EditBidding />} />
            <Route path="/bidding/:id" element={<Details />} />

            {user.role === "admin" && <Route path="/domains" element={<Domains />} />}
            
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}