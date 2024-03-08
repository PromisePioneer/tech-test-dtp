<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Pendidikan extends Model
{
    protected $table = 'pendidikan';

    protected $fillable = [
        'nama_sekolah',
        'jurusan',
        'tahun_masuk',
        'tahun_lulus'
    ];

    public function karyawan(): BelongsToMany
    {
        return $this->belongsToMany(Karyawan::class, 'karyawan_has_pendidikan', 'karyawan_id', 'pendidikan_id');
    }
}
