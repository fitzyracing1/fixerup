import React from "react";
import { Wrench } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Wrench className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="text-sm font-bold">Fix</span>
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Quantum Local Fixer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}