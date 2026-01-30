"use client";

import { Clock, Phone, Mail } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-white border-b border-gray-100 py-2 text-[13px] text-gray-600 hidden md:block">
      <div className="container-custom flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span>
              <strong>Lunes a viernes</strong> 08:00 am - 05:00 pm | 
              <strong> Sábado</strong> 07:00 - 02:00 pm
            </span>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-primary" />
            <a href="tel:+50222372540" className="hover:text-primary active:text-primary-hover">+502 2237-2540</a>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-primary" />
            <a href="mailto:info@centrodental.com" className="hover:text-primary active:text-primary-hover">info@centrodental.com</a>
          </div>
          <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
            <span className="font-bold cursor-pointer hover:text-primary active:text-primary-hover">Español</span>
            <span className="text-gray-300">|</span>
            <span className="cursor-pointer hover:text-primary active:text-primary-hover">English</span>
          </div>
        </div>
      </div>
    </div>
  );
}
