













// // src/pages/Dashboard.jsx
// import { useState, useEffect } from "react";
// import axios from "axios";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// import {
//     MapPin,
//     Search,
//     Filter,
//     Bell,
//     Book,
//     Heart,
//     AlertCircle,
//     Plus,
//     Users,
//     Calendar,
//     ArrowLeft,
//     Trash,
// } from "lucide-react";

// import Navbar from "@/components/Navbar";

// // Toast
// import { Toaster, toast } from "react-hot-toast";

// export default function Dashboard() {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [activeTab, setActiveTab] = useState("discover");
//     const [notifications] = useState(3);

//     const [diaryEntries, setDiaryEntries] = useState([]);
//     const [loadingDiary, setLoadingDiary] = useState(false);
//     const [showNewEntry, setShowNewEntry] = useState(false);
//     const [newTitle, setNewTitle] = useState("");
//     const [newDate, setNewDate] = useState("");
//     const [newStory, setNewStory] = useState("");

    

//     const [selectedEntry, setSelectedEntry] = useState(null);

//     const trips = [
//         { id: 1, title: "Beach Trip", location: "Goa", description: "Enjoy sun, sand and sea on a relaxing beach trip.", start_date: "2025-12-05", end_date: "2025-12-07", participant_count: 10, max_participants: 20, organizer: { full_name: "John Doe" }, theme: "Adventure", banner_image: null },
//         { id: 2, title: "Mountain Hike", location: "Himalayas", description: "Explore the majestic mountains and enjoy a challenging hike.", start_date: "2025-12-10", end_date: "2025-12-15", participant_count: 8, max_participants: 15, organizer: { full_name: "Jane Smith" }, theme: "Fitness", banner_image: null },
//         { id: 3, title: "City Tour", location: "Mumbai", description: "Discover the culture, food, and nightlife of the city.", start_date: "2025-11-20", end_date: "2025-11-22", participant_count: 12, max_participants: 25, organizer: { full_name: "Bob Johnson" }, theme: "Culture", banner_image: null },
//     ];

//     const filteredTrips = trips.filter(
//         (trip) =>
//             trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             trip.location.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const fetchDiaryEntries = async () => {
//         setLoadingDiary(true);
//         try {
//             const res = await axios.get("http://localhost:5000/api/traveler/diary/diaries");
//             const entries = res?.data?.data ?? res?.data?.diaries ?? [];
//             setDiaryEntries(entries);
//         } catch (err) {
//             console.error("Failed to load diary entries:", err);
//             setDiaryEntries([]);
//             toast.error("Failed to load diary entries.");
//         } finally {
//             setLoadingDiary(false);
//         }
//     };

//     useEffect(() => {
//         if (activeTab === "diary") {
//             fetchDiaryEntries();
//             setSelectedEntry(null);
//         }
//     }, [activeTab]);

//     const handleCreateEntry = async () => {
//         if (!newTitle || !newDate || !newStory) {
//             toast.error("All fields are required.");
//             return;
//         }
//         if (newStory.length < 25) {
//             toast.error("Story must be at least 25 characters.");
//             return;
//         }

//         try {
//             const res = await axios.post("http://localhost:5000/api/traveler/diary", {
//                 title: newTitle,
//                 date: newDate,
//                 yourstory: newStory,
//             });

//             const created = res?.data?.data ?? null;
//             if (created) {
//                 setDiaryEntries((prev) => [created, ...prev]);
//             } else {
//                 await fetchDiaryEntries();
//             }

//             setShowNewEntry(false);
//             setNewTitle("");
//             setNewDate("");
//             setNewStory("");

//             toast.success("Diary entry created successfully!");
//         } catch (err) {
//             console.error("Failed to create diary entry:", err);
//             toast.error("Failed to create entry.");
//         }
//     };

//     const handleDeleteEntry = (id) => {
//         // Show confirmation toast first
//         toast((t) => (
//             <div className="flex flex-col gap-2 p-2">
//                 <span>Are you sure you want to delete this entry?</span>
//                 <div className="flex justify-end gap-2 mt-2">
//                     <Button
//                         size="sm"
//                         onClick={async () => {
//                             toast.dismiss(t.id); // Close confirmation toast
//                             try {
//                                 // Delete entry only after confirming
//                                 await axios.delete(`http://localhost:5000/api/traveler/diary/${id}`);
//                                 setDiaryEntries((prev) => prev.filter((item) => item._id !== id && item.id !== id));
//                                 setSelectedEntry(null);
//                                 toast.success("Entry deleted successfully!", { position: "top-center" });
//                             } catch (err) {
//                                 console.error("Failed to delete entry:", err);
//                                 toast.error("Failed to delete entry.", { position: "top-center" });
//                             }
//                         }}
//                     >
//                         Confirm
//                     </Button>
//                     <Button size="sm" variant="outline" onClick={() => toast.dismiss(t.id)}>
//                         Cancel
//                     </Button>
//                 </div>
//             </div>
//         ), { position: "top-center" });
//     };


//     return (
//         <div className="min-h-screen bg-background">
//             {/* Toast notifications at top-center */}
//             <Toaster position="top-center" reverseOrder={false} />

//             <Navbar />

//             <div className="container mx-auto px-4 pt-24 pb-12">
//                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//                     {/* Sidebar */}
//                     <aside className="lg:col-span-1 space-y-2 bg-white p-4 rounded-lg shadow">
//                         <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("discover")}>
//                             <MapPin className="h-4 w-4 mr-2" /> Discover Trips
//                         </Button>
//                         <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("mytrips")}>
//                             <Heart className="h-4 w-4 mr-2" /> My Trips
//                         </Button>
//                         <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("diary")}>
//                             <Book className="h-4 w-4 mr-2" /> Travel Diary
//                         </Button>
//                         <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("community")}>
//                             <Heart className="h-4 w-4 mr-2" /> Community
//                         </Button>
//                         <Button variant="ghost" className="w-full justify-start relative">
//                             <Bell className="h-4 w-4 mr-2" /> Notifications
//                             {notifications > 0 && <Badge variant="destructive">{notifications}</Badge>}
//                         </Button>
//                         <Button variant="ghost" className="w-full justify-start">
//                             <AlertCircle className="h-4 w-4 mr-2" /> Emergency Contact
//                         </Button>
//                     </aside>

//                     {/* Main Content */}
//                     <main className="lg:col-span-3">
//                         {activeTab === "discover" && (
//                             <div>
//                                 {/* Discover tab content */}
//                                 <div className="flex items-center justify-between mb-6">
//                                     <div>
//                                         <h1 className="text-4xl font-bold mb-1">Discover Trips</h1>
//                                         <p className="text-muted-foreground">Find your next adventure and connect with fellow travelers</p>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <div className="relative">
//                                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                                             <Input placeholder="Search trips by location or title..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
//                                         </div>
//                                         <Button variant="outline" size="icon">
//                                             <Filter className="h-4 w-4" />
//                                         </Button>
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     {filteredTrips.map((trip) => (
//                                         <Card key={trip.id} className="overflow-hidden border border-gray-300 hover:shadow-lg transition-all duration-200">
//                                             <div className="relative h-48 bg-gradient-to-br from-primary to-accent" />
//                                             <CardContent className="p-6">
//                                                 <div className="flex items-center gap-2 mb-3">
//                                                     <MapPin className="h-4 w-4 text-primary" />
//                                                     <span className="text-sm font-medium text-primary">{trip.location}</span>
//                                                 </div>
//                                                 <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
//                                                 <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{trip.description}</p>
//                                                 <div className="space-y-2 mb-4">
//                                                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                                                         <Calendar className="h-4 w-4" />
//                                                         <span>{new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}</span>
//                                                     </div>
//                                                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                                                         <Users className="h-4 w-4" />
//                                                         <span>{trip.participant_count}/{trip.max_participants} travelers</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center justify-between pt-4 border-t border-border">
//                                                     <div className="flex items-center gap-2">
//                                                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
//                                                         <div className="text-sm">
//                                                             <div className="font-medium">{trip.organizer?.full_name}</div>
//                                                             <div className="text-xs text-muted-foreground">Organizer</div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex gap-2">
//                                                         <Button size="sm" variant="outline">View</Button>
//                                                         <Button size="sm">Join</Button>
//                                                     </div>
//                                                 </div>
//                                             </CardContent>
//                                         </Card>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {activeTab === "diary" && (
//                             <div className="flex flex-col gap-6">
//                                 <div className="flex flex-col">
//                                     <h1 className="text-4xl font-bold mb-2">Travel Diary</h1>
//                                     <p className="text-gray-500">Document your journey and cherish your memories</p>
//                                     <div className="mt-4">
//                                         <Button onClick={() => { setShowNewEntry(true); setSelectedEntry(null); }}>
//                                             <Plus className="h-4 w-4 mr-2" /> New Entry
//                                         </Button>
//                                     </div>
//                                 </div>

//                                 {showNewEntry && (
//                                     <Card className="p-4 border border-gray-300">
//                                         <h2 className="text-xl font-semibold mb-4">Create New Entry</h2>
//                                         <div className="flex flex-col gap-4">
//                                             <Input placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
//                                             <Input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
//                                             <Textarea placeholder="What happened today? Write your travel story..." rows={6} value={newStory} onChange={(e) => setNewStory(e.target.value)} />
//                                             <div className="flex gap-3">
//                                                 <Button onClick={handleCreateEntry}>Save Entry</Button>
//                                                 <Button variant="outline" onClick={() => setShowNewEntry(false)}>Cancel</Button>
//                                             </div>
//                                         </div>
//                                     </Card>
//                                 )}

//                                 {selectedEntry ? (
//                                     <div className="bg-white p-8 rounded-lg border border-gray-300">
//                                         <Button variant="ghost" onClick={() => setSelectedEntry(null)} className="mb-4 hover:bg-transparent">
//                                             <ArrowLeft className="h-12 w-12 text-gray-700 hover:text-black" />
//                                         </Button>
//                                         <h2 className="text-3xl font-bold mb-3">{selectedEntry.title}</h2>
//                                         <p className="text-gray-500 mb-6">{new Date(selectedEntry.date).toLocaleDateString()}</p>
//                                         <div className="prose max-w-none whitespace-pre-line text-gray-800">{selectedEntry.yourstory}</div>
//                                     </div>
//                                 ) : (
//                                     <div className="space-y-4 bg-white h-auto p-6 rounded-lg border border-gray-300">
//                                         {loadingDiary ? (
//                                             <p className="text-gray-500">Loading diary entries...</p>
//                                         ) : diaryEntries.length === 0 ? (
//                                             <p className="text-gray-500">No entries yet. Start documenting your travels!</p>
//                                         ) : (
//                                             diaryEntries.map((entry) => (
//                                                 <Card
//                                                     key={entry._id || entry.id}
//                                                     className="p-4 border border-gray-300 cursor-pointer hover:shadow-md transition relative"
//                                                     onClick={() => { setSelectedEntry(entry); setShowNewEntry(false); }}
//                                                 >
//                                                     <Button
//                                                         variant="ghost"
//                                                         size="icon"
//                                                         className="absolute top-2 right-2"
//                                                         onClick={(e) => { e.stopPropagation(); handleDeleteEntry(entry._id || entry.id); }}
//                                                     >
//                                                         <Trash className="h-4 w-4 text-red-500" />
//                                                     </Button>

//                                                     <CardContent className="p-0">
//                                                         <h3 className="text-xl font-semibold">{entry.title}</h3>
//                                                         <p className="text-gray-500 text-sm mb-2">{entry.date ? new Date(entry.date).toLocaleDateString() : ""}</p>
//                                                         <p className="text-gray-700 whitespace-pre-line line-clamp-3">{entry.yourstory?.length > 300 ? entry.yourstory.substring(0, 300) + "..." : entry.yourstory}</p>
//                                                     </CardContent>
//                                                 </Card>
//                                             ))
//                                         )}
//                                     </div>
//                                 )}
                               

//                             </div>
//                         )}
                         
//                                 {activeTab === "community" && (
//                                     <div className=" p-8 ">
//                                         <h1 className="text-4xl font-bold mb-4">Community</h1>
//                                         <p className="text-gray-500 mb-6">
//                                             Share your stories and connect with fellow travelers
//                                         </p>
//                                         <Button onClick={() => toast("Create Post clicked!")}>
//                                             Create Post
//                                         </Button>
//                                     </div>
//                                 )}

//                     </main>
//                 </div>
//             </div>
//         </div>
//     );
// }






// correct code


// // src/pages/Dashboard.jsx
// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Calendar, Users, MapPin, Search, Filter, Bell, Book, Heart, AlertCircle } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [notifications] = useState(3);

//   // Mock trips data
//   const trips = [
//     { id: 1, title: "Beach Trip", location: "Goa", description: "Enjoy sun, sand and sea on a relaxing beach trip.", start_date: "2025-12-05", end_date: "2025-12-07", participant_count: 10, max_participants: 20, organizer: { full_name: "John Doe" }, theme: "Adventure", banner_image: null },
//     { id: 2, title: "Mountain Hike", location: "Himalayas", description: "Explore the majestic mountains and enjoy a challenging hike.", start_date: "2025-12-10", end_date: "2025-12-15", participant_count: 8, max_participants: 15, organizer: { full_name: "Jane Smith" }, theme: "Fitness", banner_image: null },
//     { id: 3, title: "City Tour", location: "Mumbai", description: "Discover the culture, food, and nightlife of the city.", start_date: "2025-11-20", end_date: "2025-11-22", participant_count: 12, max_participants: 25, organizer: { full_name: "Bob Johnson" }, theme: "Culture", banner_image: null },
//   ];

//   const filteredTrips = trips.filter(
//     (trip) =>
//       trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       trip.location.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <div className="container mx-auto px-4 pt-24 pb-12">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Sidebar */}
//           <aside className="lg:col-span-1 space-y-2 bg-white p-4 rounded-lg shadow ">
//             <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/")}>
//               <MapPin className="h-4 w-4 mr-2" />
//               Discover Trips
//             </Button>
//             <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/diary")}>
//               <Book className="h-4 w-4 mr-2" />
//               Travel Diary
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <Heart className="h-4 w-4 mr-2" />
//               Community
//             </Button>
//             <Button variant="ghost" className="w-full justify-start relative">
//               <Bell className="h-4 w-4 mr-2" />
//               Notifications
//               {notifications > 0 && <Badge variant="destructive" >{notifications}</Badge>}
//             </Button>
//             <Button variant="ghost" className="w-full justify-start">
//               <AlertCircle className="h-4 w-4 mr-2" />
//               Emergency Contact
//             </Button>
//           </aside>

//           {/* Main Content */}
//           <main className="lg:col-span-3">
//             <div className="mb-8">
//               <h1 className="text-4xl font-bold mb-2">Discover Trips</h1>
//               <p className="text-muted-foreground">Find your next adventure and connect with fellow travelers</p>
//             </div>

//             {/* Search */}
//             <div className="flex gap-4 mb-6">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search trips by location or title..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//               <Button variant="outline" size="icon">
//                 <Filter className="h-4 w-4" />
//               </Button>
//             </div>

//             {/* Trips Grid */}
//             {filteredTrips.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-muted-foreground">No trips found.</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {filteredTrips.map((trip) => (
//                   <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
//                     <div className="relative h-48 bg-gradient-to-br from-primary to-accent">
//                       {trip.banner_image && <img src={trip.banner_image} alt={trip.title} className="w-full h-full object-cover" />}
//                       {trip.theme && <Badge className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm">{trip.theme}</Badge>}
//                     </div>
//                     <CardContent className="p-6">
//                       <div className="flex items-center gap-2 mb-3">
//                         <MapPin className="h-4 w-4 text-primary" />
//                         <span className="text-sm font-medium text-primary">{trip.location}</span>
//                       </div>
//                       <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
//                       <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{trip.description}</p>
//                       <div className="space-y-2 mb-4">
//                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                           <Calendar className="h-4 w-4" />
//                           <span>{trip.start_date} - {trip.end_date}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                           <Users className="h-4 w-4" />
//                           <span>{trip.participant_count}/{trip.max_participants} travelers</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between pt-4 border-t border-border">
//                         <div className="flex items-center gap-2">
//                           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
//                           <div className="text-sm">
//                             <div className="font-medium">{trip.organizer.full_name}</div>
//                             <div className="text-xs text-muted-foreground">Organizer</div>
//                           </div>
//                         </div>
//                         <div className="flex gap-2">
//                           <Button size="sm" variant="outline">View</Button>
//                           <Button size="sm">Join</Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// src/pages/Dashboard.jsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  MapPin,
  Search,
  Filter,
  Bell,
  Book,
  Heart,
  AlertCircle,
  LogOut,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3);

  // Mock trips data
  const trips = [
    {
      id: 1,
      title: "Beach Trip",
      location: "Goa",
      description:
        "Enjoy sun, sand and sea on a relaxing beach trip.",
      start_date: "2025-12-05",
      end_date: "2025-12-07",
      participant_count: 10,
      max_participants: 20,
      organizer: { full_name: "John Doe" },
      theme: "Adventure",
      banner_image: null,
    },
    {
      id: 2,
      title: "Mountain Hike",
      location: "Himalayas",
      description:
        "Explore the majestic mountains and enjoy a challenging hike.",
      start_date: "2025-12-10",
      end_date: "2025-12-15",
      participant_count: 8,
      max_participants: 15,
      organizer: { full_name: "Jane Smith" },
      theme: "Fitness",
      banner_image: null,
    },
    {
      id: 3,
      title: "City Tour",
      location: "Mumbai",
      description:
        "Discover the culture, food, and nightlife of the city.",
      start_date: "2025-11-20",
      end_date: "2025-11-22",
      participant_count: 12,
      max_participants: 25,
      organizer: { full_name: "Bob Johnson" },
      theme: "Culture",
      banner_image: null,
    },
  ];

  const filteredTrips = trips.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative">
      {/* <Navbar /> */}

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sidebar */}
          <aside className="fixed m-5 top-12 left-0 pb-20 w-64 flex flex-col bg-white p-4 shadow-lg rounded-r-lg">
            {/* Top: Profile */}
            <div className="flex flex-col items-center mb-6 mt-20">
              <div className="w-16 h-16 rounded-full bg-gray-200 mb-2" ></div>
              <div className="text-sm font-semibold">Fathima Rafah</div>
              <div className="text-xs text-gray-500">Traveler</div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/")}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Discover Trips
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/diary")}
              >
                <Book className="h-4 w-4 mr-2" />
                Travel Diary
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={()=>navigate()}>
                <Heart className="h-4 w-4 mr-2" />
                Community
              </Button>
              <Button variant="ghost" className="w-full justify-start relative">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                {notifications > 0 && <Badge variant="destructive">{notifications}</Badge>}
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <AlertCircle className="h-4 w-4 mr-2" />
                Emergency Contact
              </Button>
            </div>

            {/* Bottom: Logout */}
            <div className="mt-auto">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500"
                onClick={() => {
                  console.log("Logging out...");
                  navigate("/");
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 ml-64 ">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Discover Trips</h1>
              <p className="text-muted-foreground">
                Find your next adventure and connect with fellow travelers
              </p>
            </div>

            {/* Search */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search trips by location or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Trips Grid */}
            {filteredTrips.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No trips found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTrips.map((trip) => (
                  <Card
                    key={trip.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-primary to-accent">
                      {trip.banner_image && (
                        <img
                          src={trip.banner_image}
                          alt={trip.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {trip.theme && (
                        <Badge className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm">
                          {trip.theme}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">{trip.location}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {trip.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {trip.start_date} - {trip.end_date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>
                            {trip.participant_count}/{trip.max_participants} travelers
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
                          <div className="text-sm">
                            <div className="font-medium">{trip.organizer.full_name}</div>
                            <div className="text-xs text-muted-foreground">Organizer</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm">Join</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
