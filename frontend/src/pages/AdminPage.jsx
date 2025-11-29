import { useState } from "react";
import VerifyOrganizations from "../components/VerifyOrganizations";
import { useEffect } from "react";
import axios from '../axios';
import ManageNoticesList from "../components/ManageNoticesList";

export default function AdminPage() { 
  const [organizations, setOrganizations] = useState([]);
  const [notices, setNotices] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  
  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const res = await axios.get("/organizations");
        const allOrganizations = res.data.organizations || [];
        const notVerifiedOrganizations = allOrganizations.filter(
          (org) => org.organization?.verified === 0
        );
        setOrganizations(notVerifiedOrganizations);
      } catch (err) {
        console.error("Błąd ładowania ogłoszeń:", err);
      }
    };
    
    const loadNotices = async () => {
      try {
        const res = await axios.get("/admin-notices");
        setNotices(res.data.notices || []);
      } catch (err) {
        console.error("Błąd ładowania ogłoszeń:", err);
      }
    };

    loadOrganizations();
    loadNotices();
  }, []);
  
  const handleVerifyOrganization = async (organizationId) => {
    try {
      await axios.post(`/organization/${organizationId}/verify`);
      const res = await axios.get("/organizations");
      setOrganizations(res.data.organizations || []);
      setSuccessMessage("Zatwierdzono organizację");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    } catch (err) {
      console.error("Błąd ładowania ogłoszeń:", err);
    }
  }
  
  const handleRejectOrganization = () => {
    setSuccessMessage("Organizacja odrzucona.");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 2000);
  }
  
  const handleRemoveNotice = async (noticeId) => {
    try {
      await axios.delete(`/admin/notices/${noticeId}`);
      const res = await axios.get("/admin-notices");
      setNotices(res.data.notices || []);
      setSuccessMessage("Usunięto ogłoszenie");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    } catch (err) {
      console.error("Błąd usuwania ogłoszeń:", err);
    }
  }
     
  return (
    <div className="px-4 py-4">
      <VerifyOrganizations 
        organizations={organizations}
        onVerify={(organizationId) => handleVerifyOrganization(organizationId)}
        onReject={handleRejectOrganization}
      />
      <div className="mt-4">
        <ManageNoticesList 
          notices={notices}
          onDelete={(noticeId) => handleRemoveNotice(noticeId)}
        />
      </div>
      {successMessage && (
        <div className="
          fixed top-4 right-1/2
          bg-emerald-500 text-white 
          px-4 py-2 rounded-xl shadow-lg 
          animate-slide-in
        ">
          {successMessage}
        </div>
      )}
    </div>
  );
  
}