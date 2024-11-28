const TOKEN = localStorage.getItem('token')
const BASE_URL = 'https://5c1e-110-226-181-187.ngrok-free.app';
const api_routes = {
    add_user: '/UserData',
    destination: '/destination',
    add_user_payment: '/payment',
    dashboardCounts: '/DashboardCounts'
};

export { TOKEN, BASE_URL, api_routes }
