import { NavLink } from "react-router-dom";
import { Upload, BarChart3, Search, Settings, BookOpen, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Classify", icon: Upload },
  { to: "/metrics", label: "Metrics", icon: BarChart3 },
  { to: "/learning", label: "Learning", icon: BookOpen },
  { to: "/about", label: "About", icon: Info },
  //{ to: "/scan", label: "Scan", icon: Search },
  // { to: "/tuning", label: "Tuning", icon: Settings },
];

const Navigation = () => {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative",
                  "hover:text-primary hover:bg-primary/5",
                  isActive
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                    : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
