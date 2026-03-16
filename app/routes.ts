import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("./routes/index.tsx"),

  // Auth
    layout("./components/auth/AuthLayout.tsx", [
      route("glowup/login", "./routes/auth/login.tsx"),
      route("glowup/register", "./routes/auth/register.tsx"),
      route("glowup/forgot-password", "./routes/auth/forgot-password.tsx"),
  ]),

  // User
  layout("./components/auth/RequireAuthLayout.tsx", [
    layout("./components/user/layout/MainLayout.tsx", [
      route("glowup", "./routes/user/home.tsx"),
      route("glowup/products", "./routes/user/product.tsx"),
      route("glowup/promotion", "./routes/user/promotion.tsx"),
      route("glowup/cart", "./routes/user/cart.tsx"),
      layout("./components/user/checkout/layout/CheckoutLayout.tsx", [
        route("glowup/checkout", "./routes/user/checkout/shipping.tsx"),
        route("glowup/checkout/payment", "./routes/user/checkout/payment.tsx"),
        route("glowup/checkout/qr-payment", "./routes/user/checkout/qr-payment.tsx"),
        route("glowup/checkout/complete", "./routes/user/checkout/complete.tsx"),
      ]),
    ]),
  ]),

] satisfies RouteConfig;
