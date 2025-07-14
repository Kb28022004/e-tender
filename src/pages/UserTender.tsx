import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { CircularProgress, styled } from "@mui/material";
import { Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";

import {
  useGetsingleTenderMutation,
  useSubmitFormMutation,
} from "../features/tenderApi";
import DummyPaymentPage from "./DummyPaymentPage";
import RegistrationSuccess from "./RegistrationSuccess";
import UserSidebar from "./UserSidebar";
import UserHeader from "./UserHeader";
import BreadCrump from "@/components/BreadCrump";
import UserTenderDropdown from "./UserTenderDropdown";
import UserTenderDetails from "./UserTenderDetails";

const UserTender = () => {
  const [selectedTender, setSelectedTender] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [showSuccessPage, setshowSuccessPage] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [tenderDetailsOpen, setTenderDetailsOpen] = useState(true);
  const [documentOpen, setDocumentOpen] = useState(false);
  const [bankDetailsOpen, setBankDetailsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    bidderCompanyName: "",
    city: "",
    email: "",
    earnestMoneyDeposit: "",
    address: "",
    pinCode: "",
    contactNumber: "",
    tenderFee: "",
    bankName: "",
    accountName: "",
    accountHolderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    branchName: "",
    gstNumber: "",
    panNumber: "",

    // File URLs
    gst_registration_url: "",
    pan_card_url: "",
    company_registration_url: "",
    authorization_letter_url: "",
    audited_balance_sheets_url: "",
    itr_url_url: "",
    turnover_certificate_url: "",
    experience_docs_url: "",
    declaration_letter_url: "",
    birth_certificate_url: "",
  });

  const authToken = localStorage.getItem("authToken");
  const [getsingleTender, { data: singleTender,isLoading:singleTenderLoading }] =
    useGetsingleTenderMutation();

  const singleTenderDetails = singleTender?.data;

  const [
    submitForm,
    { data: submitData, isLoading, isError, isSuccess, error },
  ] = useSubmitFormMutation();

  // File upload states
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>(
    {}
  );

  const handleFileUpload = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      // Store file name for UI preview
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldName]: file.name,
      }));

      // Update formData with corresponding file URL key
      const fileKey = `${fieldName.replace(/-/g, "_")}_url`;

      setFormData((prev) => ({
        ...prev,
        [fileKey]: fileUrl,
      }));
    }
  };

  const triggerFileUpload = (fieldName: string) => {
    const fileInput = document.getElementById(
      `file-${fieldName}`
    ) as HTMLInputElement;
    fileInput?.click();
  };
  const handleShowRegistration = (id) => {
    if (!id) {
      console.warn("Invalid Tender ID");
      return;
    }

    setShowRegistration(true);
    setShowDetails(false);

    localStorage.setItem("tenderId", String(id));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tenderId = localStorage.getItem("tenderId");

      if (!tenderId) {
        console.error("Tender ID not found in localStorage.");
        return;
      }

      // Map camelCase to snake_case
      const mappedFormData = {
        bidder_company_name: formData.bidderCompanyName,
        address: formData.address,
        city: formData.city,
        pin_code: formData.pinCode,
        email: formData.email,
        contact_number: formData.contactNumber,
        earnest_money_deposit: formData.earnestMoneyDeposit,
        tender_fee: formData.tenderFee,
        gst_number: formData.gstNumber,
        pan_number: formData.panNumber,
        gst_registration_url: formData.gst_registration_url,
        pan_card_url: formData.pan_card_url,
        company_registration_url: formData.company_registration_url,
        authorization_letter_url: formData.authorization_letter_url,
        audited_balance_sheets_url: formData.audited_balance_sheets_url,
        itr_url_url: formData.itr_url_url,
        turnover_certificate_url: formData.turnover_certificate_url,
        experience_docs_url: formData.experience_docs_url,
        declaration_letter_url: formData.declaration_letter_url,
        birth_certificate_url: formData.birth_certificate_url,
        bank_name: formData.bankName,
        account_holder_name: formData.accountHolderName,
        account_number: formData.accountNumber,
        confirm_account_number: formData.confirmAccountNumber,
        ifsc_code: formData.ifscCode,
        branch_name: formData.branchName,

        tender_id: parseInt(tenderId),
      };

      // Submit with API
      await submitForm({
        formData: mappedFormData,
        token: authToken,
      });

      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.errors?.[0] || "Somthing went wrong");
      setShowRegistration(false);
      setSelectedTender(false);
      setShowDetails(true);
    }
    if (isSuccess && submitData) {
      toast.success(error?.submitData || "Tender has been submitted");
      setShowRegistration(false);
      setSelectedTender(false);
      setShowDetails(true);
      setshowSuccessPage(true);
    }
  }, [isError, error, isSuccess, submitData]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        {/* user Sidebar */}
        <UserSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* user Header */}
          <UserHeader
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />

          {/* Overlay to close dropdown when clicking outside */}
          {isDropdownOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
            />
          )}

          {/* Page Content */}

          <main className="flex-1 p-8 bg-white">
            {showDetails && !isSuccess && (
              <>
                {/* Page Title */}
                <BreadCrump />
                {/* Tender Details Card */}
                <UserTenderDropdown
               
                  getsingleTender={getsingleTender}
                  setSelectedTender={setSelectedTender}
                />
              </>
            )}

            {selectedTender && (
              <UserTenderDetails
               singleTenderLoading={singleTenderLoading}
                singleTenderDetails={singleTenderDetails}
                setSelectedTender={setSelectedTender}
                handleShowRegistration={handleShowRegistration}
              />
            )}
            {showRegistration && (
              <>
                <BreadCrump />

                {/* Registration Form */}
                <form onSubmit={handleFormSubmit} className="space-y-6">
                

                  {/* Tender Details Collapsible Section */}
                  <Card className="p-0">
                    <Collapsible
                      open={tenderDetailsOpen}
                      onOpenChange={setTenderDetailsOpen}
                    >
                      <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
                        <span className="text-lg font-medium text-gray-900">
                          Tender Details
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            tenderDetailsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-6 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bidder company Name
                              </label>
                              <Input
                                required
                                placeholder="Enter Bidder company Name"
                                value={formData.bidderCompanyName}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    bidderCompanyName: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                city
                              </label>
                              <Input
                                placeholder="Enter City "
                                value={formData.city}
                                required
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    city: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Id
                              </label>
                              <Input
                              type="email"
                                placeholder="Enter Email Id"
                                value={formData.email}
                                required
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Earn Money Deposit
                              </label>

                              <Input
                                placeholder="Enter Earn Money Deposit Here"
                                                  type="number"
                                value={formData.earnestMoneyDeposit}
                                required
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    earnestMoneyDeposit: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                              </label>
                            </div>
                            <Input
                              placeholder="Enter Address"
                              value={formData.address}
                              required
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  address: e.target.value,
                                }))
                              }
                            />
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pin Code
                              </label>
                              <Input
                                placeholder="Enter Pin Code"
                                   type="number"
                         
                                value={formData.pinCode}
                                required
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    pinCode: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Number
                              </label>
                              <Input
                                 type="number"
                                placeholder="Enter Contact Number"
                                value={formData.contactNumber}
                                required
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    contactNumber: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tender Fee
                              </label>
                              <Input
                                required
                                   type="number"
                                
                                placeholder="Enter Tender Fee Here"
                                value={formData.tenderFee}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    tenderFee: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>

                  {/* Document Section */}
                  <Card className="p-0">
                    <Collapsible
                      open={documentOpen}
                      onOpenChange={setDocumentOpen}
                    >
                      <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
                        <span className="text-lg font-medium text-gray-900">
                          Document
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            documentOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-6 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Left Column */}
                          <div className="space-y-6">
                            {/* GST Number */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                GST Number
                              </label>
                              <Input
                                placeholder="Enter GST Number"
                                value={formData.gstNumber}
                                required
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    gstNumber: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            {/* Pan Number */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Pan Number
                              </label>
                              <Input
                                placeholder="Enter Pan Number"
                                required
                                value={formData.panNumber}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    panNumber: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            {/* Company Registration Certificate */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Registration Certificate
                              </label>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    triggerFileUpload(
                                      "company_registration_url"
                                    )
                                  }
                                >
                                  Choose File
                                </Button>
                                <span className="flex items-center text-gray-500 text-sm">
                                  {uploadedFiles["company_registration_url"] ||
                                    "No File Chosen"}
                                </span>
                              </div>
                              <input
                                id="file-company_registration_url"
                                type="file"
                                required
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(
                                    "company_registration_url",
                                    e
                                  )
                                }
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </div>

                            {/* Audited Balance Sheets */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Audited Balance Sheets (Last 2-3 years)
                              </label>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    triggerFileUpload(
                                      "audited_balance_sheets_url"
                                    )
                                  }
                                >
                                  Choose File
                                </Button>
                                <span className="flex items-center text-gray-500 text-sm">
                                  {uploadedFiles[
                                    "audited_balance_sheets_url"
                                  ] || "No File Chosen"}
                                </span>
                              </div>
                              <input
                                id="file-audited_balance_sheets_url"
                                type="file"
                                className="hidden"
                                required
                                onChange={(e) =>
                                  handleFileUpload(
                                    "audited_balance_sheets_url",
                                    e
                                  )
                                }
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </div>

                            {/* Turnover Certificate */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Turnover Certificate
                              </label>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    triggerFileUpload(
                                      "turnover_certificate_url"
                                    )
                                  }
                                >
                                  Choose File
                                </Button>
                                <span className="flex items-center text-gray-500 text-sm">
                                  {uploadedFiles["turnover_certificate_url"] ||
                                    "No File Chosen"}
                                </span>
                              </div>
                              <input
                                id="file-turnover_certificate_url"
                                type="file"
                                className="hidden"
                                required
                                onChange={(e) =>
                                  handleFileUpload(
                                    "turnover_certificate_url",
                                    e
                                  )
                                }
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </div>

                            {/* Declaration Letter */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Declaration Letter
                              </label>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    triggerFileUpload("declaration_letter_url")
                                  }
                                >
                                  Choose File
                                </Button>
                                <span className="flex items-center text-gray-500 text-sm">
                                  {uploadedFiles["declaration_letter_url"] ||
                                    "No File Chosen"}
                                </span>
                              </div>
                              <input
                                id="file-declaration_letter_url"
                                type="file"
                                className="hidden"
                                required
                                onChange={(e) =>
                                  handleFileUpload("declaration_letter_url", e)
                                }
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-6">
                            {/* Upload GST Registration */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload GST Registration
                              </label>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    triggerFileUpload("gst_registration_url")
                                  }
                                >
                                  Choose File
                                </Button>
                                <span className="flex items-center text-gray-500 text-sm">
                                  {uploadedFiles["gst_registration_url"] ||
                                    "No File Chosen"}
                                </span>
                              </div>
                              <input
                                id="file-gst_registration_url"
                                type="file"
                                className="hidden"
                                required
                                onChange={(e) =>
                                  handleFileUpload("gst_registration_url", e)
                                }
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </div>

                            {/* Upload Pan Number */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Pan Number
                              </label>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    triggerFileUpload("pan_card_url")
                                  }
                                >
                                  Choose File
                                </Button>
                                <span className="flex items-center text-gray-500 text-sm">
                                  {uploadedFiles["pan_card_url"] ||
                                    "No File Chosen"}
                                </span>
                              </div>
                              <input
                                id="file-pan_card_url"
                                type="file"
                                className="hidden"
                                required
                                onChange={(e) =>
                                  handleFileUpload("pan_card_url", e)
                                }
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </div>

                            {/* Authorization Letter */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Authorization Letter
                              </label>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    triggerFileUpload(
                                      "authorization_letter_url"
                                    )
                                  }
                                >
                                  Choose File
                                </Button>
                                <span className="flex items-center text-gray-500 text-sm">
                                  {uploadedFiles["authorization_letter_url"] ||
                                    "No File Chosen"}
                                </span>
                              </div>
                              <input
                                id="file-authorization_letter_url"
                                type="file"
                                required
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(
                                    "authorization_letter_url",
                                    e
                                  )
                                }
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </div>

                            {/* Income Tax Returns (itr_url) */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Income Tax Returns (itr_url)
                              </label>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => triggerFileUpload("itr_url")}
                                >
                                  Choose File
                                </Button>
                                <span className="flex items-center text-gray-500 text-sm">
                                  {uploadedFiles["itr_url"] || "No File Chosen"}
                                </span>
                              </div>
                              <input
                                id="file-itr_url"
                                type="file"
                                className="hidden"
                                required
                                onChange={(e) => handleFileUpload("itr_url", e)}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </div>

                            {/* Experience Documents */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Experience Documents (Past Work Orders)
                              </label>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    triggerFileUpload("experience_docs_url")
                                  }
                                >
                                  Choose File
                                </Button>
                                <span className="flex items-center text-gray-500 text-sm">
                                  {uploadedFiles["experience_docs_url"] ||
                                    "No File Chosen"}
                                </span>
                              </div>
                              <input
                                id="file-experience_docs_url"
                                type="file"
                                required
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload("experience_docs_url", e)
                                }
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </div>

                            {/* Birth Certificate */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Birth Certificate
                              </label>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() =>
                                    triggerFileUpload("birth_certificate_url")
                                  }
                                >
                                  Choose File
                                </Button>
                                <span className="flex items-center text-gray-500 text-sm">
                                  {uploadedFiles["birth_certificate_url"] ||
                                    "No File Chosen"}
                                </span>
                              </div>
                              <input
                                required
                                id="file-birth_certificate_url"
                                type="file"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload("birth_certificate_url", e)
                                }
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>

                  {/* Bank Details Section */}
                  <Card className="p-0">
                    <Collapsible
                      open={bankDetailsOpen}
                      onOpenChange={setBankDetailsOpen}
                    >
                      <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
                        <span className="text-lg font-medium text-gray-900">
                          Bank Details
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            bankDetailsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-6 pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Left Column */}
                          <div className="space-y-4">
                            {/* Bank Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bank Name
                              </label>
                              <Input
                                required
                                placeholder="Enter Bank Name"
                                value={formData.bankName}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    bankName: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            {/* Account Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Number
                              </label>
                              <Input
                                required
                                placeholder="Enter Account Number"
                                value={formData.accountName}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    accountName: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            {/* IFSC Code */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                IFSC Code
                              </label>
                              <Input
                                required
                                placeholder="Enter IFSC Code"
                                value={formData.ifscCode}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    ifscCode: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-4">
                            {/* Account Holder Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Holder Name
                              </label>
                              <Input
                                required
                                placeholder="Enter  Account Holder Name"
                                value={formData.accountHolderName}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    accountHolderName: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            {/* Confirm Account Number */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Account Number
                              </label>
                              <Input
                                required
                                placeholder="Confirm Account Number"
                                value={formData.accountNumber}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    accountNumber: e.target.value,
                                  }))
                                }
                              />
                            </div>

                            {/* Branch Name */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Branch Name
                              </label>
                              <Input
                                required
                                placeholder="Enter Branch Name"
                                value={formData.branchName}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    branchName: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 py-4">
                    <Button
                      onClick={() => setShowRegistration(false)}
                      variant="outline"
                      className="px-6"
                    >
                      Close
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      {isLoading ? (
                        <CircularProgress size={20} sx={{ color: "black" }} />
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </main>
          {showSuccessPage && (
            <RegistrationSuccess
              setshowSuccessPage={setshowSuccessPage}
              setShowDetails={setShowDetails}
              setShowPaymentPage={setShowPaymentPage}
            />
          )}
          {showPaymentPage && (
            <DummyPaymentPage
              setShowPaymentPage={setShowPaymentPage}
              setShowDetails={setShowDetails}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserTender;

const Container = styled(Paper)(({ theme }) => ({
  maxWidth: 500,
  margin: "220px auto",
  padding: theme.spacing(6),
  textAlign: "center",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

// Styled success icon
const SuccessIcon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  fontSize: 60,
  color: theme.palette.success.main,
  marginBottom: theme.spacing(2),
}));
