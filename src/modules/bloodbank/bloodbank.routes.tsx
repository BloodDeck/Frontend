import { Navigate, RouteObject } from 'react-router-dom';
import BloodBankLayout from './layout/BloodBankLayout';
import BloodBankLogin from './auth/BloodBankLogin';
import BloodBankOnboarding from './auth/BloodBankOnboarding';
import Dashboard from "./dashboard/pages/Dashboard"

// Optional placeholder pages for now
function InventoryPage() {
  return <div className="text-white">Inventory Page</div>
}

function DonationsPage() {
  return <div className="text-white">Donations Page</div>
}

function DonorsPage() {
  return <div className="text-white">Donors Page</div>
}

function SettingsPage() {
  return <div className="text-white">Settings Page</div>
}

export const bloodBankRoutes: RouteObject[] = [
	{
		path: '/bloodbank',
		element: <BloodBankLayout/>,
		children: [
			{
				index: true,
				element: <Navigate to="dashboard" replace />,
			},
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "inventory",
				element: <InventoryPage />,
			},
			{
				path: "donations",
				element: <DonationsPage />,
			},
			{
				path: "donors",
				element: <DonorsPage />,
			},
			{
				path: "settings",
				element: <SettingsPage />,
			},	
		]
	},
	{
			path: '/bloodbank/login',
			element: <BloodBankLogin />
	},
	{
			path: '/bloodbank/onboard',
			element: <BloodBankOnboarding />
	}
];
