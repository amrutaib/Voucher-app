const TOKEN = localStorage.getItem('token')
const BASE_URL = process.env.REACT_APP_BASE_URL;;
const api_routes = {
    add_user: '/userdata',
    destination: '/destinations',
    add_user_payment: '/payment',
    dashboardCounts: '/DashboardCounts'
};

export { TOKEN, BASE_URL, api_routes }
