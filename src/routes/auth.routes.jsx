import { Routes, Route } from 'react-router-dom';

import { SignIn } from '../pages/SignUp';

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
        </Routes>
    );
}