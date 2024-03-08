import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import { Skeleton } from "@/components/ui/skeleton.jsx";

function ListPendidikanOnEachKaryawan({ openPendidikan, onOpenPendidikan }) {
  const { additionalLoading, detailPendidikan } = useSelector(
    (state) => state.karyawan,
  );
  let startIndex = 1;
  const [search, setSearch] = useState("");

  return (
    <Sheet
      open={openPendidikan}
      onOpenChange={() => onOpenPendidikan(!openPendidikan)}
    >
      <SheetContent side="top">
        <SheetHeader>
          <div className="flex justify-between items-center">
            <SheetTitle>Daftar Riwayat Pendidikan.</SheetTitle>
          </div>
          <SheetDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Nama Sekolah</TableHead>
                  <TableHead>Jurusan</TableHead>
                  <TableHead>Tahun Masuk</TableHead>
                  <TableHead>Tahun Lulus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailPendidikan?.data.map((pengalaman) => (
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
                        <TableCell>{pengalaman.nama_sekolah}</TableCell>
                        <TableCell>{pengalaman.jurusan}</TableCell>
                        <TableCell>{pengalaman.tahun_masuk}</TableCell>
                        <TableCell>{pengalaman.tahun_lulus}</TableCell>
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

export default ListPendidikanOnEachKaryawan;
