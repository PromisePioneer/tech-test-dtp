import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  CaretLeft,
  CaretRight,
  DotsThreeOutline,
  Eye,
  TrashSimple,
} from "@phosphor-icons/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";
import { useSelector } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination.jsx";
import { Input } from "@/components/ui/input.jsx";

function ListPengalamanKerjaOnEachKaryawan({ open, onOpen }) {
  const { additionalLoading, detailPengalamanKerja } = useSelector(
    (state) => state.karyawan,
  );
  let startIndex = 1;
  const [search, setSearch] = useState("");

  return (
    <Sheet open={open} onOpenChange={() => onOpen(!open)}>
      <SheetContent side="top">
        <SheetHeader>
          <div className="flex justify-between items-center">
            <SheetTitle>Daftar Pengalaman Kerja.</SheetTitle>
          </div>
          <SheetDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Nama Perusahaan</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Tahun</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailPengalamanKerja?.data.map((pengalaman) => (
                  <TableRow key={pengalaman.id}>
                    {additionalLoading ? (
                      <>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <TableCell key={index}>
                            <Skeleton
                              className="mt-4 h-4 w-20"
                              key={pengalaman.id}
                            />
                          </TableCell>
                        ))}
                      </>
                    ) : (
                      <>
                        <TableCell className="font-medium">
                          {startIndex++}
                        </TableCell>
                        <TableCell>{pengalaman.nama_perusahaan}</TableCell>
                        <TableCell>{pengalaman.jabatan}</TableCell>
                        <TableCell>{pengalaman.tahun}</TableCell>
                        <TableCell>{pengalaman.keterangan}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default ListPengalamanKerjaOnEachKaryawan;
