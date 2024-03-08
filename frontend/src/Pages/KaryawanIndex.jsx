import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination.jsx";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import KaryawanList from "@/Pages/KaryawanList.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchKaryawan,
  karyawanPrevPage,
  karyawanSearch,
} from "@/features/karyawanSlice.js";
import { toast } from "@/components/ui/use-toast.js";
import { Input } from "@/components/ui/input.jsx";

function KaryawanIndex() {
  const [open, setOpen] = useState();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { karyawan, detailLoading, error, loading, karyawanDetail, success } =
    useSelector((state) => state.karyawan);
  let startIndex = karyawan?.from;

  const isNextPageAvailable = karyawan?.next_page_url === null;
  const isPrevPageAvailable = karyawan?.prev_page_url === null;

  useEffect(() => {
    dispatch(fetchKaryawan());
    if (success) {
      toast({
        title: "Sukses",
        description: "Data sukses dihapus",
      });
      dispatch(fetchKaryawan());
    }
  }, [success, dispatch]);

  function handleSearch(e) {
    e.preventDefault();
    if (!search) dispatch(fetchKaryawan());
    dispatch(karyawanSearch(search));
  }

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle className="mb-4">Data Karyawan</CardTitle>
        <div className="flex justify-between items-center">
          <Link to="form">
            <Button size="sm">Tambah</Button>
          </Link>
          <form onSubmit={handleSearch}>
            <Input
              placeholder="Filter Karyawan..."
              className="max-w-sm"
              value={search}
              name="search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>NIK</TableHead>
              <TableHead>Pendidikan</TableHead>
              <TableHead>Pengalaman</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {karyawan?.data.map((karyawan) => (
              <KaryawanList
                karyawan={karyawan}
                key={karyawan?.id}
                startIndex={startIndex++}
                onOpen={setOpen}
                open={open}
                loading={loading}
                error={error}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Pagination className="flex justify-end items-center">
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => dispatch(karyawanPrevPage())}
                disabled={isPrevPageAvailable}
              >
                <CaretLeft size={16} />
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => dispatch(karyawanNextPage())}
                disabled={isNextPageAvailable}
              >
                Next
                <CaretRight size={16} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
}

export default KaryawanIndex;
