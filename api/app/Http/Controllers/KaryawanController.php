<?php

namespace App\Http\Controllers;

use App\Http\Requests\KaryawanStoreRequest;
use App\Http\Requests\PendidikanStoreRequest;
use App\Http\Requests\PengalamanStoreRequest;
use App\Models\Karyawan;
use App\Models\Pendidikan;
use App\Models\PengalamanKerja;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class KaryawanController extends Controller
{


    public function fetchAllKaryawan(Request $request): JsonResponse
    {
        $numberOfpage = $request->input('per_page', 10);
        $karyawan = Karyawan::latest()->paginate($numberOfpage);
        return response()->json($karyawan, 200);
    }


    public function search(Request $request)
    {
        $number_page = $request->input('per_page', 10);
        $search = $request->input('search');

        $result = Karyawan::where('nama', 'like', '%' . $search . '%')
            ->orWhere('nik', 'like', '%' . $search . '%')
            ->orWhere('alamat', 'like', '%' . $search . '%')
            ->paginate($number_page);

        return response()->json($result);
    }

    public function store(KaryawanStoreRequest $karyawanStoreRequest, PendidikanStoreRequest $pendidikanStoreRequest, PengalamanStoreRequest $pengalamanStoreRequest)
    {
        $foto = $karyawanStoreRequest->file('foto')->store('karyawan', 'public');
        $karyawan = new Karyawan();
        $karyawan->nama = $karyawanStoreRequest->nama;
        $karyawan->nik = $karyawanStoreRequest->nik;
        $karyawan->alamat = $karyawanStoreRequest->alamat;
        $karyawan->foto = $foto;
        $karyawan->save();

        foreach ($pendidikanStoreRequest->pendidikan as $pendidikan) {
            $newPendidikan = new Pendidikan([
                'nama_sekolah' => $pendidikan['nama_sekolah'],
                'jurusan' => $pendidikan['jurusan'],
                'tahun_masuk' => $pendidikan['tahun_masuk'],
                'tahun_lulus' => $pendidikan['tahun_lulus'],
            ]);
            $newPendidikan->save();
            $karyawan->pendidikan()->attach($newPendidikan->id);
        }

        foreach ($pengalamanStoreRequest->pengalaman as $pengalaman) {
            $newPengalaman = new PengalamanKerja([
                'nama_perusahaan' => $pengalaman['nama_perusahaan'],
                'jabatan' => $pengalaman['jabatan'],
                'tahun' => $pengalaman['tahun'],
                'keterangan' => $pengalaman['keterangan'],
            ]);
            $newPengalaman->save();
            $karyawan->pengalamanKerja()->attach($newPengalaman->id);
        }

        return response()->json(['message' => 'Data Berhasil Disimpan']);
    }


    public function edit(Karyawan $karyawan)
    {
        return response()->json($karyawan);
    }

    public function update(Karyawan $karyawan, KaryawanStoreRequest $karyawanStoreRequest, PendidikanStoreRequest $pendidikanStoreRequest, PengalamanStoreRequest $pengalamanStoreRequest)
    {
        $foto = $karyawanStoreRequest->file('foto')->store('karyawan', 'public');
        $karyawan->nama = $karyawanStoreRequest->nama;
        $karyawan->nik = $karyawanStoreRequest->nik;
        $karyawan->alamat = $karyawanStoreRequest->alamat;
        $karyawan->foto = $foto;
        $karyawan->save();

        foreach ($pendidikanStoreRequest->pendidikan as $pendidikan) {
            $newPendidikan = new Pendidikan([
                'nama_sekolah' => $pendidikan['nama_sekolah'],
                'jurusan' => $pendidikan['jurusan'],
                'tahun_masuk' => $pendidikan['tahun_masuk'],
                'tahun_lulus' => $pendidikan['tahun_lulus'],
            ]);
            $newPendidikan->save();
            $karyawan->pendidikan()->attach($newPendidikan->id);
        }

        foreach ($pengalamanStoreRequest->pengalaman as $pengalaman) {
            $newPengalaman = new PengalamanKerja([
                'nama_perusahaan' => $pengalaman['nama_perusahaan'],
                'jabatan' => $pengalaman['jabatan'],
                'tahun' => $pengalaman['tahun'],
                'keterangan' => $pengalaman['keterangan'],
            ]);
            $newPengalaman->save();
            $karyawan->pengalamanKerja()->attach($newPengalaman->id);
        }

    return response()->json(['message' => 'Data Berhasil Diupdate']);
    }


    public function pengalamanKerjaDetail(Request $request, Karyawan $karyawan)
    {
        $numberOfpage = $request->input('per_page', 10);
        $query = Karyawan::with('pengalamanKerja')->where('id', $karyawan->id)->first();
        return $query->pengalamanKerja()->paginate($numberOfpage);
    }


    public function pendidikanDetail(Request $request, Karyawan $karyawan)
    {
        $numberOfpage = $request->input('per_page', 10);
        $query = Karyawan::with('pendidikan')->where('id', $karyawan->id)->first();
        return $query->pendidikan()->paginate($numberOfpage);
    }

    public function destroy(Karyawan $karyawan)
    {
        Storage::delete('karyawan/' . $karyawan);
        return response()->json($karyawan->delete());
    }
}
