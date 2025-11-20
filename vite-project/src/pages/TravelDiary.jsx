// src/pages/TravelDiary.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "react-hot-toast";
import { Plus, Calendar, Trash, ArrowLeft, Edit } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export default function TravelDiary() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEntry, setEditEntry] = useState({ id: null, title: "", date: "", yourstory: "" });

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/traveler/diary/diaries");
      const data = res.data.data ?? res.data.diaries ?? [];
      setEntries(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load diary entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleCreateEntry = async () => {
    const { title, date, yourstory } = editEntry;
    if (!title || !date || !yourstory) {
      toast.error("All fields are required.");
      return;
    }
    if (yourstory.length < 25) {
      toast.error("Story must be at least 25 characters.");
      return;
    }

    try {
      if (editEntry.id) {
        // Update existing entry
        const res = await axios.put(`http://localhost:5000/api/traveler/diary/${editEntry.id}`, { title, date, yourstory });
        const updated = res.data.data ?? null;
        setEntries((prev) =>
          prev.map((e) => (e._id === editEntry.id || e.id === editEntry.id ? updated : e))
        );
        toast.success("Diary entry updated successfully!");
      } else {
        // Create new entry
        const res = await axios.post("http://localhost:5000/api/traveler/diary", { title, date, yourstory });
        const created = res.data.data ?? null;
        if (created) setEntries((prev) => [created, ...prev]);
        toast.success("Diary entry created successfully!");
      }

      setEditEntry({ id: null, title: "", date: "", yourstory: "" });
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save diary entry.");
    }
  };
  const handleDeleteEntry = (id) => {
        // Show confirmation toast first
        toast((t) => (
            <div className="flex flex-col gap-2 p-2">
                <span>Are you sure you want to delete this entry?</span>
                <div className="flex justify-end gap-2 mt-2">
                    <Button
                        size="sm"
                        onClick={async () => {
                            toast.dismiss(t.id); // Close confirmation toast
                            try {
                                // Delete entry only after confirming
                                await axios.delete(`http://localhost:5000/api/traveler/diary/${id}`);
                                setDiaryEntries((prev) => prev.filter((item) => item._id !== id && item.id !== id));
                                setSelectedEntry(null);
                                toast.success("Entry deleted successfully!", { position: "top-center" });
                            } catch (err) {
                                console.error("Failed to delete entry:", err);
                                toast.error("Failed to delete entry.", { position: "top-center" });
                            }
                        }}
                    >
                        Confirm
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => toast.dismiss(t.id)}>
                        Cancel
                    </Button>
                </div>
            </div>
        ), { position: "top-center" });
    };
  const handleEditClick = (entry) => {
    setEditEntry({
      id: entry._id || entry.id,
      title: entry.title,
      date: entry.date,
      yourstory: entry.yourstory,
    });
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl space-y-6">
        {/* Back Button */}
        <div className="mb-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5 mr-1" />
          </Button>
        </div>

        {/* Header */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-2">Travel Diary</h1>
          <p className="text-gray-500">Document your journey and cherish your memories</p>

          {/* New / Edit Entry Dialog */}
          <div className="mt-4">
            <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
              <Dialog.Trigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> New Entry
                </Button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                  <Dialog.Title className="text-xl font-semibold mb-4">
                    {editEntry.id ? "Edit Entry" : "Create New Entry"}
                  </Dialog.Title>
                  <div className="flex flex-col gap-4">
                    <Input
                      placeholder="Title"
                      value={editEntry.title}
                      onChange={(e) => setEditEntry({ ...editEntry, title: e.target.value })}
                    />
                    <Input
                      type="date"
                      value={editEntry.date}
                      onChange={(e) => setEditEntry({ ...editEntry, date: e.target.value })}
                    />
                    <Textarea
                      placeholder="Write your travel story..."
                      rows={6}
                      value={editEntry.yourstory}
                      onChange={(e) => setEditEntry({ ...editEntry, yourstory: e.target.value })}
                    />
                    <div className="flex justify-end gap-3 mt-2">
                      <Button onClick={handleCreateEntry}>
                        {editEntry.id ? "Update Entry" : "Save Entry"}
                      </Button>
                      <Dialog.Close asChild>
                        <Button variant="outline">Cancel</Button>
                      </Dialog.Close>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>

        {/* Selected Entry */}
        {selectedEntry && (
          <Card className="p-6 border border-gray-300">
            <Button variant="ghost" onClick={() => setSelectedEntry(null)} className="mb-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold mb-2">{selectedEntry.title}</h2>
            <p className="text-gray-500 mb-4">{new Date(selectedEntry.date).toLocaleDateString()}</p>
            <p className="whitespace-pre-line">{selectedEntry.yourstory}</p>
          </Card>
        )}

        {/* Diary Entries List */}
        {!selectedEntry && (
          <div className="space-y-4 bg-white h-auto p-6 rounded-lg border border-gray-300">
            {loading ? (
              <p className="text-gray-500 text-center">Loading entries...</p>
            ) : entries.length === 0 ? (
              <p className="text-gray-500 text-center">No entries yet. Start documenting your travels!</p>
            ) : (
              entries.map((entry) => (
                <Card
                  key={entry._id || entry.id}
                  className="p-4 border border-gray-300 cursor-pointer hover:shadow-md relative"
                  onClick={() => setSelectedEntry(entry)}
                >
                  {/* Delete & Edit Buttons */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(entry);
                      }}
                    >
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEntry(entry._id || entry.id);
                      }}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <CardHeader className="p-0">
                    <CardTitle>{entry.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4" />
                      {entry.date ? new Date(entry.date).toLocaleDateString() : "-"}
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-700 whitespace-pre-line line-clamp-3">{entry.yourstory}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
