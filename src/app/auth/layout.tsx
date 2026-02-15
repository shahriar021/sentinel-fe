// NO "use client" here! Layouts are server components by default
export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg rounded-lg bg-white">
        {children} 
      </div>
    </div>
  );
}
