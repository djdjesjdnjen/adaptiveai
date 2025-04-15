
import React from 'react';
import { Bell, ChevronDown, User, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-md h-8 w-8 flex items-center justify-center mr-3">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Adaptive<span className="text-primary font-bold">AI</span>
            </span>
          </a>
          
          <div className="hidden md:flex ml-10 space-x-4">
            <a href="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
            <a href="#analytics" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Analytics</a>
            <a href="#insights" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">ML Insights</a>
            <a href="#documentation" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Documentation</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <button 
                type="button" 
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-primary"
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" className="relative p-2 text-gray-500 hover:text-primary">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex flex-col gap-2 p-4">
                    <h3 className="font-semibold">Notifications</h3>
                    <div className="text-sm text-gray-500">
                      No new notifications
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-sm rounded-full focus:ring-4 focus:ring-gray-100">
                    <div className="bg-gray-200 p-2 rounded-full">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="hidden md:block ml-2 mr-1 text-gray-700">{user.email}</span>
                    <ChevronDown className="hidden md:block h-4 w-4 text-gray-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>System Preferences</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={() => navigate('/auth')}>Sign In</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
