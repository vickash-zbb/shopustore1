import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Orders } from "./pages/Orders";
import { CustomerManagement } from "./pages/CustomerManagement";
import { DeliveryStaffManagement } from "./pages/DeliveryStaffManagement";
import { AdminUserManagement } from "./pages/AdminUserManagement";
import { LogisticsManagement } from "./pages/LogisticsManagement";
import { ProductManagement } from "./pages/ProductManagement";
import { NotificationsManagement } from "./pages/NotificationsManagement";
import { ContentManagement } from "./pages/ContentManagement";
import { SettingsConfiguration } from "./pages/SettingsConfiguration";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users/customers" element={<CustomerManagement />} />
          <Route path="/users/delivery" element={<DeliveryStaffManagement />} />
          <Route path="/users/admin" element={<AdminUserManagement />} />
          <Route path="/logistics" element={<LogisticsManagement />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/notifications" element={<NotificationsManagement />} />
          <Route path="/content" element={<ContentManagement />} />
          <Route path="/settings" element={<SettingsConfiguration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
