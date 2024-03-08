import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table.jsx";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { DotsThreeOutline, Eye, TrashSimple } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button.jsx";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import { asset } from "@/service/apiCall.js";
import ListPengalamanKerjaOnEachKaryawan from "@/Pages/ListPengalamanKerjaOnEachKaryawan.jsx";
import { useDispatch } from "react-redux";
import {
  karyawanDestroy,
  listPendidikan,
  listPengalamanKerja,
} from "@/features/karyawanSlice.js";
import ListPendidikanOnEachKaryawan from "@/Pages/ListPendidikanOnEachKaryawan.jsx";

function KaryawanList({ karyawan, startIndex, loading, error }) {
  const [openPengalaman, setOpenPengalaman] = useState(false);
  const [openPendidikan, setOpenPendidikan] = useState(false);

  const dispatch = useDispatch();

  function handleDetailPendidikan(id) {
    dispatch(listPendidikan(id));
    setOpenPendidikan(true);
  }

  function handleDetailPengalamanKerja(id) {
    dispatch(listPengalamanKerja(id));
    setOpenPengalaman(true);
  }

  return (
    <TableRow key={karyawan.id}>
      <ListPengalamanKerjaOnEachKaryawan
        open={openPengalaman}
        onOpen={setOpenPengalaman}
      />
      <ListPendidikanOnEachKaryawan
        openPendidikan={openPendidikan}
        onOpenPendidikan={setOpenPendidikan}
      />
      {loading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableCell key={index}>
              <Skeleton className="mt-4 h-4 w-20" key={karyawan.id} />
            </TableCell>
          ))}
        </>
      ) : (
        <>
          <TableCell className="font-medium">{startIndex}</TableCell>
          <TableCell>{karyawan.nama}</TableCell>
          <TableCell>{karyawan.nik}</TableCell>
          <TableCell>
            <Button
              size="sm"
              onClick={() => handleDetailPendidikan(karyawan.id)}
            >
              <Eye size={16} />
            </Button>
          </TableCell>
          <TableCell>
            <Button
              size="sm"
              onClick={() => handleDetailPengalamanKerja(karyawan.id)}
            >
              <Eye size={16} />
            </Button>
          </TableCell>
          <TableCell>{karyawan.alamat}</TableCell>
          <TableCell>
            <img src={asset(karyawan.foto)} alt={karyawan.nama} width={100} />
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <DotsThreeOutline />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-50">
                <DropdownMenuLabel>Detail</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to={`edit/${karyawan.id}`}>
                  <DropdownMenuCheckboxItem className="cursor-pointer">
                    <Pencil2Icon className="mr-3 cursor-pointer" size={19} />
                    Edit
                  </DropdownMenuCheckboxItem>
                </Link>
                <DropdownMenuCheckboxItem
                  className="cursor-pointer"
                  onClick={() => dispatch(karyawanDestroy(karyawan.id))}
                >
                  <TrashSimple className="mr-3" size={19} />
                  Delete
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </>
      )}
    </TableRow>
  );
}

export default KaryawanList;
