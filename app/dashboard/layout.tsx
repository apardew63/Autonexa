"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const ModalContext = createContext<{ showModal: boolean; setShowModal: (show: boolean) => void } | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
import {
  FiHome,
  FiPlus,
  FiList,
  FiSearch,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiBarChart,
  FiHeart,
  FiX
} from "react-icons/fi";
import CarListingForm from "../../components/CarListingForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Redirect based on user role
      const currentPath = window.location.pathname;
      if (parsedUser.role === "dealer" && !currentPath.includes("/dealer")) {
        router.push("/dashboard/dealer");
      } else if (parsedUser.role === "user" && !currentPath.includes("/user") && !currentPath.includes("/browse") && !currentPath.includes("/favorites") && !currentPath.includes("/manage-cars") && !currentPath.includes("/edit-car") && !currentPath.includes("/account-settings")) {
        router.push("/dashboard/user");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const getNavigation = (userRole: string) => {
    const baseNavigation = [
      { name: "Browse Cars", href: "/dashboard/browse", icon: FiSearch },
      { name: "My Favorites", href: "/dashboard/favorites", icon: FiHeart },
    ];

    if (userRole === "dealer") {
      return [
        { name: "Dashboard", href: "/dashboard/dealer", icon: FiHome },
        ...baseNavigation,
        { name: "Add Car", href: "/dashboard/add-car", icon: FiPlus },
        { name: "Manage Cars", href: "/dashboard/manage-cars", icon: FiList },
        { name: "Analytics", href: "#", icon: FiBarChart },
        { name: "Account Settings", href: "/dashboard/account-settings", icon: FiSettings },
      ];
    } else {
      return [
        { name: "Dashboard", href: "/dashboard/user", icon: FiHome },
        ...baseNavigation,
        { name: "Add Car", href: "#", icon: FiPlus },
        { name: "Manage Cars", href: "/dashboard/manage-cars", icon: FiList },
        { name: "Account Settings", href: "/dashboard/account-settings", icon: FiSettings },
      ];
    }
  };

  const navigation = getNavigation(user?.role || "");

  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="min-h-screen bg-gray-50 z-50">
        <div className="flex z-50">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-[300px] bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
            <h1 className="text-xl font-bold text-white">AutossssNexa</h1>
          </div>

          <nav className="mt-8 px-4 z-50">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  item.name === "Add Car" ? (
                    <button
                      key={item.name}
                      onClick={() => setShowModal(true)}
                      className="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                );
              })}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="px-4 py-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || ""}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiLogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </div>
          </nav>
        </div>

        <div className="flex-1 lg:ml-64 z-50">
          <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
            <div className="flex items-center justify-between h-16 px-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <FiMenu className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
              <div className="w-10" />
            </div>
          </header>

          <main className="">
            {children}
          </main>
        </div>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Add Car Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 flex items-center">
                  <FiPlus className="h-5 w-5 mr-2 text-blue-600" />
                  Add New Car Listing
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <CarListingForm
                  userId={user?._id || ""}
                  onSuccess={() => {
                    setShowModal(false);
                    toast.success("Car listed successfully!");
                    // Refresh data if needed
                  }}
                  onError={(error: { message?: string }) => {
                    toast.error(error.message || "Failed to list car");
                  }}
                />
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </ModalContext.Provider>
  );
}