<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PendidikanStoreRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'pendidikan.*.nama_sekolah' => 'required',
            'pendidikan.*.jurusan' => 'required',
            'pendidikan.*.tahun_masuk' => 'required',
            'pendidikan.*.tahun_lulus' => 'required'
        ];
    }
}
