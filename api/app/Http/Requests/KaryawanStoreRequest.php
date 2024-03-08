<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KaryawanStoreRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => 'required',
            'nik' => 'required|max:16',
            'foto' => 'required|mimes:jpg,png,jpeg',
        ];
    }
}
