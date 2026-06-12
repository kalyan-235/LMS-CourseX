
import { useState, useEffect } from "react";

import AdminLayout
from "../layouts/AdminLayout";

import API from "../../api/axios";

// import AdminTopbar
// from "../components/AdminTopbar";

export default function AdminCertificates() {

  const [certificates, setCertificates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchCertificates();

  }, []);

  // FETCH CERTIFICATES FROM BACKEND

  const fetchCertificates = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await API.get(
          "/certificates",
          {
            headers:{
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setCertificates(res.data);

    } catch (error) {

      console.log(error);

      window.addToast?.("Failed to load certificates", "error");

    } finally {

      setLoading(false);

    }

  };

  // DELETE CERTIFICATE

  const deleteCertificate = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(
        `/certificates/${id}`,
        {
          headers:{
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const filtered =
        certificates.filter(
          (item) =>
            item._id !== id
        );

      setCertificates(filtered);

      window.addToast?.("Certificate deleted", "success");

    } catch (error) {

      console.log(error);

      window.addToast?.("Failed to delete certificate", "error");

    }

  };

  // DOWNLOAD CERTIFICATE

  const downloadCertificate = (cert) => {

    try {

      if (cert.certificateUrl) {

        window.open(
          cert.certificateUrl,
          "_blank"
        );

      } else {

        window.addToast?.("Certificate file not available", "warning");

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <AdminLayout>

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

        {/* LOADING STATE */}

        {loading ? (

          <div className="loading">
            <p>Loading certificates...</p>
          </div>

        ) : certificates.length === 0 ? (

          <div className="no-certificates">
            <p>No certificates issued yet</p>
          </div>

        ) : (

          <div className="certificate-grid">

            {certificates.map((item) => (

              <div
                className="certificate-card"
                key={item._id}
              >

                {/* ICON */}

                <div className="certificate-icon">
                  🏆
                </div>

                {/* CONTENT */}

                <h2>
                  {item.userId?.name ||
                   item.student}
                </h2>

                <p className="certificate-course">

                  {item.courseId?.title ||
                   item.course}

                </p>

                <div className="certificate-info">

                  <span>
                    Issued:
                  </span>

                  <strong>
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </strong>

                </div>

                <div
                  className={`certificate-status ${(item.status || "Issued").toLowerCase()}`}
                >

                  {item.status || "Issued"}

                </div>

                {/* ACTIONS */}

                <div className="certificate-actions">

                  <button
                    className="download-btn"
                    onClick={() =>
                      downloadCertificate(item)
                    }
                  >

                    Download

                  </button>

                  <button
                    className="delete-certificate-btn"
                    onClick={() =>
                      deleteCertificate(
                        item._id
                      )
                    }
                  >

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </AdminLayout>

  );
}

