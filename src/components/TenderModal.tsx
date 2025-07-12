import { X, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { tenderAPI, Tender, ApiError } from "@/services/api";

interface TenderModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "edit" | "view";
  tender: Tender;
  onRefresh?: (() => void) | null;
}

const TenderModal = ({ isOpen, onClose, type, tender, onRefresh }: TenderModalProps) => {
  const [formData, setFormData] = useState({
    tenderName: "",
    description: "",
    openingDate: "",
    closingDate: "",
    earnMoneyDeposit: "",
    tenderFee: "",
    contactInfo: "",
    gst: "",
    tenderPicture: null as File | null,
    supportingDocs: null as File | null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Function to convert date from yyyy-mm-dd to dd/mm/yyyy
  const formatDateToDisplay = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to convert date from dd/mm/yyyy to yyyy-mm-dd
  const convertDateFormat = (dateString: string): string => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split('/');
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  useEffect(() => {
    // Populate form with tender data
    if (tender) {
      setFormData({
        tenderName: tender.title || "",
        description: tender.description || "",
        openingDate: formatDateToDisplay(tender.open_date),
        closingDate: formatDateToDisplay(tender.close_date),
        earnMoneyDeposit: tender.budget?.toString() || "",
        tenderFee: tender.tender_fee?.toString() || "",
        contactInfo: tender.contact_info || "",
        gst: tender.gst_number || "",
        tenderPicture: null,
        supportingDocs: null
      });
    }
    // Reset states when tender changes
    setError(null);
    setSuccess(null);
  }, [tender]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        [field]: e.target.files[0]
      });
    }
  };

  // Form validation
  const validateForm = (): string | null => {
    if (!formData.tenderName.trim()) {
      return "Tender name is required";
    }
    if (!formData.description.trim()) {
      return "Description is required";
    }
    if (!formData.openingDate.trim()) {
      return "Opening date is required";
    }
    if (!formData.closingDate.trim()) {
      return "Closing date is required";
    }
    if (!formData.earnMoneyDeposit.trim()) {
      return "Earn money deposit is required";
    }
    if (!formData.tenderFee.trim()) {
      return "Tender fee is required";
    }
    if (!formData.contactInfo.trim()) {
      return "Contact information is required";
    }
    if (!formData.gst.trim()) {
      return "GST number is required";
    }

    // Validate date format (dd/mm/yyyy)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(formData.openingDate)) {
      return "Opening date must be in dd/mm/yyyy format";
    }
    if (!dateRegex.test(formData.closingDate)) {
      return "Closing date must be in dd/mm/yyyy format";
    }

    // Validate that numeric fields are numbers
    if (isNaN(Number(formData.earnMoneyDeposit))) {
      return "Earn money deposit must be a valid number";
    }
    if (isNaN(Number(formData.tenderFee))) {
      return "Tender fee must be a valid number";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === "view") {
      onClose();
      return;
    }

    setError(null);
    setSuccess(null);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data for API
      const apiData = {
        tender: {
          title: formData.tenderName.trim(),
          description: formData.description.trim(),
          budget: Number(formData.earnMoneyDeposit),
          deposit: Number(formData.earnMoneyDeposit),
          tender_fee: Number(formData.tenderFee),
          status: tender.status, // Keep existing status
          open_date: convertDateFormat(formData.openingDate),
          close_date: convertDateFormat(formData.closingDate),
          contact_info: formData.contactInfo.trim(),
          gst_number: formData.gst.trim(),
          department_id: tender.department_id || 1
        }
      };

      console.log("Updating tender with data:", apiData);

      const response = await tenderAPI.updateTender(tender.id, apiData);
      
      console.log("Tender update response:", response);
      
      setSuccess("Tender updated successfully!");
      
      // Refresh the table immediately
      if (onRefresh) {
        onRefresh();
      }
      
      // Close modal after successful submission
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (err) {
      console.error("Error updating tender:", err);
      
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to update tender. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {type === "edit" ? "Edit" : "View"} Tender - ID {tender.id}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border-b border-red-200">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border-b border-green-200">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-700">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tender Name */}
          <div className="space-y-2">
            <label htmlFor="tenderName" className="block text-sm font-medium text-gray-700">
              Tender Name {type === "edit" && <span className="text-red-500">*</span>}
            </label>
            <Input
              id="tenderName"
              name="tenderName"
              placeholder="Enter Tender Name"
              value={formData.tenderName}
              onChange={handleInputChange}
              disabled={type === "view"}
              className="w-full"
              required={type === "edit"}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description {type === "edit" && <span className="text-red-500">*</span>}
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter Description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={type === "view"}
              className="w-full min-h-[100px]"
              required={type === "edit"}
            />
          </div>

          {/* Dates - Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="openingDate" className="block text-sm font-medium text-gray-700">
                Tender Opening Date {type === "edit" && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <Input
                  id="openingDate"
                  name="openingDate"
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={formData.openingDate}
                  onChange={handleInputChange}
                  disabled={type === "view"}
                  className="w-full pr-10"
                  required={type === "edit"}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="closingDate" className="block text-sm font-medium text-gray-700">
                Tender Closing Date {type === "edit" && <span className="text-red-500">*</span>}
              </label>
              <div className="relative">
                <Input
                  id="closingDate"
                  name="closingDate"
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={formData.closingDate}
                  onChange={handleInputChange}
                  disabled={type === "view"}
                  className="w-full pr-10"
                  required={type === "edit"}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Money Fields - Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="earnMoneyDeposit" className="block text-sm font-medium text-gray-700">
                Earn Money Deposit (Budget) {type === "edit" && <span className="text-red-500">*</span>}
              </label>
              <Input
                id="earnMoneyDeposit"
                name="earnMoneyDeposit"
                placeholder="Enter Money Deposit"
                value={formData.earnMoneyDeposit}
                onChange={handleInputChange}
                disabled={type === "view"}
                className="w-full"
                type="number"
                required={type === "edit"}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tenderFee" className="block text-sm font-medium text-gray-700">
                Tender Fee {type === "edit" && <span className="text-red-500">*</span>}
              </label>
              <Input
                id="tenderFee"
                name="tenderFee"
                placeholder="Enter Tender Fee"
                value={formData.tenderFee}
                onChange={handleInputChange}
                disabled={type === "view"}
                className="w-full"
                type="number"
                required={type === "edit"}
              />
            </div>
          </div>

          {/* Contact and GST - Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
                Contact Information {type === "edit" && <span className="text-red-500">*</span>}
              </label>
              <Input
                id="contactInfo"
                name="contactInfo"
                placeholder="Enter Contact Information"
                value={formData.contactInfo}
                onChange={handleInputChange}
                disabled={type === "view"}
                className="w-full"
                required={type === "edit"}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gst" className="block text-sm font-medium text-gray-700">
                GST Number {type === "edit" && <span className="text-red-500">*</span>}
              </label>
              <Input
                id="gst"
                name="gst"
                placeholder="Enter GST Number"
                value={formData.gst}
                onChange={handleInputChange}
                disabled={type === "view"}
                className="w-full"
                required={type === "edit"}
              />
            </div>
          </div>

          {/* File Uploads - Two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="tenderPicture" className="block text-sm font-medium text-gray-700">
                Tender Picture
              </label>
              <div className="flex items-center">
                <label className={`relative cursor-pointer bg-gray-100 rounded-md py-2 px-3 border border-gray-300 ${type === "view" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"} transition-colors`}>
                  <span className="text-gray-600">Choose File</span>
                  <input
                    id="tenderPicture"
                    name="tenderPicture"
                    type="file"
                    className="sr-only"
                    onChange={(e) => handleFileChange(e, 'tenderPicture')}
                    disabled={type === "view"}
                    accept="image/*"
                  />
                </label>
                <span className="ml-3 text-sm text-gray-500">
                  {formData.tenderPicture ? formData.tenderPicture.name : 'No File Chosen'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="supportingDocs" className="block text-sm font-medium text-gray-700">
                Tender Supporting Docs
              </label>
              <div className="flex items-center">
                <label className={`relative cursor-pointer bg-gray-100 rounded-md py-2 px-3 border border-gray-300 ${type === "view" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"} transition-colors`}>
                  <span className="text-gray-600">Choose File</span>
                  <input
                    id="supportingDocs"
                    name="supportingDocs"
                    type="file"
                    className="sr-only"
                    onChange={(e) => handleFileChange(e, 'supportingDocs')}
                    disabled={type === "view"}
                    accept=".pdf,.doc,.docx"
                  />
                </label>
                <span className="ml-3 text-sm text-gray-500">
                  {formData.supportingDocs ? formData.supportingDocs.name : 'No File Chosen'}
                </span>
              </div>
            </div>
          </div>

          {/* Submit and Close Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            {type === "edit" && (
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isLoading ? "Updating..." : "Update Tender"}
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TenderModal;
