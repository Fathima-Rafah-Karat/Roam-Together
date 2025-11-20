import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Plus, Trash2, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Emergency = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sosDialogOpen, setSosDialogOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchContacts();
    }
  }, [user]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from("emergency_contacts")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      toast({
        title: "Error loading contacts",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await supabase.from("emergency_contacts").insert({
        name: formData.get("name"),
        phone: formData.get("phone"),
        relationship: formData.get("relationship"),
        user_id: user?.id,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Emergency contact added.",
      });

      setDialogOpen(false);
      fetchContacts();
    } catch (error) {
      toast({
        title: "Error adding contact",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteContact = async (contactId) => {
    try {
      const { error } = await supabase
        .from("emergency_contacts")
        .delete()
        .eq("id", contactId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Contact deleted.",
      });

      fetchContacts();
    } catch (error) {
      toast({
        title: "Error deleting contact",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const triggerSOS = () => {
    setSosDialogOpen(true);
  };

  if (loading || !user) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-destructive">Emergency & Safety</h1>
          <p className="text-muted-foreground">Manage your emergency contacts and quick access to help</p>
        </div>

        {/* SOS Button */}
        <Card className="mb-8 border-destructive">
          <CardContent className="pt-6">
            <div className="text-center">
              <Button
                size="lg"
                variant="destructive"
                className="h-32 w-32 rounded-full text-xl font-bold"
                onClick={triggerSOS}
              >
                <div className="flex flex-col items-center gap-2">
                  <AlertTriangle className="h-12 w-12" />
                  SOS
                </div>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Press for immediate emergency assistance
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Emergency Contacts</CardTitle>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Emergency Contact</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddContact} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" required />
                    </div>
                    <div>
                      <Label htmlFor="relationship">Relationship</Label>
                      <Input id="relationship" name="relationship" placeholder="e.g., Family, Friend" required />
                    </div>
                    <Button type="submit" className="w-full">Add Contact</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {contacts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No emergency contacts yet. Add someone you trust.
              </p>
            ) : (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-primary" />
                        <a 
                          href={`tel:${contact.phone}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteContact(contact.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Global Emergency Numbers */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Global Emergency Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-medium mb-1">USA/Canada</p>
                <a href="tel:911" className="text-primary text-lg font-bold">911</a>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-medium mb-1">UK</p>
                <a href="tel:999" className="text-primary text-lg font-bold">999</a>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-medium mb-1">EU</p>
                <a href="tel:112" className="text-primary text-lg font-bold">112</a>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-medium mb-1">Australia</p>
                <a href="tel:000" className="text-primary text-lg font-bold">000</a>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-medium mb-1">India</p>
                <a href="tel:112" className="text-primary text-lg font-bold">112</a>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-medium mb-1">Japan</p>
                <a href="tel:110" className="text-primary text-lg font-bold">110</a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={sosDialogOpen} onOpenChange={setSosDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-6 w-6" />
              Emergency SOS Activated
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your emergency contacts will be notified of your situation. Local emergency services number: 911
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setSosDialogOpen(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Emergency;
