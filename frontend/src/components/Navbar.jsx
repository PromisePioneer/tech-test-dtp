import React from "react";

function Navbar() {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
      <nav
        className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 py-6"
        aria-label="Global"
      >
        <div className="flex items-center">
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="#"
            aria-label="Brand"
          >
            <img src="dtp-logo.png" alt="" width={100} height={100} />
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
