import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Certificate({
  userName,
  course,
}) {

const certId =
 course.certificateId ||
 `CERT-${course._id}`;

  // DOWNLOAD PDF

  const downloadPDF = async () => {

    const input =
      document.getElementById(
        `certificate-${course._id}`
      );

    const canvas =
      await html2canvas(input);

    const imgData =
      canvas.toDataURL("image/png");

    const pdf =
      new jsPDF(
        "landscape",
        "mm",
        "a4"
      );

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      297,
      210
    );

    pdf.save(
      `${course.title}-certificate.pdf`
    );
  };

  // DOWNLOAD PNG

  const downloadPNG = async () => {

    const input =
      document.getElementById(
        `certificate-${course._id}`
      );

    const canvas =
      await html2canvas(input);

    const link =
      document.createElement("a");

    link.download =
      `${course.title}-certificate.png`;

    link.href =
      canvas.toDataURL();

    link.click();
  };

  // LINKEDIN SHARE

  const shareLinkedIn = () => {

    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=https://yourlms.com/certificate/${certId}`
    );

  };

  return (

    <div className="certificate-wrapper">

      <div
        className="certificate"
        id={`certificate-${course._id}`}
      >

        {/* LOGO */}

        <div className="cert-logo">

          LMS Academy

        </div>

        {/* GOLD BORDER */}

        <div className="certificate-border">

          <h1 className="cert-title">
            Certificate of Completion
          </h1>

          <p className="cert-sub">

            This Certificate is Proudly Presented To

          </p>
          <p className="cert-info">
           Duration: {course.duration || 120} Hours
          </p>
          <p className="cert-info">
           Final Score: {course.quizScore || 95}%
          </p>

          <h2 className="cert-user">
            {userName}
          </h2>

          <p className="cert-text">

            for successfully completing the course

          </p>
          <div className="skills-box">

  <span>React</span>

  <span>Node.js</span>

  <span>MongoDB</span>

  <span>Express.js</span>

</div>

          <h2 className="cert-course">
            {course.title}
          </h2>

          <p className="cert-date">

            Completion Date :
            {" "}
            {new Date().toLocaleDateString()}

          </p>

          {/* CERT ID */}

          <div className="cert-id">

            Certificate ID :
            {" "}
            {certId}

          </div>

          {/* QR CODE */}

          <div className="qr-box">

            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${certId}`}
              alt="QR"
            />

          </div>

          {/* FOOTER */}

          <div className="cert-footer">

            {/* SIGNATURE */}

            <div>

              <img
                className="signature"
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Signature.png"
                alt="signature"
              />

              <h4>
                Instructor Signature
              </h4>

              <p>
                {course.instructor.name}
              </p>
              <div>

  <img
   className="signature"
   src="/admin-sign.png"
   alt="admin"
  />

  <h4>Admin Signature</h4>

  <p>LMS CourseX</p>

</div>

            </div>

            <div>

              <h4>
                Issued By
              </h4>

              <p>
                LMS Learning Platform
              </p>

            </div>
            <div className="verify-link">

 Verify:
 www.lmscoursex.com/verify/{certId}

</div>

          </div>

        </div>

      </div>

      {/* BUTTONS */}

      <div className="cert-btns">

        <button
          className="download-cert-btn"
          onClick={downloadPDF}
        >

          Download PDF

        </button>

        <button
          className="png-btn"
          onClick={downloadPNG}
        >

          Download PNG

        </button>

        <button
          className="linkedin-btn"
          onClick={shareLinkedIn}
        >

          Share LinkedIn

        </button>

      </div>

    </div>

  );
}