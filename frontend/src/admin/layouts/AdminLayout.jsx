import AdminSidebar from "../components/AdminSidebar";
// import AdminTopbar from "../components/AdminTopbar";

export default function AdminLayout({
  children,
}) {

  return (

    <div className="admin-layout">

      {/* SIDEBAR */}

      <AdminSidebar />

      {/* MAIN */}

      <div className="admin-main">

        {/* <AdminTopbar /> */}

        <div className="admin-content">

          {children}

        </div>

      </div>

    </div>

  );
}