import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Users } from '../pages/Users';
import { Domains } from '../pages/Domains';
import { NewBidding } from '../pages/NewBidding';
import { Details } from '../pages/Details';

export function LoggRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/create-bidding" element={<NewBidding />} />
            <Route path="/bidding/:id" element={<Details />} />
        </Routes>
    );
}