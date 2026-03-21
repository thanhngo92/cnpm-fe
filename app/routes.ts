import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),

  // Auth
  layout("./components/auth/AuthLayout.tsx", [
    route("glowup/login", "./routes/login.tsx"),
    route("glowup/register", "./routes/register.tsx"),
    route("glowup/forgot-password", "./routes/forgot-password.tsx"),
  ]),

  // User
  layout("./components/layout/MainLayout.tsx", [
    route("glowup", "./routes/home.tsx"),
    route("glowup/products", "./routes/product.tsx"),
    // route("glowup/products/:slug", "./routes/product.tsx"),
    route("glowup/promotion", "./routes/promotion.tsx"),
    route("glowup/cart", "./routes/cart.tsx"),
    layout("./components/checkout/layout/CheckoutLayout.tsx", [
      route("glowup/checkout", "./routes/shipping.tsx"),
      route("glowup/checkout/payment", "./routes/payment.tsx"),
      route("glowup/checkout/qr-payment", "./routes/qr-payment.tsx"),
      route("glowup/checkout/complete", "./routes/complete.tsx"),
    ]),
  ]),

    // Admin
  layout("./components/admin/layout/AdminLayout.tsx", [
    route("glowup/admin", "./routes/admin/category.tsx"),
    route("glowup/admin/products", "./routes/admin/product.tsx"),
    route("glowup/admin/users", "./routes/admin/user.tsx"),
    route("glowup/admin/orders", "./routes/admin/order.tsx"),
  ]),

] satisfies RouteConfig;
