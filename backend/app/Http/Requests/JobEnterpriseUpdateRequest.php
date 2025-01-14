<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobEnterpriseUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "description" => ["string"],
            "is_check_enterprise" => ["boolean"],
            "date" => ["date", 'date_format:Y-m-d'],
            "in_time" => ['date_format:H:i'],
            "out_time" => ['date_format:H:i'],
        ];
    }
}
