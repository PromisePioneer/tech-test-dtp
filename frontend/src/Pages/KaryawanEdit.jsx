import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea.jsx";
import PengalamanAddForm from "@/components/PengalamanAddForm.jsx";
import PendidikanAddForm from "@/components/PendidikanAddForm.jsx";
import {
  karyawanDetail,
  karyawanStore,
  karyawanUpdate,
} from "@/features/karyawanSlice.js";
import { toast } from "@/components/ui/use-toast.js";

function KaryawanEdit() {
  const {
    formError,
    formLoading,
    karyawanDetail: singleKaryawan,
  } = useSelector((state) => state.karyawan);
  const dispatch = useDispatch();
  const { id } = useParams();
  const storage = JSON.parse(sessionStorage.getItem("karyawanDetail"));
  const [nama, setNama] = useState(storage?.nama);
  const [nik, setNik] = useState(storage?.nik);
  const [alamat, setAlamat] = useState(storage?.alamat);
  const [foto, setFoto] = useState("");

  const pengalamanKerja = storage.pengalaman_kerja.map((pengalaman) => {
    return pengalaman;
  });

  const [pengalamanForm, setPengalamanForm] = useState([
    {
      namaPerusahaan: "",
      jabatan: "",
      tahun: "",
      keterangan: "",
    },
  ]);

  useEffect(() => {
    dispatch(karyawanDetail(id));
  }, [dispatch]);

  useEffect(() => {
    if (singleKaryawan && singleKaryawan.pengalaman_kerja) {
      const pengalamanKerja = singleKaryawan.pengalaman_kerja.map(
        (pengalaman) => {
          return {
            namaPerusahaan: pengalaman.nama_perusahaan,
            jabatan: pengalaman.jabatan,
            tahun: pengalaman.tahun,
            keterangan: pengalaman.keterangan,
          };
        },
      );
      setPengalamanForm(pengalamanKerja);

      if (singleKaryawan && singleKaryawan.pendidikan) {
        const pendidikanKaryawan = singleKaryawan.pendidikan.map(
          (pendidikan) => {
            return {
              namaSekolah: pendidikan.nama_sekolah,
              jurusan: pendidikan.jurusan,
              tahunMasuk: pendidikan.tahun_masuk,
              tahunLulus: pendidikan.tahun_lulus,
            };
          },
        );
        setPendidikanForm(pendidikanKaryawan);
      }
    }
  }, [singleKaryawan]);

  useEffect(() => {
    if (formError) {
      Object.keys(formError.errors).forEach((key) => {
        formError.errors[key].forEach((errorMessage) => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: errorMessage,
          });
        });
      });
    }
  }, [formError]);

  const [pendidikanForm, setPendidikanForm] = useState([
    {
      namaSekolah: "",
      jurusan: "",
      tahunMasuk: "",
      tahunLulus: "",
    },
  ]);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama", nama);
    formData.append("nik", nik);
    formData.append("alamat", alamat);
    formData.append("foto", foto);

    pendidikanForm.forEach((pendidikan, index) => {
      formData.append(
        `pendidikan[${index}][nama_sekolah]`,
        pendidikan.namaSekolah,
      );
      formData.append(`pendidikan[${index}][jurusan]`, pendidikan.jurusan);
      formData.append(
        `pendidikan[${index}][tahun_masuk]`,
        pendidikan.tahunMasuk,
      );
      formData.append(
        `pendidikan[${index}][tahun_lulus]`,
        pendidikan.tahunLulus,
      );
    });

    pengalamanForm.forEach((pengalaman, index) => {
      formData.append(
        `pengalaman[${index}][nama_perusahaan]`,
        pengalaman.namaPerusahaan,
      );
      formData.append(`pengalaman[${index}][jabatan]`, pengalaman.jabatan);
      formData.append(`pengalaman[${index}][tahun]`, pengalaman.tahun);
      formData.append(
        `pengalaman[${index}][keterangan]`,
        pengalaman.keterangan,
      );
    });

    dispatch(karyawanUpdate({ formData, id }));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className="w-[800px] mb-4">
          <CardHeader>
            <CardTitle>Ubah Data Karyawan</CardTitle>
            <CardDescription>
              Mohon isi semua data dari formulir ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
              <div className="sm:col-span-3">
                <Label htmlFor="nama">Nama</Label>
              </div>

              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <Input
                    type="text"
                    id="nama"
                    value={nama}
                    placeholder="John Doe"
                    onChange={(e) => setNama(e.target.value)}
                  />
                </div>
                {formError?.nama ? (
                  <p className="mt-2 ml-1 text-xs text-red-500">
                    {formError?.nama[0]}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="nik">NIK</Label>
              </div>

              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <Input
                    type="number"
                    id="nik"
                    value={nik}
                    placeholder="1471xxxx"
                    onChange={(e) => setNik(e.target.value)}
                  />
                </div>
                {formError?.nik ? (
                  <p className="mt-2 ml-1 text-xs text-red-500">
                    {formError?.nik[0]}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="foto">Foto</Label>
              </div>

              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <Input
                    type="file"
                    id="foto"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => setFoto(e.target.files[0])}
                  />
                </div>
                {formError?.nama ? (
                  <p className="mt-2 ml-1 text-xs text-red-500">
                    {formError?.nama[0]}
                  </p>
                ) : null}
              </div>

              <div className="sm:col-span-3">
                <Label htmlFor="alamat">Alamat</Label>
              </div>

              <div className="sm:col-span-9">
                <div className="flex items-center gap-5">
                  <Textarea
                    type="alamat"
                    id="alamat"
                    value={alamat}
                    placeholder="Jl. Soedirman"
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                </div>
                {formError?.alamat ? (
                  <p className="mt-2 ml-1 text-xs text-red-500">
                    {formError?.alamat[0]}
                  </p>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>
        <PendidikanAddForm
          pendidikanForm={pendidikanForm}
          onPendidikanForm={setPendidikanForm}
          formError={formError}
        />
        <PengalamanAddForm
          pengalamanForm={pengalamanForm}
          onPengalamanForm={setPengalamanForm}
          formError={formError}
        />

        <Card>
          <CardFooter className="mt-7 flex justify-end gap-x-2">
            <Link to="/">
              <Button size="sm" variant="outline">
                Kembali
              </Button>
            </Link>
            <Button size="sm" type="submit">
              {formLoading ? "Loading..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}

export default KaryawanEdit;
