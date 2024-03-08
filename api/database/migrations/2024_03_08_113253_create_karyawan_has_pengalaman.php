<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('karyawan_has_pengalaman', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger( 'karyawan_id');
            $table->unsignedBigInteger('pengalaman_id');
            $table->timestamps();


            $table->foreign('karyawan_id')->references('id')->on('karyawan')->onDelete('cascade');
            $table->foreign('pengalaman_id')->references('id')->on('pengalaman_kerja')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('karyawan_has_pengalaman');
    }
};
