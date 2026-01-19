import { createBrowserRouter } from 'react-router-dom';
import { adminRoutes } from '../modules/admin/admin.routes';
import { donorRoutes } from '../modules/donor/donor.routes';
import { hospitalRoutes } from '../modules/hospital/hospital.routes';
import { bloodBankRoutes } from '../modules/bloodbank/bloodbank.routes';
import { websiteRoutes } from '../modules/website/website.routes';

export const router = createBrowserRouter([
    ...websiteRoutes,
    ...adminRoutes,
    ...donorRoutes,
    ...hospitalRoutes,
    ...bloodBankRoutes,
]);
