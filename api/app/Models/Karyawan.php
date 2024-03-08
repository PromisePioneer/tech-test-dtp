<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Karyawan extends Model
{
    protected $table = 'karyawan';
    protected $fillable = [
        'nama',
        'alamat',
        'nik',
        'foto'
    ];

    protected $with = ['pengalamanKerja', 'pendidikan'];

    public function pengalamanKerja(): BelongsToMany
    {
        return  $this->belongsToMany(PengalamanKerja::class, 'karyawan_has_pengalaman', 'karyawan_id', 'pengalaman_id');
    }

    public function pendidikan(): BelongsToMany
    {
        return $this->belongsToMany(Pendidikan::class, 'karyawan_has_pendidikan', 'karyawan_id', 'pendidikan_id');
    }

}
