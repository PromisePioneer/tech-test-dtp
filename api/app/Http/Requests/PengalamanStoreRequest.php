<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PengalamanStoreRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'pengalaman.*.nama_perusahaan' => 'required',
            'pengalaman.*.jabatan' => 'required',
            'pengalaman.*.tahun' => 'required',
            'pengalaman.*.keterangan' => 'required'
        ];
    }
}
