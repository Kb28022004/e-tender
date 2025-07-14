import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAllPubliceTendersQuery,
  useGetSingleUserTenderMutation,
  useSetWinnerMutation,
} from "../features/tenderApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const WinnerDeclarationContent = () => {
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBidderId, setSelectedBidderId] = useState<number | null>(null);

  const authToken = localStorage.getItem("authToken");

  const { data: allTenders } = useGetAllPubliceTendersQuery({ token: authToken });
  const [getSingleUserTender, { data: tenderApplications }] = useGetSingleUserTenderMutation();
  const [setWinner, { data: winnderData, isLoading, isSuccess, isError, error }] = useSetWinnerMutation();

  const handleTenderSelect = async (id: string) => {
    setSelectedTenderId(id);
    await getSingleUserTender({ token: authToken, id });
  };

  const handleDeclareWinnerClick = (bidderId: number) => {
    setSelectedBidderId(bidderId);
    setDialogOpen(true);
  };

  const handleWinnerDeclaration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTenderId || !selectedBidderId || !message) return;

    try {
      await setWinner({
        token: authToken,
        id: selectedTenderId,
        userTenderId: selectedBidderId,
        message,
        attachment: selectedFile,
      });
    } catch (error) {
      console.error("Winner Declaration Failed:", error);
    }
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
    if (isSuccess && winnderData) {
      toast.success(winnderData?.message || "Winner declared!");
      setDialogOpen(false);
      setMessage("");
      setSelectedFile(null);
      if (selectedTenderId) getSingleUserTender({ token: authToken, id: selectedTenderId });
    }
  }, [isError, error, isSuccess, winnderData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Winner Declaration</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="hover:text-admin-blue-600 cursor-pointer">Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Winner Declaration</span>
        </div>
      </div>

      {/* Tender Selector */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Tender</h2>
        <Select
          value={selectedTenderId ?? ""}
          onValueChange={(val) => handleTenderSelect(val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Tender" />
          </SelectTrigger>
          <SelectContent>
            {allTenders?.data?.map((tender) => (
              <SelectItem key={tender.id} value={tender.id.toString()}>
                {tender.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bidders Table */}
      {selectedTenderId && tenderApplications?.data?.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Status</TableHead>
                <TableHead>Declare</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>GST</TableHead>
                <TableHead>PAN</TableHead>
                <TableHead>EMD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenderApplications?.data.map((item) => (
                <TableRow key={item.id} className={item.status === "winner" ? "bg-green-50" : ""}>
                  <TableCell>
                    <span className={`text-sm font-medium ${item.status === "winner" ? "text-green-600" : "text-gray-500"}`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.status !== "winner" && (
                      <Button
                        className="text-orange-700 bg-orange-100 hover:bg-orange-200"
                        onClick={() => handleDeclareWinnerClick(item.id)}
                        variant="outline"
                        disabled={item?.status ==='rejected'}
                      >
                        Declare
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{item.bidder_company_name}</TableCell>
                  <TableCell>{item.city || "N/A"}</TableCell>
                  <TableCell>{item.email || "N/A"}</TableCell>
                  <TableCell>{item.contact_number || "N/A"}</TableCell>
                  <TableCell>{item.gst_number || "N/A"}</TableCell>
                  <TableCell>{item.pan_number || "N/A"}</TableCell>
                  <TableCell>{item.earnest_money_deposit || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Winner Declaration Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Winner Declaration
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleWinnerDeclaration} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <Textarea
                placeholder="Enter message"
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className="flex items-center space-x-3 pt-4">
              <Button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WinnerDeclarationContent;
