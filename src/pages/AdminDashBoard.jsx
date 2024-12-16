import React, { useState } from "react";
import AdminDashboard from "../component/AdminDashboard";
import "../asset/style/AdminDashboard.css";
import "./style/admin.css";
import FormSection from "../component/FormSection";

function AdminPage() {
  const [showFormSection, setShowFormSection] = useState(true);

  return (
    <div className="admin-page">
      <AdminDashboard setShowFormSection={setShowFormSection} />
      {showFormSection && <FormSection />}
    </div>
  );
}

export default AdminPage;
