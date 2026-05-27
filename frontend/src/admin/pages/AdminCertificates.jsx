
import { useState } from "react";

import AdminSidebar
from "../components/AdminSidebar";

// import AdminTopbar
// from "../components/AdminTopbar";

export default function AdminCertificates() {

  const [certificates, setCertificates] =
    useState([

      {
        id:1,
        student:"Kalyan",
        course:"React Frontend Mastery",
        issued:"20 May 2026",
        status:"Issued",
      },

      {
        id:2,
        student:"Teja",
        course:"MongoDB Database Course",
        issued:"18 May 2026",
        status:"Pending",
      },

      {
        id:3,
        student:"Ajay",
        course:"JavaScript Basics",
        issued:"15 May 2026",
        status:"Issued",
      },

    ]);

  // DELETE CERTIFICATE

  const deleteCertificate = (id) => {

    const filtered =
      certificates.filter(
        (item) =>
          item.id !== id
      );

    setCertificates(filtered);
  };

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        {/* <AdminTopbar /> */}

        <div className="admin-certificate-page">

          {/* HEADER */}

          <div className="certificate-top">

            <div>

              <h1>
                Certificate Management
              </h1>

              <p>
                Manage issued certificates
              </p>

            </div>

            <button className="issue-btn">

              + Issue Certificate

            </button>

          </div>

          {/* CARDS */}

          <div className="certificate-grid">

            {certificates.map((item) => (

              <div
                className="certificate-card"
                key={item.id}
              >

                {/* ICON */}

                <div className="certificate-icon">
                  🏆
                </div>

                {/* CONTENT */}

                <h2>
                  {item.student}
                </h2>

                <p className="certificate-course">

                  {item.course}

                </p>

                <div className="certificate-info">

                  <span>
                    Issued:
                  </span>

                  <strong>
                    {item.issued}
                  </strong>

                </div>

                <div
                  className={`certificate-status ${item.status.toLowerCase()}`}
                >

                  {item.status}

                </div>

                {/* ACTIONS */}

                <div className="certificate-actions">

                  <button className="download-btn">

                    Download

                  </button>

                  <button
                    className="delete-certificate-btn"
                    onClick={() =>
                      deleteCertificate(
                        item.id
                      )
                    }
                  >

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );
}

