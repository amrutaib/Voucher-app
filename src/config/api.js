const TOKEN = localStorage.getItem('token')
const BASE_URL = 'https://a3c4-103-167-123-74.ngrok-free.app';
const api_routes = {
    add_user: '/UserData',
    destination: '/destinations',
    add_user_payment: '/payment',
    dashboardCounts: '/DashboardCounts'
};

export { TOKEN, BASE_URL, api_routes }
