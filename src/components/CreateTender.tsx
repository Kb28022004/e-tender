import { ChevronRight, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { tenderAPI, ApiError } from "@/services/api";

const CreateTender = () => {
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

  // Function to convert date from dd/mm/yyyy to yyyy-mm-dd
  const convertDateFormat = (dateString: string): string => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split('/');
    if (!day || !month || !year) return "";
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
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
          status: "active",
          open_date: convertDateFormat(formData.openingDate),
          close_date: convertDateFormat(formData.closingDate),
          contact_info: formData.contactInfo.trim(),
          gst_number: formData.gst.trim(),
          department_id: 1
        }
      };

      console.log("Sending tender data:", apiData);

      const response = await tenderAPI.createTender(apiData);
      
      console.log("Tender creation response:", response);
      
      setSuccess("Tender created successfully!");
      
      // Reset form after successful submission
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (err) {
      console.error("Error creating tender:", err);
      
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to create tender. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form or navigate away
    setFormData({
      tenderName: "",
      description: "",
      openingDate: "",
      closingDate: "",
      earnMoneyDeposit: "",
      tenderFee: "",
      contactInfo: "",
      gst: "",
      tenderPicture: null,
      supportingDocs: null
    });
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">E-Tender</h1>
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="hover:text-admin-blue-600 cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-admin-blue-600 cursor-pointer">E-Tender</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Create Tender</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-md">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      {/* Create Tender Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tender Name */}
        <div className="space-y-2">
          <label htmlFor="tenderName" className="block text-sm font-medium text-gray-700">
            Tender Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="tenderName"
            name="tenderName"
            placeholder="Enter Tender Name Here"
            value={formData.tenderName}
            onChange={handleInputChange}
            className="w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter Tender Description Here"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full min-h-[100px]"
            required
          />
        </div>

        {/* Dates - Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="openingDate" className="block text-sm font-medium text-gray-700">
              Tender Opening Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="openingDate"
                name="openingDate"
                type="text"
                placeholder="dd/mm/yyyy"
                value={formData.openingDate}
                onChange={handleInputChange}
                className="w-full pr-10"
                required
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
              Tender Closing Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="closingDate"
                name="closingDate"
                type="text"
                placeholder="dd/mm/yyyy"
                value={formData.closingDate}
                onChange={handleInputChange}
                className="w-full pr-10"
                required
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
              Earn Money Deposit (Budget) <span className="text-red-500">*</span>
            </label>
            <Input
              id="earnMoneyDeposit"
              name="earnMoneyDeposit"
              placeholder="Enter Earn Money Deposit Here"
              value={formData.earnMoneyDeposit}
              onChange={handleInputChange}
              className="w-full"
              type="number"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tenderFee" className="block text-sm font-medium text-gray-700">
              Tender Fee <span className="text-red-500">*</span>
            </label>
            <Input
              id="tenderFee"
              name="tenderFee"
              placeholder="Enter Tender Fee Here"
              value={formData.tenderFee}
              onChange={handleInputChange}
              className="w-full"
              type="number"
              required
            />
          </div>
        </div>

        {/* Contact and GST - Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
              Contact Information <span className="text-red-500">*</span>
            </label>
            <Input
              id="contactInfo"
              name="contactInfo"
              placeholder="Enter Contact Here"
              value={formData.contactInfo}
              onChange={handleInputChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="gst" className="block text-sm font-medium text-gray-700">
              GST Number <span className="text-red-500">*</span>
            </label>
            <Input
              id="gst"
              name="gst"
              placeholder="Enter GST Number Here"
              value={formData.gst}
              onChange={handleInputChange}
              className="w-full"
              required
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
              <label className="relative cursor-pointer bg-gray-100 rounded-md py-2 px-3 border border-gray-300 hover:bg-gray-200 transition-colors">
                <span className="text-gray-600">Choose File</span>
                <input
                  id="tenderPicture"
                  name="tenderPicture"
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleFileChange(e, 'tenderPicture')}
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
              <label className="relative cursor-pointer bg-gray-100 rounded-md py-2 px-3 border border-gray-300 hover:bg-gray-200 transition-colors">
                <span className="text-gray-600">Choose File</span>
                <input
                  id="supportingDocs"
                  name="supportingDocs"
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleFileChange(e, 'supportingDocs')}
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
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            {isLoading ? "Creating..." : "Submit"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTender;
