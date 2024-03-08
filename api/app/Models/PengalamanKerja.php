<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PengalamanKerja extends Model
{
    protected $table = 'pengalaman_kerja';

    protected $fillable = [
        'nama_perusahaan',
        'jabatan',
        'tahun',
        'keterangan'
    ];

    public function karyawan(): BelongsToMany
    {
        return $this->belongsToMany(PengalamanKerja::class, 'karyawan_has_pengalaman', 'pengalaman_id', 'karyawan_id');
    }
}
