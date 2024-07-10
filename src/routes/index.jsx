import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SignIn } from '../pages/SignIn';
import { LoggRoutes } from './app.routes';

export function AppRoutes() {
    const user = true;

    return (
        <BrowserRouter>
            {
                !user 
                ?
                <Routes>
                    <Route path="/" element={<SignIn />} />
                </Routes>
                :
                <LoggRoutes />
            }
        </BrowserRouter>
    );
};