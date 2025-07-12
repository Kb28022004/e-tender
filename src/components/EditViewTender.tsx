import { ChevronRight, Search, Edit, Eye, Trash2, AlertCircle, RefreshCw, X, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tenderAPI, Tender, ApiError } from "@/services/api";

interface EditViewTenderProps {
  onOpenModal: (type: "edit" | "view", tender: Tender, onRefresh?: () => void) => void;
}

const EditViewTender = ({ onOpenModal }: EditViewTenderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteState, setDeleteState] = useState<{
    isDeleting: boolean;
    deletingId: number | null;
    showConfirm: boolean;
    tenderToDelete: Tender | null;
    error: string | null;
    success: string | null;
  }>({
    isDeleting: false,
    deletingId: null,
    showConfirm: false,
    tenderToDelete: null,
    error: null,
    success: null,
  });

  // Function to convert date from yyyy-mm-dd to dd/mm/yyyy
  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Fetch tenders from API
  const fetchTenders = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await tenderAPI.getAllTenders();
      
      if (response.data?.tenders) {
        setTenders(response.data.tenders);
      } else if (response.data && Array.isArray(response.data)) {
        // Handle case where tenders might be directly in data array
        setTenders(response.data);
      } else if (Array.isArray(response)) {
        // Handle case where response is directly an array
        setTenders(response);
      } else {
        setTenders([]);
      }
    } catch (err) {
      console.error("Error fetching tenders:", err);
      
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to fetch tenders. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete tender function
  const handleDeleteClick = (tender: Tender) => {
    setDeleteState({
      ...deleteState,
      showConfirm: true,
      tenderToDelete: tender,
      error: null,
      success: null,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteState.tenderToDelete) return;

    setDeleteState({
      ...deleteState,
      isDeleting: true,
      deletingId: deleteState.tenderToDelete.id,
      error: null,
    });

    try {
      console.log("Deleting tender with ID:", deleteState.tenderToDelete.id);
      
      const response = await tenderAPI.deleteTender(deleteState.tenderToDelete.id);
      
      console.log("Delete response:", response);
      
      setDeleteState({
        ...deleteState,
        isDeleting: false,
        deletingId: null,
        showConfirm: false,
        tenderToDelete: null,
        success: "Tender deleted successfully!",
      });

      // Refresh the table data
      await fetchTenders();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setDeleteState(prev => ({ ...prev, success: null }));
      }, 3000);

    } catch (err) {
      console.error("Error deleting tender:", err);
      
      const apiError = err as ApiError;
      setDeleteState({
        ...deleteState,
        isDeleting: false,
        deletingId: null,
        error: apiError.message || "Failed to delete tender. Please try again.",
      });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteState({
      ...deleteState,
      showConfirm: false,
      tenderToDelete: null,
      error: null,
    });
  };

  // Fetch tenders on component mount
  useEffect(() => {
    fetchTenders();
  }, []);

  // Filter tenders based on search term
  const filteredTenders = tenders.filter(tender =>
    tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tender.description && tender.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex space-x-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          <div className="h-4 bg-gray-200 rounded w-1/12"></div>
          <div className="h-4 bg-gray-200 rounded w-1/12"></div>
        </div>
      ))}
    </div>
  );

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
          <span className="text-gray-900">Edit/View Tender</span>
        </div>
      </div>

      {/* Search Bar and Refresh Button */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tenders..."
            className="pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={fetchTenders}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-red-700">{error}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTenders}
            className="ml-4"
          >
            Retry
          </Button>
        </div>
      )}

      {/* Delete Error Alert */}
      {deleteState.error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-red-700">{deleteState.error}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteState(prev => ({ ...prev, error: null }))}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Delete Success Alert */}
      {deleteState.success && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-md">
          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-green-700">{deleteState.success}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteState(prev => ({ ...prev, success: null }))}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteState.showConfirm && deleteState.tenderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete the tender "<strong>{deleteState.tenderToDelete.title}</strong>"?
            </p>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={handleDeleteCancel}
                disabled={deleteState.isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={deleteState.isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {deleteState.isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tenders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b">
                <TableHead className="font-semibold">Tender Name</TableHead>
                <TableHead className="font-semibold">Opening Date</TableHead>
                <TableHead className="font-semibold">Closing Date</TableHead>
                <TableHead className="font-semibold">Budget</TableHead>
                <TableHead className="font-semibold">Deposit</TableHead>
                <TableHead className="font-semibold">Tender Fee</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="p-6">
                    <LoadingSkeleton />
                  </TableCell>
                </TableRow>
              ) : filteredTenders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="p-8 text-center">
                    <div className="text-gray-500">
                      {error ? "Failed to load tenders" : 
                       searchTerm ? "No tenders found matching your search" : 
                       "No tenders available"}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTenders.map((tender) => (
                  <TableRow key={tender.id} className="border-b hover:bg-gray-50">
                    <TableCell className="font-medium">{tender.title}</TableCell>
                    <TableCell>{formatDate(tender.open_date)}</TableCell>
                    <TableCell>{formatDate(tender.close_date)}</TableCell>
                    <TableCell>{formatCurrency(tender.budget)}</TableCell>
                    <TableCell>{formatCurrency(tender.deposit)}</TableCell>
                    <TableCell>{formatCurrency(tender.tender_fee)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tender.status.toLowerCase() === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {tender.status.charAt(0).toUpperCase() + tender.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600"
                          onClick={() => onOpenModal("edit", tender, fetchTenders)}
                          title="Edit Tender"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-green-600"
                          onClick={() => onOpenModal("view", tender, fetchTenders)}
                          title="View Tender"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600"
                          onClick={() => handleDeleteClick(tender)}
                          disabled={deleteState.isDeleting}
                          title="Delete Tender"
                        >
                          {deleteState.isDeleting && deleteState.deletingId === tender.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Results Summary */}
        {!isLoading && !error && (
          <div className="px-4 py-3 bg-gray-50 border-t text-sm text-gray-600">
            Showing {filteredTenders.length} of {tenders.length} tenders
            {searchTerm && ` (filtered by "${searchTerm}")`}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditViewTender;
