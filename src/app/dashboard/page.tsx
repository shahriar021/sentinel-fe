"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAllResourcesQuery } from "@/src/redux/features/resources/resourcesApi";
import { usePostBookingMutation } from "@/src/redux/features/booking/bookingApi";
import Drawer from "@/src/components/layout/Drawer";

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const {data:getAllResources,isLoading,refetch}=useGetAllResourcesQuery()
  const [postBooking, { isLoading: isBooking }] = usePostBookingMutation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (!storedToken) {
      router.push("/auth/login");
    } else {
      setToken(storedToken);
      setRole(storedRole);
    }
  }, [router]);
  console.log(role,"dashboard");

  // --- NEW: POST API CALL FOR BOOKING ---
const handleBooking = async (resourceId: number) => {
  const start = new Date();
  const end = new Date();
  end.setHours(start.getHours() + 1);

  try {
    // This replaces the manual fetch
    await postBooking({
      token: token,
      body:{resource_id: Number(resourceId),
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      assigned_hours: 10,}
    }).unwrap();

    alert("✅ Assigned Successfully!");
  } catch (err) {
    alert("❌ Failed to assign");
  }
};

 const getStatusColor = (percentage: number) => {
   if (percentage >= 100) return "bg-red-500";
   if (percentage >= 75) return "bg-yellow-500";
   return "bg-green-500";
 };

 return (
   <div className="flex min-h-screen bg-background text-foreground p-8">
    {/* <Drawer/> */}
     <main className="flex-1 max-w-5xl mx-auto">
       <header className="flex justify-between items-center mb-10">
         <div>
           <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Talent Sentinel</h1>
           <p className="text-slate-500 mt-2">Real-time resource capacity & utilization</p>
         </div>
         <button onClick={() => refetch()} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
           Refresh Data
         </button>
       </header>

       {isLoading ? (
         <div className="flex justify-center py-20">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
         </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {getAllResources?.map((res: any) => (
             <div key={res.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h3 className="text-xl font-bold text-slate-800">{res.name}</h3>
                   <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded uppercase">
                     {res.type}
                   </span>
                 </div>
                 <div className="text-right">
                   <p className="text-2xl font-bold text-slate-900">{res.utilization_percentage}%</p>
                   <p className="text-xs text-slate-400 uppercase">Utilization</p>
                 </div>
               </div>
               <div className="flex justify-between text-xs mb-1">
                 <span className="text-slate-400">0 hrs</span>
                 <span className="text-slate-400 font-medium">{res.total_hours} hrs max</span>
               </div>
               {/* YOUR CAPACITY BAR HERE */}

               {/* CAPACITY BAR */}
               <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden">
                 <div
                   className={`h-full transition-all duration-500 ${getStatusColor(parseFloat(res.utilization_percentage))}`}
                   style={{ width: `${Math.min(parseFloat(res.utilization_percentage), 100)}%` }}
                 />
               </div>

               <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                 <div className="text-sm">
                   <span className="text-slate-500">Load: </span>
                   <span className="font-medium text-slate-700">
                     {res.current_hours} / {res.total_hours} hrs
                   </span>
                 </div>

                 <button
                   onClick={() => handleBooking(res.id)}
                   disabled={res.is_overloaded}
                   className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                     res.is_overloaded
                       ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                       : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                   }`}
                 >
                   {res.is_overloaded ? "At Capacity" : "Assign Task"}
                 </button>
               </div>
             </div>
           ))}
         </div>
       )}
     </main>
   </div>
 );
}
