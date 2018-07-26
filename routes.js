const routes = require('next-routes')();

routes
  .add('/dashboard/new_request', '/dashboard/new_request')
  .add('/admin/admin_dashboard', '/admin/admin_dashboard');

module.exports = routes;
