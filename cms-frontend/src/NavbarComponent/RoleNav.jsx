import AdminHeader from "./AdminHeader";
import HeaderCustomer from "./HeaderCustomer";
import NormalHeader from "./NormalHeader";
import InspectorHeader from "./InspectorHeader";

const RoleNav = () => {
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const inspector = JSON.parse(sessionStorage.getItem("active-inspector"));

  if (admin != null) {
    return <AdminHeader />;
  } else if (customer != null) {
    return <HeaderCustomer />;
  } else if (inspector != null) {
    return <InspectorHeader />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;
