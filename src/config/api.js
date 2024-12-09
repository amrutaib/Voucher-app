const TOKEN = localStorage.getItem('token')
const BASE_URL = 'https://8915-103-167-123-80.ngrok-free.app';
const api_routes = {
    add_user: '/UserData',
    destination: '/destinations',
    add_user_payment: '/payment',
    dashboardCounts: '/DashboardCounts'
};

export { TOKEN, BASE_URL, api_routes }
