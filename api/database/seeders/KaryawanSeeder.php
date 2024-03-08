<?php

namespace Database\Seeders;

use App\Models\Karyawan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KaryawanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Karyawan::create([
            'nama' => 'Firman',
            'alamat' => 'Jl. Kartini No.71',
            'nik' => '1471021803990002',
            'foto' => 'NULL'
        ]);
    }
}
