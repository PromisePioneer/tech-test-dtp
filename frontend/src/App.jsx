import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import KaryawanIndex from "@/Pages/KaryawanIndex.jsx";
import KaryawanAdd from "@/Pages/KaryawanAdd.jsx";
import Karyawan from "@/Pages/Karyawan.jsx";
import KaryawanEdit from "@/Pages/KaryawanEdit.jsx";

const router = createBrowserRouter([
  {
    element: <Karyawan />,
    children: [
      {
        path: "/",
        element: <KaryawanIndex />,
      },
      {
        path: "form",
        element: <KaryawanAdd />,
      },
      {
        path: "edit/:id",
        element: <KaryawanEdit />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
